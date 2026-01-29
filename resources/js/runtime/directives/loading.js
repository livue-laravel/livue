/**
 * v-loading Directive
 *
 * Shows/hides elements or modifies attributes based on loading state.
 * Reactive loading indicators for server actions.
 *
 * Usage:
 *   <div v-loading>Loading...</div>                    -- Show when any action loading
 *   <div v-loading="'save'">Saving...</div>            -- Show when 'save' is loading
 *   <div v-loading.remove>Content</div>                -- Remove when loading
 *   <div v-loading.class="'opacity-50'">...</div>      -- Add class when loading
 *   <div v-loading.attr="'disabled'">...</div>         -- Add attribute when loading
 *   <div v-loading.delay>...</div>                     -- 200ms delay (default)
 *   <div v-loading.delay.shortest>...</div>            -- 50ms delay
 *   <div v-loading.delay.short>...</div>               -- 150ms delay
 *   <div v-loading.delay.long>...</div>                -- 1000ms delay
 *   <div v-loading.delay.longest>...</div>             -- 2000ms delay
 *
 * Modifiers can be combined:
 *   <div v-loading.class.delay.short="'opacity-50'">...</div>
 */

import { watch } from 'vue';

/**
 * WeakMap to store loading state for cleanup.
 * @type {WeakMap<HTMLElement, object>}
 */
const loadingState = new WeakMap();

/**
 * Delay presets in milliseconds.
 */
const DELAY_PRESETS = {
    shortest: 50,
    short: 150,
    long: 1000,
    longest: 2000,
};

/**
 * Default delay when .delay modifier is used without preset.
 */
const DEFAULT_DELAY = 200;

/**
 * Parse delay from modifiers.
 *
 * @param {object} modifiers - Binding modifiers
 * @returns {number} - Delay in milliseconds (0 if no delay)
 */
function parseDelay(modifiers) {
    if (!modifiers.delay) {
        return 0;
    }

    for (let key of Object.keys(DELAY_PRESETS)) {
        if (modifiers[key]) {
            return DELAY_PRESETS[key];
        }
    }

    return DEFAULT_DELAY;
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

/**
 * Apply loading state to element.
 *
 * @param {HTMLElement} el - Target element
 * @param {object} state - Stored state
 * @param {object} modifiers - Directive modifiers
 * @param {*} value - Directive value (class name, attribute, or action name)
 * @param {boolean} isLoading - Whether loading is active
 */
function applyLoadingState(el, state, modifiers, value, isLoading) {
    // Handle .remove modifier (inverse logic)
    if (modifiers.remove) {
        if (isLoading) {
            el.style.display = 'none';
        } else {
            el.style.display = state.originalDisplay;
        }
        return;
    }

    // Handle .class modifier
    if (modifiers.class) {
        let classes = (value || '').split(' ').filter(Boolean);
        if (isLoading) {
            classes.forEach(function (cls) {
                if (!state.addedClasses.includes(cls)) {
                    el.classList.add(cls);
                    state.addedClasses.push(cls);
                }
            });
        } else {
            state.addedClasses.forEach(function (cls) {
                el.classList.remove(cls);
            });
            state.addedClasses = [];
        }
        return;
    }

    // Handle .attr modifier
    if (modifiers.attr) {
        let attrName = value || 'disabled';
        if (isLoading) {
            el.setAttribute(attrName, '');
            state.addedAttr = attrName;
        } else if (state.addedAttr) {
            el.removeAttribute(state.addedAttr);
            state.addedAttr = null;
        }
        return;
    }

    // Default: show/hide element
    if (isLoading) {
        el.style.display = state.originalDisplay || '';
    } else {
        el.style.display = 'none';
    }
}

export default {
    created(el, binding) {
        // Store initial state
        let display = el.style.display;
        loadingState.set(el, {
            originalDisplay: display === 'none' ? '' : display,
            addedClasses: [],
            addedAttr: null,
            delayTimer: null,
            stopWatch: null,
            isActive: false,
        });

        // For default show/hide (not .remove), hide initially
        let modifiers = binding.modifiers || {};
        if (!modifiers.remove && !modifiers.class && !modifiers.attr) {
            el.style.display = 'none';
        }
    },

    mounted(el, binding, vnode) {
        let livue = getLivueFromVnode(vnode);

        if (!livue) {
            console.warn('[LiVue] v-loading: livue helper not found in component context');
            return;
        }

        let state = loadingState.get(el);
        let modifiers = binding.modifiers || {};
        let delay = parseDelay(modifiers);

        // Determine what to watch: specific action or any loading
        let value = binding.value;
        let action = null;
        let classOrAttr = null;

        // Parse value based on modifier
        if (modifiers.class || modifiers.attr) {
            classOrAttr = value;
        } else if (typeof value === 'string') {
            action = value;
        }

        /**
         * Update element based on loading state.
         * @param {boolean} isLoading
         */
        function updateElement(isLoading) {
            // Clear any pending delay timer
            if (state.delayTimer) {
                clearTimeout(state.delayTimer);
                state.delayTimer = null;
            }

            if (isLoading && delay > 0) {
                // Delay showing loading state
                state.delayTimer = setTimeout(function () {
                    state.isActive = true;
                    applyLoadingState(el, state, modifiers, classOrAttr, true);
                }, delay);
            } else if (isLoading) {
                state.isActive = true;
                applyLoadingState(el, state, modifiers, classOrAttr, true);
            } else {
                state.isActive = false;
                applyLoadingState(el, state, modifiers, classOrAttr, false);
            }
        }

        // Set up reactive watcher
        state.stopWatch = watch(
            function () {
                return action ? livue.isLoading(action) : livue.loading;
            },
            updateElement,
            { immediate: true }
        );
    },

    updated(el, binding, vnode) {
        // Handle dynamic value changes if needed
        let state = loadingState.get(el);
        if (!state) return;

        // Value might have changed, but we keep the same watcher
        // since it watches the same loading state
    },

    unmounted(el) {
        let state = loadingState.get(el);

        if (state) {
            // Clear delay timer
            if (state.delayTimer) {
                clearTimeout(state.delayTimer);
            }

            // Stop reactive watcher
            if (state.stopWatch) {
                state.stopWatch();
            }

            loadingState.delete(el);
        }
    },
};
