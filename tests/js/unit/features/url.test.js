/**
 * Tests for URL query string synchronization.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let url;

beforeEach(async () => {
    vi.resetModules();
    url = await import('@/features/url.js');

    // Reset URL to clean state
    history.replaceState({}, '', '/');
});

afterEach(() => {
    history.replaceState({}, '', '/');
});

describe('URL Sync', () => {
    describe('readQueryString()', () => {
        it('should read values from URL', () => {
            history.replaceState({}, '', '/?search=test&page=2');

            const values = url.readQueryString({
                search: { as: null },
                page: { as: null },
            });

            expect(values.search).toBe('test');
            expect(values.page).toBe('2');
        });

        it('should use alias from as config', () => {
            history.replaceState({}, '', '/?q=hello');

            const values = url.readQueryString({
                search: { as: 'q' },
            });

            expect(values.search).toBe('hello');
        });

        it('should return empty object when no matching params', () => {
            history.replaceState({}, '', '/');

            const values = url.readQueryString({
                search: { as: null },
            });

            expect(values).toEqual({});
        });

        it('should handle multiple params', () => {
            history.replaceState({}, '', '/?a=1&b=2&c=3');

            const values = url.readQueryString({
                a: {},
                b: {},
                c: {},
            });

            expect(values).toEqual({ a: '1', b: '2', c: '3' });
        });
    });

    describe('updateQueryString()', () => {
        it('should set URL params from state', () => {
            const state = { search: 'test', page: 5 };
            const urlParams = {
                search: {},
                page: {},
            };

            url.updateQueryString(urlParams, state);

            const params = new URL(window.location).searchParams;
            expect(params.get('search')).toBe('test');
            expect(params.get('page')).toBe('5');
        });

        it('should use alias from as config', () => {
            const state = { search: 'hello' };
            const urlParams = {
                search: { as: 'q' },
            };

            url.updateQueryString(urlParams, state);

            const params = new URL(window.location).searchParams;
            expect(params.get('q')).toBe('hello');
            expect(params.get('search')).toBeNull();
        });

        it('should remove empty values by default', () => {
            history.replaceState({}, '', '/?search=old');

            const state = { search: '' };
            const urlParams = { search: {} };

            url.updateQueryString(urlParams, state);

            const params = new URL(window.location).searchParams;
            expect(params.get('search')).toBeNull();
        });

        it('should remove null values', () => {
            history.replaceState({}, '', '/?search=old');

            const state = { search: null };
            const urlParams = { search: {} };

            url.updateQueryString(urlParams, state);

            const params = new URL(window.location).searchParams;
            expect(params.get('search')).toBeNull();
        });

        it('should keep empty values with keep option', () => {
            const state = { search: '' };
            const urlParams = {
                search: { keep: true },
            };

            url.updateQueryString(urlParams, state);

            const params = new URL(window.location).searchParams;
            expect(params.get('search')).toBe('');
        });

        it('should exclude values matching except option', () => {
            const state = { page: 1 };
            const urlParams = {
                page: { except: 1 },
            };

            url.updateQueryString(urlParams, state);

            const params = new URL(window.location).searchParams;
            expect(params.get('page')).toBeNull();
        });

        it('should use loose comparison for except', () => {
            const state = { page: '1' }; // String
            const urlParams = {
                page: { except: 1 }, // Number
            };

            url.updateQueryString(urlParams, state);

            const params = new URL(window.location).searchParams;
            expect(params.get('page')).toBeNull();
        });

        it('should use replaceState by default', () => {
            const replaceStateSpy = vi.spyOn(history, 'replaceState');
            const pushStateSpy = vi.spyOn(history, 'pushState');

            const state = { search: 'test' };
            const urlParams = { search: {} };

            url.updateQueryString(urlParams, state);

            expect(replaceStateSpy).toHaveBeenCalled();
            expect(pushStateSpy).not.toHaveBeenCalled();
        });

        it('should use pushState with history option', () => {
            const replaceStateSpy = vi.spyOn(history, 'replaceState');
            const pushStateSpy = vi.spyOn(history, 'pushState');

            const state = { search: 'test' };
            const urlParams = {
                search: { history: true },
            };

            url.updateQueryString(urlParams, state);

            expect(pushStateSpy).toHaveBeenCalled();
            expect(replaceStateSpy).not.toHaveBeenCalled();
        });

        it('should not update URL if unchanged', () => {
            history.replaceState({}, '', '/?search=test');

            const replaceStateSpy = vi.spyOn(history, 'replaceState');
            const pushStateSpy = vi.spyOn(history, 'pushState');

            const state = { search: 'test' };
            const urlParams = { search: {} };

            url.updateQueryString(urlParams, state);

            expect(replaceStateSpy).not.toHaveBeenCalled();
            expect(pushStateSpy).not.toHaveBeenCalled();
        });

        it('should handle multiple params with different configs', () => {
            const state = {
                search: 'query',
                page: 1,
                filter: '',
            };
            const urlParams = {
                search: { as: 'q' },
                page: { except: 1 },
                filter: { keep: true },
            };

            url.updateQueryString(urlParams, state);

            const params = new URL(window.location).searchParams;
            expect(params.get('q')).toBe('query');
            expect(params.get('page')).toBeNull(); // Excepted
            expect(params.get('filter')).toBe(''); // Kept even though empty
        });
    });
});
