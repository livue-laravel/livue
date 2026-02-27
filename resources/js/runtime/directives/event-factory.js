/**
 * Event Directive Factory for LiVue.
 *
 * Creates Vue directives for any DOM event, with full modifier support.
 * Used by v-click and all other event directives (v-dblclick, v-keydown, etc.).
 *
 * Supported modifiers (all events):
 *   .prevent   - Call preventDefault()
 *   .stop      - Call stopPropagation()
 *   .self      - Only trigger when event.target === el
 *   .once      - Only fire once
 *   .debounce  - Debounce calls (default 250ms, configure with .Xms)
 *   .throttle  - Throttle calls (default 250ms, configure with .Xms)
 *   .confirm   - Use callWithConfirm instead of call
 *   .capture   - Use capture phase
 *   .passive   - Use passive listener
 *
 * Additional modifiers per option:
 *   .outside   - Only with supportsOutside: true (click)
 *
 * Key modifiers (keyboard events only, with isKeyboardEvent: true):
 *   .enter, .esc, .space, .tab, .up, .down, .left, .right
 *   .ctrl, .alt, .shift, .meta
 */

import { getDebounced, getThrottled } from '../helpers/modifiers.js';
import { getLivueFromVnode } from '../helpers/livue-context.js';

/**
 * Map of key modifier names to KeyboardEvent.key values.
 */
const KEY_MAP = {
    enter: 'Enter',
    esc: 'Escape',
    space: ' ',
    tab: 'Tab',
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
};

/**
 * System modifier keys (checked via event properties).
 */
const SYSTEM_MODIFIERS = ['ctrl', 'alt', 'shift', 'meta'];

/**
 * All known modifier names (non-timing, non-key).
 * Used to avoid matching timing values like "500ms" as unknown modifiers.
 */
const KNOWN_MODIFIERS = [
    'prevent', 'stop', 'self', 'once', 'debounce', 'throttle',
    'confirm', 'capture', 'passive', 'outside',
    'enter', 'esc', 'space', 'tab', 'up', 'down', 'left', 'right',
    'ctrl', 'alt', 'shift', 'meta',
];

/**
 * Global counter for unique IDs (debounce/throttle cache keys).
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
 * Check if a keyboard event matches the specified key modifiers.
 *
 * @param {KeyboardEvent} event
 * @param {object} modifiers - Vue binding modifiers
 * @returns {boolean} - true if event matches all specified key modifiers
 */
function matchesKeyModifiers(event, modifiers) {
    // Check system modifiers
    for (let i = 0; i < SYSTEM_MODIFIERS.length; i++) {
        let mod = SYSTEM_MODIFIERS[i];
        if (modifiers[mod] && !event[mod + 'Key']) {
            return false;
        }
    }

    // Check key modifiers - at least one key modifier must match
    let hasKeyModifier = false;
    let keyMatched = false;

    for (let name in KEY_MAP) {
        if (modifiers[name]) {
            hasKeyModifier = true;
            if (event.key === KEY_MAP[name]) {
                keyMatched = true;
            }
        }
    }

    // If key modifiers were specified, at least one must match
    if (hasKeyModifier && !keyMatched) {
        return false;
    }

    return true;
}

/**
 * Create a Vue directive for a specific DOM event.
 *
 * @param {string} eventName - DOM event name (e.g., 'click', 'mouseenter', 'keydown')
 * @param {object} [options={}] - Configuration options
 * @param {boolean} [options.supportsOutside=false] - Enable .outside modifier
 * @param {boolean} [options.isKeyboardEvent=false] - Enable key modifier support
 * @returns {object} - Vue directive object with mounted/updated/unmounted hooks
 */
export function createEventDirective(eventName, options = {}) {
    let supportsOutside = options.supportsOutside === true;
    let isKeyboardEvent = options.isKeyboardEvent === true;

    // Each directive gets its own WeakMap (supports multiple event directives on same element)
    const handlers = new WeakMap();

    return {
        mounted(el, binding, vnode) {
            const { arg, modifiers } = binding;

            const livue = getLivueFromVnode(vnode);

            if (!livue) {
                console.warn('[LiVue] v-' + eventName + ': livue helper not found in component context');
                return;
            }

            // Generate unique ID for debounce/throttle caching
            _counter++;
            const uniqueId = 'v-' + eventName + '-' + _counter;

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
                    // v-event:methodName="args"
                    methodName = arg;
                    const currentValue = binding.value;
                    if (currentValue !== undefined && currentValue !== null) {
                        args = Array.isArray(currentValue) ? currentValue : [currentValue];
                    }
                } else {
                    // v-event="'methodName'" or v-event="methodName"
                    const currentValue = binding.value;
                    if (typeof currentValue === 'function') {
                        // Direct function call: v-click="livue.increment" or v-click="() => livue.increment(2)"
                        const doCall = function() {
                            currentValue();
                        };

                        if (debounced) {
                            debounced(doCall);
                        } else if (throttled) {
                            throttled(doCall);
                        } else {
                            doCall();
                        }
                        return;
                    } else if (typeof currentValue === 'string') {
                        methodName = currentValue;
                    } else if (Array.isArray(currentValue) && currentValue.length > 0) {
                        methodName = currentValue[0];
                        args = currentValue.slice(1);
                    }
                }

                if (!methodName) {
                    console.warn('[LiVue] v-' + eventName + ': no method specified');
                    return;
                }

                // Execute call (with debounce/throttle if applicable)
                const doCall = function() {
                    if (modifiers.confirm) {
                        livue.callWithConfirm(methodName, 'Are you sure?', ...args);
                    } else {
                        livue.call(methodName, ...args);
                    }
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
             * Main event handler
             */
            const handler = function(event) {
                // .self - only if event originated from this element
                if (modifiers.self && event.target !== el) {
                    return;
                }

                // Key modifier filtering (keyboard events only)
                if (isKeyboardEvent && !matchesKeyModifiers(event, modifiers)) {
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

            // .outside - listen on document for events outside the element
            if (supportsOutside && modifiers.outside) {
                const outsideHandler = function(event) {
                    // Check if event was outside the element
                    if (!el.contains(event.target) && event.target !== el) {
                        // .once support for outside events too
                        if (modifiers.once) {
                            if (onceFired) {
                                return;
                            }
                            onceFired = true;
                        }

                        executeCall(event);
                    }
                };

                document.addEventListener(eventName, outsideHandler, listenerOptions);
                handlerInfo.outsideHandler = outsideHandler;
            } else {
                // Normal event on element
                el.addEventListener(eventName, handler, listenerOptions);
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
                    document.removeEventListener(eventName, handlerInfo.outsideHandler, handlerInfo.options);
                } else {
                    el.removeEventListener(eventName, handlerInfo.handler, handlerInfo.options);
                }
                handlers.delete(el);
            }
        }
    };
}
