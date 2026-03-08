/**
 * Client-side LiVue component.
 *
 * Mounts a single Vue app on a root element. Nested LiVue components
 * (children) are registered as Vue components within the same app,
 * so the entire tree shares one Vue instance.
 *
 * Components marked with data-livue-island are treated as separate
 * Vue apps and are NOT absorbed into the parent.
 *
 * Architecture: the Vue app is a thin shell that renders the root
 * component via <component :is>. Both root and children are dynamic
 * Vue components whose templates can be swapped independently when
 * the server returns updated HTML — no DOM morphing needed.
 *
 * Data model: each component's data lives in a "snapshot" containing
 * { state, memo }. The snapshot travels as an opaque JSON string:
 * the client stores it intact and sends it back to the server as-is.
 * Synthesized properties (models, enums, Carbon, collections) are
 * stored as inline tuples [value, {s: 'type', ...}] within the state.
 * The client unwraps tuples for Vue reactivity and rewraps them for diffs.
 *
 * Checksum model: the checksum covers the entire
 * state (including inline tuples). The client keeps the raw snapshot
 * JSON string and sends it back for checksum verification. Changes
 * from v-model are sent separately as "diffs".
 */

import { createApp, reactive, shallowRef, nextTick } from 'vue';
import { createReactiveState } from './state.js';
import { unwrapState } from './tuples.js';
import { captureIgnoredContent, restoreIgnoredContent } from './dom-preservation.js';
import { buildComponentDef } from './template-transform.js';
import { createLivueHelper } from './livue-helper.js';
import { processTemplate } from './template-processor.js';
import { setErrors, removeComponentErrorHandler } from '../helpers/errors.js';
import { on, removeByComponentId } from '../features/events.js';
import { clearModifiers } from '../helpers/modifiers.js';
import { unregister as unregisterTabSync } from '../features/broadcast.js';
import { getBuiltInDirectives } from './registry.js';
import { subscribe as subscribeEcho, unsubscribeComponent as unsubscribeEcho } from '../features/echo.js';
import { withViewTransition, isViewTransitionsSupported } from '../directives/transition.js';
import { trigger, createCleanupCollector } from '../helpers/hooks.js';
import { captureFocusState, restoreFocusState } from '../helpers/focus.js';
import { createPinia } from 'pinia';
import { createLazyComponent } from '../features/lazy.js';
import { getPluginComposables, getPluginDirectives } from './plugin-registry.js';

export default class LiVueComponent {
    /**
     * @param {HTMLElement} el - The root/island wrapper element
     */
    constructor(el) {
        this.el = el;
        this.componentId = el.dataset.livueId;

        // Parse snapshot from DOM. The raw JSON string is stored as the
        // opaque server snapshot for sending back to the server.
        let snapshotJson = el.dataset.livueSnapshot || '{}';
        let snapshot;
        try {
            snapshot = JSON.parse(snapshotJson);
        } catch (e) {
            console.error('[LiVue] Failed to parse component snapshot:', e);
            snapshot = {};
        }
        this.name = snapshot.memo ? snapshot.memo.name : '';
        // Unwrap inline tuples for Vue reactivity
        this.state = createReactiveState(unwrapState(snapshot.state || {}));
        // Full memo for JS runtime (includes uploads, urlParams, vueMethods, isolate, etc.)
        this.memo = snapshot.memo || { name: '' };
        this.snapshotJson = snapshotJson;
        this.vueApp = null;

        /** @type {Object<string, object>} livue-id → child info */
        this._childRegistry = {};

        /** @type {object} Reactive version counters for child key-swapping */
        this._versions = reactive({});

        /** @type {import('vue').ShallowRef|null} */
        this._rootDefRef = null;

        /** @type {object|null} Stable root component definition (reused across template swaps) */
        this._currentRootDef = null;

        /** @type {object|null} */
        this._rootLivue = null;
        this._rootState = null; // For #[Modelable] two-way binding
        this._pinia = null;

        /**
         * Helper functions exposed to the lazy directive.
         * Allows lazy.js to create child components without circular imports.
         * @type {object}
         */
        this._lazyHelpers = {
            createLivueHelper: createLivueHelper,
            buildComponentDef: buildComponentDef,
            processTemplate: processTemplate,
            createReactiveState: createReactiveState,
        };

        try {
            this._mount(snapshot, snapshotJson);
        } catch (e) {
            console.error('[LiVue] Component mount failed for element:', this.el, e);
        }
    }

