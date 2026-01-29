/**
 * CSRF token helper for LiVue AJAX requests.
 */

let cachedToken = null;

/**
 * Get the CSRF token from the page meta tag or XSRF-TOKEN cookie.
 */
export function getToken() {
    if (cachedToken) {
        return cachedToken;
    }

    // Try meta tag first (Laravel default)
    const meta = document.querySelector('meta[name="csrf-token"]');

    if (meta) {
        cachedToken = meta.getAttribute('content');
        return cachedToken;
    }

    // Fallback: read from XSRF-TOKEN cookie
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);

    if (match) {
        cachedToken = decodeURIComponent(match[1]);
        return cachedToken;
    }

    return null;
}

/**
 * Clear the cached token (useful if token is rotated).
 */
export function clearToken() {
    cachedToken = null;
}
