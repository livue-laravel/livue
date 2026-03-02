/**
 * Template compilation and Vue component definition builder.
 *
 * Handles v-model modifier transformation, block tree stripping,
 * and the construction of Vue component definitions with optional
 * @script setup code support.
 */

import * as Vue from 'vue';
import { shallowRef } from 'vue';
import { stateToRefs } from './state.js';
import { extractSetupScript, executeSetupCode } from './setup-script.js';

/**
 * Transform v-model with custom LiVue modifiers into v-model + separate directives.
 *
 * This allows users to write:
 *   <input v-model.debounce.500ms="search">
 *   <v-text-field v-model.debounce.500ms="search">
 *
 * Which gets transformed to:
 *   <input v-model="search" v-debounce:search.500ms>
 *   <v-text-field v-model="search" v-debounce:search.500ms>
 *
 * This way Vue's native v-model handles the binding (works with all components),
 * and our custom directives handle the modifier behavior.
 *
 * @param {string} html - Template HTML
 * @returns {string} - Transformed HTML
 */
export function transformVModelModifiers(html) {
    // Transform v-model.debounce.Xms="prop" -> v-model="prop" v-debounce:prop.Xms
    let debouncePattern = /v-model\.debounce(?:\.(\d+)(ms)?)?=["']([^"']+)["']/g;
    html = html.replace(debouncePattern, function (match, timing, msUnit, propName) {
        let modifiers = timing ? '.' + timing + (msUnit || 'ms') : '';
        return 'v-model="' + propName + '" v-debounce:' + propName + modifiers;
    });

    // Transform v-model.throttle.Xms="prop" -> v-model="prop" v-throttle:prop.Xms
    let throttlePattern = /v-model\.throttle(?:\.(\d+)(ms)?)?=["']([^"']+)["']/g;
    html = html.replace(throttlePattern, function (match, timing, msUnit, propName) {
        let modifiers = timing ? '.' + timing + (msUnit || 'ms') : '';
        return 'v-model="' + propName + '" v-throttle:' + propName + modifiers;
    });

    // Transform v-model.blur="prop" -> v-model="prop" v-blur:prop
    let blurPattern = /v-model\.blur=["']([^"']+)["']/g;
    html = html.replace(blurPattern, function (match, propName) {
        return 'v-model="' + propName + '" v-blur:' + propName;
    });

    // Transform v-model.enter="prop" -> v-model="prop" v-enter:prop
    let enterPattern = /v-model\.enter=["']([^"']+)["']/g;
    html = html.replace(enterPattern, function (match, propName) {
        return 'v-model="' + propName + '" v-enter:' + propName;
    });

    return html;
}

/**
 * Transform $errors magic variable into livue.errors for template access.
 *
 * Vue's PublicInstanceProxyHandlers.get skips setupState for $-prefixed keys,
 * so $errors can never be resolved through our setup Proxy. By rewriting
 * $errors to livue.errors before Vue.compile(), the compiled render function
 * accesses livue (a normal setupState key) and then .errors on it — no $ prefix,
 * no Vue bypass.
 *
 * @param {string} html - Template HTML
 * @returns {string} - Transformed HTML
 */
export function transformMagicVariables(html) {
    return html.replace(/\$errors\b/g, 'livue.errors');
}

/**
 * Recursively strip dynamicChildren from a VNode tree.
 * Called after a render function swap to disable Vue's block tree optimization
 * for one render cycle. Without this, Vue's patchBlockChildren would try to
 * diff the old block tree (from the previous render function) against the new
 * one (from the swapped render function), causing crashes when the dynamic
 * node counts or types don't match.
 *
 * @param {object} vnode - A Vue VNode
 */
function stripBlockTree(vnode) {
    if (!vnode || typeof vnode !== 'object') return;
    vnode.dynamicChildren = null;
    if (Array.isArray(vnode.children)) {
        for (let i = 0; i < vnode.children.length; i++) {
            stripBlockTree(vnode.children[i]);
        }
    }
}

/**
 * Build a Vue component definition with optional @script setup code.
 * Extracts the setup script from the template HTML, strips it, and
 * creates a definition whose setup() merges server state, livue helper,
 * and any user-defined bindings from the @script block.
 *
 * @param {string} templateHtml - The component template (may contain <script type="application/livue-setup">)
 * @param {object} state - Reactive state object
 * @param {object} livue - The livue helper
 * @param {object} composables - Composable objects to expose at top level (auth, cart, etc.)
 * @param {object} versions - Reactive version counters for child key-swapping
 * @param {string} [name] - Component name for Vue DevTools
 * @returns {{ name: string, render: function, setup: function, _updateRender: function }}
 */
