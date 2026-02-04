/**
 * Tests for v-ignore directive.
 *
 * The v-ignore directive preserves element content during template swaps.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let ignoreDirective;

beforeEach(async () => {
    vi.resetModules();

    const module = await import('@/directives/ignore.js');
    ignoreDirective = module.default;
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('v-ignore Directive', () => {
    describe('created()', () => {
        it('should mark element as ignored', () => {
            const el = document.createElement('div');

            ignoreDirective.created(el, { modifiers: {} });

            expect(el.__livue_ignore).toBe(true);
        });

        it('should generate unique ignore ID', () => {
            const el1 = document.createElement('div');
            const el2 = document.createElement('div');

            ignoreDirective.created(el1, { modifiers: {} });
            ignoreDirective.created(el2, { modifiers: {} });

            expect(el1.__livue_ignore_id).not.toBe(el2.__livue_ignore_id);
        });

        it('should set data attribute for CSS selection', () => {
            const el = document.createElement('div');

            ignoreDirective.created(el, { modifiers: {} });

            expect(el.hasAttribute('data-livue-ignore-id')).toBe(true);
            expect(el.getAttribute('data-livue-ignore-id')).toBe(el.__livue_ignore_id);
        });

        it('should handle .self modifier', () => {
            const el = document.createElement('div');

            ignoreDirective.created(el, { modifiers: { self: true } });

            expect(el.__livue_ignore_self).toBe(true);
            expect(el.hasAttribute('data-livue-ignore-self')).toBe(true);
        });

        it('should not set self flag without modifier', () => {
            const el = document.createElement('div');

            ignoreDirective.created(el, { modifiers: {} });

            expect(el.__livue_ignore_self).toBe(false);
            expect(el.hasAttribute('data-livue-ignore-self')).toBe(false);
        });
    });

    describe('mounted()', () => {
        it('should ensure markers are present after mount', () => {
            const el = document.createElement('div');

            ignoreDirective.created(el, { modifiers: {} });
            // Simulate marker being removed
            el.removeAttribute('data-livue-ignore-id');

            ignoreDirective.mounted(el, { modifiers: {} });

            expect(el.hasAttribute('data-livue-ignore-id')).toBe(true);
        });
    });

    describe('unmounted()', () => {
        it('should cleanup internal properties', () => {
            const el = document.createElement('div');

            ignoreDirective.created(el, { modifiers: {} });
            ignoreDirective.unmounted(el);

            expect(el.__livue_ignore).toBeUndefined();
            expect(el.__livue_ignore_self).toBeUndefined();
            expect(el.__livue_ignore_id).toBeUndefined();
        });
    });

    describe('use cases', () => {
        it('should preserve third-party widget content', () => {
            const container = document.createElement('div');
            const widget = document.createElement('div');
            widget.innerHTML = '<span>Widget content</span>';
            container.appendChild(widget);

            ignoreDirective.created(container, { modifiers: {} });

            // Verify element is marked for preservation
            expect(container.__livue_ignore).toBe(true);
        });

        it('should allow children updates with .self modifier', () => {
            const el = document.createElement('div');

            ignoreDirective.created(el, { modifiers: { self: true } });

            // With .self, only element itself is preserved, children can update
            expect(el.__livue_ignore_self).toBe(true);
        });
    });
});
