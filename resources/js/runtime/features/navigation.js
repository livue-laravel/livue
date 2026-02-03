/**
 * Navigation module for LiVue.
 *
 * Handles redirects (full page reload) and SPA navigation
 * (fetch + DOM swap + history push + LiVue reboot).
 *
 * Features:
 * - Prefetching: preload pages on hover/mousedown
 * - Page caching: instant back/forward navigation
 * - @persist: preserve DOM elements across navigations
 * - Scroll restoration: restore scroll position on back/forward
 * - Progress bar: visual loading indicator during navigation
 */

import { clearToken } from '../helpers/csrf.js';
import progress from '../helpers/progress.js';

/**
 * Reference to the LiVue runtime, set during init.
 * @type {object|null}
 */
var _runtime = null;

/**
 * Whether navigation has been initialized.
 * @type {boolean}
 */
var _initialized = false;

/**
 * Whether a SPA navigation is currently in progress.
 * Prevents double execution when both pool.js and component.js detect a redirect.
 * @type {boolean}
 */
var _navigating = false;

/**
 * Configuration for navigation behavior.
 * @type {object}
 */
var _config = {
    showProgressBar: true,
    progressBarColor: '#29d',
    prefetch: true,
    prefetchOnHover: true,
    hoverDelay: 60,
    cachePages: true,
    maxCacheSize: 10,
    restoreScroll: true,
};

/**
 * Cache of fetched pages for instant back/forward navigation.
 * Key: URL, Value: { html: string, title: string, scroll: { x: number, y: number }, timestamp: number }
 * @type {Map<string, object>}
 */
var _pageCache = new Map();

/**
 * Map of URLs currently being prefetched.
 * @type {Map<string, Promise<string>>}
 */
var _prefetching = new Map();

/**
 * Hover timers for prefetch delay.
 * @type {WeakMap<HTMLElement, number>}
 */
var _hoverTimers = new WeakMap();

/**
 * Saved scroll positions for pages.
 * @type {Map<string, { x: number, y: number }>}
 */
var _scrollPositions = new Map();

/**
 * Current page key for scroll tracking.
 * @type {string|null}
 */
var _currentPageKey = null;

/**
 * Configure navigation options.
 *
 * @param {object} options
 * @param {boolean} [options.showProgressBar] - Show progress bar during navigation (default: true)
 * @param {string} [options.progressBarColor] - Progress bar color (default: '#29d')
 * @param {boolean} [options.prefetch] - Enable prefetching (default: true)
 * @param {boolean} [options.prefetchOnHover] - Prefetch on hover vs mousedown only (default: true)
 * @param {number} [options.hoverDelay] - Hover delay before prefetch in ms (default: 60)
 * @param {boolean} [options.cachePages] - Cache pages for back/forward (default: true)
 * @param {number} [options.maxCacheSize] - Max cached pages (default: 10)
 * @param {boolean} [options.restoreScroll] - Restore scroll position on back/forward (default: true)
 */
export function configure(options) {
    Object.assign(_config, options);

    if (options.progressBarColor) {
        progress.configure({ color: options.progressBarColor });
    }
}

/**
 * Initialize the navigation module.
 * Sets initial history state and listens for popstate.
 *
 * @param {object} runtime - The LiVueRuntime instance
 */
export function initNavigation(runtime) {
    _runtime = runtime;

    if (_initialized) {
        return;
    }
    _initialized = true;

    // Generate a unique key for the current page
    _currentPageKey = generatePageKey();

    // Set initial history state so popstate can return here
    history.replaceState(
        { livueNavigate: true, url: location.href, pageKey: _currentPageKey },
        '',
        location.href
    );

    // Listen for browser back/forward
    window.addEventListener('popstate', function (event) {
        if (event.state && event.state.livueNavigate) {
            // Save current scroll before leaving
            saveScrollPosition(_currentPageKey);

            _currentPageKey = event.state.pageKey;
            navigateTo(event.state.url, false, true);
        }
    });

    // Set up global link handlers for prefetching
    setupPrefetching();
}

/**
 * Generate a unique page key for scroll tracking.
 * @returns {string}
 */
