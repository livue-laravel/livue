/**
 * LiVue DevTools - State Inspector
 *
 * Renders a JSON tree view of component state with
 * dirty field highlighting and server/client comparison.
 */

import { getComponentDevToolsInfo } from './collector.js';

/**
 * Currently displayed component.
 * @type {object|null}
 */
var _currentComponent = null;

/**
 * Current view mode: 'state' | 'diff' | 'info'
 * @type {string}
 */
var _viewMode = 'state';

/**
 * Set of expanded object paths.
 * @type {Set<string>}
 */
var _expandedPaths = new Set();

/**
 * Container element reference.
 * @type {HTMLElement|null}
 */
var _container = null;

/**
 * Set the component to display.
 * @param {object|null} component - Node from tree
 */
export function setComponent(component) {
    _currentComponent = component;
}

/**
 * Get the current component.
 * @returns {object|null}
 */
export function getComponent() {
    return _currentComponent;
}

/**
 * Render the state inspector.
 * @param {HTMLElement} container
 */
export function render(container) {
    _container = container;
    container.innerHTML = '';

    if (!_currentComponent) {
        container.innerHTML = '<div class="livue-devtools__state-empty">' +
            'Select a component to inspect its state' +
            '</div>';
        return;
    }

    var state = _currentComponent.state;
    var livue = _currentComponent.livue;
    var dirtyFields = livue ? livue.dirtyFields : new Set();

    // Get detailed DevTools info
    var devToolsInfo = getComponentDevToolsInfo(_currentComponent.id);

    // Title with component name
    var title = document.createElement('div');
    title.className = 'livue-devtools__state-title';
    title.textContent = '<' + _currentComponent.name + '>';
    container.appendChild(title);

    // View mode tabs
    var modeTabs = document.createElement('div');
    modeTabs.style.cssText = 'display: flex; gap: 4px; margin-bottom: 8px;';

    ['state', 'diff', 'info'].forEach(function (mode) {
        var btn = document.createElement('button');
        btn.style.cssText = 'padding: 2px 8px; font-size: 10px; background: ' +
            (_viewMode === mode ? '#007acc' : '#3c3c3c') +
            '; border: none; color: #fff; border-radius: 3px; cursor: pointer;';
        btn.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
        btn.addEventListener('click', function () {
            _viewMode = mode;
            render(container);
        });
        modeTabs.appendChild(btn);
    });
    container.appendChild(modeTabs);

    // Render based on view mode
    if (_viewMode === 'state') {
        renderStateView(container, state, dirtyFields, livue);
    } else if (_viewMode === 'diff') {
        renderDiffView(container, devToolsInfo);
    } else if (_viewMode === 'info') {
        renderInfoView(container, devToolsInfo);
    }
}

/**
 * Render the state view (current client state).
 */
function renderStateView(container, state, dirtyFields, livue) {
    if (state && typeof state === 'object') {
        var keys = Object.keys(state);
        if (keys.length === 0) {
            var empty = document.createElement('div');
            empty.className = 'livue-devtools__state-empty';
            empty.textContent = 'No state properties';
            container.appendChild(empty);
        } else {
            keys.forEach(function (key) {
                var isDirty = dirtyFields.has(key);
                container.appendChild(renderProperty(key, state[key], isDirty, key));
            });
        }
    }

    // Errors section if any
    if (livue && livue.errors && Object.keys(livue.errors).length > 0) {
        var errorsTitle = document.createElement('div');
        errorsTitle.className = 'livue-devtools__state-title';
        errorsTitle.style.marginTop = '12px';
        errorsTitle.textContent = 'Validation Errors';
        container.appendChild(errorsTitle);

        Object.keys(livue.errors).forEach(function (field) {
            var prop = document.createElement('div');
            prop.className = 'livue-devtools__prop';

            var keySpan = document.createElement('span');
            keySpan.className = 'livue-devtools__prop-key';
            keySpan.style.color = '#f48771';
            keySpan.textContent = field;
            prop.appendChild(keySpan);

            var colonSpan = document.createElement('span');
            colonSpan.className = 'livue-devtools__prop-colon';
            colonSpan.textContent = ': ';
            prop.appendChild(colonSpan);

            var valueSpan = document.createElement('span');
            valueSpan.className = 'livue-devtools__prop-value';
            valueSpan.style.color = '#f48771';
            valueSpan.textContent = livue.errors[field].join(', ');
            prop.appendChild(valueSpan);

            container.appendChild(prop);
        });
    }
}

