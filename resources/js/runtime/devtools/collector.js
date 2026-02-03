/**
 * LiVue DevTools - Data Collector
 *
 * Collects data from the LiVue runtime using the hooks system.
 * Stores components, requests, events, and performance metrics.
 */

import { hook } from '../helpers/hooks.js';
import { getAllRegistrations } from '../core/registry.js';
import { getDetailedSubscriptions } from '../features/echo.js';

/**
 * Maximum number of entries to store in history.
 */
var MAX_REQUESTS = 100;
var MAX_EVENTS = 200;
var MAX_ERRORS = 50;

/**
 * Collector state.
 */
var _state = {
    /** @type {Map<string, object>} Component ID -> component info */
    components: new Map(),

    /** @type {Array<object>} Request history */
    requests: [],

    /** @type {Map<string, object>} Pending requests by ID */
    pendingRequests: new Map(),

    /** @type {Array<object>} Event history */
    events: [],

    /** @type {Array<object>} Error history */
    errors: [],

    /** @type {object} Performance metrics */
    perf: {
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        totalRequestTime: 0,
        avgRequestTime: 0,
        minRequestTime: Infinity,
        maxRequestTime: 0,
        totalTemplateSwaps: 0,
        totalTemplateSwapTime: 0,
        avgTemplateSwapTime: 0,
    },

    /** @type {Map<string, number>} Pending template swaps start times */
    pendingSwaps: new Map(),
};

/**
 * Hook unsubscribe functions.
 */
var _unsubscribers = [];

/**
 * Whether the collector is active.
 */
var _active = false;

/**
 * Listeners for state changes.
 */
var _listeners = new Set();

/**
 * Notify listeners of state change.
 */
function notifyListeners() {
    _listeners.forEach(function (listener) {
        try {
            listener();
        } catch (e) {
            console.error('[LiVue DevTools] Listener error:', e);
        }
    });
}

/**
 * Generate a unique request ID.
 */
var _requestCounter = 0;
function generateRequestId() {
    return 'req-' + (++_requestCounter) + '-' + Date.now();
}

/**
 * Format timestamp to HH:MM:SS.mmm
 */
function formatTime(timestamp) {
    var date = new Date(timestamp);
    var h = date.getHours().toString().padStart(2, '0');
    var m = date.getMinutes().toString().padStart(2, '0');
    var s = date.getSeconds().toString().padStart(2, '0');
    var ms = date.getMilliseconds().toString().padStart(3, '0');
    return h + ':' + m + ':' + s + '.' + ms;
}

/**
 * Start collecting data.
 */
export function start() {
    if (_active) {
        return;
    }
    _active = true;

    // Hook: component.init
    _unsubscribers.push(hook('component.init', function (payload) {
        var comp = payload.component;
        _state.components.set(comp.id, {
            id: comp.id,
            name: comp.name,
            isChild: payload.isChild,
            isIsland: payload.el && payload.el.hasAttribute('data-livue-island'),
            initTime: Date.now(),
            state: comp.state,
            livue: comp.livue,
            el: payload.el,
        });
        notifyListeners();
    }));

    // Hook: component.destroy
    _unsubscribers.push(hook('component.destroy', function (payload) {
        var comp = payload.component;
        _state.components.delete(comp.id);
        notifyListeners();
    }));

    // Hook: request.started
    _unsubscribers.push(hook('request.started', function (payload) {
        var requestId = generateRequestId();
        var request = {
            id: requestId,
            url: payload.url,
            startTime: Date.now(),
            endTime: null,
            duration: null,
            status: 'pending',
            updateCount: payload.updateCount || 0,
            lazyCount: payload.lazyCount || 0,
            updates: payload.updates || [],
            lazyLoads: payload.lazyLoads || [],
            responses: null,
            error: null,
        };

        _state.pendingRequests.set(payload.url + '-' + requestId, request);
        _state.requests.unshift(request);

        // Limit history
        if (_state.requests.length > MAX_REQUESTS) {
            _state.requests.pop();
        }

        _state.perf.totalRequests++;
        notifyListeners();
    }));

    // Hook: request.finished
    _unsubscribers.push(hook('request.finished', function (payload) {
        // Find matching pending request
        var found = null;
        _state.pendingRequests.forEach(function (req, key) {
            if (!found && req.url === payload.url && req.status === 'pending') {
                found = { req: req, key: key };
            }
        });

        if (found) {
            var req = found.req;
            req.endTime = Date.now();
            req.duration = req.endTime - req.startTime;
            req.status = payload.success ? 'success' : 'error';
            req.responses = payload.responses;
            req.lazyResponses = payload.lazyResponses;
            req.error = payload.error;

            _state.pendingRequests.delete(found.key);

            // Update perf metrics
            if (payload.success) {
                _state.perf.successfulRequests++;
            } else {
                _state.perf.failedRequests++;
            }

            _state.perf.totalRequestTime += req.duration;
            _state.perf.avgRequestTime = _state.perf.totalRequestTime / _state.perf.totalRequests;

            if (req.duration < _state.perf.minRequestTime) {
                _state.perf.minRequestTime = req.duration;
            }
            if (req.duration > _state.perf.maxRequestTime) {
                _state.perf.maxRequestTime = req.duration;
            }

            notifyListeners();
        }
    }));

    // Hook: template.updating
    _unsubscribers.push(hook('template.updating', function (payload) {
        var comp = payload.component;
        _state.pendingSwaps.set(comp.id, Date.now());
    }));

    // Hook: template.updated
    _unsubscribers.push(hook('template.updated', function (payload) {
        var comp = payload.component;
        var startTime = _state.pendingSwaps.get(comp.id);

        if (startTime) {
            var duration = Date.now() - startTime;
            _state.pendingSwaps.delete(comp.id);

            _state.perf.totalTemplateSwaps++;
            _state.perf.totalTemplateSwapTime += duration;
            _state.perf.avgTemplateSwapTime = _state.perf.totalTemplateSwapTime / _state.perf.totalTemplateSwaps;

            notifyListeners();
        }
    }));

    // Hook: error.occurred
    _unsubscribers.push(hook('error.occurred', function (payload) {
        var errorEntry = {
            time: Date.now(),
            error: payload.error,
            componentName: payload.componentName,
            componentId: payload.componentId,
            context: payload.context,
        };

        _state.errors.unshift(errorEntry);

        // Limit history
        if (_state.errors.length > MAX_ERRORS) {
            _state.errors.pop();
        }

        notifyListeners();
    }));
}

