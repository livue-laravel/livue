/**
 * Client-side LiVue component.
 *
 * Mounts a single Vue app on a root element. Nested LiVue components
 * (children) are registered as Vue components within the same app,
 * so the entire tree shares one Vue instance.
 *
 * Components marked with data-livue-island are treated as separate
 * Vue apps and are NOT absorbed into the parent.
 *
 * Architecture: the Vue app is a thin shell that renders the root
 * component via <component :is>. Both root and children are dynamic
 * Vue components whose templates can be swapped independently when
 * the server returns updated HTML — no DOM morphing needed.
 *
 * Data model: each component's data lives in a "snapshot" containing
 * { state, memo }. The snapshot travels as an opaque JSON string:
 * the client stores it intact and sends it back to the server as-is.
 * Synthesized properties (models, enums, Carbon, collections) are
 * stored as inline tuples [value, {s: 'type', ...}] within the state.
 * The client unwraps tuples for Vue reactivity and rewraps them for diffs.
 *
 * Checksum model: the checksum covers the entire
 * state (including inline tuples). The client keeps the raw snapshot
 * JSON string and sends it back for checksum verification. Changes
 * from v-model are sent separately as "diffs".
 */

import * as Vue from 'vue';
import {
    createApp, reactive, shallowRef,
    ref, computed, watch, watchEffect, readonly,
    onMounted, onUnmounted, onBeforeMount, onBeforeUnmount,
    nextTick, provide, inject,
} from 'vue';
import { sendAction } from '../features/request/request.js';
import { createReactiveState, updateState, serializeState, stateToRefs, getByPath, setByPath } from './state.js';
import { createErrors, setErrors, clearErrors, handleError, setComponentErrorHandler, removeComponentErrorHandler } from '../helpers/errors.js';
import { on, emit, removeByComponentId, processServerEvents } from '../features/events.js';
import { handleRedirect, navigateTo } from '../features/navigation.js';
import { updateQueryString } from '../features/url.js';
import { uploadFile, uploadFiles, removeUploadFromServer } from '../features/upload.js';
import { createPinia } from 'pinia';
import { createLazyComponent } from '../features/lazy.js';
import { getDebounced, getThrottled, clearModifiers } from '../helpers/modifiers.js';
import { register as registerTabSync, unregister as unregisterTabSync, broadcast as broadcastTabSync, filterState as filterTabSyncState } from '../features/broadcast.js';
import { getBuiltInDirectives } from './registry.js';
import { subscribe as subscribeEcho, unsubscribeComponent as unsubscribeEcho } from '../features/echo.js';
import { withViewTransition, isViewTransitionsSupported } from '../directives/transition.js';
import { streamRequest, isStreaming as isStreamingActive, getStreamingMethod, clearStreamTargets } from '../features/request/stream.js';
import { trigger, createCleanupCollector } from '../helpers/hooks.js';
import { createComposables, updateComposables, hasComposables } from '../features/composables.js';
import { captureFocusState, restoreFocusState } from '../helpers/focus.js';

/**
 * Global counter for generating unique child component tag names.
 */
let _childCounter = 0;

/**
 * Storage for v-ignore preserved content.
 * Maps ignore-id to { html, isSelf, inputs }
 * @type {Map<string, object>}
 */
let _ignoredContent = new Map();

/**
 * Capture input values from an element and its descendants.
 * @param {HTMLElement} el
 * @returns {Array} Array of { selector, value, checked } objects
 */
function captureInputValues(el) {
    let inputs = [];
    let formElements = el.querySelectorAll('input, textarea, select');

    formElements.forEach(function (input, index) {
        let data = { index: index };

        if (input.type === 'checkbox' || input.type === 'radio') {
            data.checked = input.checked;
        } else if (input.tagName === 'SELECT') {
            data.value = input.value;
            if (input.multiple) {
                data.selectedOptions = Array.from(input.selectedOptions).map(function(opt) {
                    return opt.value;
                });
            }
        } else {
            data.value = input.value;
        }

        inputs.push(data);
    });

    return inputs;
}

/**
 * Restore input values to an element and its descendants.
 * @param {HTMLElement} el
 * @param {Array} inputs - Array from captureInputValues
 */
function restoreInputValues(el, inputs) {
    let formElements = el.querySelectorAll('input, textarea, select');

    inputs.forEach(function (data) {
        let input = formElements[data.index];
        if (!input) return;

        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = data.checked;
        } else if (input.tagName === 'SELECT' && input.multiple && data.selectedOptions) {
            Array.from(input.options).forEach(function(opt) {
                opt.selected = data.selectedOptions.includes(opt.value);
            });
        } else if (data.value !== undefined) {
            input.value = data.value;
        }
    });
}

/**
 * Capture content from v-ignore elements before template swap.
 * Call this BEFORE updating the template.
 *
 * @param {HTMLElement} container - The container element to search in
 */
function captureIgnoredContent(container) {
    let ignored = container.querySelectorAll('[data-livue-ignore-id]');

    ignored.forEach(function (el) {
        let ignoreId = el.getAttribute('data-livue-ignore-id');
        let isSelf = el.hasAttribute('data-livue-ignore-self');

        _ignoredContent.set(ignoreId, {
            html: el.innerHTML,
            isSelf: isSelf,
            inputs: captureInputValues(el),
        });
    });
}

/**
 * Restore content to v-ignore elements after template swap.
 * Call this AFTER Vue has updated the DOM.
 *
 * @param {HTMLElement} container - The container element to search in
 */
function restoreIgnoredContent(container) {
    let ignored = container.querySelectorAll('[data-livue-ignore-id]');

    ignored.forEach(function (el) {
        let ignoreId = el.getAttribute('data-livue-ignore-id');
        let preserved = _ignoredContent.get(ignoreId);

        if (preserved) {
            if (!preserved.isSelf) {
                // Restore entire content
                el.innerHTML = preserved.html;
            }
            // Restore input values (works for both modes)
            if (preserved.inputs && preserved.inputs.length > 0) {
                restoreInputValues(el, preserved.inputs);
            }
        }
    });
}

/**
 * Compute the diff between the server-confirmed state and the current
 * reactive state. Only includes keys whose serialized values differ.
 *
 * @param {object} serverState - Plain object (last acknowledged by server)
 * @param {object} currentState - Reactive Vue state
 * @returns {object} Keys that changed with their new values
 */
function computeDiffs(serverState, currentState) {
    let diffs = {};
    let current = serializeState(currentState);

    for (let key in current) {
        if (JSON.stringify(current[key]) !== JSON.stringify(serverState[key])) {
            diffs[key] = current[key];
        }
    }

    return diffs;
}

/**
 * Check if a value is a synthesizer inline tuple [value, {s: '...'}].
 *
 * @param {*} val
 * @returns {boolean}
 */
function isTuple(val) {
    return Array.isArray(val) && val.length === 2
        && val[1] && typeof val[1] === 'object' && !Array.isArray(val[1])
        && val[1].s;
}

/**
 * Recursively unwrap inline tuples from a value.
 * Handles tuples nested at any depth within objects and arrays.
 *
 * @param {*} value - Value that may contain inline tuples
 * @returns {*} Value with all tuples unwrapped
 */
function unwrapDeep(value) {
    if (isTuple(value)) {
        return value[0];
    }
    if (Array.isArray(value)) {
        return value.map(unwrapDeep);
    }
    if (value && typeof value === 'object') {
        let result = {};
        for (let key in value) {
            result[key] = unwrapDeep(value[key]);
        }
        return result;
    }
    return value;
}

/**
 * Unwrap inline tuples from a state object.
 * Returns a plain object with the raw values extracted from tuples.
 * Recursively unwraps nested tuples at any depth (e.g., form data
 * containing synthesized values like TemporaryUploadedFile).
 *
 * @param {object} state - State that may contain inline tuples
 * @returns {object} Plain state with unwrapped values
 */
function unwrapState(state) {
    let flat = {};
    for (let key in state) {
        flat[key] = unwrapDeep(state[key]);
    }
    return flat;
}

/**
 * Vue Composition APIs available inside @script blocks.
 */
