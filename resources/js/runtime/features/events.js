/**
 * Lightweight event bus for LiVue.
 *
 * Supports three delivery modes:
 *   - broadcast: deliver to all listeners
 *   - self: deliver only to the source component instance
 *   - to: deliver to all instances of a named component
 */

import * as devtools from '../devtools/index.js';

/**
 * Registry: eventName → Set of { componentName, componentId, handler }
 * @type {Map<string, Set<object>>}
 */
var _listeners = new Map();

/**
 * Register a listener for an event.
 *
 * @param {string} eventName
 * @param {string} componentName - kebab-case component name
 * @param {string} componentId - unique livue instance ID
 * @param {Function} handler - function(data) called when event fires
 * @returns {Function} unsubscribe function
 */
export function on(eventName, componentName, componentId, handler) {
    if (!_listeners.has(eventName)) {
        _listeners.set(eventName, new Set());
    }

    var entry = {
        componentName: componentName,
        componentId: componentId,
        handler: handler,
    };

    _listeners.get(eventName).add(entry);

    return function () {
        var set = _listeners.get(eventName);
        if (set) {
            set.delete(entry);
            if (set.size === 0) {
                _listeners.delete(eventName);
            }
        }
    };
}

/**
 * Emit an event through the bus.
 *
 * @param {string} eventName
 * @param {*} data - event payload
 * @param {string} mode - 'broadcast', 'self', or 'to'
 * @param {string|null} sourceComponentName
 * @param {string|null} sourceComponentId
 * @param {string|null} target - target component name (for 'to' mode)
 */
export function emit(eventName, data, mode, sourceComponentName, sourceComponentId, target) {
    // Log event to devtools
    if (devtools.isCollecting()) {
        devtools.logEvent({
            name: eventName,
            data: data,
            mode: mode,
            source: sourceComponentName,
            sourceId: sourceComponentId,
            target: target,
        });
    }

    var set = _listeners.get(eventName);
    if (!set) {
        return;
    }

    set.forEach(function (entry) {
        var shouldDeliver = false;

        if (mode === 'broadcast') {
            shouldDeliver = true;
        } else if (mode === 'self') {
            shouldDeliver = (entry.componentId === sourceComponentId);
        } else if (mode === 'to') {
            shouldDeliver = (entry.componentName === target);
        }

        if (shouldDeliver) {
            try {
                entry.handler(data);
            } catch (e) {
                console.error('[LiVue] Event handler error for "' + eventName + '":', e);
            }
        }
    });
}

/**
 * Remove all listeners for a given component instance.
 *
 * @param {string} componentId
 */
export function removeByComponentId(componentId) {
    _listeners.forEach(function (set, eventName) {
        set.forEach(function (entry) {
            if (entry.componentId === componentId) {
                set.delete(entry);
            }
        });
        if (set.size === 0) {
            _listeners.delete(eventName);
        }
    });
}

/**
 * Process events received from a server response.
 *
 * @param {Array} events - array of { name, data, mode, target, source, sourceId }
 */
export function processServerEvents(events) {
    for (var i = 0; i < events.length; i++) {
        var evt = events[i];
        emit(evt.name, evt.data, evt.mode, evt.source, evt.sourceId, evt.target);
    }
}
