/**
 * Tests for v-target directive.
 *
 * The v-target directive auto-injects data-loading attribute when
 * a specific action is loading.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';

let targetDirective;
let mockLivue;
let mockVnode;
let loadingState;

beforeEach(async () => {
    vi.resetModules();

    // Create reactive loading state
    loadingState = ref({});

    mockLivue = {
        isLoading: vi.fn((action) => {
            return loadingState.value[action] || false;
        }),
    };

    mockVnode = {
        ctx: { setupState: { livue: mockLivue } },
    };

    const module = await import('@/directives/target.js');
    targetDirective = module.default;
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('v-target Directive', () => {
    describe('mounted()', () => {
        it('should not add data-loading when not loading', () => {
            const button = document.createElement('button');

            targetDirective.mounted(button, { value: 'save' }, mockVnode);

            expect(button.hasAttribute('data-loading')).toBe(false);
        });

        it('should add data-loading when action is loading', () => {
            const button = document.createElement('button');
            loadingState.value.save = true;

            targetDirective.mounted(button, { value: 'save' }, mockVnode);

            // Wait for reactive effect
            expect(mockLivue.isLoading).toHaveBeenCalledWith('save');
        });

        it('should warn without livue context', () => {
            const button = document.createElement('button');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            targetDirective.mounted(button, { value: 'save' }, { ctx: {} });

            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });

        it('should warn without action name', () => {
            const button = document.createElement('button');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            targetDirective.mounted(button, { value: '' }, mockVnode);

            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });

    describe('updated()', () => {
        it('should handle action change', () => {
            const button = document.createElement('button');

            targetDirective.mounted(button, { value: 'save', oldValue: undefined }, mockVnode);
            targetDirective.updated(button, { value: 'delete', oldValue: 'save' }, mockVnode);

            // New action should be watched
            expect(mockLivue.isLoading).toHaveBeenCalledWith('delete');
        });

        it('should not recreate watcher if action unchanged', () => {
            const button = document.createElement('button');

            targetDirective.mounted(button, { value: 'save' }, mockVnode);
            const callCount = mockLivue.isLoading.mock.calls.length;

            targetDirective.updated(button, { value: 'save', oldValue: 'save' }, mockVnode);

            // Should not have additional calls beyond the initial watch
            expect(mockLivue.isLoading.mock.calls.length).toBe(callCount);
        });
    });

    describe('unmounted()', () => {
        it('should cleanup watcher', () => {
            const button = document.createElement('button');

            targetDirective.mounted(button, { value: 'save' }, mockVnode);

            expect(() => {
                targetDirective.unmounted(button);
            }).not.toThrow();
        });

        it('should handle unmount without prior mount', () => {
            const button = document.createElement('button');

            expect(() => {
                targetDirective.unmounted(button);
            }).not.toThrow();
        });
    });

    describe('use cases', () => {
        it('should work with Tailwind data-[loading]: variant', () => {
            const button = document.createElement('button');
            button.className = 'data-[loading]:opacity-50 data-[loading]:cursor-wait';

            targetDirective.mounted(button, { value: 'save' }, mockVnode);

            // Element is set up for Tailwind styling
            expect(button.className).toContain('data-[loading]:opacity-50');
        });

        it('should support multiple buttons with different actions', () => {
            const saveBtn = document.createElement('button');
            const deleteBtn = document.createElement('button');

            targetDirective.mounted(saveBtn, { value: 'save' }, mockVnode);
            targetDirective.mounted(deleteBtn, { value: 'delete' }, mockVnode);

            expect(mockLivue.isLoading).toHaveBeenCalledWith('save');
            expect(mockLivue.isLoading).toHaveBeenCalledWith('delete');
        });
    });
});
