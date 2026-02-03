/**
 * State management utilities for LiVue.
 */

import { reactive, toRefs } from 'vue';

/**
 * Create a Vue reactive state object from a plain object.
 *
 * @param {object} initialState
 * @returns {object} Reactive state
 */
export function createReactiveState(initialState) {
    return reactive(Object.assign({}, initialState));
}

/**
 * Update an existing reactive state with new values.
 * Adds new keys, updates existing ones, and removes stale keys.
 * Only updates values that have actually changed to avoid unnecessary re-renders.
 *
 * @param {object} reactiveState
 * @param {object} newState
 */
export function updateState(reactiveState, newState) {
    let key;

    for (key in newState) {
        // Only update if the value has actually changed
        // This prevents unnecessary Vue re-renders for identical values
        let oldJson = JSON.stringify(reactiveState[key]);
        let newJson = JSON.stringify(newState[key]);

        if (oldJson !== newJson) {
            reactiveState[key] = newState[key];
        }
    }

    for (key in reactiveState) {
        if (!(key in newState)) {
            delete reactiveState[key];
        }
    }
}

/**
 * Serialize a reactive state to a plain JSON-safe object.
 * Strips Vue reactivity proxies.
 *
 * @param {object} reactiveState
 * @returns {object}
 */
export function serializeState(reactiveState) {
    return JSON.parse(JSON.stringify(reactiveState));
}

/**
 * Convert a reactive object to refs for use in setup() return.
 *
 * @param {object} reactiveState
 * @returns {object}
 */
export function stateToRefs(reactiveState) {
    return toRefs(reactiveState);
}