    /**
     * Mount the Vue app shell. The root component is rendered via
     * <component :is> so its template can be swapped independently
     * without unmounting the Vue app.
     */
    _mount(snapshot, snapshotJson) {
        let self = this;

        // Absorb sibling <script type="application/livue-setup"> elements into the
        // component element. @script blocks in Blade render AFTER the root element,
        // making them siblings. Moving them inside ensures el.innerHTML includes them
        // so extractSetupScript() can find and execute the user's setup code.
        this._absorbSetupScripts();

        // Create root component ref with _updateTemplate
        let rootComponentRef = {
            /**
             * Update the component template with new HTML.
             * @param {string} newInnerHtml - The new HTML content
             * @param {object} [options] - Transition options
             * @param {string} [options.transitionType] - Transition type (e.g., 'forward', 'backward')
             * @param {boolean} [options.skipTransition] - Skip the View Transition
             */
            _updateTemplate: function (newInnerHtml, options) {
                options = options || {};

                // Trigger template.updating hook
                trigger('template.updating', {
                    component: { id: self.componentId, name: self.name, state: self.state, livue: self._rootLivue },
                    el: self.el,
                    html: newInnerHtml,
                });

                // Capture focus state BEFORE the swap so we can restore it after
                var focusState = captureFocusState(self.el);

                // Capture v-ignore content BEFORE the swap
                captureIgnoredContent(self.el);

                // Process the new HTML (may discover new children)
                let rootProcessed;
                try {
                    rootProcessed = processTemplate(newInnerHtml, self);
                } catch (e) {
                    console.error('[LiVue] Error processing updated template:', e);
                    return;
                }

                // Guard: abort if the Vue app was destroyed (e.g. SPA navigation)
                if (!self.vueApp) return;

                // Register any new child components in the app
                // Only register if not already registered to avoid Vue warnings
                for (let tagName in rootProcessed.childDefs) {
                    if (!self.vueApp._context.components[tagName]) {
                        self.vueApp.component(tagName, rootProcessed.childDefs[tagName]);
                    }
                }

                // The actual DOM swap function
                function doSwap() {
                    // Update the compiled render function in place — Vue detects
                    // the shallowRef change inside the wrapper and re-renders
                    // without unmounting, preserving child component instances.
                    self._currentRootDef._updateRender(rootProcessed.template);

                    // Restore v-ignore content and focus AFTER Vue updates the DOM
                    nextTick(function () {
                        restoreIgnoredContent(self.el);

                        // Restore focus state after DOM is rebuilt
                        restoreFocusState(self.el, focusState);

                        // Trigger template.updated hook after DOM is updated
                        trigger('template.updated', {
                            component: { id: self.componentId, name: self.name, state: self.state, livue: self._rootLivue },
                            el: self.el,
                        });
                    });
                }

                // Skip View Transition if requested (#[Transition(skip: true)])
                if (options.skipTransition) {
                    doSwap();
                    return;
                }

                // Use View Transitions API if available for smooth animations
                if (isViewTransitionsSupported()) {
                    withViewTransition(doSwap, { type: options.transitionType });
                } else {
                    doSwap();
                }
            },
        };

        // Plain unwrapped copy for diff tracking
        let rootServerState = JSON.parse(JSON.stringify(unwrapState(snapshot.state || {})));

        // Create cleanup collector for root hooks
        this._cleanups = createCleanupCollector();
        this._pinia = createPinia();

        // Create the root livue helper with opaque snapshot string
        // IMPORTANT: Must be created BEFORE processTemplate so refs can be registered
        let helperResult = createLivueHelper(this.componentId, this.state, this.memo, rootComponentRef, rootServerState, snapshotJson, {
            el: this.el,
            rootComponent: this,
            isChild: false,
            parentLivue: null,
            cleanups: this._cleanups,
            initialHtml: this.el.innerHTML,
            pinia: this._pinia,
        });
        let livue = helperResult.livue;
        let rootComposables = helperResult.composables;
        this._rootLivue = livue;
        this._rootComposables = rootComposables;
        this._rootState = this.state; // For #[Modelable] two-way binding

        // Trigger component.init hook for root
        trigger('component.init', {
            component: { id: this.componentId, name: this.name, state: this.state, livue: livue },
            el: this.el,
            cleanup: this._cleanups.cleanup,
            isChild: false,
        });

        // Extract nested children and transform the template
        // Now _rootLivue is set, so child refs will be properly registered
        let processed;
        try {
            processed = processTemplate(this.el.innerHTML, this);
        } catch (e) {
            console.error('[LiVue] Error processing initial template:', e);
            processed = { template: this.el.innerHTML, childDefs: {} };
        }

        // Populate initial validation errors from snapshot memo (e.g., after SPA navigate)
        let initialErrors = (snapshot.memo && snapshot.memo.errors) || null;
        if (initialErrors) {
            setErrors(livue.errors, initialErrors);
        }

        // Register event listeners declared via $listeners on the root PHP component
        let rootListeners = (snapshot.memo && snapshot.memo.listeners) || null;
        if (rootListeners) {
            for (let eventName in rootListeners) {
                (function (method, rootLivue, compName, compId) {
                    on(eventName, compName, compId, function (data) {
                        rootLivue.call(method, data);
                    });
                })(rootListeners[eventName], livue, self.name, self.componentId);
            }
        }

        // Subscribe to Laravel Echo channels (broadcast events)
        let echoConfig = (snapshot.memo && snapshot.memo.echo) || null;
        if (echoConfig && echoConfig.length) {
            this._echoUnsubscribe = subscribeEcho(self.componentId, echoConfig, function (method, data) {
                livue.call(method, data);
            });
        }

        // Create root component definition (plugin composables merged, PHP composables take precedence)
        let mergedComposables = Object.assign({}, getPluginComposables(), rootComposables);
        let rootDef = buildComponentDef(processed.template, self.state, livue, mergedComposables, self._versions, self.name);

        this._currentRootDef = rootDef;
        this._rootDefRef = shallowRef(rootDef);

        // Create the Vue app — a thin shell that delegates to the root
        // component via <component :is>. This allows the root's template
        // to be swapped without unmounting the entire Vue app.
        this.vueApp = createApp({
            setup: function () {
                return {
                    rootDef: self._rootDefRef,
                };
            },
            template: '<component :is="rootDef"></component>',
        });

        // Register all child component definitions in the same app
        // Only register if not already registered to avoid Vue warnings
        let tagName;
        for (tagName in processed.childDefs) {
            if (!this.vueApp._context.components[tagName]) {
                this.vueApp.component(tagName, processed.childDefs[tagName]);
            }
        }

        // Register the livue-lazy component for lazy loading child components
        if (!this.vueApp._context.components['livue-lazy']) {
            this.vueApp.component('livue-lazy', createLazyComponent(this));
        }

        // Apply plugins to Vue app:
        // 1. Install Pinia (LiVue uses it internally for state management)
        // 2. Apply user's setup callback (for Vuetify, custom plugins, etc.)
        // 3. Mount the app
        this._applyPluginsAndMount();
    }

