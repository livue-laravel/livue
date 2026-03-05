import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let LiVueComponent;
let createPiniaMock;
let defineStoreMock;
let useStoreCalls;

beforeEach(async () => {
    vi.resetModules();
    useStoreCalls = [];

    vi.doMock('@/features/request/request.js', () => ({
        sendAction: vi.fn(),
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
        getBuiltInDirectives: vi.fn(() => []),
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
    }));

    vi.doMock('@/helpers/hooks.js', () => ({
        trigger: vi.fn(),
        createCleanupCollector: vi.fn(() => ({ cleanup: vi.fn(), runCleanups: vi.fn() })),
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

    vi.doMock('pinia', () => {
        createPiniaMock = vi.fn(() => ({
            install: vi.fn(),
            _s: new Map(),
        }));

        defineStoreMock = vi.fn((id, definition) => {
            let instance = { $id: id, definition: definition };
            let useStore = vi.fn((pinia) => {
                // Simulate production failure when Pinia is not passed/active.
                if (!pinia || typeof pinia !== 'object') {
                    throw new TypeError("Cannot read properties of undefined (reading '_s')");
                }

                useStoreCalls.push({ id: id, pinia: pinia });
                return instance;
            });

            return useStore;
        });

        return {
            createPinia: createPiniaMock,
            defineStore: defineStoreMock,
        };
    });

    const mod = await import('@/core/component.js');
    LiVueComponent = mod.default;
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('Store Bootstrap', () => {
    it('passes component pinia instance when hydrating memo stores at mount', () => {
        let el = document.createElement('div');
        el.dataset.livueId = 'store-bootstrap-test';
        el.dataset.livueSnapshot = JSON.stringify({
            state: { count: 1 },
            memo: {
                name: 'store-bootstrap-test',
                checksum: 'abc',
                stores: [
                    {
                        name: 'demo-counter',
                        scope: 'component',
                        state: { count: 1 },
                    },
                ],
            },
        });
        el.innerHTML = '<div><span>{{ count }}</span></div>';

        // Should not throw: useStore receives explicit Pinia instance.
        let component = new LiVueComponent(el);

        expect(component).toBeTruthy();
        expect(createPiniaMock).toHaveBeenCalledTimes(1);
        expect(defineStoreMock).toHaveBeenCalledTimes(1);
        expect(useStoreCalls).toHaveLength(1);
        expect(useStoreCalls[0].id).toBe('store-bootstrap-test:demo-counter');
        expect(useStoreCalls[0].pinia).toBe(createPiniaMock.mock.results[0].value);
    });
});
