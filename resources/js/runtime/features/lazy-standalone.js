/**
 * Standalone lazy component handling.
 *
 * <livue-lazy> elements inside a LiVue root are managed by Vue directly.
 * Those outside any root must be wrapped in a minimal LiVue root component
 * so the runtime can initialize them.
 */

/**
 * Find and wrap any standalone <livue-lazy> elements within a node.
 *
 * @param {HTMLElement} node - Element to search within
 * @param {Function} initComponent - Callback to initialize an element as a LiVue root
 */
export function processStandaloneLazy(node, initComponent) {
    var lazyElements = [];

    // Check if the node itself is a livue-lazy
    if (node.tagName && node.tagName.toLowerCase() === 'livue-lazy') {
        if (isStandaloneLazy(node)) {
            lazyElements.push(node);
        }
    }

    // Check for livue-lazy elements within the node
    if (node.querySelectorAll) {
        var found = node.querySelectorAll('livue-lazy');
        found.forEach(function (el) {
            if (isStandaloneLazy(el)) {
                lazyElements.push(el);
            }
        });
    }

    // Wrap each standalone lazy element
    lazyElements.forEach(function (el) {
        wrapStandaloneLazy(el, initComponent);
    });
}

/**
 * Check if a <livue-lazy> element is standalone (not inside a LiVue component).
 *
 * @param {HTMLElement} el
 * @returns {boolean}
 */
function isStandaloneLazy(el) {
    // Already wrapped?
    if (el.dataset.livueLazyWrapped) {
        return false;
    }

    // Walk up the DOM to see if there's a parent livue component
    var parent = el.parentElement;
    while (parent) {
        if (parent.hasAttribute('data-livue-id')) {
            return false; // Inside a LiVue component, Vue will handle it
        }
        parent = parent.parentElement;
    }

    return true; // Standalone
}

/**
 * Wrap a standalone <livue-lazy> element in a minimal LiVue root component.
 *
 * @param {HTMLElement} el
 * @param {Function} initComponent
 */
function wrapStandaloneLazy(el, initComponent) {
    // Mark as wrapped to avoid double processing
    el.dataset.livueLazyWrapped = 'true';

    var wrapper = document.createElement('div');
    var id = 'livue-lazy-wrapper-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

    var snapshot = {
        state: {},
        memo: {
            name: 'lazy-wrapper',
            checksum: '',
        },
    };

    wrapper.dataset.livueId = id;
    wrapper.dataset.livueSnapshot = JSON.stringify(snapshot);

    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);

    initComponent(wrapper);
}
