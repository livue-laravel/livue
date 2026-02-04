/**
 * Tests for v-model-livue directive.
 *
 * The v-model-livue directive provides enhanced two-way binding
 * with timing and type modifiers.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';

let modelDirective;
let mockLivue;
let mockState;
let mockVnode;

beforeEach(async () => {
    vi.resetModules();

    const module = await import('@/directives/model.js');
    modelDirective = module.default;

    mockState = {
        name: ref('initial'),
        count: ref(0),
        active: ref(false),
    };

    mockLivue = { call: vi.fn() };

    mockVnode = {
        ctx: {
            setupState: {
                livue: mockLivue,
                ...mockState,
            },
        },
        component: null,
    };
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('v-model-livue Directive', () => {
    describe('mounted()', () => {
        it('should set initial value on input', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'name',
                modifiers: {},
            }, mockVnode);

            expect(input.value).toBe('initial');
        });

        it('should update state on input event', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'name',
                modifiers: {},
            }, mockVnode);

            input.value = 'new value';
            input.dispatchEvent(new Event('input'));

            expect(mockState.name.value).toBe('new value');
        });

        it('should warn without property argument', () => {
            const input = document.createElement('input');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            modelDirective.mounted(input, {
                arg: undefined,
                modifiers: {},
            }, mockVnode);

            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });

        it('should warn without livue context', () => {
            const input = document.createElement('input');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            modelDirective.mounted(input, {
                arg: 'name',
                modifiers: {},
            }, { ctx: {} });

            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });

    describe('.blur modifier', () => {
        it('should update only on blur event', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'name',
                modifiers: { blur: true },
            }, mockVnode);

            input.value = 'typing...';
            input.dispatchEvent(new Event('input'));
            expect(mockState.name.value).toBe('initial');

            input.dispatchEvent(new Event('blur'));
            expect(mockState.name.value).toBe('typing...');
        });
    });

    describe('.change/.lazy modifier', () => {
        it('should update on change event with .change', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'name',
                modifiers: { change: true },
            }, mockVnode);

            input.value = 'changed';
            input.dispatchEvent(new Event('change'));

            expect(mockState.name.value).toBe('changed');
        });

        it('should update on change event with .lazy', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'name',
                modifiers: { lazy: true },
            }, mockVnode);

            input.value = 'lazy change';
            input.dispatchEvent(new Event('change'));

            expect(mockState.name.value).toBe('lazy change');
        });
    });

    describe('.enter modifier', () => {
        it('should update only on Enter key', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'name',
                modifiers: { enter: true },
            }, mockVnode);

            input.value = 'typing...';
            input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab' }));
            expect(mockState.name.value).toBe('initial');

            input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
            expect(mockState.name.value).toBe('typing...');
        });
    });

    describe('.number modifier', () => {
        it('should cast value to number', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'count',
                modifiers: { number: true },
            }, mockVnode);

            input.value = '42';
            input.dispatchEvent(new Event('input'));

            expect(mockState.count.value).toBe(42);
        });

        it('should return 0 for NaN', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'count',
                modifiers: { number: true },
            }, mockVnode);

            input.value = 'not a number';
            input.dispatchEvent(new Event('input'));

            expect(mockState.count.value).toBe(0);
        });
    });

    describe('.boolean modifier', () => {
        it('should cast value to boolean', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'active',
                modifiers: { boolean: true },
            }, mockVnode);

            input.value = 'yes';
            input.dispatchEvent(new Event('input'));

            expect(mockState.active.value).toBe(true);
        });

        it('should handle "false" string as false', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'active',
                modifiers: { boolean: true },
            }, mockVnode);

            input.value = 'false';
            input.dispatchEvent(new Event('input'));

            expect(mockState.active.value).toBe(false);
        });

        it('should handle "0" string as false', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'active',
                modifiers: { boolean: true },
            }, mockVnode);

            input.value = '0';
            input.dispatchEvent(new Event('input'));

            expect(mockState.active.value).toBe(false);
        });
    });

    describe('checkbox handling', () => {
        it('should bind to checked property', () => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            modelDirective.mounted(checkbox, {
                arg: 'active',
                modifiers: {},
            }, mockVnode);

            checkbox.checked = true;
            checkbox.dispatchEvent(new Event('input'));

            expect(mockState.active.value).toBe(true);
        });

        it('should set initial checked state', () => {
            mockState.active.value = true;
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            modelDirective.mounted(checkbox, {
                arg: 'active',
                modifiers: {},
            }, mockVnode);

            expect(checkbox.checked).toBe(true);
        });
    });

    describe('select handling', () => {
        it('should handle single select', () => {
            const select = document.createElement('select');
            const option1 = document.createElement('option');
            option1.value = 'a';
            const option2 = document.createElement('option');
            option2.value = 'b';
            select.appendChild(option1);
            select.appendChild(option2);

            modelDirective.mounted(select, {
                arg: 'name',
                modifiers: {},
            }, mockVnode);

            select.value = 'b';
            select.dispatchEvent(new Event('input'));

            expect(mockState.name.value).toBe('b');
        });

        it('should handle multiple select', () => {
            mockState.items = ref([]);
            mockVnode.ctx.setupState.items = mockState.items;

            const select = document.createElement('select');
            select.multiple = true;
            const option1 = document.createElement('option');
            option1.value = 'a';
            const option2 = document.createElement('option');
            option2.value = 'b';
            select.appendChild(option1);
            select.appendChild(option2);

            modelDirective.mounted(select, {
                arg: 'items',
                modifiers: {},
            }, mockVnode);

            option1.selected = true;
            option2.selected = true;
            select.dispatchEvent(new Event('input'));

            expect(mockState.items.value).toEqual(['a', 'b']);
        });
    });

    describe('debounce/throttle', () => {
        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('should debounce input', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'name',
                modifiers: { debounce: true, '300ms': true },
            }, mockVnode);

            input.value = 'a';
            input.dispatchEvent(new Event('input'));
            input.value = 'ab';
            input.dispatchEvent(new Event('input'));
            input.value = 'abc';
            input.dispatchEvent(new Event('input'));

            expect(mockState.name.value).toBe('initial');

            vi.advanceTimersByTime(300);

            expect(mockState.name.value).toBe('abc');
        });

        it('should use .live modifier with default debounce', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'name',
                modifiers: { live: true },
            }, mockVnode);

            input.value = 'live typing';
            input.dispatchEvent(new Event('input'));

            expect(mockState.name.value).toBe('initial');

            vi.advanceTimersByTime(150);

            expect(mockState.name.value).toBe('live typing');
        });
    });

    describe('updated()', () => {
        it('should sync input value from state', () => {
            const input = document.createElement('input');

            modelDirective.mounted(input, {
                arg: 'name',
                modifiers: {},
            }, mockVnode);

            mockState.name.value = 'updated from server';

            modelDirective.updated(input, {
                arg: 'name',
                modifiers: {},
            }, mockVnode);

            expect(input.value).toBe('updated from server');
        });
    });

    describe('unmounted()', () => {
        it('should remove event listener', () => {
            const input = document.createElement('input');
            const removeEventListenerSpy = vi.spyOn(input, 'removeEventListener');

            modelDirective.mounted(input, {
                arg: 'name',
                modifiers: {},
            }, mockVnode);

            modelDirective.unmounted(input);

            expect(removeEventListenerSpy).toHaveBeenCalledWith('input', expect.any(Function));
        });

        it('should remove keyup listener for .enter', () => {
            const input = document.createElement('input');
            const removeEventListenerSpy = vi.spyOn(input, 'removeEventListener');

            modelDirective.mounted(input, {
                arg: 'name',
                modifiers: { enter: true },
            }, mockVnode);

            modelDirective.unmounted(input);

            expect(removeEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function));
        });
    });
});