    /**
     * Apply plugins and mount the Vue app.
     * Called once during _mount(), after createApp() and child registration.
     *
     * Order:
     * 1. Install Pinia (required internally by LiVue)
     * 2. Call LiVue.setup() callback if defined (user plugins like Vuetify)
     * 3. Register built-in LiVue directives (v-click, v-loading, etc.)
     * 4. Mount the Vue app
     *
     * @private
     */
    async _applyPluginsAndMount() {
        let self = this;
        let app = this.vueApp;

        // 1. Install Pinia (LiVue uses it internally)
        let piniaInstance = this._pinia || createPinia();
        app.use(piniaInstance);

        // 2. Apply user's setup callbacks AFTER Pinia
        // This allows users to add Vuetify, custom components, directives, etc.
        // Multiple callbacks are supported (accumulated via LiVue.setup())
        if (window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0) {
            for (let i = 0; i < window.LiVue._setupCallbacks.length; i++) {
                try {
                    let result = window.LiVue._setupCallbacks[i](app);
                    // Support async setup callbacks
                    if (result && typeof result.then === 'function') {
                        await result;
                    }
                } catch (error) {
                    console.error('[LiVue] Error in setup() callback:', error);
                }
            }
        }

        // 3. Register built-in LiVue directives
        let directives = getBuiltInDirectives();
        for (let i = 0; i < directives.length; i++) {
            app.directive(directives[i].name, directives[i].directive);
        }

        // 4. Register plugin directives
        let pluginDirectives = getPluginDirectives();
        for (let i = 0; i < pluginDirectives.length; i++) {
            app.directive(pluginDirectives[i].name, pluginDirectives[i].directive);
        }

        // 5. Mount the Vue app
        self.el.innerHTML = '';
        try {
            self.vueApp.mount(self.el);
        } catch (e) {
            console.error('[LiVue] Vue app mount failed:', e);
        }
    }

