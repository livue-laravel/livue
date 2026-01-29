/**
 * LiVue DevTools - Main Panel
 *
 * Assembles all devtools modules into a single panel
 * with tab navigation.
 */

import { injectStyles, removeStyles } from './styles.js';
import * as collector from './collector.js';
import * as tree from './tree.js';
import * as stateInspector from './state.js';
import * as timeline from './timeline.js';
import * as eventsPanel from './events.js';
import { getRegistrations, getEchoSubscriptions, getPiniaStores } from './collector.js';

/**
 * LocalStorage key for persisting state.
 */
var STORAGE_KEY = 'livue-devtools-state';

/**
 * Panel DOM element.
 * @type {HTMLElement|null}
 */
var _panel = null;

/**
 * Active tab.
 * @type {string}
 */
var _activeTab = 'components';

/**
 * Whether panel is minimized.
 * @type {boolean}
 */
var _minimized = false;

/**
 * Whether panel was open (for restore on page load).
 * @type {boolean}
 */
var _wasOpen = false;

/**
 * Panel position: 'right' | 'left' | 'bottom' | 'top'
 * @type {string}
 */
var _position = 'right';

/**
 * Load persisted state from localStorage.
 */
function loadPersistedState() {
    try {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            var state = JSON.parse(stored);
            _activeTab = state.activeTab || 'components';
            _minimized = state.minimized || false;
            _wasOpen = state.isOpen || false;
            _position = state.position || 'right';
        }
    } catch (e) {
        // Ignore errors
    }
}

/**
 * Save state to localStorage.
 */