/**
 * Render the diff view (server vs client state).
 */
function renderDiffView(container, devToolsInfo) {
    if (!devToolsInfo) {
        container.innerHTML += '<div class="livue-devtools__state-empty">No diff info available</div>';
        return;
    }

    var dirtyFields = devToolsInfo.dirtyFields || [];

    if (dirtyFields.length === 0) {
        var syncMsg = document.createElement('div');
        syncMsg.style.cssText = 'color: #6a9955; padding: 8px; text-align: center;';
        syncMsg.innerHTML = '&#10003; State is in sync with server';
        container.appendChild(syncMsg);
        return;
    }

    var label = document.createElement('div');
    label.style.cssText = 'color: #dcdcaa; margin-bottom: 8px; font-size: 11px;';
    label.textContent = dirtyFields.length + ' unsync\'d field(s):';
    container.appendChild(label);

    dirtyFields.forEach(function (field) {
        var serverVal = devToolsInfo.serverState[field];
        var clientVal = devToolsInfo.clientState[field];

        var diffRow = document.createElement('div');
        diffRow.style.cssText = 'margin-bottom: 8px; padding: 6px; background: #2a2d2e; border-radius: 3px;';

        var fieldName = document.createElement('div');
        fieldName.style.cssText = 'color: #dcdcaa; font-weight: 600; margin-bottom: 4px;';
        fieldName.textContent = field;
        diffRow.appendChild(fieldName);

        var serverLine = document.createElement('div');
        serverLine.style.cssText = 'font-size: 11px; color: #858585;';
        serverLine.innerHTML = '<span style="color: #6a9955;">Server:</span> ' +
            '<span style="color: #ce9178;">' + JSON.stringify(serverVal) + '</span>';
        diffRow.appendChild(serverLine);

        var clientLine = document.createElement('div');
        clientLine.style.cssText = 'font-size: 11px; color: #858585;';
        clientLine.innerHTML = '<span style="color: #9cdcfe;">Client:</span> ' +
            '<span style="color: #ce9178;">' + JSON.stringify(clientVal) + '</span>';
        diffRow.appendChild(clientLine);

        container.appendChild(diffRow);
    });
}

/**
 * Render the info view (component metadata).
 */
