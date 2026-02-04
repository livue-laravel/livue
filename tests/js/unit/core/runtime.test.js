/**
 * Tests for LiVue Runtime.
 *
 * The runtime is the core orchestrator that:
 * - Discovers LiVue components on the page
 * - Mounts Vue apps only on root elements (not nested)
 * - Handles islands as separate Vue apps
 * - Manages MutationObserver for dynamic component changes
 * - Prevents double boot during SPA navigation
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// We need to reset the runtime singleton between tests
let LiVue;

// Mock LiVueComponent - track created instances
let mockComponents = [];

beforeEach(async () => {
    vi.resetModules();

    // Mock LiVueComponent with a proper constructor
    vi.doMock('@/core/component.js', () => ({
        default: function MockLiVueComponent(el) {
            this.componentId = el.dataset.livueId;
            this.name = JSON.parse(el.dataset.livueSnapshot || '{}').memo?.name || 'unknown';
            this.el = el;
            this.destroy = vi.fn();
            this.state = {};
            this._rootLivue = {};
            this._childRegistry = {};
            mockComponents.push(this);
        },
    }));

    // Mock navigation module
    vi.doMock('@/features/navigation.js', () => ({
        initNavigation: vi.fn(),
        navigateTo: vi.fn(),
        configure: vi.fn(),
        clearCache: vi.fn(),
        prefetchUrl: vi.fn(),
        isNavigating: vi.fn(() => false),
    }));

    // Mock progress module
    vi.doMock('@/helpers/progress.js', () => ({
        default: {
            start: vi.fn(),
            done: vi.fn(),
            configure: vi.fn(),
        },
    }));

    // Mock directives
    vi.doMock('@/directives/index.js', () => ({
        registerBuiltInDirectives: vi.fn(),
    }));

    // Mock hooks
    vi.doMock('@/helpers/hooks.js', () => ({
        hook: vi.fn(() => vi.fn()),
        getAvailableHooks: vi.fn(() => []),
    }));

    // Mock errors
    vi.doMock('@/helpers/errors.js', () => ({
        onError: vi.fn(),
    }));

    // Mock echo
    vi.doMock('@/features/echo.js', () => ({
        isEchoAvailable: vi.fn(() => false),
        getDebugInfo: vi.fn(() => ({})),
        leaveAll: vi.fn(),
    }));

    // Mock devtools
    vi.doMock('@/devtools/index.js', () => ({
        init: vi.fn(),
        toggle: vi.fn(),
        isCollecting: vi.fn(() => false),
    }));

    // Mock HMR
    vi.doMock('@/features/hmr/hmr.js', () => ({
        setup: vi.fn(),
        isAvailable: vi.fn(() => false),
        isEnabled: vi.fn(() => false),
        enable: vi.fn(),
        disable: vi.fn(),
        configure: vi.fn(),
        onUpdate: vi.fn(),
        trigger: vi.fn(),
    }));

    // Import fresh runtime
    const module = await import('@/core/runtime.js');
    LiVue = module.default;

    // Reset DOM
    document.body.innerHTML = '';
    mockComponents = [];
});

afterEach(() => {
    // Clean up runtime state
    if (LiVue) {
        LiVue.destroy();
    }
    vi.clearAllMocks();
});

describe('LiVueRuntime', () => {
    describe('boot()', () => {
        it('should discover and mount root components', () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            LiVue.boot();

            expect(LiVue.components.size).toBe(1);
            expect(LiVue.components.has('comp-1')).toBe(true);
        });

        it('should mount multiple root components', () => {
            const el1 = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            const el2 = createMockLiVueElement({ id: 'comp-2', name: 'timer' });
            document.body.appendChild(el1);
            document.body.appendChild(el2);

            LiVue.boot();

            expect(LiVue.components.size).toBe(2);
            expect(LiVue.components.has('comp-1')).toBe(true);
            expect(LiVue.components.has('comp-2')).toBe(true);
        });

        it('should NOT mount nested components as separate Vue apps', () => {
            const parent = createMockLiVueElement({ id: 'parent', name: 'parent' });
            const child = createMockLiVueElement({ id: 'child', name: 'child' });
            parent.appendChild(child);
            document.body.appendChild(parent);

            LiVue.boot();

            // Only parent should be in components map
            expect(LiVue.components.size).toBe(1);
            expect(LiVue.components.has('parent')).toBe(true);
            expect(LiVue.components.has('child')).toBe(false);
        });

        it('should mount islands as separate Vue apps', () => {
            const parent = createMockLiVueElement({ id: 'parent', name: 'parent' });
            const island = createMockLiVueElement({ id: 'island', name: 'island', island: true });
            parent.appendChild(island);
            document.body.appendChild(parent);

            LiVue.boot();

            // Both parent and island should be mounted
            expect(LiVue.components.size).toBe(2);
            expect(LiVue.components.has('parent')).toBe(true);
            expect(LiVue.components.has('island')).toBe(true);
        });

        it('should NOT re-mount existing components on second boot', () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            LiVue.boot();
            const firstComponent = LiVue.components.get('comp-1');

            // Boot again
            LiVue.boot();
            const secondComponent = LiVue.components.get('comp-1');

            // Should be the same instance
            expect(firstComponent).toBe(secondComponent);
            // Component should only be created once
            expect(mockComponents.length).toBe(1);
        });

        it('should start MutationObserver after boot', () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            LiVue.boot();

            expect(LiVue._observer).not.toBeNull();
        });

        it('should register built-in directives', async () => {
            const { registerBuiltInDirectives } = await import('@/directives/index.js');

            LiVue.boot();

            expect(registerBuiltInDirectives).toHaveBeenCalled();
        });

        it('should initialize navigation module', async () => {
            const { initNavigation } = await import('@/features/navigation.js');

            LiVue.boot();

            expect(initNavigation).toHaveBeenCalledWith(LiVue);
        });
    });

    describe('reboot()', () => {
        it('should destroy existing components and remount', () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            LiVue.boot();
            const originalComponent = LiVue.components.get('comp-1');

            LiVue.reboot();

            // Original component should have been destroyed
            expect(originalComponent.destroy).toHaveBeenCalled();
            // New component should be mounted
            expect(LiVue.components.size).toBe(1);
        });

        it('should stop observer before reboot and restart after', () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            LiVue.boot();
            const observerBefore = LiVue._observer;

            LiVue.reboot();

            // Observer should be restarted (new instance)
            expect(LiVue._observer).not.toBeNull();
        });
    });

    describe('rebootPreserving()', () => {
        it('should preserve components with matching IDs', () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            LiVue.boot();
            const originalComponent = LiVue.components.get('comp-1');

            // Set up preserving IDs (simulating navigation)
            LiVue._preservingIds = new Set(['comp-1']);

            LiVue.rebootPreserving();

            // Component should NOT be destroyed
            expect(originalComponent.destroy).not.toHaveBeenCalled();
            // Should still be the same instance
            expect(LiVue.components.get('comp-1')).toBe(originalComponent);
        });

        it('should mount NEW components only', () => {
            const el1 = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el1);

            LiVue.boot();

            // Add a new component to DOM
            const el2 = createMockLiVueElement({ id: 'comp-2', name: 'timer' });
            document.body.appendChild(el2);

            // Set up preserving IDs
            LiVue._preservingIds = new Set(['comp-1']);

            LiVue.rebootPreserving();

            // Both components should be in the map
            expect(LiVue.components.size).toBe(2);
            expect(LiVue.components.has('comp-1')).toBe(true);
            expect(LiVue.components.has('comp-2')).toBe(true);
        });
    });

    describe('destroy()', () => {
        it('should destroy all components', () => {
            const el1 = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            const el2 = createMockLiVueElement({ id: 'comp-2', name: 'timer' });
            document.body.appendChild(el1);
            document.body.appendChild(el2);

            LiVue.boot();

            const comp1 = LiVue.components.get('comp-1');
            const comp2 = LiVue.components.get('comp-2');

            LiVue.destroy();

            expect(comp1.destroy).toHaveBeenCalled();
            expect(comp2.destroy).toHaveBeenCalled();
            expect(LiVue.components.size).toBe(0);
        });

        it('should clear preserving IDs', () => {
            LiVue._preservingIds = new Set(['comp-1']);

            LiVue.destroy();

            expect(LiVue._preservingIds).toBeNull();
        });
    });

    describe('destroyExcept()', () => {
        it('should preserve specified components', () => {
            const el1 = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            const el2 = createMockLiVueElement({ id: 'comp-2', name: 'timer' });
            document.body.appendChild(el1);
            document.body.appendChild(el2);

            LiVue.boot();

            const comp1 = LiVue.components.get('comp-1');
            const comp2 = LiVue.components.get('comp-2');

            LiVue.destroyExcept(new Set(['comp-1']));

            // comp-1 should be preserved
            expect(comp1.destroy).not.toHaveBeenCalled();
            expect(LiVue.components.has('comp-1')).toBe(true);

            // comp-2 should be destroyed
            expect(comp2.destroy).toHaveBeenCalled();
            expect(LiVue.components.has('comp-2')).toBe(false);
        });

        it('should store preserving IDs for observer protection', () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            LiVue.boot();

            const preserveIds = new Set(['comp-1']);
            LiVue.destroyExcept(preserveIds);

            expect(LiVue._preservingIds).toBe(preserveIds);
        });
    });

    describe('setup()', () => {
        it('should accumulate setup callbacks', () => {
            const callback1 = vi.fn();
            const callback2 = vi.fn();

            LiVue.setup(callback1);
            LiVue.setup(callback2);

            expect(LiVue._setupCallbacks).toContain(callback1);
            expect(LiVue._setupCallbacks).toContain(callback2);
        });

        it('should reject non-function callbacks', () => {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            LiVue.setup('not a function');

            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('requires a function'));

            consoleSpy.mockRestore();
        });

        it('should not add non-function to callbacks', () => {
            const initialLength = LiVue._setupCallbacks.length;

            LiVue.setup('not a function');
            LiVue.setup(123);
            LiVue.setup(null);

            expect(LiVue._setupCallbacks.length).toBe(initialLength);
        });
    });

    describe('find() / getComponent()', () => {
        it('should return component by ID', () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            LiVue.boot();

            const found = LiVue.find('comp-1');
            expect(found).toBeDefined();
            expect(found.componentId).toBe('comp-1');
        });

        it('should return undefined for non-existent ID', () => {
            LiVue.boot();

            expect(LiVue.find('nonexistent')).toBeUndefined();
        });

        it('should be aliased as getComponent', () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            LiVue.boot();

            expect(LiVue.getComponent('comp-1')).toBe(LiVue.find('comp-1'));
        });
    });

    describe('first()', () => {
        it('should return first mounted component', () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            LiVue.boot();

            expect(LiVue.first()).toBeDefined();
        });

        it('should return undefined when no components', () => {
            LiVue.boot();

            expect(LiVue.first()).toBeUndefined();
        });
    });

    describe('all()', () => {
        it('should return all mounted components', () => {
            const el1 = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            const el2 = createMockLiVueElement({ id: 'comp-2', name: 'timer' });
            document.body.appendChild(el1);
            document.body.appendChild(el2);

            LiVue.boot();

            const all = LiVue.all();
            expect(all).toHaveLength(2);
        });

        it('should return empty array when no components', () => {
            LiVue.boot();

            expect(LiVue.all()).toEqual([]);
        });
    });

    describe('hook()', () => {
        it('should delegate to hooks module', async () => {
            const { hook } = await import('@/helpers/hooks.js');
            const callback = vi.fn();

            LiVue.hook('component.init', callback);

            expect(hook).toHaveBeenCalledWith('component.init', callback);
        });
    });

    describe('navigate()', () => {
        it('should delegate to navigation module', async () => {
            const { navigateTo } = await import('@/features/navigation.js');

            LiVue.navigate('/dashboard');

            expect(navigateTo).toHaveBeenCalledWith('/dashboard', true, false);
        });
    });

    describe('MutationObserver behavior', () => {
        it('should auto-mount new root components added to DOM', async () => {
            LiVue.boot();

            // Add new component after boot
            const el = createMockLiVueElement({ id: 'new-comp', name: 'new' });
            document.body.appendChild(el);

            // Trigger observer callback manually
            LiVue._observer.trigger([{
                type: 'childList',
                addedNodes: [el],
                removedNodes: [],
            }]);

            expect(LiVue.components.has('new-comp')).toBe(true);
        });

        it('should auto-destroy removed components', async () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            LiVue.boot();

            const comp = LiVue.components.get('comp-1');

            // Remove component from DOM
            document.body.removeChild(el);

            // Trigger observer callback manually
            LiVue._observer.trigger([{
                type: 'childList',
                addedNodes: [],
                removedNodes: [el],
            }]);

            expect(comp.destroy).toHaveBeenCalled();
            expect(LiVue.components.has('comp-1')).toBe(false);
        });

        it('should NOT destroy preserved components during navigation', async () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            LiVue.boot();

            const comp = LiVue.components.get('comp-1');

            // Set preserving IDs (simulating navigation)
            LiVue._preservingIds = new Set(['comp-1']);

            // Remove from DOM (would happen during body swap)
            document.body.removeChild(el);

            // Trigger observer callback manually
            LiVue._observer.trigger([{
                type: 'childList',
                addedNodes: [],
                removedNodes: [el],
            }]);

            // Component should NOT be destroyed because it's being preserved
            expect(comp.destroy).not.toHaveBeenCalled();
            expect(LiVue.components.has('comp-1')).toBe(true);
        });
    });

    describe('_isRoot()', () => {
        it('should return true for top-level component', () => {
            const el = createMockLiVueElement({ id: 'comp-1', name: 'counter' });
            document.body.appendChild(el);

            expect(LiVue._isRoot(el)).toBe(true);
        });

        it('should return false for nested component', () => {
            const parent = createMockLiVueElement({ id: 'parent', name: 'parent' });
            const child = createMockLiVueElement({ id: 'child', name: 'child' });
            parent.appendChild(child);
            document.body.appendChild(parent);

            expect(LiVue._isRoot(child)).toBe(false);
        });

        it('should return true for island even if nested', () => {
            const parent = createMockLiVueElement({ id: 'parent', name: 'parent' });
            const island = createMockLiVueElement({ id: 'island', name: 'island', island: true });
            parent.appendChild(island);
            document.body.appendChild(parent);

            expect(LiVue._isRoot(island)).toBe(true);
        });

        it('should treat nested component inside island as root (Vue handles nesting)', () => {
            const island = createMockLiVueElement({ id: 'island', name: 'island', island: true });
            const nested = createMockLiVueElement({ id: 'nested', name: 'nested' });
            island.appendChild(nested);
            document.body.appendChild(island);

            // Current behavior: nested components inside islands are treated as roots.
            // This is because the _isRoot walk-up stops at islands, treating the nested
            // component as having no regular livue parent.
            // Vue handles the actual nesting through its component system.
            expect(LiVue._isRoot(nested)).toBe(true);
        });
    });

    describe('setConfirmHandler()', () => {
        it('should set custom confirm handler on window.LiVue', () => {
            const handler = vi.fn();

            LiVue.setConfirmHandler(handler);

            expect(window.LiVue.confirmHandler).toBe(handler);
        });
    });

    describe('debug()', () => {
        it('should enable debug mode', () => {
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

            LiVue.debug(true);

            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Debug mode enabled'));
            expect(LiVue.isDebugEnabled()).toBe(true);

            consoleSpy.mockRestore();
        });

        it('should disable debug mode', () => {
            const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

            LiVue.debug(true);
            LiVue.debug(false);

            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Debug mode disabled'));
            expect(LiVue.isDebugEnabled()).toBe(false);

            consoleSpy.mockRestore();
        });
    });
});
