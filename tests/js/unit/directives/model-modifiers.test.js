/**
 * Tests for v-model modifier directives.
 *
 * These directives work alongside v-model to add timing and type modifiers:
 * - v-debounce: Debounce input updates
 * - v-throttle: Throttle input updates
 * - v-blur: Update only on blur
 * - v-enter: Update only on Enter key
 * - v-boolean: Cast value to boolean
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let directives;
let mockState;
let mockVnode;
let mockBinding;

beforeEach(async () => {
    vi.resetModules();
    vi.useFakeTimers();

    // Mock modifiers module
    vi.doMock('@/helpers/modifiers.js', () => ({
        getDebounced: vi.fn((key, ms) => {
            let timer = null;
            return (fn) => {
                clearTimeout(timer);
                timer = setTimeout(fn, ms);
            };
        }),
        getThrottled: vi.fn((key, ms) => {
            let lastRun = 0;
            return (fn) => {
                const now = Date.now();
                if (now - lastRun >= ms) {
                    lastRun = now;
                    fn();
                }
            };
        }),
    }));

    directives = await import('@/directives/model-modifiers.js');

    // Create mock state with reactive-like behavior
    mockState = {
        search: '',
        query: '',
        name: '',
        term: '',
        active: false,
    };

    // Create mock vnode
    mockVnode = {
        type: 'input',
        props: {
            onInput: vi.fn(), // Indicates v-model is present
        },
        ctx: {
            setupState: {
                livue: {},
            },
        },
    };

    // Create mock binding
    mockBinding = {
        instance: {
            $: {
                setupState: mockState,
            },
            livue: {},
        },
        modifiers: {},
    };
});

afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
});

describe('Model Modifier Directives', () => {
    describe('v-debounce', () => {
        it('should debounce input updates', () => {
            const el = document.createElement('input');
            el.type = 'text';

            directives.debounceDirective.mounted(el, {
                ...mockBinding,
                arg: 'search',
                modifiers: { '300ms': true },
            }, mockVnode);

            // Simulate typing
            el.value = 'test';
            el.dispatchEvent(new Event('input', { bubbles: true }));

            // Should not update immediately
            expect(mockState.search).toBe('');

            vi.advanceTimersByTime(300);

            // Now should be updated
            expect(mockState.search).toBe('test');
        });

        it('should reset timer on subsequent inputs', () => {
            const el = document.createElement('input');
            el.type = 'text';

            directives.debounceDirective.mounted(el, {
                ...mockBinding,
                arg: 'search',
                modifiers: { '300ms': true },
            }, mockVnode);

            el.value = 'te';
            el.dispatchEvent(new Event('input', { bubbles: true }));

            vi.advanceTimersByTime(200);

            el.value = 'test';
            el.dispatchEvent(new Event('input', { bubbles: true }));

            vi.advanceTimersByTime(200);

            // Not yet (timer reset)
            expect(mockState.search).toBe('');

            vi.advanceTimersByTime(100);

            // Now updated to final value
            expect(mockState.search).toBe('test');
        });

        it('should use default 150ms when no timing specified', () => {
            const el = document.createElement('input');
            el.type = 'text';

            directives.debounceDirective.mounted(el, {
                ...mockBinding,
                arg: 'search',
                modifiers: {},
            }, mockVnode);

            el.value = 'test';
            el.dispatchEvent(new Event('input', { bubbles: true }));

            vi.advanceTimersByTime(149);
            expect(mockState.search).toBe('');

            vi.advanceTimersByTime(1);
            expect(mockState.search).toBe('test');
        });

        it('should throw if property not specified', () => {
            const el = document.createElement('input');

            expect(() => {
                directives.debounceDirective.mounted(el, {
                    ...mockBinding,
                    arg: undefined,
                    modifiers: {},
                }, mockVnode);
            }).toThrow('requires property name');
        });

        it('should throw if v-model missing on native input', () => {
            const el = document.createElement('input');

            expect(() => {
                directives.debounceDirective.mounted(el, {
                    ...mockBinding,
                    arg: 'search',
                    modifiers: {},
                }, {
                    ...mockVnode,
                    props: {}, // No v-model
                });
            }).toThrow('requires v-model');
        });
    });

    describe('v-throttle', () => {
        it('should throttle input updates', () => {
            const el = document.createElement('input');
            el.type = 'text';

            directives.throttleDirective.mounted(el, {
                ...mockBinding,
                arg: 'query',
                modifiers: { '300ms': true },
            }, mockVnode);

            // First input - should update immediately
            el.value = 'a';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            expect(mockState.query).toBe('a');

            // Subsequent inputs during cooldown - should be ignored
            el.value = 'ab';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            expect(mockState.query).toBe('a');

            el.value = 'abc';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            expect(mockState.query).toBe('a');

            // After cooldown
            vi.advanceTimersByTime(300);

            el.value = 'abcd';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            expect(mockState.query).toBe('abcd');
        });
    });

    describe('v-blur', () => {
        it('should update only on blur', () => {
            const el = document.createElement('input');
            el.type = 'text';

            directives.blurDirective.mounted(el, {
                ...mockBinding,
                arg: 'name',
                modifiers: {},
            }, mockVnode);

            // Input events should not update
            el.value = 'John';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            expect(mockState.name).toBe('');

            // Blur should update
            el.dispatchEvent(new Event('blur'));
            expect(mockState.name).toBe('John');
        });

        it('should clean up blur listener on unmount', () => {
            const el = document.createElement('input');
            const removeEventListenerSpy = vi.spyOn(el, 'removeEventListener');

            directives.blurDirective.mounted(el, {
                ...mockBinding,
                arg: 'name',
                modifiers: {},
            }, mockVnode);

            directives.blurDirective.unmounted(el);

            expect(removeEventListenerSpy).toHaveBeenCalledWith('blur', expect.any(Function));
        });
    });

    describe('v-enter', () => {
        it('should update only on Enter key', () => {
            const el = document.createElement('input');
            el.type = 'text';

            directives.enterDirective.mounted(el, {
                ...mockBinding,
                arg: 'term',
                modifiers: {},
            }, mockVnode);

            // Input events should not update
            el.value = 'search term';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            expect(mockState.term).toBe('');

            // Other keys should not update
            el.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
            expect(mockState.term).toBe('');

            // Enter should update
            el.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
            expect(mockState.term).toBe('search term');
        });

        it('should clean up keyup listener on unmount', () => {
            const el = document.createElement('input');
            const removeEventListenerSpy = vi.spyOn(el, 'removeEventListener');

            directives.enterDirective.mounted(el, {
                ...mockBinding,
                arg: 'term',
                modifiers: {},
            }, mockVnode);

            directives.enterDirective.unmounted(el);

            expect(removeEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function));
        });
    });

    describe('v-boolean', () => {
        it('should cast truthy values to true', () => {
            const el = document.createElement('input');
            el.type = 'text';

            directives.booleanDirective.mounted(el, {
                ...mockBinding,
                arg: 'active',
                modifiers: {},
            }, mockVnode);

            el.value = 'yes';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            expect(mockState.active).toBe(true);
        });

        it('should cast empty string to false', () => {
            const el = document.createElement('input');
            el.type = 'text';
            mockState.active = true;

            directives.booleanDirective.mounted(el, {
                ...mockBinding,
                arg: 'active',
                modifiers: {},
            }, mockVnode);

            el.value = '';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            expect(mockState.active).toBe(false);
        });

        it('should cast "false" string to false', () => {
            const el = document.createElement('input');
            el.type = 'text';
            mockState.active = true;

            directives.booleanDirective.mounted(el, {
                ...mockBinding,
                arg: 'active',
                modifiers: {},
            }, mockVnode);

            el.value = 'false';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            expect(mockState.active).toBe(false);
        });

        it('should cast "0" string to false', () => {
            const el = document.createElement('input');
            el.type = 'text';
            mockState.active = true;

            directives.booleanDirective.mounted(el, {
                ...mockBinding,
                arg: 'active',
                modifiers: {},
            }, mockVnode);

            el.value = '0';
            el.dispatchEvent(new Event('input', { bubbles: true }));
            expect(mockState.active).toBe(false);
        });

        it('should handle checkbox inputs', () => {
            const el = document.createElement('input');
            el.type = 'checkbox';

            directives.booleanDirective.mounted(el, {
                ...mockBinding,
                arg: 'active',
                modifiers: {},
            }, mockVnode);

            el.checked = true;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            expect(mockState.active).toBe(true);

            el.checked = false;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            expect(mockState.active).toBe(false);
        });
    });

    describe('Vue component integration', () => {
        it('should find input inside Vue component wrapper', () => {
            // Create a wrapper div (like a Vue component would render)
            const wrapper = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'text';
            wrapper.appendChild(input);

            // Vnode type is not a native form element
            const componentVnode = {
                ...mockVnode,
                type: 'div',
                props: {}, // No v-model check for components
            };

            directives.debounceDirective.mounted(wrapper, {
                ...mockBinding,
                arg: 'search',
                modifiers: { '100ms': true },
            }, componentVnode);

            // Should attach listener to internal input
            input.value = 'test';
            input.dispatchEvent(new Event('input', { bubbles: true }));

            vi.advanceTimersByTime(100);

            expect(mockState.search).toBe('test');
        });

        it('should warn when no input found in component', () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            const wrapper = document.createElement('div');
            // No input inside

            const componentVnode = {
                ...mockVnode,
                type: 'div',
                props: {},
            };

            directives.debounceDirective.mounted(wrapper, {
                ...mockBinding,
                arg: 'search',
                modifiers: {},
            }, componentVnode);

            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Could not find input'));

            warnSpy.mockRestore();
        });
    });
});
