/**
 * v-target Directive
 *
 * Auto-injects data-loading attribute on trigger elements when a specific
 * action is loading. Useful for Tailwind's data-[loading]: variant.
 *
 * Usage:
 *   <button @click="livue.call('save')" v-target="'save'">
 *       Save
 *   </button>
 *   <!-- Adds data-loading attribute when livue.isLoading('save') is true -->
 *
 *   With Tailwind:
 *   <button v-target="'save'" class="data-[loading]:opacity-50 data-[loading]:cursor-wait">
 *       Save
 *   </button>
 */

import { watch } from 'vue';

/**
 * WeakMap to store target state for cleanup.
 * @type {WeakMap<HTMLElement, object>}
 */
const targetState = new WeakMap();

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
        let livue = getLivueFromVnode(vnode);

        if (!livue) {
            console.warn('[LiVue] v-target: livue helper not found in component context');
            return;
        }

        let action = binding.value;

        if (!action) {
            console.warn('[LiVue] v-target: action name is required');
            return;
        }

        // Set up reactive watcher to toggle data-loading attribute
        let stopWatch = watch(
            function () {
                return livue.isLoading(action);
            },
            function (isLoading) {
                if (isLoading) {
                    el.setAttribute('data-loading', '');
                } else {
                    el.removeAttribute('data-loading');
                }
            },
            { immediate: true }
        );

        targetState.set(el, { stopWatch: stopWatch });
    },

    updated(el, binding, vnode) {
        // Handle value changes (different action)
        let state = targetState.get(el);
        let livue = getLivueFromVnode(vnode);

        if (!state || !livue) return;

        let newAction = binding.value;
        let oldAction = binding.oldValue;

        if (newAction !== oldAction) {
            // Stop old watcher and create new one
            if (state.stopWatch) {
                state.stopWatch();
            }

            state.stopWatch = watch(
                function () {
                    return livue.isLoading(newAction);
                },
                function (isLoading) {
                    if (isLoading) {
                        el.setAttribute('data-loading', '');
                    } else {
                        el.removeAttribute('data-loading');
                    }
                },
                { immediate: true }
            );
        }
    },

    unmounted(el) {
        let state = targetState.get(el);

        if (state) {
            if (state.stopWatch) {
                state.stopWatch();
            }
            targetState.delete(el);
        }
    },
};
