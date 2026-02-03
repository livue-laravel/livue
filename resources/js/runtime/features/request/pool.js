/**
 * Request pooling for LiVue.
 *
 * Collects pending component updates within a single microtask
 * and sends them as a single batch HTTP request to /livue/update.
 */

import { getToken } from '../../helpers/csrf.js';
import { handleRedirect } from '../navigation.js';
import progress from '../../helpers/progress.js';
import { trigger } from '../../helpers/hooks.js';

/**
 * Pending update request entries.
 * Each entry: { payload, resolve, reject }
 * @type {Array}
 */
var _pending = [];

/**
 * Pending lazy load request entries.
 * Each entry: { payload, resolve, reject }
 * @type {Array}
 */
var _pendingLazy = [];

/**
 * Whether a flush is already scheduled for this microtask.
 * @type {boolean}
 */
var _scheduled = false;

/**
 * Add a request to the pool.
 * Returns a Promise that resolves with this specific component's response.
 *
 * Isolated components (payload.isolate === true) bypass the pool
 * and send immediately in their own HTTP request.
 *
 * @param {object} payload - { snapshot, diffs, method, params, isolate }
 * @returns {Promise<object>}
 */
export function poolRequest(payload) {
    // Isolated components send immediately, bypassing the batch
    if (payload.isolate) {
        return sendIsolated(payload);
    }

    return new Promise(function (resolve, reject) {
        _pending.push({
            payload: payload,
            resolve: resolve,
            reject: reject,
        });

        if (!_scheduled) {
            _scheduled = true;
            queueMicrotask(flush);
        }
    });
}

/**
 * Add a lazy load request to the pool.
 * Returns a Promise that resolves with the loaded component's response.
 *
 * @param {object} payload - { component, props }
 * @returns {Promise<object>}
 */
export function poolLazyLoad(payload) {
    return new Promise(function (resolve, reject) {
        _pendingLazy.push({
            payload: payload,
            resolve: resolve,
            reject: reject,
        });

        if (!_scheduled) {
            _scheduled = true;
            queueMicrotask(flush);
        }
    });
}

/**
 * Flush all pending requests as a single batch HTTP call.
 * Combines both component updates and lazy loads into one request.
 */
