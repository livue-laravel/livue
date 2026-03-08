/**
 * LiVue built-in Progress Plugin.
 *
 * Subscribes to request hooks to show/hide the progress bar automatically.
 * Can be disabled via: LiVue.removePlugin('livue:progress')
 */

import { start, done, isRequestProgressEnabled } from '../../helpers/progress.js';

export const ProgressPlugin = {
    name: 'livue:progress',

    install(api) {
        api.hook('request.started', function () {
            if (isRequestProgressEnabled()) {
                start();
            }
        });

        api.hook('request.finished', function () {
            if (isRequestProgressEnabled()) {
                done();
            }
        });
    },
};
