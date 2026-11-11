/**
 * Calls made in the same tick are sent together (one commit): each must get
 * its own return value back, not the last one of the batch.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let LiVueComponent;
let mockSendCommit;
let mockSendAction;
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

describe('Batched calls', () => {
    it('resolves each call with its own return value', async () => {
        mockSendCommit.mockImplementation(() => Promise.resolve(makeResponse({ jsonResult: null, jsonResults: ['spoken text', null] })));
        const livue = createComponent();

        const first = livue.call('transcribe', []);
        const second = livue.call('log', ['x']);
        await flushCommitQueue();

        expect(mockSendCommit).toHaveBeenCalledTimes(1);
        expect(await first).toBe('spoken text');
        expect(await second).toBeUndefined();
    });

    it('keeps the single result when the server sends one', async () => {
        mockSendCommit.mockImplementation(() => Promise.resolve(makeResponse({ jsonResult: 42 })));
        const livue = createComponent();

        const only = livue.call('answer', []);
        await flushCommitQueue();

        expect(await only).toBe(42);
    });
});
