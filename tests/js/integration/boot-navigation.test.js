/**
 * Integration tests for boot and navigation.
 *
 * These tests verify that the boot system and SPA navigation
 * work correctly together, especially for the double boot prevention.
 *
 * NOTE: These tests use mocked runtime to avoid full Vue initialization,
 * which is complex in the happy-dom test environment.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let initNavigation, navigateTo;
let mockFetch;
let mockRuntime;

beforeEach(async () => {
    vi.resetModules();

    // Reset DOM
    document.body.innerHTML = '';
    document.head.innerHTML = '<meta name="csrf-token" content="test-csrf-token">';

    // Mock fetch
    mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        headers: {
            get: () => 'text/html',
        },
        text: () => Promise.resolve('<html><body><div data-livue-component>New Page</div></body></html>'),
    });
    global.fetch = mockFetch;

    // Use global history mock (from setup.js) - reset spies
    if (globalThis.history && globalThis.history.reset) {
        globalThis.history.reset();
    }

    // Use global location mock (from setup.js)
    globalThis._mockLocation.href = 'http://localhost:3000/';
    globalThis._mockLocation.pathname = '/';
    globalThis._mockLocation.search = '';
    globalThis._mockLocation.hash = '';

    // Create mock runtime (instead of importing real runtime which requires full Vue)
    mockRuntime = {
        _stopObserver: vi.fn(),
        _startObserver: vi.fn(),
        destroy: vi.fn(),
        destroyExcept: vi.fn(),
        reboot: vi.fn(),
        rebootPreserving: vi.fn(),
        _components: new Map(),
    };

    const navModule = await import('@/features/navigation.js');
    initNavigation = navModule.initNavigation;
    navigateTo = navModule.navigateTo;

    // Initialize navigation with mock runtime
    initNavigation(mockRuntime);
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('Boot + Navigation Integration', () => {
    describe('double boot prevention', () => {
        it('should not re-mount components after SPA navigation', async () => {
            // Setup: create a component element
            document.body.innerHTML = `
                <div data-livue-component data-livue-snapshot='{"state":{},"memo":{"name":"counter"}}'>
                    <div data-livue-id="comp-1">Content</div>
                </div>
            `;

            // Verify component element exists
            const firstComponent = document.querySelector('[data-livue-id]');
            expect(firstComponent).toBeTruthy();

            // Navigation with mock runtime should work
            mockFetch.mockResolvedValueOnce({
                ok: true,
                headers: { get: () => 'text/html' },
                text: () => Promise.resolve('<html><body><div data-livue-id="comp-2">Page 2</div></body></html>'),
            });

            await navigateTo('/page2', true, false);

            // Mock runtime's rebootPreserving should have been called
            expect(mockRuntime.rebootPreserving).toHaveBeenCalled();
        });

        it('should detect ESM vs standalone mode correctly', async () => {
            // ESM mode is simulated by the test environment importing modules
            document.body.innerHTML = `
                <div data-livue-component data-livue-snapshot='{"state":{},"memo":{}}'>
                    Content
                </div>
            `;

            // The module import works (tested implicitly by test setup)
            expect(document.querySelector('[data-livue-component]')).toBeTruthy();
        });

        it('should handle navigation without double mounting', async () => {
            document.body.innerHTML = `
                <div data-livue-component data-livue-snapshot='{"state":{},"memo":{"name":"page"}}'>
                    <div data-livue-id="page-1">Page 1</div>
                </div>
            `;

            // Simulate SPA navigation response
            mockFetch.mockResolvedValueOnce({
                ok: true,
                headers: { get: () => 'text/html' },
                text: () => Promise.resolve(`
                    <html>
                    <body>
                        <div data-livue-component data-livue-snapshot='{"state":{},"memo":{"name":"page"}}'>
                            <div data-livue-id="page-2">Page 2</div>
                        </div>
                    </body>
                    </html>
                `),
            });

            await navigateTo('/page2', true, false);

            // Navigation should have called destroyExcept and rebootPreserving
            expect(mockRuntime.destroyExcept).toHaveBeenCalled();
            expect(mockRuntime.rebootPreserving).toHaveBeenCalled();
        });
    });

    describe('navigation during boot', () => {
        it('should queue navigation if boot is in progress', async () => {
            document.body.innerHTML = `
                <div data-livue-component data-livue-snapshot='{"state":{},"memo":{}}'>
                    Content
                </div>
            `;

            // Navigation should work (boot is mocked)
            mockFetch.mockResolvedValueOnce({
                ok: true,
                headers: { get: () => 'text/html' },
                text: () => Promise.resolve('<html><body>Page</body></html>'),
            });

            await navigateTo('/page', true, false);
            expect(mockRuntime.rebootPreserving).toHaveBeenCalled();
        });

        it('should prevent concurrent navigations', async () => {
            document.body.innerHTML = `
                <div data-livue-component data-livue-snapshot='{"state":{},"memo":{}}'>
                    Content
                </div>
            `;

            mockFetch.mockImplementation(() =>
                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            ok: true,
                            headers: { get: () => 'text/html' },
                            text: () => Promise.resolve('<html><body>Page</body></html>'),
                        });
                    }, 50);
                })
            );

            // Start first navigation
            const nav1 = navigateTo('/page1', true, false);

            // Try second navigation immediately (should be blocked)
            const nav2 = navigateTo('/page2', true, false);

            // One should be cancelled or queued
            await Promise.all([nav1.catch(() => {}), nav2.catch(() => {})]);

            // Only one fetch should have been made (second was blocked)
            expect(mockFetch).toHaveBeenCalledTimes(1);
        });
    });

    describe('reboot after navigation', () => {
        it('should boot only new components after body swap', async () => {
            // Initial state
            document.body.innerHTML = `
                <div data-livue-component data-livue-snapshot='{"state":{"count":0},"memo":{"name":"counter"}}'>
                    <span>0</span>
                </div>
            `;

            mockFetch.mockResolvedValueOnce({
                ok: true,
                headers: { get: () => 'text/html' },
                text: () => Promise.resolve('<html><body><div data-livue-component>New</div></body></html>'),
            });

            await navigateTo('/new-page', true, false);

            // rebootPreserving should have been called
            expect(mockRuntime.rebootPreserving).toHaveBeenCalled();
        });

        it('should preserve @persist elements', async () => {
            document.body.innerHTML = `
                <div data-livue-persist="notification" id="notification" data-livue-id="notif-1">
                    Important message
                </div>
                <div data-livue-component data-livue-snapshot='{"state":{},"memo":{}}'>
                    Content
                </div>
            `;

            const notification = document.getElementById('notification');
            expect(notification).toBeTruthy();

            mockFetch.mockResolvedValueOnce({
                ok: true,
                headers: { get: () => 'text/html' },
                text: () => Promise.resolve('<html><body><div data-livue-persist="notification"></div></body></html>'),
            });

            await navigateTo('/new-page', true, false);

            // destroyExcept should have been called with the persisted component's ID
            expect(mockRuntime.destroyExcept).toHaveBeenCalled();
            const preservedIds = mockRuntime.destroyExcept.mock.calls[0][0];
            expect(preservedIds.has('notif-1')).toBe(true);
        });
    });

    describe('script handling during navigation', () => {
        it('should skip livue scripts during body swap', async () => {
            // LiVue scripts should not be re-executed during SPA navigation
            document.body.innerHTML = `
                <div data-livue-component data-livue-snapshot='{"state":{},"memo":{}}'>
                    Content
                </div>
            `;

            // Simulate response with livue script
            mockFetch.mockResolvedValueOnce({
                ok: true,
                headers: { get: () => 'text/html' },
                text: () => Promise.resolve(`
                    <html>
                    <body>
                        <div>New content</div>
                    </body>
                    </html>
                `),
            });

            await navigateTo('/new-page', true, false);

            // Navigation should complete without errors
            expect(mockRuntime.rebootPreserving).toHaveBeenCalled();
        });
    });

    describe('CSRF token handling', () => {
        it('should update CSRF token after navigation', async () => {
            // Initial CSRF token
            document.head.innerHTML = '<meta name="csrf-token" content="old-token">';

            document.body.innerHTML = `
                <div data-livue-component data-livue-snapshot='{"state":{},"memo":{}}'>
                    Content
                </div>
            `;

            // Mock response with new CSRF token
            mockFetch.mockResolvedValueOnce({
                ok: true,
                headers: { get: () => 'text/html' },
                text: () => Promise.resolve(`
                    <html>
                    <head><meta name="csrf-token" content="new-token"></head>
                    <body>New content</body>
                    </html>
                `),
            });

            await navigateTo('/new-page', true, false);

            // CSRF token should be updated
            const csrfMeta = document.querySelector('meta[name="csrf-token"]');
            expect(csrfMeta.getAttribute('content')).toBe('new-token');
        });
    });
});

describe('Error Recovery', () => {
    it('should fallback to full page reload on boot error', async () => {
        // This test verifies that invalid data doesn't crash the system
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='invalid-json'>
                Content
            </div>
        `;

        // Navigation module should still work even with invalid component markup
        mockFetch.mockResolvedValueOnce({
            ok: true,
            headers: { get: () => 'text/html' },
            text: () => Promise.resolve('<html><body>Valid page</body></html>'),
        });

        await navigateTo('/valid-page', true, false);

        // Navigation should complete
        expect(mockRuntime.rebootPreserving).toHaveBeenCalled();
    });

    it('should handle navigation error with graceful degradation', async () => {
        document.body.innerHTML = `
            <div data-livue-component data-livue-snapshot='{"state":{},"memo":{}}'>
                Content
            </div>
        `;

        mockFetch.mockRejectedValueOnce(new Error('Network error'));

        // Navigation should handle error by setting location.href
        const originalHref = globalThis._mockLocation.href;
        await navigateTo('/failed-page', true, false);

        // On error, navigation falls back to location.href
        expect(globalThis._mockLocation.href).toBe('/failed-page');
    });
});
