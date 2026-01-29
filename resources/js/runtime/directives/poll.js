/**
 * v-poll Directive
 *
 * Automatically polls the server at regular intervals.
 * Enables automatic server refresh at configurable intervals.
 *
 * Usage:
 *   <div v-poll>...</div>                        <!-- Refresh every 2.5s -->
 *   <div v-poll="'refreshData'">...</div>        <!-- Call method every 2.5s -->
 *   <div v-poll.5s="'getData'">...</div>         <!-- Custom interval in seconds -->
 *   <div v-poll.500ms="'getData'">...</div>      <!-- Custom interval in milliseconds -->
 *   <div v-poll.visible="'getData'">...</div>    <!-- Only poll when visible -->
 *   <div v-poll.keep-alive>...</div>             <!-- Continue polling when tab inactive -->
 *
 * Modifiers:
 *   .Xs       - Interval in seconds (e.g., .5s, .10s)
 *   .Xms      - Interval in milliseconds (e.g., .500ms, .2000ms)
 *   .visible  - Only poll when element is in viewport
 *   .keep-alive - Continue polling even when tab is inactive
 */

/**
 * WeakMap to store poll state for cleanup.
 * @type {WeakMap<HTMLElement, object>}
 */
const pollState = new WeakMap();

/**
 * Default poll interval in milliseconds (2.5 seconds).
 */
const DEFAULT_INTERVAL = 2500;

/**
 * Parse interval from modifiers.
 *
 * @param {object} modifiers - Binding modifiers
 * @returns {number} - Interval in milliseconds
 */
function parseInterval(modifiers) {
    for (let key of Object.keys(modifiers)) {
        // Check for seconds format: 5s, 10s, etc.
        let secondsMatch = key.match(/^(\d+)s$/);
        if (secondsMatch) {
            return parseInt(secondsMatch[1], 10) * 1000;
        }

        // Check for milliseconds format: 500ms, 2000ms, etc.
        let msMatch = key.match(/^(\d+)ms$/);
        if (msMatch) {
            return parseInt(msMatch[1], 10);
        }
    }

    return DEFAULT_INTERVAL;
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
        let livue = getLivueFromVnode(vnode);

        if (!livue) {
            console.warn('[LiVue] v-poll: livue helper not found in component context');
            return;
        }

        let value = binding.value;
        let method = null;
        let params = [];

        // Parse value: string, array, or undefined (refresh)
        if (Array.isArray(value)) {
            method = value[0];
            params = value[1] || [];
        } else if (typeof value === 'string') {
            method = value;
        }
        // If no value, we'll call $refresh (re-render component)

        let modifiers = binding.modifiers || {};
        let interval = parseInterval(modifiers);
        let keepAlive = modifiers['keep-alive'] === true;
        let visibleOnly = modifiers.visible === true;

        // Track state
        let state = {
            intervalId: null,
            observer: null,
            isVisible: !visibleOnly, // If not visibleOnly, assume visible
            isPaused: false,
        };

        /**
         * Execute the poll action.
         */
        function doPoll() {
            // Skip if paused (tab inactive and not keep-alive)
            if (state.isPaused) {
                return;
            }

            // Skip if visibleOnly and not visible
            if (visibleOnly && !state.isVisible) {
                return;
            }

            if (method) {
                livue.call(method, params);
            } else {
                // No method specified = refresh component
                livue.call('$refresh', []);
            }
        }

        /**
         * Start the poll interval.
         */
        function startPoll() {
            if (state.intervalId) {
                return; // Already running
            }
            state.intervalId = setInterval(doPoll, interval);
        }

        /**
         * Stop the poll interval.
         */
        function stopPoll() {
            if (state.intervalId) {
                clearInterval(state.intervalId);
                state.intervalId = null;
            }
        }

        // Handle visibility changes (tab focus)
        function handleVisibilityChange() {
            if (keepAlive) {
                return; // Don't pause if keep-alive
            }

            if (document.hidden) {
                state.isPaused = true;
            } else {
                state.isPaused = false;
            }
        }

        // Setup IntersectionObserver for .visible modifier
        if (visibleOnly) {
            state.observer = new IntersectionObserver(
                function (entries) {
                    state.isVisible = entries[0].isIntersecting;
                },
                { threshold: 0 }
            );
            state.observer.observe(el);
        }

        // Listen for visibility changes (tab focus/blur)
        document.addEventListener('visibilitychange', handleVisibilityChange);
        state.visibilityHandler = handleVisibilityChange;

        // Start polling
        startPoll();

        // Store state for cleanup
        pollState.set(el, state);
    },

    unmounted(el) {
        let state = pollState.get(el);

        if (state) {
            // Stop interval
            if (state.intervalId) {
                clearInterval(state.intervalId);
            }

            // Disconnect observer
            if (state.observer) {
                state.observer.disconnect();
            }

            // Remove visibility listener
            if (state.visibilityHandler) {
                document.removeEventListener('visibilitychange', state.visibilityHandler);
            }

            pollState.delete(el);
        }
    },
};
