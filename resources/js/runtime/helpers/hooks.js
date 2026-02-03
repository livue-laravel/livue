/**
 * LiVue Hooks System
 *
 * A lightweight hook system for client-side lifecycle events.
 * Allows external code (plugins, libraries, developer code) to
 * tap into LiVue's internal lifecycle at various points.
 *
 * A client-side hook system adapted for LiVue's
 * Vue-based architecture (no morphing, uses template swapping).
 *
 * Available hooks:
 * - component.init: When a component is initialized (root or child)
 * - component.destroy: When a component is destroyed
 * - element.init: When each DOM element in a component is initialized
 * - request.started: When an AJAX request starts (pooled or isolated)
 * - request.finished: When an AJAX request completes
 * - template.updating: Before a component template is swapped
 * - template.updated: After a component template is swapped
 * - error.occurred: When an error occurs on any component
 */

/**
 * Registry of hook callbacks.
 * @type {Map<string, Set<Function>>}
 */
var _hooks = new Map();

/**
 * Available hook names (for validation).
 */
var HOOK_NAMES = [
    'component.init',
    'component.destroy',
    'element.init',
    'request.started',
    'request.finished',
    'template.updating',
    'template.updated',
    'error.occurred',
];

/**
 * Register a callback for a specific hook.
 *
 * @param {string} hookName - The hook to listen for
 * @param {Function} callback - The callback function
 * @returns {Function} Unsubscribe function
 *
 * @example
 * // Track all component initializations
 * const unsubscribe = LiVue.hook('component.init', ({ component, el, cleanup }) => {
 *     console.log('Component initialized:', component.name);
 *     cleanup(() => {
 *         console.log('Component cleanup');
 *     });
 * });
 *
 * // Later, stop listening
 * unsubscribe();
 */
export function hook(hookName, callback) {
    if (typeof hookName !== 'string') {
        console.warn('[LiVue Hooks] Invalid hook name:', hookName);
        return function () {};
    }

    if (typeof callback !== 'function') {
        console.warn('[LiVue Hooks] Callback must be a function');
        return function () {};
    }

    if (!_hooks.has(hookName)) {
        _hooks.set(hookName, new Set());
    }

    _hooks.get(hookName).add(callback);

    // Return unsubscribe function
    return function () {
        var set = _hooks.get(hookName);
        if (set) {
            set.delete(callback);
            if (set.size === 0) {
                _hooks.delete(hookName);
            }
        }
    };
}

/**
 * Trigger a hook with the given payload.
 * Callbacks are executed synchronously in registration order.
 *
 * @param {string} hookName - The hook to trigger
 * @param {object} payload - Data to pass to callbacks
 */
export function trigger(hookName, payload) {
    var callbacks = _hooks.get(hookName);
    if (!callbacks || callbacks.size === 0) {
        return;
    }

    callbacks.forEach(function (callback) {
        try {
            callback(payload);
        } catch (error) {
            console.error('[LiVue Hooks] Error in "' + hookName + '" callback:', error);
        }
    });
}

/**
 * Trigger a hook asynchronously.
 * Awaits each callback before proceeding to the next.
 *
 * @param {string} hookName - The hook to trigger
 * @param {object} payload - Data to pass to callbacks
 * @returns {Promise<void>}
 */
export async function triggerAsync(hookName, payload) {
    var callbacks = _hooks.get(hookName);
    if (!callbacks || callbacks.size === 0) {
        return;
    }

    for (var callback of callbacks) {
        try {
            await callback(payload);
        } catch (error) {
            console.error('[LiVue Hooks] Error in async "' + hookName + '" callback:', error);
        }
    }
}

/**
 * Create a cleanup collector for component lifecycle hooks.
 * Allows hooks to register cleanup functions that run when
 * the component is destroyed.
 *
 * @returns {{ cleanup: Function, runCleanups: Function }}
 */
export function createCleanupCollector() {
    var cleanups = [];

    return {
        /**
         * Register a cleanup function.
         * @param {Function} fn - Cleanup function
         */
        cleanup: function (fn) {
            if (typeof fn === 'function') {
                cleanups.push(fn);
            }
        },

        /**
         * Run all registered cleanup functions.
         */
        runCleanups: function () {
            cleanups.forEach(function (fn) {
                try {
                    fn();
                } catch (error) {
                    console.error('[LiVue Hooks] Error in cleanup:', error);
                }
            });
            cleanups = [];
        },
    };
}

/**
 * Check if a hook has any registered callbacks.
 *
 * @param {string} hookName - The hook to check
 * @returns {boolean}
 */
export function hasListeners(hookName) {
    var callbacks = _hooks.get(hookName);
    return callbacks && callbacks.size > 0;
}

/**
 * Get the count of registered callbacks for a hook.
 *
 * @param {string} hookName - The hook to check
 * @returns {number}
 */
export function listenerCount(hookName) {
    var callbacks = _hooks.get(hookName);
    return callbacks ? callbacks.size : 0;
}

/**
 * Clear all hooks (useful for testing).
 */
export function clearAll() {
    _hooks.clear();
}

/**
 * Get list of all available hook names.
 * @returns {string[]}
 */
export function getAvailableHooks() {
    return HOOK_NAMES.slice();
}
