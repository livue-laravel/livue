/**
 * v-current Directive
 *
 * Highlights navigation links that match the current URL.
 * Applies CSS classes based on current route matching.
 *
 * Usage:
 *   <a href="/posts" v-current="'text-blue-600 font-bold'">Posts</a>
 *   <a href="/posts" v-current.exact="'active'">Posts</a>
 *   <a href="/posts" v-current.strict="'active'">Posts</a>
 *
 * Modifiers:
 *   (default) - Partial match: current URL starts with href
 *   .exact    - Exact match (ignoring trailing slash)
 *   .strict   - Strict match (including trailing slash)
 *
 * The directive automatically updates when the URL changes via
 * pushState/replaceState or popstate events.
 */

/**
 * WeakMap to store cleanup functions.
 * @type {WeakMap<HTMLElement, Function>}
 */
const cleanups = new WeakMap();

/**
 * Update current state for an element.
 *
 * @param {HTMLElement} el
 * @param {object} binding
 */
function updateCurrent(el, binding) {
    let href = el.getAttribute('href');

    if (!href) {
        return;
    }

    let classes = binding.value;
    let modifiers = binding.modifiers || {};

    // Get current path and link path
    let currentPath = window.location.pathname;
    let linkPath;

    try {
        linkPath = new URL(href, window.location.origin).pathname;
    } catch (e) {
        // Invalid URL, skip
        return;
    }

    let isMatch = false;

    if (modifiers.strict) {
        // Strict: exact match including trailing slash
        isMatch = currentPath === linkPath;
    } else if (modifiers.exact) {
        // Exact: match without trailing slash consideration
        let normalizedCurrent = currentPath.replace(/\/$/, '') || '/';
        let normalizedLink = linkPath.replace(/\/$/, '') || '/';
        isMatch = normalizedCurrent === normalizedLink;
    } else {
        // Partial: current starts with link path
        let normalizedLink = linkPath.replace(/\/$/, '') || '/';
        // Ensure we don't match /posts for /posts-archive
        if (normalizedLink === '/') {
            isMatch = currentPath === '/';
        } else {
            isMatch = currentPath === normalizedLink ||
                      currentPath.startsWith(normalizedLink + '/');
        }
    }

    // Apply or remove classes
    if (typeof classes === 'string') {
        let classList = classes.split(' ').filter(function (c) {
            return c.trim();
        });

        if (isMatch) {
            classList.forEach(function (cls) {
                el.classList.add(cls);
            });
            el.setAttribute('data-current', '');
        } else {
            classList.forEach(function (cls) {
                el.classList.remove(cls);
            });
            el.removeAttribute('data-current');
        }
    }
}

export default {
    mounted(el, binding) {
        // Initial update
        updateCurrent(el, binding);

        // Listen for URL changes
        let onUrlChange = function () {
            updateCurrent(el, binding);
        };

        // popstate fires on back/forward navigation
        window.addEventListener('popstate', onUrlChange);

        // Custom event for LiVue SPA navigation
        window.addEventListener('livue:navigated', onUrlChange);

        // Store cleanup function
        cleanups.set(el, function () {
            window.removeEventListener('popstate', onUrlChange);
            window.removeEventListener('livue:navigated', onUrlChange);
        });
    },

    updated(el, binding) {
        updateCurrent(el, binding);
    },

    unmounted(el, binding) {
        // Remove classes
        let classes = binding.value;
        if (typeof classes === 'string') {
            classes.split(' ').filter(function (c) {
                return c.trim();
            }).forEach(function (cls) {
                el.classList.remove(cls);
            });
        }
        el.removeAttribute('data-current');

        // Call cleanup
        let cleanup = cleanups.get(el);
        if (cleanup) {
            cleanup();
            cleanups.delete(el);
        }
    },
};
