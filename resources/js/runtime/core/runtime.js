/**
 * LiVue Runtime - Core orchestrator.
 *
 * Discovers all LiVue components on the page and mounts Vue apps
 * only on root elements (top-level or islands).
 *
 * Nested components are handled within the parent's Vue app
 * as registered Vue components, sharing the same instance.
 */

import LiVueComponent from './component.js';
import { onError } from '../helpers/errors.js';
import {
    initNavigation,
    navigateTo,
    configure as configureNavigation,
    clearCache as clearNavigationCache,
    prefetchUrl,
    isNavigating,
} from '../features/navigation.js';
import progress from '../helpers/progress.js';
import { registerBuiltInDirectives } from '../directives/index.js';
import { hook, getAvailableHooks } from '../helpers/hooks.js';
import { isEchoAvailable, getDebugInfo as getEchoDebugInfo, leaveAll as leaveAllEchoChannels } from '../features/echo.js';
import * as devtools from '../devtools/index.js';
import * as hmr from '../features/hmr/hmr.js';

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

class LiVueRuntime {
    constructor() {
        /** @type {Map<string, LiVueComponent>} */
        this.components = new Map();

        /** @type {MutationObserver|null} */
        this._observer = null;

        /** @type {boolean} */
        this._devtoolsInitialized = false;

        /** @type {Array<Function>} Setup callbacks for configuring Vue apps */
        this._setupCallbacks = [];

        /** @type {Set<string>|null} IDs of components being preserved during navigation */
        this._preservingIds = null;
    }

    /**
     * Configure Vue apps before they are created.
     * Use this to add plugins like Vuetify, Pinia stores, etc.
     *
     * The callback is called for each Vue app instance (root components
     * and islands), AFTER Pinia is installed but BEFORE mounting.
     *
     * @param {Function} callback - Function(app) called for each Vue app
     *
     * @example
     * // Add Vuetify
     * LiVue.setup((app) => {
     *     const vuetify = createVuetify({...});
     *     app.use(vuetify);
     * });
     *
     * @example
     * // Add multiple plugins
     * LiVue.setup((app) => {
     *     app.use(vuetify);
     *     app.use(router);
     *     app.component('MyComponent', MyComponent);
     *     app.directive('focus', focusDirective);
     * });
     */
    setup(callback) {
        if (typeof callback !== 'function') {
            console.error('[LiVue] setup() requires a function callback');
            return;
        }
        this._setupCallbacks.push(callback);
    }

    /**
     * Register a global error handler.
     * Called when a non-validation error occurs on any component.
     *
     * @param {Function} handler - function(error, componentName)
     */
    onError(handler) {
        onError(handler);
    }

    /**
     * Boot the runtime: discover root/island components and mount them.
     * Children are automatically handled by their parent's Vue app.
     * Starts a MutationObserver to automatically detect new components.
     */
    boot() {
        // Initialize devtools only in development (lazy, doesn't open panel)
        if (process.env.NODE_ENV !== 'production' && !this._devtoolsInitialized) {
            devtools.init(this);
            this._devtoolsInitialized = true;
        }

        // Register built-in directives before mounting components
        registerBuiltInDirectives();

        let allElements = document.querySelectorAll('[data-livue-id]');

        allElements.forEach(function (el) {
            if (this._isRoot(el)) {
                this._initComponent(el);
            }
        }.bind(this));

        // Initialize navigation module (sets history state, popstate listener)
        initNavigation(this);

        // Start observing DOM for dynamic component changes
        this._startObserver();

        // Setup keyboard shortcut for devtools (Ctrl+Shift+L) - only in development
        if (process.env.NODE_ENV !== 'production') {
            this._setupDevtoolsShortcut();
        }

        // Setup HMR (Hot Module Replacement) in development
        hmr.setup(this);
    }

