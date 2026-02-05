/**
 * v-watch Directive
 *
 * Syncs to the server when a field value changes.
 * Detects the bound property automatically from v-model on the element or children.
 *
 * Usage:
 *   <div v-watch>                  <!-- default 150ms debounce -->
 *   <div v-watch.debounce.300ms>   <!-- custom debounce -->
 *   <div v-watch.blur>             <!-- sync on blur only -->
 *
 * Modifiers:
 *   .debounce.Xms - Custom debounce (default: 150ms)
 *   .blur         - Sync only on blur (uses focusout event)
 */

import { watch } from 'vue';
import { getDebounced } from '../helpers/modifiers.js';

/**
 * WeakMap to store binding info for cleanup.
 * @type {WeakMap<HTMLElement, object>}
 */
const _bindings = new WeakMap();

let _watchCounter = 0;

/**
 * Parse timing value from modifiers (e.g., { '500ms': true } -> 500).
 *
 * @param {object} modifiers
 * @returns {number}
 */
function parseTimingMs(modifiers) {
    for (let mod in modifiers) {
        let match = mod.match(/^(\d+)(ms)?$/);
        if (match) {
            return parseInt(match[1], 10);
        }
    }
    return 0;
}

/**
 * Get the livue helper and state from a binding context.
 *
 * @param {object} binding - Vue directive binding
 * @param {object} vnode - Vue vnode
 * @returns {object|null} - { livue, state } or null
 */
function getContext(binding, vnode) {
    let instance = binding.instance;

    if (instance) {
        let internal = instance.$ || instance._ || instance;

        if (internal.setupState && internal.setupState.livue) {
            return {
                livue: internal.setupState.livue,
                state: internal.setupState,
            };
        }

        if (instance.livue) {
            let setupState = internal.setupState || instance;
            return {
                livue: setupState.livue || instance.livue,
                state: setupState,
            };
        }
    }

    let ctx = vnode.ctx;

    if (ctx && ctx.setupState && ctx.setupState.livue) {
        return {
            livue: ctx.setupState.livue,
            state: ctx.setupState,
        };
    }

    if (ctx && ctx.parent && ctx.parent.setupState && ctx.parent.setupState.livue) {
        return {
            livue: ctx.parent.setupState.livue,
            state: ctx.parent.setupState,
        };
    }

    let parent = ctx ? ctx.parent : null;
    while (parent) {
        if (parent.setupState && parent.setupState.livue) {
            return {
                livue: parent.setupState.livue,
                state: parent.setupState,
            };
        }
        parent = parent.parent;
    }

    return null;
}

/**
 * Find the v-model path from the element or its children.
 * Looks for v-model attribute on the element itself, or on child
 * input/textarea/select elements.
 *
 * @param {HTMLElement} el
 * @returns {string|null}
 */
function findModelPath(el) {
    // Check for v-model on child elements (Vue compiles v-model to attributes)
    let input = el.querySelector('[v-model], input, textarea, select');

    // v-model is compiled away by Vue, but we can look for data attributes
    // or the element's own dataset
    if (el.dataset.watchPath) {
        return el.dataset.watchPath;
    }

    return null;
}

/**
 * Resolve a dot-notation path from the reactive state.
 * Handles Vue refs (unwraps .value) for the root property.
 *
 * @param {object} state - Component setupState
 * @param {string} path - Dot-notation path (e.g., "data.name")
 * @returns {*} The resolved value
 */
function resolvePath(state, path) {
    let parts = path.split('.');
    let current = state[parts[0]];

    // Unwrap Vue ref
    if (current && typeof current === 'object' && 'value' in current) {
        current = current.value;
    }

    for (let i = 1; i < parts.length; i++) {
        if (current == null) return undefined;
        current = current[parts[i]];
    }

    return current;
}

export default {
    mounted(el, binding, vnode) {
        let context = getContext(binding, vnode);

        if (!context) {
            console.warn('[LiVue] v-watch: Could not find livue context');
            return;
        }

        // Path can come from: directive value, or data-watch-path attribute
        let path = binding.value || el.dataset.watchPath;

        if (!path) {
            console.warn('[LiVue] v-watch: No path found. Use v-watch="\'path\'" or data-watch-path="path"');
            return;
        }

        let { livue, state } = context;
        let modifiers = binding.modifiers || {};

        _watchCounter++;
        let uniqueId = 'watch-' + path + '-' + _watchCounter;

        // Blur mode: sync on focusout instead of watching
        if (modifiers.blur) {
            let blurHandler = function () {
                livue.sync();
            };

            el.addEventListener('focusout', blurHandler);

            _bindings.set(el, { blurHandler: blurHandler });
            return;
        }

        // Debounce mode (default)
        let debounceMs = parseTimingMs(modifiers) || 150;
        let debounced = getDebounced(uniqueId, debounceMs);

        let stopWatcher = watch(
            function () {
                return resolvePath(state, path);
            },
            function () {
                debounced(function () {
                    return livue.sync();
                });
            }
        );

        _bindings.set(el, { stopWatcher: stopWatcher });
    },

    unmounted(el) {
        let info = _bindings.get(el);

        if (info) {
            if (info.stopWatcher) {
                info.stopWatcher();
            }
            if (info.blurHandler) {
                el.removeEventListener('focusout', info.blurHandler);
            }
            _bindings.delete(el);
        }
    },
};