let _vueApis = {
    ref: ref,
    computed: computed,
    watch: watch,
    watchEffect: watchEffect,
    reactive: reactive,
    readonly: readonly,
    onMounted: onMounted,
    onUnmounted: onUnmounted,
    onBeforeMount: onBeforeMount,
    onBeforeUnmount: onBeforeUnmount,
    nextTick: nextTick,
    provide: provide,
    inject: inject,
};

let _vueApiNames = Object.keys(_vueApis);
let _vueApiValues = _vueApiNames.map(function (k) { return _vueApis[k]; });

/**
 * Extract a <script type="application/livue-setup"> block from an HTML string.
 * Returns the cleaned HTML and the setup code (or null).
 *
 * Supports optional inner <script> tags for IDE support. Users can write:
 *   @script
 *   <script>
 *   // code with full IDE support (highlighting, autocomplete, etc.)
 *   </script>
 *   @endscript
 *
 * The inner <script> tags are automatically stripped.
 *
 * @param {string} html
 * @returns {{ html: string, setupCode: string|null }}
 */
function extractSetupScript(html) {
    let match = html.match(/<script\s+type="application\/livue-setup"[^>]*>([\s\S]*?)<\/script>/);
    if (match) {
        let code = match[1].trim();

        // Strip optional inner <script> tags (for IDE support)
        // Matches <script>, <script lang="js">, <script type="text/javascript">, etc.
        code = code.replace(/^<script[^>]*>\s*/i, '');
        code = code.replace(/\s*<\/script>$/i, '');

        return {
            html: html.replace(match[0], ''),
            setupCode: code.trim(),
        };
    }
    return { html: html, setupCode: null };
}

/**
 * Execute user-provided @script setup code within the Vue setup context.
 * The code receives Vue Composition APIs, server state refs, and the livue helper
 * as named variables. It must return an object with additional template bindings.
 *
 * @param {string} code - The JS code from the @script block
 * @param {object} stateRefs - Result of stateToRefs(state)
 * @param {object} livue - The livue helper
 * @returns {object|null} Additional bindings to merge into setup return
 */
function executeSetupCode(code, stateRefs, livue) {
    let stateKeys = Object.keys(stateRefs);
    let stateValues = stateKeys.map(function (k) { return stateRefs[k]; });

    let paramNames = _vueApiNames.concat(stateKeys).concat(['livue']);
    let paramValues = _vueApiValues.concat(stateValues).concat([livue]);

    try {
        let fn = new (Function.prototype.bind.apply(
            Function,
            [null].concat(paramNames).concat([code])
        ))();
        let result = fn.apply(null, paramValues);
        return (result && typeof result === 'object') ? result : null;
    } catch (e) {
        console.error('[LiVue] Error executing @script setup code:', e);
        return null;
    }
}

/**
 * Transform v-model with custom LiVue modifiers into v-model + separate directives.
 *
 * This allows users to write:
 *   <input v-model.debounce.500ms="search">
 *   <v-text-field v-model.debounce.500ms="search">
 *
 * Which gets transformed to:
 *   <input v-model="search" v-debounce:search.500ms>
 *   <v-text-field v-model="search" v-debounce:search.500ms>
 *
 * This way Vue's native v-model handles the binding (works with all components),
 * and our custom directives handle the modifier behavior.
 *
 * @param {string} html - Template HTML
 * @returns {string} - Transformed HTML
 */
function transformVModelModifiers(html) {
    // Transform v-model.debounce.Xms="prop" -> v-model="prop" v-debounce:prop.Xms
    let debouncePattern = /v-model\.debounce(?:\.(\d+)(ms)?)?=["']([^"']+)["']/g;
    html = html.replace(debouncePattern, function (match, timing, msUnit, propName) {
        let modifiers = timing ? '.' + timing + (msUnit || 'ms') : '';
        return 'v-model="' + propName + '" v-debounce:' + propName + modifiers;
    });

    // Transform v-model.throttle.Xms="prop" -> v-model="prop" v-throttle:prop.Xms
    let throttlePattern = /v-model\.throttle(?:\.(\d+)(ms)?)?=["']([^"']+)["']/g;
    html = html.replace(throttlePattern, function (match, timing, msUnit, propName) {
        let modifiers = timing ? '.' + timing + (msUnit || 'ms') : '';
        return 'v-model="' + propName + '" v-throttle:' + propName + modifiers;
    });

    // Transform v-model.blur="prop" -> v-model="prop" v-blur:prop
    let blurPattern = /v-model\.blur=["']([^"']+)["']/g;
    html = html.replace(blurPattern, function (match, propName) {
        return 'v-model="' + propName + '" v-blur:' + propName;
    });

    // Transform v-model.enter="prop" -> v-model="prop" v-enter:prop
    let enterPattern = /v-model\.enter=["']([^"']+)["']/g;
    html = html.replace(enterPattern, function (match, propName) {
        return 'v-model="' + propName + '" v-enter:' + propName;
    });

    return html;
}

/**
 * Build a Vue component definition with optional @script setup code.
 * Extracts the setup script from the template HTML, strips it, and
 * creates a definition whose setup() merges server state, livue helper,
 * and any user-defined bindings from the @script block.
 *
 * @param {string} templateHtml - The component template (may contain <script type="application/livue-setup">)
 * @param {object} state - Reactive state object
 * @param {object} livue - The livue helper
 * @param {object} composables - Composable objects to expose at top level (auth, cart, etc.)
 * @param {object} versions - Reactive version counters for child key-swapping
 * @param {string} [name] - Component name for Vue DevTools
 * @returns {{ name: string, template: string, setup: function }}
 */
function buildComponentDef(templateHtml, state, livue, composables, versions, name) {
    // Transform v-model.debounce etc. into v-model + v-debounce directive
    let transformedHtml = transformVModelModifiers(templateHtml);
    let extracted = extractSetupScript(transformedHtml);

    return {
        name: name || 'LiVueComponent',
        template: extracted.html,
        setup: function () {
            let refs = stateToRefs(state);
            // Spread composables (auth, cart, etc.) at top level for template access
            let base = Object.assign({}, refs, composables, { livue: livue, livueV: versions });

            if (extracted.setupCode) {
                let extra = executeSetupCode(extracted.setupCode, refs, livue);
                if (extra) {
                    Object.assign(base, extra);
                }
            }

            return base;
        },
    };
}

/**
 * Create a livue helper object for a component (root or child).
 *
 * @param {string} componentId - Unique livue instance ID
 * @param {object} state - Reactive state object (unwrapped, no tuples)
 * @param {object} memo - Object with name (for event dispatch / error context)
 * @param {object} componentRef - Reference with a _updateTemplate method
 * @param {object} initialServerState - Plain unwrapped copy of the initial state (for diff tracking)
 * @param {string} initialServerSnapshot - Opaque JSON string of the full snapshot (sent back to server as-is)
 * @param {object} [context] - Additional context { el, rootComponent, isChild, parentLivue }
 * @returns {object} Reactive livue helper
 */
