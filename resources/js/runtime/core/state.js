/**
 * State management utilities for LiVue.
 */

import { reactive, toRefs } from 'vue';

/**
 * JSON.stringify replacer that converts arrays with non-numeric keys to objects.
 * Prevents data loss when arrays are used as objects (e.g., via v-model dot-notation).
 */
function arrayAwareReplacer(key, value) {
    if (Array.isArray(value)) {
        let keys = Object.keys(value);
        let hasNonNumeric = false;

        for (let i = 0; i < keys.length; i++) {
            if (isNaN(Number(keys[i]))) {
                hasNonNumeric = true;
                break;
            }
        }

        if (hasNonNumeric) {
            let obj = {};
            for (let i = 0; i < keys.length; i++) {
                obj[keys[i]] = value[keys[i]];
            }
            return obj;
        }
    }

    return value;
}

/**
 * Stringify a value preserving non-numeric keys on arrays.
 *
 * @param {*} value
 * @returns {string}
 */
function safeStringify(value) {
    return JSON.stringify(value, arrayAwareReplacer);
}

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
        let oldJson = safeStringify(reactiveState[key]);
        let newJson = safeStringify(newState[key]);

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
 * Uses a custom replacer to handle arrays that have non-numeric keys.
 * This happens when Vue's v-model with dot-notation paths (e.g., v-model="data.email")
 * sets string-keyed properties on arrays. JSON.stringify normally ignores non-numeric
 * array keys, so we convert such arrays to plain objects to preserve the values.
 *
 * @param {object} reactiveState
 * @returns {object}
 */
export function serializeState(reactiveState) {
    return JSON.parse(JSON.stringify(reactiveState, arrayAwareReplacer));
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

/**
 * Get a value from a reactive state using dot notation.
 * Supports nested paths like "data.avatar" or "form.user.name".
 *
 * @param {object} state - Reactive state object
 * @param {string} path - Dot-separated path (e.g., "data.avatar")
 * @returns {*} The value at the path, or undefined if not found
 */
export function getByPath(state, path) {
    if (!path || typeof path !== 'string') {
        return undefined;
    }

    let parts = path.split('.');
    let current = state;

    for (let i = 0; i < parts.length; i++) {
        if (current === null || current === undefined) {
            return undefined;
        }
        current = current[parts[i]];
    }

    return current;
}

/**
 * Set a value in a reactive state using dot notation.
 * Creates intermediate objects/arrays as needed.
 * Supports nested paths like "data.avatar" or "form.user.name".
 *
 * For Vue 3 reactivity to work properly with nested paths, we need to
 * reassign the top-level property to ensure the Proxy tracks the change.
 *
 * @param {object} state - Reactive state object
 * @param {string} path - Dot-separated path (e.g., "data.avatar")
 * @param {*} value - The value to set
 */
export function setByPath(state, path, value) {
    if (!path || typeof path !== 'string') {
        return;
    }

    let parts = path.split('.');

    // Simple case: single level path (e.g., "avatar")
    if (parts.length === 1) {
        state[parts[0]] = value;
        return;
    }

    // For nested paths, we need to clone and reassign to trigger reactivity
    let topKey = parts[0];
    let topValue = state[topKey];

    // Deep clone the top-level value to ensure reactivity
    let cloned = JSON.parse(JSON.stringify(topValue !== null && topValue !== undefined ? topValue : {}));

    // If cloned is an array but we're setting a string-keyed property, convert to object.
    // Arrays lose string-keyed properties during JSON serialization (JSON.stringify([])
    // ignores non-numeric keys), so we must use a plain object instead.
    if (Array.isArray(cloned) && isNaN(Number(parts[1]))) {
        cloned = Object.assign({}, cloned);
    }

    // Navigate to the parent of the target
    let current = cloned;
    for (let i = 1; i < parts.length - 1; i++) {
        let part = parts[i];
        if (current[part] === null || current[part] === undefined) {
            current[part] = {};
        }
        // Same array-to-object conversion for intermediate values
        if (Array.isArray(current[part]) && i + 1 < parts.length && isNaN(Number(parts[i + 1]))) {
            current[part] = Object.assign({}, current[part]);
        }
        current = current[part];
    }

    // Set the final value
    let lastPart = parts[parts.length - 1];
    current[lastPart] = value;

    // Reassign the top-level property to trigger Vue reactivity
    state[topKey] = cloned;
}
