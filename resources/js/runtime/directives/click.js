/**
 * v-click directive for LiVue.
 *
 * Provides a cleaner syntax for calling server methods on click events.
 * Cleaner alternative to @click="livue.call('method')".
 *
 * Usage:
 *   <button v-click:increment>+1</button>
 *   <button v-click:save="item.id">Save</button>
 *   <button v-click:update="[item.id, 'active']">Update</button>
 *
 * With modifiers:
 *   <button v-click:submit.prevent>Submit</button>
 *   <a v-click:navigate.prevent.stop="'/dashboard'">Go</a>
 *   <button v-click:save.debounce.500ms>Save</button>
 *   <button v-click:track.throttle.1000ms>Track</button>
 *   <div v-click:close.outside>Modal</div>
 *   <button v-click:init.once>Initialize</button>
 *   <div v-click:handleOverlay.self>Overlay</div>
 *
 * Alternative syntax (method name as value):
 *   <button v-click="'increment'">+1</button>
 */

import { getDebounced, getThrottled } from '../modifiers.js';

/**
 * WeakMap to store event handlers for cleanup.
 * @type {WeakMap<HTMLElement, object>}
 */
const handlers = new WeakMap();

/**
 * Counter for unique IDs (debounce/throttle cache keys).
 */
let _counter = 0;

/**
 * Parse timing value from modifiers (e.g., { '500ms': true } -> 500).
 *
 * @param {object} modifiers
 * @param {number} defaultMs - Default value if no timing specified
 * @returns {number}
 */
function parseTimingMs(modifiers, defaultMs = 250) {
    for (let mod in modifiers) {
        let match = mod.match(/^(\d+)(ms)?$/);
        if (match) {
            return parseInt(match[1], 10);
        }
    }
    return defaultMs;
}

/**
 * Get the livue helper from a vnode context.
 *
 * @param {object} vnode - Vue vnode
 * @returns {object|null} - livue helper or null
 */
function getLivueFromVnode(vnode) {
    let ctx = vnode.ctx;

    if (ctx && ctx.setupState && ctx.setupState.livue) {
        return ctx.setupState.livue;
    }

    if (ctx && ctx.parent && ctx.parent.setupState && ctx.parent.setupState.livue) {
        return ctx.parent.setupState.livue;
    }

    let parent = ctx ? ctx.parent : null;
    while (parent) {
        if (parent.setupState && parent.setupState.livue) {
            return parent.setupState.livue;
        }
        parent = parent.parent;
    }

    return null;
}

export default {
    mounted(el, binding, vnode) {
        const { arg, modifiers } = binding;

        const livue = getLivueFromVnode(vnode);

        if (!livue) {
            console.warn('[LiVue] v-click: livue helper not found in component context');
            return;
        }

        // Generate unique ID for debounce/throttle caching
        _counter++;
        const uniqueId = 'v-click-' + _counter;

        // Parse timing for debounce/throttle
        const timingMs = parseTimingMs(modifiers);

        // Get debounced/throttled executors if needed
        let debounced = null;
        let throttled = null;

        if (modifiers.debounce) {
            debounced = getDebounced(uniqueId, timingMs);
        }
        if (modifiers.throttle) {
            throttled = getThrottled(uniqueId, timingMs);
        }

        // Track if .once has fired
        let onceFired = false;

        // Determine method name at mount time (for static values)
        let staticMethod = null;
        if (arg) {
            staticMethod = arg;
        }

        /**
         * Core handler logic - extracted for reuse with .outside
         */
        const executeCall = function(event) {
            let methodName = staticMethod;
            let args = [];

            if (arg) {
                // v-click:methodName="args"
                methodName = arg;
                const currentValue = binding.value;
                if (currentValue !== undefined && currentValue !== null) {
                    args = Array.isArray(currentValue) ? currentValue : [currentValue];
                }
            } else {
                // v-click="'methodName'" or v-click="methodName"
                const currentValue = binding.value;
                if (typeof currentValue === 'string') {
                    methodName = currentValue;
                } else if (Array.isArray(currentValue) && currentValue.length > 0) {
                    methodName = currentValue[0];
                    args = currentValue.slice(1);
                }
            }

            if (!methodName) {
                console.warn('[LiVue] v-click: no method specified');
                return;
            }

            // Execute call (with debounce/throttle if applicable)
            const doCall = function() {
                livue.call(methodName, ...args);
            };

            if (debounced) {
                debounced(doCall);
            } else if (throttled) {
                throttled(doCall);
            } else {
                doCall();
            }
        };

        /**
         * Main click handler
         */
        const handler = function(event) {
            // .self - only if event originated from this element
            if (modifiers.self && event.target !== el) {
                return;
            }

            // .once - only fire once
            if (modifiers.once) {
                if (onceFired) {
                    return;
                }
                onceFired = true;
            }

            // Event modifiers
            if (modifiers.prevent) {
                event.preventDefault();
            }
            if (modifiers.stop) {
                event.stopPropagation();
            }

            executeCall(event);
        };

        // Build addEventListener options
        const listenerOptions = {};
        if (modifiers.capture) {
            listenerOptions.capture = true;
        }
        if (modifiers.passive) {
            listenerOptions.passive = true;
        }

        // Store info for cleanup
        const handlerInfo = {
            handler: handler,
            options: listenerOptions,
            outsideHandler: null,
        };

        // .outside - listen on document for clicks outside the element
        if (modifiers.outside) {
            const outsideHandler = function(event) {
                // Check if click was outside the element
                if (!el.contains(event.target) && event.target !== el) {
                    // .once support for outside clicks too
                    if (modifiers.once) {
                        if (onceFired) {
                            return;
                        }
                        onceFired = true;
                    }

                    executeCall(event);
                }
            };

            document.addEventListener('click', outsideHandler, listenerOptions);
            handlerInfo.outsideHandler = outsideHandler;
        } else {
            // Normal click on element
            el.addEventListener('click', handler, listenerOptions);
        }

        handlers.set(el, handlerInfo);
    },

    updated(el, binding, vnode) {
        // For dynamic arg changes, we'd need to rebind
        // But typically the arg (method name) is static
    },

    unmounted(el) {
        const handlerInfo = handlers.get(el);
        if (handlerInfo) {
            if (handlerInfo.outsideHandler) {
                document.removeEventListener('click', handlerInfo.outsideHandler, handlerInfo.options);
            } else {
                el.removeEventListener('click', handlerInfo.handler, handlerInfo.options);
            }
            handlers.delete(el);
        }
    }
};
