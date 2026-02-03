/**
 * Error handling for LiVue components.
 */

import { reactive } from 'vue';
import { trigger } from './hooks.js';

/**
 * Global error handler. Set via LiVueRuntime.onError().
 * @type {Function|null}
 */
let _globalErrorHandler = null;

/**
 * Per-component error handlers. Set via livue.onError().
 * @type {Map<string, Function>}
 */
let _componentErrorHandlers = new Map();

/**
 * Create a reactive errors object for a component.
 * Holds server validation errors keyed by field name.
 *
 * @returns {object} Reactive errors object with helper methods
 */
export function createErrors() {
    let errors = reactive({});

    return errors;
}

/**
 * Populate the errors object from a server 422 response.
 *
 * @param {object} errors - The reactive errors object
 * @param {object} serverErrors - { field: ['message', ...], ... }
 */
export function setErrors(errors, serverErrors) {
    // Clear existing errors
    clearErrors(errors);

    // Set new errors
    for (let key in serverErrors) {
        errors[key] = serverErrors[key];
    }
}

/**
 * Clear all errors from the reactive object.
 *
 * @param {object} errors - The reactive errors object
 */
export function clearErrors(errors) {
    for (let key in errors) {
        delete errors[key];
    }
}

/**
 * Register a global error handler.
 *
 * @param {Function} handler - function(error, componentName)
 */
export function onError(handler) {
    _globalErrorHandler = handler;
}

/**
 * Invoke error handlers: component-specific first, then global.
 * Also triggers the error.occurred hook.
 *
 * @param {Error} error
 * @param {string} componentName
 * @param {string} [componentId] - Component ID for per-component handling
 * @param {object} [context] - Additional context (state, livue, method, etc.)
 * @returns {boolean} Whether the error was handled (preventDefault was called)
 */
export function handleError(error, componentName, componentId, context) {
    context = context || {};

    let handled = false;
    let preventDefault = function () {
        handled = true;
    };

    // Trigger error.occurred hook
    trigger('error.occurred', {
        error: error,
        componentName: componentName,
        componentId: componentId,
        context: context,
        preventDefault: preventDefault,
    });

    if (handled) {
        return true;
    }

    // Check for component-specific handler
    if (componentId && _componentErrorHandlers.has(componentId)) {
        let componentHandler = _componentErrorHandlers.get(componentId);
        try {
            let result = componentHandler(error, context);
            // If handler returns true or a truthy value, consider it handled
            if (result === true || result) {
                return true;
            }
        } catch (handlerError) {
            console.error('[LiVue] Error in component error handler:', handlerError);
        }
    }

    // Fall back to global handler
    if (_globalErrorHandler) {
        _globalErrorHandler(error, componentName);
    } else {
        console.error('[LiVue] Unhandled error on ' + componentName + ':', error);
    }

    return false;
}

/**
 * Register an error handler for a specific component.
 *
 * @param {string} componentId - Component ID
 * @param {Function} handler - function(error, context) => boolean
 */
export function setComponentErrorHandler(componentId, handler) {
    if (typeof handler === 'function') {
        _componentErrorHandlers.set(componentId, handler);
    }
}

/**
 * Remove a component's error handler.
 *
 * @param {string} componentId
 */
export function removeComponentErrorHandler(componentId) {
    _componentErrorHandlers.delete(componentId);
}

/**
 * Get the global error handler setter (exposed on LiVueRuntime).
 */
export function getOnError() {
    return onError;
}
