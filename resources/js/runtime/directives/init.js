/**
 * v-init Directive
 *
 * Executes a function when the component mounts.
 * Useful for initial data loading or setup.
 *
 * Usage:
 *   <div v-init="'loadData'">...</div>
 *   <div v-init="['loadData', [param1, param2]]">...</div>
 *
 * The function is called via livue.call() which supports both
 * server methods and #[Vue] client-side methods.
 *
 * IMPORTANT: v-init only fires ONCE per component lifecycle.
 * Template swaps (from server responses) do NOT re-trigger v-init.
 * This prevents infinite loops when v-init calls a server method.
 */

/**
 * Track which component IDs have already been initialized.
 * This prevents v-init from firing again after template swaps.
 * @type {Set<string>}
 */
let _initializedComponents = new Set();

/**
 * Get the livue helper from a vnode context.
 * Traverses up the parent chain if needed.
 *
 * @param {object} vnode - Vue vnode
 * @returns {object|null} - livue helper or null
 */
function getLivueFromVnode(vnode) {
    let ctx = vnode.ctx;

    // Try direct setupState first
    if (ctx && ctx.setupState && ctx.setupState.livue) {
        return ctx.setupState.livue;
    }

    // Try parent's setupState (for nested elements)
    if (ctx && ctx.parent && ctx.parent.setupState && ctx.parent.setupState.livue) {
        return ctx.parent.setupState.livue;
    }

    // Walk up the parent chain
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
            console.warn('[LiVue] v-init: livue helper not found in component context');
            return;
        }

        // Find the component ID from the closest data-livue-id element
        let componentEl = el.closest('[data-livue-id]');
        let componentId = componentEl ? componentEl.dataset.livueId : null;

        // Create a unique key for this v-init instance
        // Combines component ID + method name to allow multiple v-init on same component
        let value = binding.value;
        let method;
        let params = [];

        // Parse value: string or [method, params] array
        if (Array.isArray(value)) {
            method = value[0];
            params = value[1] || [];
        } else {
            method = value;
        }

        if (typeof method !== 'string') {
            console.warn('[LiVue] v-init: expected method name (string), got', typeof method);
            return;
        }

        // Build unique key for this v-init
        let initKey = (componentId || 'unknown') + ':' + method;

        // Check if already initialized (prevents loops from template swaps)
        if (_initializedComponents.has(initKey)) {
            return;
        }

        // Mark as initialized
        _initializedComponents.add(initKey);

        // Call the method
        livue.call(method, params);
    },

    // NOTE: No unmounted cleanup - v-init should only fire ONCE per component
    // lifetime, even across template swaps. The _initializedComponents set
    // persists for the page lifetime. This is intentional to prevent loops.
};
