/**
 * Tests for v-loading directive.
 *
 * The v-loading directive shows/hides elements or modifies attributes
 * based on loading state.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let loadingDirective;
let mockLivue;
let mockVnode;
let watchCallback;

beforeEach(async () => {
    vi.resetModules();
    vi.useFakeTimers();

    // Capture the watch callback so we can trigger it manually
    watchCallback = null;

    // Mock Vue's watch
    vi.doMock('vue', () => ({
        watch: vi.fn((getter, callback, options) => {
            watchCallback = callback;
            if (options && options.immediate) {
                callback(getter());
            }
            return vi.fn(); // Return stop function
        }),
    }));

    const module = await import('@/directives/loading.js');
    loadingDirective = module.default;

    // Create mock livue helper
    mockLivue = {
        loading: false,
        isLoading: vi.fn(() => false),
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

describe('v-loading Directive', () => {
    describe('created()', () => {
        it('should store original display style', () => {
            const el = document.createElement('div');
            el.style.display = 'flex';

            loadingDirective.created(el, { modifiers: {} });

            // Default behavior (show when loading) hides initially
            expect(el.style.display).toBe('none');
        });

        it('should not hide initially with .remove modifier', () => {
            const el = document.createElement('div');
            el.style.display = 'block';

            loadingDirective.created(el, { modifiers: { remove: true } });

            expect(el.style.display).toBe('block');
        });

        it('should not hide initially with .class modifier', () => {
            const el = document.createElement('div');
            el.style.display = 'block';

            loadingDirective.created(el, { modifiers: { class: true } });

            expect(el.style.display).toBe('block');
        });

        it('should not hide initially with .attr modifier', () => {
            const el = document.createElement('div');
            el.style.display = 'block';

            loadingDirective.created(el, { modifiers: { attr: true } });

            expect(el.style.display).toBe('block');
        });
    });

    describe('mounted()', () => {
        it('should set up watch for loading state', async () => {
            const { watch } = await import('vue');
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: {} });
            loadingDirective.mounted(el, { modifiers: {}, value: undefined }, mockVnode);

            expect(watch).toHaveBeenCalled();
        });

        it('should watch specific action when value is string', async () => {
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: {} });
            loadingDirective.mounted(el, { modifiers: {}, value: 'save' }, mockVnode);

            // The watch getter should call isLoading('save')
            expect(mockLivue.isLoading).toHaveBeenCalledWith('save');
        });

        it('should warn when livue helper not found', () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: {} });
            loadingDirective.mounted(el, { modifiers: {} }, { ctx: {} });

            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('livue helper not found'));

            warnSpy.mockRestore();
        });
    });

    describe('loading state changes', () => {
        it('should show element when loading', () => {
            const el = document.createElement('div');
            el.style.display = 'block';

            loadingDirective.created(el, { modifiers: {} });
            loadingDirective.mounted(el, { modifiers: {}, value: undefined }, mockVnode);

            // Initially hidden
            expect(el.style.display).toBe('none');

            // Simulate loading = true
            watchCallback(true);

            expect(el.style.display).toBe('block');
        });

        it('should hide element when not loading', () => {
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: {} });
            loadingDirective.mounted(el, { modifiers: {}, value: undefined }, mockVnode);

            watchCallback(true);
            watchCallback(false);

            expect(el.style.display).toBe('none');
        });

        it('.remove should hide when loading', () => {
            const el = document.createElement('div');
            el.style.display = 'block';

            loadingDirective.created(el, { modifiers: { remove: true } });
            loadingDirective.mounted(el, { modifiers: { remove: true }, value: undefined }, mockVnode);

            watchCallback(true);

            expect(el.style.display).toBe('none');
        });

        it('.remove should show when not loading', () => {
            const el = document.createElement('div');
            el.style.display = 'block';

            loadingDirective.created(el, { modifiers: { remove: true } });
            loadingDirective.mounted(el, { modifiers: { remove: true }, value: undefined }, mockVnode);

            watchCallback(true);
            watchCallback(false);

            expect(el.style.display).toBe('block');
        });

        it('.class should add class when loading', () => {
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: { class: true } });
            loadingDirective.mounted(el, { modifiers: { class: true }, value: 'opacity-50' }, mockVnode);

            watchCallback(true);

            expect(el.classList.contains('opacity-50')).toBe(true);
        });

        it('.class should remove class when not loading', () => {
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: { class: true } });
            loadingDirective.mounted(el, { modifiers: { class: true }, value: 'opacity-50' }, mockVnode);

            watchCallback(true);
            watchCallback(false);

            expect(el.classList.contains('opacity-50')).toBe(false);
        });

        it('.class should handle multiple classes', () => {
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: { class: true } });
            loadingDirective.mounted(el, { modifiers: { class: true }, value: 'opacity-50 pointer-events-none' }, mockVnode);

            watchCallback(true);

            expect(el.classList.contains('opacity-50')).toBe(true);
            expect(el.classList.contains('pointer-events-none')).toBe(true);
        });

        it('.attr should add attribute when loading', () => {
            const el = document.createElement('button');

            loadingDirective.created(el, { modifiers: { attr: true } });
            loadingDirective.mounted(el, { modifiers: { attr: true }, value: 'disabled' }, mockVnode);

            watchCallback(true);

            expect(el.hasAttribute('disabled')).toBe(true);
        });

        it('.attr should remove attribute when not loading', () => {
            const el = document.createElement('button');

            loadingDirective.created(el, { modifiers: { attr: true } });
            loadingDirective.mounted(el, { modifiers: { attr: true }, value: 'disabled' }, mockVnode);

            watchCallback(true);
            watchCallback(false);

            expect(el.hasAttribute('disabled')).toBe(false);
        });

        it('.attr should default to disabled', () => {
            const el = document.createElement('button');

            loadingDirective.created(el, { modifiers: { attr: true } });
            loadingDirective.mounted(el, { modifiers: { attr: true }, value: undefined }, mockVnode);

            watchCallback(true);

            expect(el.hasAttribute('disabled')).toBe(true);
        });
    });

    describe('delay modifiers', () => {
        it('.delay should delay showing by 200ms (default)', () => {
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: { delay: true } });
            loadingDirective.mounted(el, { modifiers: { delay: true }, value: undefined }, mockVnode);

            watchCallback(true);

            // Not yet visible
            expect(el.style.display).toBe('none');

            vi.advanceTimersByTime(200);

            // Now visible
            expect(el.style.display).not.toBe('none');
        });

        it('.delay.shortest should delay by 50ms', () => {
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: { delay: true, shortest: true } });
            loadingDirective.mounted(el, { modifiers: { delay: true, shortest: true }, value: undefined }, mockVnode);

            watchCallback(true);

            vi.advanceTimersByTime(49);
            expect(el.style.display).toBe('none');

            vi.advanceTimersByTime(1);
            expect(el.style.display).not.toBe('none');
        });

        it('.delay.short should delay by 150ms', () => {
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: { delay: true, short: true } });
            loadingDirective.mounted(el, { modifiers: { delay: true, short: true }, value: undefined }, mockVnode);

            watchCallback(true);

            vi.advanceTimersByTime(149);
            expect(el.style.display).toBe('none');

            vi.advanceTimersByTime(1);
            expect(el.style.display).not.toBe('none');
        });

        it('.delay.long should delay by 1000ms', () => {
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: { delay: true, long: true } });
            loadingDirective.mounted(el, { modifiers: { delay: true, long: true }, value: undefined }, mockVnode);

            watchCallback(true);

            vi.advanceTimersByTime(999);
            expect(el.style.display).toBe('none');

            vi.advanceTimersByTime(1);
            expect(el.style.display).not.toBe('none');
        });

        it('.delay.longest should delay by 2000ms', () => {
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: { delay: true, longest: true } });
            loadingDirective.mounted(el, { modifiers: { delay: true, longest: true }, value: undefined }, mockVnode);

            watchCallback(true);

            vi.advanceTimersByTime(1999);
            expect(el.style.display).toBe('none');

            vi.advanceTimersByTime(1);
            expect(el.style.display).not.toBe('none');
        });

        it('should cancel delay timer when loading ends early', () => {
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: { delay: true } });
            loadingDirective.mounted(el, { modifiers: { delay: true }, value: undefined }, mockVnode);

            watchCallback(true);

            vi.advanceTimersByTime(100); // Half way through delay

            watchCallback(false); // Loading ends

            vi.advanceTimersByTime(200); // Let timer complete

            // Should still be hidden (timer was cancelled)
            expect(el.style.display).toBe('none');
        });
    });

    describe('unmounted()', () => {
        it('should stop watch and clear timer', () => {
            const el = document.createElement('div');

            loadingDirective.created(el, { modifiers: { delay: true } });
            loadingDirective.mounted(el, { modifiers: { delay: true }, value: undefined }, mockVnode);

            watchCallback(true);

            loadingDirective.unmounted(el);

            // Should not throw or cause issues
            vi.advanceTimersByTime(1000);
        });
    });
});
