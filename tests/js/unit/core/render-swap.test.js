/**
 * Tests for the render function swap mechanism.
 *
 * When the server returns updated HTML, buildComponentDef no longer creates
 * a new definition object. Instead, it compiles the template into a render
 * function stored in a shallowRef. On subsequent updates, _updateRender()
 * swaps the compiled render inside the existing def — Vue re-renders in place
 * and the vdom diff preserves child component instances.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { nextTick } from 'vue';

let LiVueComponent;
let mockSendAction;

function makeResponse(overrides) {
    return {
        snapshot: JSON.stringify({ state: {}, memo: { name: 'test', checksum: 'abc' } }),
        state: {},
        html: '<div>ok</div>',
        events: [],
        ...overrides,
    };
}

beforeEach(async () => {
    vi.resetModules();

    mockSendAction = vi.fn(() => Promise.resolve(makeResponse()));

    vi.doMock('@/features/request/request.js', () => ({
        sendAction: mockSendAction,
    }));

    vi.doMock('@/helpers/errors.js', () => ({
        createErrors: () => ({}),
        setErrors: vi.fn(),
        clearErrors: vi.fn(),
        handleError: vi.fn(),
        setComponentErrorHandler: vi.fn(),
        removeComponentErrorHandler: vi.fn(),
    }));

    vi.doMock('@/features/events.js', () => ({
        on: vi.fn(),
        emit: vi.fn(),
        removeByComponentId: vi.fn(),
        processServerEvents: vi.fn(),
    }));

    vi.doMock('@/features/navigation.js', () => ({
        handleRedirect: vi.fn(),
        navigateTo: vi.fn(),
    }));

    vi.doMock('@/features/url.js', () => ({
        updateQueryString: vi.fn(),
    }));

    vi.doMock('@/features/upload.js', () => ({
        uploadFile: vi.fn(),
        uploadFiles: vi.fn(),
        removeUploadFromServer: vi.fn(),
    }));

    vi.doMock('@/features/lazy.js', () => ({
        createLazyComponent: vi.fn(() => ({})),
    }));

    vi.doMock('@/helpers/modifiers.js', () => ({
        getDebounced: vi.fn(),
        getThrottled: vi.fn(),
        clearModifiers: vi.fn(),
    }));

    vi.doMock('@/features/broadcast.js', () => ({
        register: vi.fn(),
        unregister: vi.fn(),
        broadcast: vi.fn(),
        filterState: vi.fn(),
    }));

    vi.doMock('@/core/registry.js', () => ({
        getBuiltInDirectives: vi.fn(() => ({})),
    }));

    vi.doMock('@/features/echo.js', () => ({
        subscribe: vi.fn(),
        unsubscribeComponent: vi.fn(),
    }));

    vi.doMock('@/directives/transition.js', () => ({
        withViewTransition: vi.fn((fn) => fn()),
        isViewTransitionsSupported: vi.fn(() => false),
    }));

    vi.doMock('@/features/request/stream.js', () => ({
        streamRequest: vi.fn(),
        isStreaming: vi.fn(() => false),
        getStreamingMethod: vi.fn(() => null),
        clearStreamTargets: vi.fn(),
    }));

    vi.doMock('@/helpers/hooks.js', () => ({
        trigger: vi.fn(),
        createCleanupCollector: vi.fn(() => ({ cleanup: vi.fn(), runAll: vi.fn() })),
    }));

    vi.doMock('@/features/composables.js', () => ({
        createComposables: vi.fn(() => ({})),
        updateComposables: vi.fn(),
        hasComposables: vi.fn(() => false),
    }));

    vi.doMock('@/helpers/focus.js', () => ({
        captureFocusState: vi.fn(() => null),
        restoreFocusState: vi.fn(),
    }));

    vi.doMock('@/helpers/dom.js', () => ({
        insertAttributesIntoHtmlRoot: vi.fn((html) => html),
    }));

    vi.doMock('pinia', () => ({
        createPinia: vi.fn(() => ({ install: vi.fn() })),
        defineStore: vi.fn(() => vi.fn(() => ({}))),
    }));

    const mod = await import('@/core/component.js');
    LiVueComponent = mod.default;
});

afterEach(() => {
    vi.clearAllMocks();
});

/**
 * Helper: create a LiVueComponent with given state and template.
 */
function createComponent(stateOverrides, htmlOverride) {
    let state = stateOverrides || { count: 0 };
    let el = document.createElement('div');
    el.dataset.livueId = 'render-swap-' + Math.random().toString(36).substr(2, 6);
    el.dataset.livueSnapshot = JSON.stringify({
        state,
        memo: { name: 'test-component', checksum: 'test-checksum' },
    });
    el.innerHTML = htmlOverride || '<div><span>{{ count }}</span></div>';
    return new LiVueComponent(el);
}

/**
 * Get the root component Vue instance (the one rendered via <component :is>).
 */
function getRootInstance(component) {
    let appInstance = component.vueApp._instance;
    if (appInstance && appInstance.subTree && appInstance.subTree.component) {
        return appInstance.subTree.component;
    }
    return null;
}

