/**
 * Tests for the setup Proxy that enables direct server method calls in templates.
 *
 * The setup() return value is wrapped in a Proxy that intercepts unknown
 * properties and returns wrapper functions calling livue.call(). This allows
 * templates to use @click="increment(2)" instead of @click="livue.increment(2)".
 *
 * Vue resolves template expressions via PublicInstanceProxyHandlers.get which
 * calls hasOwn(setupState, key) — this uses [[GetOwnProperty]] on the Proxy,
 * so we need the getOwnPropertyDescriptor trap in addition to get and has.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let LiVueComponent;
let mockSendAction;
let mockSendCommit;

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
    el.dataset.livueId = 'setup-proxy-' + Math.random().toString(36).substr(2, 6);
    el.dataset.livueSnapshot = JSON.stringify({ state, memo });
    el.innerHTML = '<div>test</div>';

    return new LiVueComponent(el);
}

/**
 * Access the setup proxy from a component's Vue app instance.
 *
 * The Vue app is a shell that renders <component :is="rootDef">.
 * The actual component with our setup Proxy is one level deeper.
 * Vue wraps setup() return with proxyRefs, which forwards to our Proxy.
 */
function getSetupProxy(component) {
    let app = component.vueApp;
    let instance = app._instance;
    if (instance && instance.subTree && instance.subTree.component) {
        return instance.subTree.component.setupState;
    }
    return null;
}

