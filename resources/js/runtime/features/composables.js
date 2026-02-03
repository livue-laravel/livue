/**
 * PHP Composables support for LiVue JavaScript runtime.
 *
 * Composables are trait methods on PHP components that return arrays of
 * data and actions. This module handles:
 * - Unwrapping synthesized composable data from the server
 * - Creating reactive Vue objects for each composable namespace
 * - Wrapping composable actions as callable methods
 * - Updating composable data on server responses
 */

import { reactive } from 'vue';

/**
 * Check if a value is a synthesizer tuple [value, {s: '...'}].
 * @param {*} val
 * @returns {boolean}
 */
function isTuple(val) {
    return Array.isArray(val)
        && val.length === 2
        && val[1] !== null
        && typeof val[1] === 'object'
        && 's' in val[1];
}

/**
 * Unwrap synthesized values in composable data.
 * Converts [value, {s: 'mdl', ...}] tuples to plain values.
 * @param {object} data - Composable data with potential tuples
 * @returns {object} Plain unwrapped data
 */
function unwrapComposableData(data) {
    let result = {};

    for (let key in data) {
        let val = data[key];

        if (isTuple(val)) {
            result[key] = val[0];
        } else if (val && typeof val === 'object' && !Array.isArray(val)) {
            // Recursively unwrap nested objects
            result[key] = unwrapComposableData(val);
        } else {
            result[key] = val;
        }
    }

    return result;
}

/**
 * Create reactive composable objects from memo data.
 *
 * Returns an object where each key is a composable namespace (auth, cart, etc.)
 * with reactive data and methods wrapped to call the server.
 *
 * @param {object} memo - Component memo containing composables and composableActions
 * @param {Function} callFn - Function to call server methods (livue.call)
 * @returns {object} Object with reactive composable namespaces
 */
export function createComposables(memo, callFn) {
    let composablesData = memo.composables || {};
    let composableActions = memo.composableActions || {};
    let result = {};

    // Get all unique namespaces from both data and actions
    let namespaces = new Set([
        ...Object.keys(composablesData),
        ...Object.keys(composableActions),
    ]);

    for (let namespace of namespaces) {
        let data = composablesData[namespace] || {};
        let actions = composableActions[namespace] || {};

        // Unwrap synthesized values
        let unwrappedData = unwrapComposableData(data);

        // Create methods for each action
        let methods = {};
        for (let action in actions) {
            // Create a method that calls the server
            methods[action] = (function (ns, act) {
                return function () {
                    let args = Array.prototype.slice.call(arguments);
                    return callFn(ns + '.' + act, args);
                };
            })(namespace, action);
        }

        // Combine data and methods into a reactive object
        result[namespace] = reactive(Object.assign({}, unwrappedData, methods));
    }

    return result;
}

/**
 * Update composable data from a new server response.
 *
 * This updates existing reactive composable objects in place,
 * preserving Vue reactivity while updating values.
 *
 * @param {object} composables - Existing reactive composable objects
 * @param {object} newMemo - New memo from server response
 */
export function updateComposables(composables, newMemo) {
    let newData = newMemo.composables || {};
    let newActions = newMemo.composableActions || {};

    // Update existing namespaces with new data
    for (let namespace in newData) {
        let unwrapped = unwrapComposableData(newData[namespace]);

        if (composables[namespace]) {
            // Update existing reactive object in place
            for (let key in unwrapped) {
                // Only update data properties, not action methods
                if (typeof composables[namespace][key] !== 'function') {
                    composables[namespace][key] = unwrapped[key];
                }
            }
        }
    }

    // Note: We don't need to update action methods because they're
    // just wrappers around callFn, which doesn't change.
}

/**
 * Check if a memo contains composable data.
 * @param {object} memo
 * @returns {boolean}
 */
export function hasComposables(memo) {
    return (memo.composables && Object.keys(memo.composables).length > 0)
        || (memo.composableActions && Object.keys(memo.composableActions).length > 0);
}