function generatePageKey() {
    return location.href + '#' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

/**
 * Save scroll position for a page key.
 * @param {string} pageKey
 */
function saveScrollPosition(pageKey) {
    if (!_config.restoreScroll || !pageKey) {
        return;
    }

    _scrollPositions.set(pageKey, {
        x: window.scrollX,
        y: window.scrollY,
    });

    // Also save individual scroll positions for elements with data-livue-scroll
    var scrollElements = document.querySelectorAll('[data-livue-scroll]');
    scrollElements.forEach(function (el) {
        var key = el.dataset.livueScroll || el.id;
        if (key) {
            var pos = _scrollPositions.get(pageKey) || {};
            pos['el:' + key] = { x: el.scrollLeft, y: el.scrollTop };
            _scrollPositions.set(pageKey, pos);
        }
    });
}

/**
 * Restore scroll position for a page key.
 * @param {string} pageKey
 */
function restoreScrollPosition(pageKey) {
    if (!_config.restoreScroll || !pageKey) {
        return;
    }

    var pos = _scrollPositions.get(pageKey);

    if (pos) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(function () {
            window.scrollTo(pos.x || 0, pos.y || 0);

            // Restore individual element scroll positions
            Object.keys(pos).forEach(function (key) {
                if (key.startsWith('el:')) {
                    var elKey = key.substring(3);
                    var el = document.querySelector('[data-livue-scroll="' + elKey + '"]')
                        || document.getElementById(elKey);
                    if (el) {
                        el.scrollLeft = pos[key].x || 0;
                        el.scrollTop = pos[key].y || 0;
                    }
                }
            });
        });
    }
}

/**
 * Set up event listeners for prefetching and navigation.
 */
function setupPrefetching() {
    // Global click handler for v-navigate links (more robust than per-element listeners)
    document.addEventListener('click', handleGlobalClick, true);

    if (!_config.prefetch) {
        return;
    }

    // Use event delegation on document for efficiency
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    document.addEventListener('mousedown', handleMouseDown, true);
    document.addEventListener('focus', handleFocus, true);
}

/**
 * Global click handler for v-navigate links.
 * Uses event delegation so it works even when elements are moved in the DOM.
 *
 * @param {Event} event
 */
function handleGlobalClick(event) {
    if (!event.target || typeof event.target.closest !== 'function') {
        return;
    }

    var el = event.target.closest('a[data-livue-navigate], a[v-navigate]');

    if (!el) {
        return;
    }

    // Ignore if modifier keys are pressed
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
    }

    // Ignore right-click
    if (event.button !== 0) {
        return;
    }

    var href = el.getAttribute('href');

    if (!href) {
        return;
    }

    // Ignore external links
    try {
        var url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) {
            return;
        }
    } catch (e) {
        return;
    }

    // Ignore anchor links
    if (href.startsWith('#')) {
        return;
    }

    // Ignore javascript: links
    if (href.startsWith('javascript:')) {
        return;
    }

    // Ignore download links
    if (el.hasAttribute('download')) {
        return;
    }

    // Ignore target="_blank" links
    if (el.getAttribute('target') === '_blank') {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    console.log('[v-navigate global] Navigating to:', href);

    // Navigate via LiVue SPA navigation
    navigateTo(href, true, false);
}

/**
 * Check if an element is a navigate link.
 * @param {HTMLElement} el
 * @returns {boolean}
 */
function isNavigateLink(el) {
    if (el.tagName !== 'A') {
        return false;
    }

    // Check for v-navigate attribute
    if (el.hasAttribute('data-livue-navigate') || el.hasAttribute('v-navigate')) {
        return true;
    }

    return false;
}

/**
 * Get the navigate mode from a link.
 * @param {HTMLElement} el
 * @returns {string} 'mousedown' (default) or 'hover'
 */
function getNavigateMode(el) {
    var mode = el.dataset.livueNavigateMode;

    if (mode === 'hover') {
        return 'hover';
    }

    return 'mousedown';
}

/**
 * Handle mouseenter for hover prefetching.
 * @param {Event} event
 */
function handleMouseEnter(event) {
    // event.target might not be an Element (could be text node)
    if (!event.target || typeof event.target.closest !== 'function') {
        return;
    }

    var el = event.target.closest('a[data-livue-navigate], a[v-navigate]');

    if (!el || !_config.prefetchOnHover) {
        return;
    }

    var mode = getNavigateMode(el);

    if (mode !== 'hover') {
        return;
    }

    var href = el.getAttribute('href');

    if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
        return;
    }

    // Start prefetch after hover delay
    var timer = setTimeout(function () {
        prefetchUrl(href);
    }, _config.hoverDelay);

    _hoverTimers.set(el, timer);
}

/**
 * Handle mouseleave to cancel hover prefetch.
 * @param {Event} event
 */
