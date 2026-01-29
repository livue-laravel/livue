/**
 * LiVue Custom Directives
 *
 * Exports all built-in directives and registers them via the registry system.
 * Directives are registered at boot time and applied to all Vue apps.
 */

import { addDirective } from '../registry.js';

import initDirective from './init.js';
import submitDirective from './submit.js';
import intersectDirective from './intersect.js';
import currentDirective from './current.js';
import ignoreDirective from './ignore.js';
import modelDirective from './model.js';
import pollDirective from './poll.js';
import offlineDirective from './offline.js';
import transitionDirective from './transition.js';
import replaceDirective from './replace.js';
import loadingDirective from './loading.js';
import targetDirective from './target.js';
import streamDirective from './stream.js';
import clickDirective from './click.js';
import navigateDirective from './navigate.js';
import {
    debounceDirective,
    throttleDirective,
    blurDirective,
    enterDirective,
    booleanDirective,
} from './model-modifiers.js';
import {
    sortDirective,
    sortItemDirective,
    sortHandleDirective,
    sortIgnoreDirective,
    sortGroupDirective,
} from './sort.js';

/**
 * Register all built-in directives.
 * Called during LiVue boot.
 */
export function registerBuiltInDirectives() {
    // v-init: Execute function on mount
    addDirective('init', initDirective, null);

    // v-submit: Form submission with preventDefault
    addDirective('submit', submitDirective, null);

    // v-intersect: IntersectionObserver for viewport detection
    addDirective('intersect', intersectDirective, null);

    // v-current: Highlight current navigation links
    addDirective('current', currentDirective, null);

    // v-ignore: Preserve element during template swap
    addDirective('ignore', ignoreDirective, null);

    // v-model-livue: Enhanced v-model with modifiers (for testing/comparison)
    addDirective('model-livue', modelDirective, null);

    // v-model modifier directives (work with native v-model)
    addDirective('debounce', debounceDirective, null);
    addDirective('throttle', throttleDirective, null);
    addDirective('blur', blurDirective, null);
    addDirective('enter', enterDirective, null);
    addDirective('boolean', booleanDirective, null);

    // v-poll: Automatic polling at intervals
    addDirective('poll', pollDirective, null);

    // v-offline: Show content when offline
    addDirective('offline', offlineDirective, null);

    // v-transition: View Transitions API for smooth animations
    addDirective('transition', transitionDirective, null);

    // v-replace: Force element replacement instead of Vue reuse
    addDirective('replace', replaceDirective, null);

    // v-loading: Show/hide/modify elements based on loading state
    addDirective('loading', loadingDirective, null);

    // v-target: Auto-inject data-loading attribute for specific actions
    addDirective('target', targetDirective, null);

    // v-stream: Mark element as streaming target for $this->stream()
    addDirective('stream', streamDirective, null);

    // v-click: Cleaner syntax for calling server methods
    addDirective('click', clickDirective, null);

    // v-navigate: SPA navigation for links with prefetching
    addDirective('navigate', navigateDirective, null);

    // v-sort: Drag & Drop sorting (Wave 6.2)
    addDirective('sort', sortDirective, null);
    addDirective('sort-item', sortItemDirective, null);
    addDirective('sort-handle', sortHandleDirective, null);
    addDirective('sort-ignore', sortIgnoreDirective, null);
    addDirective('sort-group', sortGroupDirective, null);
}

export {
    initDirective,
    submitDirective,
    intersectDirective,
    currentDirective,
    ignoreDirective,
    modelDirective,
    debounceDirective,
    throttleDirective,
    blurDirective,
    enterDirective,
    booleanDirective,
    pollDirective,
    offlineDirective,
    transitionDirective,
    replaceDirective,
    loadingDirective,
    targetDirective,
    streamDirective,
    clickDirective,
    navigateDirective,
    sortDirective,
    sortItemDirective,
    sortHandleDirective,
    sortIgnoreDirective,
    sortGroupDirective,
};