function renderInfoView(container, devToolsInfo) {
    if (!devToolsInfo) {
        container.innerHTML += '<div class="livue-devtools__state-empty">No info available</div>';
        return;
    }

    var memo = devToolsInfo.memo || {};

    // Component info
    var infoItems = [
        { label: 'Name', value: memo.name || '-' },
        { label: 'Isolated', value: memo.isolate ? 'Yes' : 'No' },
        { label: 'URL Params', value: memo.urlParams ? Object.keys(memo.urlParams).join(', ') : '-' },
        { label: 'Tab Sync', value: memo.tabSync ? 'Enabled' : '-' },
        { label: 'Upload Props', value: memo.uploadProps.length > 0 ? memo.uploadProps.join(', ') : '-' },
        { label: 'Vue Methods', value: memo.vueMethods.length > 0 ? memo.vueMethods.join(', ') : '-' },
        { label: 'Confirm Methods', value: memo.confirmMethods.length > 0 ? memo.confirmMethods.join(', ') : '-' },
        { label: 'Composables', value: memo.composableNames.length > 0 ? memo.composableNames.join(', ') : '-' },
    ];

    infoItems.forEach(function (item) {
        var row = document.createElement('div');
        row.className = 'livue-devtools__prop';

        var keySpan = document.createElement('span');
        keySpan.className = 'livue-devtools__prop-key';
        keySpan.textContent = item.label;
        row.appendChild(keySpan);

        var colonSpan = document.createElement('span');
        colonSpan.className = 'livue-devtools__prop-colon';
        colonSpan.textContent = ': ';
        row.appendChild(colonSpan);

        var valueSpan = document.createElement('span');
        valueSpan.className = 'livue-devtools__prop-value';
        valueSpan.textContent = item.value;
        row.appendChild(valueSpan);

        container.appendChild(row);
    });

    // Status indicators
    var statusTitle = document.createElement('div');
    statusTitle.className = 'livue-devtools__state-title';
    statusTitle.style.marginTop = '12px';
    statusTitle.textContent = 'Status';
    container.appendChild(statusTitle);

    var statusItems = [
        { label: 'Uploading', value: devToolsInfo.uploading, color: devToolsInfo.uploading ? '#dcdcaa' : '#858585' },
        { label: 'Upload Progress', value: devToolsInfo.uploadProgress + '%', show: devToolsInfo.uploading },
        { label: 'Streaming', value: devToolsInfo.streaming, color: devToolsInfo.streaming ? '#9cdcfe' : '#858585' },
        { label: 'Streaming Method', value: devToolsInfo.streamingMethod || '-', show: devToolsInfo.streaming },
        { label: 'Has Error', value: devToolsInfo.errorState.hasError, color: devToolsInfo.errorState.hasError ? '#f48771' : '#858585' },
    ];

    statusItems.forEach(function (item) {
        if (item.show === false) return;

        var row = document.createElement('div');
        row.className = 'livue-devtools__prop';

        var keySpan = document.createElement('span');
        keySpan.className = 'livue-devtools__prop-key';
        keySpan.textContent = item.label;
        row.appendChild(keySpan);

        var colonSpan = document.createElement('span');
        colonSpan.className = 'livue-devtools__prop-colon';
        colonSpan.textContent = ': ';
        row.appendChild(colonSpan);

        var valueSpan = document.createElement('span');
        valueSpan.className = 'livue-devtools__prop-value';
        valueSpan.style.color = item.color || '#d4d4d4';
        valueSpan.textContent = String(item.value);
        row.appendChild(valueSpan);

        container.appendChild(row);
    });

    // Composables section
    var composables = devToolsInfo.composables || {};
    var composableNames = Object.keys(composables);

    if (composableNames.length > 0) {
        var composablesTitle = document.createElement('div');
        composablesTitle.className = 'livue-devtools__state-title';
        composablesTitle.style.marginTop = '12px';
        composablesTitle.textContent = 'Composables';
        container.appendChild(composablesTitle);

        composableNames.forEach(function (ns) {
            var comp = composables[ns];

            // Composable name header
            var nsHeader = document.createElement('div');
            nsHeader.style.cssText = 'color: #c586c0; font-weight: 600; margin-top: 8px; margin-bottom: 4px;';
            nsHeader.textContent = ns + ' (livue.' + ns + ')';
            container.appendChild(nsHeader);

            // Data
            var dataKeys = Object.keys(comp.data || {});
            if (dataKeys.length > 0) {
                var dataLabel = document.createElement('div');
                dataLabel.style.cssText = 'color: #858585; font-size: 10px; margin-left: 8px;';
                dataLabel.textContent = 'Data:';
                container.appendChild(dataLabel);

                dataKeys.forEach(function (key) {
                    var row = document.createElement('div');
                    row.style.marginLeft = '16px';
                    row.className = 'livue-devtools__prop';

                    var keySpan = document.createElement('span');
                    keySpan.className = 'livue-devtools__prop-key';
                    keySpan.textContent = key;
                    row.appendChild(keySpan);

                    var colonSpan = document.createElement('span');
                    colonSpan.className = 'livue-devtools__prop-colon';
                    colonSpan.textContent = ': ';
                    row.appendChild(colonSpan);

                    row.appendChild(renderValue(comp.data[key], 'composable.' + ns + '.' + key));
                    container.appendChild(row);
                });
            }

            // Actions
            if (comp.actions && comp.actions.length > 0) {
                var actionsLabel = document.createElement('div');
                actionsLabel.style.cssText = 'color: #858585; font-size: 10px; margin-left: 8px; margin-top: 4px;';
                actionsLabel.textContent = 'Actions:';
                container.appendChild(actionsLabel);

                var actionsRow = document.createElement('div');
                actionsRow.style.cssText = 'margin-left: 16px; color: #dcdcaa;';
                actionsRow.textContent = comp.actions.join(', ');
                container.appendChild(actionsRow);
            }
        });
    }
}

/**
 * Render a single property.
 * @param {string} key
 * @param {*} value
 * @param {boolean} isDirty
 * @param {string} path
 * @returns {HTMLElement}
 */
function renderProperty(key, value, isDirty, path) {
    var prop = document.createElement('div');
    prop.className = 'livue-devtools__prop';

    var keySpan = document.createElement('span');
    keySpan.className = 'livue-devtools__prop-key';
    if (isDirty) {
        keySpan.classList.add('livue-devtools__prop-key--dirty');
    }
    keySpan.textContent = key;
    prop.appendChild(keySpan);

    var colonSpan = document.createElement('span');
    colonSpan.className = 'livue-devtools__prop-colon';
    colonSpan.textContent = ': ';
    prop.appendChild(colonSpan);

    prop.appendChild(renderValue(value, path));

    return prop;
}

