/**
 * v-ignore Directive
 *
 * Preserves element content during template swaps.
 * Useful for third-party widgets that manage their own DOM.
 *
 * Usage:
 *   <div v-ignore>
 *       <third-party-widget></third-party-widget>
 *   </div>
 *   <div v-ignore.self>
 *       <span>Dynamic content preserved</span>
 *   </div>
 *
 * Modifiers:
 *   (default) - Preserve entire element and all children
 *   .self     - Only preserve element itself (attributes), children can update
 *
 * The directive marks elements with a special attribute and ID that
 * the template swap logic in component.js uses to preserve content.
 */

let _ignoreCounter = 0;

export default {
    /**
     * Called before the element is inserted into the DOM.
     * We set up the ignore markers here.
     */
    created(el, binding) {
        // Generate unique ID for matching during template swap
        _ignoreCounter++;
        let ignoreId = 'livue-ignore-' + _ignoreCounter;

        // Store on element for the template swap logic
        el.__livue_ignore = true;
        el.__livue_ignore_self = binding.modifiers.self === true;
        el.__livue_ignore_id = ignoreId;

        // Add data attribute for CSS selection during template processing
        el.setAttribute('data-livue-ignore-id', ignoreId);

        if (binding.modifiers.self) {
            el.setAttribute('data-livue-ignore-self', '');
        }
    },

    mounted(el, binding) {
        // Ensure markers are present after mount
        if (!el.hasAttribute('data-livue-ignore-id')) {
            el.setAttribute('data-livue-ignore-id', el.__livue_ignore_id);
        }
    },

    unmounted(el) {
        // Cleanup
        delete el.__livue_ignore;
        delete el.__livue_ignore_self;
        delete el.__livue_ignore_id;
    },
};
