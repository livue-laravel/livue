/**
 * Tests for v-intersect directive.
 *
 * The v-intersect directive triggers actions on viewport visibility.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let intersectDirective;
let mockLivue;
let mockVnode;
let mockObserverCallback;
let mockObserver;

beforeEach(async () => {
    vi.resetModules();

    // Mock IntersectionObserver
    mockObserver = {
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn(),
    };

    global.IntersectionObserver = vi.fn((callback, options) => {
        mockObserverCallback = callback;
        mockObserver._options = options;
        return mockObserver;
    });

    const module = await import('@/directives/intersect.js');
    intersectDirective = module.default;

    mockLivue = { call: vi.fn() };
    mockVnode = {
        ctx: { setupState: { livue: mockLivue } },
    };
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('v-intersect Directive', () => {
    describe('mounted()', () => {
        it('should create IntersectionObserver', () => {
            const el = document.createElement('div');

            intersectDirective.mounted(el, { value: 'loadMore', modifiers: {} }, mockVnode);

            expect(global.IntersectionObserver).toHaveBeenCalled();
        });

        it('should observe the element', () => {
            const el = document.createElement('div');

            intersectDirective.mounted(el, { value: 'loadMore', modifiers: {} }, mockVnode);

            expect(mockObserver.observe).toHaveBeenCalledWith(el);
        });

        it('should call livue method when intersecting', () => {
            const el = document.createElement('div');

            intersectDirective.mounted(el, { value: 'loadMore', modifiers: {} }, mockVnode);

            // Simulate intersection
            mockObserverCallback([{ isIntersecting: true }]);

            expect(mockLivue.call).toHaveBeenCalledWith('loadMore', []);
        });

        it('should not call method when not intersecting', () => {
            const el = document.createElement('div');

            intersectDirective.mounted(el, { value: 'loadMore', modifiers: {} }, mockVnode);

            // Simulate no intersection
            mockObserverCallback([{ isIntersecting: false }]);

            expect(mockLivue.call).not.toHaveBeenCalled();
        });

        it('should pass params when using array value', () => {
            const el = document.createElement('div');

            intersectDirective.mounted(el, { value: ['loadMore', ['page2']], modifiers: {} }, mockVnode);

            mockObserverCallback([{ isIntersecting: true }]);

            expect(mockLivue.call).toHaveBeenCalledWith('loadMore', ['page2']);
        });

        it('should warn without livue context', () => {
            const el = document.createElement('div');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            intersectDirective.mounted(el, { value: 'method', modifiers: {} }, { ctx: {} });

            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });

        it('should warn for invalid method value', () => {
            const el = document.createElement('div');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            intersectDirective.mounted(el, { value: 123, modifiers: {} }, mockVnode);

            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });

    describe('.once modifier', () => {
        it('should disconnect after first intersection', () => {
            const el = document.createElement('div');

            intersectDirective.mounted(el, { value: 'trackView', modifiers: { once: true } }, mockVnode);

            // First intersection
            mockObserverCallback([{ isIntersecting: true }]);

            expect(mockLivue.call).toHaveBeenCalledTimes(1);
            expect(mockObserver.disconnect).toHaveBeenCalled();
        });

        it('should not trigger again after disconnect', () => {
            const el = document.createElement('div');

            intersectDirective.mounted(el, { value: 'trackView', modifiers: { once: true } }, mockVnode);

            mockObserverCallback([{ isIntersecting: true }]);
            mockObserverCallback([{ isIntersecting: true }]);

            // Should only be called once
            expect(mockLivue.call).toHaveBeenCalledTimes(1);
        });
    });

    describe('.leave modifier', () => {
        it('should trigger on leaving viewport', () => {
            const el = document.createElement('div');

            intersectDirective.mounted(el, { value: 'onExit', modifiers: { leave: true } }, mockVnode);

            // Entering viewport should not trigger
            mockObserverCallback([{ isIntersecting: true }]);
            expect(mockLivue.call).not.toHaveBeenCalled();

            // Leaving viewport should trigger
            mockObserverCallback([{ isIntersecting: false }]);
            expect(mockLivue.call).toHaveBeenCalledWith('onExit', []);
        });
    });

    describe('threshold modifiers', () => {
        it('should use 0.5 threshold with .half modifier', () => {
            const el = document.createElement('div');

            intersectDirective.mounted(el, { value: 'halfVisible', modifiers: { half: true } }, mockVnode);

            expect(mockObserver._options.threshold).toBe(0.5);
        });

        it('should use 1.0 threshold with .full modifier', () => {
            const el = document.createElement('div');

            intersectDirective.mounted(el, { value: 'fullyVisible', modifiers: { full: true } }, mockVnode);

            expect(mockObserver._options.threshold).toBe(1.0);
        });
    });

    describe('margin arg', () => {
        it('should set rootMargin from arg', () => {
            const el = document.createElement('div');

            intersectDirective.mounted(el, { value: 'withMargin', arg: '100', modifiers: {} }, mockVnode);

            expect(mockObserver._options.rootMargin).toBe('100px');
        });
    });

    describe('unmounted()', () => {
        it('should disconnect observer', () => {
            const el = document.createElement('div');

            intersectDirective.mounted(el, { value: 'method', modifiers: {} }, mockVnode);
            intersectDirective.unmounted(el);

            expect(mockObserver.disconnect).toHaveBeenCalled();
        });
    });
});
