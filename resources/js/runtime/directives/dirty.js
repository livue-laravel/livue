/**
 * v-dirty Directive
 *
 * Shows/hides elements or modifies attributes based on dirty tracking state.
 * Reacts to client-side state changes compared to server-confirmed state.
 *
 * Usage:
 *   <div v-dirty>Modified!</div>                            -- Show when any property is dirty
 *   <div v-dirty:email>Email changed</div>                  -- Show when 'email' is dirty
 *   <div v-dirty.class="'border-yellow-500'">...</div>      -- Add class when any dirty
 *   <div v-dirty:email.class="'border-yellow-500'">...</div> -- Add class when 'email' dirty
 *   <div v-dirty.class.remove="'border-gray-300'">...</div> -- Remove class when dirty
 *   <div v-dirty.attr="'data-modified'">...</div>           -- Add attribute when dirty
 *
 * Modifiers:
 *   (default)     - Toggle visibility (hidden when clean, shown when dirty)
 *   .class        - Add the specified class(es) when dirty
 *   .class.remove - Remove the specified class(es) when dirty
 *   .attr         - Add the specified attribute when dirty
 */

import { watch } from 'vue';

/**
 * WeakMap to store dirty directive state for cleanup.
 * @type {WeakMap<HTMLElement, object>}
 */
const dirtyState = new WeakMap();

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
 * Apply dirty state to element.
 *
 * @param {HTMLElement} el - Target element
 * @param {object} state - Stored state
 * @param {object} modifiers - Directive modifiers
 * @param {*} value - Directive value (class name or attribute name)
 * @param {boolean} isDirty - Whether the target is dirty
 */
function applyDirtyState(el, state, modifiers, value, isDirty) {
    // Handle .class modifier
    if (modifiers.class) {
        if (!value) {
            return;
        }

        let classes = value.trim().split(/\s+/);

        if (modifiers.remove) {
            // .class.remove - Remove classes when dirty, restore when clean
            if (isDirty) {
                classes.forEach(function (cls) {
                    el.classList.remove(cls);
                });
            } else {
                classes.forEach(function (cls) {
                    el.classList.add(cls);
                });
            }
        } else {
            // .class - Add classes when dirty, remove when clean
            if (isDirty) {
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
        }
        return;
    }

    // Handle .attr modifier
    if (modifiers.attr) {
        let attrName = value || 'data-dirty';
        if (isDirty) {
            el.setAttribute(attrName, '');
            state.addedAttr = attrName;
        } else if (state.addedAttr) {
            el.removeAttribute(state.addedAttr);
            state.addedAttr = null;
        }
        return;
    }

    // Default: show/hide element (hidden when clean, shown when dirty)
    if (isDirty) {
        el.style.display = state.originalDisplay || '';
    } else {
        el.style.display = 'none';
    }
}

export default {
    created(el, binding) {
        let display = el.style.display;
        dirtyState.set(el, {
            originalDisplay: display === 'none' ? '' : display,
            addedClasses: [],
            addedAttr: null,
            stopWatch: null,
        });

        // For default show/hide mode, hide initially (clean state)
        let modifiers = binding.modifiers || {};
        if (!modifiers.class && !modifiers.attr) {
            el.style.display = 'none';
        }
    },

    mounted(el, binding, vnode) {
        let livue = getLivueFromVnode(vnode);

        if (!livue) {
            console.warn('[LiVue] v-dirty: livue helper not found in component context');
            return;
        }

        let state = dirtyState.get(el);
        let modifiers = binding.modifiers || {};
        let property = binding.arg || null;
        let value = binding.value;

        // Set up reactive watcher on dirty state
        state.stopWatch = watch(
            function () {
                return property ? livue.isDirty(property) : livue.isDirty();
            },
            function (isDirty) {
                applyDirtyState(el, state, modifiers, value, isDirty);
            },
            { immediate: true }
        );
    },

    updated(el, binding, vnode) {
        let state = dirtyState.get(el);
        if (!state) {
            return;
        }

        // If value changed dynamically, re-apply current state
        if (binding.value !== binding.oldValue) {
            let livue = getLivueFromVnode(vnode);
            if (livue) {
                let property = binding.arg || null;
                let isDirty = property ? livue.isDirty(property) : livue.isDirty();
                applyDirtyState(el, state, binding.modifiers || {}, binding.value, isDirty);
            }
        }
    },

    unmounted(el) {
        let state = dirtyState.get(el);

        if (state) {
            if (state.stopWatch) {
                state.stopWatch();
            }

            dirtyState.delete(el);
        }
    },
};
