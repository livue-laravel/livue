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

// Export built-in plugins for ESM users
export { ProgressPlugin } from './runtime/features/plugins/progress-plugin.js';
export { DevtoolsPlugin } from './runtime/features/plugins/devtools-plugin.js';
export { DebugPlugin } from './runtime/features/plugins/debug-plugin.js';
