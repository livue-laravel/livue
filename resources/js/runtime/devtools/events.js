/**
 * LiVue DevTools - Event Inspector
 *
 * Displays a list of dispatched events with filtering.
 */

import { getEvents, clearEvents, formatTimestamp } from './collector.js';

/**
 * Current filter text.
 * @type {string}
 */
var _filter = '';

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
 * Render the events panel.
 * @param {HTMLElement} container
 */
export function render(container) {
    _container = container;
    container.innerHTML = '';

    var events = getEvents();

    // Header
    var header = document.createElement('div');
    header.className = 'livue-devtools__events-header';

    var filterInput = document.createElement('input');
    filterInput.className = 'livue-devtools__events-filter';
    filterInput.type = 'text';
    filterInput.placeholder = 'Filter events...';
    filterInput.value = _filter;
    filterInput.addEventListener('input', function (e) {
        _filter = e.target.value.toLowerCase();
        renderList(container.querySelector('.livue-devtools__events-list'));
    });
    header.appendChild(filterInput);

    var clearBtn = document.createElement('button');
    clearBtn.className = 'livue-devtools__btn';
    clearBtn.textContent = 'Clear';
    clearBtn.addEventListener('click', function () {
        clearEvents();
        _filter = '';
        filterInput.value = '';
        if (_onClear) {
            _onClear();
        }
        render(container);
    });
    header.appendChild(clearBtn);

    container.appendChild(header);

    // Event list
    var list = document.createElement('div');
    list.className = 'livue-devtools__events-list';
    renderList(list);
    container.appendChild(list);
}

/**
 * Render the event list.
 * @param {HTMLElement} list
 */
function renderList(list) {
    if (!list) return;
    list.innerHTML = '';

    var events = getEvents();

    // Apply filter
    var filtered = events;
    if (_filter) {
        filtered = events.filter(function (evt) {
            var searchText = (evt.name + ' ' + evt.source + ' ' + JSON.stringify(evt.data)).toLowerCase();
            return searchText.indexOf(_filter) !== -1;
        });
    }

    if (filtered.length === 0) {
        if (events.length === 0) {
            list.innerHTML = '<div class="livue-devtools__empty">' +
                '<div class="livue-devtools__empty-icon">&#x1F4E8;</div>' +
                'No events yet' +
                '</div>';
        } else {
            list.innerHTML = '<div class="livue-devtools__empty">' +
                'No events match filter' +
                '</div>';
        }
        return;
    }

    filtered.forEach(function (evt) {
        list.appendChild(renderEvent(evt));
    });
}

/**
 * Render a single event entry.
 * @param {object} evt
 * @returns {HTMLElement}
 */
function renderEvent(evt) {
    var div = document.createElement('div');
    div.className = 'livue-devtools__event';

    // Time
    var time = document.createElement('span');
    time.className = 'livue-devtools__event-time';
    time.textContent = formatTimestamp(evt.time);
    div.appendChild(time);

    // Name
    var name = document.createElement('span');
    name.className = 'livue-devtools__event-name';
    name.textContent = evt.name;
    div.appendChild(name);

    // Source
    if (evt.source) {
        var source = document.createElement('span');
        source.className = 'livue-devtools__event-source';
        source.textContent = '\u2190 ' + evt.source;
        div.appendChild(source);
    }

    // Mode badge
    if (evt.mode && evt.mode !== 'broadcast') {
        var mode = document.createElement('span');
        mode.className = 'livue-devtools__badge';
        mode.style.marginLeft = '4px';
        mode.style.background = '#3c3c3c';
        mode.style.color = '#858585';
        mode.textContent = evt.mode;
        if (evt.target) {
            mode.textContent += ' \u2192 ' + evt.target;
        }
        div.appendChild(mode);
    }

    // Data preview
    if (evt.data !== undefined && evt.data !== null) {
        var data = document.createElement('span');
        data.className = 'livue-devtools__event-data';
        data.textContent = formatData(evt.data);
        data.title = JSON.stringify(evt.data, null, 2);
        div.appendChild(data);
    }

    return div;
}

/**
 * Format event data for display.
 * @param {*} data
 * @returns {string}
 */
function formatData(data) {
    if (data === null) return 'null';
    if (data === undefined) return 'undefined';

    var str = JSON.stringify(data);
    if (str.length > 80) {
        return str.substring(0, 77) + '...';
    }
    return str;
}

/**
 * Get the current filter.
 * @returns {string}
 */
export function getFilter() {
    return _filter;
}

/**
 * Set the filter.
 * @param {string} filter
 */
export function setFilter(filter) {
    _filter = filter;
    if (_container) {
        var input = _container.querySelector('.livue-devtools__events-filter');
        if (input) {
            input.value = filter;
        }
        renderList(_container.querySelector('.livue-devtools__events-list'));
    }
}

/**
 * Clear the events display.
 */
export function clear() {
    _filter = '';
    if (_container) {
        render(_container);
    }
}
