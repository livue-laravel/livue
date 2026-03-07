/**
 * LiVue DevTools - Main Panel
 *
 * Layout:
 *   Top tabs: Components | Timeline | Events | Stores | Echo | Performance | Settings
 *   Components tab: tree (left, fixed) + 2 sub-tabs on the right: State | Benchmark
 *   All other tabs: full-width, global data
 */

import { injectStyles, removeStyles } from './styles.js';
import * as collector from './collector.js';
import * as tree from './tree.js';
import * as stateInspector from './state.js';
import * as timeline from './timeline.js';
import * as eventsPanel from './events.js';
import { getRegistrations, getEchoSubscriptions, getPiniaStores, getServerBenchmarks, getComponentBenchmarkStats } from './collector.js';

var STORAGE_KEY = 'livue-devtools-state';

/** @type {HTMLElement|null} */
var _panel = null;

/** Active top-level tab. @type {string} */
var _activeTab = 'components';

/** Active sub-tab within the Components tab: 'state' | 'benchmark' @type {string} */
var _activeSubTab = 'state';

/** Currently selected component node from the tree. @type {object|null} */
var _selectedComponent = null;

/** @type {boolean} */
var _minimized = false;

/** @type {boolean} */
var _wasOpen = false;

/** Panel position: 'right' | 'left' | 'bottom' | 'top' @type {string} */
var _position = 'right';

function loadPersistedState() {
    try {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            var state = JSON.parse(stored);
            _activeTab = state.activeTab || 'components';
            _activeSubTab = state.activeSubTab || 'state';
            _minimized = state.minimized || false;
            _wasOpen = state.isOpen || false;
            _position = state.position || 'right';
        }
    } catch (e) {}
}

function savePersistedState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            isOpen: _panel !== null,
            activeTab: _activeTab,
            activeSubTab: _activeSubTab,
            minimized: _minimized,
            position: _position,
        }));
    } catch (e) {}
}

export function shouldAutoOpen() {
    loadPersistedState();
    return _wasOpen;
}

/** @type {object|null} */
var _runtime = null;
/** @type {number|null} */
var _refreshInterval = null;
/** @type {Function|null} */
var _keyHandler = null;
/** @type {Function|null} */
var _collectorUnsub = null;

export function setRuntime(runtime) {
    _runtime = runtime;
    tree.setRuntime(runtime);
}

export function isOpen() {
    return _panel !== null;
}

export function open() {
    if (_panel) return;
    loadPersistedState();
    injectStyles();
    collector.start();
    createPanel();
    setupKeyboardShortcut();
    setupAutoRefresh();
    savePersistedState();
}

export function close() {
    if (!_panel) return;

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
    _selectedComponent = null;
    removeStyles();
    collector.stop();
    stateInspector.clear();
    savePersistedState();
}

export function toggle() {
    if (_panel) { close(); } else { open(); }
}

function getMinimizeIcons() {
    switch (_position) {
        case 'left':   return { expanded: '\u25C0', minimized: '\u25B6' };
        case 'right':  return { expanded: '\u25B6', minimized: '\u25C0' };
        case 'top':    return { expanded: '\u25B2', minimized: '\u25BC' };
        case 'bottom': return { expanded: '\u25BC', minimized: '\u25B2' };
        default:       return { expanded: '\u25B6', minimized: '\u25C0' };
    }
}

