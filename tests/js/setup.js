/**
 * Global test setup for LiVue JavaScript tests.
 */

import { vi, beforeEach, afterEach } from 'vitest';

// Mock import.meta.env
globalThis.import = {
    meta: {
        env: {
            DEV: false,
            PROD: true,
        },
    },
};

// Mock History API to avoid cross-origin errors
class MockHistory {
    constructor() {
        this._states = [{ state: null, title: '', url: '/' }];
        this._index = 0;
        // Make pushState and replaceState spyable
        this.pushState = vi.fn((state, title, url) => this._pushState(state, title, url));
        this.replaceState = vi.fn((state, title, url) => this._replaceState(state, title, url));
    }

    get state() {
        return this._states[this._index]?.state || null;
    }

    get length() {
        return this._states.length;
    }

    _pushState(state, title, url) {
        // Remove any forward history
        this._states = this._states.slice(0, this._index + 1);
        this._states.push({ state, title, url: url || '' });
        this._index = this._states.length - 1;

        // Update location mock
        this._updateLocation(url);
    }

    _replaceState(state, title, url) {
        this._states[this._index] = { state, title, url: url || '' };

        // Update location mock
        this._updateLocation(url);
    }

    _updateLocation(url) {
        if (!url || !globalThis._mockLocation) return;

        try {
            const parsed = new URL(url, globalThis._mockLocation.origin);
            globalThis._mockLocation.pathname = parsed.pathname;
            globalThis._mockLocation.href = parsed.href;
            globalThis._mockLocation.search = parsed.search;
            globalThis._mockLocation.hash = parsed.hash;
        } catch (e) {
            // Handle relative URL manually
            let pathname = url;
            let search = '';
            let hash = '';

            const hashIndex = pathname.indexOf('#');
            if (hashIndex !== -1) {
                hash = pathname.substring(hashIndex);
                pathname = pathname.substring(0, hashIndex);
            }

            const searchIndex = pathname.indexOf('?');
            if (searchIndex !== -1) {
                search = pathname.substring(searchIndex);
                pathname = pathname.substring(0, searchIndex);
            }

            globalThis._mockLocation.pathname = pathname || '/';
            globalThis._mockLocation.search = search;
            globalThis._mockLocation.hash = hash;
            globalThis._mockLocation.href = globalThis._mockLocation.origin + pathname + search + hash;
        }
    }

    back() {
        if (this._index > 0) {
            this._index--;
            window.dispatchEvent(new PopStateEvent('popstate', { state: this.state }));
        }
    }

    forward() {
        if (this._index < this._states.length - 1) {
            this._index++;
            window.dispatchEvent(new PopStateEvent('popstate', { state: this.state }));
        }
    }

    go(delta) {
        const newIndex = this._index + delta;
        if (newIndex >= 0 && newIndex < this._states.length) {
            this._index = newIndex;
            window.dispatchEvent(new PopStateEvent('popstate', { state: this.state }));
        }
    }

    reset() {
        this._states = [{ state: null, title: '', url: '/' }];
        this._index = 0;
        if (this.pushState && typeof this.pushState.mockClear === 'function') {
            this.pushState.mockClear();
        }
        if (this.replaceState && typeof this.replaceState.mockClear === 'function') {
            this.replaceState.mockClear();
        }
    }
}

// Create mock location
globalThis._mockLocation = {
    href: 'http://localhost:3000/',
    pathname: '/',
    origin: 'http://localhost:3000',
    host: 'localhost:3000',
    hostname: 'localhost',
    port: '3000',
    protocol: 'http:',
    search: '',
    hash: '',
    assign: vi.fn((url) => {
        globalThis._mockLocation.href = url;
    }),
    replace: vi.fn((url) => {
        globalThis._mockLocation.href = url;
    }),
    reload: vi.fn(),
    // Required for new URL(window.location) to work
    toString() {
        return this.href;
    },
};

// Install mock history
const mockHistory = new MockHistory();
globalThis.history = mockHistory;
globalThis.MockHistory = MockHistory;

// Install mock location on both window and globalThis
Object.defineProperty(window, 'location', {
    get: () => globalThis._mockLocation,
    set: (val) => {
        if (typeof val === 'string') {
            globalThis._mockLocation.href = val;
        } else {
            Object.assign(globalThis._mockLocation, val);
        }
    },
    configurable: true,
});

// Also set globalThis.location for code that uses `location` directly
Object.defineProperty(globalThis, 'location', {
    get: () => globalThis._mockLocation,
    set: (val) => {
        if (typeof val === 'string') {
            globalThis._mockLocation.href = val;
        } else {
            Object.assign(globalThis._mockLocation, val);
        }
    },
    configurable: true,
});

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock CSRF meta tag
beforeEach(() => {
    // Reset DOM
    document.head.innerHTML = '<meta name="csrf-token" content="test-csrf-token">';
    document.body.innerHTML = '';

    // Reset history and location
    mockHistory.reset();
    globalThis._mockLocation.href = 'http://localhost:3000/';
    globalThis._mockLocation.pathname = '/';
    globalThis._mockLocation.search = '';
    globalThis._mockLocation.hash = '';

    // Reset scrollTo mock
    window.scrollTo.mockClear();
});

