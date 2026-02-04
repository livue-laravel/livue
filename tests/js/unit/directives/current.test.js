/**
 * Tests for v-current directive.
 *
 * The v-current directive highlights navigation links that match the current URL.
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

        it('should add event listeners', () => {
            const link = document.createElement('a');
            link.href = '/posts';
            const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

            currentDirective.mounted(link, { value: 'active', modifiers: {} });

            expect(addEventListenerSpy).toHaveBeenCalledWith('popstate', expect.any(Function));
            expect(addEventListenerSpy).toHaveBeenCalledWith('livue:navigated', expect.any(Function));
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

        it('should remove event listeners', () => {
            const link = document.createElement('a');
            link.href = '/posts';
            const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

            currentDirective.mounted(link, { value: 'active', modifiers: {} });
            currentDirective.unmounted(link, { value: 'active', modifiers: {} });

            expect(removeEventListenerSpy).toHaveBeenCalledWith('popstate', expect.any(Function));
            expect(removeEventListenerSpy).toHaveBeenCalledWith('livue:navigated', expect.any(Function));
        });
    });

    describe('event handling', () => {
        it('should update on popstate event', () => {
            window.location.pathname = '/posts';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: {} });
            expect(link.classList.contains('active')).toBe(true);

            // Simulate back navigation
            window.location.pathname = '/users';
            window.dispatchEvent(new Event('popstate'));

            expect(link.classList.contains('active')).toBe(false);
        });

        it('should update on livue:navigated event', () => {
            window.location.pathname = '/users';
            const link = document.createElement('a');
            link.href = '/posts';

            currentDirective.mounted(link, { value: 'active', modifiers: {} });
            expect(link.classList.contains('active')).toBe(false);

            // Simulate SPA navigation
            window.location.pathname = '/posts';
            window.dispatchEvent(new Event('livue:navigated'));

            expect(link.classList.contains('active')).toBe(true);
        });
    });
});
