/**
 * Tests for the hooks system.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

let hooks;

beforeEach(async () => {
    vi.resetModules();
    hooks = await import('@/helpers/hooks.js');

    // Clear all hooks between tests
    hooks.clearAll();
});

describe('Hooks System', () => {
    describe('hook()', () => {
        it('should register a callback for a hook', () => {
            const callback = vi.fn();

            hooks.hook('component.init', callback);
            hooks.trigger('component.init', { data: 'test' });

            expect(callback).toHaveBeenCalledWith({ data: 'test' });
        });

        it('should return an unsubscribe function', () => {
            const callback = vi.fn();

            const unsub = hooks.hook('component.init', callback);
            unsub();

            hooks.trigger('component.init', {});

            expect(callback).not.toHaveBeenCalled();
        });

        it('should handle multiple callbacks for same hook', () => {
            const callback1 = vi.fn();
            const callback2 = vi.fn();

            hooks.hook('component.init', callback1);
            hooks.hook('component.init', callback2);

            hooks.trigger('component.init', { id: 1 });

            expect(callback1).toHaveBeenCalledWith({ id: 1 });
            expect(callback2).toHaveBeenCalledWith({ id: 1 });
        });

        it('should warn on invalid hook name', () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            const unsub = hooks.hook(123, vi.fn());

            expect(warnSpy).toHaveBeenCalled();
            expect(typeof unsub).toBe('function'); // Should still return a function

            warnSpy.mockRestore();
        });

        it('should warn on non-function callback', () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            const unsub = hooks.hook('component.init', 'not a function');

            expect(warnSpy).toHaveBeenCalled();
            expect(typeof unsub).toBe('function');

            warnSpy.mockRestore();
        });

        it('should clean up empty hook sets', () => {
            const callback = vi.fn();

            const unsub = hooks.hook('component.init', callback);
            expect(hooks.hasListeners('component.init')).toBe(true);

            unsub();
            expect(hooks.hasListeners('component.init')).toBeFalsy();
        });
    });

    describe('trigger()', () => {
        it('should call all registered callbacks', () => {
            const callbacks = [vi.fn(), vi.fn(), vi.fn()];

            callbacks.forEach(cb => hooks.hook('request.started', cb));

            hooks.trigger('request.started', { url: '/test' });

            callbacks.forEach(cb => {
                expect(cb).toHaveBeenCalledWith({ url: '/test' });
            });
        });

        it('should not throw when no listeners', () => {
            expect(() => {
                hooks.trigger('nonexistent.hook', {});
            }).not.toThrow();
        });

        it('should catch callback errors without stopping other callbacks', () => {
            const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const callback1 = vi.fn(() => {
                throw new Error('Callback error');
            });
            const callback2 = vi.fn();

            hooks.hook('template.updated', callback1);
            hooks.hook('template.updated', callback2);

            hooks.trigger('template.updated', {});

            expect(errorSpy).toHaveBeenCalled();
            expect(callback2).toHaveBeenCalled(); // Should still run

            errorSpy.mockRestore();
        });

        it('should execute callbacks in registration order', () => {
            const order = [];

            hooks.hook('component.init', () => order.push(1));
            hooks.hook('component.init', () => order.push(2));
            hooks.hook('component.init', () => order.push(3));

            hooks.trigger('component.init', {});

            expect(order).toEqual([1, 2, 3]);
        });
    });

    describe('triggerAsync()', () => {
        it('should await each callback before proceeding', async () => {
            const order = [];

            hooks.hook('request.finished', async () => {
                await new Promise(r => setTimeout(r, 10));
                order.push(1);
            });

            hooks.hook('request.finished', async () => {
                order.push(2);
            });

            await hooks.triggerAsync('request.finished', {});

            expect(order).toEqual([1, 2]); // Should be in order, not [2, 1]
        });

        it('should catch async callback errors', async () => {
            const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const callback2 = vi.fn();

            hooks.hook('error.occurred', async () => {
                throw new Error('Async error');
            });
            hooks.hook('error.occurred', callback2);

            await hooks.triggerAsync('error.occurred', {});

            expect(errorSpy).toHaveBeenCalled();
            expect(callback2).toHaveBeenCalled();

            errorSpy.mockRestore();
        });

        it('should handle empty hooks', async () => {
            await expect(hooks.triggerAsync('nonexistent', {})).resolves.toBeUndefined();
        });
    });

    describe('createCleanupCollector()', () => {
        it('should collect cleanup functions', () => {
            const { cleanup, runCleanups } = hooks.createCleanupCollector();
            const fn1 = vi.fn();
            const fn2 = vi.fn();

            cleanup(fn1);
            cleanup(fn2);

            runCleanups();

            expect(fn1).toHaveBeenCalled();
            expect(fn2).toHaveBeenCalled();
        });

        it('should clear cleanups after running', () => {
            const { cleanup, runCleanups } = hooks.createCleanupCollector();
            const fn = vi.fn();

            cleanup(fn);
            runCleanups();
            runCleanups(); // Second run

            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('should catch cleanup errors', () => {
            const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const { cleanup, runCleanups } = hooks.createCleanupCollector();

            const goodFn = vi.fn();
            cleanup(() => {
                throw new Error('Cleanup error');
            });
            cleanup(goodFn);

            runCleanups();

            expect(errorSpy).toHaveBeenCalled();
            expect(goodFn).toHaveBeenCalled(); // Should still run

            errorSpy.mockRestore();
        });

        it('should ignore non-function cleanups', () => {
            const { cleanup, runCleanups } = hooks.createCleanupCollector();

            cleanup('not a function');
            cleanup(null);
            cleanup(123);

            // Should not throw
            expect(() => runCleanups()).not.toThrow();
        });
    });

    describe('hasListeners()', () => {
        it('should return true when listeners exist', () => {
            hooks.hook('component.init', vi.fn());

            expect(hooks.hasListeners('component.init')).toBe(true);
        });

        it('should return falsy when no listeners', () => {
            expect(hooks.hasListeners('nonexistent')).toBeFalsy();
        });

        it('should return falsy after all listeners removed', () => {
            const unsub = hooks.hook('component.init', vi.fn());
            unsub();

            expect(hooks.hasListeners('component.init')).toBeFalsy();
        });
    });

    describe('listenerCount()', () => {
        it('should return correct count', () => {
            hooks.hook('component.init', vi.fn());
            hooks.hook('component.init', vi.fn());
            hooks.hook('component.init', vi.fn());

            expect(hooks.listenerCount('component.init')).toBe(3);
        });

        it('should return 0 for nonexistent hooks', () => {
            expect(hooks.listenerCount('nonexistent')).toBe(0);
        });
    });

    describe('clearAll()', () => {
        it('should remove all hooks', () => {
            hooks.hook('component.init', vi.fn());
            hooks.hook('component.destroy', vi.fn());
            hooks.hook('request.started', vi.fn());

            hooks.clearAll();

            expect(hooks.hasListeners('component.init')).toBeFalsy();
            expect(hooks.hasListeners('component.destroy')).toBeFalsy();
            expect(hooks.hasListeners('request.started')).toBeFalsy();
        });
    });

    describe('getAvailableHooks()', () => {
        it('should return list of hook names', () => {
            const available = hooks.getAvailableHooks();

            expect(available).toContain('component.init');
            expect(available).toContain('component.destroy');
            expect(available).toContain('element.init');
            expect(available).toContain('request.started');
            expect(available).toContain('request.finished');
            expect(available).toContain('template.updating');
            expect(available).toContain('template.updated');
            expect(available).toContain('error.occurred');
        });

        it('should return a copy (not modify original)', () => {
            const available = hooks.getAvailableHooks();
            available.push('custom.hook');

            const available2 = hooks.getAvailableHooks();
            expect(available2).not.toContain('custom.hook');
        });
    });
});
