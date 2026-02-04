/**
 * Tests for request pooling.
 *
 * The pool module collects pending component updates within a single microtask
 * and sends them as a single batch HTTP request to /livue/update.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let pool;
let mockFetch;

beforeEach(async () => {
    vi.resetModules();

    // Mock CSRF module
    vi.doMock('@/helpers/csrf.js', () => ({
        getToken: () => 'test-csrf-token',
    }));

    // Mock navigation module
    vi.doMock('@/features/navigation.js', () => ({
        handleRedirect: vi.fn(),
    }));

    // Mock progress module
    vi.doMock('@/helpers/progress.js', () => ({
        default: {
            start: vi.fn(),
            done: vi.fn(),
        },
    }));

    // Mock hooks module
    vi.doMock('@/helpers/hooks.js', () => ({
        trigger: vi.fn(),
    }));

    pool = await import('@/features/request/pool.js');

    // Setup fetch mock
    mockFetch = vi.fn();
    globalThis.fetch = mockFetch;

    // Setup meta tag for endpoint URL
    document.head.innerHTML = `
        <meta name="csrf-token" content="test-csrf-token">
        <meta name="livue-prefix" content="livue">
    `;
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('Request Pool', () => {
    describe('poolRequest()', () => {
        it('should batch multiple requests in the same microtask', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                responses: [
                    { snapshot: '{"state":{}}', html: '<div>1</div>' },
                    { snapshot: '{"state":{}}', html: '<div>2</div>' },
                ],
            }));

            // Queue two requests in the same tick
            const p1 = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'a', params: [] });
            const p2 = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'b', params: [] });

            const [r1, r2] = await Promise.all([p1, p2]);

            // Should have made only one fetch call
            expect(mockFetch).toHaveBeenCalledTimes(1);

            // Each promise should get its own response
            expect(r1.html).toBe('<div>1</div>');
            expect(r2.html).toBe('<div>2</div>');
        });

        it('should send correct request body with updates array', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                responses: [{ snapshot: '{}', html: '<div>ok</div>' }],
            }));

            const payload = {
                snapshot: '{"state":{"count":1}}',
                diffs: { count: 2 },
                method: 'increment',
                params: [5],
            };

            await pool.poolRequest(payload);
            await flushMicrotasks();

            expect(mockFetch).toHaveBeenCalledWith(
                '/livue/update',
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({ updates: [payload] }),
                })
            );
        });

        it('should include CSRF token in headers', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                responses: [{ snapshot: '{}', html: '<div>ok</div>' }],
            }));

            await pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'a', params: [] });
            await flushMicrotasks();

            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'X-CSRF-TOKEN': 'test-csrf-token',
                    }),
                })
            );
        });

        it('should send isolated requests immediately', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                responses: [{ snapshot: '{}', html: '<div>isolated</div>' }],
            }));

            const result = await pool.poolRequest({
                snapshot: '{}',
                diffs: {},
                method: 'a',
                params: [],
                isolate: true,
            });

            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(result.html).toBe('<div>isolated</div>');
        });

        it('should distribute errors to individual requests', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                responses: [
                    { snapshot: '{}', html: '<div>ok</div>' },
                    { error: 'Method not found', status: 404 },
                ],
            }));

            const p1 = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'ok', params: [] });
            const p2 = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'bad', params: [] });

            const r1 = await p1;
            expect(r1.html).toBe('<div>ok</div>');

            await expect(p2).rejects.toThrow('Method not found');
        });

        it('should handle validation errors (422)', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                responses: [
                    { errors: { email: ['Invalid email'] } },
                ],
            }));

            const p = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'submit', params: [] });

            await expect(p).rejects.toMatchObject({
                message: 'Validation failed',
                status: 422,
            });
        });

        it('should handle HTTP errors for entire batch', async () => {
            mockFetch.mockResolvedValue(createMockResponse(
                { error: 'Server error' },
                { ok: false, status: 500 }
            ));

            const p1 = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'a', params: [] });
            const p2 = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'b', params: [] });

            await expect(p1).rejects.toThrow();
            await expect(p2).rejects.toThrow();
        });

        it('should handle network errors', async () => {
            mockFetch.mockRejectedValue(new Error('Network error'));

            const p1 = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'a', params: [] });
            const p2 = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'b', params: [] });

            await expect(p1).rejects.toThrow('Network error');
            await expect(p2).rejects.toThrow('Network error');
        });

        it('should handle missing response for a component', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                responses: [
                    { snapshot: '{}', html: '<div>first</div>' },
                    // Second response is missing
                ],
            }));

            const p1 = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'a', params: [] });
            const p2 = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'b', params: [] });

            const r1 = await p1;
            expect(r1.html).toBe('<div>first</div>');

            await expect(p2).rejects.toThrow('No response for component update');
        });

        it('should handle redirect in response', async () => {
            const { handleRedirect } = await import('@/features/navigation.js');

            mockFetch.mockResolvedValue(createMockResponse({
                responses: [
                    { redirect: { url: '/dashboard', navigate: true } },
                ],
            }));

            // Start the request but don't await - redirect will prevent resolution
            pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'login', params: [] });

            await flushMicrotasks();

            expect(handleRedirect).toHaveBeenCalledWith({ url: '/dashboard', navigate: true });
        });

        it('should strip isolate flag from payload sent to server', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                responses: [{ snapshot: '{}', html: '<div>ok</div>' }],
            }));

            await pool.poolRequest({
                snapshot: '{"state":{}}',
                diffs: {},
                method: 'test',
                params: [],
                isolate: true,
            });

            const body = JSON.parse(mockFetch.mock.calls[0][1].body);

            // isolate should not be in the payload
            expect(body.updates[0]).not.toHaveProperty('isolate');
            expect(body.updates[0]).toHaveProperty('snapshot');
            expect(body.updates[0]).toHaveProperty('method');
        });
    });

    describe('poolLazyLoad()', () => {
        it('should batch lazy loads with regular updates', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                responses: [{ snapshot: '{}', html: '<div>update</div>' }],
                lazyResponses: [{ snapshot: '{}', html: '<div>lazy</div>' }],
            }));

            const update = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'a', params: [] });
            const lazy = pool.poolLazyLoad({ component: 'my-component', props: {} });

            const [updateResult, lazyResult] = await Promise.all([update, lazy]);

            expect(mockFetch).toHaveBeenCalledTimes(1);
            expect(updateResult.html).toBe('<div>update</div>');
            expect(lazyResult.html).toBe('<div>lazy</div>');
        });

        it('should send lazy loads in lazyLoads array', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                lazyResponses: [{ snapshot: '{}', html: '<div>lazy</div>' }],
            }));

            await pool.poolLazyLoad({ component: 'sidebar', props: { items: 5 } });
            await flushMicrotasks();

            const body = JSON.parse(mockFetch.mock.calls[0][1].body);

            expect(body.lazyLoads).toEqual([{ component: 'sidebar', props: { items: 5 } }]);
        });

        it('should handle lazy load errors', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                lazyResponses: [{ error: 'Component not found', status: 404 }],
            }));

            const p = pool.poolLazyLoad({ component: 'nonexistent', props: {} });

            await expect(p).rejects.toThrow('Component not found');
        });

        it('should handle missing lazy response', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                lazyResponses: [],
            }));

            const p = pool.poolLazyLoad({ component: 'sidebar', props: {} });

            await expect(p).rejects.toThrow('No response for lazy load');
        });
    });

    describe('batching behavior', () => {
        it('should create separate batches for different microtasks', async () => {
            mockFetch.mockResolvedValue(createMockResponse({
                responses: [{ snapshot: '{}', html: '<div>ok</div>' }],
            }));

            // First batch
            const p1 = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'a', params: [] });
            await p1;

            // Second batch (new microtask)
            const p2 = pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'b', params: [] });
            await p2;

            // Should have made two separate fetch calls
            expect(mockFetch).toHaveBeenCalledTimes(2);
        });

        it('should not send empty batch', async () => {
            // Trigger flush with no pending requests
            await flushMicrotasks();

            expect(mockFetch).not.toHaveBeenCalled();
        });
    });

    describe('progress bar integration', () => {
        it('should start and complete progress bar', async () => {
            const progress = (await import('@/helpers/progress.js')).default;

            mockFetch.mockResolvedValue(createMockResponse({
                responses: [{ snapshot: '{}', html: '<div>ok</div>' }],
            }));

            await pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'a', params: [] });

            expect(progress.start).toHaveBeenCalled();
            expect(progress.done).toHaveBeenCalled();
        });

        it('should complete progress bar on error', async () => {
            const progress = (await import('@/helpers/progress.js')).default;

            mockFetch.mockRejectedValue(new Error('Network error'));

            try {
                await pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'a', params: [] });
            } catch (e) {
                // Expected
            }

            expect(progress.start).toHaveBeenCalled();
            expect(progress.done).toHaveBeenCalled();
        });
    });

    describe('hooks integration', () => {
        it('should trigger request.started hook', async () => {
            const { trigger } = await import('@/helpers/hooks.js');

            mockFetch.mockResolvedValue(createMockResponse({
                responses: [{ snapshot: '{}', html: '<div>ok</div>' }],
            }));

            await pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'test', params: [] });

            expect(trigger).toHaveBeenCalledWith('request.started', expect.objectContaining({
                url: '/livue/update',
                updateCount: 1,
                lazyCount: 0,
            }));
        });

        it('should trigger request.finished hook on success', async () => {
            const { trigger } = await import('@/helpers/hooks.js');

            mockFetch.mockResolvedValue(createMockResponse({
                responses: [{ snapshot: '{}', html: '<div>ok</div>' }],
            }));

            await pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'test', params: [] });

            expect(trigger).toHaveBeenCalledWith('request.finished', expect.objectContaining({
                success: true,
                updateCount: 1,
            }));
        });

        it('should trigger request.finished hook on error', async () => {
            const { trigger } = await import('@/helpers/hooks.js');

            mockFetch.mockRejectedValue(new Error('Network error'));

            try {
                await pool.poolRequest({ snapshot: '{}', diffs: {}, method: 'test', params: [] });
            } catch (e) {
                // Expected
            }

            expect(trigger).toHaveBeenCalledWith('request.finished', expect.objectContaining({
                success: false,
                error: expect.any(Error),
            }));
        });
    });
});
