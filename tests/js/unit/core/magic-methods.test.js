/**
 * Tests for magic methods ($refresh) on the livue object.
 *
 * Magic methods are $-prefixed methods handled client-side via a registry.
 * They can be invoked through livue.call('$refresh') or directly as
 * livue.$refresh() via the Proxy wrapper.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let LiVueComponent;
let mockSendAction;
let mockSendCommit;
let mockDefineStore;
let mockOn;
let mockEmit;

// Shared response stub
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

    // sendAction – used by sync(), #[Json] methods, $refresh
    mockSendAction = vi.fn(() => Promise.resolve(makeResponse()));
    // sendCommit – used by normal method calls (commit queue)
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

    mockOn = vi.fn(() => vi.fn());
    mockEmit = vi.fn();
    vi.doMock('@/features/events.js', () => ({
        on: mockOn,
        emit: mockEmit,
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
        defineStore: (mockDefineStore = vi.fn((id, definition) => {
            let instance = { $id: id, definition: definition };
            let useStore = vi.fn(() => instance);
            return useStore;
        })),
    }));

    const mod = await import('@/core/component.js');
    LiVueComponent = mod.default;
});

afterEach(() => {
    vi.clearAllMocks();
});

/**
 * Helper: create a LiVueComponent and return its root livue proxy.
 */
function createComponent(stateOverrides, memoOverrides) {
    let state = stateOverrides || { count: 0 };
    let memo = {
        name: 'test-component',
        checksum: 'test-checksum',
        ...memoOverrides,
    };

    let el = document.createElement('div');
    el.dataset.livueId = 'magic-test-' + Math.random().toString(36).substr(2, 6);
    el.dataset.livueSnapshot = JSON.stringify({ state, memo });
    el.innerHTML = '<div>test</div>';

    let component = new LiVueComponent(el);
    return component._rootLivue;
}

