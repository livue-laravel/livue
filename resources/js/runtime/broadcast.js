/**
 * Cross-tab state synchronization for LiVue.
 *
 * Uses BroadcastChannel API (modern browsers) with localStorage fallback
 * (older browsers). Components with #[TabSync] attribute will automatically
 * sync their state across browser tabs.
 */

const CHANNEL_NAME = 'livue-tab-sync';

/**
 * Unique identifier for this tab to avoid processing own messages.
 * @type {string}
 */
let _tabId = Date.now() + '-' + Math.random().toString(36).substr(2, 9);

/**
 * BroadcastChannel instance (null if not supported).
 * @type {BroadcastChannel|null}
 */
let _channel = null;

/**
 * Map of component name -> callback for receiving updates.
 * @type {Map<string, Function>}
 */
let _listeners = new Map();

/**
 * Whether the broadcast system has been initialized.
 * @type {boolean}
 */
let _initialized = false;

/**
 * Initialize the broadcast system.
 * Called automatically on first register/broadcast.
 */
function init() {
    if (_initialized) return;
    _initialized = true;

    if (typeof BroadcastChannel !== 'undefined') {
        // Modern browsers: use BroadcastChannel
        _channel = new BroadcastChannel(CHANNEL_NAME);
        _channel.onmessage = handleMessage;
    } else {
        // Fallback: use localStorage events
        window.addEventListener('storage', handleStorageEvent);
    }
}

/**
 * Handle incoming BroadcastChannel message.
 *
 * @param {MessageEvent} event
 */
function handleMessage(event) {
    let data = event.data;

    // Ignore own messages
    if (data.tabId === _tabId) return;

    processIncoming(data);
}

/**
 * Handle localStorage storage event (fallback for older browsers).
 *
 * @param {StorageEvent} event
 */
function handleStorageEvent(event) {
    if (event.key !== CHANNEL_NAME) return;
    if (!event.newValue) return;

    try {
        let data = JSON.parse(event.newValue);

        // Ignore own messages
        if (data.tabId === _tabId) return;

        processIncoming(data);
    } catch (e) {
        // Ignore parse errors
    }
}

/**
 * Process an incoming sync message.
 *
 * @param {object} data - { tabId, component, state, properties, config }
 */
function processIncoming(data) {
    let callback = _listeners.get(data.component);

    if (callback) {
        callback(data.state, data.properties, data.config);
    }
}

/**
 * Register a component to receive tab sync updates.
 *
 * @param {string} componentName - The component name (e.g., 'shopping-cart')
 * @param {Function} callback - function(state, properties, config)
 */
export function register(componentName, callback) {
    init();
    _listeners.set(componentName, callback);
}

/**
 * Unregister a component from tab sync.
 *
 * @param {string} componentName
 */
export function unregister(componentName) {
    _listeners.delete(componentName);
}

/**
 * Broadcast a state change to other tabs.
 *
 * @param {string} componentName - The component name
 * @param {object} state - The state to broadcast (already filtered by config)
 * @param {string[]} properties - Which properties changed
 * @param {object} config - TabSync config { enabled, only, except }
 */
export function broadcast(componentName, state, properties, config) {
    init();

    let message = {
        tabId: _tabId,
        component: componentName,
        state: state,
        properties: properties,
        config: config,
    };

    if (_channel) {
        // BroadcastChannel
        _channel.postMessage(message);
    } else {
        // localStorage fallback
        // Set the value, then immediately remove it.
        // Other tabs will catch the 'storage' event.
        try {
            localStorage.setItem(CHANNEL_NAME, JSON.stringify(message));
            localStorage.removeItem(CHANNEL_NAME);
        } catch (e) {
            // localStorage might be full or disabled
        }
    }
}

/**
 * Filter state based on TabSync configuration.
 *
 * @param {object} state - Full state object
 * @param {string[]} properties - Properties that changed
 * @param {object} config - { only?: string[], except?: string[] }
 * @returns {object} Filtered state with only allowed properties
 */
export function filterState(state, properties, config) {
    let filtered = {};

    for (let prop of properties) {
        // Skip if 'only' is set and prop not in it
        if (config.only && !config.only.includes(prop)) {
            continue;
        }

        // Skip if 'except' is set and prop is in it
        if (config.except && config.except.includes(prop)) {
            continue;
        }

        if (prop in state) {
            filtered[prop] = state[prop];
        }
    }

    return filtered;
}

/**
 * Get the current tab ID (useful for debugging).
 *
 * @returns {string}
 */
export function getTabId() {
    return _tabId;
}

export default {
    register,
    unregister,
    broadcast,
    filterState,
    getTabId,
};
