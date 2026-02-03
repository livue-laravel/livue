/**
 * URL query string synchronization for LiVue.
 *
 * Handles syncing component properties with browser URL parameters
 * based on #[Url] attribute configuration from the server.
 */

/**
 * Read initial values from the URL query string for the given URL params config.
 *
 * @param {object} urlParams - { propName: { as, history, keep, except } }
 * @returns {object} Values to apply to the state
 */
export function readQueryString(urlParams) {
    var url = new URL(window.location);
    var values = {};

    for (var prop in urlParams) {
        var config = urlParams[prop];
        var paramName = config.as || prop;
        var paramValue = url.searchParams.get(paramName);

        if (paramValue !== null) {
            values[prop] = paramValue;
        }
    }

    return values;
}

/**
 * Update the browser URL to reflect the current state of URL-bound properties.
 *
 * @param {object} urlParams - { propName: { as, history, keep, except } }
 * @param {object} state - The reactive state object
 */
export function updateQueryString(urlParams, state) {
    var url = new URL(window.location);
    var usePush = false;

    for (var prop in urlParams) {
        var config = urlParams[prop];
        var paramName = config.as || prop;
        var value = state[prop];

        // Determine if the value should be excluded from the URL
        var shouldExclude = false;

        if (config.except !== null && config.except !== undefined) {
            // Use loose comparison for except (string "1" matches int 1)
            if (String(value) === String(config.except)) {
                shouldExclude = true;
            }
        }

        if (!config.keep && !shouldExclude) {
            if (value === '' || value === null || value === undefined) {
                shouldExclude = true;
            }
        }

        if (shouldExclude) {
            url.searchParams.delete(paramName);
        } else {
            url.searchParams.set(paramName, value);
        }

        // If any param uses history mode, we push state
        if (config.history) {
            usePush = true;
        }
    }

    // Only update if the URL actually changed
    if (url.toString() !== window.location.toString()) {
        if (usePush) {
            history.pushState({}, '', url);
        } else {
            history.replaceState({}, '', url);
        }
    }
}
