/**
 * LiVue DevTools - AJAX Timeline
 *
 * Displays a chronological list of AJAX requests
 * with expandable details.
 */

import { getRequests, clearRequests, formatTimestamp } from './collector.js';

/**
 * Set of expanded request IDs.
 * @type {Set<string>}
 */
var _expandedRequests = new Set();

/**
 * Container element reference.
 * @type {HTMLElement|null}
 */
var _container = null;

/**
 * Clear callback.
 * @type {Function|null}
 */
var _onClear = null;

/**
 * Set the clear callback.
 * @param {Function} callback
 */
export function onClear(callback) {
    _onClear = callback;
}

/**
 * Render the timeline.
 * @param {HTMLElement} container
 */
export function render(container) {
    _container = container;
    container.innerHTML = '';

    var requests = getRequests();

    // Header
    var header = document.createElement('div');
    header.className = 'livue-devtools__timeline-header';

    var title = document.createElement('span');
    title.className = 'livue-devtools__timeline-title';
    title.textContent = 'Request Timeline (' + requests.length + ')';
    header.appendChild(title);

    var clearBtn = document.createElement('button');
    clearBtn.className = 'livue-devtools__btn';
    clearBtn.textContent = 'Clear';
    clearBtn.addEventListener('click', function () {
        clearRequests();
        _expandedRequests.clear();
        if (_onClear) {
            _onClear();
        }
        render(container);
    });
    header.appendChild(clearBtn);

    container.appendChild(header);

    // Request list
    var list = document.createElement('div');
    list.className = 'livue-devtools__timeline-list';

    if (requests.length === 0) {
        list.innerHTML = '<div class="livue-devtools__empty">' +
            '<div class="livue-devtools__empty-icon">&#x1F4E1;</div>' +
            'No requests yet' +
            '</div>';
    } else {
        requests.forEach(function (req) {
            list.appendChild(renderRequest(req));
        });
    }

    container.appendChild(list);
}

/**
 * Render a single request entry.
 * @param {object} req
 * @returns {HTMLElement}
 */
