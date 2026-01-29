/**
 * v-offline Directive
 *
 * Shows content or modifies element when the device is offline.
 * Reacts to network connectivity changes.
 *
 * Usage:
 *   <div v-offline>You are offline</div>                    <!-- Show when offline -->
 *   <div v-offline.class="'bg-red-500'">...</div>           <!-- Add class when offline -->
 *   <div v-offline.class.remove="'bg-green-500'">...</div>  <!-- Remove class when offline -->
 *   <button v-offline.attr="'disabled'">Save</button>       <!-- Add attribute when offline -->
 *
 * Modifiers:
 *   (default)     - Toggle visibility (hidden by default, shown when offline)
 *   .class        - Add the specified class when offline
 *   .class.remove - Remove the specified class when offline
 *   .attr         - Add the specified attribute when offline
 */

/**
 * WeakMap to store offline state for cleanup.
 * @type {WeakMap<HTMLElement, object>}
 */
const offlineState = new WeakMap();

/**
 * Global online/offline state tracking.
 */
let _isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
let _listeners = new Set();

/**
 * Initialize global online/offline listeners (once).
 */
let _initialized = false;

function initGlobalListeners() {
    if (_initialized || typeof window === 'undefined') {
        return;
    }
    _initialized = true;

    window.addEventListener('online', function () {
        _isOnline = true;
        _listeners.forEach(function (callback) {
            callback(true);
        });
    });

    window.addEventListener('offline', function () {
        _isOnline = false;
        _listeners.forEach(function (callback) {
            callback(false);
        });
    });
}

export default {
    created(el, binding) {
        initGlobalListeners();

        let modifiers = binding.modifiers || {};
        let value = binding.value;

        // Determine mode
        let mode = 'visibility'; // default: show/hide
        if (modifiers.class) {
            mode = modifiers.remove ? 'class-remove' : 'class-add';
        } else if (modifiers.attr) {
            mode = 'attr';
        }

        let state = {
            mode: mode,
            value: value,
            originalDisplay: null,
        };

        // Store original display for visibility mode
        if (mode === 'visibility') {
            state.originalDisplay = el.style.display || '';
            // Initially hidden (online by default)
            if (_isOnline) {
                el.style.display = 'none';
            }
        }

        offlineState.set(el, state);
    },

    mounted(el, binding) {
        let state = offlineState.get(el);
        if (!state) {
            return;
        }

        /**
         * Update element based on online/offline status.
         *
         * @param {boolean} isOnline - Current online status
         */
        function updateElement(isOnline) {
            let isOffline = !isOnline;

            switch (state.mode) {
                case 'visibility':
                    if (isOffline) {
                        el.style.display = state.originalDisplay || '';
                    } else {
                        el.style.display = 'none';
                    }
                    break;

                case 'class-add':
                    if (state.value) {
                        // Split multiple classes by whitespace
                        let classesToAdd = state.value.trim().split(/\s+/);
                        if (isOffline) {
                            classesToAdd.forEach(function (cls) {
                                el.classList.add(cls);
                            });
                        } else {
                            classesToAdd.forEach(function (cls) {
                                el.classList.remove(cls);
                            });
                        }
                    }
                    break;

                case 'class-remove':
                    if (state.value) {
                        // Split multiple classes by whitespace
                        let classesToRemove = state.value.trim().split(/\s+/);
                        if (isOffline) {
                            classesToRemove.forEach(function (cls) {
                                el.classList.remove(cls);
                            });
                        } else {
                            classesToRemove.forEach(function (cls) {
                                el.classList.add(cls);
                            });
                        }
                    }
                    break;

                case 'attr':
                    if (state.value) {
                        if (isOffline) {
                            el.setAttribute(state.value, '');
                        } else {
                            el.removeAttribute(state.value);
                        }
                    }
                    break;
            }
        }

        // Apply initial state
        updateElement(_isOnline);

        // Store update function for later cleanup
        state.updateFn = updateElement;

        // Register listener
        _listeners.add(updateElement);
    },

    unmounted(el) {
        let state = offlineState.get(el);

        if (state && state.updateFn) {
            _listeners.delete(state.updateFn);
        }

        offlineState.delete(el);
    },
};
