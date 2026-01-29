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

// Boot when DOM is ready (handle case where DOMContentLoaded already fired)
// Use queueMicrotask to ensure setup() can be called before boot
function bootLiVue() {
    LiVueRuntime.boot();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootLiVue);
} else {
    // Delay boot to allow setup() to be called after import
    queueMicrotask(bootLiVue);
}

// Expose globally
window.LiVue = LiVueRuntime;

export default LiVueRuntime;