export function buildComponentDef(templateHtml, state, livue, composables, versions, name) {
    // Transform v-model.debounce etc. into v-model + v-debounce directive
    let transformedHtml = transformVModelModifiers(templateHtml);
    transformedHtml = transformMagicVariables(transformedHtml);
    let extracted = extractSetupScript(transformedHtml);

    // Compile template with Vue.compile() (has internal cache for template strings)
    let compiledRender = Vue.compile(extracted.html);
    let currentRenderRef = shallowRef(compiledRender);
    let renderCache = [];

    // Render wrapper: reads currentRenderRef.value inside the effect -> reactive dependency.
    // Always strips dynamicChildren to disable Vue's block tree optimization.
    // This is necessary because after a render function swap, the block tree structure
    // differs from the previous render, causing patchBlockChildren to crash when
    // dynamicChildren arrays don't match. Stripping on every render (not just after
    // swaps) is required because: if render N strips but render N+1 doesn't, Vue would
    // see n1 (from N) without dynamicChildren and n2 (from N+1) WITH dynamicChildren,
    // then call patchBlockChildren with null oldChildren -> crash.
    // The performance cost is negligible: Vue still creates optimized VNodes, only the
    // diff step checks all nodes instead of just dynamic ones.
    function wrapperRender(_ctx, _cache) {
        let fn = currentRenderRef.value;
        let vnode = fn(_ctx, renderCache);
        stripBlockTree(vnode);
        return vnode;
    }
    wrapperRender._rc = true; // Crucial: activates installWithProxy for with(_ctx)

    let def = {
        name: name || 'LiVueComponent',
        render: wrapperRender,
        setup: function () {
            // Provide livue helper so child Vue components can inject('livue')
            Vue.provide('livue', livue);

            let refs = stateToRefs(state);
            // Spread composables (auth, cart, etc.) at top level for template access
            let base = Object.assign({}, refs, composables, { livue: livue, livueV: versions });

            if (extracted.setupCode) {
                let extra = executeSetupCode(extracted.setupCode, refs, livue);
                if (extra) {
                    Object.assign(base, extra);
                }
            }

            // Proxy that intercepts unknown properties and returns wrapper functions
            // calling livue.call(). This allows server methods to be called directly
            // in templates: @click="increment(2)" instead of @click="livue.increment(2)"
            var setupBlacklist = {
                // JS internals
                then: 1, toJSON: 1, valueOf: 1, toString: 1, constructor: 1, __proto__: 1,
                // Vue-allowed JS globals (avoids "should not start with _" warning in runtime-compiled templates)
                Infinity: 1, undefined: 1, NaN: 1, isFinite: 1, isNaN: 1, parseFloat: 1, parseInt: 1,
                decodeURI: 1, decodeURIComponent: 1, encodeURI: 1, encodeURIComponent: 1,
                Math: 1, Number: 1, Date: 1, Array: 1, Object: 1, Boolean: 1, String: 1,
                RegExp: 1, Map: 1, Set: 1, JSON: 1, Intl: 1, BigInt: 1, console: 1, Error: 1,
            };

            var serverMethodPattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;
            function isServerMethod(prop) {
                return typeof prop === 'string' && !setupBlacklist[prop] && serverMethodPattern.test(prop);
            }

            return new Proxy(base, {
                get: function (target, prop, receiver) {
                    if (prop in target) return Reflect.get(target, prop, receiver);
                    if (typeof prop === 'symbol') return Reflect.get(target, prop, receiver);
                    if (isServerMethod(prop)) {
                        return function () {
                            return livue.call(prop, ...arguments);
                        };
                    }
                    return undefined;
                },
                getOwnPropertyDescriptor: function (target, prop) {
                    var desc = Object.getOwnPropertyDescriptor(target, prop);
                    if (desc) return desc;
                    if (isServerMethod(prop)) {
                        return { configurable: true, enumerable: false };
                    }
                    return undefined;
                },
                has: function (target, prop) {
                    if (prop in target) return true;
                    if (isServerMethod(prop)) return true;
                    return false;
                },
                set: function (target, prop, value) {
                    target[prop] = value;
                    return true;
                },
                ownKeys: function (target) {
                    return Reflect.ownKeys(target);
                },
            });
        },
    };

    // API to update the template without creating a new def.
    // Vue.compile() caches by template string, so identical strings return the
    // same function reference — the === check skips unnecessary reactive updates.
    def._updateRender = function (newHtml) {
        let newTransformed = transformVModelModifiers(newHtml);
        newTransformed = transformMagicVariables(newTransformed);
        let newExtracted = extractSetupScript(newTransformed);
        let newCompiled = Vue.compile(newExtracted.html);
        if (newCompiled === currentRenderRef.value) return;
        renderCache.length = 0;
        currentRenderRef.value = newCompiled;
    };

    return def;
}
