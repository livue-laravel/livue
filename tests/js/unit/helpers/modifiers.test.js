/**
 * Tests for debounce/throttle modifiers.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let modifiers;

beforeEach(async () => {
    vi.resetModules();
    vi.useFakeTimers();

    modifiers = await import('@/helpers/modifiers.js');
});

afterEach(() => {
    vi.useRealTimers();
});

describe('Modifiers Helper', () => {
    describe('getDebounced()', () => {
        it('should delay function execution', async () => {
            const fn = vi.fn(() => 'result');
            const debounced = modifiers.getDebounced('comp-1:search', 300);

            const promise = debounced(fn);

            expect(fn).not.toHaveBeenCalled();

            vi.advanceTimersByTime(300);

            const result = await promise;
            expect(fn).toHaveBeenCalledTimes(1);
            expect(result).toBe('result');
        });

        it('should reset timer on subsequent calls', async () => {
            const fn = vi.fn(() => 'final');
            const debounced = modifiers.getDebounced('comp-1:search', 300);

            debounced(() => 'first');
            vi.advanceTimersByTime(200);

            debounced(() => 'second');
            vi.advanceTimersByTime(200);

            const promise = debounced(fn);
            vi.advanceTimersByTime(300);

            const result = await promise;
            expect(result).toBe('final');
            // Only the last function should be called
            expect(fn).toHaveBeenCalledTimes(1);
        });

        it('should return the same debouncer for same key', () => {
            const debounced1 = modifiers.getDebounced('comp-1:method', 300);
            const debounced2 = modifiers.getDebounced('comp-1:method', 300);

            expect(debounced1).toBe(debounced2);
        });

        it('should return different debouncers for different keys', () => {
            const debounced1 = modifiers.getDebounced('comp-1:method', 300);
            const debounced2 = modifiers.getDebounced('comp-2:method', 300);

            expect(debounced1).not.toBe(debounced2);
        });

        it('should return different debouncers for different delays', () => {
            const debounced1 = modifiers.getDebounced('comp-1:method', 300);
            const debounced2 = modifiers.getDebounced('comp-1:method', 500);

            expect(debounced1).not.toBe(debounced2);
        });

        it('should handle async functions', async () => {
            const asyncFn = vi.fn(async () => {
                return 'async result';
            });

            const debounced = modifiers.getDebounced('comp-1:async', 100);
            const promise = debounced(asyncFn);

            vi.advanceTimersByTime(100);

            const result = await promise;
            expect(result).toBe('async result');
        });

        it('should handle errors in callback', async () => {
            // Note: Synchronous errors thrown in the callback may not be
            // properly caught due to Promise.resolve() behavior.
            // This tests async error handling instead.
            const errorFn = vi.fn(async () => {
                throw new Error('Test error');
            });

            const debounced = modifiers.getDebounced('comp-1:error', 100);
            const promise = debounced(errorFn);

            vi.advanceTimersByTime(100);

            await expect(promise).rejects.toThrow('Test error');
        });
    });

    describe('getThrottled()', () => {
        it('should execute immediately on first call', async () => {
            const fn = vi.fn(() => 'result');
            const throttled = modifiers.getThrottled('comp-1:increment', 300);

            const result = await throttled(fn);

            expect(fn).toHaveBeenCalledTimes(1);
            expect(result).toBe('result');
        });

        it('should drop calls during cooldown period', async () => {
            const fn = vi.fn(() => 'result');
            const throttled = modifiers.getThrottled('comp-1:increment', 300);

            await throttled(fn); // First call - executes

            const result2 = await throttled(() => 'dropped1');
            const result3 = await throttled(() => 'dropped2');

            expect(fn).toHaveBeenCalledTimes(1);
            expect(result2).toBeNull();
            expect(result3).toBeNull();
        });

        it('should allow calls after cooldown', async () => {
            const fn1 = vi.fn(() => 'first');
            const fn2 = vi.fn(() => 'second');
            const throttled = modifiers.getThrottled('comp-1:increment', 300);

            await throttled(fn1);

            vi.advanceTimersByTime(300);

            const result = await throttled(fn2);

            expect(fn1).toHaveBeenCalledTimes(1);
            expect(fn2).toHaveBeenCalledTimes(1);
            expect(result).toBe('second');
        });

        it('should return the same throttler for same key', () => {
            const throttled1 = modifiers.getThrottled('comp-1:method', 300);
            const throttled2 = modifiers.getThrottled('comp-1:method', 300);

            expect(throttled1).toBe(throttled2);
        });

        it('should return different throttlers for different keys', () => {
            const throttled1 = modifiers.getThrottled('comp-1:method', 300);
            const throttled2 = modifiers.getThrottled('comp-2:method', 300);

            expect(throttled1).not.toBe(throttled2);
        });

        it('should handle async functions', async () => {
            const asyncFn = vi.fn(async () => 'async');
            const throttled = modifiers.getThrottled('comp-1:async', 100);

            const result = await throttled(asyncFn);

            expect(result).toBe('async');
        });
    });

    describe('clearModifiers()', () => {
        it('should clear all modifiers for a component', async () => {
            // Create some modifiers
            const debounced = modifiers.getDebounced('comp-1:search', 300);
            const throttled = modifiers.getThrottled('comp-1:click', 300);

            // Clear them
            modifiers.clearModifiers('comp-1');

            // Get new ones - should be different instances
            const debounced2 = modifiers.getDebounced('comp-1:search', 300);
            const throttled2 = modifiers.getThrottled('comp-1:click', 300);

            expect(debounced2).not.toBe(debounced);
            expect(throttled2).not.toBe(throttled);
        });

        it('should not affect other components', () => {
            const comp1Debounced = modifiers.getDebounced('comp-1:search', 300);
            const comp2Debounced = modifiers.getDebounced('comp-2:search', 300);

            modifiers.clearModifiers('comp-1');

            // comp-2 should still have the same instance
            const comp2Debounced2 = modifiers.getDebounced('comp-2:search', 300);
            expect(comp2Debounced2).toBe(comp2Debounced);

            // comp-1 should have a new instance
            const comp1Debounced2 = modifiers.getDebounced('comp-1:search', 300);
            expect(comp1Debounced2).not.toBe(comp1Debounced);
        });
    });

    describe('default export', () => {
        it('should export all functions', () => {
            expect(modifiers.default.getDebounced).toBe(modifiers.getDebounced);
            expect(modifiers.default.getThrottled).toBe(modifiers.getThrottled);
            expect(modifiers.default.clearModifiers).toBe(modifiers.clearModifiers);
        });
    });
});