function handleMouseLeave(event) {
    if (!event.target || typeof event.target.closest !== 'function') {
        return;
    }

    var el = event.target.closest('a[data-livue-navigate], a[v-navigate]');

    if (!el) {
        return;
    }

    var timer = _hoverTimers.get(el);

    if (timer) {
        clearTimeout(timer);
        _hoverTimers.delete(el);
    }
}

/**
 * Handle mousedown for default prefetching.
 * @param {Event} event
 */
function handleMouseDown(event) {
    if (!event.target || typeof event.target.closest !== 'function') {
        return;
    }

    var el = event.target.closest('a[data-livue-navigate], a[v-navigate]');

    if (!el) {
        return;
    }

    var href = el.getAttribute('href');

    if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
        return;
    }

    // Prefetch on mousedown (before click fires)
    prefetchUrl(href);
}

/**
 * Handle focus for keyboard navigation prefetching.
 * @param {Event} event
 */
function handleFocus(event) {
    if (!event.target || typeof event.target.closest !== 'function') {
        return;
    }

    var el = event.target.closest('a[data-livue-navigate], a[v-navigate]');

    if (!el || !_config.prefetchOnHover) {
        return;
    }

    var href = el.getAttribute('href');

    if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
        return;
    }

    prefetchUrl(href);
}

/**
 * Prefetch a URL and cache it.
 *
 * @param {string} url - URL to prefetch
 * @returns {Promise<string|null>} The HTML content or null on error
 */
export function prefetchUrl(url) {
    // Normalize URL
    var normalizedUrl = new URL(url, location.origin).href;

    // Already prefetching?
    if (_prefetching.has(normalizedUrl)) {
        return _prefetching.get(normalizedUrl);
    }

    // Already cached?
    if (_pageCache.has(normalizedUrl)) {
        return Promise.resolve(_pageCache.get(normalizedUrl).html);
    }

    // Start prefetch
    var fetchPromise = fetch(normalizedUrl, {
        method: 'GET',
        headers: {
            'Accept': 'text/html',
            'X-LiVue-Navigate': '1',
            'X-LiVue-Prefetch': '1',
        },
        credentials: 'same-origin',
    }).then(function (response) {
        _prefetching.delete(normalizedUrl);

        if (!response.ok) {
            return null;
        }

        return response.text().then(function (html) {
            // Cache the page
            if (_config.cachePages) {
                cachePage(normalizedUrl, html);
            }

            return html;
        });
    }).catch(function (err) {
        _prefetching.delete(normalizedUrl);
        console.warn('[LiVue] Prefetch failed:', err);
        return null;
    });

    _prefetching.set(normalizedUrl, fetchPromise);

    return fetchPromise;
}

/**
 * Cache a page for instant navigation.
 *
 * @param {string} url - Page URL
 * @param {string} html - Page HTML
 */
function cachePage(url, html) {
    // Parse to get title
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var title = doc.querySelector('title');

    // Enforce max cache size
    while (_pageCache.size >= _config.maxCacheSize) {
        var oldestKey = _pageCache.keys().next().value;
        _pageCache.delete(oldestKey);
    }

    _pageCache.set(url, {
        html: html,
        title: title ? title.textContent : '',
        timestamp: Date.now(),
    });
}

/**
 * Clear the page cache.
 */
export function clearCache() {
    _pageCache.clear();
}

/**
 * Handle a redirect response from the server.
 * Decides between classic redirect and SPA navigate.
 *
 * @param {object} redirect - { url: string, navigate: boolean }
 */
export function handleRedirect(redirect) {
    if (_navigating || !redirect || !redirect.url) {
        return;
    }

    if (redirect.navigate) {
        navigateTo(redirect.url, true, false);
    } else {
        _navigating = true;
        window.location.href = redirect.url;
    }
}

/**
 * SPA navigate: fetch the target URL, swap the page content,
 * update history, and reboot LiVue.
 *
 * @param {string} url - Target URL
 * @param {boolean} pushState - Whether to push a new history entry
 * @param {boolean} isPopstate - Whether this is a popstate navigation (back/forward)
 */
