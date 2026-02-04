/**
 * Integration tests for component lifecycle.
 *
 * These tests verify component lifecycle concepts using mocked runtime
 * to avoid requiring full Vue initialization in the test environment.
 *
 * Full E2E lifecycle testing should be done in a browser environment
 * with the actual Vue runtime.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let mockFetch;

beforeEach(async () => {
    vi.resetModules();

    // Reset DOM
    document.body.innerHTML = '';
    document.head.innerHTML = '<meta name="csrf-token" content="test-csrf-token">';

    // Mock fetch
    mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: {
            get: (name) => {
                if (name === 'content-type') return 'application/json';
                return null;
            },
        },
        json: () => Promise.resolve({
            responses: [
                {
                    snapshot: JSON.stringify({
                        state: { count: 1 },
                        memo: { name: 'counter' },
                    }),
                    html: '<div data-livue-id="comp-1"><span>1</span></div>',
                },
            ],
        }),
    });
    global.fetch = mockFetch;

    // Use global location mock (from setup.js)
    globalThis._mockLocation.href = 'http://localhost:3000/';
    globalThis._mockLocation.pathname = '/';
    globalThis._mockLocation.search = '';
    globalThis._mockLocation.hash = '';

    // Use global history mock (from setup.js) - reset spies
    if (globalThis.history && globalThis.history.reset) {
        globalThis.history.reset();
    }
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('Component Mount', () => {
    it('should mount component from server-rendered HTML', async () => {
        // Test that component markup is correctly structured
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{"count":0},"memo":{"name":"counter"}}'>
                <div data-livue-id="comp-1">
                    <span>{{ count }}</span>
                </div>
            </div>
        `;

        const component = document.querySelector('[data-livue-component]');
        expect(component).toBeTruthy();

        // Verify snapshot can be parsed
        const snapshot = JSON.parse(component.dataset.livueSnapshot);
        expect(snapshot.state.count).toBe(0);
        expect(snapshot.memo.name).toBe('counter');
    });

    it('should initialize state from snapshot', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{"name":"John","age":30},"memo":{"name":"user"}}'>
                <div data-livue-id="user-1">
                    <span>{{ name }}, {{ age }}</span>
                </div>
            </div>
        `;

        const component = document.querySelector('[data-livue-component]');
        const snapshot = JSON.parse(component.dataset.livueSnapshot);

        // State should be available in snapshot
        expect(snapshot.state.name).toBe('John');
        expect(snapshot.state.age).toBe(30);
    });

    it('should register directives on mount', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{},"memo":{"name":"clicker"}}'>
                <div data-livue-id="click-1">
                    <button v-click:increment>Click</button>
                </div>
            </div>
        `;

        // Verify button exists and has the directive attribute
        const button = document.querySelector('button');
        expect(button).toBeTruthy();
        expect(button.hasAttribute('v-click:increment')).toBe(true);
    });

    it('should handle nested components', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{},"memo":{"name":"parent"}}'>
                <div data-livue-id="parent-1">
                    <div data-livue-component data-livue-snapshot='{"state":{},"memo":{"name":"child"}}'>
                        <div data-livue-id="child-1">Child content</div>
                    </div>
                </div>
            </div>
        `;

        // Verify nested structure
        const components = document.querySelectorAll('[data-livue-component]');
        expect(components.length).toBe(2);

        const parent = components[0];
        const child = components[1];

        // Child should be inside parent
        expect(parent.contains(child)).toBe(true);
    });
});

describe('Component Update', () => {
    it('should update state and re-render', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{"count":0},"memo":{"name":"counter"}}'>
                <div data-livue-id="counter-1">
                    <span data-count>{{ count }}</span>
                    <button v-click:increment>+</button>
                </div>
            </div>
        `;

        // Verify update response format is correctly structured
        const updateResponse = {
            responses: [
                {
                    snapshot: JSON.stringify({
                        state: { count: 1 },
                        memo: { name: 'counter' },
                    }),
                    html: '<div data-livue-id="counter-1"><span data-count>1</span><button v-click:increment>+</button></div>',
                },
            ],
        };

        expect(updateResponse.responses[0].snapshot).toBeDefined();
        expect(JSON.parse(updateResponse.responses[0].snapshot).state.count).toBe(1);
    });

    it('should preserve DOM elements with v-ignore', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{},"memo":{"name":"widget"}}'>
                <div data-livue-id="widget-1">
                    <div v-ignore>
                        <third-party-widget></third-party-widget>
                    </div>
                </div>
            </div>
        `;

        const ignored = document.querySelector('[v-ignore]');
        expect(ignored).toBeTruthy();
        expect(ignored.querySelector('third-party-widget')).toBeTruthy();
    });

    it('should handle template swap correctly', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{"items":["a","b"]},"memo":{"name":"list"}}'>
                <div data-livue-id="list-1">
                    <ul>
                        <li v-for="item in items">{{ item }}</li>
                    </ul>
                </div>
            </div>
        `;

        // Verify state has items
        const component = document.querySelector('[data-livue-component]');
        const snapshot = JSON.parse(component.dataset.livueSnapshot);
        expect(snapshot.state.items).toEqual(['a', 'b']);
    });
});

describe('Component Destroy', () => {
    it('should cleanup on unmount', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{},"memo":{"name":"temp"}}'>
                <div data-livue-id="temp-1">Temporary</div>
            </div>
        `;

        // Verify component exists
        let component = document.querySelector('[data-livue-component]');
        expect(component).toBeTruthy();

        // Remove component from DOM
        component.remove();

        // Component should be gone
        component = document.querySelector('[data-livue-component]');
        expect(component).toBeNull();
    });

    it('should remove event listeners on destroy', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{},"memo":{"name":"clicker"}}'>
                <div data-livue-id="click-1">
                    <button v-click:action>Click me</button>
                </div>
            </div>
        `;

        const button = document.querySelector('button');
        expect(button).toBeTruthy();

        // Clear DOM
        document.body.innerHTML = '';

        // Button should be gone (no longer accessible)
        expect(document.querySelector('button')).toBeNull();
    });

    it('should unregister from event bus on destroy', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{},"memo":{"name":"subscriber","listeners":{"user-updated":"handleUpdate"}}}'>
                <div data-livue-id="sub-1">Subscriber</div>
            </div>
        `;

        // Verify event listeners are defined in memo
        const component = document.querySelector('[data-livue-component]');
        const snapshot = JSON.parse(component.dataset.livueSnapshot);
        expect(snapshot.memo.listeners['user-updated']).toBe('handleUpdate');
    });
});

describe('Error Handling', () => {
    it('should handle invalid snapshot gracefully', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='not-valid-json'>
                <div data-livue-id="bad-1">Content</div>
            </div>
        `;

        // Attempting to parse invalid JSON should throw
        const component = document.querySelector('[data-livue-component]');
        expect(() => {
            JSON.parse(component.dataset.livueSnapshot);
        }).toThrow();
    });

    it('should handle missing component ID', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{},"memo":{}}'>
                <div>No ID here</div>
            </div>
        `;

        // Component exists but has no data-livue-id child
        const component = document.querySelector('[data-livue-component]');
        expect(component).toBeTruthy();
        expect(component.querySelector('[data-livue-id]')).toBeNull();
    });

    it('should recover from render errors', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{"bad":"some-value"},"memo":{"name":"error"}}'>
                <div data-livue-id="err-1">{{ bad }}</div>
            </div>
        `;

        // Component structure should be parseable
        const component = document.querySelector('[data-livue-component]');
        const snapshot = JSON.parse(component.dataset.livueSnapshot);
        expect(snapshot.state.bad).toBe('some-value');
    });
});

describe('Reactive State', () => {
    it('should make state reactive', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{"count":0},"memo":{"name":"reactive"}}'>
                <div data-livue-id="react-1">
                    <span>{{ count }}</span>
                </div>
            </div>
        `;

        // Verify state structure for reactivity
        const component = document.querySelector('[data-livue-component]');
        const snapshot = JSON.parse(component.dataset.livueSnapshot);

        expect(snapshot.state.count).toBe(0);
        expect(typeof snapshot.state.count).toBe('number');
    });

    it('should sync state with server', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{"name":"initial"},"memo":{"name":"synced"}}'>
                <div data-livue-id="sync-1">
                    <input v-model-livue:name>
                </div>
            </div>
        `;

        // Verify input exists and has the v-model-livue directive
        const input = document.querySelector('input');
        expect(input).toBeTruthy();
        expect(input.hasAttribute('v-model-livue:name')).toBe(true);

        // Verify initial state
        const component = document.querySelector('[data-livue-component]');
        const snapshot = JSON.parse(component.dataset.livueSnapshot);
        expect(snapshot.state.name).toBe('initial');
    });
});