describe('Render Function Swap', () => {

    describe('buildComponentDef structure', () => {
        it('should create a def with render function instead of template', () => {
            let component = createComponent();
            let def = component._currentRootDef;

            expect(def).toBeTruthy();
            expect(typeof def.render).toBe('function');
            expect(def.template).toBeUndefined();
        });

        it('should have _updateRender method on the def', () => {
            let component = createComponent();
            let def = component._currentRootDef;

            expect(typeof def._updateRender).toBe('function');
        });

        it('should set _rc flag on the render wrapper', () => {
            let component = createComponent();
            let def = component._currentRootDef;

            // _rc = true is required for Vue to call installWithProxy
            expect(def.render._rc).toBe(true);
        });
    });

    describe('stable definition identity', () => {
        it('should store _currentRootDef reference', () => {
            let component = createComponent();

            expect(component._currentRootDef).toBeTruthy();
            expect(component._rootDefRef.value).toBe(component._currentRootDef);
        });

        it('should NOT replace _rootDefRef.value after template update', async () => {
            let component = createComponent({ count: 0 }, '<div><span>{{ count }}</span></div>');
            let defBefore = component._rootDefRef.value;
            let currentDefBefore = component._currentRootDef;

            // Simulate a template update (what the server response triggers)
            component._currentRootDef._updateRender('<div><span>{{ count }}</span><p>new content</p></div>');

            await nextTick();

            // The def reference must be IDENTICAL — same object, not a new one
            expect(component._rootDefRef.value).toBe(defBefore);
            expect(component._currentRootDef).toBe(currentDefBefore);
        });
    });

    describe('render output updates', () => {
        it('should update rendered content after _updateRender', async () => {
            let component = createComponent({ count: 42 }, '<div><span>{{ count }}</span></div>');

            await nextTick();

            // Initial render should show count
            let el = component.el;
            expect(el.textContent).toContain('42');

            // Update the template to add extra content
            component._currentRootDef._updateRender('<div><span>{{ count }}</span><p>extra</p></div>');

            await nextTick();

            // New content should appear, count should still be there
            expect(el.textContent).toContain('42');
            expect(el.textContent).toContain('extra');
        });
    });

    describe('child component preservation', () => {
        it('should preserve child Vue component instances across template swap', async () => {
            // Create a component whose template includes a child component tag
            // We register a simple child component in the app
            let component = createComponent(
                { visible: true },
                '<div><span>parent</span></div>',
            );

            // Register a test child component in the Vue app
            let childMountCount = 0;
            let childUnmountCount = 0;
            component.vueApp.component('test-child', {
                template: '<div class="child">child content</div>',
                setup() {
                    childMountCount++;
                    const { onUnmounted } = require('vue');
                    onUnmounted(() => { childUnmountCount++; });
                    return {};
                },
            });

            // Update template to include the child component
            component._currentRootDef._updateRender('<div><span>parent</span><test-child></test-child></div>');
            await nextTick();

            expect(childMountCount).toBe(1);
            expect(childUnmountCount).toBe(0);

            // Now swap the template again — child should be PRESERVED (not remounted)
            component._currentRootDef._updateRender('<div><span>parent updated</span><test-child></test-child></div>');
            await nextTick();

            // Child should NOT have been unmounted and remounted
            expect(childMountCount).toBe(1);
            expect(childUnmountCount).toBe(0);
        });

        it('should unmount child only when removed from template', async () => {
            let component = createComponent({ show: true }, '<div><span>parent</span></div>');

            let childMountCount = 0;
            let childUnmountCount = 0;
            component.vueApp.component('removable-child', {
                template: '<div>removable</div>',
                setup() {
                    childMountCount++;
                    const { onUnmounted } = require('vue');
                    onUnmounted(() => { childUnmountCount++; });
                    return {};
                },
            });

            // Add the child
            component._currentRootDef._updateRender('<div><span>parent</span><removable-child></removable-child></div>');
            await nextTick();
            expect(childMountCount).toBe(1);

            // Remove the child from template
            component._currentRootDef._updateRender('<div><span>parent only</span></div>');
            await nextTick();

            expect(childUnmountCount).toBe(1);
        });
    });

    describe('comparison with old approach (regression guard)', () => {
        it('should NOT create a new def object on template swap (old buildComponentDef behavior)', async () => {
            let component = createComponent({ count: 0 }, '<div>{{ count }}</div>');

            let defIdentity = component._currentRootDef;
            let refIdentity = component._rootDefRef.value;

            // Use _updateRender as _updateTemplate's doSwap does
            component._currentRootDef._updateRender('<div>{{ count }} updated</div>');

            await nextTick();

            // In the OLD approach, _rootDefRef.value would be a NEW object
            // In the NEW approach, it must be the SAME object
            expect(component._rootDefRef.value).toBe(refIdentity);
            expect(component._currentRootDef).toBe(defIdentity);
        });
    });
});
