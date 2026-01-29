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
 * The link will use SPA navigation (fetch + swap) instead of full page reload.
 * On click, navigation happens via LiVue.navigate().
 */

import { navigateTo } from '../navigation.js';

/**
 * WeakMap to store cleanup functions.
 * @type {WeakMap<HTMLElement, Function>}
 */
var cleanups = new WeakMap();

/**
 * Handle click on navigate link.
 *
 * @param {Event} event
 * @param {HTMLElement} el
 */
function handleClick(event, el) {
    // Ignore if modifier keys are pressed (let browser handle)
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
    }

    // Ignore right-click
    if (event.button !== 0) {
        return;
    }

    var href = el.getAttribute('href');

    if (!href) {
        return;
    }

    // Ignore external links
    try {
        var url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) {
            return;
        }
    } catch (e) {
        return;
    }

    // Ignore anchor links
    if (href.startsWith('#')) {
        return;
    }

    // Ignore javascript: links
    if (href.startsWith('javascript:')) {
        return;
    }

    // Ignore download links
    if (el.hasAttribute('download')) {
        return;
    }

    // Ignore target="_blank" links
    if (el.getAttribute('target') === '_blank') {
        return;
    }

    event.preventDefault();

    // Navigate via LiVue SPA navigation
    navigateTo(href, true, false);
}

export default {
    mounted(el, binding) {
        // Validate element type
        if (el.tagName !== 'A') {
            console.warn('[LiVue] v-navigate should only be used on <a> elements');
            return;
        }

        var modifiers = binding.modifiers || {};

        // Set data attributes for prefetching system
        el.setAttribute('data-livue-navigate', 'true');

        // Set prefetch mode
        if (modifiers.hover || modifiers.prefetch) {
            el.setAttribute('data-livue-navigate-mode', 'hover');
        }

        // Create click handler bound to this element
        var clickHandler = function (event) {
            handleClick(event, el);
        };

        el.addEventListener('click', clickHandler);

        // Store cleanup function
        cleanups.set(el, function () {
            el.removeEventListener('click', clickHandler);
        });
    },

    unmounted(el) {
        var cleanup = cleanups.get(el);

        if (cleanup) {
            cleanup();
            cleanups.delete(el);
        }

        el.removeAttribute('data-livue-navigate');
        el.removeAttribute('data-livue-navigate-mode');
    },
};
