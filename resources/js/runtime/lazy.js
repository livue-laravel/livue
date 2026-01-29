/**
 * Vue component for lazy loading LiVue components.
 *
 * Usage in server-rendered HTML:
 * <livue-lazy :config='{"name":"component-name","props":{},"onLoad":false}'>
 *   placeholder content
 * </livue-lazy>
 *
 * When the element enters the viewport (or on page load if onLoad is true),
 * fetches the full component from the server and renders it in place of the placeholder.
 */

import {
    ref, shallowRef, onMounted, onUnmounted, h, defineComponent,
} from 'vue';
import { setErrors } from './errors.js';
import { on } from './events.js';
import { poolLazyLoad } from './pool.js';

let _lazyCounter = 0;

/**
 * Unwrap inline tuples from a state object.
 */
function unwrapState(state) {
    let flat = {};
    for (let key in state) {
        let val = state[key];
        if (Array.isArray(val) && val.length === 2 && val[1] && typeof val[1] === 'object' && val[1].s) {
            flat[key] = val[0];
        } else {
            flat[key] = val;
        }
    }
    return flat;
}

/**
 * Create the livue-lazy component definition.
 *
 * @param {object} rootComponent - The LiVueComponent that owns the Vue app
 * @returns {object} Vue component definition
 */
export function createLazyComponent(rootComponent) {
    return defineComponent({
        name: 'LivueLazy',
        props: {
            config: {
                type: Object,
                required: true,
            },
        },
        setup: function (props, ctx) {
            let loaded = ref(false);
            let loadedComponentDef = shallowRef(null);
            let observer = null;
            let wrapperEl = ref(null);

            /**
             * Load the lazy component via pooled request.
             * Multiple lazy loads within the same microtask are batched together.
             */
            async function loadComponent() {
                if (loaded.value) return;

                try {
                    let data = await poolLazyLoad({
                        component: props.config.name,
                        props: props.config.props || {},
                    });

                    if (data.html && data.snapshot) {
                        mountLoadedContent(data);
                    }
                } catch (err) {
                    console.error('[LiVue] Lazy load failed:', err);
                }
            }

            /**
             * Mount the loaded content as a Vue component.
             */
            function mountLoadedContent(data) {
                // Parse snapshot
                let snapshot = JSON.parse(data.snapshot);
                _lazyCounter++;
                let componentId = 'lazy-' + _lazyCounter + '-' + Date.now();
                let name = snapshot.memo ? snapshot.memo.name : '';
                let initialState = unwrapState(snapshot.state || {});
                let memo = snapshot.memo || {};

                // Get helpers from root component
                let { createLivueHelper, buildComponentDef, processTemplate, createReactiveState } = rootComponent._lazyHelpers;

                // Create reactive state
                let childState = createReactiveState(initialState);
                let childServerState = JSON.parse(JSON.stringify(initialState));

                // Create component ref
                let childComponentRef = { _updateTemplate: null };

                // Create livue helper
                let livue = createLivueHelper(
                    componentId,
                    childState,
                    memo,
                    childComponentRef,
                    childServerState,
                    data.snapshot
                );

                // Set initial errors
                if (memo.errors) {
                    setErrors(livue.errors, memo.errors);
                }

                // Generate unique tag name
                let tagName = 'livue-lazy-child-' + _lazyCounter;

                // Process the HTML for nested children
                let processed = processTemplate(data.html, rootComponent);

                // Build wrapper template
                let template = '<div data-livue-id="' + componentId + '">' + processed.template + '</div>';

                // Create component definition
                let componentDef = buildComponentDef(template, childState, livue, rootComponent._versions, name);

                // Register child in the registry
                rootComponent._childRegistry[componentId] = {
                    tagName: tagName,
                    state: childState,
                    memo: memo,
                    livue: livue,
                    componentRef: childComponentRef,
                    name: name,
                    id: componentId,
                };

                // Set up template update function
                childComponentRef._updateTemplate = function (newInnerHtml) {
                    let childProcessed = processTemplate(newInnerHtml, rootComponent);
                    let newTemplate = '<div data-livue-id="' + componentId + '">' + childProcessed.template + '</div>';

                    // Register any nested children (only if not already registered)
                    for (let ct in childProcessed.childDefs) {
                        if (!rootComponent.vueApp._context.components[ct]) {
                            rootComponent.vueApp.component(ct, childProcessed.childDefs[ct]);
                        }
                    }

                    // Build the new component definition
                    let newComponentDef = buildComponentDef(newTemplate, childState, livue, rootComponent._versions, name);

                    // Update component definition directly to avoid "already registered" warning
                    rootComponent.vueApp._context.components[tagName] = newComponentDef;
                    rootComponent._versions[tagName] = (rootComponent._versions[tagName] || 0) + 1;

                    // Update the shallowRef so Vue re-renders the lazy wrapper
                    loadedComponentDef.value = newComponentDef;
                };

                // Register event listeners
                let listeners = memo.listeners || null;
                if (listeners) {
                    for (let eventName in listeners) {
                        (function (method, childLivue) {
                            on(eventName, name, componentId, function (eventData) {
                                childLivue.call(method, eventData);
                            });
                        })(listeners[eventName], livue);
                    }
                }

                // Register any nested children in the app
                // Only register if not already registered to avoid Vue warnings
                for (let ct in processed.childDefs) {
                    if (!rootComponent.vueApp._context.components[ct]) {
                        rootComponent.vueApp.component(ct, processed.childDefs[ct]);
                    }
                }

                // Initialize version
                rootComponent._versions[tagName] = 0;

                // Register the component in the Vue app
                // Only register if not already registered to avoid Vue warnings
                if (!rootComponent.vueApp._context.components[tagName]) {
                    rootComponent.vueApp.component(tagName, componentDef);
                }

                // Store the component definition and mark as loaded
                loadedComponentDef.value = componentDef;
                loaded.value = true;
            }

            onMounted(function () {
                if (props.config.onLoad) {
                    // Load immediately after mount (deferred)
                    requestAnimationFrame(function () {
                        loadComponent();
                    });
                } else {
                    // Use IntersectionObserver
                    observer = new IntersectionObserver(function (entries) {
                        if (entries[0].isIntersecting) {
                            observer.disconnect();
                            observer = null;
                            loadComponent();
                        }
                    }, { rootMargin: '50px' });

                    if (wrapperEl.value) {
                        observer.observe(wrapperEl.value);
                    }
                }
            });

            onUnmounted(function () {
                if (observer) {
                    observer.disconnect();
                    observer = null;
                }
            });

            return function () {
                if (loaded.value && loadedComponentDef.value) {
                    // Render the loaded component
                    return h(loadedComponentDef.value);
                } else {
                    // Render placeholder (slot content wrapped in a div for the observer)
                    return h('div', { ref: wrapperEl }, ctx.slots.default ? ctx.slots.default() : null);
                }
            };
        },
    });
}