function renderRequest(req) {
    var div = document.createElement('div');
    div.className = 'livue-devtools__request';
    if (_expandedRequests.has(req.id)) {
        div.classList.add('livue-devtools__request--expanded');
    }

    // Header
    var header = document.createElement('div');
    header.className = 'livue-devtools__request-header';

    // Toggle
    var toggle = document.createElement('span');
    toggle.className = 'livue-devtools__request-toggle';
    toggle.textContent = _expandedRequests.has(req.id) ? '\u25BC' : '\u25B6';
    header.appendChild(toggle);

    // Method
    var method = document.createElement('span');
    method.className = 'livue-devtools__request-method';
    method.textContent = 'POST';
    header.appendChild(method);

    // URL
    var url = document.createElement('span');
    url.className = 'livue-devtools__request-url';
    url.textContent = req.url;
    header.appendChild(url);

    // Status
    var status = document.createElement('span');
    status.className = 'livue-devtools__request-status';
    if (req.status === 'pending') {
        status.classList.add('livue-devtools__request-status--pending');
        status.textContent = 'pending';
    } else if (req.status === 'success') {
        status.classList.add('livue-devtools__request-status--success');
        status.textContent = 'OK';
    } else {
        status.classList.add('livue-devtools__request-status--error');
        status.textContent = 'Error';
    }
    header.appendChild(status);

    // Duration
    if (req.duration !== null) {
        var duration = document.createElement('span');
        duration.className = 'livue-devtools__request-duration';
        if (req.duration < 100) {
            duration.classList.add('livue-devtools__request-duration--fast');
        } else if (req.duration < 500) {
            duration.classList.add('livue-devtools__request-duration--medium');
        } else {
            duration.classList.add('livue-devtools__request-duration--slow');
        }
        duration.textContent = req.duration + 'ms';
        header.appendChild(duration);
    }

    // Time
    var time = document.createElement('span');
    time.className = 'livue-devtools__request-time';
    time.textContent = formatTimestamp(req.startTime);
    header.appendChild(time);

    // Click handler
    header.addEventListener('click', function () {
        if (_expandedRequests.has(req.id)) {
            _expandedRequests.delete(req.id);
            div.classList.remove('livue-devtools__request--expanded');
            toggle.textContent = '\u25B6';
        } else {
            _expandedRequests.add(req.id);
            div.classList.add('livue-devtools__request--expanded');
            toggle.textContent = '\u25BC';
        }
    });

    div.appendChild(header);

    // Details
    var details = document.createElement('div');
    details.className = 'livue-devtools__request-details';

    // Updates info
    if (req.updateCount > 0 || req.lazyCount > 0) {
        var info = document.createElement('div');
        info.className = 'livue-devtools__request-section';

        var infoTitle = document.createElement('div');
        infoTitle.className = 'livue-devtools__request-section-title';
        infoTitle.textContent = 'Summary';
        info.appendChild(infoTitle);

        var summary = document.createElement('div');
        var parts = [];
        if (req.updateCount > 0) {
            parts.push(req.updateCount + ' update' + (req.updateCount > 1 ? 's' : ''));
        }
        if (req.lazyCount > 0) {
            parts.push(req.lazyCount + ' lazy load' + (req.lazyCount > 1 ? 's' : ''));
        }
        summary.textContent = parts.join(', ');
        info.appendChild(summary);

        details.appendChild(info);
    }

    // Request payload
    if (req.updates && req.updates.length > 0) {
        var payloadSection = document.createElement('div');
        payloadSection.className = 'livue-devtools__request-section';

        var payloadTitle = document.createElement('div');
        payloadTitle.className = 'livue-devtools__request-section-title';
        payloadTitle.textContent = 'Request Payload';
        payloadSection.appendChild(payloadTitle);

        var payloadJson = document.createElement('pre');
        payloadJson.className = 'livue-devtools__request-json';
        payloadJson.textContent = formatPayload(req.updates);
        payloadSection.appendChild(payloadJson);

        details.appendChild(payloadSection);
    }

    // Response
    if (req.responses) {
        var responseSection = document.createElement('div');
        responseSection.className = 'livue-devtools__request-section';

        var responseTitle = document.createElement('div');
        responseTitle.className = 'livue-devtools__request-section-title';
        responseTitle.textContent = 'Response';
        responseSection.appendChild(responseTitle);

        var responseJson = document.createElement('pre');
        responseJson.className = 'livue-devtools__request-json';
        responseJson.textContent = formatResponse(req.responses);
        responseSection.appendChild(responseJson);

        details.appendChild(responseSection);
    }

    // Error
    if (req.error) {
        var errorSection = document.createElement('div');
        errorSection.className = 'livue-devtools__request-section';

        var errorTitle = document.createElement('div');
        errorTitle.className = 'livue-devtools__request-section-title';
        errorTitle.style.color = '#f48771';
        errorTitle.textContent = 'Error';
        errorSection.appendChild(errorTitle);

        var errorContent = document.createElement('pre');
        errorContent.className = 'livue-devtools__request-json';
        errorContent.style.color = '#f48771';
        errorContent.textContent = req.error.message || String(req.error);
        errorSection.appendChild(errorContent);

        details.appendChild(errorSection);
    }

    div.appendChild(details);

    return div;
}

/**
 * Format request payload for display.
 * @param {Array} updates
 * @returns {string}
 */
function formatPayload(updates) {
    var formatted = updates.map(function (update) {
        var info = {};

        // Method being called
        if (update.method) {
            info.method = update.method;
        }

        // Parameters
        if (update.params && update.params.length > 0) {
            info.params = update.params;
        }

        // Diffs (changed properties)
        if (update.diffs && Object.keys(update.diffs).length > 0) {
            info.diffs = update.diffs;
        }

        return info;
    });

    return JSON.stringify(formatted, null, 2);
}

/**
 * Format response for display.
 * @param {Array} responses
 * @returns {string}
 */
function formatResponse(responses) {
    var formatted = responses.map(function (res) {
        if (!res) return null;

        var info = {};

        // Snapshot size
        if (res.snapshot) {
            info.snapshotSize = res.snapshot.length + ' bytes';
        }

        // HTML size
        if (res.html) {
            info.htmlSize = res.html.length + ' bytes';
        }

        // Events
        if (res.events && res.events.length > 0) {
            info.events = res.events.map(function (e) {
                return e.name;
            });
        }

        // JSON result
        if (res.jsonResult !== undefined) {
            info.jsonResult = res.jsonResult;
        }

        // Redirect
        if (res.redirect) {
            info.redirect = res.redirect;
        }

        // Download
        if (res.download) {
            info.download = res.download.name;
        }

        return info;
    });

    return JSON.stringify(formatted, null, 2);
}

/**
 * Clear the timeline display.
 */
export function clear() {
    _expandedRequests.clear();
    if (_container) {
        render(_container);
    }
}
