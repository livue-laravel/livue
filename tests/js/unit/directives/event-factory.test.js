/**
 * Tests for createEventDirective factory.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let createEventDirective;
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

    const module = await import('@/directives/event-factory.js');
    createEventDirective = module.createEventDirective;

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

describe('createEventDirective', () => {
    describe('basic functionality', () => {
        it('should create a directive object with mounted/updated/unmounted hooks', () => {
            const directive = createEventDirective('click');

            expect(directive).toHaveProperty('mounted');
            expect(directive).toHaveProperty('updated');
            expect(directive).toHaveProperty('unmounted');
            expect(typeof directive.mounted).toBe('function');
            expect(typeof directive.updated).toBe('function');
            expect(typeof directive.unmounted).toBe('function');
        });

        it('should add event listener for specified event', () => {
            const directive = createEventDirective('mouseenter');
            const el = document.createElement('div');
            const spy = vi.spyOn(el, 'addEventListener');

            directive.mounted(el, { arg: 'highlight', modifiers: {} }, mockVnode);

            expect(spy).toHaveBeenCalledWith('mouseenter', expect.any(Function), expect.any(Object));
        });

        it('should call livue.call with method from arg on event', () => {
            const directive = createEventDirective('dblclick');
            const el = document.createElement('button');

            directive.mounted(el, { arg: 'edit', modifiers: {}, value: undefined }, mockVnode);

            const event = new MouseEvent('dblclick', { bubbles: true });
            el.dispatchEvent(event);

            expect(mockLivue.call).toHaveBeenCalledWith('edit');
        });

        it('should pass single argument from value', () => {
            const directive = createEventDirective('mousedown');
            const el = document.createElement('button');

            directive.mounted(el, { arg: 'select', modifiers: {}, value: 42 }, mockVnode);

            const event = new MouseEvent('mousedown', { bubbles: true });
            el.dispatchEvent(event);

            expect(mockLivue.call).toHaveBeenCalledWith('select', 42);
        });

        it('should pass array arguments from value', () => {
            const directive = createEventDirective('mouseup');
            const el = document.createElement('button');

            directive.mounted(el, { arg: 'update', modifiers: {}, value: [1, 'active'] }, mockVnode);

            const event = new MouseEvent('mouseup', { bubbles: true });
            el.dispatchEvent(event);

            expect(mockLivue.call).toHaveBeenCalledWith('update', 1, 'active');
        });

        it('should support method name as value (no arg)', () => {
            const directive = createEventDirective('mouseenter');
            const el = document.createElement('div');

            directive.mounted(el, { arg: undefined, modifiers: {}, value: 'highlight' }, mockVnode);

            const event = new MouseEvent('mouseenter', { bubbles: true });
            el.dispatchEvent(event);

            expect(mockLivue.call).toHaveBeenCalledWith('highlight');
        });

        it('should support array value with method and args (no arg)', () => {
            const directive = createEventDirective('contextmenu');
            const el = document.createElement('div');

            directive.mounted(el, { arg: undefined, modifiers: {}, value: ['showMenu', 'item1'] }, mockVnode);

            const event = new MouseEvent('contextmenu', { bubbles: true });
            el.dispatchEvent(event);

            expect(mockLivue.call).toHaveBeenCalledWith('showMenu', 'item1');
        });

        it('should warn when livue helper not found', () => {
            const directive = createEventDirective('click');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const el = document.createElement('button');

            directive.mounted(el, { arg: 'test', modifiers: {} }, { ctx: {} });

            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('livue helper not found'));

            warnSpy.mockRestore();
        });

        it('should warn when no method specified', () => {
            const directive = createEventDirective('click');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const el = document.createElement('button');

            directive.mounted(el, { arg: undefined, modifiers: {}, value: undefined }, mockVnode);

            el.click();

            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('no method specified'));

            warnSpy.mockRestore();
        });
    });

    describe('modifiers', () => {
        it('.prevent should call preventDefault', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');

            directive.mounted(el, { arg: 'test', modifiers: { prevent: true } }, mockVnode);

            const event = new MouseEvent('click', { cancelable: true });
            const preventSpy = vi.spyOn(event, 'preventDefault');
            el.dispatchEvent(event);

            expect(preventSpy).toHaveBeenCalled();
        });

        it('.stop should call stopPropagation', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');

            directive.mounted(el, { arg: 'test', modifiers: { stop: true } }, mockVnode);

            const event = new MouseEvent('click', { bubbles: true });
            const stopSpy = vi.spyOn(event, 'stopPropagation');
            el.dispatchEvent(event);

            expect(stopSpy).toHaveBeenCalled();
        });

        it('.self should only trigger when event target is element itself', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('div');
            const child = document.createElement('span');
            el.appendChild(child);
            document.body.appendChild(el);

            directive.mounted(el, { arg: 'test', modifiers: { self: true } }, mockVnode);

            // Click on child - should NOT trigger
            child.click();
            expect(mockLivue.call).not.toHaveBeenCalled();

            // Click on element itself - should trigger
            el.click();
            expect(mockLivue.call).toHaveBeenCalledWith('test');

            document.body.removeChild(el);
        });

        it('.once should only fire once', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');

            directive.mounted(el, { arg: 'test', modifiers: { once: true } }, mockVnode);

            el.click();
            el.click();
            el.click();

            expect(mockLivue.call).toHaveBeenCalledTimes(1);
        });

        it('.debounce should debounce calls', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');

            directive.mounted(el, { arg: 'search', modifiers: { debounce: true, '300ms': true } }, mockVnode);

            el.click();
            expect(mockLivue.call).not.toHaveBeenCalled();

            vi.advanceTimersByTime(300);

            expect(mockLivue.call).toHaveBeenCalledWith('search');
        });

        it('.throttle should throttle calls', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');

            directive.mounted(el, { arg: 'track', modifiers: { throttle: true, '500ms': true } }, mockVnode);

            el.click();
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            el.click();
            el.click();
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            vi.advanceTimersByTime(500);

            el.click();
            expect(mockLivue.call).toHaveBeenCalledTimes(2);
        });

        it('.confirm should use callWithConfirm', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');

            directive.mounted(el, { arg: 'delete', modifiers: { confirm: true }, value: 42 }, mockVnode);

            el.click();

            expect(mockLivue.callWithConfirm).toHaveBeenCalledWith('delete', 'Are you sure?', 42);
            expect(mockLivue.call).not.toHaveBeenCalled();
        });

        it('.capture should use capture phase', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');
            const spy = vi.spyOn(el, 'addEventListener');

            directive.mounted(el, { arg: 'test', modifiers: { capture: true } }, mockVnode);

            expect(spy).toHaveBeenCalledWith(
                'click',
                expect.any(Function),
                expect.objectContaining({ capture: true })
            );
        });

        it('.passive should use passive listener', () => {
            const directive = createEventDirective('touchstart');
            const el = document.createElement('div');
            const spy = vi.spyOn(el, 'addEventListener');

            directive.mounted(el, { arg: 'handle', modifiers: { passive: true } }, mockVnode);

            expect(spy).toHaveBeenCalledWith(
                'touchstart',
                expect.any(Function),
                expect.objectContaining({ passive: true })
            );
        });
    });

    describe('.outside modifier', () => {
        it('should not support .outside by default', () => {
            const directive = createEventDirective('mousedown');
            const el = document.createElement('div');
            document.body.appendChild(el);
            const docSpy = vi.spyOn(document, 'addEventListener');

            directive.mounted(el, { arg: 'close', modifiers: { outside: true } }, mockVnode);

            // Should add listener on element, not document
            expect(docSpy).not.toHaveBeenCalledWith('mousedown', expect.any(Function), expect.any(Object));

            directive.unmounted(el);
            document.body.removeChild(el);
        });

        it('should support .outside when supportsOutside is true', () => {
            const directive = createEventDirective('click', { supportsOutside: true });
            const el = document.createElement('div');
            document.body.appendChild(el);
            const docSpy = vi.spyOn(document, 'addEventListener');

            directive.mounted(el, { arg: 'close', modifiers: { outside: true } }, mockVnode);

            expect(docSpy).toHaveBeenCalledWith('click', expect.any(Function), expect.any(Object));

            // Click on element - should NOT trigger
            el.click();
            expect(mockLivue.call).not.toHaveBeenCalled();

            // Click on body - should trigger
            document.body.click();
            expect(mockLivue.call).toHaveBeenCalledWith('close');

            directive.unmounted(el);
            document.body.removeChild(el);
        });
    });

    describe('key modifiers (keyboard events)', () => {
        it('should filter by key when isKeyboardEvent is true', () => {
            const directive = createEventDirective('keydown', { isKeyboardEvent: true });
            const el = document.createElement('input');

            directive.mounted(el, { arg: 'submit', modifiers: { enter: true } }, mockVnode);

            // Non-matching key - should NOT trigger
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
            expect(mockLivue.call).not.toHaveBeenCalled();

            // Matching key - should trigger
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('submit');
        });

        it('should support .esc key modifier', () => {
            const directive = createEventDirective('keydown', { isKeyboardEvent: true });
            const el = document.createElement('input');

            directive.mounted(el, { arg: 'close', modifiers: { esc: true } }, mockVnode);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('close');
        });

        it('should support .space key modifier', () => {
            const directive = createEventDirective('keydown', { isKeyboardEvent: true });
            const el = document.createElement('input');

            directive.mounted(el, { arg: 'toggle', modifiers: { space: true } }, mockVnode);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('toggle');
        });

        it('should support .tab key modifier', () => {
            const directive = createEventDirective('keydown', { isKeyboardEvent: true });
            const el = document.createElement('input');

            directive.mounted(el, { arg: 'nextField', modifiers: { tab: true } }, mockVnode);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('nextField');
        });

        it('should support arrow key modifiers', () => {
            const directive = createEventDirective('keydown', { isKeyboardEvent: true });
            const el = document.createElement('div');

            directive.mounted(el, { arg: 'navigate', modifiers: { up: true } }, mockVnode);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('navigate');

            // Non-matching arrow
            mockLivue.call.mockClear();
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
            expect(mockLivue.call).not.toHaveBeenCalled();

            directive.unmounted(el);
        });

        it('should support system modifier .ctrl', () => {
            const directive = createEventDirective('keydown', { isKeyboardEvent: true });
            const el = document.createElement('input');

            directive.mounted(el, { arg: 'save', modifiers: { ctrl: true, enter: true } }, mockVnode);

            // Enter without ctrl - should NOT trigger
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: false, bubbles: true }));
            expect(mockLivue.call).not.toHaveBeenCalled();

            // Ctrl+Enter - should trigger
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', ctrlKey: true, bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('save');
        });

        it('should support system modifier .shift', () => {
            const directive = createEventDirective('keydown', { isKeyboardEvent: true });
            const el = document.createElement('input');

            directive.mounted(el, { arg: 'selectAll', modifiers: { shift: true, enter: true } }, mockVnode);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', shiftKey: true, bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('selectAll');
        });

        it('should support system modifier .alt', () => {
            const directive = createEventDirective('keydown', { isKeyboardEvent: true });
            const el = document.createElement('input');

            directive.mounted(el, { arg: 'altAction', modifiers: { alt: true, enter: true } }, mockVnode);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', altKey: true, bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('altAction');
        });

        it('should support system modifier .meta', () => {
            const directive = createEventDirective('keydown', { isKeyboardEvent: true });
            const el = document.createElement('input');

            directive.mounted(el, { arg: 'cmdAction', modifiers: { meta: true, enter: true } }, mockVnode);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', metaKey: true, bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('cmdAction');
        });

        it('should not filter keys when isKeyboardEvent is false', () => {
            const directive = createEventDirective('keydown');
            const el = document.createElement('input');

            directive.mounted(el, { arg: 'handler', modifiers: { enter: true } }, mockVnode);

            // Any key should trigger since isKeyboardEvent is not set
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('handler');
        });

        it('should trigger on any key when no key modifier specified', () => {
            const directive = createEventDirective('keydown', { isKeyboardEvent: true });
            const el = document.createElement('input');

            directive.mounted(el, { arg: 'handler', modifiers: {} }, mockVnode);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('handler');
        });

        it('should support multiple key modifiers (OR logic)', () => {
            const directive = createEventDirective('keydown', { isKeyboardEvent: true });
            const el = document.createElement('input');

            directive.mounted(el, { arg: 'confirm', modifiers: { enter: true, space: true } }, mockVnode);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledTimes(2);

            // Non-matching
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledTimes(2);
        });
    });

    describe('function value support', () => {
        it('should call the function directly when value is a function', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');
            const fn = vi.fn();

            directive.mounted(el, { arg: undefined, modifiers: {}, value: fn }, mockVnode);

            el.click();

            expect(fn).toHaveBeenCalledTimes(1);
            expect(mockLivue.call).not.toHaveBeenCalled();
        });

        it('should apply .debounce to function value', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');
            const fn = vi.fn();

            directive.mounted(el, { arg: undefined, modifiers: { debounce: true, '300ms': true }, value: fn }, mockVnode);

            el.click();
            expect(fn).not.toHaveBeenCalled();

            vi.advanceTimersByTime(300);

            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('should apply .throttle to function value', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');
            const fn = vi.fn();

            directive.mounted(el, { arg: undefined, modifiers: { throttle: true, '500ms': true }, value: fn }, mockVnode);

            el.click();
            expect(fn).toHaveBeenCalledTimes(1);

            el.click();
            el.click();
            expect(fn).toHaveBeenCalledTimes(1);

            vi.advanceTimersByTime(500);

            el.click();
            expect(fn).toHaveBeenCalledTimes(2);
        });

        it('should apply .prevent with function value', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');
            const fn = vi.fn();

            directive.mounted(el, { arg: undefined, modifiers: { prevent: true }, value: fn }, mockVnode);

            const event = new MouseEvent('click', { cancelable: true });
            const preventSpy = vi.spyOn(event, 'preventDefault');
            el.dispatchEvent(event);

            expect(preventSpy).toHaveBeenCalled();
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('should apply .once with function value', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');
            const fn = vi.fn();

            directive.mounted(el, { arg: undefined, modifiers: { once: true }, value: fn }, mockVnode);

            el.click();
            el.click();
            el.click();

            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('should use deferred metadata args from setup proxy functions', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');
            const deferred = vi.fn();
            Object.defineProperty(deferred, '__livueMethodName', {
                value: 'setPage',
                configurable: false,
                enumerable: false,
                writable: false,
            });
            Object.defineProperty(deferred, '__livueMethodArgs', {
                value: [3],
                configurable: false,
                enumerable: false,
                writable: false,
            });

            directive.mounted(el, { arg: undefined, modifiers: {}, value: deferred }, mockVnode);

            el.click();

            expect(mockLivue.call).toHaveBeenCalledWith('setPage', 3);
            expect(deferred).not.toHaveBeenCalled();
        });
    });

    describe('cleanup', () => {
        it('should remove event listener on unmount', () => {
            const directive = createEventDirective('mouseenter');
            const el = document.createElement('div');

            directive.mounted(el, { arg: 'test', modifiers: {} }, mockVnode);

            const removeSpy = vi.spyOn(el, 'removeEventListener');
            directive.unmounted(el);

            expect(removeSpy).toHaveBeenCalledWith('mouseenter', expect.any(Function), expect.any(Object));
        });

        it('should remove document listener for .outside on unmount', () => {
            const directive = createEventDirective('click', { supportsOutside: true });
            const el = document.createElement('div');
            document.body.appendChild(el);

            directive.mounted(el, { arg: 'close', modifiers: { outside: true } }, mockVnode);

            const removeSpy = vi.spyOn(document, 'removeEventListener');
            directive.unmounted(el);

            expect(removeSpy).toHaveBeenCalledWith('click', expect.any(Function), expect.any(Object));

            document.body.removeChild(el);
        });

        it('should handle unmount of element that was never mounted', () => {
            const directive = createEventDirective('click');
            const el = document.createElement('button');

            // Should not throw
            expect(() => directive.unmounted(el)).not.toThrow();
        });
    });

    describe('multiple events on same element', () => {
        it('should handle multiple directives on same element independently', () => {
            const clickDirective = createEventDirective('click');
            const mouseenterDirective = createEventDirective('mouseenter');
            const el = document.createElement('div');

            clickDirective.mounted(el, { arg: 'onClick', modifiers: {}, value: undefined }, mockVnode);
            mouseenterDirective.mounted(el, { arg: 'onHover', modifiers: {}, value: undefined }, mockVnode);

            el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('onClick');
            expect(mockLivue.call).not.toHaveBeenCalledWith('onHover');

            mockLivue.call.mockClear();

            el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            expect(mockLivue.call).toHaveBeenCalledWith('onHover');
            expect(mockLivue.call).not.toHaveBeenCalledWith('onClick');
        });
    });
});
