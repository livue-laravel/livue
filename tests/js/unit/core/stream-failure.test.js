/**
 * A stream that fails rejects, as call() does: resolving undefined told the
 * caller it had finished, and a page that then re-read its data dropped what
 * the user had just sent.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let LiVueComponent;
let mockSendCommit;
let mockSendAction;
let confirmSpy;
let mockStreamRequest;
let mockHandleError;
let mockSetErrors;

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
    el.dataset.livueId = 'stream-failure-' + Math.random().toString(36).substr(2, 6);
    el.dataset.livueSnapshot = JSON.stringify({ state, memo });
    el.innerHTML = '<div>test</div>';

    let component = new LiVueComponent(el);
    return component._rootLivue;
}

beforeEach(async () => {
    vi.resetModules();

    mockStreamRequest = vi.fn();
    mockHandleError = vi.fn();
    mockSetErrors = vi.fn();
    mockSendAction = vi.fn(() => Promise.resolve(makeResponse()));
    mockSendCommit = vi.fn(() => Promise.resolve(makeResponse()));

    vi.doMock('@/features/request/request.js', () => ({
        sendAction: mockSendAction,
        sendCommit: mockSendCommit,
    }));

    vi.doMock('@/helpers/errors.js', () => ({
        createErrors: () => ({}),
        setErrors: mockSetErrors,
        clearErrors: vi.fn(),
        handleError: mockHandleError,
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
        streamRequest: mockStreamRequest,
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

describe('A failed stream', () => {
    it('rejects after the error handler ran, and leaves the component idle', async () => {
        const failure = Object.assign(new Error('no such table: attachments'), { status: 500 });
        mockStreamRequest.mockImplementation(() => Promise.reject(failure));
        const livue = createComponent();

        await expect(livue.stream('send', ['hello'], { background: true })).rejects.toBe(failure);
        expect(mockHandleError).toHaveBeenCalledWith(failure, expect.anything());
        expect(livue.streaming).toBe(false);
        expect(livue.loading).toBe(false);
    });

    it('rejects a validation failure too, with its errors in the bag', async () => {
        const failure = Object.assign(new Error('invalid'), { status: 422, data: { errors: { text: ['required'] } } });
        mockStreamRequest.mockImplementation(() => Promise.reject(failure));
        const livue = createComponent();

        await expect(livue.stream('send', [])).rejects.toBe(failure);
        expect(mockSetErrors).toHaveBeenCalledWith(expect.anything(), { text: ['required'] });
        expect(mockHandleError).not.toHaveBeenCalled();
    });

    it('still resolves with the response when it succeeds', async () => {
        const response = makeResponse();
        mockStreamRequest.mockImplementation(() => Promise.resolve(response));
        const livue = createComponent();

        expect(await livue.stream('send', [], { background: true })).toBe(response);
    });
});
