/**
 * Tests for v-stream directive.
 *
 * The v-stream directive marks an element as a streaming target.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let streamDirective;
let mockRegisterStreamTarget;
let mockUnregisterStreamTarget;

beforeEach(async () => {
    vi.resetModules();

    mockRegisterStreamTarget = vi.fn();
    mockUnregisterStreamTarget = vi.fn();

    vi.doMock('@/features/request/stream.js', () => ({
        registerStreamTarget: mockRegisterStreamTarget,
        unregisterStreamTarget: mockUnregisterStreamTarget,
    }));

    const module = await import('@/directives/stream.js');
    streamDirective = module.default;
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('v-stream Directive', () => {
    describe('mounted()', () => {
        it('should register element as stream target', () => {
            const el = document.createElement('div');

            streamDirective.mounted(el, { value: 'output', modifiers: {} });

            expect(mockRegisterStreamTarget).toHaveBeenCalledWith('output', el, false);
        });

        it('should use .replace modifier', () => {
            const el = document.createElement('div');

            streamDirective.mounted(el, { value: 'status', modifiers: { replace: true } });

            expect(mockRegisterStreamTarget).toHaveBeenCalledWith('status', el, true);
        });

        it('should warn if target ID is not a string', () => {
            const el = document.createElement('div');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            streamDirective.mounted(el, { value: 123, modifiers: {} });

            expect(warnSpy).toHaveBeenCalled();
            expect(mockRegisterStreamTarget).not.toHaveBeenCalled();
            warnSpy.mockRestore();
        });

        it('should warn if target ID is empty', () => {
            const el = document.createElement('div');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            streamDirective.mounted(el, { value: '', modifiers: {} });

            expect(warnSpy).toHaveBeenCalled();
            expect(mockRegisterStreamTarget).not.toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });

    describe('updated()', () => {
        it('should re-register when target ID changes', () => {
            const el = document.createElement('div');

            streamDirective.mounted(el, { value: 'old-target', modifiers: {} });
            streamDirective.updated(el, { value: 'new-target', modifiers: {} });

            expect(mockUnregisterStreamTarget).toHaveBeenCalledWith('old-target');
            expect(mockRegisterStreamTarget).toHaveBeenCalledWith('new-target', el, false);
        });

        it('should not re-register if target ID unchanged', () => {
            const el = document.createElement('div');

            streamDirective.mounted(el, { value: 'output', modifiers: {} });
            vi.clearAllMocks();
            streamDirective.updated(el, { value: 'output', modifiers: {} });

            expect(mockUnregisterStreamTarget).not.toHaveBeenCalled();
        });

        it('should warn on invalid new target ID', () => {
            const el = document.createElement('div');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            streamDirective.mounted(el, { value: 'output', modifiers: {} });
            streamDirective.updated(el, { value: null, modifiers: {} });

            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });

    describe('unmounted()', () => {
        it('should unregister stream target', () => {
            const el = document.createElement('div');

            streamDirective.mounted(el, { value: 'output', modifiers: {} });
            streamDirective.unmounted(el);

            expect(mockUnregisterStreamTarget).toHaveBeenCalledWith('output');
        });

        it('should handle unmount without prior mount', () => {
            const el = document.createElement('div');

            expect(() => {
                streamDirective.unmounted(el);
            }).not.toThrow();
        });
    });
});
