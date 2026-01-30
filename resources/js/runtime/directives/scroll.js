/**
 * v-scroll Directive
 *
 * Marks an element for scroll position preservation during SPA navigation.
 * When navigating back/forward, the scroll position of marked elements
 * is saved and restored automatically.
 *
 * Usage:
 *   <aside v-scroll>...</aside>
 *   <aside v-scroll="'sidebar'">...</aside>
 *   <div v-scroll="'main-content'" class="overflow-y-auto">...</div>
 *
 * The directive sets `data-livue-scroll` which the navigation module uses
 * to save/restore scroll positions.
 *
 * When a value is provided, it's used as the scroll identifier.
 * When no value is provided, a unique ID is auto-generated.
 */

let _scrollCounter = 0;

export default {
    created(el, binding) {
        // Determine the scroll key
        let key = binding.value;

        if (!key) {
            // Auto-generate a unique key
            _scrollCounter++;
            key = 'scroll-' + _scrollCounter;
        }

        // Set the data attribute that the navigation module looks for
        el.setAttribute('data-livue-scroll', key);

        // Store for reference
        el.__livue_scroll_key = key;
    },

    updated(el, binding) {
        // Update key if it changed
        let key = binding.value;

        if (key && key !== el.__livue_scroll_key) {
            el.setAttribute('data-livue-scroll', key);
            el.__livue_scroll_key = key;
        }
    },

    unmounted(el) {
        // Cleanup
        el.removeAttribute('data-livue-scroll');
        delete el.__livue_scroll_key;
    },
};
