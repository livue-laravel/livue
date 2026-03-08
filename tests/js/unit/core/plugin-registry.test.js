import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock hooks module before any imports
vi.mock('@/helpers/hooks.js', () => ({
    hook: vi.fn(() => vi.fn()),
    getAvailableHooks: vi.fn(() => []),
}));

import {
    registerPlugin,
    disablePlugin,
    applyPlugins,
    getPluginComposables,
    getPluginDirectives,
    _reset,
} from '@/core/plugin-registry.js';

beforeEach(() => {
    _reset();
    vi.clearAllMocks();
});

describe('plugin-registry', () => {
    describe('registerPlugin()', () => {
        it('should queue a plugin (install is not called immediately)', () => {
            const plugin = { install: vi.fn() };
            registerPlugin(plugin);
            expect(plugin.install).not.toHaveBeenCalled();
        });

        it('should apply a plugin when applyPlugins() is called', () => {
            const plugin = { install: vi.fn() };
            registerPlugin(plugin, { x: 1 });
            applyPlugins({});
            expect(plugin.install).toHaveBeenCalledOnce();
        });

        it('should deduplicate by name: second registration replaces the first', () => {
            const plugin1 = { name: 'test-plugin', install: vi.fn() };
            const plugin2 = { name: 'test-plugin', install: vi.fn() };

            registerPlugin(plugin1);
            registerPlugin(plugin2);
            applyPlugins({});

            expect(plugin1.install).not.toHaveBeenCalled();
            expect(plugin2.install).toHaveBeenCalledOnce();
        });

        it('should allow multiple unnamed plugins', () => {
            const plugin1 = { install: vi.fn() };
            const plugin2 = { install: vi.fn() };

            registerPlugin(plugin1);
            registerPlugin(plugin2);
            applyPlugins({});

            expect(plugin1.install).toHaveBeenCalledOnce();
            expect(plugin2.install).toHaveBeenCalledOnce();
        });

        it('should warn and skip plugins without install() method', () => {
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            registerPlugin({ name: 'invalid-plugin' });
            applyPlugins({});

            expect(consoleSpy).toHaveBeenCalledWith('[LiVue] Plugin must have an install() method');
            consoleSpy.mockRestore();
        });
    });

    describe('disablePlugin()', () => {
        it('should prevent a named plugin from being applied', () => {
            const plugin = { name: 'livue:progress', install: vi.fn() };
            registerPlugin(plugin);
            disablePlugin('livue:progress');
            applyPlugins({});
            expect(plugin.install).not.toHaveBeenCalled();
        });

        it('should not affect plugins with different names', () => {
            const plugin1 = { name: 'livue:progress', install: vi.fn() };
            const plugin2 = { name: 'livue:devtools', install: vi.fn() };
            registerPlugin(plugin1);
            registerPlugin(plugin2);
            disablePlugin('livue:progress');
            applyPlugins({});

            expect(plugin1.install).not.toHaveBeenCalled();
            expect(plugin2.install).toHaveBeenCalledOnce();
        });
    });

    describe('applyPlugins()', () => {
        it('should call install(api, options, runtime) with correct arguments', () => {
            const plugin = { name: 'test', install: vi.fn() };
            const options = { foo: 'bar' };
            const runtime = { setup: vi.fn() };

            registerPlugin(plugin, options);
            applyPlugins(runtime);

            expect(plugin.install).toHaveBeenCalledWith(
                expect.objectContaining({ hook: expect.any(Function), composable: expect.any(Function), directive: expect.any(Function), setup: expect.any(Function) }),
                options,
                runtime
            );
        });

        it('should catch errors in install() without throwing', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            const plugin = { name: 'broken', install: () => { throw new Error('oops'); } };

            registerPlugin(plugin);
            expect(() => applyPlugins({})).not.toThrow();
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Error installing plugin broken'),
                expect.any(Error)
            );
            consoleSpy.mockRestore();
        });

        it('api.hook() delegates to the hooks module', async () => {
            const { hook } = await import('@/helpers/hooks.js');
            const fn = vi.fn();
            const plugin = { name: 'p', install: (api) => api.hook('request.started', fn) };

            registerPlugin(plugin);
            applyPlugins({});

            expect(hook).toHaveBeenCalledWith('request.started', fn);
        });

        it('api.composable() populates getPluginComposables()', () => {
            const value = { foo: 'bar' };
            const plugin = { name: 'p', install: (api) => api.composable('myComp', value) };

            registerPlugin(plugin);
            applyPlugins({});

            expect(getPluginComposables()).toEqual({ myComp: value });
        });

        it('api.directive() populates getPluginDirectives()', () => {
            const def = { mounted: vi.fn() };
            const plugin = { name: 'p', install: (api) => api.directive('my-dir', def) };

            registerPlugin(plugin);
            applyPlugins({});

            expect(getPluginDirectives()).toEqual([{ name: 'my-dir', directive: def }]);
        });

        it('api.setup() calls runtime.setup()', () => {
            const runtime = { setup: vi.fn() };
            const cb = vi.fn();
            const plugin = { name: 'p', install: (api) => api.setup(cb) };

            registerPlugin(plugin);
            applyPlugins(runtime);

            expect(runtime.setup).toHaveBeenCalledWith(cb);
        });
    });

    describe('getPluginComposables()', () => {
        it('should return empty object initially', () => {
            expect(getPluginComposables()).toEqual({});
        });

        it('multiple composables are merged', () => {
            const plugin = {
                name: 'p',
                install: (api) => {
                    api.composable('a', 1);
                    api.composable('b', 2);
                },
            };
            registerPlugin(plugin);
            applyPlugins({});
            expect(getPluginComposables()).toEqual({ a: 1, b: 2 });
        });
    });

    describe('getPluginDirectives()', () => {
        it('should return empty array initially', () => {
            expect(getPluginDirectives()).toEqual([]);
        });

        it('multiple directives from multiple plugins are accumulated', () => {
            const def1 = { mounted: vi.fn() };
            const def2 = { mounted: vi.fn() };
            registerPlugin({ name: 'p1', install: (api) => api.directive('dir-a', def1) });
            registerPlugin({ name: 'p2', install: (api) => api.directive('dir-b', def2) });
            applyPlugins({});

            expect(getPluginDirectives()).toEqual([
                { name: 'dir-a', directive: def1 },
                { name: 'dir-b', directive: def2 },
            ]);
        });
    });
});
