/**
 * Tests for v-submit directive.
 *
 * The v-submit directive handles form submission with preventDefault.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

let submitDirective;
let mockLivue;
let mockVnode;

beforeEach(async () => {
    vi.resetModules();

    const module = await import('@/directives/submit.js');
    submitDirective = module.default;

    mockLivue = { call: vi.fn() };
    mockVnode = {
        ctx: { setupState: { livue: mockLivue } },
    };
});

describe('v-submit Directive', () => {
    describe('mounted()', () => {
        it('should add submit event listener to form', () => {
            const form = document.createElement('form');
            const addEventListenerSpy = vi.spyOn(form, 'addEventListener');

            submitDirective.mounted(form, { value: 'save', modifiers: {} }, mockVnode);

            expect(addEventListenerSpy).toHaveBeenCalledWith('submit', expect.any(Function));
        });

        it('should call livue method on submit', () => {
            const form = document.createElement('form');
            document.body.appendChild(form);

            submitDirective.mounted(form, { value: 'save', modifiers: {} }, mockVnode);

            const event = new Event('submit', { bubbles: true, cancelable: true });
            form.dispatchEvent(event);

            expect(mockLivue.call).toHaveBeenCalledWith('save', []);

            document.body.removeChild(form);
        });

        it('should prevent default form submission', () => {
            const form = document.createElement('form');
            document.body.appendChild(form);

            submitDirective.mounted(form, { value: 'save', modifiers: {} }, mockVnode);

            const event = new Event('submit', { bubbles: true, cancelable: true });
            const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

            form.dispatchEvent(event);

            expect(preventDefaultSpy).toHaveBeenCalled();

            document.body.removeChild(form);
        });

        it('should pass arguments to method via array', () => {
            const form = document.createElement('form');
            document.body.appendChild(form);

            submitDirective.mounted(form, { value: ['save', ['draft', true]], modifiers: {} }, mockVnode);

            form.dispatchEvent(new Event('submit'));

            expect(mockLivue.call).toHaveBeenCalledWith('save', ['draft', true]);

            document.body.removeChild(form);
        });

        it('should warn if not used on form element', () => {
            const div = document.createElement('div');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            submitDirective.mounted(div, { value: 'save', modifiers: {} }, mockVnode);

            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });

        it('should warn without livue context', () => {
            const form = document.createElement('form');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            submitDirective.mounted(form, { value: 'save', modifiers: {} }, { ctx: {} });

            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });

        it('should warn for invalid method value', () => {
            const form = document.createElement('form');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            submitDirective.mounted(form, { value: 123, modifiers: {} }, mockVnode);

            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });

    describe('unmounted()', () => {
        it('should remove event listener', () => {
            const form = document.createElement('form');
            const removeEventListenerSpy = vi.spyOn(form, 'removeEventListener');

            submitDirective.mounted(form, { value: 'save', modifiers: {} }, mockVnode);
            submitDirective.unmounted(form);

            expect(removeEventListenerSpy).toHaveBeenCalledWith('submit', expect.any(Function));
        });
    });
});