/**
 * Render a value with appropriate styling.
 * @param {*} value
 * @param {string} path
 * @returns {HTMLElement}
 */
function renderValue(value, path) {
    var span = document.createElement('span');
    span.className = 'livue-devtools__prop-value';

    if (value === null) {
        span.classList.add('livue-devtools__prop-value--null');
        span.textContent = 'null';
    } else if (value === undefined) {
        span.classList.add('livue-devtools__prop-value--null');
        span.textContent = 'undefined';
    } else if (typeof value === 'string') {
        span.classList.add('livue-devtools__prop-value--string');
        span.textContent = '"' + truncateString(value, 50) + '"';
        span.title = value;
    } else if (typeof value === 'number') {
        span.classList.add('livue-devtools__prop-value--number');
        span.textContent = String(value);
    } else if (typeof value === 'boolean') {
        span.classList.add('livue-devtools__prop-value--boolean');
        span.textContent = String(value);
    } else if (Array.isArray(value)) {
        return renderArray(value, path);
    } else if (typeof value === 'object') {
        return renderObject(value, path);
    } else if (typeof value === 'function') {
        span.classList.add('livue-devtools__prop-value--null');
        span.textContent = 'function()';
    } else {
        span.textContent = String(value);
    }

    return span;
}

/**
 * Render an array value.
 * @param {Array} arr
 * @param {string} path
 * @returns {HTMLElement}
 */
function renderArray(arr, path) {
    var container = document.createElement('span');
    container.className = 'livue-devtools__prop-value livue-devtools__prop-value--array';

    if (arr.length === 0) {
        container.textContent = '[]';
        return container;
    }

    var isExpanded = _expandedPaths.has(path);

    var toggle = document.createElement('span');
    toggle.className = 'livue-devtools__object-toggle';
    toggle.textContent = isExpanded ? '\u25BC ' : '\u25B6 ';
    toggle.addEventListener('click', function () {
        if (_expandedPaths.has(path)) {
            _expandedPaths.delete(path);
        } else {
            _expandedPaths.add(path);
        }
        if (_container) {
            render(_container);
        }
    });
    container.appendChild(toggle);

    var label = document.createElement('span');
    label.textContent = 'Array(' + arr.length + ')';
    container.appendChild(label);

    if (isExpanded) {
        var items = document.createElement('div');
        items.className = 'livue-devtools__object';

        arr.forEach(function (item, index) {
            items.appendChild(renderProperty(String(index), item, false, path + '.' + index));
        });

        container.appendChild(items);
    }

    return container;
}

/**
 * Render an object value.
 * @param {object} obj
 * @param {string} path
 * @returns {HTMLElement}
 */
function renderObject(obj, path) {
    var container = document.createElement('span');
    container.className = 'livue-devtools__prop-value livue-devtools__prop-value--object';

    var keys = Object.keys(obj);

    if (keys.length === 0) {
        container.textContent = '{}';
        return container;
    }

    var isExpanded = _expandedPaths.has(path);

    var toggle = document.createElement('span');
    toggle.className = 'livue-devtools__object-toggle';
    toggle.textContent = isExpanded ? '\u25BC ' : '\u25B6 ';
    toggle.addEventListener('click', function () {
        if (_expandedPaths.has(path)) {
            _expandedPaths.delete(path);
        } else {
            _expandedPaths.add(path);
        }
        if (_container) {
            render(_container);
        }
    });
    container.appendChild(toggle);

    var label = document.createElement('span');
    label.textContent = '{...} ' + keys.length + ' key' + (keys.length > 1 ? 's' : '');
    container.appendChild(label);

    if (isExpanded) {
        var items = document.createElement('div');
        items.className = 'livue-devtools__object';

        keys.forEach(function (key) {
            items.appendChild(renderProperty(key, obj[key], false, path + '.' + key));
        });

        container.appendChild(items);
    }

    return container;
}

/**
 * Truncate a string for display.
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
function truncateString(str, maxLen) {
    if (str.length <= maxLen) {
        return str;
    }
    return str.substring(0, maxLen - 3) + '...';
}

/**
 * Clear the state inspector.
 */
export function clear() {
    _currentComponent = null;
    _expandedPaths.clear();
}
