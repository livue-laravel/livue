/**
 * Tests for v-scroll directive.
 *
 * The v-scroll directive marks elements for scroll position preservation
 * during SPA navigation.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let scrollDirective;

beforeEach(async () => {
    vi.resetModules();

    const module = await import('@/directives/scroll.js');
    scrollDirective = module.default;
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('v-scroll Directive', () => {
    describe('created()', () => {
        it('should set data attribute with custom key', () => {
            const el = document.createElement('aside');

            scrollDirective.created(el, { value: 'sidebar' });

            expect(el.getAttribute('data-livue-scroll')).toBe('sidebar');
            expect(el.__livue_scroll_key).toBe('sidebar');
        });

        it('should auto-generate key when no value provided', () => {
            const el = document.createElement('div');

            scrollDirective.created(el, { value: null });

            expect(el.hasAttribute('data-livue-scroll')).toBe(true);
            expect(el.getAttribute('data-livue-scroll')).toMatch(/^scroll-\d+$/);
        });

        it('should generate unique keys for each element', () => {
            const el1 = document.createElement('div');
            const el2 = document.createElement('div');

            scrollDirective.created(el1, { value: null });
            scrollDirective.created(el2, { value: null });

            expect(el1.getAttribute('data-livue-scroll')).not.toBe(el2.getAttribute('data-livue-scroll'));
        });
    });

    describe('updated()', () => {
        it('should update key when value changes', () => {
            const el = document.createElement('div');

            scrollDirective.created(el, { value: 'old-key' });
            scrollDirective.updated(el, { value: 'new-key' });

            expect(el.getAttribute('data-livue-scroll')).toBe('new-key');
            expect(el.__livue_scroll_key).toBe('new-key');
        });

        it('should not update if key unchanged', () => {
            const el = document.createElement('div');

            scrollDirective.created(el, { value: 'same-key' });
            scrollDirective.updated(el, { value: 'same-key' });

            expect(el.getAttribute('data-livue-scroll')).toBe('same-key');
        });

        it('should not update if value becomes empty', () => {
            const el = document.createElement('div');

            scrollDirective.created(el, { value: 'key' });
            scrollDirective.updated(el, { value: null });

            // Key should remain unchanged
            expect(el.getAttribute('data-livue-scroll')).toBe('key');
        });
    });

    describe('unmounted()', () => {
        it('should remove data attribute', () => {
            const el = document.createElement('div');

            scrollDirective.created(el, { value: 'sidebar' });
            scrollDirective.unmounted(el);

            expect(el.hasAttribute('data-livue-scroll')).toBe(false);
        });

        it('should cleanup internal property', () => {
            const el = document.createElement('div');

            scrollDirective.created(el, { value: 'sidebar' });
            scrollDirective.unmounted(el);

            expect(el.__livue_scroll_key).toBeUndefined();
        });
    });

    describe('use cases', () => {
        it('should mark sidebar for scroll preservation', () => {
            const sidebar = document.createElement('aside');
            sidebar.className = 'overflow-y-auto';

            scrollDirective.created(sidebar, { value: 'sidebar' });

            expect(sidebar.getAttribute('data-livue-scroll')).toBe('sidebar');
        });

        it('should mark main content area', () => {
            const main = document.createElement('main');

            scrollDirective.created(main, { value: 'main-content' });

            expect(main.getAttribute('data-livue-scroll')).toBe('main-content');
        });

        it('should work without explicit key', () => {
            const panel = document.createElement('div');

            scrollDirective.created(panel, {});

            expect(panel.hasAttribute('data-livue-scroll')).toBe(true);
        });
    });
});
