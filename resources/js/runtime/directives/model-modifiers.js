/**
 * v-model Modifier Directives
 *
 * Separate directives that work alongside Vue's native v-model
 * to add timing and type modifiers.
 *
 * Usage:
 *   <input v-model="search" v-debounce:search.500ms>
 *   <input v-model="query" v-throttle:query.300ms>
 *   <input v-model="name" v-blur:name>
 *   <input v-model="term" v-enter:term>
 *   <input v-model="active" v-boolean:active>
 *
 * These directives:
 * 1. Require v-model to be present (throw error if missing)
 * 2. Intercept input events in capture phase
 * 3. Block v-model's handler via stopImmediatePropagation
 * 4. Apply the modifier behavior before updating state
 */

import { getDebounced, getThrottled } from '../modifiers.js';

/**
 * WeakMap to store directive state for cleanup.
 * @type {WeakMap<HTMLElement, object>}
 */
const _bindings = new WeakMap();

/**
 * Counter for unique IDs.
 */
let _counter = 0;

/**
 * Check if the vnode is a native form input element.
 * We only want to enforce v-model check on actual form elements,
 * not on Vue component wrappers (which render as divs, spans, etc.)
 *
 * @param {object} vnode
 * @returns {boolean}
 */
function isNativeFormElement(vnode) {
    let type = vnode.type;
    return type === 'input' || type === 'textarea' || type === 'select';
}

/**
 * Check if element has v-model bound (only reliable for native elements).
 * Vue compiles v-model to onInput (native) or onUpdate:modelValue (component).
 *
 * For Vue components, the directive receives the rendered root element,
 * not the component vnode, so we can't reliably check for v-model.
 *
 * @param {object} vnode
 * @returns {boolean}
 */
function hasVModel(vnode) {
    if (!vnode.props) {
        return false;
    }
    // Native elements use onInput or onUpdate:modelValue
    return !!(vnode.props.onInput || vnode.props['onUpdate:modelValue']);
}

/**
 * Get the component context and state from binding or vnode.
 * Uses binding.instance first (the component that owns the template),
 * then falls back to vnode.ctx traversal.
 *
 * @param {object} binding - Vue directive binding
 * @param {object} vnode - Vue vnode
 * @returns {object|null} - { state } or null
 */
function getContextFromBinding(binding, vnode) {
    // Try binding.instance first - this is the component that owns the template
    let instance = binding.instance;

    if (instance) {
        // In Vue 3, instance.$ gives access to the internal component instance
        let internal = instance.$ || instance._ || instance;

        if (internal.setupState && internal.setupState.livue) {
            return { state: internal.setupState };
        }

        // Check if instance itself has the properties (proxy)
        if (instance.livue) {
            // Need to get the actual setupState for refs
            let setupState = internal.setupState || instance;
            return { state: setupState };
        }
    }

    // Fallback to vnode.ctx traversal
    let ctx = vnode.ctx;

    if (ctx && ctx.setupState && ctx.setupState.livue) {
        return { state: ctx.setupState };
    }

    if (ctx && ctx.parent && ctx.parent.setupState && ctx.parent.setupState.livue) {
        return { state: ctx.parent.setupState };
    }

    let parent = ctx ? ctx.parent : null;
    while (parent) {
        if (parent.setupState && parent.setupState.livue) {
            return { state: parent.setupState };
        }
        parent = parent.parent;
    }

    return null;
}

/**
 * Get value from input element.
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
 * Update state property (handles Vue refs).
 *
 * @param {object} state
 * @param {string} property
 * @param {*} value
 */
function updateState(state, property, value) {
    let prop = state[property];
    if (prop && typeof prop === 'object' && 'value' in prop) {
        prop.value = value;
    } else {
        state[property] = value;
    }
}

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
 * Find the actual property name in state, handling case differences.
 * Vue lowercases directive arguments, so we need to find the matching property.
 *
 * @param {object} state - The state object
 * @param {string} arg - The directive argument (lowercased by Vue)
 * @returns {string|null} - The actual property name or null if not found
 */
function findPropertyName(state, arg) {
    // Direct match first
    if (arg in state) {
        return arg;
    }

    // Case-insensitive search
    let lowerArg = arg.toLowerCase();
    for (let key in state) {
        if (key.toLowerCase() === lowerArg) {
            return key;
        }
    }

    return null;
}

/**
 * Check if element is a native form element or a Vue component wrapper.
 *
 * @param {HTMLElement} el
 * @returns {boolean}
 */
function isNativeInput(el) {
    let tagName = el.tagName.toLowerCase();
    return tagName === 'input' || tagName === 'textarea' || tagName === 'select';
}

/**
 * Find the actual input element to attach listeners to.
 * For native inputs, returns the element itself.
 * For Vue component wrappers (like Vuetify), finds the internal input.
 *
 * @param {HTMLElement} el
 * @returns {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement|null}
 */
function findTargetInput(el) {
    if (isNativeInput(el)) {
        return el;
    }
    // For Vue components, look for internal input/textarea/select
    return el.querySelector('input, textarea, select');
}

/**
 * Create a directive that modifies v-model behavior.
 *
 * @param {string} name - Directive name for error messages
 * @param {Function} createHandler - Factory function: (el, property, state, modifiers, uniqueId) => { handler, eventType, options }
 * @returns {object} Vue directive definition
 */