function createPanel() {
    _panel = document.createElement('div');
    _panel.className = 'livue-devtools livue-devtools--' + _position;
    if (_minimized) _panel.classList.add('livue-devtools--minimized');

    // ── Header ────────────────────────────────────────────────────────────────
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

    // ── Top-level tabs ────────────────────────────────────────────────────────
    var tabs = document.createElement('div');
    tabs.className = 'livue-devtools__tabs';

    var tabDefs = [
        { id: 'components', label: 'Components' },
        { id: 'timeline',   label: 'Timeline' },
        { id: 'events',     label: 'Events' },
        { id: 'stores',     label: 'Stores' },
        { id: 'echo',       label: 'Echo' },
        { id: 'perf',       label: 'Performance' },
        { id: 'settings',   label: 'Settings' },
    ];

    tabDefs.forEach(function (def) {
        var btn = document.createElement('button');
        btn.className = 'livue-devtools__tab';
        if (def.id === _activeTab) btn.classList.add('livue-devtools__tab--active');
        btn.textContent = def.label;
        btn.addEventListener('click', function () { switchTab(def.id); });
        tabs.appendChild(btn);
    });

    _panel.appendChild(tabs);

    // ── Content ───────────────────────────────────────────────────────────────
    var content = document.createElement('div');
    content.className = 'livue-devtools__content';

    // ── Components panel: tree (left) + right pane with sub-tabs ─────────────
    var componentsPanel = document.createElement('div');
    componentsPanel.className = 'livue-devtools__panel livue-devtools__panel--components';
    componentsPanel.dataset.tab = 'components';
    if (_activeTab === 'components') componentsPanel.classList.add('livue-devtools__panel--active');

    var treeContainer = document.createElement('div');
    treeContainer.className = 'livue-devtools__tree';
    componentsPanel.appendChild(treeContainer);

    var rightPane = document.createElement('div');
    rightPane.className = 'livue-devtools__right-pane';

    // Sub-tabs: State | Benchmark
    var subTabs = document.createElement('div');
    subTabs.className = 'livue-devtools__sub-tabs';

    [{ id: 'state', label: 'State' }, { id: 'benchmark', label: 'Benchmark' }].forEach(function (def) {
        var btn = document.createElement('button');
        btn.className = 'livue-devtools__sub-tab';
        if (def.id === _activeSubTab) btn.classList.add('livue-devtools__sub-tab--active');
        btn.textContent = def.label;
        btn.addEventListener('click', function () { switchSubTab(def.id); });
        subTabs.appendChild(btn);
    });

    rightPane.appendChild(subTabs);

    var subContent = document.createElement('div');
    subContent.className = 'livue-devtools__sub-content';

    ['state', 'benchmark'].forEach(function (id) {
        var panel = document.createElement('div');
        panel.className = 'livue-devtools__panel';
        panel.dataset.subtab = id;
        if (id === _activeSubTab) panel.classList.add('livue-devtools__panel--active');
        subContent.appendChild(panel);
    });

    rightPane.appendChild(subContent);
    componentsPanel.appendChild(rightPane);
    content.appendChild(componentsPanel);

    // ── Global tabs (full-width) ───────────────────────────────────────────────
    ['timeline', 'events', 'stores', 'echo', 'perf', 'settings'].forEach(function (id) {
        var panel = document.createElement('div');
        panel.className = 'livue-devtools__panel';
        panel.dataset.tab = id;
        if (id === _activeTab) panel.classList.add('livue-devtools__panel--active');
        content.appendChild(panel);
    });

    _panel.appendChild(content);
    document.body.appendChild(_panel);

    // ── Tree selection callback ────────────────────────────────────────────────
    tree.onSelect(function (node) {
        _selectedComponent = node;
        stateInspector.setComponent(node);
        renderComponentsRight();
    });

    // ── Initial render ─────────────────────────────────────────────────────────
    renderActiveTab();

    // ── Collector changes ──────────────────────────────────────────────────────
    _collectorUnsub = collector.onChange(function () {
        renderActiveTab();
    });
}

/**
 * Switch the active top-level tab.
 * @param {string} tabName
 */
function switchTab(tabName) {
    if (tabName === _activeTab) return;
    _activeTab = tabName;

    var btns = _panel.querySelectorAll('.livue-devtools__tab');
    var ids = ['components', 'timeline', 'events', 'stores', 'echo', 'perf', 'settings'];
    btns.forEach(function (btn, i) {
        btn.classList.toggle('livue-devtools__tab--active', ids[i] === tabName);
    });

    var panels = _panel.querySelectorAll('.livue-devtools__panel[data-tab]');
    panels.forEach(function (panel) {
        panel.classList.toggle('livue-devtools__panel--active', panel.dataset.tab === tabName);
    });

    renderActiveTab();
    savePersistedState();
}

