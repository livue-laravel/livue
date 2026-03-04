import { defineStore } from 'pinia';
import { unwrapState } from './tuples.js';

let _quickStoreRegistry = new Map();

function resolveScope(options) {
    return options && options.scope === 'global' ? 'global' : 'component';
}

function resolveStoreId(componentId, name, options) {
    let scope = resolveScope(options);
    return scope === 'global' ? name : componentId + ':' + name;
}

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function syncStoreState(store, nextState) {
    if (!store || typeof store !== 'object' || !store.$state || typeof nextState !== 'object' || nextState === null) {
        return;
    }

    let currentKeys = Object.keys(store.$state);
    for (let i = 0; i < currentKeys.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(nextState, currentKeys[i])) {
            delete store.$state[currentKeys[i]];
        }
    }

    store.$patch(clone(nextState));
}

/**
 * Create (or reuse) a Pinia store quickly from LiVue runtime contexts.
 *
 * By default stores are scoped to a component instance id to avoid collisions
 * while developing directly inside @script blocks.
 *
 * @param {string} componentId
 * @param {string} name
 * @param {object|Function} definition
 * @param {object} [options]
 * @param {'component'|'global'} [options.scope='component']
 * @returns {object} Pinia store instance
 */
export function createOrUseStore(componentId, name, definition, options) {
    if (typeof name !== 'string' || name.trim() === '') {
        throw new Error('[LiVue] store(name, definition, options?): "name" must be a non-empty string.');
    }
    if (!definition || (typeof definition !== 'object' && typeof definition !== 'function')) {
        throw new Error('[LiVue] store(name, definition, options?): "definition" must be an object or function.');
    }

    let storeId = resolveStoreId(componentId, name, options);
    let existing = _quickStoreRegistry.get(storeId);

    if (!existing) {
        existing = { useStore: defineStore(storeId, definition), definition: definition };
        _quickStoreRegistry.set(storeId, existing);
    } else if (existing.definition !== definition) {
        console.warn('[LiVue] store("' + storeId + '") is already registered. Reusing the first definition.');
    }

    return existing.useStore();
}

/**
 * Get an already registered store instance.
 * Resolution order (default): component scope first, then global.
 *
 * @returns {object|null}
 */
export function useRegisteredStore(componentId, name, options) {
    if (typeof name !== 'string' || name.trim() === '') {
        throw new Error('[LiVue] useStore(name): "name" must be a non-empty string.');
    }

    let mode = options && options.scope ? options.scope : 'auto';
    let candidateIds = [];

    if (mode === 'component') {
        candidateIds.push(resolveStoreId(componentId, name, { scope: 'component' }));
    } else if (mode === 'global') {
        candidateIds.push(resolveStoreId(componentId, name, { scope: 'global' }));
    } else {
        candidateIds.push(resolveStoreId(componentId, name, { scope: 'component' }));
        candidateIds.push(resolveStoreId(componentId, name, { scope: 'global' }));
    }

    for (let i = 0; i < candidateIds.length; i++) {
        let existing = _quickStoreRegistry.get(candidateIds[i]);
        if (existing) {
            return existing.useStore();
        }
    }

    return null;
}

/**
 * Materialize stores declared in PHP memo.stores.
 *
 * @param {string} componentId
 * @param {Array} stores
 * @returns {object} Map name => store instance
 */
export function registerStoresFromMemo(componentId, stores) {
    let result = {};

    if (!Array.isArray(stores) || stores.length === 0) {
        return result;
    }

    for (let i = 0; i < stores.length; i++) {
        let entry = stores[i];

        if (!entry || typeof entry !== 'object') continue;
        if (typeof entry.name !== 'string' || entry.name.trim() === '') continue;

        let scope = entry.scope === 'global' ? 'global' : 'component';
        let initialState = unwrapState(entry.state || {});
        let existing = useRegisteredStore(componentId, entry.name, { scope: scope });

        if (existing) {
            syncStoreState(existing, initialState);
            result[entry.name] = existing;
            continue;
        }

        let definition = {
            state: function () {
                return clone(initialState);
            },
        };

        let instance = createOrUseStore(componentId, entry.name, definition, { scope: scope });
        result[entry.name] = instance;
    }

    return result;
}

/**
 * Clean up all component-scoped stores for a component id.
 */
export function cleanupComponentStores(componentId) {
    let prefix = componentId + ':';
    let keys = Array.from(_quickStoreRegistry.keys());

    for (let i = 0; i < keys.length; i++) {
        if (keys[i].startsWith(prefix)) {
            _quickStoreRegistry.delete(keys[i]);
        }
    }
}
