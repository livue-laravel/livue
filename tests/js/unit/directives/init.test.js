/**
 * Tests for v-init directive.
 *
 * The v-init directive executes a server method when the element is mounted.
 * It only accepts string method names (or [method, params] arrays), NOT callbacks.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

let initDirective;
let mockLivue;
let mockVnode;
let initializedComponents;

beforeEach(async () => {
    vi.resetModules();

    const module = await import('@/directives/init.js');
    initDirective = module.default;

    // Clear the internal _initializedComponents set by reimporting
    mockLivue = { call: vi.fn() };
    mockVnode = {
        ctx: { setupState: { livue: mockLivue } },
    };
});

describe('v-init Directive', () => {
    describe('mounted()', () => {
        it('should call livue method with string value', () => {
            const el = document.createElement('div');
            el.setAttribute('data-livue-id', 'comp-1');

            initDirective.mounted(el, { value: 'initialize' }, mockVnode);

            expect(mockLivue.call).toHaveBeenCalledWith('initialize', []);
        });

        it('should handle method with arguments array', () => {
            const el = document.createElement('div');
            el.setAttribute('data-livue-id', 'comp-2');

            initDirective.mounted(el, { value: ['setup', ['arg1', 'arg2']] }, mockVnode);

            expect(mockLivue.call).toHaveBeenCalledWith('setup', ['arg1', 'arg2']);
        });

        it('should handle method with empty params', () => {
            const el = document.createElement('div');
            el.setAttribute('data-livue-id', 'comp-3');

            initDirective.mounted(el, { value: ['loadData'] }, mockVnode);

            expect(mockLivue.call).toHaveBeenCalledWith('loadData', []);
        });

        it('should find livue from parent context', () => {
            const el = document.createElement('div');
            el.setAttribute('data-livue-id', 'comp-4');

            const parentVnode = {
                ctx: {
                    setupState: {},
                    parent: {
                        setupState: { livue: mockLivue },
                    },
                },
            };

            initDirective.mounted(el, { value: 'parentMethod' }, parentVnode);

            expect(mockLivue.call).toHaveBeenCalledWith('parentMethod', []);
        });

        it('should not throw if livue helper not found', () => {
            const el = document.createElement('div');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const emptyVnode = { ctx: { setupState: {} } };

            expect(() => {
                initDirective.mounted(el, { value: 'test' }, emptyVnode);
            }).not.toThrow();

            expect(warnSpy).toHaveBeenCalledWith(
                expect.stringContaining('livue helper not found')
            );

            warnSpy.mockRestore();
        });

        it('should warn on non-string method', () => {
            const el = document.createElement('div');
            el.setAttribute('data-livue-id', 'comp-5');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            initDirective.mounted(el, { value: 123 }, mockVnode);

            expect(warnSpy).toHaveBeenCalledWith(
                expect.stringContaining('expected method name'),
                expect.anything()
            );
            expect(mockLivue.call).not.toHaveBeenCalled();

            warnSpy.mockRestore();
        });

        it('should warn on function value', () => {
            const el = document.createElement('div');
            el.setAttribute('data-livue-id', 'comp-6');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            initDirective.mounted(el, { value: () => {} }, mockVnode);

            expect(warnSpy).toHaveBeenCalledWith(
                expect.stringContaining('expected method name'),
                expect.anything()
            );
            expect(mockLivue.call).not.toHaveBeenCalled();

            warnSpy.mockRestore();
        });
    });

    describe('initialization tracking', () => {
        it('should only call method once per component+method combination', async () => {
            // First call
            const el1 = document.createElement('div');
            el1.setAttribute('data-livue-id', 'comp-once');

            initDirective.mounted(el1, { value: 'loadOnce' }, mockVnode);
            expect(mockLivue.call).toHaveBeenCalledTimes(1);

            // Second call with same component+method should be skipped
            const el2 = document.createElement('div');
            el2.setAttribute('data-livue-id', 'comp-once');

            initDirective.mounted(el2, { value: 'loadOnce' }, mockVnode);
            expect(mockLivue.call).toHaveBeenCalledTimes(1); // Still 1
        });

        it('should call different methods on same component', async () => {
            vi.resetModules();
            const module = await import('@/directives/init.js');
            const directive = module.default;

            const el1 = document.createElement('div');
            el1.setAttribute('data-livue-id', 'comp-multi');

            directive.mounted(el1, { value: 'method1' }, mockVnode);

            const el2 = document.createElement('div');
            el2.setAttribute('data-livue-id', 'comp-multi');

            directive.mounted(el2, { value: 'method2' }, mockVnode);

            expect(mockLivue.call).toHaveBeenCalledTimes(2);
        });
    });
});
