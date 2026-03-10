/**
 * LiVue helper factory.
 *
 * Creates the reactive `livue` object that is the primary API surface
 * for both template bindings and user code. Each LiVue component
 * (root or child) gets its own helper instance.
 */

import { reactive, watch } from 'vue';
import { sendAction, sendCommit } from '../features/request/request.js';
import { updateState, serializeState, getByPath, setByPath } from './state.js';
import { computeDiffs, unwrapState } from './tuples.js';
import { createErrors, setErrors, clearErrors, handleError, setComponentErrorHandler, removeComponentErrorHandler } from '../helpers/errors.js';
import { on, emit, processServerEvents } from '../features/events.js';
import { handleRedirect, navigateTo } from '../features/navigation.js';
import { updateQueryString } from '../features/url.js';
import { uploadFile, uploadFiles, removeUploadFromServer } from '../features/upload.js';
import { getDebounced, getThrottled } from '../helpers/modifiers.js';
import { register as registerTabSync, broadcast as broadcastTabSync, filterState as filterTabSyncState } from '../features/broadcast.js';
import { streamRequest } from '../features/request/stream.js';
import { trigger } from '../helpers/hooks.js';
import { createComposables, updateComposables, hasComposables } from '../features/composables.js';
import { createOrUseStore, useRegisteredStore, registerStoresFromMemo, cleanupComponentStores } from './store-helper.js';

/**
 * Patch a cached HTML string by replacing fragment sections with new content.
 * Fragments are delimited by <!--livue-fragment:name--> / <!--/livue-fragment:name--> markers.
 *
 * @param {string} html - The base HTML to patch
 * @param {object} fragments - Map of fragment name to new content (including markers)
 * @returns {string} The patched HTML
 */