function createModelModifierDirective(name, createHandler) {
    return {
        mounted(el, binding, vnode) {
            // Check for v-model only on native form elements (input, textarea, select)
            // For Vue components (which render as divs, etc.), we can't reliably detect v-model
            if (isNativeFormElement(vnode) && !hasVModel(vnode)) {
                throw new Error('[LiVue] v-' + name + ' requires v-model on the element. Usage: <input v-model="prop" v-' + name + ':prop>');
            }

            let argName = binding.arg;
            if (!argName) {
                throw new Error('[LiVue] v-' + name + ' requires property name as argument. Usage: v-' + name + ':propertyName');
            }

            let context = getContextFromBinding(binding, vnode);
            if (!context) {
                throw new Error('[LiVue] v-' + name + ': Could not find component context');
            }

            let { state } = context;

            // Find actual property name (Vue lowercases directive arguments)
            let property = findPropertyName(state, argName);
            if (!property) {
                throw new Error('[LiVue] v-' + name + ': Property "' + argName + '" not found in component state');
            }
            let modifiers = binding.modifiers || {};

            _counter++;
            let uniqueId = name + '-' + _counter;

            // Find the actual input element (might be nested in a Vue component)
            let targetEl = findTargetInput(el);

            if (!targetEl) {
                console.warn('[LiVue] v-' + name + ': Could not find input element inside component');
                return;
            }

            // Create the handler configuration
            let config = createHandler(targetEl, property, state, modifiers, uniqueId);

            // Add event listener in capture phase to intercept before v-model/component handlers
            targetEl.addEventListener(config.eventType, config.handler, { capture: true });

            // Store for cleanup (use original el as key, but store targetEl)
            _bindings.set(el, {
                targetEl: targetEl,
                handler: config.handler,
                eventType: config.eventType,
            });
        },

        unmounted(el) {
            let info = _bindings.get(el);
            if (info) {
                info.targetEl.removeEventListener(info.eventType, info.handler, { capture: true });
                _bindings.delete(el);
            }
        },
    };
}

/**
 * v-debounce directive
 * Debounces v-model updates.
 *
 * Usage: <input v-model="search" v-debounce:search.500ms>
 */
export const debounceDirective = createModelModifierDirective('debounce', function (el, property, state, modifiers, uniqueId) {
    let ms = parseTimingMs(modifiers) || 150;
    let debounced = getDebounced(uniqueId, ms);

    return {
        eventType: 'input',
        handler: function (e) {
            // Stop v-model from handling this event
            e.stopImmediatePropagation();

            let value = getInputValue(e.target);
            debounced(function () {
                updateState(state, property, value);
            });
        },
    };
});

/**
 * v-throttle directive
 * Throttles v-model updates.
 *
 * Usage: <input v-model="query" v-throttle:query.300ms>
 */
export const throttleDirective = createModelModifierDirective('throttle', function (el, property, state, modifiers, uniqueId) {
    let ms = parseTimingMs(modifiers) || 150;
    let throttled = getThrottled(uniqueId, ms);

    return {
        eventType: 'input',
        handler: function (e) {
            e.stopImmediatePropagation();

            let value = getInputValue(e.target);
            throttled(function () {
                updateState(state, property, value);
            });
        },
    };
});

/**
 * v-blur directive
 * Updates v-model only on blur event.
 *
 * Usage: <input v-model="name" v-blur:name>
 */
export const blurDirective = createModelModifierDirective('blur', function (el, property, state, modifiers, uniqueId) {
    // We need to block input events AND listen for blur
    let inputHandler = function (e) {
        // Block v-model's input handler
        e.stopImmediatePropagation();
    };

    let blurHandler = function (e) {
        updateState(state, property, getInputValue(e.target));
    };

    // Add blur listener (not in capture, just normal)
    el.addEventListener('blur', blurHandler);

    // Store blur handler for cleanup
    el._livueBlurHandler = blurHandler;

    return {
        eventType: 'input',
        handler: inputHandler,
    };
});

// Override unmounted for blur to also remove blur listener
const originalBlurUnmounted = blurDirective.unmounted;
blurDirective.unmounted = function (el) {
    let info = _bindings.get(el);
    let targetEl = info ? info.targetEl : el;
    if (targetEl._livueBlurHandler) {
        targetEl.removeEventListener('blur', targetEl._livueBlurHandler);
        delete targetEl._livueBlurHandler;
    }
    originalBlurUnmounted(el);
};

/**
 * v-enter directive
 * Updates v-model only on Enter keypress.
 *
 * Usage: <input v-model="term" v-enter:term>
 */
export const enterDirective = createModelModifierDirective('enter', function (el, property, state, modifiers, uniqueId) {
    // Block input events
    let inputHandler = function (e) {
        e.stopImmediatePropagation();
    };

    // Listen for Enter key
    let keyHandler = function (e) {
        if (e.key === 'Enter') {
            updateState(state, property, getInputValue(e.target));
        }
    };

    el.addEventListener('keyup', keyHandler);
    el._livueEnterHandler = keyHandler;

    return {
        eventType: 'input',
        handler: inputHandler,
    };
});

// Override unmounted for enter
const originalEnterUnmounted = enterDirective.unmounted;
enterDirective.unmounted = function (el) {
    let info = _bindings.get(el);
    let targetEl = info ? info.targetEl : el;
    if (targetEl._livueEnterHandler) {
        targetEl.removeEventListener('keyup', targetEl._livueEnterHandler);
        delete targetEl._livueEnterHandler;
    }
    originalEnterUnmounted(el);
};

/**
 * v-boolean directive
 * Casts v-model value to boolean.
 *
 * Usage: <input v-model="active" v-boolean:active>
 */
export const booleanDirective = createModelModifierDirective('boolean', function (el, property, state, modifiers, uniqueId) {
    return {
        eventType: 'input',
        handler: function (e) {
            e.stopImmediatePropagation();

            let value = getInputValue(e.target);
            // Cast to boolean
            value = Boolean(value) && value !== 'false' && value !== '0';
            updateState(state, property, value);
        },
    };
});

export default {
    debounceDirective,
    throttleDirective,
    blurDirective,
    enterDirective,
    booleanDirective,
};
