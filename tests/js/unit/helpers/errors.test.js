/**
 * Tests for error handling helper.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

let errors;

beforeEach(async () => {
    vi.resetModules();

    // Mock Vue's reactive
    vi.doMock('vue', () => ({
        reactive: (obj) => obj, // Simple passthrough for testing
    }));

    // Mock hooks
    vi.doMock('@/helpers/hooks.js', () => ({
        trigger: vi.fn(),
    }));

    errors = await import('@/helpers/errors.js');
});

describe('Errors Helper', () => {
    describe('createErrors()', () => {
        it('should create an empty errors object', () => {
            const errorsObj = errors.createErrors();

            expect(errorsObj).toEqual({});
        });
    });

    describe('setErrors()', () => {
        it('should populate errors from server response', () => {
            const errorsObj = errors.createErrors();

            errors.setErrors(errorsObj, {
                email: ['The email is invalid.'],
                password: ['The password is too short.', 'The password must contain a number.'],
            });

            expect(errorsObj.email).toEqual(['The email is invalid.']);
            expect(errorsObj.password).toEqual(['The password is too short.', 'The password must contain a number.']);
        });

        it('should clear existing errors before setting new ones', () => {
            const errorsObj = errors.createErrors();

            errors.setErrors(errorsObj, { email: ['Error 1'] });
            errors.setErrors(errorsObj, { name: ['Error 2'] });

            expect(errorsObj.email).toBeUndefined();
            expect(errorsObj.name).toEqual(['Error 2']);
        });
    });

    describe('clearErrors()', () => {
        it('should remove all errors', () => {
            const errorsObj = errors.createErrors();

            errors.setErrors(errorsObj, {
                email: ['Error'],
                name: ['Error'],
            });

            errors.clearErrors(errorsObj);

            expect(Object.keys(errorsObj)).toHaveLength(0);
        });
    });

    describe('onError()', () => {
        it('should register a global error handler', () => {
            const handler = vi.fn();

            errors.onError(handler);

            // The handler is stored internally, test by calling handleError
            errors.handleError(new Error('Test'), 'test-component');

            expect(handler).toHaveBeenCalledWith(expect.any(Error), 'test-component');
        });
    });

    describe('handleError()', () => {
        it('should trigger error.occurred hook', async () => {
            const { trigger } = await import('@/helpers/hooks.js');

            const error = new Error('Test error');
            errors.handleError(error, 'my-component', 'comp-1');

            expect(trigger).toHaveBeenCalledWith('error.occurred', expect.objectContaining({
                error,
                componentName: 'my-component',
                componentId: 'comp-1',
            }));
        });

        it('should call component-specific handler first', () => {
            const globalHandler = vi.fn();
            const componentHandler = vi.fn(() => true);

            errors.onError(globalHandler);
            errors.setComponentErrorHandler('comp-1', componentHandler);

            const error = new Error('Test');
            const result = errors.handleError(error, 'my-comp', 'comp-1');

            expect(componentHandler).toHaveBeenCalledWith(error, expect.any(Object));
            expect(globalHandler).not.toHaveBeenCalled(); // Component handler returned true
            expect(result).toBe(true);
        });

        it('should fall back to global handler if component handler returns false', () => {
            const globalHandler = vi.fn();
            const componentHandler = vi.fn(() => false);

            errors.onError(globalHandler);
            errors.setComponentErrorHandler('comp-1', componentHandler);

            errors.handleError(new Error('Test'), 'my-comp', 'comp-1');

            expect(componentHandler).toHaveBeenCalled();
            expect(globalHandler).toHaveBeenCalled();
        });

        it('should log to console if no handlers', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            errors.handleError(new Error('Test'), 'orphan-component');

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Unhandled error'),
                expect.any(Error)
            );

            consoleSpy.mockRestore();
        });

        it('should handle errors thrown by handlers gracefully', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const badHandler = vi.fn(() => {
                throw new Error('Handler crashed');
            });

            errors.setComponentErrorHandler('comp-1', badHandler);

            // Should not throw
            expect(() => {
                errors.handleError(new Error('Original'), 'comp', 'comp-1');
            }).not.toThrow();

            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Error in component error handler'),
                expect.any(Error)
            );

            consoleSpy.mockRestore();
        });

        it('should allow hook to preventDefault', async () => {
            const { trigger } = await import('@/helpers/hooks.js');

            // Make trigger call preventDefault
            trigger.mockImplementation((name, payload) => {
                if (payload.preventDefault) {
                    payload.preventDefault();
                }
            });

            const globalHandler = vi.fn();
            errors.onError(globalHandler);

            const result = errors.handleError(new Error('Test'), 'comp');

            expect(result).toBe(true);
            expect(globalHandler).not.toHaveBeenCalled(); // Hook prevented default
        });
    });

    describe('setComponentErrorHandler() / removeComponentErrorHandler()', () => {
        it('should register component error handler', () => {
            const handler = vi.fn(() => true);

            errors.setComponentErrorHandler('comp-1', handler);
            errors.handleError(new Error('Test'), 'comp', 'comp-1');

            expect(handler).toHaveBeenCalled();
        });

        it('should remove component error handler', () => {
            const handler = vi.fn(() => true);
            const globalHandler = vi.fn();

            errors.onError(globalHandler);
            errors.setComponentErrorHandler('comp-1', handler);
            errors.removeComponentErrorHandler('comp-1');

            errors.handleError(new Error('Test'), 'comp', 'comp-1');

            expect(handler).not.toHaveBeenCalled();
            expect(globalHandler).toHaveBeenCalled();
        });

        it('should ignore non-function handlers', () => {
            errors.setComponentErrorHandler('comp-1', 'not a function');
            errors.setComponentErrorHandler('comp-2', null);

            // Should not throw
            expect(() => {
                errors.handleError(new Error('Test'), 'comp', 'comp-1');
            }).not.toThrow();
        });
    });
});
