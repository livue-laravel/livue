/**
 * Tests for CSRF token helper.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

let csrf;

beforeEach(async () => {
    vi.resetModules();
    csrf = await import('@/helpers/csrf.js');

    // Reset DOM
    document.head.innerHTML = '';

    // Clear all cookies by setting them to expire
    document.cookie.split(';').forEach(function(c) {
        document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
});

describe('CSRF Helper', () => {
    describe('getToken()', () => {
        it('should get token from meta tag', () => {
            document.head.innerHTML = '<meta name="csrf-token" content="meta-token-123">';

            const token = csrf.getToken();

            expect(token).toBe('meta-token-123');
        });

        it('should cache the token', () => {
            document.head.innerHTML = '<meta name="csrf-token" content="cached-token">';

            const token1 = csrf.getToken();

            // Change the meta tag
            document.head.innerHTML = '<meta name="csrf-token" content="new-token">';

            const token2 = csrf.getToken();

            // Should still return cached value
            expect(token2).toBe('cached-token');
        });

        it('should fallback to XSRF-TOKEN cookie', () => {
            // No meta tag
            document.head.innerHTML = '';
            document.cookie = 'XSRF-TOKEN=cookie-token-456';

            // Clear any cached token
            csrf.clearToken();

            const token = csrf.getToken();

            expect(token).toBe('cookie-token-456');
        });

        it('should decode URL-encoded cookie value', () => {
            document.head.innerHTML = '';
            document.cookie = 'XSRF-TOKEN=' + encodeURIComponent('token+with+special=chars');

            csrf.clearToken();

            const token = csrf.getToken();

            expect(token).toBe('token+with+special=chars');
        });

        it('should return null when no token found', async () => {
            // Re-import with fresh state to avoid cookie pollution from other tests
            vi.resetModules();
            document.head.innerHTML = '';

            // Mock document.cookie to be empty
            const originalCookie = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
            Object.defineProperty(document, 'cookie', {
                get: () => '',
                set: () => {},
                configurable: true,
            });

            const freshCsrf = await import('@/helpers/csrf.js');

            const token = freshCsrf.getToken();

            // Restore original cookie property
            if (originalCookie) {
                Object.defineProperty(document, 'cookie', originalCookie);
            }

            expect(token).toBeNull();
        });

        it('should prefer meta tag over cookie', () => {
            document.head.innerHTML = '<meta name="csrf-token" content="meta-wins">';
            document.cookie = 'XSRF-TOKEN=cookie-loses';

            csrf.clearToken();

            const token = csrf.getToken();

            expect(token).toBe('meta-wins');
        });
    });

    describe('clearToken()', () => {
        it('should clear the cached token', () => {
            document.head.innerHTML = '<meta name="csrf-token" content="original">';

            csrf.getToken(); // Cache it

            csrf.clearToken();

            // Change the meta tag
            document.head.innerHTML = '<meta name="csrf-token" content="new-value">';

            const token = csrf.getToken();

            expect(token).toBe('new-value');
        });
    });
});