/**
 * Switch the active sub-tab within the Components panel.
 * @param {string} subTabName - 'state' | 'benchmark'
 */
function switchSubTab(subTabName) {
    if (subTabName === _activeSubTab) return;
    _activeSubTab = subTabName;

    var btns = _panel.querySelectorAll('.livue-devtools__sub-tab');
    var ids = ['state', 'benchmark'];
    btns.forEach(function (btn, i) {
        btn.classList.toggle('livue-devtools__sub-tab--active', ids[i] === subTabName);
    });

    var panels = _panel.querySelectorAll('.livue-devtools__panel[data-subtab]');
    panels.forEach(function (panel) {
        panel.classList.toggle('livue-devtools__panel--active', panel.dataset.subtab === subTabName);
    });

    renderComponentsRight();
    savePersistedState();
}

/**
 * Render the right-pane content of the Components tab (sub-tabs).
 */
function renderComponentsRight() {
    if (!_panel) return;

    if (_activeSubTab === 'state') {
        var statePanel = _panel.querySelector('.livue-devtools__panel[data-subtab="state"]');
        if (statePanel) stateInspector.render(statePanel);
    } else {
        var benchmarkPanel = _panel.querySelector('.livue-devtools__panel[data-subtab="benchmark"]');
        if (benchmarkPanel) renderBenchmarkPanel(benchmarkPanel, _selectedComponent);
    }
}

/**
 * Render the active top-level tab content.
 */
function renderActiveTab() {
    if (!_panel) return;

    switch (_activeTab) {
        case 'components':
            var treeContainer = _panel.querySelector('.livue-devtools__tree');
            if (treeContainer) tree.render(treeContainer);
            renderComponentsRight();
            break;

        case 'timeline':
            var timelineContainer = _panel.querySelector('.livue-devtools__panel[data-tab="timeline"]');
            if (timelineContainer) timeline.render(timelineContainer);
            break;

        case 'events':
            var eventsContainer = _panel.querySelector('.livue-devtools__panel[data-tab="events"]');
            if (eventsContainer) eventsPanel.render(eventsContainer);
            break;

        case 'stores':
            var storesContainer = _panel.querySelector('.livue-devtools__panel[data-tab="stores"]');
            if (storesContainer) renderStoresPanel(storesContainer);
            break;

        case 'echo':
            var echoContainer = _panel.querySelector('.livue-devtools__panel[data-tab="echo"]');
            if (echoContainer) renderEchoPanel(echoContainer);
            break;

        case 'perf':
            var perfContainer = _panel.querySelector('.livue-devtools__panel[data-tab="perf"]');
            if (perfContainer) renderPerfPanel(perfContainer);
            break;

        case 'settings':
            var settingsContainer = _panel.querySelector('.livue-devtools__panel[data-tab="settings"]');
            if (settingsContainer) renderSettingsPanel(settingsContainer);
            break;
    }
}

/**
 * Render the Benchmark sub-tab: Server Lifecycle Timing for the selected component.
 * @param {HTMLElement} container
 * @param {object|null} selectedComponent
 */
