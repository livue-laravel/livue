/**
 * Focus preservation utilities for LiVue.
 * Captures and restores input focus state across template swaps.
 */

/**
 * Capture current focus state within a container element.
 * Should be called BEFORE a template swap to save focus position.
 *
 * @param {HTMLElement} container - The component's root element
 * @returns {object|null} Focus state descriptor, or null if no focus within container
 */
export function captureFocusState(container) {
    var activeEl = document.activeElement;

    if (!activeEl || !container.contains(activeEl)) {
        return null;
    }

    return {
        id: activeEl.id || null,
        name: activeEl.getAttribute('name') || null,
        tagName: activeEl.tagName,
        type: activeEl.type || null,
        placeholder: activeEl.getAttribute('placeholder') || null,
        ariaLabel: activeEl.getAttribute('aria-label') || null,
        selectionStart: activeEl.selectionStart !== undefined ? activeEl.selectionStart : null,
        selectionEnd: activeEl.selectionEnd !== undefined ? activeEl.selectionEnd : null,
        scrollTop: activeEl.scrollTop,
    };
}

/**
 * Find the element matching a captured focus state.
 * Uses a cascade of strategies from most to least reliable.
 *
 * @param {HTMLElement} container
 * @param {object} focusState
 * @returns {HTMLElement|null}
 */
function findFocusTarget(container, focusState) {
    // 1. id (most reliable)
    if (focusState.id) {
        return container.querySelector('#' + CSS.escape(focusState.id));
    }

    // 2. name attribute
    if (focusState.name) {
        return container.querySelector('[name="' + CSS.escape(focusState.name) + '"]');
    }

    // 3-4. INPUT with qualifier (placeholder or aria-label)
    if (focusState.tagName === 'INPUT') {
        var typeSelector = focusState.type ? '[type="' + focusState.type + '"]' : '';

        if (focusState.placeholder) {
            return container.querySelector('input' + typeSelector + '[placeholder="' + CSS.escape(focusState.placeholder) + '"]');
        }

        if (focusState.ariaLabel) {
            return container.querySelector('input' + typeSelector + '[aria-label="' + CSS.escape(focusState.ariaLabel) + '"]');
        }
    }

    // 5-7. Single-match fallback by tag type
    var fallbackSelector = null;
    if (focusState.tagName === 'INPUT' && focusState.type) {
        fallbackSelector = 'input[type="' + focusState.type + '"]';
    } else if (focusState.tagName === 'TEXTAREA') {
        fallbackSelector = 'textarea';
    } else if (focusState.tagName === 'SELECT') {
        fallbackSelector = 'select';
    }

    if (fallbackSelector) {
        var candidates = container.querySelectorAll(fallbackSelector);
        if (candidates.length === 1) {
            return candidates[0];
        }
    }

    return null;
}

/**
 * Restore focus state after a template swap.
 * Finds the matching element and re-applies focus + text selection.
 *
 * Uses a cascade of selectors (id → name → tag+type+placeholder → tag+type)
 * to find the best match even when inputs lack explicit identifiers
 * (common with component libraries like PrimeVue).
 *
 * @param {HTMLElement} container - The component's root element
 * @param {object|null} focusState - Previously captured focus state
 */
export function restoreFocusState(container, focusState) {
    if (!focusState) {
        return;
    }

    var target = findFocusTarget(container, focusState);

    if (target && typeof target.focus === 'function') {
        target.focus();

        // Restore text selection/cursor position
        if (focusState.selectionStart !== null && typeof target.setSelectionRange === 'function') {
            try {
                target.setSelectionRange(focusState.selectionStart, focusState.selectionEnd);
            } catch (e) {
                // setSelectionRange throws on some input types (e.g., number, email)
            }
        }

        target.scrollTop = focusState.scrollTop;
    }
}
