/**
 * v-model-livue Directive
 *
 * Enhanced v-model with timing and type modifiers.
 * Provides timing and type modifiers for v-model.
 *
 * Supports both native HTML inputs AND Vue components (like Vuetify).
 *
 * Usage:
 *   <input v-model-livue:name>
 *   <input v-model-livue:name.blur>
 *   <input v-model-livue:search.debounce.300ms>
 *   <v-text-field v-model-livue:search.debounce.500ms>
 *
 * Modifiers:
 *   .blur          - Sync only on blur event
 *   .change/.lazy  - Sync only on change event
 *   .enter         - Sync only on Enter keypress
 *   .live          - Sync immediately with 150ms debounce
 *   .debounce.Xms  - Custom debounce (e.g., .debounce.300ms)
 *   .throttle.Xms  - Custom throttle (e.g., .throttle.500ms)
 *   .number        - Cast value to number
 *   .boolean       - Cast value to boolean
 *
 * The property name is passed as the directive argument:
 *   v-model-livue:propertyName
 */

import { getDebounced, getThrottled } from '../helpers/modifiers.js';
import { watch } from 'vue';

/**
 * WeakMap to store binding info for cleanup.
 * @type {WeakMap<HTMLElement, object>}
 */
const bindings = new WeakMap();

let _modelCounter = 0;

/**
 * Get the livue helper and state from a vnode context.
 *
 * @param {object} vnode - Vue vnode
 * @returns {object|null} - { livue, state } or null
 */
