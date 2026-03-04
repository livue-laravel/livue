/**
 * Tests for v-click directive.
 *
 * The v-click directive provides a cleaner syntax for calling server methods.
 * Since it requires a Vue component context, we test the directive logic
 * by mocking the necessary context.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let clickDirective;
let mockLivue;
let mockVnode;

beforeEach(async () => {
    vi.resetModules();
    vi.useFakeTimers();

    // Mock modifiers module
    vi.doMock('@/helpers/modifiers.js', () => ({
        getDebounced: vi.fn((key, ms) => {
            let timer = null;
            return (fn) => {
                clearTimeout(timer);
                return new Promise((resolve) => {
                    timer = setTimeout(() => {
                        fn();
                        resolve();
                    }, ms);
                });
            };
        }),
        getThrottled: vi.fn((key, ms) => {
            let lastRun = 0;
            return (fn) => {
                const now = Date.now();
                if (now - lastRun >= ms) {
                    lastRun = now;
                    return Promise.resolve(fn());
                }
                return Promise.resolve(null);
            };
        }),
    }));

    const module = await import('@/directives/click.js');
    clickDirective = module.default;

    // Create mock livue helper
    mockLivue = {
        call: vi.fn(),
        callWithConfirm: vi.fn(),
    };

    // Create mock vnode with context
    mockVnode = {
        ctx: {
            setupState: {
                livue: mockLivue,
            },
        },
    };
});

afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
});

describe('v-click Directive', () => {
    describe('mounted()', () => {
        it('should add click event listener', () => {
            const el = document.createElement('button');
            const addEventListenerSpy = vi.spyOn(el, 'addEventListener');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: {},
                value: 'increment',
            }, mockVnode);

            expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), expect.any(Object));
        });

        it('should call livue.call with method name from value', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: {},
                value: 'increment',
            }, mockVnode);

            el.click();

            expect(mockLivue.call).toHaveBeenCalledWith('increment');
        });

        it('should call livue.call with method name and single argument', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: {},
                value: ['save', 123],
            }, mockVnode);

            el.click();

            expect(mockLivue.call).toHaveBeenCalledWith('save', 123);
        });

        it('should call livue.call with method name and array arguments', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: {},
                value: ['update', 1, 'active', true],
            }, mockVnode);

            el.click();

            expect(mockLivue.call).toHaveBeenCalledWith('update', 1, 'active', true);
        });

        it('should support method name as value', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: {},
                value: 'myMethod',
            }, mockVnode);

            el.click();

            expect(mockLivue.call).toHaveBeenCalledWith('myMethod');
        });

        it('should support array value with method and args', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: {},
                value: ['doSomething', 'arg1', 'arg2'],
            }, mockVnode);

            el.click();

            expect(mockLivue.call).toHaveBeenCalledWith('doSomething', 'arg1', 'arg2');
        });

        it('should warn when livue helper not found', () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: {},
                value: 'test',
            }, { ctx: {} });

            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('livue helper not found'));

            warnSpy.mockRestore();
        });

        it('should warn when no method specified', () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: {},
                value: undefined,
            }, mockVnode);

            el.click();

            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('no method specified'));

            warnSpy.mockRestore();
        });
    });

    describe('modifiers', () => {
        it('.prevent should call preventDefault', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { prevent: true },
                value: 'test',
            }, mockVnode);

            const event = new MouseEvent('click', { cancelable: true });
            const preventSpy = vi.spyOn(event, 'preventDefault');

            el.dispatchEvent(event);

            expect(preventSpy).toHaveBeenCalled();
        });

        it('.stop should call stopPropagation', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { stop: true },
                value: 'test',
            }, mockVnode);

            const event = new MouseEvent('click', { bubbles: true });
            const stopSpy = vi.spyOn(event, 'stopPropagation');

            el.dispatchEvent(event);

            expect(stopSpy).toHaveBeenCalled();
        });

        it('.self should only trigger when event target is element', () => {
            const el = document.createElement('div');
            const child = document.createElement('span');
            el.appendChild(child);
            document.body.appendChild(el);

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { self: true },
                value: 'test',
            }, mockVnode);

            // Click on child - should NOT trigger
            child.click();
            expect(mockLivue.call).not.toHaveBeenCalled();

            // Click on element itself - should trigger
            el.click();
            expect(mockLivue.call).toHaveBeenCalledWith('test');

            document.body.removeChild(el);
        });

        it('.once should only fire once', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { once: true },
                value: 'test',
            }, mockVnode);

            el.click();
            el.click();
            el.click();

            expect(mockLivue.call).toHaveBeenCalledTimes(1);
        });

        it('.debounce should debounce calls', async () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { debounce: true, '300ms': true },
                value: 'search',
            }, mockVnode);

            el.click();
            expect(mockLivue.call).not.toHaveBeenCalled();

            vi.advanceTimersByTime(300);

            expect(mockLivue.call).toHaveBeenCalledWith('search');
        });

        it('.throttle should throttle calls', async () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { throttle: true, '500ms': true },
                value: 'track',
            }, mockVnode);

            el.click();
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            el.click();
            el.click();
            expect(mockLivue.call).toHaveBeenCalledTimes(1); // Throttled

            vi.advanceTimersByTime(500);

            el.click();
            expect(mockLivue.call).toHaveBeenCalledTimes(2);
        });

        it('.outside should listen for clicks outside element', () => {
            const el = document.createElement('div');
            document.body.appendChild(el);

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { outside: true },
                value: 'close',
            }, mockVnode);

            // Click on element - should NOT trigger
            el.click();
            expect(mockLivue.call).not.toHaveBeenCalled();

            // Click on document body - should trigger
            document.body.click();
            expect(mockLivue.call).toHaveBeenCalledWith('close');

            // Cleanup
            clickDirective.unmounted(el);
            document.body.removeChild(el);
        });

        it('.capture should use capture phase', () => {
            const el = document.createElement('button');
            const addEventListenerSpy = vi.spyOn(el, 'addEventListener');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { capture: true },
                value: 'test',
            }, mockVnode);

            expect(addEventListenerSpy).toHaveBeenCalledWith(
                'click',
                expect.any(Function),
                expect.objectContaining({ capture: true })
            );
        });

        it('.confirm should call callWithConfirm instead of call', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { confirm: true },
                value: 'delete',
            }, mockVnode);

            el.click();

            expect(mockLivue.callWithConfirm).toHaveBeenCalledWith('delete', 'Are you sure?');
            expect(mockLivue.call).not.toHaveBeenCalled();
        });

        it('.confirm should pass single argument', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { confirm: true },
                value: ['delete', 42],
            }, mockVnode);

            el.click();

            expect(mockLivue.callWithConfirm).toHaveBeenCalledWith('delete', 'Are you sure?', 42);
        });

        it('.confirm should pass array arguments', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { confirm: true },
                value: ['remove', 1, 'item'],
            }, mockVnode);

            el.click();

            expect(mockLivue.callWithConfirm).toHaveBeenCalledWith('remove', 'Are you sure?', 1, 'item');
        });

        it('.confirm combined with .prevent should preventDefault and call callWithConfirm', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { confirm: true, prevent: true },
                value: ['delete', 5],
            }, mockVnode);

            const event = new MouseEvent('click', { cancelable: true });
            const preventSpy = vi.spyOn(event, 'preventDefault');

            el.dispatchEvent(event);

            expect(preventSpy).toHaveBeenCalled();
            expect(mockLivue.callWithConfirm).toHaveBeenCalledWith('delete', 'Are you sure?', 5);
            expect(mockLivue.call).not.toHaveBeenCalled();
        });

        it('.passive should use passive listener', () => {
            const el = document.createElement('button');
            const addEventListenerSpy = vi.spyOn(el, 'addEventListener');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { passive: true },
                value: 'test',
            }, mockVnode);

            expect(addEventListenerSpy).toHaveBeenCalledWith(
                'click',
                expect.any(Function),
                expect.objectContaining({ passive: true })
            );
        });
    });

    describe('unmounted()', () => {
        it('should remove click event listener', () => {
            const el = document.createElement('button');

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: {},
                value: 'test',
            }, mockVnode);

            const removeEventListenerSpy = vi.spyOn(el, 'removeEventListener');

            clickDirective.unmounted(el);

            expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), expect.any(Object));
        });

        it('should remove document listener for .outside', () => {
            const el = document.createElement('div');
            document.body.appendChild(el);

            clickDirective.mounted(el, {
                arg: undefined,
                modifiers: { outside: true },
                value: 'close',
            }, mockVnode);

            const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

            clickDirective.unmounted(el);

            expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), expect.any(Object));

            document.body.removeChild(el);
        });
    });
});
