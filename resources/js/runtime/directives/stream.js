/**
 * v-stream directive
 *
 * Marks an element as a streaming target. Content streamed from the server
 * via $this->stream(to: 'id', content: '...') will be applied to this element.
 *
 * Usage:
 *   <div v-stream="'output'">Loading...</div>
 *   <div v-stream.replace="'status'">Ready</div>
 *
 * Modifiers:
 *   .replace - Replace content instead of appending (default is append)
 *
 * The value should be a string (target ID) that matches the 'to' parameter
 * in the PHP $this->stream() call.
 */

import { registerStreamTarget, unregisterStreamTarget } from '../stream.js';

/**
 * WeakMap to store element state for cleanup.
 * @type {WeakMap<HTMLElement, { targetId: string }>}
 */
const elementState = new WeakMap();

export default {
    /**
     * Called when directive is first bound to the element.
     */
    mounted(el, binding) {
        // Get target ID from binding value
        // Value can be a string directly or an expression that evaluates to string
        const targetId = binding.value;

        if (!targetId || typeof targetId !== 'string') {
            console.warn('[v-stream] Target ID must be a non-empty string, got:', targetId);
            return;
        }

        // Check for .replace modifier
        const replace = binding.modifiers.replace || false;

        // Store state for cleanup
        elementState.set(el, { targetId });

        // Register this element as a stream target
        registerStreamTarget(targetId, el, replace);
    },

    /**
     * Called when the binding value changes.
     */
    updated(el, binding) {
        const oldState = elementState.get(el);
        const newTargetId = binding.value;

        if (!newTargetId || typeof newTargetId !== 'string') {
            console.warn('[v-stream] Target ID must be a non-empty string, got:', newTargetId);
            return;
        }

        // If target ID changed, re-register
        if (oldState && oldState.targetId !== newTargetId) {
            unregisterStreamTarget(oldState.targetId);

            const replace = binding.modifiers.replace || false;
            registerStreamTarget(newTargetId, el, replace);

            elementState.set(el, { targetId: newTargetId });
        }
    },

    /**
     * Called when directive is unbound from the element.
     */
    unmounted(el) {
        const state = elementState.get(el);

        if (state) {
            unregisterStreamTarget(state.targetId);
            elementState.delete(el);
        }
    },
};
