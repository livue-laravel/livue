/**
 * Tests for DOM event directives (events.js).
 *
 * Verifies that all exported directives are valid Vue directive objects
 * with the expected hooks (mounted/updated/unmounted).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

let eventDirectives;

beforeEach(async () => {
    vi.resetModules();

    // Mock modifiers module
    vi.doMock('@/helpers/modifiers.js', () => ({
        getDebounced: vi.fn(() => vi.fn()),
        getThrottled: vi.fn(() => vi.fn()),
    }));

    eventDirectives = await import('@/directives/events.js');
});

/**
 * All directives that should be exported from events.js
 */
const EXPECTED_DIRECTIVES = {
    // Mouse
    dblclickDirective: 'dblclick',
    mousedownDirective: 'mousedown',
    mouseupDirective: 'mouseup',
    mouseenterDirective: 'mouseenter',
    mouseleaveDirective: 'mouseleave',
    mouseoverDirective: 'mouseover',
    mouseoutDirective: 'mouseout',
    mousemoveDirective: 'mousemove',
    contextmenuDirective: 'contextmenu',
    // Keyboard
    keydownDirective: 'keydown',
    keyupDirective: 'keyup',
    keypressDirective: 'keypress',
    // Focus
    focusDirective: 'focus',
    focusinDirective: 'focusin',
    focusoutDirective: 'focusout',
    // Touch
    touchstartDirective: 'touchstart',
    touchendDirective: 'touchend',
    touchmoveDirective: 'touchmove',
    touchcancelDirective: 'touchcancel',
    // Form
    changeDirective: 'change',
    inputDirective: 'input',
    resetDirective: 'reset',
    // Drag
    dragstartDirective: 'dragstart',
    dragendDirective: 'dragend',
    dragenterDirective: 'dragenter',
    dragleaveDirective: 'dragleave',
    dragoverDirective: 'dragover',
    dropDirective: 'drop',
    // Clipboard
    copyDirective: 'copy',
    cutDirective: 'cut',
    pasteDirective: 'paste',
    // Other
    wheelDirective: 'wheel',
    resizeDirective: 'resize',
};

describe('DOM Event Directives', () => {
    it('should export all expected directives', () => {
        for (let name of Object.keys(EXPECTED_DIRECTIVES)) {
            expect(eventDirectives[name]).toBeDefined();
        }
    });

    it('should export exactly the expected number of directives', () => {
        let exportedNames = Object.keys(eventDirectives);
        expect(exportedNames.length).toBe(Object.keys(EXPECTED_DIRECTIVES).length);
    });

    describe.each(Object.entries(EXPECTED_DIRECTIVES))('%s (v-%s)', (exportName, eventName) => {
        it('should have mounted hook', () => {
            expect(typeof eventDirectives[exportName].mounted).toBe('function');
        });

        it('should have updated hook', () => {
            expect(typeof eventDirectives[exportName].updated).toBe('function');
        });

        it('should have unmounted hook', () => {
            expect(typeof eventDirectives[exportName].unmounted).toBe('function');
        });

        it('should add correct event listener', () => {
            const directive = eventDirectives[exportName];
            const el = document.createElement('div');
            const spy = vi.spyOn(el, 'addEventListener');

            const mockLivue = { call: vi.fn(), callWithConfirm: vi.fn() };
            const mockVnode = { ctx: { setupState: { livue: mockLivue } } };

            directive.mounted(el, { arg: 'handler', modifiers: {} }, mockVnode);

            expect(spy).toHaveBeenCalledWith(eventName, expect.any(Function), expect.any(Object));
        });
    });
});