    /**
     * Setup keyboard shortcut for devtools.
     * @private
     */
    _setupDevtoolsShortcut() {
        if (this._devtoolsShortcutSetup) {
            return;
        }
        this._devtoolsShortcutSetup = true;

        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                devtools.toggle();
            }
        });
    }

    /**
     * Reboot: destroy all existing components and re-discover.
     * Called after SPA navigation swaps the page content.
     * The MutationObserver continues running and will pick up new components,
     * but we do a full scan here to ensure immediate initialization.
     */
    reboot() {
        // Temporarily pause observer to avoid duplicate processing
        this._stopObserver();

        this.destroy();

        let allElements = document.querySelectorAll('[data-livue-id]');

        allElements.forEach(function (el) {
            if (this._isRoot(el)) {
                this._initComponent(el);
            }
        }.bind(this));

        // Resume observing
        this._startObserver();
    }

    /**
     * Reboot but preserve certain components (don't destroy them).
     * Used during SPA navigation with @persist elements.
     */
    rebootPreserving() {
        // Only init NEW components (those not already in the map)
        let allElements = document.querySelectorAll('[data-livue-id]');

        allElements.forEach(function (el) {
            if (this._isRoot(el)) {
                this._initComponent(el); // _initComponent already skips existing
            }
        }.bind(this));

        // Resume observing AFTER a frame to let Vue finish any pending DOM cleanup
        // from the destroyed components. Otherwise the observer sees the cleanup
        // and incorrectly destroys preserved components.
        // NOTE: We keep _preservingIds set - it will be cleared/replaced by the next navigation
        let self = this;
        requestAnimationFrame(function() {
            self._startObserver();
        });
    }

    /**
     * Navigate to a URL using SPA navigation.
     * Can be called from user code: LiVue.navigate('/dashboard')
     *
     * @param {string} url - Target URL
     */
    navigate(url) {
        navigateTo(url, true, false);
    }

    /**
     * Configure navigation behavior.
     *
     * @param {object} options
     * @param {boolean} [options.showProgressBar] - Show progress bar during navigation (default: true)
     * @param {string} [options.progressBarColor] - Progress bar color (default: '#29d')
     * @param {boolean} [options.prefetch] - Enable prefetching (default: true)
     * @param {boolean} [options.prefetchOnHover] - Prefetch on hover vs mousedown only (default: true)
     * @param {number} [options.hoverDelay] - Hover delay before prefetch in ms (default: 60)
     * @param {boolean} [options.cachePages] - Cache pages for back/forward (default: true)
     * @param {number} [options.maxCacheSize] - Max cached pages (default: 10)
     * @param {boolean} [options.restoreScroll] - Restore scroll position on back/forward (default: true)
     */
    configureNavigation(options) {
        configureNavigation(options);
    }

    /**
     * Prefetch a URL for instant navigation.
     * Useful for programmatic prefetching.
     *
     * @param {string} url - URL to prefetch
     * @returns {Promise<string|null>} The HTML content or null on error
     */
    prefetch(url) {
        return prefetchUrl(url);
    }

    /**
     * Clear the navigation page cache.
     */
    clearNavigationCache() {
        clearNavigationCache();
    }

    /**
     * Check if a navigation is currently in progress.
     *
     * @returns {boolean}
     */
    isNavigating() {
        return isNavigating();
    }

    /**
     * Get the progress bar API.
     * Use LiVue.progress.configure() to customize appearance.
     *
     * @returns {object} Progress bar API { configure, start, done, set, isStarted }
     */
    get progress() {
        return progress;
    }

    /**
     * Get Echo (Laravel Broadcasting) status and debug info.
     *
     * @returns {object} { available: boolean, channels: string[], subscriptions: string[] }
     */
    get echo() {
        return {
            available: isEchoAvailable(),
            ...getEchoDebugInfo(),
        };
    }

    /**
     * Check if an element should get its own Vue app.
     * Returns true if the element is a top-level component (no livue parent)
     * or if it's explicitly marked as an island.
     *
     * @param {HTMLElement} el
     * @returns {boolean}
     */
    _isRoot(el) {
        // Islands always get their own Vue app
        if (el.hasAttribute('data-livue-island')) {
            return true;
        }

        // Walk up the DOM to see if there's a parent livue component
        let parent = el.parentElement;

        while (parent) {
            if (parent.hasAttribute('data-livue-id') && !parent.hasAttribute('data-livue-island')) {
                return false; // Nested inside another livue component
            }
            parent = parent.parentElement;
        }

        return true; // No livue parent found
    }

    /**
     * Initialize a root/island component.
     *
     * @param {HTMLElement} el
     */
    _initComponent(el) {
        let id = el.dataset.livueId;

        if (this.components.has(id)) {
            return;
        }

        let component = new LiVueComponent(el);
        this.components.set(id, component);
    }

    /**
     * Get a mounted component instance by its ID.
     *
     * @param {string} id
     * @returns {LiVueComponent|undefined}
     */
    getComponent(id) {
        return this.components.get(id);
    }

    /**
     * Find a component by its ID.
     * Alias for getComponent.
     *
     * @param {string} id
     * @returns {LiVueComponent|undefined}
     */
    find(id) {
        return this.components.get(id);
    }

    /**
     * Get the first mounted component on the page.
     *
     * @returns {LiVueComponent|undefined}
     */
    first() {
        let iterator = this.components.values();
        let first = iterator.next();
        return first.done ? undefined : first.value;
    }

    /**
     * Get all mounted root/island components.
     *
     * @returns {LiVueComponent[]}
     */
    all() {
        return Array.from(this.components.values());
    }

    /**
     * Get all components matching a specific name.
     * Searches both root components and their children.
     *
     * @param {string} name - Component name (kebab-case)
     * @returns {Array<{ id: string, name: string, state: object, livue: object }>}
     */
    getByName(name) {
        let matches = [];

        this.components.forEach(function (component) {
            // Check root component
            if (component.name === name) {
                matches.push({
                    id: component.componentId,
                    name: component.name,
                    state: component.state,
                    livue: component._rootLivue,
                });
            }

            // Check children
            for (let childId in component._childRegistry) {
                let child = component._childRegistry[childId];
                if (child.name === name) {
                    matches.push({
                        id: childId,
                        name: child.name,
                        state: child.state,
                        livue: child.livue,
                    });
                }
            }
        });

        return matches;
    }

    /**
     * Register a hook callback for lifecycle events.
     *
     * Available hooks:
     * - component.init: When a component is initialized
     * - component.destroy: When a component is destroyed
     * - element.init: When each DOM element is initialized
     * - request.started: When an AJAX request starts
     * - request.finished: When an AJAX request completes
     * - template.updating: Before a template is swapped
     * - template.updated: After a template is swapped
     * - error.occurred: When an error occurs
     *
     * @param {string} hookName - The hook to listen for
     * @param {Function} callback - The callback function
     * @returns {Function} Unsubscribe function
     *
     * @example
     * const unsubscribe = LiVue.hook('component.init', ({ component, el, cleanup }) => {
     *     console.log('Component initialized:', component.name);
     *     cleanup(() => console.log('Cleanup'));
     * });
     *
     * @example
     * LiVue.hook('request.started', ({ url, updateCount }) => {
     *     console.log('Request started to', url, 'with', updateCount, 'updates');
     * });
     */
    hook(hookName, callback) {
        return hook(hookName, callback);
    }

    /**
     * Get list of all available hook names.
     * @returns {string[]}
     */
    getAvailableHooks() {
        return getAvailableHooks();
    }

    /**
     * Destroy all mounted Vue app instances.
     */
    destroy() {
        // Clear preserving flag
        this._preservingIds = null;

        this.components.forEach(function (component) {
            component.destroy();
        });
        this.components.clear();

        // Leave all Echo channels
        leaveAllEchoChannels();
    }

    /**
     * Destroy all mounted Vue app instances EXCEPT those with IDs in the preserveIds set.
     * Used during SPA navigation to preserve @persist components.
     *
     * @param {Set<string>} preserveIds - Set of component IDs to preserve
     */
    destroyExcept(preserveIds) {
        var self = this;
        var toDelete = [];

        // Store preserveIds so _cleanupComponent can check them
        // This prevents the MutationObserver from destroying preserved components
        // when Vue's unmount() triggers DOM removals
        this._preservingIds = preserveIds;

        this.components.forEach(function (component, id) {
            if (!preserveIds.has(id)) {
                component.destroy();
                toDelete.push(id);
            }
        });

        toDelete.forEach(function (id) {
            self.components.delete(id);
        });

        // Leave all Echo channels (TODO: preserve channels for persisted components)
        leaveAllEchoChannels();
    }

    /**
     * Start the MutationObserver to watch for DOM changes.
     * Automatically initializes new LiVue components and cleans up removed ones.
     */
    _startObserver() {
        if (this._observer) {
            return; // Already observing
        }

        let self = this;

        this._observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // Process added nodes
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType !== Node.ELEMENT_NODE) {
                        return;
                    }

                    self._processAddedNode(node);
                });

                // Process removed nodes
                mutation.removedNodes.forEach(function (node) {
                    if (node.nodeType !== Node.ELEMENT_NODE) {
                        return;
                    }

                    self._processRemovedNode(node);
                });
            });
        });

        this._observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    /**
     * Stop the MutationObserver.
     */
    _stopObserver() {
        if (this._observer) {
            this._observer.disconnect();
            this._observer = null;
        }
    }

    /**
     * Process a node that was added to the DOM.
     * Finds and initializes any LiVue root components within it.
     * Also detects standalone <livue-lazy> elements and wraps them.
     *
     * @param {HTMLElement} node
     */
    _processAddedNode(node) {
        // Check if the node itself is a LiVue component
        if (node.hasAttribute && node.hasAttribute('data-livue-id')) {
            if (this._isRoot(node)) {
                this._initComponent(node);
            }
        }

        // Check for LiVue components within the added node
        if (node.querySelectorAll) {
            let components = node.querySelectorAll('[data-livue-id]');

            components.forEach(function (el) {
                if (this._isRoot(el)) {
                    this._initComponent(el);
                }
            }.bind(this));
        }

        // Check for standalone <livue-lazy> elements (not inside a LiVue component)
        this._processStandaloneLazy(node);
    }

    /**
     * Find and wrap standalone <livue-lazy> elements.
     * These are lazy components injected outside of any LiVue root.
     *
     * @param {HTMLElement} node
     */
    _processStandaloneLazy(node) {
        let lazyElements = [];

        // Check if the node itself is a livue-lazy
        if (node.tagName && node.tagName.toLowerCase() === 'livue-lazy') {
            if (this._isStandaloneLazy(node)) {
                lazyElements.push(node);
            }
        }

        // Check for livue-lazy elements within the added node
        if (node.querySelectorAll) {
            let found = node.querySelectorAll('livue-lazy');
            found.forEach(function (el) {
                if (this._isStandaloneLazy(el)) {
                    lazyElements.push(el);
                }
            }.bind(this));
        }

        // Wrap each standalone lazy element
        lazyElements.forEach(function (el) {
            this._wrapStandaloneLazy(el);
        }.bind(this));
    }

    /**
     * Check if a <livue-lazy> element is standalone (not inside a LiVue component).
     *
     * @param {HTMLElement} el
     * @returns {boolean}
     */
    _isStandaloneLazy(el) {
        // Already wrapped?
        if (el.dataset.livueLazyWrapped) {
            return false;
        }

        // Walk up the DOM to see if there's a parent livue component
        let parent = el.parentElement;

        while (parent) {
            if (parent.hasAttribute('data-livue-id')) {
                return false; // Inside a LiVue component, Vue will handle it
            }
            parent = parent.parentElement;
        }

        return true; // Standalone
    }

    /**
     * Wrap a standalone <livue-lazy> element in a minimal LiVue root component.
     *
     * @param {HTMLElement} el
     */
    _wrapStandaloneLazy(el) {
        // Mark as wrapped to avoid double processing
        el.dataset.livueLazyWrapped = 'true';

        // Create a wrapper div that will become the LiVue root
        let wrapper = document.createElement('div');
        let id = 'livue-lazy-wrapper-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

        // Minimal snapshot for a wrapper component (empty state, no memo except name)
        let snapshot = {
            state: {},
            memo: {
                name: 'lazy-wrapper',
                checksum: '',
            },
        };

        wrapper.dataset.livueId = id;
        wrapper.dataset.livueSnapshot = JSON.stringify(snapshot);

        // Move the livue-lazy element inside the wrapper
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);

        // Initialize the wrapper as a LiVue component
        this._initComponent(wrapper);
    }

    /**
     * Process a node that was removed from the DOM.
     * Cleans up any LiVue components that were destroyed.
     *
     * @param {HTMLElement} node
     */
    _processRemovedNode(node) {
        // Check if the node itself is a LiVue component
        if (node.hasAttribute && node.hasAttribute('data-livue-id')) {
            let id = node.dataset.livueId;
            this._cleanupComponent(id);
        }

        // Check for LiVue components within the removed node
        if (node.querySelectorAll) {
            let components = node.querySelectorAll('[data-livue-id]');

            components.forEach(function (el) {
                let id = el.dataset.livueId;
                this._cleanupComponent(id);
            }.bind(this));
        }
    }

    /**
     * Clean up a component by ID if it exists.
     *
     * @param {string} id
     */
    _cleanupComponent(id) {
        // Skip if this component is being preserved during navigation
        if (this._preservingIds && this._preservingIds.has(id)) {
            return;
        }

        let component = this.components.get(id);

        if (component) {
            component.destroy();
            this.components.delete(id);
        }
    }

    /**
     * Set a custom confirmation handler for #[Confirm] methods.
     *
     * The handler receives { message, title, confirmText, cancelText }
     * and must return a Promise<boolean>.
     *
     * Example with SweetAlert2:
     *   LiVue.setConfirmHandler(async (config) => {
     *       const result = await Swal.fire({
     *           title: config.title || 'Confirm',
     *           text: config.message,
     *           showCancelButton: true,
     *           confirmButtonText: config.confirmText,
     *           cancelButtonText: config.cancelText,
     *       });
     *       return result.isConfirmed;
     *   });
     *
     * @param {Function} handler - Async function returning Promise<boolean>
     */
    setConfirmHandler(handler) {
        window.LiVue = window.LiVue || {};
        window.LiVue.confirmHandler = handler;
    }

    /**
     * Get the DevTools API.
     * Returns no-op functions in production to avoid errors.
     *
     * @returns {object} DevTools API
     *
     * @example
     * LiVue.devtools.open();
     * LiVue.devtools.toggle();
     * const components = LiVue.devtools.getComponents();
     */
    get devtools() {
        if (process.env.NODE_ENV === 'production') {
            // Return no-op API in production
            return {
                init: function() {},
                open: function() {},
                close: function() {},
                toggle: function() {},
                isOpen: function() { return false; },
                getComponents: function() { return []; },
                getTimeline: function() { return []; },
                getEvents: function() { return []; },
                getPerf: function() { return {}; },
                clearTimeline: function() {},
                clearEvents: function() {},
                clear: function() {},
                logEvent: function() {},
                isInitialized: function() { return false; },
                startCollecting: function() {},
                stopCollecting: function() {},
                isCollecting: function() { return false; },
            };
        }
        return devtools;
    }

    /**
     * Get the HMR (Hot Module Replacement) API.
     *
     * @returns {object} HMR API
     *
     * @example
     * if (LiVue.hmr.isAvailable()) {
     *     LiVue.hmr.onUpdate((data) => console.log('Updated:', data.fileName));
     * }
     */
    get hmr() {
        return {
            isAvailable: hmr.isAvailable,
            isEnabled: hmr.isEnabled,
            enable: hmr.enable,
            disable: hmr.disable,
            configure: hmr.configure,
            onUpdate: hmr.onUpdate,
            trigger: hmr.trigger,
        };
    }

    /**
     * Enable or disable debug mode.
     * When enabled, logs all hook events to the console.
     *
     * @param {boolean} enabled - Whether to enable debug mode
     *
     * @example
     * LiVue.debug(true);  // Enable verbose logging
     * LiVue.debug(false); // Disable logging
     */
    debug(enabled) {
        if (enabled && !_debugMode) {
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
        } else if (!enabled && _debugMode) {
            _debugMode = false;
            console.log('[LiVue] Debug mode disabled');

            // Unsubscribe from all hooks
            _debugUnsubscribers.forEach(function (unsub) {
                unsub();
            });
            _debugUnsubscribers = [];
        }

        return _debugMode;
    }

    /**
     * Check if debug mode is enabled.
     *
     * @returns {boolean}
     */
    isDebugEnabled() {
        return _debugMode;
    }
}

export default new LiVueRuntime();
