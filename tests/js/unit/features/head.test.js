/**
 * Tests for SPA head element updates during navigation.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let navigation;
let mockFetch;
let mockRuntime;

beforeEach(async () => {
    vi.resetModules();

    vi.doMock('@/helpers/csrf.js', () => ({
        clearToken: vi.fn(),
    }));

    vi.doMock('@/helpers/progress.js', () => ({
        default: {
            start: vi.fn(),
            done: vi.fn(),
            configure: vi.fn(),
        },
    }));

    navigation = await import('@/features/navigation.js');

    mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    mockRuntime = {
        _stopObserver: vi.fn(),
        _startObserver: vi.fn(),
        destroy: vi.fn(),
        destroyExcept: vi.fn(),
        reboot: vi.fn(),
        rebootPreserving: vi.fn(),
        _preservingIds: null,
    };

    document.head.innerHTML = '<title>Test Page</title><meta name="csrf-token" content="test-token">';
    document.body.innerHTML = '<div id="app"></div>';

    history.replaceState(null, '', '/');
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('Head Elements Update', () => {
    beforeEach(() => {
        navigation.initNavigation(mockRuntime);
    });

    it('should add data-livue-head elements from new page', async () => {
        const newPageHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>New Page</title>
                <meta name="description" content="New description" data-livue-head>
                <meta property="og:title" content="New OG Title" data-livue-head>
            </head>
            <body><div id="content"></div></body>
            </html>
        `;

        mockFetch.mockResolvedValue(createMockResponse(newPageHtml));

        await navigation.navigateTo('/new-page', true, false);

        var description = document.querySelector('meta[name="description"][data-livue-head]');
        expect(description).not.toBeNull();
        expect(description.getAttribute('content')).toBe('New description');

        var ogTitle = document.querySelector('meta[property="og:title"][data-livue-head]');
        expect(ogTitle).not.toBeNull();
        expect(ogTitle.getAttribute('content')).toBe('New OG Title');
    });

    it('should remove old data-livue-head elements before adding new ones', async () => {
        // Add existing head elements
        var oldMeta = document.createElement('meta');
        oldMeta.setAttribute('name', 'description');
        oldMeta.setAttribute('content', 'Old description');
        oldMeta.setAttribute('data-livue-head', '');
        document.head.appendChild(oldMeta);

        expect(document.querySelectorAll('[data-livue-head]').length).toBe(1);

        const newPageHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>New Page</title>
                <meta name="keywords" content="new, page" data-livue-head>
            </head>
            <body></body>
            </html>
        `;

        mockFetch.mockResolvedValue(createMockResponse(newPageHtml));

        await navigation.navigateTo('/new-page', true, false);

        // Old description should be gone
        var description = document.querySelector('meta[name="description"][data-livue-head]');
        expect(description).toBeNull();

        // New keywords should be present
        var keywords = document.querySelector('meta[name="keywords"][data-livue-head]');
        expect(keywords).not.toBeNull();
        expect(keywords.getAttribute('content')).toBe('new, page');
    });

    it('should handle navigation to page with no head elements', async () => {
        // Add existing head elements
        var oldMeta = document.createElement('meta');
        oldMeta.setAttribute('name', 'description');
        oldMeta.setAttribute('content', 'Old description');
        oldMeta.setAttribute('data-livue-head', '');
        document.head.appendChild(oldMeta);

        const newPageHtml = `
            <!DOCTYPE html>
            <html>
            <head><title>Empty Head</title></head>
            <body></body>
            </html>
        `;

        mockFetch.mockResolvedValue(createMockResponse(newPageHtml));

        await navigation.navigateTo('/empty-page', true, false);

        // All livue-head elements should be removed
        expect(document.querySelectorAll('[data-livue-head]').length).toBe(0);
    });

    it('should not affect non-livue-head meta tags', async () => {
        const newPageHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>New Page</title>
                <meta name="csrf-token" content="new-token">
                <meta name="description" content="New desc" data-livue-head>
            </head>
            <body></body>
            </html>
        `;

        mockFetch.mockResolvedValue(createMockResponse(newPageHtml));

        await navigation.navigateTo('/page', true, false);

        // CSRF token should still be there (not managed by livue-head)
        var csrf = document.querySelector('meta[name="csrf-token"]');
        expect(csrf).not.toBeNull();
    });

    it('should handle canonical link tags', async () => {
        const newPageHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>New Page</title>
                <link rel="canonical" href="https://example.com/page" data-livue-head>
            </head>
            <body></body>
            </html>
        `;

        mockFetch.mockResolvedValue(createMockResponse(newPageHtml));

        await navigation.navigateTo('/page', true, false);

        var canonical = document.querySelector('link[rel="canonical"][data-livue-head]');
        expect(canonical).not.toBeNull();
        expect(canonical.getAttribute('href')).toBe('https://example.com/page');
    });

    it('should handle json-ld script tags', async () => {
        const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article' });
        const newPageHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>New Page</title>
                <script type="application/ld+json" data-livue-head>${jsonLd}</script>
            </head>
            <body></body>
            </html>
        `;

        mockFetch.mockResolvedValue(createMockResponse(newPageHtml));

        await navigation.navigateTo('/page', true, false);

        var script = document.querySelector('script[type="application/ld+json"][data-livue-head]');
        expect(script).not.toBeNull();
        expect(JSON.parse(script.textContent)).toEqual({
            '@context': 'https://schema.org',
            '@type': 'Article',
        });
    });
});
