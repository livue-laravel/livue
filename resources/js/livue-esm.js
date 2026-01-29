/**
 * LiVue ESM Entry Point
 *
 * This is the entry point for importing LiVue as an ES module.
 * Use this when you need to customize the Vue instance (e.g., add Vuetify).
 *
 * Usage:
 *   import LiVue from 'livue';
 *   import { createVuetify } from 'vuetify';
 *
 *   const vuetify = createVuetify({...});
 *
 *   LiVue.setup((app) => {
 *       app.use(vuetify);
 *   });
 *
 * IMPORTANT: This entry point does NOT bundle Vue. Vue is resolved from
 * the user's node_modules, ensuring a single Vue instance is shared with
 * libraries like Vuetify.
 */

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
