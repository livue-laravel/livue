/**
 * v-current Directive
 *
 * Highlights navigation links that match the current URL.
 * Applies CSS classes based on current route matching.
 *
 * Uses global event delegation (like v-navigate) so it works
 * correctly inside @persist containers where elements are moved
 * in the DOM without triggering Vue lifecycle hooks.
 *
 * Usage:
 *   <a href="/posts" v-current="'text-blue-600 font-bold'">Posts</a>
 *   <a href="/posts" v-current.exact="'active'">Posts</a>
 *   <a href="/posts" v-current.strict="'active'">Posts</a>
 *   <a href="/posts" v-current="{ active: 'text-white', inactive: 'text-gray-400' }">Posts</a>
 *
 * Modifiers:
 *   (default) - Partial match: current URL starts with href
 *   .exact    - Exact match (ignoring trailing slash)
 *   .strict   - Strict match (including trailing slash)
 *
 * The directive automatically updates when the URL changes via
 * popstate or livue:navigated events, using global listeners.
 */

/**
 * Global registry of elements using v-current.
 * @type {Set<HTMLElement>}
 */
var _elements = new Set();

/**
 * Per-element config storage.
 * @type {WeakMap<HTMLElement, { value: string|object, modifiers: object }>}
 */
var _configs = new WeakMap();

/**
 * Whether global listeners have been initialized.
 * @type {boolean}
 */
var _initialized = false;

/**
 * Parse classes string into a filtered array.
 *
 * @param {string} classes
 * @returns {string[]}
 */
function parseClasses(classes) {
    return classes.split(' ').filter(function (c) {
        return c.trim();
    });
}

/**
 * Check if the given href matches the current URL based on modifiers.
 *
 * @param {string} href
 * @param {object} modifiers
 * @returns {boolean}
 */
function isCurrentMatch(href, modifiers) {
    var currentPath = window.location.pathname;
    var linkPath;

    try {
        linkPath = new URL(href, window.location.origin).pathname;
    } catch (e) {
        return false;
    }

    if (modifiers.strict) {
        return currentPath === linkPath;
    }

    if (modifiers.exact) {
        var normalizedCurrent = currentPath.replace(/\/$/, '') || '/';
        var normalizedLink = linkPath.replace(/\/$/, '') || '/';
        return normalizedCurrent === normalizedLink;
    }

    // Partial match
    var normalizedLink = linkPath.replace(/\/$/, '') || '/';
    if (normalizedLink === '/') {
        return currentPath === '/';
    }
    return currentPath === normalizedLink ||
           currentPath.startsWith(normalizedLink + '/');
}

/**
 * Update current state for an element.
 *
 * @param {HTMLElement} el
 */
function updateCurrent(el) {
    var config = _configs.get(el);
    if (!config) return;

    var href = el.getAttribute('href');
    if (!href) return;

    var value = config.value;
    var modifiers = config.modifiers || {};
    var isMatch = isCurrentMatch(href, modifiers);

    if (typeof value === 'object' && value !== null) {
        // Object syntax: { active: '...', inactive: '...' }
        var activeClasses = value.active ? parseClasses(value.active) : [];
        var inactiveClasses = value.inactive ? parseClasses(value.inactive) : [];

        if (isMatch) {
            inactiveClasses.forEach(function (cls) { el.classList.remove(cls); });
            activeClasses.forEach(function (cls) { el.classList.add(cls); });
            el.setAttribute('data-current', '');
            el.setAttribute('aria-current', 'page');
        } else {
            activeClasses.forEach(function (cls) { el.classList.remove(cls); });
            inactiveClasses.forEach(function (cls) { el.classList.add(cls); });
            el.removeAttribute('data-current');
            el.removeAttribute('aria-current');
        }
    } else if (typeof value === 'string') {
        // String syntax (backward-compatible)
        var classList = parseClasses(value);

        if (isMatch) {
            classList.forEach(function (cls) { el.classList.add(cls); });
            el.setAttribute('data-current', '');
            el.setAttribute('aria-current', 'page');
        } else {
            classList.forEach(function (cls) { el.classList.remove(cls); });
            el.removeAttribute('data-current');
            el.removeAttribute('aria-current');
        }
    }
}

/**
 * Update all registered elements. Cleans up disconnected elements.
 */
function updateAll() {
    _elements.forEach(function (el) {
        if (el.isConnected) {
            updateCurrent(el);
        } else {
            _elements.delete(el);
            _configs.delete(el);
        }
    });
}

/**
 * Register global event listeners (once).
 */
function ensureGlobalListeners() {
    if (_initialized) return;
    _initialized = true;
    window.addEventListener('popstate', updateAll);
    window.addEventListener('livue:navigated', updateAll);
}

export default {
    mounted(el, binding) {
        // Register element in global registry
        _configs.set(el, { value: binding.value, modifiers: binding.modifiers || {} });
        _elements.add(el);

        // Ensure global listeners are set up
        ensureGlobalListeners();

        // Initial update
        updateCurrent(el);
    },

    updated(el, binding) {
        // Update config and re-evaluate
        _configs.set(el, { value: binding.value, modifiers: binding.modifiers || {} });
        updateCurrent(el);
    },

    unmounted(el) {
        // Clean up classes and attributes
        var config = _configs.get(el);
        if (config) {
            var value = config.value;
            if (typeof value === 'object' && value !== null) {
                var activeClasses = value.active ? parseClasses(value.active) : [];
                var inactiveClasses = value.inactive ? parseClasses(value.inactive) : [];
                activeClasses.forEach(function (cls) { el.classList.remove(cls); });
                inactiveClasses.forEach(function (cls) { el.classList.remove(cls); });
            } else if (typeof value === 'string') {
                parseClasses(value).forEach(function (cls) { el.classList.remove(cls); });
            }
        }
        el.removeAttribute('data-current');
        el.removeAttribute('aria-current');

        // Remove from registry
        _elements.delete(el);
        _configs.delete(el);
    },
};

// Export for testing
export { _elements, _configs, _initialized, updateAll };
