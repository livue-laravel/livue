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

    var target = null;

    // 1. Try id (most reliable)
    if (focusState.id) {
        target = container.querySelector('#' + CSS.escape(focusState.id));
    }

    // 2. Try name attribute
    if (!target && focusState.name) {
        target = container.querySelector('[name="' + focusState.name + '"]');
    }

    // 3. Try tag + type + placeholder (disambiguates multiple inputs of the same type)
    if (!target && focusState.tagName === 'INPUT' && focusState.placeholder) {
        var selector = 'input';
        if (focusState.type) {
            selector += '[type="' + focusState.type + '"]';
        }
        selector += '[placeholder="' + CSS.escape(focusState.placeholder) + '"]';
        target = container.querySelector(selector);
    }

    // 4. Try tag + type + aria-label
    if (!target && focusState.tagName === 'INPUT' && focusState.ariaLabel) {
        var selector = 'input';
        if (focusState.type) {
            selector += '[type="' + focusState.type + '"]';
        }
        selector += '[aria-label="' + CSS.escape(focusState.ariaLabel) + '"]';
        target = container.querySelector(selector);
    }

    // 5. Last resort: tag + type when there's exactly one match
    if (!target && focusState.tagName === 'INPUT' && focusState.type) {
        var candidates = container.querySelectorAll('input[type="' + focusState.type + '"]');
        if (candidates.length === 1) {
            target = candidates[0];
        }
    }

    // 6. Textarea fallback (single match only)
    if (!target && focusState.tagName === 'TEXTAREA') {
        var candidates = container.querySelectorAll('textarea');
        if (candidates.length === 1) {
            target = candidates[0];
        }
    }

    // 7. Select fallback (single match only)
    if (!target && focusState.tagName === 'SELECT') {
        var candidates = container.querySelectorAll('select');
        if (candidates.length === 1) {
            target = candidates[0];
        }
    }

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
