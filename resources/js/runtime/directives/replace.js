/**
 * v-replace Directive
 *
 * Forces complete element replacement instead of Vue's default DOM reuse.
 * Useful for third-party widgets that need fresh DOM nodes.
 *
 * Usage:
 *   <div v-replace>
 *       <third-party-widget></third-party-widget>
 *   </div>
 *   <div v-replace.self>
 *       <span>Content</span>
 *   </div>
 *
 * Modifiers:
 *   (default) - Replace element and all children on each update
 *   .self     - Only force replacement of the element itself
 *
 * Use cases:
 *   - Third-party JavaScript widgets that manage their own state
 *   - Web Components with Shadow DOM
 *   - Elements that need fresh state on each render
 *
 * How it works:
 *   The directive injects a unique key that changes on each template swap,
 *   forcing Vue to recreate the element instead of reusing it.
 */

/**
 * Counter for generating unique replacement keys.
 */
let _replaceCounter = 0;

/**
 * WeakMap to store replace state.
 * @type {WeakMap<HTMLElement, object>}
 */
const replaceState = new WeakMap();

/**
 * Global map of replace element IDs to their current version.
 * Used by template processing to inject dynamic keys.
 * @type {Map<string, number>}
 */
export const replaceVersions = new Map();

/**
 * Get the next version number for a replace element.
 *
 * @param {string} replaceId - The replace element ID
 * @returns {number} - The new version number
 */
export function incrementReplaceVersion(replaceId) {
    let current = replaceVersions.get(replaceId) || 0;
    let next = current + 1;
    replaceVersions.set(replaceId, next);
    return next;
}

/**
 * Get current version for a replace element.
 *
 * @param {string} replaceId - The replace element ID
 * @returns {number}
 */
export function getReplaceVersion(replaceId) {
    return replaceVersions.get(replaceId) || 0;
}

export default {
    created(el, binding) {
        _replaceCounter++;
        let replaceId = 'livue-replace-' + _replaceCounter;
        let isSelf = binding.modifiers.self === true;

        // Store state
        replaceState.set(el, {
            id: replaceId,
            isSelf: isSelf,
            version: 0,
        });

        // Mark element for template processing
        el.setAttribute('data-livue-replace-id', replaceId);

        if (isSelf) {
            el.setAttribute('data-livue-replace-self', '');
        }

        // Initialize version in global map
        replaceVersions.set(replaceId, 0);
    },

    mounted(el, binding) {
        // Ensure markers are present
        let state = replaceState.get(el);
        if (state && !el.hasAttribute('data-livue-replace-id')) {
            el.setAttribute('data-livue-replace-id', state.id);
        }
    },

    beforeUpdate(el, binding) {
        // Increment version before update to force recreation
        let state = replaceState.get(el);
        if (state) {
            state.version++;
            replaceVersions.set(state.id, state.version);

            // Update the element's key attribute to force recreation
            // This works with Vue's :key binding
            el.setAttribute('data-livue-replace-version', state.version);
        }
    },

    unmounted(el) {
        let state = replaceState.get(el);
        if (state) {
            replaceVersions.delete(state.id);
        }
        replaceState.delete(el);
    },
};

/**
 * Process a template to inject dynamic keys for v-replace elements.
 * Called by the template processor before Vue renders.
 *
 * @param {string} template - The template HTML
 * @returns {string} - Processed template with injected keys
 */
export function processReplaceElements(template) {
    // Find all elements with data-livue-replace-id and inject :key bindings
    // This is a simple regex-based approach; a full parser could be more robust

    return template.replace(
        /(<[^>]*)\s+data-livue-replace-id="([^"]+)"([^>]*>)/g,
        function (match, before, replaceId, after) {
            let version = getReplaceVersion(replaceId);

            // Check if :key already exists
            if (before.includes(':key=') || after.includes(':key=')) {
                // Don't override existing key
                return match;
            }

            // Inject :key with the replace ID and version
            let key = replaceId + '-' + version;
            return before + ' data-livue-replace-id="' + replaceId + '" :key="' + "'" + key + "'" + '"' + after;
        }
    );
}