afterEach(() => {
    // Clean up any timers
    vi.clearAllTimers();
    vi.useRealTimers();
});

// Mock fetch globally
globalThis.fetch = vi.fn();

// Mock MutationObserver
class MockMutationObserver {
    constructor(callback) {
        this.callback = callback;
        this.observing = false;
    }

    observe(target, options) {
        this.observing = true;
        this.target = target;
        this.options = options;
    }

    disconnect() {
        this.observing = false;
    }

    // Helper to trigger mutations in tests
    trigger(mutations) {
        if (this.observing) {
            this.callback(mutations, this);
        }
    }
}

globalThis.MutationObserver = MockMutationObserver;

// Mock IntersectionObserver
class MockIntersectionObserver {
    constructor(callback) {
        this.callback = callback;
        this.elements = new Set();
    }

    observe(element) {
        this.elements.add(element);
    }

    unobserve(element) {
        this.elements.delete(element);
    }

    disconnect() {
        this.elements.clear();
    }

    // Helper to trigger intersection in tests
    trigger(entries) {
        this.callback(entries, this);
    }
}

globalThis.IntersectionObserver = MockIntersectionObserver;

// Mock BroadcastChannel
class MockBroadcastChannel {
    constructor(name) {
        this.name = name;
        this.onmessage = null;
        MockBroadcastChannel.instances.set(name, this);
    }

    postMessage(data) {
        // Deliver to other instances with same name
        MockBroadcastChannel.instances.forEach((instance, name) => {
            if (name === this.name && instance !== this && instance.onmessage) {
                instance.onmessage({ data });
            }
        });
    }

    close() {
        MockBroadcastChannel.instances.delete(this.name);
    }

    static instances = new Map();

    static reset() {
        this.instances.clear();
    }
}

globalThis.BroadcastChannel = MockBroadcastChannel;
globalThis.MockBroadcastChannel = MockBroadcastChannel;

// Mock requestAnimationFrame
globalThis.requestAnimationFrame = vi.fn((callback) => {
    return setTimeout(callback, 0);
});

globalThis.cancelAnimationFrame = vi.fn((id) => {
    clearTimeout(id);
});

// Mock queueMicrotask if not available
if (typeof globalThis.queueMicrotask !== 'function') {
    globalThis.queueMicrotask = (callback) => {
        Promise.resolve().then(callback);
    };
}

// Mock CustomEvent if not fully implemented
if (typeof CustomEvent !== 'function') {
    globalThis.CustomEvent = class CustomEvent extends Event {
        constructor(type, options = {}) {
            super(type, options);
            this.detail = options.detail || null;
        }
    };
}

// Helper to create a mock LiVue component element
globalThis.createMockLiVueElement = (options = {}) => {
    const el = document.createElement('div');
    const id = options.id || 'test-component-' + Math.random().toString(36).substr(2, 9);

    el.dataset.livueId = id;
    el.dataset.livueSnapshot = JSON.stringify({
        state: options.state || {},
        memo: {
            name: options.name || 'test-component',
            checksum: options.checksum || 'test-checksum',
            ...options.memo,
        },
    });

    if (options.island) {
        el.dataset.livueIsland = '';
    }

    if (options.persist) {
        el.dataset.livuePersist = options.persist;
    }

    el.innerHTML = options.html || '<div>Test content</div>';

    return el;
};

// Helper to create a mock fetch response
globalThis.createMockResponse = (data, options = {}) => {
    const isHtml = typeof data === 'string' && (data.includes('<html') || data.includes('<!DOCTYPE'));
    const contentType = options.contentType || (isHtml ? 'text/html' : 'application/json');

    return {
        ok: options.ok !== false,
        status: options.status || 200,
        headers: {
            get: (name) => {
                if (name.toLowerCase() === 'content-type') return contentType;
                return options.headers?.[name] || null;
            },
        },
        json: () => Promise.resolve(typeof data === 'string' ? JSON.parse(data) : data),
        text: () => Promise.resolve(typeof data === 'string' ? data : JSON.stringify(data)),
    };
};

// Helper to wait for microtasks to complete
globalThis.flushMicrotasks = () => new Promise(resolve => setTimeout(resolve, 0));

// Helper to wait for multiple animation frames
globalThis.flushAnimationFrames = async (count = 1) => {
    for (let i = 0; i < count; i++) {
        await new Promise(resolve => requestAnimationFrame(resolve));
    }
};
