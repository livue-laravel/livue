/**
 * AJAX communication layer for LiVue.
 * Delegates to the request pool for automatic batching.
 */

import { poolRequest } from './pool.js';

/**
 * Send an action to the server (via request pool).
 *
 * Multiple calls within the same microtask are automatically
 * batched into a single HTTP request. Isolated components
 * bypass the pool and send immediately.
 *
 * @param {object} snapshot - Current snapshot { state, memo } with server-confirmed state
 * @param {string|null} method - The method to call (null for state sync only)
 * @param {Array} params - Parameters to pass to the method
 * @param {object} diffs - Properties changed client-side (v-model) since last server response
 * @param {boolean} [isolate] - If true, bypass the pool and send immediately
 * @returns {Promise<object>} The server response with updated snapshot
 */
export async function sendAction(snapshot, method, params, diffs, isolate) {
    return poolRequest({
        snapshot: snapshot,
        diffs: diffs || {},
        method: method,
        params: params || [],
        isolate: isolate || false,
    });
}
