/**
 * LiVue Plugin Registry
 *
 * Central registry for LiVue plugins. Supports:
 * - Registering plugins with LiVue.use(plugin, options)
 * - Disabling built-in plugins with LiVue.removePlugin(name)
 * - Applying plugins (calling install) at boot time
 * - Collecting composables and directives contributed by plugins
 *
 * Plugin interface:
 *   const MyPlugin = {
 *       name: 'my-plugin',   // optional, used for dedup / opt-out
 *       install(api, options, runtime) { ... }
 *   };
 *
 * API object passed to install():
 *   api.hook(name, fn)          — subscribe to a lifecycle hook
 *   api.composable(name, value) — expose a value globally in all templates
 *   api.directive(name, def)    — register a Vue directive on all apps
 *   api.setup(fn)               — add a LiVue.setup() callback
 */

import { hook } from '../helpers/hooks.js';

/**
 * List of registered plugins with their options.
 * @type {Array<{plugin: object, options: *}>}
 */
var _plugins = [];

/**
 * Set of plugin names that have been disabled (opt-out of built-ins).
 * @type {Set<string>}
 */
var _disabledPlugins = new Set();

/**
 * Composables contributed by plugins, keyed by name.
 * @type {object}
 */
var _pluginComposables = {};

/**
 * Directives contributed by plugins.
 * @type {Array<{name: string, directive: object|Function}>}
 */
var _pluginDirectives = [];

/**
 * Register a plugin. If the plugin has a name and is already registered,
 * the existing registration is replaced (deduplication).
 *
 * @param {object} plugin - Plugin object with optional name and required install()
 * @param {*} [options] - Options passed to plugin.install()
 */
export function registerPlugin(plugin, options) {
    if (!plugin || typeof plugin.install !== 'function') {
        console.warn('[LiVue] Plugin must have an install() method');
        return;
    }

    if (plugin.name) {
        // Replace existing plugin with same name (dedup)
        for (var i = 0; i < _plugins.length; i++) {
            if (_plugins[i].plugin.name === plugin.name) {
                _plugins[i] = { plugin: plugin, options: options };
                return;
            }
        }
    }

    _plugins.push({ plugin: plugin, options: options });
}

/**
 * Disable a plugin by name, preventing it from being applied during boot.
 * Used to opt-out of built-in plugins (e.g. LiVue.removePlugin('livue:progress')).
 *
 * @param {string} name - The plugin name to disable
 */
export function disablePlugin(name) {
    _disabledPlugins.add(name);
}

/**
 * Apply all registered, non-disabled plugins by calling their install() method.
 * Must be called once during boot(), after user plugins have been registered.
 *
 * @param {object} runtime - The LiVueRuntime instance
 */
export function applyPlugins(runtime) {
    for (var i = 0; i < _plugins.length; i++) {
        var entry = _plugins[i];
        var plugin = entry.plugin;
        var options = entry.options;

        if (plugin.name && _disabledPlugins.has(plugin.name)) {
            continue;
        }

        var api = buildApi(runtime);

        try {
            plugin.install(api, options, runtime);
        } catch (e) {
            console.error('[LiVue] Error installing plugin ' + (plugin.name || '(unnamed)') + ':', e);
        }
    }
}

/**
 * Build the plugin API object passed to install().
 *
 * @param {object} runtime - The LiVueRuntime instance
 * @returns {object}
 */
function buildApi(runtime) {
    return {
        /**
         * Subscribe to a LiVue lifecycle hook.
         * @param {string} name
         * @param {Function} fn
         * @returns {Function} Unsubscribe function
         */
        hook: function (name, fn) {
            return hook(name, fn);
        },

        /**
         * Register a composable available in all component templates.
         * The value is exposed as a top-level variable with the given name.
         *
         * @param {string} name - Variable name in templates
         * @param {*} value - Any reactive or plain value
         */
        composable: function (name, value) {
            _pluginComposables[name] = value;
        },

        /**
         * Register a Vue directive applied to all Vue app instances.
         *
         * @param {string} name - Directive name (without 'v-' prefix)
         * @param {object|Function} def - Vue directive definition
         */
        directive: function (name, def) {
            _pluginDirectives.push({ name: name, directive: def });
        },

        /**
         * Register a LiVue.setup() callback (called for each Vue app instance).
         *
         * @param {Function} fn - Function(vueApp) called for each Vue app
         */
        setup: function (fn) {
            runtime.setup(fn);
        },
    };
}

/**
 * Get all composables contributed by plugins.
 *
 * @returns {object} Merged composables object { name: value, ... }
 */
export function getPluginComposables() {
    return _pluginComposables;
}

/**
 * Get all directives contributed by plugins.
 *
 * @returns {Array<{name: string, directive: object|Function}>}
 */
export function getPluginDirectives() {
    return _pluginDirectives;
}

/**
 * Reset registry state. Used in tests.
 * @internal
 */
export function _reset() {
    _plugins = [];
    _disabledPlugins = new Set();
    _pluginComposables = {};
    _pluginDirectives = [];
}
