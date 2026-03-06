/**
 * LiVue - Server-driven reactivity for Laravel using Vue.js
 *
 * Entry point: boots the runtime on DOMContentLoaded
 * and exposes window.LiVue for global access.
 *
 * Vue is bundled and exposed globally so libraries like Vuetify
 * can use the same Vue instance (avoiding multiple Vue instances).
 */

// Import and expose Vue globally FIRST (before any other imports that use Vue)
import * as Vue from 'vue';
window.Vue = Vue;

// Import CSS as string and inject into DOM (single bundle)
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

// Apply progress config if present
if (config.showProgressOnRequest !== undefined) {
    LiVueRuntime.progress.configure({ showOnRequest: config.showProgressOnRequest });
}

// Boot when DOM is ready.
// In "interactive" state, wait for DOMContentLoaded/load to ensure deferred
// module scripts had time to register LiVue.setup() callbacks.
let _booted = false;
function bootLiVue() {
    if (_booted) {
        return;
    }

    _booted = true;
    LiVueRuntime.boot();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootLiVue, { once: true });
} else if (document.readyState === 'interactive') {
    document.addEventListener('DOMContentLoaded', bootLiVue, { once: true });
    window.addEventListener('load', bootLiVue, { once: true });
} else {
    queueMicrotask(bootLiVue);
}

// Expose globally
window.LiVue = LiVueRuntime;

export default LiVueRuntime;