/**
 * Stop collecting data.
 */
export function stop() {
    if (!_active) {
        return;
    }
    _active = false;

    _unsubscribers.forEach(function (unsub) {
        unsub();
    });
    _unsubscribers = [];
}

/**
 * Check if collector is active.
 * @returns {boolean}
 */
export function isActive() {
    return _active;
}

/**
 * Add an event to the history.
 * Called externally when events are dispatched.
 *
 * @param {object} event - { name, data, mode, source, sourceId, target }
 */
export function addEvent(event) {
    if (!_active) {
        return;
    }

    var entry = {
        time: Date.now(),
        name: event.name,
        data: event.data,
        mode: event.mode,
        source: event.source,
        sourceId: event.sourceId,
        target: event.target,
    };

    _state.events.unshift(entry);

    // Limit history
    if (_state.events.length > MAX_EVENTS) {
        _state.events.pop();
    }

    notifyListeners();
}

/**
 * Get all collected components.
 * @returns {Array<object>}
 */
export function getComponents() {
    return Array.from(_state.components.values());
}

/**
 * Get component by ID.
 * @param {string} id
 * @returns {object|undefined}
 */
export function getComponent(id) {
    return _state.components.get(id);
}

/**
 * Get request history.
 * @returns {Array<object>}
 */
export function getRequests() {
    return _state.requests;
}

/**
 * Get event history.
 * @returns {Array<object>}
 */
export function getEvents() {
    return _state.events;
}

/**
 * Get error history.
 * @returns {Array<object>}
 */
export function getErrors() {
    return _state.errors;
}

/**
 * Get performance metrics.
 * @returns {object}
 */
export function getPerf() {
    return Object.assign({}, _state.perf);
}

/**
 * Clear request history.
 */
export function clearRequests() {
    _state.requests = [];
    _state.pendingRequests.clear();
    notifyListeners();
}

/**
 * Clear event history.
 */
export function clearEvents() {
    _state.events = [];
    notifyListeners();
}

/**
 * Clear error history.
 */
export function clearErrors() {
    _state.errors = [];
    notifyListeners();
}

/**
 * Clear all data.
 */
export function clearAll() {
    _state.components.clear();
    _state.requests = [];
    _state.pendingRequests.clear();
    _state.events = [];
    _state.errors = [];
    _state.perf = {
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        totalRequestTime: 0,
        avgRequestTime: 0,
        minRequestTime: Infinity,
        maxRequestTime: 0,
        totalTemplateSwaps: 0,
        totalTemplateSwapTime: 0,
        avgTemplateSwapTime: 0,
    };
    _state.pendingSwaps.clear();
    notifyListeners();
}

/**
 * Add a listener for state changes.
 * @param {Function} listener
 * @returns {Function} Unsubscribe function
 */
export function onChange(listener) {
    _listeners.add(listener);
    return function () {
        _listeners.delete(listener);
    };
}

/**
 * Format a timestamp for display.
 * @param {number} timestamp
 * @returns {string}
 */
export function formatTimestamp(timestamp) {
    return formatTime(timestamp);
}

/**
 * Get detailed info for a component using _getDevToolsInfo().
 * @param {string} id - Component ID
 * @returns {object|null}
 */
export function getComponentDevToolsInfo(id) {
    var comp = _state.components.get(id);
    if (!comp || !comp.livue || !comp.livue._getDevToolsInfo) {
        return null;
    }
    try {
        return comp.livue._getDevToolsInfo();
    } catch (e) {
        console.error('[LiVue DevTools] Error getting component info:', e);
        return null;
    }
}

/**
 * Get all registered plugins, stores, components, and directives.
 * @returns {object}
 */
export function getRegistrations() {
    return getAllRegistrations();
}

/**
 * Get Echo/WebSocket subscription info.
 * @returns {object}
 */
export function getEchoSubscriptions() {
    return getDetailedSubscriptions();
}

/**
 * Get Pinia store states (if any stores are registered and instantiated).
 * @returns {Array<object>}
 */
export function getPiniaStores() {
    var registrations = getAllRegistrations();
    var stores = [];

    registrations.stores.forEach(function (storeReg) {
        try {
            // Try to get the store instance if it exists
            // Note: This will only work if the store has been used (instantiated)
            var storeId = storeReg.store.$id;
            if (storeId) {
                stores.push({
                    id: storeId,
                    name: storeReg.name,
                    filters: storeReg.filters,
                    // We can't easily access the state without the Pinia instance
                    // The store definition is stored, not the instance
                    definition: true,
                });
            }
        } catch (e) {
            // Ignore errors
        }
    });

    return stores;
}