    /**
     * Destroy the Vue app instance and clean up event listeners.
     */
    destroy() {
        // Trigger component.destroy hook for all children first
        for (let id in this._childRegistry) {
            let child = this._childRegistry[id];

            // Trigger component.destroy hook for child
            trigger('component.destroy', {
                component: { id: id, name: child.name, state: child.state, livue: child.livue },
                isChild: true,
            });

            // Run child cleanup functions from hooks
            if (child.livue && child.livue._cleanups) {
                child.livue._cleanups.runCleanups();
            }

            removeByComponentId(id);
            clearModifiers(id);
            removeComponentErrorHandler(id);

            // Unregister children from TabSync
            if (child && child.memo && child.memo.tabSync && child.memo.tabSync.enabled) {
                unregisterTabSync(child.name);
            }

            // Unsubscribe children from Laravel Echo
            unsubscribeEcho(id);
        }

        // Trigger component.destroy hook for root
        trigger('component.destroy', {
            component: { id: this.componentId, name: this.name, state: this.state, livue: this._rootLivue },
            isChild: false,
        });

        // Run root cleanup functions from hooks
        if (this._cleanups) {
            this._cleanups.runCleanups();
        }

        // Remove event listeners for root component
        removeByComponentId(this.componentId);

        // Clean up debounce/throttle modifiers for root component
        clearModifiers(this.componentId);

        // Remove component error handler
        removeComponentErrorHandler(this.componentId);

        // Unregister from TabSync if enabled
        if (this.memo && this.memo.tabSync && this.memo.tabSync.enabled) {
            unregisterTabSync(this.name);
        }

        // Unsubscribe from Laravel Echo
        if (this._echoUnsubscribe) {
            this._echoUnsubscribe();
            this._echoUnsubscribe = null;
        }
        unsubscribeEcho(this.componentId);

        if (this.vueApp) {
            try {
                this.vueApp.unmount();
            } catch (e) {
                // Ignore errors during unmount (e.g. Vue devtools hooks
                // accessing appContext.app after teardown during SPA navigation)
            }
            this.vueApp = null;
        }
    }

    /**
     * Move sibling <script type="application/livue-setup"> elements inside the
     * component element. In Blade templates, @script blocks render after the root
     * element's closing tag, placing them as DOM siblings rather than children.
     * Since the runtime reads el.innerHTML for template processing, these siblings
     * would be missed. Moving them inside ensures they are captured.
     */
    _absorbSetupScripts() {
        let sibling = this.el.nextElementSibling;
        while (sibling) {
            let next = sibling.nextElementSibling;
            if (sibling.tagName === 'SCRIPT' && sibling.getAttribute('type') === 'application/livue-setup') {
                this.el.appendChild(sibling);
            } else {
                break;
            }
            sibling = next;
        }
    }
}
