/**
 * A poll or a stream that is out while the user types must not put the older
 * text back: the server echoes what it was sent, and the client's newer value
 * wins wherever the server did not change it.
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

function createComponent(state = {}) {
    let memo = { name: 'test-component', checksum: 'test-checksum' };

    let el = document.createElement('div');
    el.dataset.livueId = 'typing-' + Math.random().toString(36).substr(2, 6);
    el.dataset.livueSnapshot = JSON.stringify({ state, memo });
    el.innerHTML = '<div>test</div>';

    let component = new LiVueComponent(el);
    return { livue: component._rootLivue, state: component.state };
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

function serverAnswer(state) {
    return makeResponse({ snapshot: JSON.stringify({ state, memo: { name: 'test', checksum: 'abc' } }) });
}

describe('Typing while a request is out', () => {
    it('keeps what was typed after a poll left', async () => {
        let answer;
        mockSendCommit.mockImplementation(() => new Promise((resolve) => { answer = resolve; }));
        const { livue, state } = createComponent({ draft: 'ab', runStatus: null });

        const poll = livue.call('refreshRun', []);
        await flushCommitQueue();
        state.draft = 'abc';
        answer(serverAnswer({ draft: 'ab', runStatus: 'busy' }));
        await poll;

        expect(state.draft).toBe('abc');
        expect(state.runStatus).toBe('busy');
    });

    it('keeps it through a background stream applied later', async () => {
        let answer;
        mockStreamRequest.mockImplementation(() => new Promise((resolve) => { answer = resolve; }));
        const { livue, state } = createComponent({ draft: '', answerText: '' });

        state.draft = 'hello';
        const running = livue.stream('send', [], { background: true });
        await flushCommitQueue();
        state.draft = 'next question';
        answer(serverAnswer({ draft: 'hello', answerText: 'hi' }));
        livue.applyStreamResponse(await running);

        expect(state.draft).toBe('next question');
        expect(state.answerText).toBe('hi');
    });
});
