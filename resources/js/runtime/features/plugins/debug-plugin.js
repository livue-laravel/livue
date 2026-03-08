/**
 * LiVue built-in Debug plugin.
 *
 * Enables verbose hook logging when options.enabled is true, and can also be enabled
 * at any time via LiVue.debug(true).
 */

import { enable } from '../debug.js';

export const DebugPlugin = {
    name: 'livue:debug',
    install(api, options) {
        if (options && options.enabled) {
            enable();
        }
    }
};