export function patchFragments(html, fragments) {
    for (var name in fragments) {
        var startMarker = '<!--livue-fragment:' + name + '-->';
        var endMarker = '<!--/livue-fragment:' + name + '-->';
        var startIdx = html.indexOf(startMarker);
        var endIdx = html.indexOf(endMarker);

        if (startIdx !== -1 && endIdx !== -1) {
            html = html.substring(0, startIdx) + fragments[name] + html.substring(endIdx + endMarker.length);
        }
    }

    return html;
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
 * @param {object} [context] - Additional context { el, rootComponent, isChild, parentLivue, initialHtml }
 * @returns {object} Reactive livue helper
 */
export function createLivueHelper(componentId, state, memo, componentRef, initialServerState, initialServerSnapshot, context) {
    context = context || {};
    let pinia = context.pinia || null;
    let errors = createErrors();
    let name = memo.name;

    // #[Vue] methods: JS code that runs client-side without server round-trip
    let vueMethods = memo.vueMethods || {};

    // #[Json] methods: send isolated requests, reject Promise on validation errors
    let jsonMethods = memo.jsonMethods || [];

    // #[Confirm] methods: require user confirmation before execution
    let confirms = memo.confirms || {};

    // Client-callable method whitelist (snapshot memo).
    // Null means "legacy snapshot without method list" -> fallback to permissive proxying.
    let callableMethods = Array.isArray(memo.methods) ? memo.methods.slice() : null;

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

    // Commit queue: accumulate calls before sending to server
    let _pendingCommitCalls = [];   // [{method, params, resolve, reject}]
    let _commitInProgress = false;
    let _commitScheduled = false;

    // Last raw HTML from the server, used as base for fragment patching.
    // When the server sends only fragments, we patch this cached copy
    // and pass the result to _updateTemplate.
    let lastRawHtml = context.initialHtml || null;

    // Stores declared server-side (memo.stores), exposed as livue.stores.
    let stores = reactive({});
    let storeBridgeStops = [];

    function clearStoreBridges() {
        for (let i = 0; i < storeBridgeStops.length; i++) {
            try {
                storeBridgeStops[i]();
            } catch (e) {
                // Ignore stale/unmounted watcher cleanup errors
            }
        }
        storeBridgeStops = [];
    }

    function applyStoreBridges(storesMemo) {
        clearStoreBridges();

        if (!Array.isArray(storesMemo)) return;

        for (let i = 0; i < storesMemo.length; i++) {
            let entry = storesMemo[i];
            if (!entry || typeof entry !== 'object') continue;
            if (!entry.bridge || typeof entry.bridge !== 'object') continue;

            let instance = useRegisteredStore(componentId, entry.name, { scope: entry.scope || 'auto' }, pinia);
            if (!instance) continue;

            let bridge = entry.bridge;
            for (let storeKey in bridge) {
                let rule = bridge[storeKey];
                if (!rule || typeof rule !== 'object') continue;

                let prop = rule.prop;
                let mode = rule.mode || 'two-way';
                if (!prop || !(prop in state)) continue;

                if (mode === 'two-way' || mode === 'store-to-state') {
                    let stop = watch(function () {
                        return instance[storeKey];
                    }, function (value) {
                        if (state[prop] !== value) {
                            state[prop] = value;
                        }
                    });
                    storeBridgeStops.push(stop);
                }

                if (mode === 'two-way' || mode === 'state-to-store') {
                    let stop = watch(function () {
                        return state[prop];
                    }, function (value) {
                        if (instance[storeKey] !== value) {
                            instance[storeKey] = value;
                        }
                    });
                    storeBridgeStops.push(stop);
                }
            }
        }
    }

    function syncStoresFromMemo(storesMemo) {
        let registered = registerStoresFromMemo(componentId, storesMemo, pinia);
        for (let key in registered) {
            stores[key] = registered[key];
        }
        applyStoreBridges(storesMemo);
    }

    syncStoresFromMemo(memo.stores || []);

    if (context.cleanups && typeof context.cleanups.cleanup === 'function') {
        context.cleanups.cleanup(function () {
            clearStoreBridges();
            cleanupComponentStores(componentId);
        });
    }

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

    function scheduleCommit() {
        if (_commitScheduled || _commitInProgress) return;
        _commitScheduled = true;
        queueMicrotask(executeCommit);
    }

    async function executeCommit() {
        _commitScheduled = false;
        if (_commitInProgress || _pendingCommitCalls.length === 0) return;

        _commitInProgress = true;
        let batch = _pendingCommitCalls;
        _pendingCommitCalls = [];

        livue.loading = true;
        livue.processing = batch[0].method;
        for (let i = 0; i < batch.length; i++) {
            if (batch[i].method) loadingTargets[batch[i].method] = true;
        }

        try {
            let payload = buildPayload();
            let calls = batch.map(function(c) { return { method: c.method, params: c.params }; });
            let response = await sendCommit(payload.snapshot, calls, payload.diffs, isolate);
            let result = applyResponse(response, payload.diffs);
            for (let i = 0; i < batch.length; i++) batch[i].resolve(result);
        } catch (error) {
            for (let i = 0; i < batch.length; i++) {
                if (error.status === 422 && error.data && error.data.errors) {
                    setErrors(livue.errors, error.data.errors);
                    batch[i].reject(error);
                } else {
                    handleError(error, name);
                    batch[i].reject(error);
                }
            }
        } finally {
            livue.loading = false;
            livue.processing = null;
            for (let i = 0; i < batch.length; i++) {
                if (batch[i].method) delete loadingTargets[batch[i].method];
            }
            _commitInProgress = false;
            if (_pendingCommitCalls.length > 0) {
                scheduleCommit();
            }
        }
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
            let parsed;
            try {
                parsed = JSON.parse(response.snapshot);
            } catch (e) {
                console.error('[LiVue] Failed to parse server snapshot:', e);
                parsed = null;
            }

            if (parsed && parsed.state) {
                let newState = unwrapState(parsed.state);
                updateState(state, newState);
                serverState = JSON.parse(JSON.stringify(newState));
            }

            // Store the raw snapshot string for next request
            if (parsed) {
                serverSnapshot = response.snapshot;
            }

            if (parsed && parsed.memo) {
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

                // Update #[Json] methods from new memo
                if (parsed.memo.jsonMethods) {
                    jsonMethods = parsed.memo.jsonMethods;
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

                // Update callable method whitelist from new memo.
                // Keep null only for legacy snapshots that omit the key entirely.
                if (Object.prototype.hasOwnProperty.call(parsed.memo, 'methods')) {
                    callableMethods = Array.isArray(parsed.memo.methods) ? parsed.memo.methods.slice() : null;
                    livue._callableMethods = callableMethods;
                }

                // Update composable data from new memo
                if (parsed.memo.composables || parsed.memo.composableActions) {
                    updateComposables(composables, parsed.memo);
                }

                // Register/update PHP-defined stores from memo
                if (parsed.memo.stores) {
                    syncStoresFromMemo(parsed.memo.stores);
                }
            }
        }

        // Sync URL query string after state update
        if (urlParams) {
            updateQueryString(urlParams, state);
        }
        if ((response.html || response.fragments) && componentRef && componentRef._updateTemplate) {
            // Extract transition options from memo (#[Transition])
            let transitionOpts = {};
            if (response.snapshot) {
                let parsedSnap;
                try {
                    parsedSnap = JSON.parse(response.snapshot);
                } catch (e) {
                    parsedSnap = null;
                }
                if (parsedSnap && parsedSnap.memo) {
                    if (parsedSnap.memo.transitionType) {
                        transitionOpts.transitionType = parsedSnap.memo.transitionType;
                    }
                    if (parsedSnap.memo.skipTransition) {
                        transitionOpts.skipTransition = true;
                    }
                }
            }

            if (response.fragments) {
                // Partial update: patch only the changed fragments
                let baseHtml = lastRawHtml || (context.el ? context.el.innerHTML : null);
                if (baseHtml) {
                    let patchedHtml = patchFragments(baseHtml, response.fragments);
                    lastRawHtml = patchedHtml;
                    componentRef._updateTemplate(patchedHtml, transitionOpts);
                }
            } else {
                // Full update: replace entire template
                lastRawHtml = response.html;
                componentRef._updateTemplate(response.html, transitionOpts);
            }
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

        // Emit server benchmark timing data (if present)
        if (response.benchmark) {
            trigger('benchmark.received', {
                componentId: componentId,
                componentName: name,
                timings: response.benchmark,
            });
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

    // Magic methods registry: extensible map of $-prefixed methods handled client-side
    let magicMethods = {};

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
        stores: stores,
        _pinia: pinia,
        _callableMethods: callableMethods,

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

            // Magic methods: handle $-prefixed methods client-side
            if (magicMethods[method]) {
                return magicMethods[method](livue, params);
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

            // #[Json] methods: isolated request + validation errors reject the Promise
            let isJsonMethod = jsonMethods.includes(method);

            // The actual AJAX call logic
            let doCall;
            if (isJsonMethod) {
                doCall = async function () {
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
                        let response = await sendAction(payload.snapshot, method, params, payload.diffs, true);
                        result = applyResponse(response, payload.diffs);
                    } catch (error) {
                        // #[Json]: don't pollute the error bag, reject with structured errors
                        throw { status: error.status, errors: error.data && error.data.errors, message: error.message };
                    } finally {
                        livue.loading = false;
                        livue.processing = null;
                        delete loadingTargets[method];
                    }
                    return result;
                };
            } else {
                doCall = async function () {
                    if (confirms[method]) {
                        let confirmed = await livue._showConfirm(confirms[method]);
                        if (!confirmed) {
                            return;
                        }
                    }

                    return new Promise(function(resolve, reject) {
                        _pendingCommitCalls.push({ method: method, params: params, resolve: resolve, reject: reject });
                        scheduleCommit();
                    });
                };
            }

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
         * Quick Pinia store helper.
         *
         * Defaults to component-scoped IDs (`<componentId>:<name>`) so stores
         * created while iterating inside templates don't collide globally.
         *
         * @param {string} name
         * @param {object|Function} [definition]
         * @param {object} [options] - { scope?: 'component'|'global' }
         * @returns {object}
         */
        store: function (name, definition, options) {
            if (definition === undefined) {
                let existing = useRegisteredStore(componentId, name, options || { scope: 'auto' }, pinia);
                if (existing) {
                    return existing;
                }
                throw new Error('[LiVue] store("' + name + '"): store not found. Provide a definition or register it in PHP.');
            }
            return createOrUseStore(componentId, name, definition, options, pinia);
        },

        /**
         * Resolve a previously registered store by name.
         * Looks in component scope first, then global scope.
         *
         * @param {string} name
         * @returns {object}
         */
        useStore: function (name) {
            let existing = useRegisteredStore(componentId, name, { scope: 'auto' }, pinia);
            if (existing) {
                stores[name] = existing;
                return existing;
            }
            throw new Error('[LiVue] useStore("' + name + '"): store not found.');
        },

        /**
         * Resolve a previously registered global store by name.
         *
         * @param {string} name
         * @returns {object}
         */
        useGlobalStore: function (name) {
            let existing = useRegisteredStore(componentId, name, { scope: 'global' }, pinia);
            if (existing) {
                stores[name] = existing;
                return existing;
            }
            throw new Error('[LiVue] useGlobalStore("' + name + '"): global store not found.');
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
        stream: async function (method, params, options) {
            options = options || {};
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
                    if (options.background) {
                        livue.$el.dispatchEvent(new CustomEvent('livue:stream-complete', {
                            bubbles: true,
                            detail: {
                                method: method,
                                response: response,
                                componentId: componentId,
                            },
                        }));
                    } else {
                        result = applyResponse(response, payload.diffs);
                    }
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
         * Manually apply a response captured from a background stream.
         * Call this inside a livue:stream-complete event handler when you
         * are ready to apply the final snapshot to the component.
         *
         * @param {object} response - The response object from event.detail.response
         */
        applyStreamResponse: function (response) {
            if (response) {
                applyResponse(response, {});
            }
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
         * Register a client-side event listener on the LiVue event bus.
         * Returns an unsubscribe function.
         *
         * @param {string} eventName
         * @param {Function} handler - function(data)
         * @returns {Function}
         */
        on: function (eventName, handler) {
            if (typeof eventName !== 'string' || eventName.length === 0) {
                console.warn('[LiVue] on() requires a non-empty event name');
                return function () {};
            }

            if (typeof handler !== 'function') {
                console.warn('[LiVue] on() handler must be a function');
                return function () {};
            }

            return on(eventName, name, componentId, handler);
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

    // $refresh magic method: re-renders the component without calling any server method.
    // Sends the current snapshot with method=null, triggering the full lifecycle (boot, hydrate, render).
    async function doRefresh() {
        livue.loading = true;
        livue.processing = '$refresh';
        loadingTargets['$refresh'] = true;
        try {
            let payload = buildPayload();
            let response = await sendAction(payload.snapshot, null, [], payload.diffs, isolate);
            return applyResponse(response, payload.diffs);
        } catch (error) {
            if (error.status === 422 && error.data && error.data.errors) {
                setErrors(livue.errors, error.data.errors);
            } else {
                handleError(error, name);
            }
        } finally {
            livue.loading = false;
            livue.processing = null;
            delete loadingTargets['$refresh'];
        }
    }

    magicMethods['$refresh'] = function () {
        return doRefresh();
    };

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

    // Wrap livue in a Proxy to expose magic methods (e.g. livue.$refresh())
    // and server methods (e.g. livue.increment(2)) directly on the object.
    // Properties already defined on livue pass through to the reactive object,
    // preserving Vue's dependency tracking.
    var proxyBlacklist = { then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1 };

    let livueProxy = new Proxy(livue, {
        get: function (target, prop, receiver) {
            if (prop in target) {
                return Reflect.get(target, prop, receiver);
            }
            if (typeof prop === 'symbol') {
                return Reflect.get(target, prop, receiver);
            }
            if (typeof prop === 'string' && prop.startsWith('$')) {
                if (magicMethods[prop]) {
                    return function () {
                        var args = Array.prototype.slice.call(arguments);
                        return magicMethods[prop](livue, args);
                    };
                }

                // $alias proxy: livue.$dispatch(...) -> livue.dispatch(...)
                var alias = prop.slice(1);
                if (alias) {
                    var aliasTarget = Reflect.get(target, alias, receiver);
                    if (typeof aliasTarget === 'function') {
                        return function () {
                            var args = Array.prototype.slice.call(arguments);
                            return aliasTarget.apply(target, args);
                        };
                    }
                }
            }
            // Server method proxy: livue.increment(2) -> livue.call('increment', [2])
            if (typeof prop === 'string' && !prop.startsWith('$') && !proxyBlacklist[prop]) {
                return function () {
                    var args = Array.prototype.slice.call(arguments);
                    return livue.call(prop, ...args);
                };
            }
            return undefined;
        },
        set: function (target, prop, value, receiver) {
            return Reflect.set(target, prop, value, receiver);
        },
        has: function (target, prop) {
            if (typeof prop === 'string' && prop.startsWith('$')) {
                if (magicMethods[prop]) {
                    return true;
                }

                var alias = prop.slice(1);
                if (alias) {
                    var aliasTarget = Reflect.get(target, alias, target);
                    if (typeof aliasTarget === 'function') {
                        return true;
                    }
                }
            }
            return Reflect.has(target, prop);
        },
    });

    return { livue: livueProxy, composables: composables };
}
