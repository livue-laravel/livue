/**
 * LiVue Streaming Module
 *
 * Handles HTTP streaming requests using fetch with ReadableStream.
 * Processes NDJSON (newline-delimited JSON) chunks from the server.
 */

import { getToken } from '../../helpers/csrf.js';
import { handleSessionExpired } from '../navigation.js';

/**
 * Registry of stream targets.
 * Maps target IDs to DOM elements with v-stream directive.
 *
 * @type {Map<string, { el: HTMLElement, replace: boolean }>}
 */
export const streamTargets = new Map();

/**
 * Current streaming state.
 * Used by components to track streaming status.
 */
export let streamingState = {
    active: false,
    method: null,
    componentId: null,
};

/**
 * Process a single NDJSON line: apply stream chunk, capture final response,
 * or capture the error the server reported.
 *
 * A line that is not JSON is logged and skipped. An error line ends the
 * request: it is thrown once the stream is read, so the caller's catch sees
 * it instead of a silent `null` result.
 *
 * @param {string} line
 * @param {Function} onChunk
 * @param {{ finalResponse: object|null, error: Error|null, unreadable: number }} state - Mutable read state
 */
function processNdjsonLine(line, onChunk, state) {
    if (!line.trim()) return;

    let data;

    try {
        data = JSON.parse(line);
    } catch (parseError) {
        state.unreadable++;
        console.error('[LiVue Stream] Parse error:', parseError, line);

        return;
    }

    if (data && data.stream) {
        applyStreamChunk(data.stream);
        onChunk(data.stream);
    } else if (data && data.error) {
        const error = new Error(data.error);
        error.status = data.status ?? null;
        error.errors = data.errors ?? null;
        state.error = state.error || error;
    } else if (data && data.snapshot) {
        state.finalResponse = data;
    }
}

/**
 * Read an NDJSON response stream to completion.
 *
 * @param {ReadableStreamDefaultReader} reader
 * @param {TextDecoder} decoder
 * @param {Function} onChunk
 * @returns {Promise<object>} Final snapshot response
 * @throws {Error} the server's error line, or a stream that ended without a response
 */
async function readNdjsonStream(reader, decoder, onChunk) {
    let buffer = '';
    const state = { finalResponse: null, error: null, unreadable: 0 };

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
            processNdjsonLine(line, onChunk, state);
        }
    }

    if (buffer.trim()) {
        processNdjsonLine(buffer, onChunk, state);
    }

    if (state.error) {
        throw state.error;
    }

    // The server always ends a stream with the final snapshot or an error
    // line. Ending with neither means the body was not LiVue's at all: a PHP
    // startup warning or an error page sent with status 200 (for instance a
    // request over post_max_size). Returning null would look like success.
    if (!state.finalResponse) {
        throw new Error(state.unreadable > 0
            ? '[LiVue Stream] The server answered with something that is not a LiVue stream'
            : '[LiVue Stream] The server ended the stream without a response');
    }

    return state.finalResponse;
}

/**
 * Send a streaming request to the server.
 *
 * @param {Object} payload - Request payload
 * @param {string} payload.snapshot - Component snapshot JSON string
 * @param {Object} payload.diffs - Client-side state changes
 * @param {string} payload.method - Method to call
 * @param {Array} payload.params - Method parameters
 * @param {Object} callbacks - Callback functions
 * @param {Function} callbacks.onChunk - Called for each stream chunk
 * @param {Function} callbacks.onComplete - Called when streaming completes
 * @param {Function} callbacks.onError - Called on error
 * @param {number} [callbacks.timeout=60000] - Timeout in ms (0 to disable)
 * @returns {Promise<Object>} Final response from server
 */
export async function streamRequest(payload, callbacks = {}) {
    const {
        onChunk = () => {},
        onComplete = () => {},
        onError = () => {},
        timeout = 60000,
    } = callbacks;

    // Update streaming state
    streamingState = {
        active: true,
        method: payload.method,
        componentId: payload.componentId || null,
    };

    const controller = new AbortController();
    let timeoutId = null;

    try {
        if (timeout > 0) {
            timeoutId = setTimeout(() => controller.abort(), timeout);
        }

        const response = await fetch('/livue/stream', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/x-ndjson',
                'X-CSRF-TOKEN': getToken(),
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({
                snapshot: payload.snapshot,
                diffs: payload.diffs || {},
                method: payload.method,
                params: payload.params || [],
            }),
            signal: controller.signal,
        });

        // Session expired / unauthenticated (419 CSRF mismatch or 401 auth):
        // redirect to login instead of surfacing a generic stream error.
        if (response.status === 419 || response.status === 401) {
            handleSessionExpired(response.status);
            return null;
        }

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const finalResponse = await readNdjsonStream(reader, decoder, onChunk);
        onComplete(finalResponse);
        return finalResponse;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('[LiVue Stream] Request timed out');
        }
        onError(error);
        throw error;
    } finally {
        clearTimeout(timeoutId);
        // Reset streaming state
        streamingState = {
            active: false,
            method: null,
            componentId: null,
        };
    }
}

/**
 * Apply a stream chunk to the DOM.
 *
 * @param {Object} chunk - Stream chunk data
 * @param {string} chunk.to - Target element ID
 * @param {string} chunk.content - Content to apply
 * @param {boolean} chunk.replace - Replace or append
 */
export function applyStreamChunk(chunk) {
    const { to, content, replace } = chunk;

    let target = streamTargets.get(to);

    if (!target) {
        // Fallback: the Map may be temporarily stale during DOM morphing.
        // Query the DOM directly using the data attribute set by the v-stream directive.
        const fallbackEl = document.querySelector(`[data-stream-target="${to}"]`);
        if (!fallbackEl) {
            console.warn(`[LiVue Stream] Target not found: ${to}`);
            return;
        }
        registerStreamTarget(to, fallbackEl);
        target = { el: fallbackEl, replace: false };
    }

    const { el } = target;

    if (replace) {
        el.innerHTML = content;
    } else {
        el.innerHTML += content;
    }
}

/**
 * Register a stream target element.
 *
 * @param {string} targetId - Target identifier
 * @param {HTMLElement} el - DOM element
 * @param {boolean} replace - Default replace mode
 */
export function registerStreamTarget(targetId, el, replace = false) {
    streamTargets.set(targetId, { el, replace });
}

/**
 * Unregister a stream target element.
 *
 * @param {string} targetId - Target identifier
 */
export function unregisterStreamTarget(targetId) {
    streamTargets.delete(targetId);
}

/**
 * Clear all stream targets.
 * Called when component unmounts or template swaps.
 */
export function clearStreamTargets() {
    streamTargets.clear();
}

/**
 * Check if streaming is currently active.
 *
 * @returns {boolean}
 */
export function isStreaming() {
    return streamingState.active;
}

/**
 * Get current streaming method name.
 *
 * @returns {string|null}
 */
export function getStreamingMethod() {
    return streamingState.method;
}
