/**
 * Tests for the action loading helpers added to the livue object:
 *   - livue.isCallingAction(name)
 *   - livue.runAction(name, callMethod, params?)
 *   - livue.runActionWithConfirm(name, callMethod, message, params?)
 *   - livue.isSubmittingForm(formName?)
 *   - livue.runFormSubmit(formName, method, params?)
 *
 * These helpers track in-flight server actions by their semantic name so
 * Blade templates can drive `:loading` bindings on a per-action basis.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let LiVueComponent;
let mockSendAction;
let mockSendCommit;
let confirmSpy;

function makeResponse(overrides) {
    return {
        snapshot: JSON.stringify({ state: {}, memo: { name: 'test', checksum: 'abc' } }),
        state: {},
        html: '<div>ok</div>',
        events: [],
        ...overrides,
    };
}

/** Yield until queueMicrotask-scheduled executeCommit invokes sendCommit. */
function flushCommitQueue() {
    return new Promise((r) => setTimeout(r, 0));
}

function createComponent() {
    let state = {};
    let memo = { name: 'test-component', checksum: 'test-checksum' };

    let el = document.createElement('div');
    el.dataset.livueId = 'action-loading-' + Math.random().toString(36).substr(2, 6);
    el.dataset.livueSnapshot = JSON.stringify({ state, memo });
    el.innerHTML = '<div>test</div>';

    let component = new LiVueComponent(el);
    return component._rootLivue;
}

beforeEach(async () => {
    vi.resetModules();

    mockSendAction = vi.fn(() => Promise.resolve(makeResponse()));
    mockSendCommit = vi.fn(() => Promise.resolve(makeResponse()));

    vi.doMock('@/features/request/request.js', () => ({
        sendAction: mockSendAction,
        sendCommit: mockSendCommit,
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
        on: vi.fn(() => vi.fn()),
        emit: vi.fn(),
        removeByComponentId: vi.fn(),
        processServerEvents: vi.fn(),
    }));

    vi.doMock('@/features/navigation.js', () => ({
        handleRedirect: vi.fn(),
        navigateTo: vi.fn(),
    }));

    vi.doMock('@/features/url.js', () => ({ updateQueryString: vi.fn() }));

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
        defineStore: vi.fn((id, definition) => {
            let instance = { $id: id, definition };
            return vi.fn(() => instance);
        }),
    }));

    confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    const mod = await import('@/core/component.js');
    LiVueComponent = mod.default;
});

afterEach(() => {
    vi.clearAllMocks();
    confirmSpy && confirmSpy.mockRestore();
});

describe('Action loading state', () => {
    describe('runAction / isCallingAction', () => {
        it('flips isCallingAction to true while the call is in flight, then back to false', async () => {
            let resolve;
            mockSendCommit.mockImplementation(() => new Promise((r) => { resolve = r; }));

            let livue = createComponent();

            expect(livue.isCallingAction('refresh')).toBe(false);

            let pending = livue.runAction('refresh', 'callAction');

            expect(livue.isCallingAction('refresh')).toBe(true);
            expect(livue.isCallingAction('other')).toBe(false);

            await flushCommitQueue();
            resolve(makeResponse());
            await pending;

            expect(livue.isCallingAction('refresh')).toBe(false);
        });

        it('forwards { name, ...params } as the first arg to callMethod', async () => {
            let livue = createComponent();

            await livue.runAction('archive', 'callAction', { recordKey: 42 });

            expect(mockSendCommit).toHaveBeenCalledTimes(1);
            let calls = mockSendCommit.mock.calls[0][1];
            expect(calls).toEqual([
                { method: 'callAction', params: [{ name: 'archive', recordKey: 42 }] },
            ]);
        });

        it('drops concurrent invocations with the same action name (multi-click guard)', async () => {
            let resolve;
            mockSendCommit.mockImplementation(() => new Promise((r) => { resolve = r; }));

            let livue = createComponent();

            let first = livue.runAction('refresh', 'callAction');
            let second = livue.runAction('refresh', 'callAction');

            await flushCommitQueue();
            expect(mockSendCommit).toHaveBeenCalledTimes(1);

            resolve(makeResponse());
            await first;
            await second;

            // Second invocation should not have triggered a new request
            expect(mockSendCommit).toHaveBeenCalledTimes(1);
        });

        it('clears the tracking even when the call rejects', async () => {
            mockSendCommit.mockRejectedValue({ status: 500, data: {} });

            let livue = createComponent();

            try {
                await livue.runAction('refresh', 'callAction');
            } catch (e) {
                // expected — handleError swallows server errors but the
                // promise chain still rejects in some paths
            }

            expect(livue.isCallingAction('refresh')).toBe(false);
        });

        it('isCallingAction() without a name reports any in-flight action', async () => {
            let resolve;
            mockSendCommit.mockImplementation(() => new Promise((r) => { resolve = r; }));

            let livue = createComponent();

            expect(livue.isCallingAction()).toBe(false);

            let pending = livue.runAction('refresh', 'callAction');
            expect(livue.isCallingAction()).toBe(true);

            await flushCommitQueue();
            resolve(makeResponse());
            await pending;

            expect(livue.isCallingAction()).toBe(false);
        });
    });

    describe('runActionWithConfirm', () => {
        it('skips the call and tracking when the user cancels', async () => {
            confirmSpy.mockReturnValue(false);

            let livue = createComponent();

            await livue.runActionWithConfirm('delete', 'callAction', 'Sure?');

            expect(mockSendCommit).not.toHaveBeenCalled();
            expect(livue.isCallingAction('delete')).toBe(false);
        });

        it('runs the action when the user confirms', async () => {
            confirmSpy.mockReturnValue(true);

            let livue = createComponent();

            await livue.runActionWithConfirm('delete', 'callAction', 'Sure?');

            expect(mockSendCommit).toHaveBeenCalledTimes(1);
            let calls = mockSendCommit.mock.calls[0][1];
            expect(calls[0].params[0]).toEqual({ name: 'delete' });
        });
    });

    describe('runFormSubmit / isSubmittingForm', () => {
        it('flips isSubmittingForm to true during submit then back', async () => {
            let resolve;
            mockSendCommit.mockImplementation(() => new Promise((r) => { resolve = r; }));

            let livue = createComponent();

            expect(livue.isSubmittingForm('form')).toBe(false);

            let pending = livue.runFormSubmit('form', 'save');

            expect(livue.isSubmittingForm('form')).toBe(true);
            expect(livue.isSubmittingForm()).toBe(true);
            expect(livue.isSubmittingForm('other')).toBe(false);

            await flushCommitQueue();
            resolve(makeResponse());
            await pending;

            expect(livue.isSubmittingForm('form')).toBe(false);
            expect(livue.isSubmittingForm()).toBe(false);
        });

        it('drops concurrent submits for the same form name', async () => {
            let resolve;
            mockSendCommit.mockImplementation(() => new Promise((r) => { resolve = r; }));

            let livue = createComponent();

            let first = livue.runFormSubmit('form', 'save');
            let second = livue.runFormSubmit('form', 'save');

            await flushCommitQueue();
            expect(mockSendCommit).toHaveBeenCalledTimes(1);

            resolve(makeResponse());
            await first;
            await second;

            expect(mockSendCommit).toHaveBeenCalledTimes(1);
        });
    });
});
