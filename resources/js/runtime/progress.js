/**
 * Progress bar for LiVue AJAX requests.
 * Inspired by NProgress - shows a thin progress bar at the top of the page.
 */

let _config = {
    color: '#29d',
    height: '2px',
    showSpinner: true,
    minimum: 0.08,
    easing: 'ease',
    speed: 200,
    trickle: true,
    trickleSpeed: 200,
    parent: 'body',
};

let _status = null;      // null = hidden, number = progress (0-1)
let _trickleTimer = null;
let _barEl = null;
let _spinnerEl = null;
let _stylesInjected = false;
let _pendingCount = 0;   // Track concurrent requests

/**
 * Clamp a number between min and max.
 */
function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
}

/**
 * Convert progress (0-1) to CSS translate percentage.
 */
function toBarPercent(n) {
    return (-1 + n) * 100;
}

/**
 * Inject CSS styles for the progress bar.
 */
function injectStyles() {
    if (_stylesInjected) return;
    _stylesInjected = true;

    let style = document.createElement('style');
    style.id = 'livue-progress-styles';
    style.textContent = `
        .livue-progress-bar {
            position: fixed;
            z-index: 99999;
            top: 0;
            left: 0;
            width: 100%;
            height: ${_config.height};
            background: ${_config.color};
            transform: translate3d(-100%, 0, 0);
            transition: transform ${_config.speed}ms ${_config.easing};
            pointer-events: none;
        }
        .livue-progress-peg {
            position: absolute;
            right: 0;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px ${_config.color}, 0 0 5px ${_config.color};
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px);
        }
        .livue-progress-spinner {
            display: block;
            position: fixed;
            z-index: 99999;
            top: 15px;
            right: 15px;
            pointer-events: none;
        }
        .livue-progress-spinner-icon {
            width: 18px;
            height: 18px;
            border: solid 2px transparent;
            border-top-color: ${_config.color};
            border-left-color: ${_config.color};
            border-radius: 50%;
            animation: livue-spinner 400ms linear infinite;
        }
        .livue-progress-bar.livue-progress-hidden,
        .livue-progress-spinner.livue-progress-hidden {
            opacity: 0;
            transition: opacity ${_config.speed}ms ${_config.easing};
        }
        @keyframes livue-spinner {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Create DOM elements for the progress bar.
 */
function createElements() {
    if (_barEl) return;

    injectStyles();

    // Create bar
    _barEl = document.createElement('div');
    _barEl.className = 'livue-progress-bar livue-progress-hidden';
    _barEl.innerHTML = '<div class="livue-progress-peg"></div>';

    // Create spinner
    if (_config.showSpinner) {
        _spinnerEl = document.createElement('div');
        _spinnerEl.className = 'livue-progress-spinner livue-progress-hidden';
        _spinnerEl.innerHTML = '<div class="livue-progress-spinner-icon"></div>';
    }

    let parent = document.querySelector(_config.parent) || document.body;
    parent.appendChild(_barEl);
    if (_spinnerEl) parent.appendChild(_spinnerEl);
}

/**
 * Update styles when config changes.
 */
function updateStyles() {
    if (!_stylesInjected) return;

    let style = document.getElementById('livue-progress-styles');
    if (style) {
        style.remove();
        _stylesInjected = false;
        injectStyles();
    }
}

/**
 * Configure progress bar options.
 *
 * @param {object} options
 * @param {string} [options.color] - Bar color (default: '#29d')
 * @param {string} [options.height] - Bar height (default: '2px')
 * @param {boolean} [options.showSpinner] - Show spinner icon (default: true)
 * @param {number} [options.minimum] - Minimum starting value (default: 0.08)
 * @param {string} [options.easing] - CSS easing function (default: 'ease')
 * @param {number} [options.speed] - Animation speed ms (default: 200)
 * @param {boolean} [options.trickle] - Auto-advance progress (default: true)
 * @param {number} [options.trickleSpeed] - Trickle interval ms (default: 200)
 * @param {string} [options.parent] - Parent element selector (default: 'body')
 */
export function configure(options) {
    Object.assign(_config, options);
    updateStyles();
}

/**
 * Start the progress bar.
 * Multiple concurrent starts are tracked - only first shows the bar,
 * and only last done() hides it.
 */
export function start() {
    _pendingCount++;

    if (_status !== null) {
        // Already showing, just track the new request
        return;
    }

    createElements();
    _status = 0;

    // Show elements
    if (_barEl) {
        _barEl.classList.remove('livue-progress-hidden');
    }
    if (_spinnerEl) {
        _spinnerEl.classList.remove('livue-progress-hidden');
    }

    set(_config.minimum);

    if (_config.trickle) {
        _trickleTimer = setInterval(function () {
            trickle();
        }, _config.trickleSpeed);
    }
}

/**
 * Set the progress bar to a specific value.
 *
 * @param {number} n - Progress value (0-1)
 */
export function set(n) {
    if (_status === null) return;

    n = clamp(n, _config.minimum, 1);
    _status = n;

    if (_barEl) {
        _barEl.style.transform = 'translate3d(' + toBarPercent(n) + '%, 0, 0)';
    }
}

/**
 * Increment progress by a small amount.
 * Amount decreases as progress approaches 1.
 */
export function trickle() {
    if (_status === null || _status >= 1) return;

    let amount;
    if (_status < 0.2) amount = 0.1;
    else if (_status < 0.5) amount = 0.04;
    else if (_status < 0.8) amount = 0.02;
    else if (_status < 0.99) amount = 0.005;
    else amount = 0;

    set(_status + amount);
}

/**
 * Complete the progress bar.
 * Only actually hides when all pending requests are done.
 */
export function done() {
    _pendingCount = Math.max(0, _pendingCount - 1);

    if (_pendingCount > 0) {
        // Still have pending requests
        return;
    }

    if (_status === null) return;

    // Complete the bar
    set(1);
    clearInterval(_trickleTimer);
    _trickleTimer = null;

    // Fade out after animation completes
    setTimeout(function () {
        if (_barEl) {
            _barEl.classList.add('livue-progress-hidden');
        }
        if (_spinnerEl) {
            _spinnerEl.classList.add('livue-progress-hidden');
        }

        // Reset position after fade
        setTimeout(function () {
            _status = null;
            if (_barEl) {
                _barEl.style.transform = 'translate3d(-100%, 0, 0)';
            }
        }, _config.speed);
    }, _config.speed);
}

/**
 * Force complete, ignoring pending count.
 */
export function forceDone() {
    _pendingCount = 0;
    done();
}

/**
 * Check if progress bar is currently showing.
 *
 * @returns {boolean}
 */
export function isStarted() {
    return _status !== null;
}

/**
 * Get current progress value.
 *
 * @returns {number|null}
 */
export function getStatus() {
    return _status;
}

export default {
    configure,
    start,
    set,
    trickle,
    done,
    forceDone,
    isStarted,
    getStatus,
};
