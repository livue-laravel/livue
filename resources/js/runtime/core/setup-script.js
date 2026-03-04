/**
 * Support for <script type="application/livue-setup"> blocks.
 *
 * Allows users to write Vue Composition API code inside Blade templates
 * via @script / @endscript directives. The code is extracted, compiled
 * at runtime, and executed within the Vue setup() context.
 */

import {
    ref, computed, watch, watchEffect, reactive, readonly,
    onMounted, onUnmounted, onBeforeMount, onBeforeUnmount,
    nextTick, provide, inject,
} from 'vue';
import { stateToRefs } from './state.js';
import { createOrUseStore, useRegisteredStore } from './store-helper.js';

/**
 * Vue Composition APIs available inside @script blocks.
 */
let _vueApis = {
    ref: ref,
    computed: computed,
    watch: watch,
    watchEffect: watchEffect,
    reactive: reactive,
    readonly: readonly,
    onMounted: onMounted,
    onUnmounted: onUnmounted,
    onBeforeMount: onBeforeMount,
    onBeforeUnmount: onBeforeUnmount,
    nextTick: nextTick,
    provide: provide,
    inject: inject,
};

let _vueApiNames = Object.keys(_vueApis);
let _vueApiValues = _vueApiNames.map(function (k) { return _vueApis[k]; });

/**
 * Extract a <script type="application/livue-setup"> block from an HTML string.
 * Returns the cleaned HTML and the setup code (or null).
 *
 * Supports optional inner <script> tags for IDE support. Users can write:
 *   @script
 *   <script>
 *   // code with full IDE support (highlighting, autocomplete, etc.)
 *   </script>
 *   @endscript
 *
 * The inner <script> tags are automatically stripped.
 *
 * @param {string} html
 * @returns {{ html: string, setupCode: string|null }}
 */
export function extractSetupScript(html) {
    let regex = /<script\s+type="application\/livue-setup"[^>]*>([\s\S]*?)<\/script>/g;
    let matches = Array.from(html.matchAll(regex));

    if (matches.length === 0) {
        return { html: html, setupCode: null };
    }

    function stripInnerTags(code) {
        code = code.replace(/^<script[^>]*>\s*/i, '');
        code = code.replace(/\s*<\/script>$/i, '');
        return code.trim();
    }

    let cleanedHtml = html;
    for (var i = matches.length - 1; i >= 0; i--) {
        cleanedHtml = cleanedHtml.replace(matches[i][0], '');
    }

    if (matches.length === 1) {
        return {
            html: cleanedHtml,
            setupCode: stripInnerTags(matches[0][1].trim()),
        };
    }

    // Multiple setup blocks: wrap each in an IIFE and merge their return values.
    // Each block can define its own refs, computed, watchers, etc. and return bindings.
    var parts = matches.map(function (m) {
        return stripInnerTags(m[1].trim());
    });

    var mergedCode = 'var __setupResult = {};\n' +
        parts.map(function (block) {
            return 'Object.assign(__setupResult, (function() {\n' + block + '\n})() || {});';
        }).join('\n') +
        '\nreturn __setupResult;';

    return {
        html: cleanedHtml,
        setupCode: mergedCode,
    };
}

/**
 * Execute user-provided @script setup code within the Vue setup context.
 * The code receives Vue Composition APIs, server state refs, the livue helper,
 * and quick Pinia helpers `store(name, definition, options?)` and `useStore(name)`.
 * It must return an object with additional template bindings.
 *
 * @param {string} code - The JS code from the @script block
 * @param {object} stateRefs - Result of stateToRefs(state)
 * @param {object} livue - The livue helper
 * @param {Function} store - Quick helper for creating/using Pinia stores in @script
 * @param {Function} useStore - Get a pre-registered PHP-defined Pinia store
 * @returns {object|null} Additional bindings to merge into setup return
 */
export function executeSetupCode(code, stateRefs, livue) {
    let stateKeys = Object.keys(stateRefs);
    let stateValues = stateKeys.map(function (k) { return stateRefs[k]; });

    function store(name, definition, options) {
        let componentId = livue && livue.$id ? livue.$id : '';

        if (definition === undefined) {
            let existing = useRegisteredStore(componentId, name, options || {});
            if (existing) {
                return existing;
            }
            throw new Error('[LiVue] store(name): store not found. Provide a definition or register it in PHP.');
        }

        return createOrUseStore(componentId, name, definition, options);
    }

    function useStore(name) {
        let componentId = livue && livue.$id ? livue.$id : '';
        let existing = useRegisteredStore(componentId, name, { scope: 'auto' });

        if (!existing) {
            throw new Error('[LiVue] useStore("' + name + '"): store not found.');
        }

        return existing;
    }

    let paramNames = _vueApiNames.concat(stateKeys).concat(['livue', 'store', 'useStore']);
    let paramValues = _vueApiValues.concat(stateValues).concat([livue, store, useStore]);

    try {
        let fn = new (Function.prototype.bind.apply(
            Function,
            [null].concat(paramNames).concat([code])
        ))();
        let result = fn.apply(null, paramValues);
        return (result && typeof result === 'object') ? result : null;
    } catch (e) {
        console.error('[LiVue] Error executing @script setup code:', e);
        return null;
    }
}