function renderBenchmarkPanel(container, selectedComponent) {
    container.innerHTML = '';

    var allBenchmarks = getServerBenchmarks();

    if (allBenchmarks.length === 0) {
        var noBench = document.createElement('div');
        noBench.className = 'livue-devtools__empty';
        noBench.innerHTML = '<div class="livue-devtools__empty-icon">&#9201;</div>' +
            'No benchmark data.<br><br>' +
            '<span style="font-size: 11px; color: #858585;">Set LIVUE_BENCHMARK=true in .env to enable.</span>';
        container.appendChild(noBench);
        return;
    }

    if (!selectedComponent) {
        var noSelect = document.createElement('div');
        noSelect.className = 'livue-devtools__empty';
        noSelect.innerHTML = '<div class="livue-devtools__empty-icon">&#x1F4CA;</div>' +
            'Select a component from the tree<br>to see its benchmark data.';
        container.appendChild(noSelect);
        return;
    }

    var benchmarks = allBenchmarks.filter(function (b) {
        return b.componentId === selectedComponent.id;
    });

    if (benchmarks.length === 0) {
        var empty = document.createElement('div');
        empty.className = 'livue-devtools__empty';
        empty.innerHTML = '<div class="livue-devtools__empty-icon">&#9201;</div>' +
            'No benchmark data for <strong style="color:#4ec9b0">' + selectedComponent.name + '</strong> yet.';
        container.appendChild(empty);
        return;
    }

    // Latest entry
    var latest = benchmarks[0];

    var latestSection = document.createElement('div');
    latestSection.className = 'livue-devtools__perf-section';

    var latestTitle = document.createElement('div');
    latestTitle.className = 'livue-devtools__perf-title';
    latestTitle.textContent = 'Latest — ' + selectedComponent.name;
    latestSection.appendChild(latestTitle);

    var latestTime = document.createElement('div');
    latestTime.style.cssText = 'color: #858585; font-size: 11px; margin-bottom: 6px;';
    latestTime.textContent = collector.formatTimestamp(latest.time);
    latestSection.appendChild(latestTime);

    var userPhases = ['mount', 'method_call', 'render', 'total'];
    for (var phase in latest.timings) {
        var us = latest.timings[phase];
        var ms = us / 1000;
        var isUserPhase = userPhases.indexOf(phase) !== -1;
        var greenMax = isUserPhase ? 50 : 5;
        var yellowMax = isUserPhase ? 200 : 20;
        var colorClass = ms < greenMax ? 'good' : (ms < yellowMax ? 'warn' : 'bad');
        latestSection.appendChild(createStat(phase, formatUs(us), colorClass));
    }

    container.appendChild(latestSection);

    // Running averages (only if more than 1 request in this session)
    var stats = getComponentBenchmarkStats(selectedComponent.id);
    if (stats && stats.count > 1) {
        var avgSection = document.createElement('div');
        avgSection.className = 'livue-devtools__perf-section';

        var avgTitle = document.createElement('div');
        avgTitle.className = 'livue-devtools__perf-title';
        avgTitle.textContent = 'Session Average (' + stats.count + ' requests)';
        avgSection.appendChild(avgTitle);

        for (var avgPhase in stats.averages) {
            var avgUs = Math.round(stats.averages[avgPhase]);
            var avgMs = avgUs / 1000;
            var isUserAvg = userPhases.indexOf(avgPhase) !== -1;
            var avgColor = avgMs < (isUserAvg ? 50 : 5) ? 'good' : (avgMs < (isUserAvg ? 200 : 20) ? 'warn' : 'bad');
            avgSection.appendChild(createStat(avgPhase, formatUs(avgUs), avgColor));
        }

        container.appendChild(avgSection);
    }
}

/**
 * Render the stores panel.
 * @param {HTMLElement} container
 */
