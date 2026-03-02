/**
 * Tests for v-current directive.
 *
 * The v-current directive highlights navigation links that match the current URL.
 * Uses global event delegation for @persist compatibility.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let currentDirective;
let originalLocation;

beforeEach(async () => {
    vi.resetModules();

    // Save original location
    originalLocation = window.location;

    // Mock location
    delete window.location;
    window.location = {
        pathname: '/posts',
        origin: 'http://localhost',
        href: 'http://localhost/posts',
    };

    const module = await import('@/directives/current.js');
    currentDirective = module.default;
});

afterEach(() => {
    vi.clearAllMocks();
    // Restore location
    window.location = originalLocation;
});

describe('v-current Directive', () => {
    describe('mounted()', () => {
        it('should add classes when URL matches (partial)', () => {
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active text-blue-600', modifiers: {} });

            expect(link.classList.contains('active')).toBe(true);
            expect(link.classList.contains('text-blue-600')).toBe(true);
            expect(link.hasAttribute('data-current')).toBe(true);
        });

        it('should match partial paths', () => {
            window.location.pathname = '/posts/123';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: {} });

            expect(link.classList.contains('active')).toBe(true);
        });

        it('should not match different paths', () => {
            window.location.pathname = '/users';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: {} });

            expect(link.classList.contains('active')).toBe(false);
        });

        it('should not match partial when path continues differently', () => {
            window.location.pathname = '/posts-archive';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: {} });

            expect(link.classList.contains('active')).toBe(false);
        });

        it('should register global listeners (not per-element)', () => {
            const link = document.createElement('a');
            link.href = '/posts';
            const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

            currentDirective.mounted(link, { value: 'active', modifiers: {} });

            expect(addEventListenerSpy).toHaveBeenCalledWith('popstate', expect.any(Function));
            expect(addEventListenerSpy).toHaveBeenCalledWith('livue:navigated', expect.any(Function));

            // Second element should NOT add new listeners
            addEventListenerSpy.mockClear();
            const link2 = document.createElement('a');
            link2.href = '/users';
            currentDirective.mounted(link2, { value: 'active', modifiers: {} });

            expect(addEventListenerSpy).not.toHaveBeenCalledWith('popstate', expect.any(Function));
            expect(addEventListenerSpy).not.toHaveBeenCalledWith('livue:navigated', expect.any(Function));
        });

        it('should handle root path specially', () => {
            window.location.pathname = '/';
            const link = document.createElement('a');
            link.href = '/';

            currentDirective.mounted(link, { value: 'active', modifiers: {} });

            expect(link.classList.contains('active')).toBe(true);
        });

        it('should not match root for other paths', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/';

            currentDirective.mounted(link, { value: 'active', modifiers: {} });

            expect(link.classList.contains('active')).toBe(false);
        });

        it('should handle missing href gracefully', () => {
            const link = document.createElement('a');

            expect(() => {
                currentDirective.mounted(link, { value: 'active', modifiers: {} });
            }).not.toThrow();
        });
    });

    describe('.exact modifier', () => {
        it('should match only exact paths', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: { exact: true } });

            expect(link.classList.contains('active')).toBe(true);
        });

        it('should not match child paths with exact', () => {
            window.location.pathname = '/posts/123';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: { exact: true } });

            expect(link.classList.contains('active')).toBe(false);
        });

        it('should ignore trailing slash', () => {
            window.location.pathname = '/posts/';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: { exact: true } });

            expect(link.classList.contains('active')).toBe(true);
        });
    });

    describe('.strict modifier', () => {
        it('should match exact paths including trailing slash', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: { strict: true } });

            expect(link.classList.contains('active')).toBe(true);
        });

        it('should not match with different trailing slash', () => {
            window.location.pathname = '/posts/';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: { strict: true } });

            expect(link.classList.contains('active')).toBe(false);
        });
    });

    describe('updated()', () => {
        it('should re-evaluate current state on update', () => {
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: {} });
            expect(link.classList.contains('active')).toBe(true);

            // Simulate navigation
            window.location.pathname = '/users';
            currentDirective.updated(link, { value: 'active', modifiers: {} });

            expect(link.classList.contains('active')).toBe(false);
        });
    });

    describe('unmounted()', () => {
        it('should remove classes', () => {
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active text-blue-600', modifiers: {} });
            currentDirective.unmounted(link, { value: 'active text-blue-600', modifiers: {} });

            expect(link.classList.contains('active')).toBe(false);
            expect(link.classList.contains('text-blue-600')).toBe(false);
            expect(link.hasAttribute('data-current')).toBe(false);
        });

        it('should remove element from global registry', async () => {
            const { _elements, _configs } = await import('@/directives/current.js');

            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: {} });
            expect(_elements.has(link)).toBe(true);
            expect(_configs.has(link)).toBe(true);

            currentDirective.unmounted(link, { value: 'active', modifiers: {} });
            expect(_elements.has(link)).toBe(false);
            expect(_configs.has(link)).toBe(false);
        });
    });

    describe('event handling', () => {
        it('should update on popstate event', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';
            document.body.appendChild(link);

            currentDirective.mounted(link, { value: 'active', modifiers: {} });
            expect(link.classList.contains('active')).toBe(true);

            // Simulate back navigation
            window.location.pathname = '/users';
            window.dispatchEvent(new Event('popstate'));

            expect(link.classList.contains('active')).toBe(false);
            document.body.removeChild(link);
        });

        it('should update on livue:navigated event', () => {
            window.location.pathname = '/users';
            const link = document.createElement('a');
            link.href = '/posts';
            document.body.appendChild(link);

            currentDirective.mounted(link, { value: 'active', modifiers: {} });
            expect(link.classList.contains('active')).toBe(false);

            // Simulate SPA navigation
            window.location.pathname = '/posts';
            window.dispatchEvent(new Event('livue:navigated'));

            expect(link.classList.contains('active')).toBe(true);
            document.body.removeChild(link);
        });
    });

    describe('aria-current accessibility', () => {
        it('should set aria-current="page" when active (string)', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: {} });

            expect(link.getAttribute('aria-current')).toBe('page');
        });

        it('should not set aria-current when inactive (string)', () => {
            window.location.pathname = '/users';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: {} });

            expect(link.hasAttribute('aria-current')).toBe(false);
        });

        it('should remove aria-current when navigating away', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';
            document.body.appendChild(link);

            currentDirective.mounted(link, { value: 'active', modifiers: {} });
            expect(link.getAttribute('aria-current')).toBe('page');

            window.location.pathname = '/users';
            window.dispatchEvent(new Event('livue:navigated'));

            expect(link.hasAttribute('aria-current')).toBe(false);
            document.body.removeChild(link);
        });

        it('should remove aria-current on unmount', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: {} });
            expect(link.getAttribute('aria-current')).toBe('page');

            currentDirective.unmounted(link, { value: 'active', modifiers: {} });
            expect(link.hasAttribute('aria-current')).toBe(false);
        });
    });

    describe('object syntax { active, inactive }', () => {
        it('should apply active classes when matching', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, {
                value: { active: 'text-white bg-vue/20', inactive: 'text-gray-400 hover:text-white' },
                modifiers: {},
            });

            expect(link.classList.contains('text-white')).toBe(true);
            expect(link.classList.contains('bg-vue/20')).toBe(true);
            expect(link.classList.contains('text-gray-400')).toBe(false);
            expect(link.classList.contains('hover:text-white')).toBe(false);
        });

        it('should apply inactive classes when not matching', () => {
            window.location.pathname = '/users';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, {
                value: { active: 'text-white bg-vue/20', inactive: 'text-gray-400 hover:text-white' },
                modifiers: {},
            });

            expect(link.classList.contains('text-gray-400')).toBe(true);
            expect(link.classList.contains('hover:text-white')).toBe(true);
            expect(link.classList.contains('text-white')).toBe(false);
            expect(link.classList.contains('bg-vue/20')).toBe(false);
        });

        it('should toggle classes on navigation', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';
            document.body.appendChild(link);

            currentDirective.mounted(link, {
                value: { active: 'text-white', inactive: 'text-gray-400' },
                modifiers: {},
            });

            expect(link.classList.contains('text-white')).toBe(true);
            expect(link.classList.contains('text-gray-400')).toBe(false);

            // Navigate away
            window.location.pathname = '/users';
            window.dispatchEvent(new Event('livue:navigated'));

            expect(link.classList.contains('text-white')).toBe(false);
            expect(link.classList.contains('text-gray-400')).toBe(true);

            // Navigate back
            window.location.pathname = '/posts';
            window.dispatchEvent(new Event('livue:navigated'));

            expect(link.classList.contains('text-white')).toBe(true);
            expect(link.classList.contains('text-gray-400')).toBe(false);
            document.body.removeChild(link);
        });

        it('should set aria-current with object syntax', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, {
                value: { active: 'text-white', inactive: 'text-gray-400' },
                modifiers: {},
            });

            expect(link.getAttribute('aria-current')).toBe('page');
        });

        it('should work with .exact modifier', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, {
                value: { active: 'text-white', inactive: 'text-gray-400' },
                modifiers: { exact: true },
            });

            expect(link.classList.contains('text-white')).toBe(true);
            expect(link.classList.contains('text-gray-400')).toBe(false);
        });

        it('should clean up both active and inactive classes on unmount', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, {
                value: { active: 'text-white bg-vue/20', inactive: 'text-gray-400' },
                modifiers: {},
            });

            currentDirective.unmounted(link, {
                value: { active: 'text-white bg-vue/20', inactive: 'text-gray-400' },
                modifiers: {},
            });

            expect(link.classList.contains('text-white')).toBe(false);
            expect(link.classList.contains('bg-vue/20')).toBe(false);
            expect(link.classList.contains('text-gray-400')).toBe(false);
        });

        it('should handle only active property', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, {
                value: { active: 'text-white' },
                modifiers: {},
            });

            expect(link.classList.contains('text-white')).toBe(true);
        });

        it('should handle only inactive property', () => {
            window.location.pathname = '/users';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, {
                value: { inactive: 'text-gray-400' },
                modifiers: {},
            });

            expect(link.classList.contains('text-gray-400')).toBe(true);
        });
    });

    describe('global registry cleanup', () => {
        it('should clean up disconnected elements on updateAll', async () => {
            const { _elements, updateAll } = await import('@/directives/current.js');

            const link = document.createElement('a');
            link.href = '/posts';

            // Mount but do NOT attach to DOM — isConnected will be false
            currentDirective.mounted(link, { value: 'active', modifiers: {} });
            expect(_elements.has(link)).toBe(true);

            // Trigger updateAll — element is not connected
            updateAll();

            expect(_elements.has(link)).toBe(false);
        });

        it('should update connected elements on updateAll', async () => {
            const { updateAll } = await import('@/directives/current.js');

            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';
            document.body.appendChild(link);

            currentDirective.mounted(link, { value: 'active', modifiers: {} });
            expect(link.classList.contains('active')).toBe(true);

            // Navigate
            window.location.pathname = '/users';
            updateAll();

            expect(link.classList.contains('active')).toBe(false);

            // Clean up
            document.body.removeChild(link);
        });
    });
});