async function flush() {
    // Grab the current batches and reset
    var updateBatch = _pending;
    var lazyBatch = _pendingLazy;
    _pending = [];
    _pendingLazy = [];
    _scheduled = false;

    if (updateBatch.length === 0 && lazyBatch.length === 0) {
        return;
    }

    // Start progress bar
    progress.start();

    var url = buildUrl();
    var token = getToken();

    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (token) {
        headers['X-CSRF-TOKEN'] = token;
    }

    var updates = updateBatch.map(function (entry) {
        return entry.payload;
    });

    var lazyLoads = lazyBatch.map(function (entry) {
        return entry.payload;
    });

    var body = {};
    if (updates.length > 0) {
        body.updates = updates;
    }
    if (lazyLoads.length > 0) {
        body.lazyLoads = lazyLoads;
    }

    // Trigger request.started hook
    trigger('request.started', {
        url: url,
        updates: updates,
        lazyLoads: lazyLoads,
        updateCount: updateBatch.length,
        lazyCount: lazyBatch.length,
    });

    try {
        var response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
            credentials: 'same-origin',
        });

        var data = await response.json();

        if (!response.ok) {
            // Entire batch failed (e.g., 400 validation at transport level)
            var error = new Error(data.error || 'Request failed');
            error.status = response.status;
            error.data = data;

            for (var i = 0; i < updateBatch.length; i++) {
                updateBatch[i].reject(error);
            }
            for (var i = 0; i < lazyBatch.length; i++) {
                lazyBatch[i].reject(error);
            }
            return;
        }

        // data.responses is an array in the same order as updates
        var responses = data.responses || [];
        var lazyResponses = data.lazyResponses || [];

        // Check for redirect in any response — handle before distributing.
        // Don't resolve promises: the page is navigating away, components
        // will be destroyed, and unresolved promises will be GC'd.
        for (var i = 0; i < responses.length; i++) {
            if (responses[i] && responses[i].redirect) {
                handleRedirect(responses[i].redirect);
                return;
            }
        }

        // Distribute update responses
        for (var i = 0; i < updateBatch.length; i++) {
            var result = responses[i];

            if (!result) {
                updateBatch[i].reject(new Error('No response for component update at index ' + i));
                continue;
            }

            if (result.error) {
                var err = new Error(result.error);
                err.status = result.status || 500;
                err.data = result;
                updateBatch[i].reject(err);
            } else if (result.errors) {
                // Validation errors (422-equivalent)
                var err = new Error('Validation failed');
                err.status = 422;
                err.data = result;
                updateBatch[i].reject(err);
            } else {
                updateBatch[i].resolve(result);
            }
        }

        // Distribute lazy load responses
        for (var i = 0; i < lazyBatch.length; i++) {
            var result = lazyResponses[i];

            if (!result) {
                lazyBatch[i].reject(new Error('No response for lazy load at index ' + i));
                continue;
            }

            if (result.error) {
                var err = new Error(result.error);
                err.status = result.status || 500;
                err.data = result;
                lazyBatch[i].reject(err);
            } else {
                lazyBatch[i].resolve(result);
            }
        }

        // Trigger request.finished hook on success
        trigger('request.finished', {
            url: url,
            success: true,
            responses: responses,
            lazyResponses: lazyResponses,
            updateCount: updateBatch.length,
            lazyCount: lazyBatch.length,
        });
    } catch (networkError) {
        // Network failure: reject all
        for (var i = 0; i < updateBatch.length; i++) {
            updateBatch[i].reject(networkError);
        }
        for (var i = 0; i < lazyBatch.length; i++) {
            lazyBatch[i].reject(networkError);
        }

        // Trigger request.finished hook with error
        trigger('request.finished', {
            url: url,
            success: false,
            error: networkError,
            updateCount: updateBatch.length,
            lazyCount: lazyBatch.length,
        });
    } finally {
        // Complete progress bar
        progress.done();
    }
}

/**
 * Send an isolated request immediately, bypassing the batch pool.
 * The payload is wrapped in a single-item updates array.
 *
 * @param {object} payload
 * @returns {Promise<object>}
 */
async function sendIsolated(payload) {
    // Start progress bar
    progress.start();

    var url = buildUrl();
    var token = getToken();

    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (token) {
        headers['X-CSRF-TOKEN'] = token;
    }

    // Strip the isolate flag from the payload sent to the server
    var serverPayload = {
        snapshot: payload.snapshot,
        diffs: payload.diffs,
        method: payload.method,
        params: payload.params,
    };

    try {
        var response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ updates: [serverPayload] }),
            credentials: 'same-origin',
        });

        var data = await response.json();

        if (!response.ok) {
            var error = new Error(data.error || 'Request failed');
            error.status = response.status;
            error.data = data;
            throw error;
        }

        var result = (data.responses || [])[0];

        if (!result) {
            throw new Error('No response for isolated component update');
        }

        if (result.redirect) {
            handleRedirect(result.redirect);
            // Return a never-resolving promise — page is navigating away
            return new Promise(function () {});
        }

        if (result.error) {
            var err = new Error(result.error);
            err.status = result.status || 500;
            err.data = result;
            throw err;
        }

        if (result.errors) {
            var err = new Error('Validation failed');
            err.status = 422;
            err.data = result;
            throw err;
        }

        return result;
    } finally {
        // Complete progress bar
        progress.done();
    }
}

/**
 * Build the LiVue update endpoint URL.
 */
function buildUrl() {
    var prefix = document.querySelector('meta[name="livue-prefix"]')?.getAttribute('content') || 'livue';
    return '/' + prefix + '/update';
}
