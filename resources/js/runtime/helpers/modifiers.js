/**
 * Debounce and throttle utilities for LiVue action modifiers.
 *
 * Provides cached debounced/throttled versions of functions per method+delay,
 * so that repeated calls with the same modifier reuse the same timer.
 */

/**
 * Cache for debounced functions.
 * Key: "componentId:method:ms"
 * @type {Map<string, Function>}
 */
let _debounceMap = new Map();

/**
 * Cache for throttled functions.
 * Key: "componentId:method:ms"
 * @type {Map<string, Function>}
 */
let _throttleMap = new Map();

/**
 * Get or create a debounced executor.
 * The actual function to execute is passed as an argument each time.
 * This allows the debouncer to always execute the latest function.
 *
 * @param {string} key - Unique key (e.g., "livue-123:search")
 * @param {number} ms - Delay in milliseconds
 * @returns {Function} - Debounced executor: (fn) => Promise
 */
export function getDebounced(key, ms) {
    let cacheKey = key + ':debounce:' + ms;

    if (!_debounceMap.has(cacheKey)) {
        let timer = null;
        let latestFn = null;
        let latestResolve = null;
        let latestReject = null;

        let debounced = function (fn) {
            // Always capture the latest function to execute
            latestFn = fn;

            clearTimeout(timer);

            return new Promise(function (resolve, reject) {
                // Store the latest promise callbacks
                latestResolve = resolve;
                latestReject = reject;

                timer = setTimeout(function () {
                    // Use the latest captured function
                    let fnToRun = latestFn;
                    let resolveToUse = latestResolve;
                    let rejectToUse = latestReject;

                    // Reset state
                    latestFn = null;
                    latestResolve = null;
                    latestReject = null;

                    Promise.resolve(fnToRun())
                        .then(resolveToUse)
                        .catch(rejectToUse);
                }, ms);
            });
        };

        _debounceMap.set(cacheKey, debounced);
    }

    return _debounceMap.get(cacheKey);
}

/**
 * Get or create a throttled executor.
 * The actual function to execute is passed as an argument each time.
 * Calls during the cooldown period are dropped.
 *
 * @param {string} key - Unique key (e.g., "livue-123:increment")
 * @param {number} ms - Minimum interval in milliseconds
 * @returns {Function} - Throttled executor: (fn) => Promise (or null if dropped)
 */
export function getThrottled(key, ms) {
    let cacheKey = key + ':throttle:' + ms;

    if (!_throttleMap.has(cacheKey)) {
        let lastRun = 0;

        let throttled = function (fn) {
            let now = Date.now();

            if (now - lastRun < ms) {
                // Still in cooldown, drop this call
                return Promise.resolve(null);
            }

            lastRun = now;
            return Promise.resolve(fn());
        };

        _throttleMap.set(cacheKey, throttled);
    }

    return _throttleMap.get(cacheKey);
}

/**
 * Clear all modifiers for a specific component (on destroy).
 *
 * @param {string} componentId - The component ID prefix to clear
 */
export function clearModifiers(componentId) {
    let prefix = componentId + ':';

    for (let key of _debounceMap.keys()) {
        if (key.startsWith(prefix)) {
            _debounceMap.delete(key);
        }
    }

    for (let key of _throttleMap.keys()) {
        if (key.startsWith(prefix)) {
            _throttleMap.delete(key);
        }
    }
}

export default {
    getDebounced,
    getThrottled,
    clearModifiers,
};
