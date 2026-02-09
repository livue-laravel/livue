/**
 * Tests for DOM morphing utilities.
 *
 * Tests the morphInnerHtml function which uses morphdom
 * for efficient DOM diffing with focus/scroll preservation.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

let morphModule;
let mockMorphdom;

beforeEach(async () => {
    vi.resetModules();

    // Mock morphdom
    mockMorphdom = vi.fn((fromEl, toEl, config) => {
        // Simulate basic morphdom behavior: replace children
        if (config && config.childrenOnly) {
            fromEl.innerHTML = toEl.innerHTML;
        }
    });

    vi.doMock('morphdom', () => ({
        default: mockMorphdom,
    }));

    morphModule = await import('@/helpers/morph.js');
});

describe('Morph Helper', () => {
    describe('morphInnerHtml()', () => {
        it('should call morphdom with childrenOnly option', () => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = '<span>Old</span>';

            morphModule.morphInnerHtml(wrapper, '<span>New</span>');

            expect(mockMorphdom).toHaveBeenCalledWith(
                wrapper,
                expect.any(HTMLElement),
                expect.objectContaining({
                    childrenOnly: true,
                })
            );
        });

        it('should update DOM content', () => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = '<span>Old content</span>';

            morphModule.morphInnerHtml(wrapper, '<span>New content</span>');

            expect(wrapper.innerHTML).toBe('<span>New content</span>');
        });

        it('should pass onBeforeElUpdated callback to morphdom', () => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = '<span>Old</span>';

            morphModule.morphInnerHtml(wrapper, '<span>New</span>');

            const config = mockMorphdom.mock.calls[0][2];
            expect(typeof config.onBeforeElUpdated).toBe('function');
        });

        it('should create temporary div with new HTML for morphdom', () => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = '<span>Old</span>';

            morphModule.morphInnerHtml(wrapper, '<p>New paragraph</p>');

            // Second argument to morphdom should be a div containing the new HTML
            const tempDiv = mockMorphdom.mock.calls[0][1];
            expect(tempDiv.tagName).toBe('DIV');
            expect(tempDiv.innerHTML).toBe('<p>New paragraph</p>');
        });

        it('should skip nested LiVue components during morph', () => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = '<span>Old</span>';

            morphModule.morphInnerHtml(wrapper, '<span>New</span>');

            const config = mockMorphdom.mock.calls[0][2];

            // A nested LiVue component should be skipped
            const nestedComponent = document.createElement('div');
            nestedComponent.setAttribute('data-livue-id', 'nested-123');
            const toEl = document.createElement('div');

            const result = config.onBeforeElUpdated(nestedComponent, toEl);
            expect(result).toBe(false);
        });

        it('should not skip the wrapper element itself', () => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = '<span>Old</span>';

            morphModule.morphInnerHtml(wrapper, '<span>New</span>');

            const config = mockMorphdom.mock.calls[0][2];

            // The wrapper itself should not be skipped even if it has the attribute
            // because the check is `fromEl !== wrapperEl`
            const result = config.onBeforeElUpdated(wrapper, document.createElement('div'));
            expect(result).toBe(true);
        });

        it('should allow normal elements to be updated', () => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = '<span>Old</span>';

            morphModule.morphInnerHtml(wrapper, '<span>New</span>');

            const config = mockMorphdom.mock.calls[0][2];

            const normalEl = document.createElement('span');
            const toEl = document.createElement('span');

            const result = config.onBeforeElUpdated(normalEl, toEl);
            expect(result).toBe(true);
        });

        it('should preserve focused text input value during morph', () => {
            const wrapper = document.createElement('div');
            const input = document.createElement('input');
            input.type = 'text';
            input.value = 'user typing';
            wrapper.appendChild(input);
            document.body.appendChild(wrapper);

            // Mock activeElement
            Object.defineProperty(document, 'activeElement', {
                get: () => input,
                configurable: true,
            });

            morphModule.morphInnerHtml(wrapper, '<input type="text" value="server value">');

            const config = mockMorphdom.mock.calls[0][2];
            const toInput = document.createElement('input');
            toInput.type = 'text';
            toInput.value = 'server value';

            config.onBeforeElUpdated(input, toInput);

            expect(toInput.value).toBe('user typing');

            // Cleanup
            document.body.removeChild(wrapper);
            Object.defineProperty(document, 'activeElement', {
                get: () => document.body,
                configurable: true,
            });
        });

        it('should preserve focused checkbox checked state during morph', () => {
            const wrapper = document.createElement('div');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = true;
            wrapper.appendChild(checkbox);
            document.body.appendChild(wrapper);

            Object.defineProperty(document, 'activeElement', {
                get: () => checkbox,
                configurable: true,
            });

            morphModule.morphInnerHtml(wrapper, '<input type="checkbox">');

            const config = mockMorphdom.mock.calls[0][2];
            const toCheckbox = document.createElement('input');
            toCheckbox.type = 'checkbox';
            toCheckbox.checked = false;

            config.onBeforeElUpdated(checkbox, toCheckbox);

            expect(toCheckbox.checked).toBe(true);

            document.body.removeChild(wrapper);
            Object.defineProperty(document, 'activeElement', {
                get: () => document.body,
                configurable: true,
            });
        });
    });
});
