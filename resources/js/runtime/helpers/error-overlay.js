/**
 * Error overlay for LiVue AJAX requests.
 *
 * When the server returns an HTML error page (Ignition, Whoops, or any 5xx
 * with text/html content-type) during a LiVue request, this module renders
 * the response in a fullscreen overlay via an iframe srcdoc so the error
 * page's own JS/CSS runs in isolation.
 *
 * Typical trigger: a developer calls dd() / dump() inside a LiVue action,
 * or an uncaught exception bubbles up while APP_DEBUG is true.
 *
 * Only meant for debug environments — the runtime gates activation on
 * window.LiVueConfig.debug (wired from Laravel's app.debug).
 */

let _enabled = false;
let _overlayEl = null;
let _stylesInjected = false;
let _keydownHandler = null;

export function configure(options) {
    if (options && typeof options.enabled === 'boolean') {
        _enabled = options.enabled;
    }
}

export function isEnabled() {
    return _enabled;
}

function injectStyles() {
    if (_stylesInjected || typeof document === 'undefined') {
        return;
    }

    const style = document.createElement('style');
    style.id = 'livue-error-overlay-styles';
    style.textContent = `
        .livue-error-overlay {
            position: fixed;
            inset: 0;
            z-index: 2147483646;
            background: rgba(0, 0, 0, 0.75);
            display: flex;
            flex-direction: column;
            padding: 24px;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .livue-error-overlay__bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            color: #fff;
            padding: 0 4px 12px;
            font-size: 13px;
        }
        .livue-error-overlay__label {
            opacity: 0.85;
        }
        .livue-error-overlay__status {
            display: inline-block;
            background: #dc2626;
            color: #fff;
            border-radius: 4px;
            padding: 2px 8px;
            margin-right: 8px;
            font-weight: 600;
            font-size: 12px;
            letter-spacing: 0.02em;
        }
        .livue-error-overlay__hint {
            opacity: 0.6;
            font-size: 12px;
        }
        .livue-error-overlay__close {
            background: rgba(255, 255, 255, 0.12);
            color: #fff;
            border: 0;
            border-radius: 6px;
            padding: 6px 14px;
            cursor: pointer;
            font-size: 13px;
            transition: background 120ms ease;
        }
        .livue-error-overlay__close:hover {
            background: rgba(255, 255, 255, 0.24);
        }
        .livue-error-overlay__frame {
            flex: 1;
            width: 100%;
            border: 0;
            border-radius: 8px;
            background: #fff;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
    `;
    document.head.appendChild(style);
    _stylesInjected = true;
}

/**
 * Render the overlay with the given HTML payload.
 *
 * @param {string} html      The full HTML document returned by the server.
 * @param {number} [status]  HTTP status code, used for the header badge.
 * @param {string} [url]     Request URL that triggered the response.
 */
export function show(html, status, url) {
    if (typeof document === 'undefined') {
        return;
    }

    injectStyles();

    // Replace any existing overlay so rapid successive errors don't stack.
    close();

    const overlay = document.createElement('div');
    overlay.className = 'livue-error-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'LiVue error overlay');

    const bar = document.createElement('div');
    bar.className = 'livue-error-overlay__bar';

    const label = document.createElement('div');
    label.className = 'livue-error-overlay__label';
    const statusBadge = document.createElement('span');
    statusBadge.className = 'livue-error-overlay__status';
    statusBadge.textContent = status ? String(status) : 'ERR';
    label.appendChild(statusBadge);
    label.appendChild(document.createTextNode(
        url ? 'LiVue server error — ' + url : 'LiVue server error'
    ));
    bar.appendChild(label);

    const right = document.createElement('div');
    right.style.display = 'flex';
    right.style.alignItems = 'center';
    right.style.gap = '12px';

    const hint = document.createElement('span');
    hint.className = 'livue-error-overlay__hint';
    hint.textContent = 'Press ESC to close';
    right.appendChild(hint);

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'livue-error-overlay__close';
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', close);
    right.appendChild(closeBtn);

    bar.appendChild(right);
    overlay.appendChild(bar);

    const frame = document.createElement('iframe');
    frame.className = 'livue-error-overlay__frame';
    frame.setAttribute('srcdoc', html);
    frame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups');
    overlay.appendChild(frame);

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            close();
        }
    });

    _keydownHandler = function (event) {
        if (event.key === 'Escape') {
            close();
        }
    };
    document.addEventListener('keydown', _keydownHandler);

    document.body.appendChild(overlay);
    _overlayEl = overlay;
}

export function close() {
    if (_keydownHandler) {
        document.removeEventListener('keydown', _keydownHandler);
        _keydownHandler = null;
    }
    if (_overlayEl && _overlayEl.parentNode) {
        _overlayEl.parentNode.removeChild(_overlayEl);
    }
    _overlayEl = null;
}

/**
 * If the response looks like a server error page we can display, render the
 * overlay and return true. Otherwise return false so the caller falls through
 * to its normal error handling.
 *
 * Consumes the response body (text()) only when we intend to show it.
 *
 * @param {Response} response  The fetch Response object.
 * @param {string}   [url]     Request URL, used for the header.
 * @returns {Promise<boolean>}
 */
export async function maybeShowFromResponse(response, url) {
    if (!_enabled || !response || response.ok) {
        return false;
    }

    if (response.status < 500) {
        return false;
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.indexOf('text/html') === -1) {
        return false;
    }

    let html;
    try {
        html = await response.text();
    } catch (e) {
        return false;
    }

    show(html, response.status, url);
    return true;
}
