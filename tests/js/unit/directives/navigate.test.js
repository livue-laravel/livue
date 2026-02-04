/**
 * Tests for v-navigate directive.
 *
 * The v-navigate directive enables SPA navigation with prefetching.
 * It marks links with data attributes for global click handling.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let navigateDirective;

beforeEach(async () => {
    vi.resetModules();

    const module = await import('@/directives/navigate.js');
    navigateDirective = module.default;
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('v-navigate Directive', () => {
    describe('mounted()', () => {
        it('should add data-livue-navigate attribute to links', () => {
            const link = document.createElement('a');
            link.href = '/dashboard';

            navigateDirective.mounted(link, { modifiers: {} });

            expect(link.getAttribute('data-livue-navigate')).toBe('true');
        });

        it('should warn on non-anchor elements', () => {
            const div = document.createElement('div');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            navigateDirective.mounted(div, { modifiers: {} });

            expect(warnSpy).toHaveBeenCalledWith(
                expect.stringContaining('should only be used on <a> elements')
            );

            warnSpy.mockRestore();
        });
    });

    describe('.hover modifier', () => {
        it('should set navigate mode to hover', () => {
            const link = document.createElement('a');
            link.href = '/page';

            navigateDirective.mounted(link, { modifiers: { hover: true } });

            expect(link.getAttribute('data-livue-navigate-mode')).toBe('hover');
        });
    });

    describe('.prefetch modifier', () => {
        it('should set navigate mode to hover (alias)', () => {
            const link = document.createElement('a');
            link.href = '/page';

            navigateDirective.mounted(link, { modifiers: { prefetch: true } });

            expect(link.getAttribute('data-livue-navigate-mode')).toBe('hover');
        });
    });

    describe('unmounted()', () => {
        it('should remove navigate attributes', () => {
            const link = document.createElement('a');
            link.href = '/page';

            navigateDirective.mounted(link, { modifiers: { hover: true } });

            expect(link.hasAttribute('data-livue-navigate')).toBe(true);
            expect(link.hasAttribute('data-livue-navigate-mode')).toBe(true);

            navigateDirective.unmounted(link);

            expect(link.hasAttribute('data-livue-navigate')).toBe(false);
            expect(link.hasAttribute('data-livue-navigate-mode')).toBe(false);
        });
    });

    describe('default prefetch behavior', () => {
        it('should not set hover mode without modifier', () => {
            const link = document.createElement('a');
            link.href = '/page';

            navigateDirective.mounted(link, { modifiers: {} });

            expect(link.hasAttribute('data-livue-navigate-mode')).toBe(false);
        });
    });
});
