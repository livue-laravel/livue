/**
 * DOM preservation utilities for LiVue template swaps.
 *
 * Handles v-ignore content preservation and child counter generation.
 * Used during template swaps to preserve user-modified DOM content
 * that should not be overwritten by server re-renders.
 */

/**
 * Global counter for generating unique child component tag names.
 */
let _childCounter = 0;

/**
 * Get and increment the child counter for unique tag names.
 * @returns {number} The next counter value
 */
export function nextChildCounter() {
    _childCounter++;
    return _childCounter;
}

/**
 * Storage for v-ignore preserved content.
 * Maps ignore-id to { html, isSelf, inputs }
 * @type {Map<string, object>}
 */
let _ignoredContent = new Map();

/**
 * Capture input values from an element and its descendants.
 * @param {HTMLElement} el
 * @returns {Array} Array of { selector, value, checked } objects
 */
function captureInputValues(el) {
    let inputs = [];
    let formElements = el.querySelectorAll('input, textarea, select');

    formElements.forEach(function (input, index) {
        let data = { index: index };

        if (input.type === 'checkbox' || input.type === 'radio') {
            data.checked = input.checked;
        } else if (input.tagName === 'SELECT') {
            data.value = input.value;
            if (input.multiple) {
                data.selectedOptions = Array.from(input.selectedOptions).map(function(opt) {
                    return opt.value;
                });
            }
        } else {
            data.value = input.value;
        }

        inputs.push(data);
    });

    return inputs;
}

/**
 * Restore input values to an element and its descendants.
 * @param {HTMLElement} el
 * @param {Array} inputs - Array from captureInputValues
 */
function restoreInputValues(el, inputs) {
    let formElements = el.querySelectorAll('input, textarea, select');

    inputs.forEach(function (data) {
        let input = formElements[data.index];
        if (!input) return;

        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = data.checked;
        } else if (input.tagName === 'SELECT' && input.multiple && data.selectedOptions) {
            Array.from(input.options).forEach(function(opt) {
                opt.selected = data.selectedOptions.includes(opt.value);
            });
        } else if (data.value !== undefined) {
            input.value = data.value;
        }
    });
}

/**
 * Capture content from v-ignore elements before template swap.
 * Call this BEFORE updating the template.
 *
 * @param {HTMLElement} container - The container element to search in
 */
export function captureIgnoredContent(container) {
    let ignored = container.querySelectorAll('[data-livue-ignore-id]');

    ignored.forEach(function (el) {
        let ignoreId = el.getAttribute('data-livue-ignore-id');
        let isSelf = el.hasAttribute('data-livue-ignore-self');

        _ignoredContent.set(ignoreId, {
            html: el.innerHTML,
            isSelf: isSelf,
            inputs: captureInputValues(el),
        });
    });
}

/**
 * Restore content to v-ignore elements after template swap.
 * Call this AFTER Vue has updated the DOM.
 *
 * @param {HTMLElement} container - The container element to search in
 */
export function restoreIgnoredContent(container) {
    let ignored = container.querySelectorAll('[data-livue-ignore-id]');

    ignored.forEach(function (el) {
        let ignoreId = el.getAttribute('data-livue-ignore-id');
        let preserved = _ignoredContent.get(ignoreId);

        if (preserved) {
            if (!preserved.isSelf) {
                // Restore entire content
                el.innerHTML = preserved.html;
            }
            // Restore input values (works for both modes)
            if (preserved.inputs && preserved.inputs.length > 0) {
                restoreInputValues(el, preserved.inputs);
            }
        }
    });
}
