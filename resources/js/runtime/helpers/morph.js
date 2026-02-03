/**
 * DOM morphing utilities for LiVue.
 * Uses morphdom for efficient DOM diffing after server re-renders.
 */

import morphdom from 'morphdom';

/**
 * Morph the inner content of a wrapper element to match new HTML.
 * Preserves focus, scroll position, and form input values.
 *
 * @param {HTMLElement} wrapperEl - The component's wrapper div
 * @param {string} newInnerHtml - The new inner HTML from the server
 */
export function morphInnerHtml(wrapperEl, newInnerHtml) {
    var focusState = captureFocusState(wrapperEl);

    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = newInnerHtml;

    morphdom(wrapperEl, tempDiv, {
        childrenOnly: true,

        onBeforeElUpdated: function (fromEl, toEl) {
            // Skip nested LiVue component wrappers - they manage their own state
            if (fromEl !== wrapperEl && fromEl.hasAttribute('data-livue-id')) {
                return false;
            }

            // Preserve focused input/textarea/select values during morph
            if (fromEl === document.activeElement) {
                var tag = fromEl.tagName;

                if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
                    if (fromEl.type === 'checkbox' || fromEl.type === 'radio') {
                        toEl.checked = fromEl.checked;
                    } else {
                        toEl.value = fromEl.value;
                    }
                }
            }

            return true;
        },
    });

    restoreFocusState(wrapperEl, focusState);
}

/**
 * Capture current focus state within an element.
 *
 * @param {HTMLElement} container
 * @returns {object|null} Focus state descriptor
 */
function captureFocusState(container) {
    var activeEl = document.activeElement;

    if (!activeEl || !container.contains(activeEl)) {
        return null;
    }

    return {
        id: activeEl.id || null,
        name: activeEl.getAttribute('name') || null,
        selectionStart: activeEl.selectionStart !== undefined ? activeEl.selectionStart : null,
        selectionEnd: activeEl.selectionEnd !== undefined ? activeEl.selectionEnd : null,
        scrollTop: activeEl.scrollTop,
    };
}

/**
 * Restore focus state after morph.
 *
 * @param {HTMLElement} container
 * @param {object|null} focusState
 */
function restoreFocusState(container, focusState) {
    if (!focusState) {
        return;
    }

    var target = null;

    if (focusState.id) {
        target = container.querySelector('#' + CSS.escape(focusState.id));
    }

    if (!target && focusState.name) {
        target = container.querySelector('[name="' + focusState.name + '"]');
    }

    if (target && typeof target.focus === 'function') {
        target.focus();

        if (focusState.selectionStart !== null && typeof target.setSelectionRange === 'function') {
            try {
                target.setSelectionRange(focusState.selectionStart, focusState.selectionEnd);
            } catch (e) {
                // setSelectionRange throws on some input types (e.g., number)
            }
        }

        target.scrollTop = focusState.scrollTop;
    }
}
