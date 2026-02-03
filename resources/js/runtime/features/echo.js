/**
 * Laravel Echo integration for LiVue.
 *
 * Enables real-time broadcasting via WebSockets using Laravel Echo.
 * Supports public, private, and presence channels.
 *
 * Requirements:
 * - Laravel Echo must be installed and configured
 * - window.Echo must be available globally
 *
 * Channel types:
 * - public:   echo:channel,Event
 * - private:  echo-private:channel,Event
 * - presence: echo-presence:channel,Event (supports here/joining/leaving)
 */

/**
 * Map of channel key -> channel instance.
 * Key format: "type:channel" (e.g., "private:orders.123")
 * @type {Map<string, object>}
 */
const _channels = new Map();

/**
 * Map of subscription key -> { unsubscribe, listeners }
 * Key format: "type:channel:event:componentId"
 * @type {Map<string, object>}
 */
const _subscriptions = new Map();

/**
 * Whether we've already warned about Echo not being available.
 * @type {boolean}
 */
let _warnedNoEcho = false;

/**
 * Check if Laravel Echo is available.
 * @returns {boolean}
 */
export function isEchoAvailable() {
    return typeof window !== 'undefined' && window.Echo;
}

/**
 * Get or create a channel instance.
 *
 * @param {string} channelName - Channel name (e.g., "orders.123")
 * @param {string} type - Channel type: "public", "private", or "presence"
 * @returns {object|null} Echo channel instance or null if Echo unavailable
 */
function getOrCreateChannel(channelName, type) {
    if (!isEchoAvailable()) {
        console.warn('[LiVue Echo] Laravel Echo is not available. Make sure window.Echo is initialized.');
        return null;
    }

    const key = type + ':' + channelName;

    if (_channels.has(key)) {
        return _channels.get(key);
    }

    let channel;

    switch (type) {
        case 'private':
            channel = window.Echo.private(channelName);
            break;
        case 'presence':
            channel = window.Echo.join(channelName);
            break;
        case 'public':
        default:
            channel = window.Echo.channel(channelName);
            break;
    }

    _channels.set(key, channel);
    return channel;
}

/**
 * Subscribe a component to Echo events.
 *
 * @param {string} componentId - Unique component ID
 * @param {Array} echoConfig - Array of listener configs from memo.echo
 * @param {Function} callMethod - Function to call component method: (method, data) => void
 * @returns {Function} Cleanup function to unsubscribe all
 */
export function subscribe(componentId, echoConfig, callMethod) {
    if (!echoConfig || !echoConfig.length) {
        return function () {};
    }

    if (!isEchoAvailable()) {
        // Only warn once to avoid console spam
        if (!_warnedNoEcho) {
            _warnedNoEcho = true;
            console.warn('[LiVue Echo] Laravel Echo not available. Broadcast events will not work. Configure window.Echo to enable real-time features.');
        }
        return function () {};
    }

    const subscriptionKeys = [];

    for (let i = 0; i < echoConfig.length; i++) {
        const config = echoConfig[i];
        const { channel: channelName, type, event, method, isPresenceEvent, isCustomEvent } = config;

        const echoChannel = getOrCreateChannel(channelName, type);
        if (!echoChannel) continue;

        const subKey = type + ':' + channelName + ':' + event + ':' + componentId;

        // Skip if already subscribed
        if (_subscriptions.has(subKey)) {
            subscriptionKeys.push(subKey);
            continue;
        }

        // Create handler
        const handler = function (data) {
            try {
                callMethod(method, data);
            } catch (e) {
                console.error('[LiVue Echo] Error calling method "' + method + '":', e);
            }
        };

        // Subscribe based on event type
        if (type === 'presence' && isPresenceEvent) {
            // Presence channel special events
            subscribePresenceEvent(echoChannel, event, handler);
        } else {
            // Regular channel event
            const eventName = isCustomEvent ? '.' + event : event;
            echoChannel.listen(eventName, handler);
        }

        _subscriptions.set(subKey, {
            channel: echoChannel,
            channelKey: type + ':' + channelName,
            event: event,
            handler: handler,
            isPresenceEvent: isPresenceEvent,
            isCustomEvent: isCustomEvent,
        });

        subscriptionKeys.push(subKey);
    }

    // Return cleanup function
    return function () {
        for (let j = 0; j < subscriptionKeys.length; j++) {
            unsubscribeSingle(subscriptionKeys[j]);
        }
    };
}

/**
 * Subscribe to presence channel special events.
 *
 * @param {object} channel - Presence channel instance
 * @param {string} event - "here", "joining", or "leaving"
 * @param {Function} handler - Event handler
 */