describe('Setup Proxy', () => {

    describe('server method access via setup proxy', () => {
        it('should return a callable function for unknown properties', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            // The proxy should return a function for unknown props
            expect(typeof proxy.increment).toBe('function');
        });

        it('should call livue.call() when the proxied function is invoked', async () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            await proxy.increment(2);

            expect(mockSendCommit).toHaveBeenCalledTimes(1);
            let args = mockSendCommit.mock.calls[0];
            expect(args[1]).toEqual([{ method: 'increment', params: [2] }]);
        });

        it('should call livue.call() with no params when invoked without arguments', async () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            await proxy.reset();

            expect(mockSendCommit).toHaveBeenCalledTimes(1);
            let args = mockSendCommit.mock.calls[0];
            expect(args[1]).toEqual([{ method: 'reset', params: [] }]);
        });

        it('should call livue.call() with multiple params', async () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            await proxy.update('name', 'John');

            expect(mockSendCommit).toHaveBeenCalledTimes(1);
            let args = mockSendCommit.mock.calls[0];
            expect(args[1]).toEqual([{ method: 'update', params: ['name', 'John'] }]);
        });

        it('should not fire server calls during render for v-click call expressions', () => {
            createComponent(
                { page: 1 },
                '<div><button v-click="setPage(2)">Go</button></div>',
            );

            // v-click values are evaluated during render; runtime should defer
            // instead of sending a request immediately.
            expect(mockSendAction).not.toHaveBeenCalled();
        });
    });

    describe('method whitelist from snapshot memo', () => {
        it('should proxy only methods listed in memo.methods', () => {
            let component = createComponent({ count: 0 }, { methods: ['increment'] });
            let proxy = getSetupProxy(component);

            expect(typeof proxy.increment).toBe('function');
            expect(proxy.notDeclared).toBeUndefined();

            expect('increment' in proxy).toBe(true);
            expect('notDeclared' in proxy).toBe(false);

            expect(Object.hasOwn(proxy, 'increment')).toBe(true);
            expect(Object.hasOwn(proxy, 'notDeclared')).toBe(false);
        });

        it('should disable server-method proxying when memo.methods is empty', () => {
            let component = createComponent({ count: 0 }, { methods: [] });
            let proxy = getSetupProxy(component);

            expect(proxy.increment).toBeUndefined();
            expect('increment' in proxy).toBe(false);
            expect(Object.hasOwn(proxy, 'increment')).toBe(false);
        });
    });

    describe('existing properties pass through', () => {
        it('should not intercept state refs', () => {
            let component = createComponent({ count: 42 });
            let proxy = getSetupProxy(component);

            // count is a state ref, should pass through (proxyRefs unwraps it)
            expect(proxy.count).toBe(42);
        });

        it('should not intercept livue helper', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            expect(proxy.livue).toBeDefined();
            expect(typeof proxy.livue.call).toBe('function');
        });

        it('should not intercept livueV', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            expect(proxy.livueV).toBeDefined();
        });

        it('should expose stores alias from livue helper', () => {
            let component = createComponent({}, {
                stores: [
                    { name: 'shared', scope: 'component', state: { count: 1 } },
                ],
            });
            let proxy = getSetupProxy(component);

            expect(proxy.stores).toBeDefined();
            expect(proxy.stores.shared).toBeDefined();
        });
    });

    describe('getOwnPropertyDescriptor trap (Vue hasOwn)', () => {
        it('should return a descriptor for unknown server method properties', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            let desc = Object.getOwnPropertyDescriptor(proxy, 'increment');
            expect(desc).toBeDefined();
            expect(desc.configurable).toBe(true);
        });

        it('should return original descriptor for existing properties', () => {
            let component = createComponent({ count: 0 });
            let proxy = getSetupProxy(component);

            let desc = Object.getOwnPropertyDescriptor(proxy, 'count');
            expect(desc).toBeDefined();
        });

        it('should return undefined for blacklisted properties', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            // 'then' is blacklisted and not on the base object
            let desc = Object.getOwnPropertyDescriptor(proxy, 'then');
            expect(desc).toBeUndefined();
        });

        it('should return undefined for $-prefixed properties', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            let desc = Object.getOwnPropertyDescriptor(proxy, '$unknown');
            expect(desc).toBeUndefined();
        });

        it('should return undefined for __-prefixed properties', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            let desc = Object.getOwnPropertyDescriptor(proxy, '__v_isReactive');
            expect(desc).toBeUndefined();
        });

        it('should make hasOwn return true for server methods', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            expect(Object.hasOwn(proxy, 'increment')).toBe(true);
            expect(Object.hasOwn(proxy, 'save')).toBe(true);
        });

        it('should make hasOwn return false for blacklisted properties', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            expect(Object.hasOwn(proxy, 'then')).toBe(false);
            expect(Object.hasOwn(proxy, 'toJSON')).toBe(false);
        });
    });

    describe('has trap (in operator)', () => {
        it('should return true for existing properties', () => {
            let component = createComponent({ count: 0 });
            let proxy = getSetupProxy(component);

            expect('count' in proxy).toBe(true);
            expect('livue' in proxy).toBe(true);
        });

        it('should return true for server method names', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            expect('increment' in proxy).toBe(true);
            expect('save' in proxy).toBe(true);
        });

        it('should return false for blacklisted properties', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            expect('then' in proxy).toBe(false);
            expect('toJSON' in proxy).toBe(false);
        });

        it('should return false for $-prefixed unknown properties', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            expect('$unknown' in proxy).toBe(false);
        });

        it('should return false for __-prefixed properties not on target', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            expect('__v_isReactive' in proxy).toBe(false);
        });
    });

    describe('blacklist and protected prefixes', () => {
        it('should not proxy "then" (prevents Promise confusion)', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            expect(proxy.then).toBeUndefined();
        });

        it('should not proxy "toJSON"', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            expect(proxy.toJSON).toBeUndefined();
        });

        it('should not proxy "constructor"', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            // constructor comes from Object.prototype, not our proxy
            expect(proxy.constructor).toBe(Object);
            mockSendAction.mockClear();
            proxy.constructor();
            expect(mockSendAction).not.toHaveBeenCalled();
        });

        it('should not proxy $-prefixed properties', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            expect(proxy.$unknownMethod).toBeUndefined();
        });

        it('should not proxy __-prefixed properties', () => {
            let component = createComponent();
            let proxy = getSetupProxy(component);

            // __v_raw is handled by Vue's proxyRefs layer (returns the raw target),
            // but our Proxy does NOT intercept it — it falls through via Reflect
            // Our proxy should not create a server method wrapper for it
            let raw = proxy.__v_raw;
            expect(typeof raw).not.toBe('function');
        });
    });

    describe('set trap', () => {
        it('should allow setting properties on the base object', () => {
            let component = createComponent({ count: 0 });
            let proxy = getSetupProxy(component);

            // Setting a ref value should pass through
            proxy.count = 10;
            expect(proxy.count).toBe(10);
        });
    });

    describe('ownKeys trap', () => {
        it('should return only the base object keys', () => {
            let component = createComponent({ count: 0 });
            let proxy = getSetupProxy(component);

            let keys = Object.keys(proxy);
            // Should include real properties, not phantom server methods
            expect(keys).toContain('count');
            expect(keys).toContain('livue');
            expect(keys).toContain('livueV');
            // Should NOT include random server methods
            expect(keys).not.toContain('increment');
        });
    });
});
