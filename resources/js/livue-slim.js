/**
 * LiVue Slim - Without bundled Vue
 *
 * Use this version when you have Vue already loaded (e.g., with Vuetify).
 * Requires window.Vue to be available before this script loads.
 *
 * For simple apps without Vuetify, use livue.js instead (includes Vue).
 */

// Verify Vue is available
if (typeof window.Vue === 'undefined') {
    console.error(
        '[LiVue] Vue is not loaded. When using livue.slim.js, you must load Vue before LiVue.\n' +
        'Either:\n' +
        '  1. Add Vue via CDN: <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>\n' +
        '  2. Or use livue.js instead (includes Vue bundled)'
    );
}

// Import CSS as string and inject into DOM
import css from '../css/livue.css?inline';

// Inject CSS into document head (only once)
if (typeof document !== 'undefined' && !document.getElementById('livue-styles')) {
    const style = document.createElement('style');
    style.id = 'livue-styles';
    style.textContent = css;
    document.head.appendChild(style);
}

import LiVueRuntime from './runtime/index.js';

// Read config from server-injected script (window.LiVueConfig)
var config = window.LiVueConfig || {};

// Apply navigation config if present
if (config.showProgressBar !== undefined ||
    config.progressBarColor !== undefined ||
    config.prefetch !== undefined ||
    config.prefetchOnHover !== undefined ||
    config.hoverDelay !== undefined ||
    config.cachePages !== undefined ||
    config.maxCacheSize !== undefined ||
    config.restoreScroll !== undefined) {
    LiVueRuntime.configureNavigation(config);
}

// Boot when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    LiVueRuntime.boot();
});

// Expose globally
window.LiVue = LiVueRuntime;

export default LiVueRuntime;