function subscribePresenceEvent(channel, event, handler) {
    switch (event) {
        case 'here':
            channel.here(handler);
            break;
        case 'joining':
            channel.joining(handler);
            break;
        case 'leaving':
            channel.leaving(handler);
            break;
    }
}

/**
 * Unsubscribe a single subscription.
 *
 * @param {string} subKey - Subscription key
 */
function unsubscribeSingle(subKey) {
    const sub = _subscriptions.get(subKey);
    if (!sub) return;

    // For regular events, stop listening
    if (!sub.isPresenceEvent) {
        const eventName = sub.isCustomEvent ? '.' + sub.event : sub.event;
        try {
            sub.channel.stopListening(eventName, sub.handler);
        } catch (e) {
            // Ignore errors during cleanup
        }
    }
    // Note: Presence special events (here/joining/leaving) cannot be individually removed

    _subscriptions.delete(subKey);

    // Check if channel still has listeners
    cleanupChannelIfEmpty(sub.channelKey);
}

/**
 * Unsubscribe all listeners for a component.
 *
 * @param {string} componentId - Component ID
 */
export function unsubscribeComponent(componentId) {
    const suffix = ':' + componentId;
    const keysToRemove = [];

    _subscriptions.forEach(function (_, key) {
        if (key.endsWith(suffix)) {
            keysToRemove.push(key);
        }
    });

    for (let i = 0; i < keysToRemove.length; i++) {
        unsubscribeSingle(keysToRemove[i]);
    }
}

/**
 * Leave and remove a channel if it has no more subscriptions.
 *
 * @param {string} channelKey - Channel key (e.g., "private:orders.123")
 */
function cleanupChannelIfEmpty(channelKey) {
    // Check if any subscription uses this channel
    let hasSubscriptions = false;

    _subscriptions.forEach(function (sub) {
        if (sub.channelKey === channelKey) {
            hasSubscriptions = true;
        }
    });

    if (hasSubscriptions) return;

    // Leave the channel
    const channel = _channels.get(channelKey);
    if (channel && isEchoAvailable()) {
        const parts = channelKey.split(':');
        const type = parts[0];
        const channelName = parts.slice(1).join(':');

        try {
            if (type === 'presence') {
                window.Echo.leave(channelName);
            } else if (type === 'private') {
                window.Echo.leaveChannel('private-' + channelName);
            } else {
                window.Echo.leaveChannel(channelName);
            }
        } catch (e) {
            // Ignore errors during cleanup
        }
    }

    _channels.delete(channelKey);
}

/**
 * Leave all channels and clear subscriptions.
 * Useful for cleanup on page navigation.
 */
export function leaveAll() {
    _subscriptions.clear();

    _channels.forEach(function (channel, key) {
        if (isEchoAvailable()) {
            const parts = key.split(':');
            const type = parts[0];
            const channelName = parts.slice(1).join(':');

            try {
                if (type === 'presence') {
                    window.Echo.leave(channelName);
                } else if (type === 'private') {
                    window.Echo.leaveChannel('private-' + channelName);
                } else {
                    window.Echo.leaveChannel(channelName);
                }
            } catch (e) {
                // Ignore
            }
        }
    });

    _channels.clear();
}

/**
 * Get current subscription info (for debugging).
 *
 * @returns {object} { channels: [...], subscriptions: [...] }
 */
export function getDebugInfo() {
    return {
        echoAvailable: isEchoAvailable(),
        channels: Array.from(_channels.keys()),
        subscriptions: Array.from(_subscriptions.keys()),
    };
}

/**
 * Get detailed subscription info (for DevTools).
 *
 * @returns {object} { available, channels: [...], subscriptions: [...] }
 */
export function getDetailedSubscriptions() {
    var channelList = [];
    var subscriptionList = [];

    _channels.forEach(function (channel, key) {
        var parts = key.split(':');
        channelList.push({
            key: key,
            type: parts[0],
            name: parts.slice(1).join(':'),
        });
    });

    _subscriptions.forEach(function (sub, key) {
        var parts = key.split(':');
        subscriptionList.push({
            key: key,
            channelType: parts[0],
            channelName: parts[1],
            event: parts[2],
            componentId: parts[3],
            isPresenceEvent: sub.isPresenceEvent,
            isCustomEvent: sub.isCustomEvent,
        });
    });

    return {
        available: isEchoAvailable(),
        channels: channelList,
        subscriptions: subscriptionList,
    };
}

export default {
    subscribe,
    unsubscribeComponent,
    leaveAll,
    isEchoAvailable,
    getDebugInfo,
};
