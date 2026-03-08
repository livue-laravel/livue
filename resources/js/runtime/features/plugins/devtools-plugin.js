/**
 * LiVue built-in DevTools plugin.
 *
 * Initializes the devtools panel and keyboard shortcut (Ctrl+Shift+L).
 * Can be disabled via LiVue.removePlugin('livue:devtools')
 */

import * as devtools from '../../devtools/index.js';

export const DevtoolsPlugin = {
    name: 'livue:devtools',
    install(api, options, runtime) {
        devtools.init(runtime);
    }
};