function getContextFromVnode(vnode) {
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
 * Parse timing modifiers from modifier object.
 * Vue compiles .debounce.500ms as { debounce: true, 500ms: true }
 * So we need to look for both patterns:
 * - Combined: debounce500ms, debounce.500ms
 * - Separate: debounce + 500ms (or just 500)
 *
 * @param {object} modifiers
 * @returns {object} { debounceMs, throttleMs }
 */
function parseTimingModifiers(modifiers) {
    let debounceMs = 0;
    let throttleMs = 0;
    let hasDebounce = false;
    let hasThrottle = false;
    let timingValue = 0;

    for (let mod in modifiers) {
        // Check for standalone debounce/throttle flags
        if (mod === 'debounce') {
            hasDebounce = true;
            continue;
        }
        if (mod === 'throttle') {
            hasThrottle = true;
            continue;
        }

        // Match combined pattern: debounce500ms or debounce.500ms
        let debounceMatch = mod.match(/^debounce\.?(\d+)(ms)?$/i);
        if (debounceMatch) {
            debounceMs = parseInt(debounceMatch[1], 10);
            continue;
        }

        // Match combined pattern: throttle500ms or throttle.500ms
        let throttleMatch = mod.match(/^throttle\.?(\d+)(ms)?$/i);
        if (throttleMatch) {
            throttleMs = parseInt(throttleMatch[1], 10);
            continue;
        }

        // Match standalone timing value: 500ms or just 500
        // Note: Vue compiles .500ms as modifier "500ms" (string with ms suffix)
        let timingMatch = mod.match(/^(\d+)(ms)?$/);
        if (timingMatch) {
            timingValue = parseInt(timingMatch[1], 10);
        }
    }

    // Apply standalone timing value to the appropriate flag
    if (hasDebounce && timingValue > 0) {
        debounceMs = timingValue;
    }
    if (hasThrottle && timingValue > 0) {
        throttleMs = timingValue;
    }

    // Default debounce if flag present but no value
    if (hasDebounce && debounceMs === 0) {
        debounceMs = 150; // Default debounce
    }
    if (hasThrottle && throttleMs === 0) {
        throttleMs = 150; // Default throttle
    }

    return { debounceMs, throttleMs };
}

/**
 * Get value from input element based on type.
 *
 * @param {HTMLElement} el
 * @returns {*}
 */
function getInputValue(el) {
    if (el.type === 'checkbox') {
        return el.checked;
    }
    if (el.type === 'radio') {
        return el.checked ? el.value : null;
    }
    if (el.tagName === 'SELECT' && el.multiple) {
        return Array.from(el.selectedOptions).map(function (opt) {
            return opt.value;
        });
    }
    return el.value;
}

/**
 * Set value on input element based on type.
 *
 * @param {HTMLElement} el
 * @param {*} value
 */
function setInputValue(el, value) {
    if (el.type === 'checkbox') {
        el.checked = Boolean(value);
    } else if (el.type === 'radio') {
        el.checked = el.value === String(value);
    } else if (el.tagName === 'SELECT' && el.multiple) {
        let values = Array.isArray(value) ? value.map(String) : [String(value)];
        Array.from(el.options).forEach(function (opt) {
            opt.selected = values.includes(opt.value);
        });
    } else {
        if (el.value !== String(value || '')) {
            el.value = value || '';
        }
    }
}

/**
 * Check if the vnode is a Vue component (not a native element).
 *
 * @param {object} vnode
 * @returns {boolean}
 */
function isVueComponent(vnode) {
    return !!(vnode.component);
}

/**
 * Find the internal input element within a Vue component's DOM.
 * Useful for component libraries like Vuetify.
 *
 * @param {HTMLElement} el - Root element of the component
 * @returns {HTMLInputElement|HTMLTextAreaElement|null}
 */
function findInternalInput(el) {
    // Try to find an input or textarea inside the component
    return el.querySelector('input, textarea, select');
}

export default {
    mounted(el, binding, vnode) {
        let context = getContextFromVnode(vnode);

        if (!context) {
            console.warn('[LiVue] v-model-livue: livue helper not found in component context');
            return;
        }

        let { livue, state } = context;
        let property = binding.arg;

        if (!property) {
            console.warn('[LiVue] v-model-livue requires property name as argument (v-model-livue:propertyName)');
            return;
        }

        let modifiers = binding.modifiers || {};

        // Generate unique ID for debounce/throttle
        _modelCounter++;
        let modelId = 'model-' + _modelCounter;

        // Determine event type for native inputs
        let eventType = 'input';
        if (modifiers.blur) {
            eventType = 'blur';
        }
        if (modifiers.change || modifiers.lazy) {
            eventType = 'change';
        }

        // Parse timing modifiers
        let { debounceMs, throttleMs } = parseTimingModifiers(modifiers);

        // Live mode: default 150ms debounce if no explicit timing
        if (modifiers.live && !debounceMs && !throttleMs) {
            debounceMs = 150;
        }

        /**
         * Update the state property with optional type casting.
         *
         * @param {*} value
         */
        function updateValue(value) {
            // Type casting
            if (modifiers.number) {
                let num = Number(value);
                value = isNaN(num) ? 0 : num;
            }
            if (modifiers.boolean) {
                value = Boolean(value) && value !== 'false' && value !== '0';
            }

            // Update state (this is a Vue ref)
            if (state[property] && typeof state[property] === 'object' && 'value' in state[property]) {
                state[property].value = value;
            } else {
                state[property] = value;
            }
        }

        /**
         * Create a value handler with optional timing (debounce/throttle).
         *
         * @param {*} value
         */
        function handleValueChange(value) {
            if (debounceMs > 0) {
                let debounced = getDebounced(modelId, debounceMs);
                debounced(function () {
                    updateValue(value);
                });
            } else if (throttleMs > 0) {
                let throttled = getThrottled(modelId, throttleMs);
                throttled(function () {
                    updateValue(value);
                });
            } else {
                updateValue(value);
            }
        }

        // Get initial value from state
        let initialValue;
        if (state[property] && typeof state[property] === 'object' && 'value' in state[property]) {
            initialValue = state[property].value;
        } else {
            initialValue = state[property];
        }

        // Check if this is a Vue component or native element
        let isComponent = isVueComponent(vnode);
        let componentInstance = vnode.component;
        let handler = null;
        let keyHandler = null;
        let stopWatcher = null;
        let originalEmit = null;

        if (isComponent && componentInstance) {
            // === VUE COMPONENT MODE ===
            // For Vue components (like Vuetify), we intercept the emit function
            // to catch 'update:modelValue' events

            // Store original emit
            originalEmit = componentInstance.emit;

            // Create wrapper that intercepts update:modelValue
            componentInstance.emit = function (event, ...args) {
                if (event === 'update:modelValue') {
                    let newValue = args[0];
                    handleValueChange(newValue);

                    // Don't call original emit - we're handling the update ourselves
                    // But we need to update the component's internal state
                    // by setting the prop through Vue's reactivity
                    return;
                }
                // For other events, call original
                return originalEmit.call(componentInstance, event, ...args);
            };

            // Set initial value on the component via props
            // We need to update the component's modelValue prop
            if (componentInstance.props && 'modelValue' in componentInstance.props) {
                // The component expects modelValue - we'll sync from our state
                // Watch our state and update component when it changes
                stopWatcher = watch(
                    function () {
                        if (state[property] && typeof state[property] === 'object' && 'value' in state[property]) {
                            return state[property].value;
                        }
                        return state[property];
                    },
                    function (newVal) {
                        // Update the component's vnode props to trigger re-render
                        if (componentInstance.vnode && componentInstance.vnode.props) {
                            componentInstance.vnode.props.modelValue = newVal;
                        }
                        // Also try to update via exposed or internal methods
                        if (componentInstance.exposed && typeof componentInstance.exposed.setValue === 'function') {
                            componentInstance.exposed.setValue(newVal);
                        }
                        // Force update the component
                        if (componentInstance.update) {
                            componentInstance.update();
                        }
                    },
                    { immediate: true }
                );
            }

            // Store for cleanup
            bindings.set(el, {
                isComponent: true,
                componentInstance: componentInstance,
                originalEmit: originalEmit,
                stopWatcher: stopWatcher,
                property: property,
                state: state,
                modifiers: modifiers,
            });
        } else {
            // === NATIVE INPUT MODE ===
            // For native HTML elements (input, textarea, select)

            // Create handler with timing
            if (debounceMs > 0) {
                let debounced = getDebounced(modelId, debounceMs);
                handler = function (e) {
                    let value = getInputValue(e.target);
                    debounced(function () {
                        updateValue(value);
                    });
                };
            } else if (throttleMs > 0) {
                let throttled = getThrottled(modelId, throttleMs);
                handler = function (e) {
                    let value = getInputValue(e.target);
                    throttled(function () {
                        updateValue(value);
                    });
                };
            } else {
                handler = function (e) {
                    updateValue(getInputValue(e.target));
                };
            }

            // Handle enter key modifier
            if (modifiers.enter) {
                keyHandler = function (e) {
                    if (e.key === 'Enter') {
                        updateValue(getInputValue(e.target));
                    }
                };
                el.addEventListener('keyup', keyHandler);
            } else {
                el.addEventListener(eventType, handler);
            }

            // Set initial value
            setInputValue(el, initialValue);

            // Store binding info for cleanup and updates
            bindings.set(el, {
                isComponent: false,
                handler: handler,
                keyHandler: keyHandler,
                eventType: eventType,
                property: property,
                modifiers: modifiers,
                state: state,
            });
        }
    },

    updated(el, binding, vnode) {
        let info = bindings.get(el);

        if (!info) {
            return;
        }

        // For native inputs, update element value from state
        if (!info.isComponent) {
            let { property, state } = info;
            let currentValue;

            if (state[property] && typeof state[property] === 'object' && 'value' in state[property]) {
                currentValue = state[property].value;
            } else {
                currentValue = state[property];
            }

            setInputValue(el, currentValue);
        }
        // For Vue components, the watcher handles updates
    },

    unmounted(el) {
        let info = bindings.get(el);

        if (info) {
            if (info.isComponent) {
                // Restore original emit function
                if (info.componentInstance && info.originalEmit) {
                    info.componentInstance.emit = info.originalEmit;
                }
                // Stop the watcher
                if (info.stopWatcher) {
                    info.stopWatcher();
                }
            } else {
                // Remove native event listeners
                if (info.keyHandler) {
                    el.removeEventListener('keyup', info.keyHandler);
                } else if (info.handler) {
                    el.removeEventListener(info.eventType, info.handler);
                }
            }
            bindings.delete(el);
        }
    },
};
