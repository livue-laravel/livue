/**
 * Tests for v-offline directive.
 *
 * The v-offline directive shows/hides content or adds classes
 * based on network connectivity status.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let offlineDirective;

beforeEach(async () => {
    vi.resetModules();

    // Module reads navigator.onLine at import time, so we need to set it before importing
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });

    const module = await import('@/directives/offline.js');
    offlineDirective = module.default;
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('v-offline Directive', () => {
    describe('visibility mode (default)', () => {
        it('should hide element when online', () => {
            // Module reads navigator.onLine at import, so this test uses default (online)
            const el = document.createElement('div');
            el.style.display = 'block';

            offlineDirective.created(el, { modifiers: {} });
            offlineDirective.mounted(el, { modifiers: {} });

            expect(el.style.display).toBe('none');
        });

        it('should show element when offline', async () => {
            // Need to reimport with offline state
            vi.resetModules();
            Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });

            const module = await import('@/directives/offline.js');
            const directive = module.default;

            const el = document.createElement('div');
            el.style.display = 'block';

            directive.created(el, { modifiers: {} });
            directive.mounted(el, { modifiers: {} });

            // Should be visible (original display or empty string)
            expect(el.style.display).toBe('block');
        });
    });

    describe('.class modifier', () => {
        it('should add class when offline', async () => {
            vi.resetModules();
            Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });

            const module = await import('@/directives/offline.js');
            const directive = module.default;

            const el = document.createElement('div');

            directive.created(el, { modifiers: { class: true }, value: 'offline-mode' });
            directive.mounted(el, { modifiers: { class: true }, value: 'offline-mode' });

            expect(el.classList.contains('offline-mode')).toBe(true);
        });

        it('should remove class when online', () => {
            // Default is online from beforeEach
            const el = document.createElement('div');
            el.classList.add('offline-mode');

            offlineDirective.created(el, { modifiers: { class: true }, value: 'offline-mode' });
            offlineDirective.mounted(el, { modifiers: { class: true }, value: 'offline-mode' });

            expect(el.classList.contains('offline-mode')).toBe(false);
        });

        it('should handle multiple classes', async () => {
            vi.resetModules();
            Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });

            const module = await import('@/directives/offline.js');
            const directive = module.default;

            const el = document.createElement('div');

            directive.created(el, { modifiers: { class: true }, value: 'bg-red-500 text-white' });
            directive.mounted(el, { modifiers: { class: true }, value: 'bg-red-500 text-white' });

            expect(el.classList.contains('bg-red-500')).toBe(true);
            expect(el.classList.contains('text-white')).toBe(true);
        });
    });

    describe('.class.remove modifier', () => {
        it('should remove class when offline', async () => {
            vi.resetModules();
            Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });

            const module = await import('@/directives/offline.js');
            const directive = module.default;

            const el = document.createElement('div');
            el.classList.add('online-style');

            directive.created(el, { modifiers: { class: true, remove: true }, value: 'online-style' });
            directive.mounted(el, { modifiers: { class: true, remove: true }, value: 'online-style' });

            expect(el.classList.contains('online-style')).toBe(false);
        });

        it('should add class back when online', () => {
            // Default is online
            const el = document.createElement('div');

            offlineDirective.created(el, { modifiers: { class: true, remove: true }, value: 'online-style' });
            offlineDirective.mounted(el, { modifiers: { class: true, remove: true }, value: 'online-style' });

            expect(el.classList.contains('online-style')).toBe(true);
        });
    });

    describe('.attr modifier', () => {
        it('should add attribute when offline', async () => {
            vi.resetModules();
            Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });

            const module = await import('@/directives/offline.js');
            const directive = module.default;

            const el = document.createElement('button');

            directive.created(el, { modifiers: { attr: true }, value: 'disabled' });
            directive.mounted(el, { modifiers: { attr: true }, value: 'disabled' });

            expect(el.hasAttribute('disabled')).toBe(true);
        });

        it('should remove attribute when online', () => {
            // Default is online
            const el = document.createElement('button');
            el.setAttribute('disabled', '');

            offlineDirective.created(el, { modifiers: { attr: true }, value: 'disabled' });
            offlineDirective.mounted(el, { modifiers: { attr: true }, value: 'disabled' });

            expect(el.hasAttribute('disabled')).toBe(false);
        });
    });

    describe('unmounted()', () => {
        it('should cleanup without errors', () => {
            const el = document.createElement('div');

            offlineDirective.created(el, { modifiers: {} });
            offlineDirective.mounted(el, { modifiers: {} });

            expect(() => {
                offlineDirective.unmounted(el);
            }).not.toThrow();
        });
    });
});