function createLivueHelper(componentId, state, memo, componentRef, initialServerState, initialServerSnapshot, context) {
    context = context || {};
    let errors = createErrors();
    let name = memo.name;

    // #[Vue] methods: JS code that runs client-side without server round-trip
    let vueMethods = memo.vueMethods || {};

    // #[Confirm] methods: require user confirmation before execution
    let confirms = memo.confirms || {};

    // #[Isolate]: send requests independently, bypassing the pool
    let isolate = memo.isolate || false;

    // #[Url]: query string synchronization config
    let urlParams = memo.urlParams || null;

    // File upload configuration from WithFileUploads feature hook
    let uploads = memo.uploads || null;

    // #[TabSync]: cross-tab state synchronization config
    let tabSync = memo.tabSync || null;

    // Flag to skip broadcast after sync triggered by tab sync (avoid loops)
    let _skipNextBroadcast = false;

    // Last unwrapped state confirmed by the server (for computing diffs).
    // Kept as a plain (non-reactive) object. Updated after each server response.
    let serverState = initialServerState;

    // The full snapshot as an opaque JSON string. Sent back to the server as-is
    // for checksum verification. Updated after each server response.
    let serverSnapshot = initialServerSnapshot;

    /**
     * Handle a download response by creating a temporary link and clicking it.
     * @param {object} download - { token: string, name: string }
     */
    function handleDownload(download) {
        let prefix = document.querySelector('meta[name="livue-prefix"]');
        let prefixValue = prefix ? prefix.getAttribute('content') : 'livue';
        let url = '/' + prefixValue + '/download?token=' + encodeURIComponent(download.token);

        let link = document.createElement('a');
        link.href = url;
        link.download = download.name;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Build the payload for an AJAX request.
     * The snapshot is sent as an opaque JSON string (server parses it).
     * Changes from v-model are sent as separate "diffs".
     */
    function buildPayload() {
        let diffs = computeDiffs(serverState, state);

        return {
            snapshot: serverSnapshot,
            diffs: diffs,
        };
    }

    /**
     * Apply a server response: update state, memo, errors, template, and events.
     * The snapshot in the response is an opaque JSON string.
     *
     * @param {object} response - Server response
     * @param {object} [sentDiffs] - Diffs that were sent with this request (client changes to exclude from broadcast)
     */
    function applyResponse(response, sentDiffs) {
        // Handle redirect if present (defense-in-depth; primary handling is in pool.js)
        if (response.redirect) {
            handleRedirect(response.redirect);
            return;
        }

        // Handle error boundary response from server
        if (response.errorBoundary) {
            let eb = response.errorBoundary;
            livue.errorState.hasError = eb.hasError;
            livue.errorState.errorMessage = eb.errorMessage;
            livue.errorState.errorDetails = eb.errorDetails;
            livue.errorState.recover = eb.recover;

            // If error was handled server-side and we should recover,
            // continue processing the response normally
            if (!eb.errorHandled || !eb.recover) {
                // Trigger error.occurred hook
                trigger('error.occurred', {
                    error: new Error(eb.errorMessage || 'Component error'),
                    componentName: name,
                    componentId: componentId,
                    context: { method: eb.errorMethod, serverHandled: eb.errorHandled },
                    preventDefault: function () {},
                });
            }

            // If there's a fallback view and we're not recovering,
            // the server should have sent it in response.html
        }

        // Handle download if present - trigger file download via hidden link
        if (response.download) {
            handleDownload(response.download);
            // Continue processing snapshot update (don't return)
        }

        if (response.snapshot) {
            // Parse the opaque snapshot string to extract state and memo
            let parsed = JSON.parse(response.snapshot);

            if (parsed.state) {
                let newState = unwrapState(parsed.state);
                updateState(state, newState);
                serverState = JSON.parse(JSON.stringify(newState));
            }

            // Store the raw snapshot string for next request
            serverSnapshot = response.snapshot;

            if (parsed.memo) {
                // Sync validation errors from memo
                if (parsed.memo.errors) {
                    setErrors(livue.errors, parsed.memo.errors);
                } else {
                    clearErrors(livue.errors);
                }

                // Update #[Vue] methods from new memo
                if (parsed.memo.vueMethods) {
                    vueMethods = parsed.memo.vueMethods;
                }

                // Update URL params config from new memo
                if (parsed.memo.urlParams) {
                    urlParams = parsed.memo.urlParams;
                }

                // Update upload config from new memo (tokens may rotate)
                if (parsed.memo.uploads) {
                    uploads = parsed.memo.uploads;
                }

                // Update #[Confirm] methods config from new memo
                if (parsed.memo.confirms) {
                    confirms = parsed.memo.confirms;
                }

                // Update composable data from new memo
                if (parsed.memo.composables || parsed.memo.composableActions) {
                    updateComposables(composables, parsed.memo);
                }
            }
        }

        // Sync URL query string after state update
        if (urlParams) {
            updateQueryString(urlParams, state);
        }
        if (response.html && componentRef && componentRef._updateTemplate) {
            // Extract transition options from memo (#[Transition])
            let transitionOpts = {};
            if (response.snapshot) {
                let parsedSnap = JSON.parse(response.snapshot);
                if (parsedSnap.memo) {
                    if (parsedSnap.memo.transitionType) {
                        transitionOpts.transitionType = parsedSnap.memo.transitionType;
                    }
                    if (parsedSnap.memo.skipTransition) {
                        transitionOpts.skipTransition = true;
                    }
                }
            }
            componentRef._updateTemplate(response.html, transitionOpts);
        }
        if (response.events && response.events.length > 0) {
            for (var i = 0; i < response.events.length; i++) {
                response.events[i].sourceId = componentId;
            }
            processServerEvents(response.events);
        }

        // Execute pending JavaScript from ->vue() calls
        if (response.js && response.js.length > 0) {
            for (var j = 0; j < response.js.length; j++) {
                try {
                    new Function('state', 'livue', response.js[j])(state, livue);
                } catch (jsError) {
                    console.error('[LiVue] Error executing ->vue() JS:', jsError);
                }
            }
        }

        // TabSync: broadcast state changes to other tabs
        // Skip if this response is from a sync triggered by tab sync (avoid loops)
        // Only broadcast SERVER changes, not client diffs (v-model changes)
        if (tabSync && tabSync.enabled && response.snapshot && !_skipNextBroadcast) {
            let parsed = JSON.parse(response.snapshot);
            if (parsed.state) {
                let currentState = serializeState(state);

                // Exclude properties that were in client diffs (v-model changes)
                // We only want to broadcast what the SERVER changed
                let serverChangedProps = [];
                for (let prop in currentState) {
                    // If this property was NOT in the client diffs, it's a server change
                    if (!sentDiffs || !(prop in sentDiffs)) {
                        serverChangedProps.push(prop);
                    }
                }

                if (serverChangedProps.length > 0) {
                    let filteredState = filterTabSyncState(currentState, serverChangedProps, tabSync);

                    if (Object.keys(filteredState).length > 0) {
                        broadcastTabSync(name, filteredState, serverChangedProps, tabSync);
                    }
                }
            }
        }

        // Reset the skip flag
        _skipNextBroadcast = false;

        // Return JSON result if present (#[Json] methods)
        if (response.jsonResult !== undefined) {
            return response.jsonResult;
        }
    }

    // Reactive object tracking loading state per method
    let loadingTargets = reactive({});

    // PHP Composables: create reactive objects for each composable namespace.
    // The callFn wrapper allows composable actions to use livue.call which is defined below.
    let composables = {};
    let callFn = function (method, params) {
        return livue.call(method, params);
    };

    if (hasComposables(memo)) {
        composables = createComposables(memo, callFn);
    }

    let livue = reactive({
        loading: false,
        processing: null,
        errors: errors,
        uploading: false,
        uploadProgress: 0,
        streaming: false,
        streamingMethod: null,
        loadingTargets: loadingTargets,
        refs: {},

        /**
         * Check if any property (or a specific property) has changed since last sync.
         * @param {string} [property] - Property name to check, or omit for any
         * @returns {boolean}
         */
        isDirty: function (property) {
            let diffs = computeDiffs(serverState, state);
            if (property === undefined) {
                return Object.keys(diffs).length > 0;
            }
            return property in diffs;
        },

        /**
         * Get the set of dirty (changed) property names.
         * This is a getter that returns a new Set on each access.
         * @returns {Set<string>}
         */
        get dirtyFields() {
            let diffs = computeDiffs(serverState, state);
            return new Set(Object.keys(diffs));
        },

        /**
         * Get the original (server-confirmed) value of a property.
         * @param {string} [property] - Property name, or omit for entire state
         * @returns {*}
         */
        getOriginal: function (property) {
            if (property === undefined) {
                return JSON.parse(JSON.stringify(serverState));
            }
            return serverState[property] !== undefined
                ? JSON.parse(JSON.stringify(serverState[property]))
                : undefined;
        },

        /**
         * Reset a property to its original (server-confirmed) value.
         * @param {string} property - Property name to reset
         */
        resetProperty: function (property) {
            if (property in serverState) {
                state[property] = JSON.parse(JSON.stringify(serverState[property]));
            }
        },

        /**
         * Reset all properties to their original (server-confirmed) values.
         */
        resetAll: function () {
            for (let key in serverState) {
                if (key in state) {
                    state[key] = JSON.parse(JSON.stringify(serverState[key]));
                }
            }
        },

        /**
         * Check if a specific action (or any action) is loading.
         * @param {string} [action] - Method name to check, or omit for any
         * @returns {boolean}
         */
        isLoading: function (action) {
            if (!action) return livue.loading;
            return loadingTargets[action] || false;
        },

        /**
         * Get loading-related attributes for binding to elements.
         * @param {string} [action] - Method name to check, or omit for any
         * @returns {object} Attributes object with aria-busy and disabled
         */
        loadingAttrs: function (action) {
            let isActive = action ? (loadingTargets[action] || false) : livue.loading;
            return {
                'aria-busy': isActive,
                'disabled': isActive,
            };
        },

        /**
         * Call a method. If the method is a #[Vue] method, execute JS
         * client-side without a server round-trip. Otherwise, send AJAX.
         * Checks for #[Confirm] attribute before execution.
         *
         * Supports action modifiers via options object:
         *   livue.call('search', ['query'], { debounce: 300 })
         *   livue.call('increment', [], { throttle: 500 })
         *
         * Backward compatible with old API:
         *   livue.call('save')
         *   livue.call('search', 'query')
         *
         * @param {string} method
         * @param {Array|*} paramsOrFirst - Array of params (new API) or first param (old API)
         * @param {object} [options] - { debounce?: number, throttle?: number }
         */
        call: async function (method, paramsOrFirst, options) {
            // Detect API style and extract params/options
            let params;
            let modifiers = null;

            if (arguments.length === 1) {
                // livue.call('method')
                params = [];
            } else if (arguments.length === 2) {
                // Could be: livue.call('method', 'param') OR livue.call('method', [params])
                if (Array.isArray(paramsOrFirst)) {
                    params = paramsOrFirst;
                } else {
                    params = [paramsOrFirst];
                }
            } else if (arguments.length >= 3) {
                // Could be:
                // - livue.call('method', [params], { debounce: 300 }) - new API
                // - livue.call('method', 'p1', 'p2', ...) - old API with multiple params
                if (Array.isArray(paramsOrFirst) && options && typeof options === 'object' && (options.debounce || options.throttle)) {
                    // New API with modifiers
                    params = paramsOrFirst;
                    modifiers = options;
                } else {
                    // Old API with multiple params: livue.call('method', p1, p2, ...)
                    params = Array.prototype.slice.call(arguments, 1);
                }
            }

            // #[Vue] methods: execute client-side JS directly
            if (vueMethods[method]) {
                try {
                    new Function('state', 'livue', vueMethods[method])(state, livue);
                } catch (jsError) {
                    console.error('[LiVue] Error executing #[Vue] method "' + method + '":', jsError);
                }
                return;
            }

            // The actual AJAX call logic
            let doCall = async function () {
                // #[Confirm] methods: require user confirmation before execution
                if (confirms[method]) {
                    let confirmed = await livue._showConfirm(confirms[method]);
                    if (!confirmed) {
                        return;
                    }
                }

                livue.loading = true;
                livue.processing = method;
                loadingTargets[method] = true;

                let result;
                try {
                    let payload = buildPayload();
                    let response = await sendAction(payload.snapshot, method, params, payload.diffs, isolate);
                    result = applyResponse(response, payload.diffs);
                } catch (error) {
                    if (error.status === 422 && error.data && error.data.errors) {
                        setErrors(livue.errors, error.data.errors);
                    } else {
                        handleError(error, name);
                    }
                } finally {
                    livue.loading = false;
                    livue.processing = null;
                    delete loadingTargets[method];
                }
                return result;
            };

            // Apply modifiers if present
            if (modifiers && modifiers.debounce) {
                let debounced = getDebounced(componentId + ':' + method, modifiers.debounce);
                return debounced(doCall);
            }

            if (modifiers && modifiers.throttle) {
                let throttled = getThrottled(componentId + ':' + method, modifiers.throttle);
                return throttled(doCall);
            }

            // No modifiers, execute directly
            return doCall();
        },

        /**
         * Call a method with inline confirmation (bypasses #[Confirm] attribute).
         * Useful when you want confirmation only in specific contexts.
         * @param {string} method
         * @param {string} message - Confirmation message
         * @param {...*} args - Method arguments
         */
        callWithConfirm: async function (method, message) {
            let args = Array.prototype.slice.call(arguments, 2);
            let config = { message: message || 'Are you sure?' };
            let confirmed = await livue._showConfirm(config);

            if (confirmed) {
                return livue.call.apply(livue, [method].concat(args));
            }
        },

        /**
         * Show confirmation dialog (native or custom).
         * @param {object} config - { message, title, confirmText, cancelText }
         * @returns {Promise<boolean>}
         * @private
         */
        _showConfirm: function (config) {
            // Check for custom confirm handler
            if (window.LiVue && window.LiVue.confirmHandler) {
                return window.LiVue.confirmHandler(config);
            }

            // Default: native browser confirm
            return Promise.resolve(window.confirm(config.message));
        },

        /**
         * Set a local state property without server call.
         * @param {string} key
         * @param {*} value
         */
        set: function (key, value) {
            state[key] = value;
        },

        /**
         * Sync current state to the server without calling any method.
         * Useful after local changes via set() or v-model.
         */
        sync: async function () {
            livue.loading = true;
            livue.processing = '$sync';

            try {
                let payload = buildPayload();
                let response = await sendAction(payload.snapshot, null, [], payload.diffs, isolate);
                applyResponse(response, payload.diffs);
            } catch (error) {
                if (error.status === 422 && error.data && error.data.errors) {
                    setErrors(livue.errors, error.data.errors);
                } else {
                    handleError(error, name);
                }
            } finally {
                livue.loading = false;
                livue.processing = null;
            }
        },

        /**
         * Clear all validation errors.
         */
        clearErrors: function () {
            clearErrors(livue.errors);
        },

        /**
         * Dispatch an event to all listening components (broadcast).
         * @param {string} eventName
         * @param {*} [data]
         */
        dispatch: function (eventName, data) {
            emit(eventName, data, 'broadcast', name, componentId, null);
        },

        /**
         * Dispatch an event to a specific component by name.
         * @param {string} targetName
         * @param {string} eventName
         * @param {*} [data]
         */
        dispatchTo: function (targetName, eventName, data) {
            emit(eventName, data, 'to', name, componentId, targetName);
        },

        /**
         * Dispatch an event to this component only.
         * @param {string} eventName
         * @param {*} [data]
         */
        dispatchSelf: function (eventName, data) {
            emit(eventName, data, 'self', name, componentId, null);
        },

        /**
         * Navigate to a URL using SPA navigation.
         * @param {string} url - Target URL
         */
        navigate: function (url) {
            navigateTo(url, true);
        },

        /**
         * Upload a single file for a component property.
         * The file is sent to /livue/upload, and on success the property
         * is set to an upload reference that the server can hydrate.
         *
         * Supports nested paths like "data.avatar" or "form.profile.photo".
         *
         * @param {string} property - The component property name or dot-notated path
         * @param {File} file - The File object from the input
         */
        upload: async function (property, file) {
            if (!uploads || !uploads[property]) {
                console.error('[LiVue] Property "' + property + '" is not configured for uploads.');
                return;
            }

            // Clean up previous temp file if replacing (single upload only)
            var previousValue = getByPath(state, property);
            if (previousValue && previousValue.__livue_upload && previousValue.ref) {
                removeUploadFromServer([previousValue.ref]);
            }

            livue.uploading = true;
            livue.uploadProgress = 0;

            try {
                var result = await uploadFile(file, name, property, uploads[property].token, function (percent) {
                    livue.uploadProgress = percent;
                });

                setByPath(state, property, {
                    __livue_upload: true,
                    ref: result.ref,
                    originalName: result.originalName,
                    mimeType: result.mimeType,
                    size: result.size,
                    previewUrl: result.previewUrl,
                });
            } catch (error) {
                if (error.status === 422 && error.data && error.data.errors) {
                    setErrors(livue.errors, error.data.errors);
                } else {
                    handleError(error, name);
                }
            } finally {
                livue.uploading = false;
                livue.uploadProgress = 0;
            }
        },

        /**
         * Upload multiple files for an array property.
         * Each file is uploaded sequentially, and the property is set
         * to an array of upload references.
         *
         * Supports nested paths like "data.documents" or "form.attachments".
         *
         * @param {string} property - The component property name or dot-notated path
         * @param {FileList|File[]} files - The File objects from the input
         */
        uploadMultiple: async function (property, files) {
            if (!uploads || !uploads[property]) {
                console.error('[LiVue] Property "' + property + '" is not configured for uploads.');
                return;
            }

            livue.uploading = true;
            livue.uploadProgress = 0;

            try {
                var response = await uploadFiles(files, name, property, uploads[property].token, function (progress) {
                    livue.uploadProgress = progress.overall;
                });

                var results = response.results || [];
                var errors = response.errors || [];

                // Get current value and append successful uploads
                var currentValue = getByPath(state, property);
                var existingFiles = Array.isArray(currentValue) ? currentValue : [];

                if (results.length > 0) {
                    var newFiles = results.map(function (result) {
                        return {
                            __livue_upload: true,
                            ref: result.ref,
                            originalName: result.originalName,
                            mimeType: result.mimeType,
                            size: result.size,
                            previewUrl: result.previewUrl,
                        };
                    });

                    setByPath(state, property, existingFiles.concat(newFiles));
                }

                // Show errors for failed uploads
                if (errors.length > 0) {
                    var errorMessages = {};
                    errors.forEach(function (err) {
                        var key = property + '.' + err.index;
                        // Store as object for richer display in templates
                        errorMessages[key] = {
                            file: err.file,
                            message: err.error,
                        };
                    });
                    setErrors(livue.errors, errorMessages);
                }
            } catch (error) {
                if (error.status === 422 && error.data && error.data.errors) {
                    setErrors(livue.errors, error.data.errors);
                } else {
                    handleError(error, name);
                }
            } finally {
                livue.uploading = false;
                livue.uploadProgress = 0;
            }
        },

        /**
         * Remove an uploaded file from a property.
         * For single file properties, sets to null.
         * For array properties, removes by index.
         *
         * Supports nested paths like "data.avatar" or "form.documents".
         *
         * @param {string} property - The property name or dot-notated path
         * @param {number} [index] - For array properties, the index to remove
         */
        removeUpload: function (property, index) {
            var currentValue = getByPath(state, property);

            if (index !== undefined && Array.isArray(currentValue)) {
                // Remove specific file from array - clean up only that file
                var removed = currentValue[index];
                if (removed && removed.__livue_upload && removed.ref) {
                    removeUploadFromServer([removed.ref]);
                }
                currentValue.splice(index, 1);
                // Trigger reactivity by setting the modified array
                setByPath(state, property, currentValue.slice());
            } else {
                // Single file removal - clean up the temp file
                if (currentValue && currentValue.__livue_upload && currentValue.ref) {
                    removeUploadFromServer([currentValue.ref]);
                }
                setByPath(state, property, null);
            }
        },

        /**
         * Call a method using HTTP streaming.
         * Streams content in real-time to elements with v-stream directive.
         *
         * @param {string} method - Method name to call
         * @param {Array} [params] - Method parameters
         * @returns {Promise<*>} Final result after streaming completes
         */
        stream: async function (method, params) {
            params = params || [];

            livue.loading = true;
            livue.streaming = true;
            livue.processing = method;
            livue.streamingMethod = method;
            loadingTargets[method] = true;

            let result;
            try {
                let payload = buildPayload();
                payload.method = method;
                payload.params = params;
                payload.componentId = componentId;

                let response = await streamRequest(payload, {
                    onChunk: function (chunk) {
                        // Chunks are applied automatically by stream.js
                    },
                    onComplete: function (finalResponse) {
                        // Final response will be processed below
                    },
                    onError: function (error) {
                        console.error('[LiVue Stream] Error:', error);
                    },
                });

                if (response) {
                    result = applyResponse(response, payload.diffs);
                }
            } catch (error) {
                if (error.status === 422 && error.data && error.data.errors) {
                    setErrors(livue.errors, error.data.errors);
                } else {
                    handleError(error, name);
                }
            } finally {
                livue.loading = false;
                livue.streaming = false;
                livue.processing = null;
                livue.streamingMethod = null;
                delete loadingTargets[method];
            }

            return result;
        },

        /**
         * Toggle a boolean property.
         * @param {string} property - Property name to toggle
         */
        toggle: function (property) {
            if (property in state) {
                state[property] = !state[property];
            }
        },

        /**
         * Watch a property for changes.
         * Executes callback when the property value changes.
         *
         * @param {string} property - Property name to watch
         * @param {Function} callback - function(newValue, oldValue)
         * @returns {Function} Unwatch function
         *
         * @example
         * livue.watch('count', (newVal, oldVal) => {
         *     console.log('Count changed from', oldVal, 'to', newVal);
         * });
         */
        watch: function (property, callback) {
            if (typeof callback !== 'function') {
                console.warn('[LiVue] watch callback must be a function');
                return function () {};
            }

            // Use Vue's watch on the reactive state
            return watch(
                function () { return state[property]; },
                function (newVal, oldVal) {
                    callback(newVal, oldVal);
                }
            );
        },

        /**
         * Get the component's root DOM element.
         * @returns {HTMLElement|null}
         */
        get $el() {
            if (context.el) {
                return context.el;
            }
            // Fallback: query by component ID
            return document.querySelector('[data-livue-id="' + componentId + '"]');
        },

        /**
         * Get the component's unique ID.
         * @returns {string}
         */
        get $id() {
            return componentId;
        },

        /**
         * Get the parent component's livue helper (if nested).
         * Returns null for root components.
         * @returns {object|null}
         */
        get $parent() {
            return context.parentLivue || null;
        },

        /**
         * Get the component name.
         * @returns {string}
         */
        get $name() {
            return name;
        },

        /**
         * Register an error handler for this component.
         * The handler receives (error, context) and can return true to prevent
         * the error from propagating to the global handler.
         *
         * @param {Function} handler - function(error, context) => boolean
         * @returns {Function} Unsubscribe function
         *
         * @example
         * livue.onError((error, context) => {
         *     console.error('Error in', context.method, ':', error);
         *     livue.set('errorMessage', 'Something went wrong');
         *     return true; // Prevent global handler
         * });
         */
        onError: function (handler) {
            if (typeof handler !== 'function') {
                console.warn('[LiVue] onError handler must be a function');
                return function () {};
            }

            setComponentErrorHandler(componentId, handler);

            // Return unsubscribe function
            return function () {
                removeComponentErrorHandler(componentId);
            };
        },

        /**
         * Reactive error state from server (#[ErrorBoundary]).
         * Contains: hasError, errorMessage, errorDetails, recover
         */
        errorState: reactive({
            hasError: false,
            errorMessage: null,
            errorDetails: null,
            recover: true,
        }),

        /**
         * Clear the error state (used for recovery).
         */
        clearError: function () {
            livue.errorState.hasError = false;
            livue.errorState.errorMessage = null;
            livue.errorState.errorDetails = null;
        },

        /**
         * Update the server-side state baseline and snapshot.
         * Used internally when a parent re-renders and reactive props are synced.
         * @param {object} newServerState - New plain state (unwrapped)
         * @param {string} newSnapshot - New opaque snapshot JSON string
         * @private
         */
        _updateServerState: function (newServerState, newSnapshot) {
            serverState = JSON.parse(JSON.stringify(newServerState));
            serverSnapshot = newSnapshot;
        },

        /**
         * Store cleanup collector for hooks.
         * @private
         */
        _cleanups: context.cleanups || null,

        /**
         * Get debugging information for DevTools.
         * @private
         * @returns {object}
         */
        _getDevToolsInfo: function () {
            let diffs = computeDiffs(serverState, state);

            // Extract composables data for DevTools
            let composablesData = {};
            for (let ns in composables) {
                let comp = composables[ns];
                let data = {};
                let actions = [];
                for (let key in comp) {
                    if (typeof comp[key] === 'function') {
                        actions.push(key);
                    } else {
                        try {
                            data[key] = JSON.parse(JSON.stringify(comp[key]));
                        } catch (e) {
                            data[key] = '[Unserializable]';
                        }
                    }
                }
                composablesData[ns] = { data: data, actions: actions };
            }

            return {
                serverState: JSON.parse(JSON.stringify(serverState)),
                clientState: JSON.parse(JSON.stringify(state)),
                dirtyFields: Object.keys(diffs),
                diffs: diffs,
                memo: {
                    name: name,
                    isolate: isolate,
                    urlParams: urlParams,
                    tabSync: tabSync,
                    hasUploads: !!uploads,
                    uploadProps: uploads ? Object.keys(uploads) : [],
                    vueMethods: Object.keys(vueMethods),
                    confirmMethods: Object.keys(confirms),
                    composableNames: Object.keys(composables),
                },
                composables: composablesData,
                uploading: livue.uploading,
                uploadProgress: livue.uploadProgress,
                streaming: livue.streaming,
                streamingMethod: livue.streamingMethod,
                errorState: {
                    hasError: livue.errorState.hasError,
                    errorMessage: livue.errorState.errorMessage,
                },
            };
        },
    });

    // Add composables to livue object (auth, cart, etc.)
    // These are reactive objects with data and action methods.
    for (let ns in composables) {
        livue[ns] = composables[ns];
    }

    // TabSync: register to receive updates from other tabs
    if (tabSync && tabSync.enabled) {
        registerTabSync(name, function (incomingState, properties, config) {
            // Check if any changed property requires a server refresh (reactive)
            let needsServerRefresh = false;

            if (config.reactive === true) {
                // All properties trigger server refresh
                needsServerRefresh = true;
            } else if (Array.isArray(config.reactive) && config.reactive.length > 0) {
                // Check if any changed property is in the reactive list
                for (let prop in incomingState) {
                    if (config.reactive.includes(prop)) {
                        needsServerRefresh = true;
                        break;
                    }
                }
            }

            if (needsServerRefresh) {
                // First, apply incoming state so sync() sends the new values
                for (let prop in incomingState) {
                    if (config.only && !config.only.includes(prop)) continue;
                    if (config.except && config.except.includes(prop)) continue;

                    if (prop in state) {
                        state[prop] = incomingState[prop];
                    }
                }

                // Set flag to avoid broadcast loop, then sync to server
                _skipNextBroadcast = true;
                livue.sync();
                return;
            }

            // Vue-only update: apply incoming state directly
            for (let prop in incomingState) {
                // Skip if 'only' is set and prop not in it
                if (config.only && !config.only.includes(prop)) continue;
                // Skip if 'except' is set and prop is in it
                if (config.except && config.except.includes(prop)) continue;

                if (prop in state) {
                    state[prop] = incomingState[prop];
                }
            }

            // Update serverState to match so dirty tracking stays consistent
            for (let prop in incomingState) {
                if (config.only && !config.only.includes(prop)) continue;
                if (config.except && config.except.includes(prop)) continue;

                serverState[prop] = JSON.parse(JSON.stringify(incomingState[prop]));
            }
        });
    }

    return { livue: livue, composables: composables };
}

/**
 * Process an HTML string, extracting nested LiVue child components
 * and replacing them with Vue component tags.
 *
 * Processes deepest children first (bottom-up) so that deeply nested
 * trees are correctly handled: a child's template will already contain
 * the component tags of its own children.
 *
 * Children already in the root's registry keep their existing state
 * and livue helper — only new children get fresh state from the DOM.
 *
 * @param {string} html - The innerHTML of a root or child element
 * @param {LiVueComponent} rootComponent - The root component that owns this Vue app
 * @returns {{ template: string, childDefs: Object }}
 */
function processTemplate(html, rootComponent) {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Strip children from v-text and v-html elements.
    // Blade renders initial values as child content for SSR,
    // but Vue's compiler rejects v-text/v-html with children.
    let vTextEls = tempDiv.querySelectorAll('[v-text], [v-html]');
    for (let i = 0; i < vTextEls.length; i++) {
        vTextEls[i].innerHTML = '';
    }

    let childDefs = {};

    // Track which registry entries have been matched during this pass,
    // so duplicate component names are handled by order of appearance.
    let matchedIds = {};

    // Find ALL nested livue components that are NOT islands.
    // Use data-livue-id (with data-livue-snapshot) to identify livue elements.
    // Reverse so we process deepest-first (querySelectorAll returns document order).
    let nested = Array.from(
        tempDiv.querySelectorAll('[data-livue-id][data-livue-snapshot]:not([data-livue-island])')
    ).reverse();

    nested.forEach(function (nestedEl) {
        let id = nestedEl.dataset.livueId;
        let childSnapshotJson = nestedEl.dataset.livueSnapshot || '{}';
        let childSnapshot = JSON.parse(childSnapshotJson);
        let name = childSnapshot.memo ? childSnapshot.memo.name : '';
        let initialState = unwrapState(childSnapshot.state || {});
        let childMemo = childSnapshot.memo || {};
        let childHtml = nestedEl.innerHTML;

        // Check if this child already exists in the registry.
        // First try exact ID match, then fallback to component name.
        // The name fallback is needed because when the server re-renders
        // a parent template, embedded @livue() directives create fresh
        // PHP instances with new random IDs.
        let existing = rootComponent._childRegistry[id];
        if (!existing) {
            for (let regId in rootComponent._childRegistry) {
                let entry = rootComponent._childRegistry[regId];
                if (entry.name === name && !matchedIds[regId]) {
                    existing = entry;
                    break;
                }
            }
        }
        if (existing) {
            matchedIds[existing.id] = true;

            // Sync #[Reactive] properties from the re-rendered parent snapshot
            let reactiveProps = childMemo.reactive || [];
            if (reactiveProps.length > 0) {
                for (var r = 0; r < reactiveProps.length; r++) {
                    var prop = reactiveProps[r];
                    if (prop in initialState) {
                        existing.state[prop] = initialState[prop];
                    }
                }

                // Update server-side baseline to match the new parent-provided values
                existing.livue._updateServerState(initialState, childSnapshotJson);

                // Re-render child template with the new server-rendered HTML
                // (Blade content like @foreach won't update from Vue state alone)
                if (existing.componentRef && existing.componentRef._updateTemplate) {
                    existing.componentRef._updateTemplate(childHtml);
                }
            }
        }
        let isNew = !existing;

        if (!existing) {
            _childCounter++;
            let tagName = 'livue-child-' + _childCounter;

            let childState = createReactiveState(initialState);
            // Plain unwrapped copy for diff tracking
            let childServerState = JSON.parse(JSON.stringify(initialState));
            // Pass full memo to the helper (includes vueMethods, urlParams, isolate, reactive, etc.)
            let memo = Object.assign({ name: childMemo.name || name }, childMemo);
            let childComponentRef = { _updateTemplate: null };

            // Create cleanup collector for child hooks
            let childCleanups = createCleanupCollector();

            let helperResult = createLivueHelper(id, childState, memo, childComponentRef, childServerState, childSnapshotJson, {
                el: nestedEl,
                rootComponent: rootComponent,
                isChild: true,
                parentLivue: rootComponent._rootLivue,
                cleanups: childCleanups,
            });
            let livue = helperResult.livue;
            let childComposables = helperResult.composables;

            // Trigger component.init hook for child
            trigger('component.init', {
                component: { id: id, name: name, state: childState, livue: livue },
                el: nestedEl,
                cleanup: childCleanups.cleanup,
                isChild: true,
            });

            // Populate initial validation errors from snapshot memo
            let childErrors = childMemo.errors || null;
            if (childErrors) {
                setErrors(livue.errors, childErrors);
            }

            existing = {
                tagName: tagName,
                state: childState,
                memo: memo,
                livue: livue,
                composables: childComposables,
                componentRef: childComponentRef,
                name: name,
                id: id,
            };

            // Register event listeners declared via $listeners on the PHP component
            let childListeners = childMemo.listeners || null;
            if (childListeners) {
                for (let eventName in childListeners) {
                    (function (method, childLivue) {
                        on(eventName, name, id, function (data) {
                            childLivue.call(method, data);
                        });
                    })(childListeners[eventName], livue);
                }
            }

            // Subscribe to Laravel Echo channels for child component
            let childEchoConfig = childMemo.echo || null;
            if (childEchoConfig && childEchoConfig.length) {
                (function (childId, childLivue) {
                    subscribeEcho(childId, childEchoConfig, function (method, data) {
                        childLivue.call(method, data);
                    });
                })(id, livue);
            }

            // Set up the template update function.
            // When this child receives a server response, re-register its
            // Vue component definition with the new template and bump its
            // version key so Vue re-creates just this component.
            childComponentRef._updateTemplate = function (newInnerHtml) {
                // Capture v-ignore content BEFORE the swap
                let childEl = rootComponent.el.querySelector('[data-livue-id="' + id + '"]');
                if (childEl) {
                    captureIgnoredContent(childEl);
                }

                // Process the new HTML (might contain nested children)
                let childProcessed = processTemplate(newInnerHtml, rootComponent);

                // Build the wrapped template
                let newTemplate = '<div data-livue-id="' + id + '">'
                    + childProcessed.template + '</div>';

                // Register any new nested children discovered in the update
                for (let ct in childProcessed.childDefs) {
                    if (!rootComponent.vueApp._context.components[ct]) {
                        rootComponent.vueApp.component(ct, childProcessed.childDefs[ct]);
                    }
                }

                // Update this child's template (direct assignment avoids Vue warning)
                rootComponent.vueApp._context.components[existing.tagName] = buildComponentDef(newTemplate, existing.state, existing.livue, existing.composables || {}, rootComponent._versions, existing.name);

                // Bump version to force Vue to re-create the component
                rootComponent._versions[existing.tagName] = (rootComponent._versions[existing.tagName] || 0) + 1;

                // Restore v-ignore content AFTER Vue updates the DOM
                nextTick(function () {
                    let updatedChildEl = rootComponent.el.querySelector('[data-livue-id="' + id + '"]');
                    if (updatedChildEl) {
                        restoreIgnoredContent(updatedChildEl);
                    }
                });
            };

            rootComponent._childRegistry[id] = existing;
        }

        let tagName = existing.tagName;

        // Register ref for parent-child communication
        // Check for data-livue-ref attribute on the nested element
        let refName = nestedEl.dataset.livueRef;
        if (refName && rootComponent._rootLivue) {
            // Create a proxy object that allows the parent to interact with the child
            rootComponent._rootLivue.refs[refName] = {
                /**
                 * Call a method on the child component.
                 * @param {string} method - Method name
                 * @param {Array} [params] - Parameters to pass
                 * @returns {Promise}
                 */
                call: function (method, params) {
                    return existing.livue.call(method, params || []);
                },
                /**
                 * Set a property on the child component.
                 * @param {string} key - Property name
                 * @param {*} value - Value to set
                 */
                set: function (key, value) {
                    return existing.livue.set(key, value);
                },
                /**
                 * Dispatch an event from the child.
                 * @param {string} event - Event name
                 * @param {*} [data] - Event data
                 */
                dispatch: function (event, data) {
                    return existing.livue.dispatch(event, data);
                },
                /**
                 * Sync the child's state with the server.
                 * @returns {Promise}
                 */
                sync: function () {
                    return existing.livue.sync();
                },
                /**
                 * Access to the child's reactive state (read-only reference).
                 */
                get state() {
                    return existing.state;
                },
                /**
                 * Access to the child's livue helper.
                 */
                get livue() {
                    return existing.livue;
                },
            };
        }

        // Register model binding for two-way parent-child sync (#[Modelable])
        // Check for data-livue-model attribute on the nested element
        let modelProp = nestedEl.dataset.livueModel;
        if (modelProp && rootComponent._rootState) {
            // Listen for $modelUpdate events from this child
            on('$modelUpdate', existing.name, id, function (data) {
                // Update the parent's property with the new value
                if (data && data.value !== undefined) {
                    rootComponent._rootState[modelProp] = data.value;
                }
            });
        }

        // Only add to childDefs if this is a new child (needs initial registration)
        if (isNew) {
            childDefs[tagName] = buildComponentDef(
                '<div data-livue-id="' + id + '">' + childHtml + '</div>',
                existing.state, existing.livue, existing.composables || {}, rootComponent._versions, existing.name
            );
        }

        // Initialize version for this child if needed
        if (rootComponent._versions[tagName] === undefined) {
            rootComponent._versions[tagName] = 0;
        }

        // Replace the nested element with a Vue component tag.
        // The :key binding ties to the reactive version counter so Vue
        // re-creates the component when its template is swapped.
        let placeholder = document.createElement(tagName);
        placeholder.setAttribute(':key', "livueV['" + tagName + "']");
        nestedEl.parentNode.replaceChild(placeholder, nestedEl);
    });

    // Add v-pre to islands so Vue doesn't compile their content
    // in the parent's context. Islands have their own Vue app.
    let islands = tempDiv.querySelectorAll('[data-livue-island]');
    for (let i = 0; i < islands.length; i++) {
        islands[i].setAttribute('v-pre', '');
    }

    return {
        template: tempDiv.innerHTML,
        childDefs: childDefs,
    };
}

export default class LiVueComponent {
    /**
     * @param {HTMLElement} el - The root/island wrapper element
     */
    constructor(el) {
        this.el = el;
        this.componentId = el.dataset.livueId;

        // Parse snapshot from DOM. The raw JSON string is stored as the
        // opaque server snapshot for sending back to the server.
        let snapshotJson = el.dataset.livueSnapshot || '{}';
        let snapshot = JSON.parse(snapshotJson);
        this.name = snapshot.memo ? snapshot.memo.name : '';
        // Unwrap inline tuples for Vue reactivity
        this.state = createReactiveState(unwrapState(snapshot.state || {}));
        // Full memo for JS runtime (includes uploads, urlParams, vueMethods, isolate, etc.)
        this.memo = snapshot.memo || { name: '' };
        this.snapshotJson = snapshotJson;
        this.vueApp = null;

        /** @type {Object<string, object>} livue-id → child info */
        this._childRegistry = {};

        /** @type {object} Reactive version counters for child key-swapping */
        this._versions = reactive({});

        /** @type {import('vue').ShallowRef|null} */
        this._rootDefRef = null;

        /** @type {object|null} */
        this._rootLivue = null;
        this._rootState = null; // For #[Modelable] two-way binding

        /**
         * Helper functions exposed to the lazy directive.
         * Allows lazy.js to create child components without circular imports.
         * @type {object}
         */
        this._lazyHelpers = {
            createLivueHelper: createLivueHelper,
            buildComponentDef: buildComponentDef,
            processTemplate: processTemplate,
            createReactiveState: createReactiveState,
        };

        this._mount(snapshot, snapshotJson);
    }

    /**
     * Mount the Vue app shell. The root component is rendered via
     * <component :is> so its template can be swapped independently
     * without unmounting the Vue app.
     */
    _mount(snapshot, snapshotJson) {
        let self = this;

        // Create root component ref with _updateTemplate
        let rootComponentRef = {
            /**
             * Update the component template with new HTML.
             * @param {string} newInnerHtml - The new HTML content
             * @param {object} [options] - Transition options
             * @param {string} [options.transitionType] - Transition type (e.g., 'forward', 'backward')
             * @param {boolean} [options.skipTransition] - Skip the View Transition
             */
            _updateTemplate: function (newInnerHtml, options) {
                options = options || {};

                // Trigger template.updating hook
                trigger('template.updating', {
                    component: { id: self.componentId, name: self.name, state: self.state, livue: self._rootLivue },
                    el: self.el,
                    html: newInnerHtml,
                });

                // Capture focus state BEFORE the swap so we can restore it after
                var focusState = captureFocusState(self.el);

                // Capture v-ignore content BEFORE the swap
                captureIgnoredContent(self.el);

                // Process the new HTML (may discover new children)
                let rootProcessed = processTemplate(newInnerHtml, self);

                // Register any new child components in the app
                // Only register if not already registered to avoid Vue warnings
                for (let tagName in rootProcessed.childDefs) {
                    if (!self.vueApp._context.components[tagName]) {
                        self.vueApp.component(tagName, rootProcessed.childDefs[tagName]);
                    }
                }

                // The actual DOM swap function
                function doSwap() {
                    // Swap root definition — Vue detects the new object via
                    // shallowRef and re-creates the root component.
                    self._rootDefRef.value = buildComponentDef(rootProcessed.template, self.state, self._rootLivue, self._rootComposables || {}, self._versions, self.name);

                    // Restore v-ignore content and focus AFTER Vue updates the DOM
                    nextTick(function () {
                        restoreIgnoredContent(self.el);

                        // Restore focus state after DOM is rebuilt
                        restoreFocusState(self.el, focusState);

                        // Trigger template.updated hook after DOM is updated
                        trigger('template.updated', {
                            component: { id: self.componentId, name: self.name, state: self.state, livue: self._rootLivue },
                            el: self.el,
                        });
                    });
                }

                // Skip View Transition if requested (#[Transition(skip: true)])
                if (options.skipTransition) {
                    doSwap();
                    return;
                }

                // Use View Transitions API if available for smooth animations
                if (isViewTransitionsSupported()) {
                    withViewTransition(doSwap, { type: options.transitionType });
                } else {
                    doSwap();
                }
            },
        };

        // Plain unwrapped copy for diff tracking
        let rootServerState = JSON.parse(JSON.stringify(unwrapState(snapshot.state || {})));

        // Create cleanup collector for root hooks
        this._cleanups = createCleanupCollector();

        // Create the root livue helper with opaque snapshot string
        // IMPORTANT: Must be created BEFORE processTemplate so refs can be registered
        let helperResult = createLivueHelper(this.componentId, this.state, this.memo, rootComponentRef, rootServerState, snapshotJson, {
            el: this.el,
            rootComponent: this,
            isChild: false,
            parentLivue: null,
            cleanups: this._cleanups,
        });
        let livue = helperResult.livue;
        let rootComposables = helperResult.composables;
        this._rootLivue = livue;
        this._rootComposables = rootComposables;
        this._rootState = this.state; // For #[Modelable] two-way binding

        // Trigger component.init hook for root
        trigger('component.init', {
            component: { id: this.componentId, name: this.name, state: this.state, livue: livue },
            el: this.el,
            cleanup: this._cleanups.cleanup,
            isChild: false,
        });

        // Extract nested children and transform the template
        // Now _rootLivue is set, so child refs will be properly registered
        let processed = processTemplate(this.el.innerHTML, this);

        // Populate initial validation errors from snapshot memo (e.g., after SPA navigate)
        let initialErrors = (snapshot.memo && snapshot.memo.errors) || null;
        if (initialErrors) {
            setErrors(livue.errors, initialErrors);
        }

        // Register event listeners declared via $listeners on the root PHP component
        let rootListeners = (snapshot.memo && snapshot.memo.listeners) || null;
        if (rootListeners) {
            for (let eventName in rootListeners) {
                (function (method, rootLivue, compName, compId) {
                    on(eventName, compName, compId, function (data) {
                        rootLivue.call(method, data);
                    });
                })(rootListeners[eventName], livue, self.name, self.componentId);
            }
        }

        // Subscribe to Laravel Echo channels (broadcast events)
        let echoConfig = (snapshot.memo && snapshot.memo.echo) || null;
        if (echoConfig && echoConfig.length) {
            this._echoUnsubscribe = subscribeEcho(self.componentId, echoConfig, function (method, data) {
                livue.call(method, data);
            });
        }

        // Create root component definition
        let rootDef = buildComponentDef(processed.template, self.state, livue, rootComposables, self._versions, self.name);

        this._rootDefRef = shallowRef(rootDef);

        // Create the Vue app — a thin shell that delegates to the root
        // component via <component :is>. This allows the root's template
        // to be swapped without unmounting the entire Vue app.
        this.vueApp = createApp({
            setup: function () {
                return {
                    rootDef: self._rootDefRef,
                };
            },
            template: '<component :is="rootDef"></component>',
        });

        // Register all child component definitions in the same app
        // Only register if not already registered to avoid Vue warnings
        let tagName;
        for (tagName in processed.childDefs) {
            if (!this.vueApp._context.components[tagName]) {
                this.vueApp.component(tagName, processed.childDefs[tagName]);
            }
        }

        // Register the livue-lazy component for lazy loading child components
        if (!this.vueApp._context.components['livue-lazy']) {
            this.vueApp.component('livue-lazy', createLazyComponent(this));
        }

        // Apply plugins to Vue app:
        // 1. Install Pinia (LiVue uses it internally for state management)
        // 2. Apply user's setup callback (for Vuetify, custom plugins, etc.)
        // 3. Mount the app
        this._applyPluginsAndMount();
    }

    /**
     * Apply plugins and mount the Vue app.
     * Called once during _mount(), after createApp() and child registration.
     *
     * Order:
     * 1. Install Pinia (required internally by LiVue)
     * 2. Call LiVue.setup() callback if defined (user plugins like Vuetify)
     * 3. Register built-in LiVue directives (v-click, v-loading, etc.)
     * 4. Mount the Vue app
     *
     * @private
     */
    async _applyPluginsAndMount() {
        let self = this;
        let app = this.vueApp;

        // 1. Install Pinia (LiVue uses it internally)
        let piniaInstance = createPinia();
        app.use(piniaInstance);

        // 2. Apply user's setup callbacks AFTER Pinia
        // This allows users to add Vuetify, custom components, directives, etc.
        // Multiple callbacks are supported (accumulated via LiVue.setup())
        if (window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0) {
            for (let i = 0; i < window.LiVue._setupCallbacks.length; i++) {
                try {
                    let result = window.LiVue._setupCallbacks[i](app);
                    // Support async setup callbacks
                    if (result && typeof result.then === 'function') {
                        await result;
                    }
                } catch (error) {
                    console.error('[LiVue] Error in setup() callback:', error);
                }
            }
        }

        // 3. Register built-in LiVue directives
        let directives = getBuiltInDirectives();
        for (let i = 0; i < directives.length; i++) {
            app.directive(directives[i].name, directives[i].directive);
        }

        // 4. Mount the Vue app
        self.el.innerHTML = '';
        self.vueApp.mount(self.el);
    }

    /**
     * Destroy the Vue app instance and clean up event listeners.
     */
    destroy() {
        // Trigger component.destroy hook for all children first
        for (let id in this._childRegistry) {
            let child = this._childRegistry[id];

            // Trigger component.destroy hook for child
            trigger('component.destroy', {
                component: { id: id, name: child.name, state: child.state, livue: child.livue },
                isChild: true,
            });

            // Run child cleanup functions from hooks
            if (child.livue && child.livue._cleanups) {
                child.livue._cleanups.runCleanups();
            }

            removeByComponentId(id);
            clearModifiers(id);
            removeComponentErrorHandler(id);

            // Unregister children from TabSync
            if (child && child.memo && child.memo.tabSync && child.memo.tabSync.enabled) {
                unregisterTabSync(child.name);
            }

            // Unsubscribe children from Laravel Echo
            unsubscribeEcho(id);
        }

        // Trigger component.destroy hook for root
        trigger('component.destroy', {
            component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
            isChild: false,
        });

        // Run root cleanup functions from hooks
        if (this._cleanups) {
            this._cleanups.runCleanups();
        }

        // Remove event listeners for root component
        removeByComponentId(this.componentId);

        // Clean up debounce/throttle modifiers for root component
        clearModifiers(this.componentId);

        // Remove component error handler
        removeComponentErrorHandler(this.componentId);

        // Unregister from TabSync if enabled
        if (this.memo && this.memo.tabSync && this.memo.tabSync.enabled) {
            unregisterTabSync(this.name);
        }

        // Unsubscribe from Laravel Echo
        if (this._echoUnsubscribe) {
            this._echoUnsubscribe();
            this._echoUnsubscribe = null;
        }
        unsubscribeEcho(this.componentId);

        if (this.vueApp) {
            this.vueApp.unmount();
            this.vueApp = null;
        }
    }
}
