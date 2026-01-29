/**
 * v-submit Directive
 *
 * Handles form submission with automatic preventDefault.
 * Calls a server method on form submission.
 *
 * Usage:
 *   <form v-submit="'save'">...</form>
 *   <form v-submit="['save', [userId]]">...</form>
 *
 * Automatically prevents the default form submission and calls
 * the specified method via livue.call().
 */

/**
 * WeakMap to store event handlers for cleanup.
 * @type {WeakMap<HTMLElement, Function>}
 */
const handlers = new WeakMap();

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
        // Warn if not used on a form element
        if (el.tagName !== 'FORM') {
            console.warn('[LiVue] v-submit should be used on <form> elements, got <' + el.tagName.toLowerCase() + '>');
        }

        let livue = getLivueFromVnode(vnode);

        if (!livue) {
            console.warn('[LiVue] v-submit: livue helper not found in component context');
            return;
        }

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
            console.warn('[LiVue] v-submit: expected method name (string), got', typeof method);
            return;
        }

        // Create the submit handler
        let handler = function (e) {
            e.preventDefault();
            livue.call(method, params);
        };

        // Attach the handler
        el.addEventListener('submit', handler);

        // Store for cleanup
        handlers.set(el, handler);
    },

    unmounted(el) {
        let handler = handlers.get(el);

        if (handler) {
            el.removeEventListener('submit', handler);
            handlers.delete(el);
        }
    },
};
