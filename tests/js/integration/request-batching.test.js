/**
 * Integration tests for request batching.
 *
 * These tests verify that multiple component requests are properly
 * batched into a single HTTP request.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let poolRequest, poolLazyLoad;
let mockFetch;

beforeEach(async () => {
    vi.resetModules();

    // Mock fetch
    mockFetch = vi.fn();
    global.fetch = mockFetch;

    // Mock queueMicrotask to execute immediately in tests
    global.queueMicrotask = (fn) => Promise.resolve().then(fn);

    // Mock CSRF
    vi.doMock('@/helpers/csrf.js', () => ({
        getToken: () => 'test-csrf-token',
    }));

    // Mock navigation
    vi.doMock('@/features/navigation.js', () => ({
        handleRedirect: vi.fn(),
    }));

    // Mock progress
    vi.doMock('@/helpers/progress.js', () => ({
        default: {
            start: vi.fn(),
            done: vi.fn(),
        },
    }));

    // Mock hooks
    vi.doMock('@/helpers/hooks.js', () => ({
        trigger: vi.fn(),
    }));

    const module = await import('@/features/request/pool.js');
    poolRequest = module.poolRequest;
    poolLazyLoad = module.poolLazyLoad;
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('Request Batching Integration', () => {
    describe('multiple component updates', () => {
        it('should batch requests from same microtask', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    responses: [
                        {
                            snapshot: '{"state":{"count":1},"memo":{}}',
                            html: '<div>1</div>',
                        },
                        {
                            snapshot: '{"state":{"name":"test"},"memo":{}}',
                            html: '<div>test</div>',
                        },
                    ],
                }),
            });

            // Queue multiple requests in same microtask
            const results = await Promise.all([
                poolRequest({
                    componentId: 'comp-1',
                    snapshot: '{}',
                    updates: [{ type: 'call', method: 'increment' }],
                }),
                poolRequest({
                    componentId: 'comp-2',
                    snapshot: '{}',
                    updates: [{ type: 'call', method: 'setName' }],
                }),
            ]);

            // Should only make one fetch call
            expect(mockFetch).toHaveBeenCalledTimes(1);

            // Both results should be returned
            expect(results.length).toBe(2);
        });

        it('should distribute responses to correct components', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    responses: [
                        {
                            snapshot: '{"state":{"count":5},"memo":{}}',
                            html: '<span>5</span>',
                        },
                        {
                            snapshot: '{"state":{"items":["a","b"]},"memo":{}}',
                            html: '<ul><li>a</li><li>b</li></ul>',
                        },
                    ],
                }),
            });

            const [counterResult, listResult] = await Promise.all([
                poolRequest({
                    componentId: 'counter',
                    snapshot: '{}',
                    updates: [],
                }),
                poolRequest({
                    componentId: 'list',
                    snapshot: '{}',
                    updates: [],
                }),
            ]);

            expect(JSON.parse(counterResult.snapshot).state.count).toBe(5);
            expect(JSON.parse(listResult.snapshot).state.items).toEqual(['a', 'b']);
        });
    });

    describe('isolated requests', () => {
        it('should send isolated requests separately', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    responses: [
                        {
                            snapshot: '{"state":{},"memo":{}}',
                            html: '<div>Isolated</div>',
                        },
                    ],
                }),
            });

            // Queue isolated and normal request
            await Promise.all([
                poolRequest({
                    componentId: 'isolated-comp',
                    snapshot: '{}',
                    updates: [],
                    isolate: true,
                }),
                poolRequest({
                    componentId: 'normal-comp',
                    snapshot: '{}',
                    updates: [],
                }),
            ]);

            // Should make two separate fetch calls
            expect(mockFetch).toHaveBeenCalledTimes(2);
        });
    });

    describe('lazy load batching', () => {
        it('should batch multiple lazy loads', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    lazyResponses: [
                        {
                            snapshot: '{"state":{},"memo":{}}',
                            html: '<div>Lazy 1</div>',
                        },
                        {
                            snapshot: '{"state":{},"memo":{}}',
                            html: '<div>Lazy 2</div>',
                        },
                    ],
                }),
            });

            await Promise.all([
                poolLazyLoad({ component: 'lazy-1', props: {} }),
                poolLazyLoad({ component: 'lazy-2', props: {} }),
            ]);

            // Should batch into one request
            expect(mockFetch).toHaveBeenCalledTimes(1);
        });
    });

    describe('error distribution', () => {
        it('should distribute errors to all pending requests', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));

            const results = await Promise.allSettled([
                poolRequest({
                    componentId: 'comp-1',
                    snapshot: '{}',
                    updates: [],
                }),
                poolRequest({
                    componentId: 'comp-2',
                    snapshot: '{}',
                    updates: [],
                }),
            ]);

            // Both should be rejected
            expect(results[0].status).toBe('rejected');
            expect(results[1].status).toBe('rejected');
        });

        it('should handle component-specific errors', async () => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({
                    responses: [
                        {
                            snapshot: '{"state":{},"memo":{}}',
                            html: '<div>Good</div>',
                        },
                        {
                            error: 'Component error',
                        },
                    ],
                }),
            });

            const results = await Promise.allSettled([
                poolRequest({
                    componentId: 'good-comp',
                    snapshot: '{}',
                    updates: [],
                }),
                poolRequest({
                    componentId: 'bad-comp',
                    snapshot: '{}',
                    updates: [],
                }),
            ]);

            // Good component should succeed
            expect(results[0].status).toBe('fulfilled');

            // Bad component should have error
            expect(results[1].status).toBe('rejected');
        });
    });

    describe('request timing', () => {
        it('should execute batch at end of microtask', async () => {
            let fetchCalled = false;
            mockFetch.mockImplementation(() => {
                fetchCalled = true;
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ responses: [{ snapshot: '{}', html: '' }] }),
                });
            });

            // Start request but don't await
            const promise = poolRequest({
                componentId: 'comp-1',
                snapshot: '{}',
                updates: [],
            });

            await promise;
            expect(fetchCalled).toBe(true);
        });
    });
});

describe('Request Pool State', () => {
    it('should clear pool after batch execution', async () => {
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ responses: [{ snapshot: '{}', html: '' }] }),
        });

        // First batch
        await poolRequest({
            componentId: 'comp-1',
            snapshot: '{}',
            updates: [],
        });

        // Second batch (should be a new request)
        await poolRequest({
            componentId: 'comp-2',
            snapshot: '{}',
            updates: [],
        });

        // Should make two separate requests (different microtasks)
        expect(mockFetch).toHaveBeenCalledTimes(2);
    });
});