export async function navigateTo(url, pushState, isPopstate) {
    if (_navigating) {
        return;
    }

    if (!_runtime) {
        window.location.href = url;
        return;
    }

    // Normalize URL
    var normalizedUrl = new URL(url, location.origin).href;

    // Dispatch livue:navigate event (cancellable)
    var navigateEvent = new CustomEvent('livue:navigate', {
        detail: {
            url: normalizedUrl,
            cached: _pageCache.has(normalizedUrl),
            isPopstate: isPopstate || false,
        },
        cancelable: true,
    });

    if (!window.dispatchEvent(navigateEvent)) {
        return; // Navigation was cancelled
    }

    _navigating = true;

    // Save current scroll position
    if (!isPopstate) {
        saveScrollPosition(_currentPageKey);
    }

    // Start progress bar
    if (_config.showProgressBar) {
        progress.start();
    }

    try {
        var html;
        var cached = _pageCache.get(normalizedUrl);

        if (cached) {
            html = cached.html;
        } else if (_prefetching.has(normalizedUrl)) {
            // Wait for prefetch to complete
            html = await _prefetching.get(normalizedUrl);
        } else {
            var response = await fetch(normalizedUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'text/html',
                    'X-LiVue-Navigate': '1',
                },
                credentials: 'same-origin',
            });

            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }

            html = await response.text();

            // Cache this page
            if (_config.cachePages) {
                cachePage(normalizedUrl, html);
            }
        }

        // Parse the HTML response
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        // Dispatch livue:navigating event (allows mutation)
        var navigatingEvent = new CustomEvent('livue:navigating', {
            detail: {
                url: normalizedUrl,
                doc: doc,
                onSwap: function (mutator) {
                    if (typeof mutator === 'function') {
                        mutator(doc);
                    }
                },
            },
        });
        window.dispatchEvent(navigatingEvent);

        // 1. Collect @persist elements from current page
        var persistedElements = collectPersistedElements();

        // 2. Collect LiVue IDs that should be preserved (inside @persist elements)
        var preservedIds = new Set();
        persistedElements.forEach(function (data) {
            data.livueIds.forEach(function (id) {
                preservedIds.add(id);
            });
        });

        // 3. Stop the MutationObserver to prevent it from destroying persisted components
        //    when the body is swapped
        _runtime._stopObserver();

        // 4. Destroy only non-persisted LiVue components
        _runtime.destroyExcept(preservedIds);

        // 6. Remove persisted elements from DOM BEFORE body swap
        //    (otherwise innerHTML = ... will destroy them)
        persistedElements.forEach(function (data) {
            if (data.element.parentNode) {
                data.element.parentNode.removeChild(data.element);
            }
        });

        // 7. Update the page title
        var newTitle = doc.querySelector('title');
        if (newTitle) {
            document.title = newTitle.textContent;
        }

        // 8. Swap the <body> content
        document.body.innerHTML = doc.body.innerHTML;

        // 9. Restore @persist elements
        restorePersistedElements(persistedElements);

        // 10. Update CSRF token from the new page
        var newCsrf = doc.querySelector('meta[name="csrf-token"]');
        var oldCsrf = document.querySelector('meta[name="csrf-token"]');
        if (newCsrf && oldCsrf) {
            oldCsrf.setAttribute('content', newCsrf.getAttribute('content'));
            clearToken();
        }

        // 11. Handle <head> scripts with data-navigate-track
        handleTrackedScripts(doc);

        // 12. Push or replace history state (BEFORE scripts so URL is updated)
        if (pushState) {
            _currentPageKey = generatePageKey();
            history.pushState(
                { livueNavigate: true, url: normalizedUrl, pageKey: _currentPageKey },
                '',
                normalizedUrl
            );
        }

        // 13. Execute body scripts (after URL is updated)
        executeBodyScripts(doc);

        // 14. Reboot LiVue to discover and mount NEW components only
        //     (preserves already mounted components from @persist)
        _runtime.rebootPreserving();

        // 15. Restore scroll position (for back/forward) or scroll to top
        if (isPopstate) {
            restoreScrollPosition(_currentPageKey);
        } else {
            // Check for hash
            if (location.hash) {
                var hashEl = document.querySelector(location.hash);
                if (hashEl) {
                    hashEl.scrollIntoView();
                } else {
                    window.scrollTo(0, 0);
                }
            } else {
                window.scrollTo(0, 0);
            }
        }

        // 13. Dispatch livue:navigated event
        window.dispatchEvent(new CustomEvent('livue:navigated', {
            detail: { url: normalizedUrl },
        }));

    } catch (err) {
        console.error('[LiVue] Navigation failed:', err);
        window.location.href = url;
    } finally {
        _navigating = false;

        if (_config.showProgressBar) {
            progress.done();
        }
    }
}

/**
 * Collect @persist elements from the current page.
 * These will be preserved across navigation.
 *
 * @returns {Map<string, { element: HTMLElement, livueIds: string[] }>}
 */
