/**
 * v-navigate Directive
 *
 * Transforms links into SPA navigation links with optional prefetching.
 *
 * Usage:
 *   <a href="/dashboard" v-navigate>Dashboard</a>
 *   <a href="/posts" v-navigate.hover>Posts</a>
 *   <a href="/posts" v-navigate.prefetch>Posts</a> (same as .hover)
 *
 * Modifiers:
 *   (default) - Prefetch on mousedown (between mousedown and mouseup)
 *   .hover    - Prefetch on hover after 60ms delay
 *   .prefetch - Alias for .hover
 *
 * This directive marks links for SPA navigation by setting data attributes.
 * The actual click handling is done by a global event listener in navigation.js
 * using event delegation (more robust when elements are moved/preserved in DOM).
 */

export default {
    mounted(el, binding) {
        // Validate element type
        if (el.tagName !== 'A') {
            console.warn('[LiVue] v-navigate should only be used on <a> elements');
            return;
        }

        var modifiers = binding.modifiers || {};

        // Set data attributes for the navigation system (global click handler)
        el.setAttribute('data-livue-navigate', 'true');

        // Set prefetch mode
        if (modifiers.hover || modifiers.prefetch) {
            el.setAttribute('data-livue-navigate-mode', 'hover');
        }

        // Note: Click handling is done by the global handler in navigation.js
        // This ensures clicks work even when elements are moved in the DOM
        // (e.g., during @persist operations)
    },

    unmounted(el) {
        el.removeAttribute('data-livue-navigate');
        el.removeAttribute('data-livue-navigate-mode');
    },
};
