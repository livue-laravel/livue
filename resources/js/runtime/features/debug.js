import { hook, getAvailableHooks } from '../helpers/hooks.js';

/**
 * Debug mode flag.
 * @type {boolean}
 */
var _debugMode = false;

/**
 * Debug hook unsubscribers.
 * @type {Array<Function>}
 */
var _debugUnsubscribers = [];

/**
 * Enable debug mode.
 * When enabled, logs all hook events to the console.
 */
export function enable() {
    if (_debugMode) {
        return;
    }

    _debugMode = true;
    console.log('[LiVue] Debug mode enabled');

    // Subscribe to all hooks
    var hookNames = getAvailableHooks();
    hookNames.forEach(function (hookName) {
        var unsub = hook(hookName, function (payload) {
            var logPayload = {};

            // Sanitize payload for logging (avoid circular refs)
            if (payload.component) {
                logPayload.componentId = payload.component.id;
                logPayload.componentName = payload.component.name;
            }
            if (payload.el) {
                logPayload.element = payload.el.tagName;
            }
            if (payload.url) {
                logPayload.url = payload.url;
            }
            if (payload.updateCount !== undefined) {
                logPayload.updateCount = payload.updateCount;
            }
            if (payload.lazyCount !== undefined) {
                logPayload.lazyCount = payload.lazyCount;
            }
            if (payload.success !== undefined) {
                logPayload.success = payload.success;
            }
            if (payload.error) {
                logPayload.error = payload.error.message || String(payload.error);
            }
            if (payload.isChild !== undefined) {
                logPayload.isChild = payload.isChild;
            }

            console.log('[LiVue] ' + hookName + ':', logPayload);
        });
        _debugUnsubscribers.push(unsub);
    });
}

/**
 * Disable debug mode.
 */
export function disable() {
    if (!_debugMode) {
        return;
    }

    _debugMode = false;
    console.log('[LiVue] Debug mode disabled');

    // Unsubscribe from all hooks
    _debugUnsubscribers.forEach(function (unsub) {
        unsub();
    });
    _debugUnsubscribers = [];
}

/**
 * Check if debug mode is enabled.
 * @returns {boolean}
 */
export function isEnabled() {
    return _debugMode;
}
