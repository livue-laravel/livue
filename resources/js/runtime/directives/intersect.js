/**
 * v-intersect Directive
 *
 * Executes action when element enters/exits viewport using IntersectionObserver.
 * Uses IntersectionObserver to trigger actions on visibility.
 *
 * Usage:
 *   <div v-intersect="'loadMore'">...</div>
 *   <div v-intersect.once="'trackView'">...</div>
 *   <div v-intersect.leave="'onExit'">...</div>
 *   <div v-intersect.half="'halfVisible'">...</div>
 *   <div v-intersect.full="'fullyVisible'">...</div>
 *   <div v-intersect:100="'withMargin'">...</div>
 *
 * Modifiers:
 *   .once   - Only trigger once
 *   .leave  - Trigger when leaving viewport (default is enter)
 *   .half   - 50% visibility threshold
 *   .full   - 100% visibility threshold
 *   :N      - Custom margin in pixels (arg)
 */

/**
 * WeakMap to store observers for cleanup.
 * @type {WeakMap<HTMLElement, IntersectionObserver>}
 */
const observers = new WeakMap();

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
            console.warn('[LiVue] v-intersect: livue helper not found in component context');
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
            console.warn('[LiVue] v-intersect: expected method name (string), got', typeof method);
            return;
        }

        let modifiers = binding.modifiers || {};
        let arg = binding.arg; // margin value

        // Determine threshold
        let threshold = 0;
        if (modifiers.half) {
            threshold = 0.5;
        }
        if (modifiers.full) {
            threshold = 1.0;
        }

        // Determine margin
        let rootMargin = '0px';
        if (arg) {
            let marginValue = parseInt(arg, 10);
            if (!isNaN(marginValue)) {
                rootMargin = marginValue + 'px';
            }
        }

        // Track leave mode
        let isLeaveMode = modifiers.leave === true;
        let hasTriggered = false;

        // Create the IntersectionObserver
        let observer = new IntersectionObserver(
            function (entries) {
                let entry = entries[0];

                // Determine if we should trigger
                let shouldTrigger = isLeaveMode
                    ? !entry.isIntersecting
                    : entry.isIntersecting;

                if (shouldTrigger && (!modifiers.once || !hasTriggered)) {
                    hasTriggered = true;
                    livue.call(method, params);

                    // Disconnect if .once modifier
                    if (modifiers.once) {
                        observer.disconnect();
                        observers.delete(el);
                    }
                }
            },
            {
                threshold: threshold,
                rootMargin: rootMargin,
            }
        );

        observer.observe(el);
        observers.set(el, observer);
    },

    unmounted(el) {
        let observer = observers.get(el);

        if (observer) {
            observer.disconnect();
            observers.delete(el);
        }
    },
};