function renderStoresPanel(container) {
    container.innerHTML = '';

    var registrations = getRegistrations();
    var stores = registrations.stores;

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

    var otherTitle = document.createElement('div');
    otherTitle.className = 'livue-devtools__perf-title';
    otherTitle.style.marginTop = '16px';
    otherTitle.textContent = 'Other Registrations';
    container.appendChild(otherTitle);

    var otherInfo = [
        { label: 'Plugins',    count: registrations.plugins.length,    items: registrations.plugins.map(function (p) { return p.name; }) },
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

    var echoInfo = getEchoSubscriptions();

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
                badge.style.background = '#4d3a12'; badge.style.color = '#dcdcaa';
            } else if (channel.type === 'presence') {
                badge.style.background = '#264f78'; badge.style.color = '#9cdcfe';
            } else {
                badge.style.background = '#2d4a2d'; badge.style.color = '#6a9955';
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
 * Render the performance panel (global stats only).
 * @param {HTMLElement} container
 */
function renderPerfPanel(container) {
    container.innerHTML = '';

    var perf = collector.getPerf();

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

    var positionGroup = document.createElement('div');
    positionGroup.className = 'livue-devtools__settings-group';

    var positionLabel = document.createElement('div');
    positionLabel.className = 'livue-devtools__settings-label';
    positionLabel.textContent = 'Panel Position';
    positionGroup.appendChild(positionLabel);

    var positionOptions = document.createElement('div');
    positionOptions.className = 'livue-devtools__settings-options';

    var positions = [
        { id: 'right',  label: 'Right',  icon: '\u25B6' },
        { id: 'left',   label: 'Left',   icon: '\u25C0' },
        { id: 'bottom', label: 'Bottom', icon: '\u25BC' },
        { id: 'top',    label: 'Top',    icon: '\u25B2' },
    ];

    positions.forEach(function (pos) {
        var btn = document.createElement('button');
        btn.className = 'livue-devtools__settings-btn';
        if (_position === pos.id) btn.classList.add('livue-devtools__settings-btn--active');

        var icon = document.createElement('span');
        icon.className = 'livue-devtools__settings-btn-icon';
        icon.textContent = pos.icon;
        btn.appendChild(icon);

        var label = document.createElement('span');
        label.textContent = pos.label;
        btn.appendChild(label);

        btn.addEventListener('click', function () { setPosition(pos.id); });
        positionOptions.appendChild(btn);
    });

    positionGroup.appendChild(positionOptions);
    container.appendChild(positionGroup);

    var infoGroup = document.createElement('div');
    infoGroup.className = 'livue-devtools__settings-group';

    var infoLabel = document.createElement('div');
    infoLabel.className = 'livue-devtools__settings-label';
    infoLabel.textContent = 'Keyboard Shortcuts';
    infoGroup.appendChild(infoLabel);

    var row = document.createElement('div');
    row.className = 'livue-devtools__perf-stat';

    var keySpan = document.createElement('span');
    keySpan.style.cssText = 'color: #dcdcaa; font-family: monospace;';
    keySpan.textContent = 'Ctrl+Shift+L';
    row.appendChild(keySpan);

    var descSpan = document.createElement('span');
    descSpan.style.color = '#858585';
    descSpan.textContent = 'Toggle DevTools';
    row.appendChild(descSpan);

    infoGroup.appendChild(row);
    container.appendChild(infoGroup);
}

function setPosition(position) {
    if (_position === position) return;
    _position = position;
    savePersistedState();

    if (_panel) {
        _panel.className = 'livue-devtools livue-devtools--' + _position;
        if (_minimized) _panel.classList.add('livue-devtools--minimized');

        var icons = getMinimizeIcons();
        var minimizeBtn = _panel.querySelector('.livue-devtools__btn');
        if (minimizeBtn) minimizeBtn.textContent = _minimized ? icons.minimized : icons.expanded;

        renderActiveTab();
    }
}

function createStat(label, value, valueClass) {
    var stat = document.createElement('div');
    stat.className = 'livue-devtools__perf-stat';

    var labelSpan = document.createElement('span');
    labelSpan.className = 'livue-devtools__perf-label';
    labelSpan.textContent = label;
    stat.appendChild(labelSpan);

    var valueSpan = document.createElement('span');
    valueSpan.className = 'livue-devtools__perf-value';
    if (valueClass) valueSpan.classList.add('livue-devtools__perf-value--' + valueClass);
    valueSpan.textContent = String(value);
    stat.appendChild(valueSpan);

    return stat;
}

function formatMs(ms) {
    if (ms === 0 || isNaN(ms) || !isFinite(ms)) return '-';
    if (ms < 1) return '<1ms';
    return Math.round(ms) + 'ms';
}

function formatUs(us) {
    if (us === 0 || isNaN(us) || !isFinite(us)) return '-';
    if (us < 1000) return us + '\u00B5s';
    return (us / 1000).toFixed(2) + 'ms';
}

function setupKeyboardShortcut() {
    _keyHandler = function (e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            toggle();
        }
    };
    document.addEventListener('keydown', _keyHandler);
}

function setupAutoRefresh() {
    _refreshInterval = setInterval(function () {
        if (_panel && _activeTab === 'components') {
            var treeContainer = _panel.querySelector('.livue-devtools__tree');
            if (treeContainer) tree.render(treeContainer);
            renderComponentsRight();
        }
    }, 500);
}
