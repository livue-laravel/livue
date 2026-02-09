/**
 * Tests for v-watch directive.
 *
 * The v-watch directive syncs to server when field values change.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let watchDirective;
let mockLivue;
let mockVnode;
let mockBinding;
let vueWatchCallback;

beforeEach(async () => {
    vi.resetModules();
    vi.useFakeTimers();

    // Mock vue's watch function
    vi.doMock('vue', () => ({
        watch: vi.fn((getter, callback) => {
            vueWatchCallback = callback;
            return vi.fn(); // stop function
        }),
    }));

    // Mock modifiers
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
    }));

    const module = await import('@/directives/watch.js');
    watchDirective = module.default;

    mockLivue = {
        sync: vi.fn(),
        call: vi.fn(),
    };

    mockVnode = {
        ctx: {
            setupState: {
                livue: mockLivue,
                name: { value: 'test' },
            },
        },
    };

    mockBinding = {
        instance: {
            $: {
                setupState: {
                    livue: mockLivue,
                    name: { value: 'test' },
                },
            },
        },
        modifiers: {},
        value: 'name',
    };
});

afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
});

describe('v-watch Directive', () => {
    describe('mounted()', () => {
        it('should set up a Vue watcher with default debounce', async () => {
            const el = document.createElement('div');

            watchDirective.mounted(el, mockBinding, mockVnode);

            // The vue watch mock was called via doMock
            const vue = await import('vue');
            expect(vue.watch).toHaveBeenCalled();
        });

        it('should warn if no path is provided', () => {
            const el = document.createElement('div');
            const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

            watchDirective.mounted(el, {
                ...mockBinding,
                value: undefined,
            }, mockVnode);

            expect(consoleWarn).toHaveBeenCalledWith(
                expect.stringContaining('No path found')
            );

            consoleWarn.mockRestore();
        });

        it('should warn if livue context not found', () => {
            const el = document.createElement('div');
            const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

            watchDirective.mounted(el, {
                ...mockBinding,
                instance: null,
            }, { ctx: {} });

            expect(consoleWarn).toHaveBeenCalledWith(
                expect.stringContaining('Could not find livue context')
            );

            consoleWarn.mockRestore();
        });

        it('should use data-watch-path attribute as fallback', async () => {
            const el = document.createElement('div');
            el.dataset.watchPath = 'email';

            watchDirective.mounted(el, {
                ...mockBinding,
                value: undefined,
            }, mockVnode);

            const vue = await import('vue');
            expect(vue.watch).toHaveBeenCalled();
        });

        it('should set up blur handler with .blur modifier', () => {
            const el = document.createElement('div');
            const addEventListenerSpy = vi.spyOn(el, 'addEventListener');

            watchDirective.mounted(el, {
                ...mockBinding,
                modifiers: { blur: true },
            }, mockVnode);

            expect(addEventListenerSpy).toHaveBeenCalledWith('focusout', expect.any(Function));
        });

        it('should call sync on blur event', () => {
            const el = document.createElement('div');

            watchDirective.mounted(el, {
                ...mockBinding,
                modifiers: { blur: true },
            }, mockVnode);

            el.dispatchEvent(new Event('focusout'));

            expect(mockLivue.sync).toHaveBeenCalled();
        });

        it('should sync after debounce when value changes', () => {
            const el = document.createElement('div');

            watchDirective.mounted(el, mockBinding, mockVnode);

            // Simulate the watcher callback
            if (vueWatchCallback) {
                vueWatchCallback();
            }

            // Before debounce
            expect(mockLivue.sync).not.toHaveBeenCalled();

            // After default debounce (150ms)
            vi.advanceTimersByTime(150);

            expect(mockLivue.sync).toHaveBeenCalled();
        });

        it('should parse custom debounce timing from modifiers', () => {
            const el = document.createElement('div');

            watchDirective.mounted(el, {
                ...mockBinding,
                modifiers: { debounce: true, '500ms': true },
            }, mockVnode);

            if (vueWatchCallback) {
                vueWatchCallback();
            }

            // Should not sync at 150ms
            vi.advanceTimersByTime(150);
            expect(mockLivue.sync).not.toHaveBeenCalled();

            // Should sync at 500ms
            vi.advanceTimersByTime(350);
            expect(mockLivue.sync).toHaveBeenCalled();
        });
    });

    describe('unmounted()', () => {
        it('should clean up watcher on unmount', () => {
            const el = document.createElement('div');

            watchDirective.mounted(el, mockBinding, mockVnode);
            watchDirective.unmounted(el);

            // Should not throw
        });

        it('should remove blur handler on unmount', () => {
            const el = document.createElement('div');
            const removeEventListenerSpy = vi.spyOn(el, 'removeEventListener');

            watchDirective.mounted(el, {
                ...mockBinding,
                modifiers: { blur: true },
            }, mockVnode);

            watchDirective.unmounted(el);

            expect(removeEventListenerSpy).toHaveBeenCalledWith('focusout', expect.any(Function));
        });

        it('should handle unmount on element without binding', () => {
            const el = document.createElement('div');

            // Should not throw
            watchDirective.unmounted(el);
        });
    });
});
