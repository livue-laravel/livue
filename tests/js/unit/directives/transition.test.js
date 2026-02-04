/**
 * Tests for v-transition directive.
 *
 * The v-transition directive enables smooth animations using
 * the browser's View Transitions API.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let transitionDirective;
let isViewTransitionsSupported;
let hasActiveTransitions;
let withViewTransition;

beforeEach(async () => {
    vi.resetModules();

    // Reset document state
    document.documentElement.className = '';
    document.body.innerHTML = '';

    const module = await import('@/directives/transition.js');
    transitionDirective = module.default;
    isViewTransitionsSupported = module.isViewTransitionsSupported;
    hasActiveTransitions = module.hasActiveTransitions;
    withViewTransition = module.withViewTransition;
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('v-transition Directive', () => {
    describe('created()', () => {
        it('should set data attribute with custom name', () => {
            const el = document.createElement('div');

            transitionDirective.created(el, { value: 'sidebar', modifiers: {} });

            expect(el.getAttribute('data-livue-transition')).toBe('sidebar');
        });

        it('should auto-generate name when no value provided', () => {
            const el = document.createElement('div');

            transitionDirective.created(el, { value: null, modifiers: {} });

            expect(el.hasAttribute('data-livue-transition')).toBe(true);
            expect(el.getAttribute('data-livue-transition')).toMatch(/^livue-transition-\d+$/);
        });

        it('should generate unique names', () => {
            const el1 = document.createElement('div');
            const el2 = document.createElement('div');

            transitionDirective.created(el1, { value: null, modifiers: {} });
            transitionDirective.created(el2, { value: null, modifiers: {} });

            expect(el1.getAttribute('data-livue-transition')).not.toBe(
                el2.getAttribute('data-livue-transition')
            );
        });

        it('should apply CSS view-transition-name when supported', () => {
            // Mock support
            document.startViewTransition = vi.fn();

            const el = document.createElement('div');

            transitionDirective.created(el, { value: 'card', modifiers: {} });

            expect(el.style.viewTransitionName).toBe('card');
        });

        it('should handle .skip modifier', () => {
            const el = document.createElement('div');

            transitionDirective.created(el, { value: 'sidebar', modifiers: { skip: true } });

            expect(el.hasAttribute('data-livue-transition-skip')).toBe(true);
            expect(el.hasAttribute('data-livue-transition')).toBe(false);
        });
    });

    describe('mounted()', () => {
        it('should update global transitions flag', () => {
            const el = document.createElement('div');
            document.body.appendChild(el);

            transitionDirective.created(el, { value: 'test', modifiers: {} });
            transitionDirective.mounted(el, { value: 'test', modifiers: {} });

            expect(hasActiveTransitions()).toBe(true);

            document.body.removeChild(el);
        });
    });

    describe('updated()', () => {
        it('should update name when value changes', () => {
            const el = document.createElement('div');
            document.startViewTransition = vi.fn();

            transitionDirective.created(el, { value: 'old-name', modifiers: {} });
            transitionDirective.updated(el, { value: 'new-name', oldValue: 'old-name', modifiers: {} });

            expect(el.getAttribute('data-livue-transition')).toBe('new-name');
            expect(el.style.viewTransitionName).toBe('new-name');
        });

        it('should not update if value unchanged', () => {
            const el = document.createElement('div');

            transitionDirective.created(el, { value: 'same', modifiers: {} });
            transitionDirective.updated(el, { value: 'same', oldValue: 'same', modifiers: {} });

            expect(el.getAttribute('data-livue-transition')).toBe('same');
        });
    });

    describe('unmounted()', () => {
        it('should remove data attribute', () => {
            const el = document.createElement('div');
            document.body.appendChild(el);

            transitionDirective.created(el, { value: 'test', modifiers: {} });
            transitionDirective.mounted(el, { value: 'test', modifiers: {} });
            transitionDirective.unmounted(el);

            expect(el.hasAttribute('data-livue-transition')).toBe(false);

            document.body.removeChild(el);
        });

        it('should update global flag', () => {
            const el = document.createElement('div');
            document.body.appendChild(el);

            transitionDirective.created(el, { value: 'test', modifiers: {} });
            transitionDirective.mounted(el, { value: 'test', modifiers: {} });

            expect(hasActiveTransitions()).toBe(true);

            transitionDirective.unmounted(el);
            document.body.removeChild(el);

            expect(hasActiveTransitions()).toBe(false);
        });
    });
});

describe('isViewTransitionsSupported()', () => {
    it('should return true when API is available', () => {
        document.startViewTransition = vi.fn();

        expect(isViewTransitionsSupported()).toBe(true);
    });

    it('should return false when API is not available', () => {
        delete document.startViewTransition;

        expect(isViewTransitionsSupported()).toBe(false);
    });
});

describe('hasActiveTransitions()', () => {
    it('should return false when no transitions', () => {
        document.body.innerHTML = '<div>No transitions</div>';

        expect(hasActiveTransitions()).toBe(false);
    });

    it('should return true when transitions exist', () => {
        const el = document.createElement('div');
        el.setAttribute('data-livue-transition', 'test');
        document.body.appendChild(el);

        transitionDirective.created(el, { value: 'test', modifiers: {} });
        transitionDirective.mounted(el, { value: 'test', modifiers: {} });

        expect(hasActiveTransitions()).toBe(true);

        document.body.removeChild(el);
    });
});

describe('withViewTransition()', () => {
    beforeEach(() => {
        // Mock View Transitions API
        document.startViewTransition = vi.fn((callback) => {
            callback();
            return {
                finished: Promise.resolve(),
            };
        });

        // Mock matchMedia
        window.matchMedia = vi.fn().mockReturnValue({
            matches: false,
        });
    });

    it('should execute callback with View Transitions', async () => {
        const callback = vi.fn();

        await withViewTransition(callback);

        expect(document.startViewTransition).toHaveBeenCalled();
        expect(callback).toHaveBeenCalled();
    });

    it('should add transition type class', async () => {
        const callback = vi.fn();

        const promise = withViewTransition(callback, { type: 'forward' });

        expect(document.documentElement.classList.contains('livue-transition-forward')).toBe(true);

        await promise;

        expect(document.documentElement.classList.contains('livue-transition-forward')).toBe(false);
    });

    it('should skip transition when prefers-reduced-motion', async () => {
        window.matchMedia = vi.fn().mockReturnValue({
            matches: true, // User prefers reduced motion
        });

        const callback = vi.fn();

        await withViewTransition(callback);

        expect(document.startViewTransition).not.toHaveBeenCalled();
        expect(callback).toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
        document.startViewTransition = vi.fn((callback) => {
            callback();
            return {
                finished: Promise.reject(new Error('Transition failed')),
            };
        });

        const callback = vi.fn();

        // Should not throw
        await withViewTransition(callback, { type: 'backward' });

        // Should clean up type class even on error
        expect(document.documentElement.classList.contains('livue-transition-backward')).toBe(false);
    });
});

describe('use cases', () => {
    it('should enable smooth sidebar transitions', () => {
        document.startViewTransition = vi.fn();

        const sidebar = document.createElement('aside');
        transitionDirective.created(sidebar, { value: 'sidebar', modifiers: {} });

        expect(sidebar.style.viewTransitionName).toBe('sidebar');
    });

    it('should support CSS customization via transition name', () => {
        const card = document.createElement('div');
        transitionDirective.created(card, { value: 'card-1', modifiers: {} });

        // This name can be used in CSS:
        // ::view-transition-old(card-1) { animation: ... }
        // ::view-transition-new(card-1) { animation: ... }
        expect(card.getAttribute('data-livue-transition')).toBe('card-1');
    });
});
