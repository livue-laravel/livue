/**
 * Template processor for nested LiVue child components.
 *
 * Processes an HTML string, extracting nested LiVue child components
 * and replacing them with Vue component tags. Handles child registration,
 * reactive prop syncing, event listeners, and template updates.
 */

import { nextTick } from 'vue';
import { createReactiveState } from './state.js';
import { unwrapState } from './tuples.js';
import { nextChildCounter, captureIgnoredContent, restoreIgnoredContent } from './dom-preservation.js';
import { buildComponentDef } from './template-transform.js';
import { createLivueHelper } from './livue-helper.js';
import { setErrors } from '../helpers/errors.js';
import { on } from '../features/events.js';
import { subscribe as subscribeEcho } from '../features/echo.js';
import { trigger, createCleanupCollector } from '../helpers/hooks.js';
import { insertAttributesIntoHtmlRoot } from '../helpers/dom.js';

/**
 * Process an HTML string, extracting nested LiVue child components
 * and replacing them with Vue component tags.
 *
 * Processes deepest children first (bottom-up) so that deeply nested
 * trees are correctly handled: a child's template will already contain
 * the component tags of its own children.
 *
 * Children already in the root's registry keep their existing state
 * and livue helper — only new children get fresh state from the DOM.
 *
 * @param {string} html - The innerHTML of a root or child element
 * @param {LiVueComponent} rootComponent - The root component that owns this Vue app
 * @returns {{ template: string, childDefs: Object }}
 */