describe('Magic Methods', () => {

    describe('call($refresh)', () => {
        it('should invoke sendAction with method null', async () => {
            let livue = createComponent();

            await livue.call('$refresh');

            expect(mockSendAction).toHaveBeenCalledTimes(1);

            // method (second arg) must be null for refresh
            let args = mockSendAction.mock.calls[0];
            expect(args[1]).toBeNull();
            // params (third arg) should be empty array
            expect(args[2]).toEqual([]);
        });

        it('should set loading states during execution', async () => {
            // Use a deferred promise so we can inspect mid-flight state
            let resolveAction;
            mockSendAction.mockImplementation(() => new Promise((r) => { resolveAction = r; }));

            let livue = createComponent();

            let callPromise = livue.call('$refresh');

            // Mid-flight: loading states should be active
            expect(livue.loading).toBe(true);
            expect(livue.processing).toBe('$refresh');
            expect(livue.loadingTargets['$refresh']).toBe(true);

            // Resolve the action
            resolveAction(makeResponse());
            await callPromise;

            // After completion: loading states should be cleared
            expect(livue.loading).toBe(false);
            expect(livue.processing).toBeNull();
            expect(livue.loadingTargets['$refresh']).toBeUndefined();
        });

        it('should clear loading states on error', async () => {
            mockSendAction.mockRejectedValue({ status: 500, data: {} });

            let livue = createComponent();

            await livue.call('$refresh');

            expect(livue.loading).toBe(false);
            expect(livue.processing).toBeNull();
            expect(livue.loadingTargets['$refresh']).toBeUndefined();
        });
    });

    describe('Proxy: livue.$refresh()', () => {
        it('should return a callable function', () => {
            let livue = createComponent();

            expect(typeof livue.$refresh).toBe('function');
        });

        it('should invoke sendAction with method null when called', async () => {
            let livue = createComponent();

            await livue.$refresh();

            expect(mockSendAction).toHaveBeenCalledTimes(1);
            let args = mockSendAction.mock.calls[0];
            expect(args[1]).toBeNull();
        });

        it('should proxy $dispatch() to dispatch()', () => {
            let livue = createComponent();

            livue.$dispatch('saved', { id: 42 });

            expect(mockEmit).toHaveBeenCalledTimes(1);
            let args = mockEmit.mock.calls[0];
            expect(args[0]).toBe('saved');
            expect(args[1]).toEqual({ id: 42 });
            expect(args[2]).toBe('broadcast');
        });

        it('should proxy $call() to call()', async () => {
            let livue = createComponent();

            await livue.$call('increment', 2);

            expect(mockSendCommit).toHaveBeenCalledTimes(1);
            let args = mockSendCommit.mock.calls[0];
            expect(args[1]).toEqual([{ method: 'increment', params: [2] }]);
        });

        it('should proxy $on() to on()', () => {
            let livue = createComponent();

            let unsubscribe = livue.$on('item-saved', vi.fn());

            expect(typeof unsubscribe).toBe('function');
            expect(mockOn).toHaveBeenCalledTimes(1);
            let args = mockOn.mock.calls[0];
            expect(args[0]).toBe('item-saved');
            expect(args[1]).toBe('test-component');
            expect(args[2]).toBe(livue.$id);
            expect(typeof args[3]).toBe('function');
        });
    });

    describe('Proxy: existing properties pass through', () => {
        it('should not intercept $el', () => {
            let livue = createComponent();

            // $el is defined directly on the livue object, should pass through
            // (it's set from the context)
            expect('$el' in livue).toBe(true);
        });

        it('should not intercept $id', () => {
            let livue = createComponent();

            // $id is defined on the livue object
            expect(typeof livue.$id).toBe('string');
        });

        it('should not intercept $name', () => {
            let livue = createComponent();

            expect(livue.$name).toBe('test-component');
        });

        it('should return undefined for unknown $-prefixed props', () => {
            let livue = createComponent();

            expect(livue.$nonexistent).toBeUndefined();
        });
    });

    describe('Proxy: non-$ properties', () => {
        it('should pass through regular properties via reactive proxy', () => {
            let livue = createComponent();

            expect(typeof livue.call).toBe('function');
            expect(typeof livue.on).toBe('function');
            expect(typeof livue.sync).toBe('function');
            expect(livue.loading).toBe(false);
            expect(livue.processing).toBeNull();
        });

        it('should support setting properties through the proxy', () => {
            let livue = createComponent();

            livue.loading = true;
            expect(livue.loading).toBe(true);

            livue.loading = false;
            expect(livue.loading).toBe(false);
        });
    });

    describe('Proxy: server method calls', () => {
        it('should return a callable function for unknown non-$ properties', () => {
            let livue = createComponent();

            expect(typeof livue.increment).toBe('function');
        });

        it('should call sendCommit with correct method and params when invoked', async () => {
            let livue = createComponent();

            await livue.increment(2);

            expect(mockSendCommit).toHaveBeenCalledTimes(1);
            let args = mockSendCommit.mock.calls[0];
            expect(args[1]).toEqual([{ method: 'increment', params: [2] }]);
        });

        it('should call sendCommit with no params when invoked without arguments', async () => {
            let livue = createComponent();

            await livue.increment();

            expect(mockSendCommit).toHaveBeenCalledTimes(1);
            let args = mockSendCommit.mock.calls[0];
            expect(args[1]).toEqual([{ method: 'increment', params: [] }]);
        });

        it('should call sendCommit with multiple params', async () => {
            let livue = createComponent();

            await livue.update('name', 'John');

            expect(mockSendCommit).toHaveBeenCalledTimes(1);
            let args = mockSendCommit.mock.calls[0];
            expect(args[1]).toEqual([{ method: 'update', params: ['name', 'John'] }]);
        });

        it('should return undefined for blacklisted property "then"', () => {
            let livue = createComponent();

            expect(livue.then).toBeUndefined();
        });

        it('should return undefined for blacklisted property "toJSON"', () => {
            let livue = createComponent();

            expect(livue.toJSON).toBeUndefined();
        });

        it('should not proxy blacklisted property "valueOf"', () => {
            let livue = createComponent();

            // valueOf exists on Object.prototype, so it passes through
            // and is NOT intercepted by the server method proxy
            expect(typeof livue.valueOf).toBe('function');
            livue.valueOf();
            expect(mockSendAction).not.toHaveBeenCalled();
        });

        it('should not proxy blacklisted property "toString"', () => {
            let livue = createComponent();

            // toString exists on Object.prototype, so it passes through
            expect(typeof livue.toString).toBe('function');
            livue.toString();
            expect(mockSendAction).not.toHaveBeenCalled();
        });

        it('should not intercept existing properties like loading', () => {
            let livue = createComponent();

            expect(livue.loading).toBe(false);
        });

        it('should not intercept existing methods like call', () => {
            let livue = createComponent();

            expect(typeof livue.call).toBe('function');
            // call is the actual call method, not a proxy wrapper
            // Verify it doesn't go through sendAction when accessed
            expect(mockSendAction).not.toHaveBeenCalled();
        });
    });

    describe('Proxy: has trap', () => {
        it('should report $refresh as existing via in operator', () => {
            let livue = createComponent();

            expect('$refresh' in livue).toBe(true);
        });

        it('should report $dispatch and $call aliases as existing', () => {
            let livue = createComponent();

            expect('$dispatch' in livue).toBe(true);
            expect('$call' in livue).toBe(true);
            expect('$on' in livue).toBe(true);
        });

        it('should not report unknown magic methods as existing', () => {
            let livue = createComponent();

            expect('$unknown' in livue).toBe(false);
        });

        it('should report regular properties as existing', () => {
            let livue = createComponent();

            expect('loading' in livue).toBe(true);
            expect('call' in livue).toBe(true);
        });
    });

    describe('store helper', () => {
        it('should expose livue.store() and create a component-scoped store by default', () => {
            let livue = createComponent();

            let cart = livue.store('cart', {
                state: function () {
                    return { count: 0 };
                },
            });

            expect(typeof livue.store).toBe('function');
            expect(mockDefineStore).toHaveBeenCalledTimes(1);
            expect(mockDefineStore.mock.calls[0][0]).toBe(livue.$id + ':cart');
            expect(cart.$id).toBe(livue.$id + ':cart');
        });

        it('should expose livue.useStore() for stores declared in memo.stores', () => {
            let livue = createComponent({}, {
                stores: [
                    { name: 'shared', scope: 'component', state: { count: 1 } },
                ],
            });

            let shared = livue.useStore('shared');

            expect(mockDefineStore).toHaveBeenCalled();
            expect(shared.$id).toBe(livue.$id + ':shared');
            expect(livue.stores.shared).toBeDefined();
        });

        it('should allow livue.store(name) lookup without definition when pre-registered', () => {
            let livue = createComponent({}, {
                stores: [
                    { name: 'shared', scope: 'component', state: { count: 1 } },
                ],
            });

            let shared = livue.store('shared');
            expect(shared.$id).toBe(livue.$id + ':shared');
        });
    });
});
