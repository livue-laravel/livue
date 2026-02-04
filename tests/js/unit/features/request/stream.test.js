/**
 * Tests for HTTP streaming.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let stream;
let mockFetch;

beforeEach(async () => {
    vi.resetModules();

    // Mock CSRF
    vi.doMock('@/helpers/csrf.js', () => ({
        getToken: () => 'test-csrf-token',
    }));

    stream = await import('@/features/request/stream.js');

    mockFetch = vi.fn();
    globalThis.fetch = mockFetch;
});

afterEach(() => {
    stream.clearStreamTargets();
    vi.clearAllMocks();
});

describe('Streaming', () => {
    describe('streamRequest()', () => {
        it('should send POST request to /livue/stream', async () => {
            mockFetch.mockResolvedValue(createStreamResponse([]));

            await stream.streamRequest({
                snapshot: '{}',
                diffs: {},
                method: 'generate',
                params: [],
            });

            expect(mockFetch).toHaveBeenCalledWith('/livue/stream', expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Accept': 'application/x-ndjson',
                    'X-CSRF-TOKEN': 'test-csrf-token',
                }),
            }));
        });

        it('should call onChunk for each stream chunk', async () => {
            // Register the target so applyStreamChunk doesn't warn
            const el = document.createElement('div');
            stream.registerStreamTarget('output', el, false);

            const chunks = [
                { stream: { to: 'output', content: 'Hello', replace: false } },
                { stream: { to: 'output', content: ' World', replace: false } },
            ];

            // Use trailing newline so all chunks are processed
            mockFetch.mockResolvedValue(createStreamResponse(chunks, null, true));

            const onChunk = vi.fn();

            await stream.streamRequest(
                { snapshot: '{}', method: 'generate', params: [] },
                { onChunk }
            );

            expect(onChunk).toHaveBeenCalledTimes(2);
            expect(onChunk).toHaveBeenNthCalledWith(1, chunks[0].stream);
            expect(onChunk).toHaveBeenNthCalledWith(2, chunks[1].stream);
        });

        it('should call onComplete with final response', async () => {
            const finalResponse = { snapshot: '{"state":{}}', html: '<div>Done</div>' };
            mockFetch.mockResolvedValue(createStreamResponse([], finalResponse));

            const onComplete = vi.fn();

            await stream.streamRequest(
                { snapshot: '{}', method: 'generate', params: [] },
                { onComplete }
            );

            expect(onComplete).toHaveBeenCalledWith(finalResponse);
        });

        it('should call onError on HTTP error', async () => {
            mockFetch.mockResolvedValue({
                ok: false,
                status: 500,
                body: null,
            });

            const onError = vi.fn();

            await expect(
                stream.streamRequest(
                    { snapshot: '{}', method: 'generate', params: [] },
                    { onError }
                )
            ).rejects.toThrow();

            expect(onError).toHaveBeenCalled();
        });

        it('should update streaming state during request', async () => {
            let stateduringRequest = null;

            mockFetch.mockImplementation(async () => {
                stateduringRequest = { ...stream.streamingState };
                return createStreamResponse([]);
            });

            await stream.streamRequest({
                snapshot: '{}',
                method: 'testMethod',
                params: [],
                componentId: 'comp-1',
            });

            expect(stateduringRequest.active).toBe(true);
            expect(stateduringRequest.method).toBe('testMethod');
            expect(stateduringRequest.componentId).toBe('comp-1');

            // After request completes
            expect(stream.streamingState.active).toBe(false);
        });

        it('should return final response', async () => {
            const finalResponse = { snapshot: '{}', html: '<div>Result</div>' };
            mockFetch.mockResolvedValue(createStreamResponse([], finalResponse));

            const result = await stream.streamRequest({
                snapshot: '{}',
                method: 'generate',
                params: [],
            });

            expect(result).toEqual(finalResponse);
        });
    });

    describe('applyStreamChunk()', () => {
        it('should append content to target element', () => {
            const el = document.createElement('div');
            el.innerHTML = 'Initial';

            stream.registerStreamTarget('output', el, false);

            stream.applyStreamChunk({
                to: 'output',
                content: ' Added',
                replace: false,
            });

            expect(el.innerHTML).toBe('Initial Added');
        });

        it('should replace content when replace is true', () => {
            const el = document.createElement('div');
            el.innerHTML = 'Old content';

            stream.registerStreamTarget('output', el, false);

            stream.applyStreamChunk({
                to: 'output',
                content: 'New content',
                replace: true,
            });

            expect(el.innerHTML).toBe('New content');
        });

        it('should warn when target not found', () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            stream.applyStreamChunk({
                to: 'nonexistent',
                content: 'test',
                replace: false,
            });

            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Target not found'));

            warnSpy.mockRestore();
        });
    });

    describe('registerStreamTarget() / unregisterStreamTarget()', () => {
        it('should register a target', () => {
            const el = document.createElement('div');

            stream.registerStreamTarget('my-target', el, false);

            expect(stream.streamTargets.has('my-target')).toBe(true);
        });

        it('should unregister a target', () => {
            const el = document.createElement('div');

            stream.registerStreamTarget('my-target', el, false);
            stream.unregisterStreamTarget('my-target');

            expect(stream.streamTargets.has('my-target')).toBe(false);
        });
    });

    describe('clearStreamTargets()', () => {
        it('should clear all targets', () => {
            stream.registerStreamTarget('a', document.createElement('div'));
            stream.registerStreamTarget('b', document.createElement('div'));
            stream.registerStreamTarget('c', document.createElement('div'));

            stream.clearStreamTargets();

            expect(stream.streamTargets.size).toBe(0);
        });
    });

    describe('isStreaming()', () => {
        it('should return false initially', () => {
            expect(stream.isStreaming()).toBe(false);
        });

        it('should return true during streaming', async () => {
            let isStreamingDuring = false;

            mockFetch.mockImplementation(async () => {
                isStreamingDuring = stream.isStreaming();
                return createStreamResponse([]);
            });

            await stream.streamRequest({ snapshot: '{}', method: 'test', params: [] });

            expect(isStreamingDuring).toBe(true);
            expect(stream.isStreaming()).toBe(false);
        });
    });

    describe('getStreamingMethod()', () => {
        it('should return null when not streaming', () => {
            expect(stream.getStreamingMethod()).toBeNull();
        });

        it('should return method name during streaming', async () => {
            let methodDuring = null;

            mockFetch.mockImplementation(async () => {
                methodDuring = stream.getStreamingMethod();
                return createStreamResponse([]);
            });

            await stream.streamRequest({ snapshot: '{}', method: 'myMethod', params: [] });

            expect(methodDuring).toBe('myMethod');
        });
    });
});

/**
 * Helper to create a mock streaming response.
 */
function createStreamResponse(chunks, finalResponse = null, trailingNewline = false) {
    let lines = chunks.map(c => JSON.stringify(c));
    if (finalResponse) {
        lines.push(JSON.stringify(finalResponse));
    }
    let ndjson = lines.join('\n');
    if (trailingNewline) {
        ndjson += '\n';
    }

    return {
        ok: true,
        status: 200,
        body: {
            getReader: () => createMockReader(ndjson),
        },
    };
}

/**
 * Create a mock ReadableStreamDefaultReader.
 */
function createMockReader(content) {
    let done = false;
    const encoder = new TextEncoder();

    return {
        read: async () => {
            if (done) {
                return { done: true, value: undefined };
            }
            done = true;
            return { done: false, value: encoder.encode(content) };
        },
    };
}