function savePersistedState() {
    try {
        var state = {
            isOpen: _panel !== null,
            activeTab: _activeTab,
            minimized: _minimized,
            position: _position,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        // Ignore errors
    }
}

/**
 * Check if DevTools should auto-open on page load.
 * @returns {boolean}
 */
export function shouldAutoOpen() {
    loadPersistedState();
    return _wasOpen;
}

/**
 * LiVue runtime reference.
 * @type {object|null}
 */
var _runtime = null;

/**
 * Refresh interval ID.
 * @type {number|null}
 */
var _refreshInterval = null;

/**
 * Keyboard shortcut handler.
 * @type {Function|null}
 */
var _keyHandler = null;

/**
 * Collector change listener unsubscribe.
 * @type {Function|null}
 */
var _collectorUnsub = null;

/**
 * Set the LiVue runtime reference.
 * @param {object} runtime
 */
export function setRuntime(runtime) {
    _runtime = runtime;
    tree.setRuntime(runtime);
}

/**
 * Check if panel is open.
 * @returns {boolean}
 */
export function isOpen() {
    return _panel !== null;
}

/**
 * Open the devtools panel.
 */
export function open() {
    if (_panel) {
        return;
    }

    loadPersistedState();
    injectStyles();
    collector.start();
    createPanel();
    setupKeyboardShortcut();
    setupAutoRefresh();
    savePersistedState();
}

/**
 * Close the devtools panel.
 */
export function close() {
    if (!_panel) {
        return;
    }

    if (_keyHandler) {
        document.removeEventListener('keydown', _keyHandler);
        _keyHandler = null;
    }

    if (_refreshInterval) {
        clearInterval(_refreshInterval);
        _refreshInterval = null;
    }

    if (_collectorUnsub) {
        _collectorUnsub();
        _collectorUnsub = null;
    }

    _panel.remove();
    _panel = null;
    removeStyles();
    collector.stop();
    stateInspector.clear();
    savePersistedState();
}

/**
 * Toggle the devtools panel.
 */
export function toggle() {
    if (_panel) {
        close();
    } else {
        open();
    }
}

/**
 * Create the panel DOM structure.
 */
/**
 * Get minimize button icons based on position.
 * @returns {object} { expanded, minimized }
 */
function getMinimizeIcons() {
    switch (_position) {
        case 'left':
            return { expanded: '\u25C0', minimized: '\u25B6' }; // ◀ ▶
        case 'right':
            return { expanded: '\u25B6', minimized: '\u25C0' }; // ▶ ◀
        case 'top':
            return { expanded: '\u25B2', minimized: '\u25BC' }; // ▲ ▼
        case 'bottom':
            return { expanded: '\u25BC', minimized: '\u25B2' }; // ▼ ▲
        default:
            return { expanded: '\u25B6', minimized: '\u25C0' };
    }
}

function createPanel() {
    _panel = document.createElement('div');
    _panel.className = 'livue-devtools livue-devtools--' + _position;
    if (_minimized) {
        _panel.classList.add('livue-devtools--minimized');
    }

    // Header
    var header = document.createElement('div');
    header.className = 'livue-devtools__header';

    var title = document.createElement('div');
    title.className = 'livue-devtools__title';
    title.innerHTML = '<span class="livue-devtools__title-icon">&#x2699;</span> LiVue DevTools';
    header.appendChild(title);

    var actions = document.createElement('div');
    actions.className = 'livue-devtools__actions';

    var icons = getMinimizeIcons();
    var minimizeBtn = document.createElement('button');
    minimizeBtn.className = 'livue-devtools__btn';
    minimizeBtn.textContent = _minimized ? icons.minimized : icons.expanded;
    minimizeBtn.title = 'Minimize';
    minimizeBtn.addEventListener('click', function () {
        _minimized = !_minimized;
        _panel.classList.toggle('livue-devtools--minimized', _minimized);
        minimizeBtn.textContent = _minimized ? icons.minimized : icons.expanded;
        savePersistedState();
    });
    actions.appendChild(minimizeBtn);

    var closeBtn = document.createElement('button');
    closeBtn.className = 'livue-devtools__btn';
    closeBtn.textContent = '\u00D7';
    closeBtn.title = 'Close (Ctrl+Shift+L)';
    closeBtn.addEventListener('click', close);
    actions.appendChild(closeBtn);

    header.appendChild(actions);
    _panel.appendChild(header);

    // Tabs
    var tabs = document.createElement('div');
    tabs.className = 'livue-devtools__tabs';

    var tabNames = ['components', 'timeline', 'events', 'stores', 'echo', 'perf', 'settings'];
    var tabLabels = {
        components: 'Components',
        timeline: 'Timeline',
        events: 'Events',
        stores: 'Stores',
        echo: 'Echo',
        perf: 'Performance',
        settings: 'Settings',
    };

    tabNames.forEach(function (name) {
        var tab = document.createElement('button');
        tab.className = 'livue-devtools__tab';
        if (name === _activeTab) {
            tab.classList.add('livue-devtools__tab--active');
        }
        tab.textContent = tabLabels[name];
        tab.addEventListener('click', function () {
            switchTab(name);
        });
        tabs.appendChild(tab);
    });

    _panel.appendChild(tabs);

    // Content
    var content = document.createElement('div');
    content.className = 'livue-devtools__content';

    // Components panel
    var componentsPanel = document.createElement('div');
    componentsPanel.className = 'livue-devtools__panel livue-devtools__components';
    componentsPanel.dataset.tab = 'components';
    if (_activeTab === 'components') {
        componentsPanel.classList.add('livue-devtools__panel--active');
    }

    var treeContainer = document.createElement('div');
    treeContainer.className = 'livue-devtools__tree';
    componentsPanel.appendChild(treeContainer);

    var stateContainer = document.createElement('div');
    stateContainer.className = 'livue-devtools__state';
    componentsPanel.appendChild(stateContainer);

    content.appendChild(componentsPanel);

    // Timeline panel
    var timelinePanel = document.createElement('div');
    timelinePanel.className = 'livue-devtools__panel livue-devtools__timeline';
    timelinePanel.dataset.tab = 'timeline';
    if (_activeTab === 'timeline') {
        timelinePanel.classList.add('livue-devtools__panel--active');
    }
    content.appendChild(timelinePanel);

    // Events panel
    var eventsContainerPanel = document.createElement('div');
    eventsContainerPanel.className = 'livue-devtools__panel livue-devtools__events';
    eventsContainerPanel.dataset.tab = 'events';
    if (_activeTab === 'events') {
        eventsContainerPanel.classList.add('livue-devtools__panel--active');
    }
    content.appendChild(eventsContainerPanel);

    // Stores panel
    var storesPanel = document.createElement('div');
    storesPanel.className = 'livue-devtools__panel livue-devtools__stores';
    storesPanel.dataset.tab = 'stores';
    if (_activeTab === 'stores') {
        storesPanel.classList.add('livue-devtools__panel--active');
    }
    content.appendChild(storesPanel);

    // Echo panel
    var echoPanel = document.createElement('div');
    echoPanel.className = 'livue-devtools__panel livue-devtools__echo';
    echoPanel.dataset.tab = 'echo';
    if (_activeTab === 'echo') {
        echoPanel.classList.add('livue-devtools__panel--active');
    }
    content.appendChild(echoPanel);

    // Performance panel
    var perfPanel = document.createElement('div');
    perfPanel.className = 'livue-devtools__panel livue-devtools__perf';
    perfPanel.dataset.tab = 'perf';
    if (_activeTab === 'perf') {
        perfPanel.classList.add('livue-devtools__panel--active');
    }
    content.appendChild(perfPanel);

    // Settings panel
    var settingsPanel = document.createElement('div');
    settingsPanel.className = 'livue-devtools__panel livue-devtools__settings';
    settingsPanel.dataset.tab = 'settings';
    if (_activeTab === 'settings') {
        settingsPanel.classList.add('livue-devtools__panel--active');
    }
    content.appendChild(settingsPanel);

    _panel.appendChild(content);
    document.body.appendChild(_panel);

    // Setup tree selection callback
    tree.onSelect(function (node) {
        stateInspector.setComponent(node);
        stateInspector.render(stateContainer);
    });

    // Initial render
    renderActiveTab();

    // Listen for collector changes
    _collectorUnsub = collector.onChange(function () {
        renderActiveTab();
    });
}

/**
 * Switch to a different tab.
 * @param {string} tabName
 */
function switchTab(tabName) {
    if (tabName === _activeTab) {
        return;
    }

    _activeTab = tabName;

    // Update tab buttons
    var tabs = _panel.querySelectorAll('.livue-devtools__tab');
    var names = ['components', 'timeline', 'events', 'stores', 'echo', 'perf', 'settings'];
    tabs.forEach(function (tab, index) {
        tab.classList.toggle('livue-devtools__tab--active', names[index] === tabName);
    });

    // Update panels
    var panels = _panel.querySelectorAll('.livue-devtools__panel');
    panels.forEach(function (panel) {
        panel.classList.toggle('livue-devtools__panel--active', panel.dataset.tab === tabName);
    });

    renderActiveTab();
    savePersistedState();
}

/**
 * Render the active tab content.
 */
function renderActiveTab() {
    if (!_panel) {
        return;
    }

    switch (_activeTab) {
        case 'components':
            var treeContainer = _panel.querySelector('.livue-devtools__tree');
            var stateContainer = _panel.querySelector('.livue-devtools__state');
            if (treeContainer) {
                tree.render(treeContainer);
            }
            if (stateContainer) {
                stateInspector.render(stateContainer);
            }
            break;

        case 'timeline':
            var timelineContainer = _panel.querySelector('.livue-devtools__timeline');
            if (timelineContainer) {
                timeline.render(timelineContainer);
            }
            break;

        case 'events':
            var eventsContainer = _panel.querySelector('.livue-devtools__events');
            if (eventsContainer) {
                eventsPanel.render(eventsContainer);
            }
            break;

        case 'stores':
            var storesContainer = _panel.querySelector('.livue-devtools__stores');
            if (storesContainer) {
                renderStoresPanel(storesContainer);
            }
            break;

        case 'echo':
            var echoContainer = _panel.querySelector('.livue-devtools__echo');
            if (echoContainer) {
                renderEchoPanel(echoContainer);
            }
            break;

        case 'perf':
            var perfContainer = _panel.querySelector('.livue-devtools__perf');
            if (perfContainer) {
                renderPerfPanel(perfContainer);
            }
            break;

        case 'settings':
            var settingsContainer = _panel.querySelector('.livue-devtools__settings');
            if (settingsContainer) {
                renderSettingsPanel(settingsContainer);
            }
            break;
    }
}

/**
 * Render the stores panel.
 * @param {HTMLElement} container
 */
function renderStoresPanel(container) {
    container.innerHTML = '';
    container.style.cssText = 'flex-direction: column; width: 100%; padding: 8px;';

    var registrations = getRegistrations();
    var stores = registrations.stores;

    // Title
    var title = document.createElement('div');
    title.className = 'livue-devtools__perf-title';
    title.textContent = 'Registered Pinia Stores';
    container.appendChild(title);

    if (stores.length === 0) {
        var empty = document.createElement('div');
        empty.className = 'livue-devtools__empty';
        empty.innerHTML = '<div class="livue-devtools__empty-icon">&#128230;</div>' +
            'No Pinia stores registered<br><br>' +
            '<span style="font-size: 11px; color: #858585;">Use LiVue.registerStore(useMyStore) to register stores</span>';
        container.appendChild(empty);
        return;
    }

    stores.forEach(function (store) {
        var storeEl = document.createElement('div');
        storeEl.style.cssText = 'padding: 8px; background: #2a2d2e; border-radius: 4px; margin-bottom: 8px;';

        var nameEl = document.createElement('div');
        nameEl.style.cssText = 'color: #4ec9b0; font-weight: 600; margin-bottom: 4px;';
        nameEl.textContent = store.name;
        storeEl.appendChild(nameEl);

        if (store.filters) {
            var filterEl = document.createElement('div');
            filterEl.style.cssText = 'font-size: 11px; color: #858585;';
            filterEl.textContent = 'Filters: ' + JSON.stringify(store.filters);
            storeEl.appendChild(filterEl);
        }

        container.appendChild(storeEl);
    });

    // Also show other registrations
    var otherTitle = document.createElement('div');
    otherTitle.className = 'livue-devtools__perf-title';
    otherTitle.style.marginTop = '16px';
    otherTitle.textContent = 'Other Registrations';
    container.appendChild(otherTitle);

    var otherInfo = [
        { label: 'Plugins', count: registrations.plugins.length, items: registrations.plugins.map(function (p) { return p.name; }) },
        { label: 'Components', count: registrations.components.length, items: registrations.components.map(function (c) { return c.name; }) },
        { label: 'Directives', count: registrations.directives.length, items: registrations.directives.map(function (d) { return d.name; }) },
    ];

    otherInfo.forEach(function (info) {
        var row = document.createElement('div');
        row.className = 'livue-devtools__perf-stat';

        var label = document.createElement('span');
        label.className = 'livue-devtools__perf-label';
        label.textContent = info.label;
        row.appendChild(label);

        var value = document.createElement('span');
        value.className = 'livue-devtools__perf-value';
        value.textContent = info.count + (info.items.length > 0 ? ' (' + info.items.join(', ') + ')' : '');
        row.appendChild(value);

        container.appendChild(row);
    });
}

/**
 * Render the Echo panel.
 * @param {HTMLElement} container
 */
function renderEchoPanel(container) {
    container.innerHTML = '';
    container.style.cssText = 'flex-direction: column; width: 100%; padding: 8px;';

    var echoInfo = getEchoSubscriptions();

    // Status
    var statusSection = document.createElement('div');
    statusSection.className = 'livue-devtools__perf-section';

    var statusTitle = document.createElement('div');
    statusTitle.className = 'livue-devtools__perf-title';
    statusTitle.textContent = 'Laravel Echo Status';
    statusSection.appendChild(statusTitle);

    var statusRow = document.createElement('div');
    statusRow.className = 'livue-devtools__perf-stat';

    var statusLabel = document.createElement('span');
    statusLabel.className = 'livue-devtools__perf-label';
    statusLabel.textContent = 'Echo Available';
    statusRow.appendChild(statusLabel);

    var statusValue = document.createElement('span');
    statusValue.className = 'livue-devtools__perf-value livue-devtools__perf-value--' + (echoInfo.available ? 'good' : 'warn');
    statusValue.textContent = echoInfo.available ? 'Yes' : 'No (window.Echo not found)';
    statusRow.appendChild(statusValue);

    statusSection.appendChild(statusRow);
    container.appendChild(statusSection);

    if (!echoInfo.available) {
        var hint = document.createElement('div');
        hint.style.cssText = 'color: #858585; font-size: 11px; padding: 8px;';
        hint.textContent = 'Configure Laravel Echo and set window.Echo to enable real-time features.';
        container.appendChild(hint);
        return;
    }

    // Channels
    var channelsSection = document.createElement('div');
    channelsSection.className = 'livue-devtools__perf-section';

    var channelsTitle = document.createElement('div');
    channelsTitle.className = 'livue-devtools__perf-title';
    channelsTitle.textContent = 'Active Channels (' + echoInfo.channels.length + ')';
    channelsSection.appendChild(channelsTitle);

    if (echoInfo.channels.length === 0) {
        var noChannels = document.createElement('div');
        noChannels.style.cssText = 'color: #858585; font-size: 11px;';
        noChannels.textContent = 'No active channels';
        channelsSection.appendChild(noChannels);
    } else {
        echoInfo.channels.forEach(function (channel) {
            var channelRow = document.createElement('div');
            channelRow.style.cssText = 'padding: 4px 0; display: flex; align-items: center; gap: 8px;';

            var badge = document.createElement('span');
            badge.style.cssText = 'padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: 600;';
            if (channel.type === 'private') {
                badge.style.background = '#4d3a12';
                badge.style.color = '#dcdcaa';
            } else if (channel.type === 'presence') {
                badge.style.background = '#264f78';
                badge.style.color = '#9cdcfe';
            } else {
                badge.style.background = '#2d4a2d';
                badge.style.color = '#6a9955';
            }
            badge.textContent = channel.type;
            channelRow.appendChild(badge);

            var name = document.createElement('span');
            name.style.color = '#d4d4d4';
            name.textContent = channel.name;
            channelRow.appendChild(name);

            channelsSection.appendChild(channelRow);
        });
    }
    container.appendChild(channelsSection);

    // Subscriptions
    var subsSection = document.createElement('div');
    subsSection.className = 'livue-devtools__perf-section';

    var subsTitle = document.createElement('div');
    subsTitle.className = 'livue-devtools__perf-title';
    subsTitle.textContent = 'Subscriptions (' + echoInfo.subscriptions.length + ')';
    subsSection.appendChild(subsTitle);

    if (echoInfo.subscriptions.length === 0) {
        var noSubs = document.createElement('div');
        noSubs.style.cssText = 'color: #858585; font-size: 11px;';
        noSubs.textContent = 'No active subscriptions';
        subsSection.appendChild(noSubs);
    } else {
        echoInfo.subscriptions.forEach(function (sub) {
            var subRow = document.createElement('div');
            subRow.style.cssText = 'padding: 4px 0; font-size: 11px;';
            subRow.innerHTML = '<span style="color: #9cdcfe;">' + sub.channelName + '</span>' +
                ' <span style="color: #858585;">→</span> ' +
                '<span style="color: #dcdcaa;">' + sub.event + '</span>' +
                ' <span style="color: #858585;">(component: ' + sub.componentId.substring(0, 8) + '...)</span>';
            subsSection.appendChild(subRow);
        });
    }
    container.appendChild(subsSection);
}

/**
 * Render the performance panel.
 * @param {HTMLElement} container
 */
function renderPerfPanel(container) {
    container.innerHTML = '';

    var perf = collector.getPerf();

    // Requests section
    var requestsSection = document.createElement('div');
    requestsSection.className = 'livue-devtools__perf-section';

    var requestsTitle = document.createElement('div');
    requestsTitle.className = 'livue-devtools__perf-title';
    requestsTitle.textContent = 'AJAX Requests';
    requestsSection.appendChild(requestsTitle);

    requestsSection.appendChild(createStat('Total Requests', perf.totalRequests));
    requestsSection.appendChild(createStat('Successful', perf.successfulRequests, 'good'));
    requestsSection.appendChild(createStat('Failed', perf.failedRequests, perf.failedRequests > 0 ? 'bad' : null));

    container.appendChild(requestsSection);

    // Timing section
    var timingSection = document.createElement('div');
    timingSection.className = 'livue-devtools__perf-section';

    var timingTitle = document.createElement('div');
    timingTitle.className = 'livue-devtools__perf-title';
    timingTitle.textContent = 'Request Timing';
    timingSection.appendChild(timingTitle);

    var avgClass = perf.avgRequestTime < 100 ? 'good' : (perf.avgRequestTime < 500 ? 'warn' : 'bad');
    timingSection.appendChild(createStat('Average', formatMs(perf.avgRequestTime), avgClass));

    var minClass = perf.minRequestTime < 100 ? 'good' : (perf.minRequestTime < 500 ? 'warn' : 'bad');
    timingSection.appendChild(createStat('Fastest', perf.minRequestTime === Infinity ? '-' : formatMs(perf.minRequestTime), minClass));

    var maxClass = perf.maxRequestTime < 100 ? 'good' : (perf.maxRequestTime < 500 ? 'warn' : 'bad');
    timingSection.appendChild(createStat('Slowest', perf.maxRequestTime === 0 ? '-' : formatMs(perf.maxRequestTime), maxClass));

    container.appendChild(timingSection);

    // Template swaps section
    var swapsSection = document.createElement('div');
    swapsSection.className = 'livue-devtools__perf-section';

    var swapsTitle = document.createElement('div');
    swapsTitle.className = 'livue-devtools__perf-title';
    swapsTitle.textContent = 'Template Swaps';
    swapsSection.appendChild(swapsTitle);

    swapsSection.appendChild(createStat('Total Swaps', perf.totalTemplateSwaps));

    var swapAvgClass = perf.avgTemplateSwapTime < 5 ? 'good' : (perf.avgTemplateSwapTime < 20 ? 'warn' : 'bad');
    swapsSection.appendChild(createStat('Average Time', formatMs(perf.avgTemplateSwapTime), swapAvgClass));

    container.appendChild(swapsSection);

    // Components section
    var componentsSection = document.createElement('div');
    componentsSection.className = 'livue-devtools__perf-section';

    var componentsTitle = document.createElement('div');
    componentsTitle.className = 'livue-devtools__perf-title';
    componentsTitle.textContent = 'Components';
    componentsSection.appendChild(componentsTitle);

    var components = collector.getComponents();
    var roots = components.filter(function (c) { return !c.isChild; });
    var children = components.filter(function (c) { return c.isChild; });

    componentsSection.appendChild(createStat('Root Components', roots.length));
    componentsSection.appendChild(createStat('Child Components', children.length));
    componentsSection.appendChild(createStat('Total', components.length));

    container.appendChild(componentsSection);
}

/**
 * Render the settings panel.
 * @param {HTMLElement} container
 */
function renderSettingsPanel(container) {
    container.innerHTML = '';

    // Position setting
    var positionGroup = document.createElement('div');
    positionGroup.className = 'livue-devtools__settings-group';

    var positionLabel = document.createElement('div');
    positionLabel.className = 'livue-devtools__settings-label';
    positionLabel.textContent = 'Panel Position';
    positionGroup.appendChild(positionLabel);

    var positionOptions = document.createElement('div');
    positionOptions.className = 'livue-devtools__settings-options';

    var positions = [
        { id: 'right', label: 'Right', icon: '\u25B6' },
        { id: 'left', label: 'Left', icon: '\u25C0' },
        { id: 'bottom', label: 'Bottom', icon: '\u25BC' },
        { id: 'top', label: 'Top', icon: '\u25B2' },
    ];

    positions.forEach(function (pos) {
        var btn = document.createElement('button');
        btn.className = 'livue-devtools__settings-btn';
        if (_position === pos.id) {
            btn.classList.add('livue-devtools__settings-btn--active');
        }

        var icon = document.createElement('span');
        icon.className = 'livue-devtools__settings-btn-icon';
        icon.textContent = pos.icon;
        btn.appendChild(icon);

        var label = document.createElement('span');
        label.textContent = pos.label;
        btn.appendChild(label);

        btn.addEventListener('click', function () {
            setPosition(pos.id);
        });

        positionOptions.appendChild(btn);
    });

    positionGroup.appendChild(positionOptions);
    container.appendChild(positionGroup);

    // Info section
    var infoGroup = document.createElement('div');
    infoGroup.className = 'livue-devtools__settings-group';

    var infoLabel = document.createElement('div');
    infoLabel.className = 'livue-devtools__settings-label';
    infoLabel.textContent = 'Keyboard Shortcuts';
    infoGroup.appendChild(infoLabel);

    var shortcuts = [
        { key: 'Ctrl+Shift+L', desc: 'Toggle DevTools' },
    ];

    shortcuts.forEach(function (shortcut) {
        var row = document.createElement('div');
        row.className = 'livue-devtools__perf-stat';

        var keySpan = document.createElement('span');
        keySpan.style.cssText = 'color: #dcdcaa; font-family: monospace;';
        keySpan.textContent = shortcut.key;
        row.appendChild(keySpan);

        var descSpan = document.createElement('span');
        descSpan.style.color = '#858585';
        descSpan.textContent = shortcut.desc;
        row.appendChild(descSpan);

        infoGroup.appendChild(row);
    });

    container.appendChild(infoGroup);
}

/**
 * Set the panel position and re-create the panel.
 * @param {string} position - 'right' | 'left' | 'bottom' | 'top'
 */
function setPosition(position) {
    if (_position === position) {
        return;
    }

    _position = position;
    savePersistedState();

    // Update panel class
    if (_panel) {
        _panel.className = 'livue-devtools livue-devtools--' + _position;
        if (_minimized) {
            _panel.classList.add('livue-devtools--minimized');
        }

        // Update minimize button icon
        var icons = getMinimizeIcons();
        var minimizeBtn = _panel.querySelector('.livue-devtools__btn');
        if (minimizeBtn) {
            minimizeBtn.textContent = _minimized ? icons.minimized : icons.expanded;
        }

        // Re-render settings to update active button
        renderActiveTab();
    }
}

/**
 * Create a stat row.
 * @param {string} label
 * @param {*} value
 * @param {string|null} valueClass
 * @returns {HTMLElement}
 */
function createStat(label, value, valueClass) {
    var stat = document.createElement('div');
    stat.className = 'livue-devtools__perf-stat';

    var labelSpan = document.createElement('span');
    labelSpan.className = 'livue-devtools__perf-label';
    labelSpan.textContent = label;
    stat.appendChild(labelSpan);

    var valueSpan = document.createElement('span');
    valueSpan.className = 'livue-devtools__perf-value';
    if (valueClass) {
        valueSpan.classList.add('livue-devtools__perf-value--' + valueClass);
    }
    valueSpan.textContent = String(value);
    stat.appendChild(valueSpan);

    return stat;
}

/**
 * Format milliseconds for display.
 * @param {number} ms
 * @returns {string}
 */
function formatMs(ms) {
    if (ms === 0 || isNaN(ms) || !isFinite(ms)) {
        return '-';
    }
    if (ms < 1) {
        return '<1ms';
    }
    return Math.round(ms) + 'ms';
}

/**
 * Setup keyboard shortcut (Ctrl+Shift+L).
 */
function setupKeyboardShortcut() {
    _keyHandler = function (e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            toggle();
        }
    };
    document.addEventListener('keydown', _keyHandler);
}

/**
 * Setup auto-refresh for live updates.
 */
function setupAutoRefresh() {
    // Refresh components tab periodically to catch state changes
    _refreshInterval = setInterval(function () {
        if (_panel && _activeTab === 'components') {
            var treeContainer = _panel.querySelector('.livue-devtools__tree');
            var stateContainer = _panel.querySelector('.livue-devtools__state');

            if (treeContainer) {
                tree.render(treeContainer);
            }
            if (stateContainer) {
                stateInspector.render(stateContainer);
            }
        }
    }, 500);
}