function collectPersistedElements() {
    var persisted = new Map();

    var elements = document.querySelectorAll('[data-livue-persist]');
    elements.forEach(function (el) {
        var key = el.dataset.livuePersist;
        if (key) {
            // Collect all LiVue component IDs within this persisted element
            var livueIds = [];
            var livueElements = el.querySelectorAll('[data-livue-id]');
            livueElements.forEach(function (livueEl) {
                livueIds.push(livueEl.dataset.livueId);
            });
            // Also check if the element itself is a LiVue component
            if (el.dataset.livueId) {
                livueIds.push(el.dataset.livueId);
            }

            // Save scroll positions of internal scrollable elements
            var scrollData = {};
            var scrollElements = el.querySelectorAll('[data-livue-scroll]');
            scrollElements.forEach(function (scrollEl) {
                var scrollKey = scrollEl.dataset.livueScroll;
                if (scrollKey) {
                    scrollData[scrollKey] = {
                        scrollTop: scrollEl.scrollTop,
                        scrollLeft: scrollEl.scrollLeft,
                    };
                }
            });

            persisted.set(key, {
                element: el,
                livueIds: livueIds,
                scrollData: scrollData,
            });
        }
    });

    return persisted;
}

/**
 * Restore @persist elements to the new page.
 *
 * @param {Map<string, { element: HTMLElement, livueIds: string[], scrollTop: number, scrollLeft: number }>} persisted
 */
function restorePersistedElements(persisted) {
    if (persisted.size === 0) {
        return;
    }

    persisted.forEach(function (data, key) {
        var placeholder = document.querySelector('[data-livue-persist="' + key + '"]');

        if (placeholder) {
            // Replace the placeholder with the original element
            placeholder.parentNode.replaceChild(data.element, placeholder);

            // Restore scroll positions of internal elements
            if (data.scrollData) {
                requestAnimationFrame(function () {
                    Object.keys(data.scrollData).forEach(function (scrollKey) {
                        var scrollEl = data.element.querySelector('[data-livue-scroll="' + scrollKey + '"]');
                        if (scrollEl) {
                            scrollEl.scrollTop = data.scrollData[scrollKey].scrollTop;
                            scrollEl.scrollLeft = data.scrollData[scrollKey].scrollLeft;
                        }
                    });
                });
            }
        }
    });
}

/**
 * Handle scripts with data-navigate-track attribute.
 * Triggers full reload if asset versions change.
 *
 * @param {Document} doc - The new document
 */
function handleTrackedScripts(doc) {
    var currentScripts = document.querySelectorAll('script[data-navigate-track]');
    var newScripts = doc.querySelectorAll('script[data-navigate-track]');

    // Build map of current script versions
    var currentVersions = {};
    currentScripts.forEach(function (script) {
        var src = script.getAttribute('src');
        if (src) {
            currentVersions[src.split('?')[0]] = src;
        }
    });

    // Check if any new script has a different version
    var needsReload = false;
    newScripts.forEach(function (script) {
        var src = script.getAttribute('src');
        if (src) {
            var base = src.split('?')[0];
            if (currentVersions[base] && currentVersions[base] !== src) {
                needsReload = true;
            }
        }
    });

    if (needsReload) {
        window.location.reload();
    }
}

/**
 * Execute scripts in the body.
 * Scripts without data-navigate-once run on every navigation.
 *
 * @param {Document} doc - The new document
 */
function executeBodyScripts(doc) {
    var scripts = document.body.querySelectorAll('script');

    scripts.forEach(function (oldScript) {
        // Skip scripts with data-navigate-once that already ran
        if (oldScript.hasAttribute('data-navigate-once')) {
            if (oldScript.dataset.navigateRan) {
                return;
            }
            oldScript.dataset.navigateRan = 'true';
        }

        // Skip LiVue component scripts (handled separately)
        if (oldScript.type === 'application/livue-setup') {
            return;
        }

        // Skip LiVue runtime bundle - it's already loaded and we don't want to reinitialize
        var src = oldScript.getAttribute('src') || '';
        if (src.includes('livue')) {
            return;
        }

        // Create a new script element to execute it
        var newScript = document.createElement('script');

        // Copy attributes
        Array.from(oldScript.attributes).forEach(function (attr) {
            newScript.setAttribute(attr.name, attr.value);
        });

        // Copy content for inline scripts
        if (!oldScript.src) {
            newScript.textContent = oldScript.textContent;
        }

        // Replace the old script with the new one to execute it
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

/**
 * Get the current navigation configuration.
 *
 * @returns {object}
 */
export function getConfig() {
    return Object.assign({}, _config);
}

/**
 * Check if navigation is currently in progress.
 *
 * @returns {boolean}
 */
export function isNavigating() {
    return _navigating;
}
