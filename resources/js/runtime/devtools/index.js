/**
 * LiVue DevTools - Public API
 *
 * Exposes the DevTools interface for use via LiVue.devtools.
 */

import * as panel from './panel.js';
import { shouldAutoOpen } from './panel.js';
import * as collector from './collector.js';
import * as tree from './tree.js';

/**
 * Whether the devtools has been initialized.
 * @type {boolean}
 */
var _initialized = false;

/**
 * LiVue runtime reference.
 * @type {object|null}
 */
var _runtime = null;

/**
 * Initialize devtools with the LiVue runtime.
 * @param {object} runtime - The LiVueRuntime instance
 */
export function init(runtime) {
    if (_initialized) {
        return;
    }
    _runtime = runtime;
    panel.setRuntime(runtime);
    _initialized = true;

    // Auto-open if was previously open (persisted in localStorage)
    if (shouldAutoOpen()) {
        panel.open();
    }
}

/**
 * Open the DevTools panel.
 *
 * @example
 * LiVue.devtools.open();
 */
export function open() {
    if (!_initialized) {
        console.warn('[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.');
        return;
    }
    panel.open();
}

/**
 * Close the DevTools panel.
 *
 * @example
 * LiVue.devtools.close();
 */
export function close() {
    panel.close();
}

/**
 * Toggle the DevTools panel.
 *
 * @example
 * LiVue.devtools.toggle();
 */
export function toggle() {
    if (!_initialized) {
        console.warn('[LiVue DevTools] Not initialized. Call LiVue.devtools.init() first.');
        return;
    }
    panel.toggle();
}

/**
 * Check if the DevTools panel is open.
 *
 * @returns {boolean}
 *
 * @example
 * if (LiVue.devtools.isOpen()) { ... }
 */
export function isOpen() {
    return panel.isOpen();
}

/**
 * Get the component tree data structure.
 * Useful for programmatic access to component hierarchy.
 *
 * @returns {Array<object>} Array of root component nodes with children
 *
 * @example
 * const components = LiVue.devtools.getComponents();
 * console.log(components);
 */
export function getComponents() {
    return tree.buildTree();
}

/**
 * Get the request timeline history.
 *
 * @returns {Array<object>} Array of request entries
 *
 * @example
 * const requests = LiVue.devtools.getTimeline();
 * console.log(requests);
 */
export function getTimeline() {
    return collector.getRequests();
}

/**
 * Get the event history.
 *
 * @returns {Array<object>} Array of event entries
 *
 * @example
 * const events = LiVue.devtools.getEvents();
 * console.log(events);
 */
export function getEvents() {
    return collector.getEvents();
}

/**
 * Get performance metrics.
 *
 * @returns {object} Performance statistics
 *
 * @example
 * const perf = LiVue.devtools.getPerf();
 * console.log('Avg request time:', perf.avgRequestTime);
 */
export function getPerf() {
    return collector.getPerf();
}

/**
 * Clear the request timeline.
 *
 * @example
 * LiVue.devtools.clearTimeline();
 */
export function clearTimeline() {
    collector.clearRequests();
}

/**
 * Clear the event history.
 *
 * @example
 * LiVue.devtools.clearEvents();
 */
export function clearEvents() {
    collector.clearEvents();
}

/**
 * Clear all collected data (timeline, events, errors).
 *
 * @example
 * LiVue.devtools.clear();
 */
export function clear() {
    collector.clearAll();
}

/**
 * Add an event to the devtools event log.
 * Called internally when events are dispatched.
 *
 * @param {object} event - Event data
 */
export function logEvent(event) {
    collector.addEvent(event);
}

/**
 * Check if devtools is initialized.
 *
 * @returns {boolean}
 */
export function isInitialized() {
    return _initialized;
}

/**
 * Start collecting data without opening the panel.
 * Useful for background data collection.
 *
 * @example
 * LiVue.devtools.startCollecting();
 * // ... do stuff ...
 * const data = LiVue.devtools.getTimeline();
 */
export function startCollecting() {
    collector.start();
}

/**
 * Stop collecting data.
 *
 * @example
 * LiVue.devtools.stopCollecting();
 */
export function stopCollecting() {
    collector.stop();
}

/**
 * Check if data collection is active.
 *
 * @returns {boolean}
 */
export function isCollecting() {
    return collector.isActive();
}
