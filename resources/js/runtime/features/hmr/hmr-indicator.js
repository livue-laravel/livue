/**
 * HMR Indicator - Visual feedback for Hot Module Replacement.
 *
 * Shows a small toast notification when HMR updates occur.
 */

let indicatorEl = null;
let hideTimeout = null;
let isInjected = false;

/**
 * Inject the indicator styles.
 */
function injectStyles() {
    if (isInjected) {
        return;
    }
    isInjected = true;

    const style = document.createElement('style');
    style.textContent = `
        .livue-hmr-indicator {
            position: fixed;
            bottom: 16px;
            right: 16px;
            padding: 8px 16px;
            background: rgba(30, 30, 30, 0.95);
            color: #fff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 13px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 999998;
            display: flex;
            align-items: center;
            gap: 8px;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.2s, transform 0.2s;
            pointer-events: none;
        }

        .livue-hmr-indicator.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .livue-hmr-indicator .spinner {
            width: 14px;
            height: 14px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: livue-hmr-spin 0.8s linear infinite;
        }

        .livue-hmr-indicator .checkmark {
            color: #4ade80;
            font-size: 16px;
        }

        .livue-hmr-indicator .error-icon {
            color: #f87171;
            font-size: 16px;
        }

        @keyframes livue-hmr-spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Create the indicator element if it doesn't exist.
 */
function ensureIndicator() {
    if (indicatorEl) {
        return indicatorEl;
    }

    injectStyles();

    indicatorEl = document.createElement('div');
    indicatorEl.className = 'livue-hmr-indicator';
    document.body.appendChild(indicatorEl);

    return indicatorEl;
}

/**
 * Show the indicator with a specific state.
 *
 * @param {'updating'|'done'|'error'} state - The state to show
 * @param {string} [fileName] - Optional file name to display
 */
export function show(state, fileName) {
    const el = ensureIndicator();

    // Clear any pending hide timeout
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }

    // Set content based on state
    switch (state) {
        case 'updating':
            el.innerHTML = `
                <span class="spinner"></span>
                <span>Updating${fileName ? ': ' + fileName : '...'}</span>
            `;
            break;

        case 'done':
            el.innerHTML = `
                <span class="checkmark">&#10003;</span>
                <span>Updated</span>
            `;
            // Auto-hide after success
            hideTimeout = setTimeout(function () {
                hide();
            }, 1500);
            break;

        case 'error':
            el.innerHTML = `
                <span class="error-icon">&#10007;</span>
                <span>Update failed</span>
            `;
            // Auto-hide after error
            hideTimeout = setTimeout(function () {
                hide();
            }, 3000);
            break;
    }

    // Show the indicator
    requestAnimationFrame(function () {
        el.classList.add('visible');
    });
}

/**
 * Hide the indicator.
 */
export function hide() {
    if (!indicatorEl) {
        return;
    }

    indicatorEl.classList.remove('visible');
}

/**
 * Remove the indicator element entirely.
 */
export function destroy() {
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
    }

    if (indicatorEl) {
        indicatorEl.remove();
        indicatorEl = null;
    }
}
