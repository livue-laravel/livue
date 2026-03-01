/**
 * Inline tuple utilities for LiVue state management.
 *
 * Synthesized properties (models, enums, Carbon, collections) are
 * stored as inline tuples [value, {s: 'type', ...}] within the state.
 * These utilities unwrap tuples for Vue reactivity and compute diffs.
 */

import { serializeState } from './state.js';

/**
 * Compute the diff between the server-confirmed state and the current
 * reactive state. Only includes keys whose serialized values differ.
 *
 * @param {object} serverState - Plain object (last acknowledged by server)
 * @param {object} currentState - Reactive Vue state
 * @returns {object} Keys that changed with their new values
 */
export function computeDiffs(serverState, currentState) {
    let diffs = {};
    let current = serializeState(currentState);

    for (let key in current) {
        if (JSON.stringify(current[key]) !== JSON.stringify(serverState[key])) {
            diffs[key] = current[key];
        }
    }

    return diffs;
}

/**
 * Check if a value is a synthesizer inline tuple [value, {s: '...'}].
 *
 * @param {*} val
 * @returns {boolean}
 */
export function isTuple(val) {
    return Array.isArray(val) && val.length === 2
        && val[1] && typeof val[1] === 'object' && !Array.isArray(val[1])
        && val[1].s;
}

/**
 * Recursively unwrap inline tuples from a value.
 * Handles tuples nested at any depth within objects and arrays.
 *
 * @param {*} value - Value that may contain inline tuples
 * @returns {*} Value with all tuples unwrapped
 */
export function unwrapDeep(value) {
    if (isTuple(value)) {
        return value[0];
    }
    if (Array.isArray(value)) {
        return value.map(unwrapDeep);
    }
    if (value && typeof value === 'object') {
        let result = {};
        for (let key in value) {
            result[key] = unwrapDeep(value[key]);
        }
        return result;
    }
    return value;
}

/**
 * Unwrap inline tuples from a state object.
 * Returns a plain object with the raw values extracted from tuples.
 * Recursively unwraps nested tuples at any depth (e.g., form data
 * containing synthesized values like TemporaryUploadedFile).
 *
 * @param {object} state - State that may contain inline tuples
 * @returns {object} Plain state with unwrapped values
 */
export function unwrapState(state) {
    let flat = {};
    for (let key in state) {
        flat[key] = unwrapDeep(state[key]);
    }
    return flat;
}
