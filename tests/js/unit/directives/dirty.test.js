/**
 * Tests for v-dirty directive.
 *
 * The v-dirty directive shows/hides elements or modifies attributes
 * based on dirty tracking state.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let dirtyDirective;
let mockLivue;
let mockVnode;
let watchCallback;

beforeEach(async () => {
    vi.resetModules();

    // Mock vue's watch function to capture the watcher callback
    vi.doMock('vue', () => ({
        watch: vi.fn((getter, callback, options) => {
            watchCallback = callback;
            // If immediate, call right away
            if (options && options.immediate) {
                callback(getter());
            }
            // Return stop function
            return vi.fn();
        }),
    }));

    const module = await import('@/directives/dirty.js');
    dirtyDirective = module.default;

    mockLivue = {
        isDirty: vi.fn(() => false),
    };

    mockVnode = {
        ctx: {
            setupState: {
                livue: mockLivue,
            },
        },
    };
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('v-dirty Directive', () => {
    describe('created()', () => {
        it('should hide element by default (clean state)', () => {
            const el = document.createElement('div');
            el.style.display = 'block';

            dirtyDirective.created(el, {
                modifiers: {},
            });

            expect(el.style.display).toBe('none');
        });

        it('should not hide element with .class modifier', () => {
            const el = document.createElement('div');
            el.style.display = 'block';

            dirtyDirective.created(el, {
                modifiers: { class: true },
            });

            expect(el.style.display).toBe('block');
        });

        it('should not hide element with .attr modifier', () => {
            const el = document.createElement('div');
            el.style.display = 'flex';

            dirtyDirective.created(el, {
                modifiers: { attr: true },
            });

            expect(el.style.display).toBe('flex');
        });
    });

    describe('mounted()', () => {
        it('should set up watcher for dirty state', () => {
            const el = document.createElement('div');
            dirtyDirective.created(el, { modifiers: {} });

            dirtyDirective.mounted(el, {
                modifiers: {},
                arg: null,
                value: undefined,
            }, mockVnode);

            // Verify isDirty was called (from immediate watcher)
            expect(mockLivue.isDirty).toHaveBeenCalled();
        });

        it('should check specific property when arg is provided', () => {
            const el = document.createElement('div');
            dirtyDirective.created(el, { modifiers: {} });

            dirtyDirective.mounted(el, {
                modifiers: {},
                arg: 'email',
                value: undefined,
            }, mockVnode);

            expect(mockLivue.isDirty).toHaveBeenCalledWith('email');
        });

        it('should show element when dirty (default mode)', () => {
            const el = document.createElement('div');
            dirtyDirective.created(el, { modifiers: {} });

            mockLivue.isDirty.mockReturnValue(true);

            dirtyDirective.mounted(el, {
                modifiers: {},
                arg: null,
                value: undefined,
            }, mockVnode);

            // After immediate watcher fires with isDirty=true, element should be visible
            expect(el.style.display).not.toBe('none');
        });

        it('should hide element when clean (default mode)', () => {
            const el = document.createElement('div');
            dirtyDirective.created(el, { modifiers: {} });

            mockLivue.isDirty.mockReturnValue(false);

            dirtyDirective.mounted(el, {
                modifiers: {},
                arg: null,
                value: undefined,
            }, mockVnode);

            expect(el.style.display).toBe('none');
        });

        it('should add class when dirty with .class modifier', () => {
            const el = document.createElement('div');
            dirtyDirective.created(el, { modifiers: { class: true } });

            mockLivue.isDirty.mockReturnValue(true);

            dirtyDirective.mounted(el, {
                modifiers: { class: true },
                arg: null,
                value: 'border-yellow-500',
            }, mockVnode);

            expect(el.classList.contains('border-yellow-500')).toBe(true);
        });

        it('should remove class when dirty with .class.remove modifier', () => {
            const el = document.createElement('div');
            el.classList.add('border-gray-300');
            dirtyDirective.created(el, { modifiers: { class: true, remove: true } });

            mockLivue.isDirty.mockReturnValue(true);

            dirtyDirective.mounted(el, {
                modifiers: { class: true, remove: true },
                arg: null,
                value: 'border-gray-300',
            }, mockVnode);

            expect(el.classList.contains('border-gray-300')).toBe(false);
        });

        it('should add attribute when dirty with .attr modifier', () => {
            const el = document.createElement('div');
            dirtyDirective.created(el, { modifiers: { attr: true } });

            mockLivue.isDirty.mockReturnValue(true);

            dirtyDirective.mounted(el, {
                modifiers: { attr: true },
                arg: null,
                value: 'data-modified',
            }, mockVnode);

            expect(el.hasAttribute('data-modified')).toBe(true);
        });

        it('should use data-dirty as default attr name', () => {
            const el = document.createElement('div');
            dirtyDirective.created(el, { modifiers: { attr: true } });

            mockLivue.isDirty.mockReturnValue(true);

            dirtyDirective.mounted(el, {
                modifiers: { attr: true },
                arg: null,
                value: undefined,
            }, mockVnode);

            expect(el.hasAttribute('data-dirty')).toBe(true);
        });

        it('should warn if livue context not found', () => {
            const el = document.createElement('div');
            dirtyDirective.created(el, { modifiers: {} });

            const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});

            dirtyDirective.mounted(el, {
                modifiers: {},
                arg: null,
                value: undefined,
            }, { ctx: {} });

            expect(consoleWarn).toHaveBeenCalledWith(
                expect.stringContaining('livue helper not found')
            );

            consoleWarn.mockRestore();
        });
    });

    describe('unmounted()', () => {
        it('should clean up watcher on unmount', () => {
            const el = document.createElement('div');
            dirtyDirective.created(el, { modifiers: {} });
            dirtyDirective.mounted(el, {
                modifiers: {},
                arg: null,
                value: undefined,
            }, mockVnode);

            // Should not throw
            dirtyDirective.unmounted(el);
        });

        it('should handle unmount on element without state', () => {
            const el = document.createElement('div');

            // Should not throw
            dirtyDirective.unmounted(el);
        });
    });
});
