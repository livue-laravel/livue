/**
 * Tests for v-poll directive.
 *
 * The v-poll directive automatically polls the server at intervals.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let pollDirective;
let mockLivue;
let mockVnode;

beforeEach(async () => {
    vi.resetModules();
    vi.useFakeTimers();

    const module = await import('@/directives/poll.js');
    pollDirective = module.default;

    mockLivue = {
        call: vi.fn(),
    };

    mockVnode = {
        ctx: { setupState: { livue: mockLivue } },
    };
});

afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
});

describe('v-poll Directive', () => {
    describe('mounted()', () => {
        it('should start polling at default interval (2500ms)', () => {
            const el = document.createElement('div');

            pollDirective.mounted(el, { modifiers: {} }, mockVnode);

            expect(mockLivue.call).not.toHaveBeenCalled();

            vi.advanceTimersByTime(2500);
            expect(mockLivue.call).toHaveBeenCalledTimes(1);
            expect(mockLivue.call).toHaveBeenCalledWith('$refresh', []);

            vi.advanceTimersByTime(2500);
            expect(mockLivue.call).toHaveBeenCalledTimes(2);

            pollDirective.unmounted(el);
        });

        it('should use custom interval from modifiers (5s)', () => {
            const el = document.createElement('div');

            pollDirective.mounted(el, { modifiers: { '5s': true } }, mockVnode);

            vi.advanceTimersByTime(4999);
            expect(mockLivue.call).not.toHaveBeenCalled();

            vi.advanceTimersByTime(1);
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            pollDirective.unmounted(el);
        });

        it('should use custom interval in ms from modifiers', () => {
            const el = document.createElement('div');

            pollDirective.mounted(el, { modifiers: { '500ms': true } }, mockVnode);

            vi.advanceTimersByTime(500);
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            pollDirective.unmounted(el);
        });

        it('should call specific method if provided', () => {
            const el = document.createElement('div');

            pollDirective.mounted(el, { value: 'checkStatus', modifiers: {} }, mockVnode);

            vi.advanceTimersByTime(2500);

            expect(mockLivue.call).toHaveBeenCalledWith('checkStatus', []);

            pollDirective.unmounted(el);
        });

        it('should call method with params if array provided', () => {
            const el = document.createElement('div');

            pollDirective.mounted(el, { value: ['getData', ['param1']], modifiers: {} }, mockVnode);

            vi.advanceTimersByTime(2500);

            expect(mockLivue.call).toHaveBeenCalledWith('getData', ['param1']);

            pollDirective.unmounted(el);
        });
    });

    describe('.visible modifier', () => {
        it('should only poll when element is visible', () => {
            const el = document.createElement('div');

            // Mock IntersectionObserver
            let observerCallback;
            global.IntersectionObserver = vi.fn((callback) => {
                observerCallback = callback;
                return {
                    observe: vi.fn(),
                    disconnect: vi.fn(),
                };
            });

            pollDirective.mounted(el, { modifiers: { visible: true } }, mockVnode);

            // Simulate element becoming visible
            observerCallback([{ isIntersecting: true }]);

            vi.advanceTimersByTime(2500);
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            // Simulate element becoming invisible
            observerCallback([{ isIntersecting: false }]);

            vi.advanceTimersByTime(2500);
            // Should not have polled while invisible
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            pollDirective.unmounted(el);
        });
    });

    describe('.keep-alive modifier', () => {
        it('should continue polling even when tab is hidden', () => {
            const el = document.createElement('div');

            pollDirective.mounted(el, { modifiers: { 'keep-alive': true } }, mockVnode);

            // Simulate tab hidden
            Object.defineProperty(document, 'hidden', { value: true, configurable: true });
            document.dispatchEvent(new Event('visibilitychange'));

            vi.advanceTimersByTime(2500);
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            // Restore
            Object.defineProperty(document, 'hidden', { value: false, configurable: true });

            pollDirective.unmounted(el);
        });
    });

    describe('visibility change without keep-alive', () => {
        it('should pause polling when tab is hidden', () => {
            const el = document.createElement('div');

            pollDirective.mounted(el, { modifiers: {} }, mockVnode);

            vi.advanceTimersByTime(2500);
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            // Simulate tab hidden
            Object.defineProperty(document, 'hidden', { value: true, configurable: true });
            document.dispatchEvent(new Event('visibilitychange'));

            vi.advanceTimersByTime(2500);
            // Should be paused, no additional calls
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            // Restore
            Object.defineProperty(document, 'hidden', { value: false, configurable: true });
            document.dispatchEvent(new Event('visibilitychange'));

            vi.advanceTimersByTime(2500);
            expect(mockLivue.call).toHaveBeenCalledTimes(2);

            pollDirective.unmounted(el);
        });
    });

    describe('unmounted()', () => {
        it('should stop polling', () => {
            const el = document.createElement('div');

            pollDirective.mounted(el, { modifiers: {} }, mockVnode);

            vi.advanceTimersByTime(2500);
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            pollDirective.unmounted(el);

            vi.advanceTimersByTime(5000);
            expect(mockLivue.call).toHaveBeenCalledTimes(1); // No additional calls
        });
    });
});