export function processTemplate(html, rootComponent) {
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Strip children from v-text and v-html elements.
    // Blade renders initial values as child content for SSR,
    // but Vue's compiler rejects v-text/v-html with children.
    let vTextEls = tempDiv.querySelectorAll('[v-text], [v-html]');
    for (let i = 0; i < vTextEls.length; i++) {
        vTextEls[i].innerHTML = '';
    }

    let childDefs = {};

    // Track which registry entries have been matched during this pass,
    // so duplicate component names are handled by order of appearance.
    let matchedIds = {};

    // Find ALL nested livue components that are NOT islands.
    // Use data-livue-id (with data-livue-snapshot) to identify livue elements.
    // Reverse so we process deepest-first (querySelectorAll returns document order).
    let nested = Array.from(
        tempDiv.querySelectorAll('[data-livue-id][data-livue-snapshot]:not([data-livue-island])')
    ).reverse();

    nested.forEach(function (nestedEl) {
        let id = nestedEl.dataset.livueId;
        let childSnapshotJson = nestedEl.dataset.livueSnapshot || '{}';
        let childSnapshot = JSON.parse(childSnapshotJson);
        let name = childSnapshot.memo ? childSnapshot.memo.name : '';
        let initialState = unwrapState(childSnapshot.state || {});
        let childMemo = childSnapshot.memo || {};
        let childHtml = nestedEl.innerHTML;
        let rootTag = nestedEl.tagName.toLowerCase();

        // Absorb sibling <script type="application/livue-setup"> elements into
        // the child's HTML. @script blocks render after the child's root element,
        // placing them as siblings. We capture them for the child and remove them
        // from the parent's DOM so they don't leak into the parent's template.
        let siblingScript = nestedEl.nextElementSibling;
        while (siblingScript) {
            let next = siblingScript.nextElementSibling;
            if (siblingScript.tagName === 'SCRIPT' && siblingScript.getAttribute('type') === 'application/livue-setup') {
                childHtml += siblingScript.outerHTML;
                siblingScript.parentNode.removeChild(siblingScript);
            } else {
                break;
            }
            siblingScript = next;
        }

        // Check if this child already exists in the registry.
        // First try exact ID match, then fallback to component name.
        // The name fallback is needed because when the server re-renders
        // a parent template, embedded @livue() directives create fresh
        // PHP instances with new random IDs.
        let existing = rootComponent._childRegistry[id];
        if (!existing) {
            for (let regId in rootComponent._childRegistry) {
                let entry = rootComponent._childRegistry[regId];
                if (entry.name === name && !matchedIds[regId]) {
                    existing = entry;
                    break;
                }
            }
        }
        if (existing) {
            matchedIds[existing.id] = true;
            // Update root tag in case it changed
            existing.rootTag = rootTag;

            // Sync #[Reactive] properties from the re-rendered parent snapshot
            let reactiveProps = childMemo.reactive || [];
            if (reactiveProps.length > 0) {
                for (var r = 0; r < reactiveProps.length; r++) {
                    var prop = reactiveProps[r];
                    if (prop in initialState) {
                        existing.state[prop] = initialState[prop];
                    }
                }

                // Update server-side baseline to match the new parent-provided values
                existing.livue._updateServerState(initialState, childSnapshotJson);

                // Re-render child template with the new server-rendered HTML
                // (Blade content like @foreach won't update from Vue state alone)
                if (existing.componentRef && existing.componentRef._updateTemplate) {
                    existing.componentRef._updateTemplate(childHtml);
                }
            }
        }
        let isNew = !existing;

        if (!existing) {
            let counter = nextChildCounter();
            let tagName = 'livue-child-' + counter;

            // Initialize version so the :key binding has a concrete value (0).
            // Without this, livueV[tagName] is undefined -> Vue treats it as no key
            // -> uses positional matching -> structural changes in the parent template
            // (e.g., modal opening) shift positions and cause child recreation.
            rootComponent._versions[tagName] = 0;

            let childState = createReactiveState(initialState);
            // Plain unwrapped copy for diff tracking
            let childServerState = JSON.parse(JSON.stringify(initialState));
            // Pass full memo to the helper (includes vueMethods, urlParams, isolate, reactive, etc.)
            let memo = Object.assign({ name: childMemo.name || name }, childMemo);
            let childComponentRef = { _updateTemplate: null };

            // Create cleanup collector for child hooks
            let childCleanups = createCleanupCollector();

            let helperResult = createLivueHelper(id, childState, memo, childComponentRef, childServerState, childSnapshotJson, {
                el: nestedEl,
                rootComponent: rootComponent,
                isChild: true,
                parentLivue: rootComponent._rootLivue,
                cleanups: childCleanups,
                pinia: rootComponent._pinia || null,
            });
            let livue = helperResult.livue;
            let childComposables = helperResult.composables;

            // Trigger component.init hook for child
            trigger('component.init', {
                component: { id: id, name: name, state: childState, livue: livue },
                el: nestedEl,
                cleanup: childCleanups.cleanup,
                isChild: true,
            });

            // Populate initial validation errors from snapshot memo
            let childErrors = childMemo.errors || null;
            if (childErrors) {
                setErrors(livue.errors, childErrors);
            }

            existing = {
                tagName: tagName,
                state: childState,
                memo: memo,
                livue: livue,
                composables: childComposables,
                componentRef: childComponentRef,
                name: name,
                id: id,
                rootTag: rootTag,
            };

            // Register event listeners declared via $listeners on the PHP component
            let childListeners = childMemo.listeners || null;
            if (childListeners) {
                for (let eventName in childListeners) {
                    (function (method, childLivue) {
                        on(eventName, name, id, function (data) {
                            childLivue.call(method, data);
                        });
                    })(childListeners[eventName], livue);
                }
            }

            // Subscribe to Laravel Echo channels for child component
            let childEchoConfig = childMemo.echo || null;
            if (childEchoConfig && childEchoConfig.length) {
                (function (childId, childLivue) {
                    subscribeEcho(childId, childEchoConfig, function (method, data) {
                        childLivue.call(method, data);
                    });
                })(id, livue);
            }

            // Set up the template update function.
            // When this child receives a server response, re-register its
            // Vue component definition with the new template and bump its
            // version key so Vue re-creates just this component.
            childComponentRef._updateTemplate = function (newInnerHtml) {
                // Capture v-ignore content BEFORE the swap
                let childEl = rootComponent.el.querySelector('[data-livue-id="' + id + '"]');
                if (childEl) {
                    captureIgnoredContent(childEl);
                }

                // Process the new HTML (might contain nested children)
                let childProcessed = processTemplate(newInnerHtml, rootComponent);

                // Wrap in the same rootTag used during initial creation, so the
                // template structure matches: <rootTag data-livue-id="...">content</rootTag>
                // Without this, the initial template has an outer wrapper div but the
                // update template injects data-livue-id directly into the content root,
                // causing a structural mismatch -> Vue recreates all DOM elements -> flicker.
                let newTemplate = insertAttributesIntoHtmlRoot(
                    '<' + existing.rootTag + '>' + childProcessed.template + '</' + existing.rootTag + '>',
                    'data-livue-id="' + id + '"'
                );

                // Guard: abort if the Vue app was destroyed (e.g. SPA navigation)
                if (!rootComponent.vueApp) return;

                // Register any new nested children discovered in the update
                for (let ct in childProcessed.childDefs) {
                    if (!rootComponent.vueApp._context.components[ct]) {
                        rootComponent.vueApp.component(ct, childProcessed.childDefs[ct]);
                    }
                }

                // Update child's render function in place — preserves Vue component
                // instance (and any third-party widgets like charts mounted inside).
                let existingDef = rootComponent.vueApp._context.components[existing.tagName];
                existingDef._updateRender(newTemplate);

                // Restore v-ignore content AFTER Vue updates the DOM
                nextTick(function () {
                    let updatedChildEl = rootComponent.el.querySelector('[data-livue-id="' + id + '"]');
                    if (updatedChildEl) {
                        restoreIgnoredContent(updatedChildEl);
                    }
                });
            };

            rootComponent._childRegistry[id] = existing;
        }

        let tagName = existing.tagName;

        // Register ref for parent-child communication
        // Check for data-livue-ref attribute on the nested element
        let refName = nestedEl.dataset.livueRef;
        if (refName && rootComponent._rootLivue) {
            // Create a proxy object that allows the parent to interact with the child
            rootComponent._rootLivue.refs[refName] = {
                /**
                 * Call a method on the child component.
                 * @param {string} method - Method name
                 * @param {Array} [params] - Parameters to pass
                 * @returns {Promise}
                 */
                call: function (method, params) {
                    return existing.livue.call(method, params || []);
                },
                /**
                 * Set a property on the child component.
                 * @param {string} key - Property name
                 * @param {*} value - Value to set
                 */
                set: function (key, value) {
                    return existing.livue.set(key, value);
                },
                /**
                 * Dispatch an event from the child.
                 * @param {string} event - Event name
                 * @param {*} [data] - Event data
                 */
                dispatch: function (event, data) {
                    return existing.livue.dispatch(event, data);
                },
                /**
                 * Sync the child's state with the server.
                 * @returns {Promise}
                 */
                sync: function () {
                    return existing.livue.sync();
                },
                /**
                 * Access to the child's reactive state (read-only reference).
                 */
                get state() {
                    return existing.state;
                },
                /**
                 * Access to the child's livue helper.
                 */
                get livue() {
                    return existing.livue;
                },
            };
        }

        // Register model binding for two-way parent-child sync (#[Modelable])
        // Check for data-livue-model attribute on the nested element
        let modelProp = nestedEl.dataset.livueModel;
        if (modelProp && rootComponent._rootState) {
            // Listen for $modelUpdate events from this child
            on('$modelUpdate', existing.name, id, function (data) {
                // Update the parent's property with the new value
                if (data && data.value !== undefined) {
                    rootComponent._rootState[modelProp] = data.value;
                }
            });
        }

        // Only add to childDefs if this is a new child (needs initial registration)
        if (isNew) {
            // Use the actual root tag from the server-rendered HTML (e.g., <section>, <header>)
            // and inject data-livue-id into it, instead of wrapping in a spurious <div>
            let childTemplate = insertAttributesIntoHtmlRoot(
                '<' + rootTag + '>' + childHtml + '</' + rootTag + '>',
                'data-livue-id="' + id + '"'
            );
            childDefs[tagName] = buildComponentDef(
                childTemplate,
                existing.state, existing.livue, existing.composables || {}, rootComponent._versions, existing.name
            );
        }

        // Initialize version for this child if needed
        if (rootComponent._versions[tagName] === undefined) {
            rootComponent._versions[tagName] = 0;
        }

        // Replace the nested element with a Vue component tag.
        // The :key binding ties to the reactive version counter so Vue
        // re-creates the component when its template is swapped.
        let placeholder = document.createElement(tagName);
        placeholder.setAttribute(':key', "livueV['" + tagName + "']");
        nestedEl.parentNode.replaceChild(placeholder, nestedEl);
    });

    // Add v-pre to islands so Vue doesn't compile their content
    // in the parent's context. Islands have their own Vue app.
    let islands = tempDiv.querySelectorAll('[data-livue-island]');
    for (let i = 0; i < islands.length; i++) {
        islands[i].setAttribute('v-pre', '');
    }

    return {
        template: tempDiv.innerHTML,
        childDefs: childDefs,
    };
}
