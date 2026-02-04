/**
 * Tests for the LiVue event system.
 *
 * The event bus supports three delivery modes:
 * - broadcast: deliver to all listeners
 * - self: deliver only to the source component instance
 * - to: deliver to all instances of a named component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// We need to reset the module state between tests
let events;

beforeEach(async () => {
    // Reset module by re-importing
    vi.resetModules();

    // Mock devtools before importing events
    vi.doMock('@/devtools/index.js', () => ({
        isCollecting: () => false,
        logEvent: vi.fn(),
    }));

    events = await import('@/features/events.js');
});

describe('Events Module', () => {
    describe('on() and emit()', () => {
        it('should register and call event listeners', () => {
            const handler = vi.fn();

            events.on('test-event', 'my-component', 'comp-1', handler);
            events.emit('test-event', { data: 'value' }, 'broadcast', 'source', 'src-1', null);

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith({ data: 'value' });
        });

        it('should return an unsubscribe function', () => {
            const handler = vi.fn();

            const unsub = events.on('test-event', 'my-component', 'comp-1', handler);
            unsub();
            events.emit('test-event', {}, 'broadcast', 'source', 'src-1', null);

            expect(handler).not.toHaveBeenCalled();
        });

        it('should deliver to all listeners in broadcast mode', () => {
            const handler1 = vi.fn();
            const handler2 = vi.fn();
            const handler3 = vi.fn();

            events.on('event', 'comp-a', 'a-1', handler1);
            events.on('event', 'comp-b', 'b-1', handler2);
            events.on('event', 'comp-a', 'a-2', handler3);

            events.emit('event', 'data', 'broadcast', 'source', 'src-1', null);

            expect(handler1).toHaveBeenCalledWith('data');
            expect(handler2).toHaveBeenCalledWith('data');
            expect(handler3).toHaveBeenCalledWith('data');
        });

        it('should deliver only to source component in self mode', () => {
            const handler1 = vi.fn();
            const handler2 = vi.fn();

            events.on('event', 'comp', 'comp-1', handler1);
            events.on('event', 'comp', 'comp-2', handler2);

            events.emit('event', 'data', 'self', 'comp', 'comp-1', null);

            expect(handler1).toHaveBeenCalledWith('data');
            expect(handler2).not.toHaveBeenCalled();
        });

        it('should deliver to target component name in to mode', () => {
            const handler1 = vi.fn();
            const handler2 = vi.fn();
            const handler3 = vi.fn();

            events.on('event', 'target-comp', 'target-1', handler1);
            events.on('event', 'target-comp', 'target-2', handler2);
            events.on('event', 'other-comp', 'other-1', handler3);

            events.emit('event', 'data', 'to', 'source', 'src-1', 'target-comp');

            expect(handler1).toHaveBeenCalledWith('data');
            expect(handler2).toHaveBeenCalledWith('data');
            expect(handler3).not.toHaveBeenCalled();
        });

        it('should not deliver if no listeners registered', () => {
            // Should not throw
            expect(() => {
                events.emit('nonexistent-event', 'data', 'broadcast', 's', 's-1', null);
            }).not.toThrow();
        });

        it('should handle multiple events with same name', () => {
            const handler1 = vi.fn();
            const handler2 = vi.fn();

            events.on('event', 'comp', 'comp-1', handler1);
            events.on('event', 'comp', 'comp-1', handler2);

            events.emit('event', 'data', 'broadcast', 's', 's-1', null);

            expect(handler1).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenCalledTimes(1);
        });

        it('should catch handler errors without propagating', () => {
            const errorHandler = vi.fn(() => {
                throw new Error('Handler error');
            });
            const goodHandler = vi.fn();
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            events.on('event', 'comp-a', 'a-1', errorHandler);
            events.on('event', 'comp-b', 'b-1', goodHandler);

            events.emit('event', 'data', 'broadcast', 'source', 'src-1', null);

            expect(consoleSpy).toHaveBeenCalled();
            expect(goodHandler).toHaveBeenCalled();

            consoleSpy.mockRestore();
        });

        it('should clean up empty event sets after unsubscribe', () => {
            const handler = vi.fn();

            const unsub = events.on('lonely-event', 'comp', 'comp-1', handler);
            unsub();

            // This should not throw even though the event set is empty/deleted
            events.emit('lonely-event', 'data', 'broadcast', 's', 's-1', null);
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('removeByComponentId()', () => {
        it('should remove all listeners for a component', () => {
            const handler1 = vi.fn();
            const handler2 = vi.fn();
            const handler3 = vi.fn();

            events.on('event-a', 'comp', 'comp-1', handler1);
            events.on('event-b', 'comp', 'comp-1', handler2);
            events.on('event-a', 'comp', 'comp-2', handler3);

            events.removeByComponentId('comp-1');

            events.emit('event-a', 'data', 'broadcast', 's', 's-1', null);
            events.emit('event-b', 'data', 'broadcast', 's', 's-1', null);

            expect(handler1).not.toHaveBeenCalled();
            expect(handler2).not.toHaveBeenCalled();
            expect(handler3).toHaveBeenCalled(); // comp-2 should still receive
        });

        it('should handle removing non-existent component', () => {
            expect(() => {
                events.removeByComponentId('nonexistent');
            }).not.toThrow();
        });
    });

    describe('processServerEvents()', () => {
        it('should emit all server events in order', () => {
            const handler = vi.fn();
            events.on('server-event', 'target', 'target-1', handler);

            events.processServerEvents([
                { name: 'server-event', data: { id: 1 }, mode: 'to', target: 'target', source: 'src', sourceId: 'src-1' },
                { name: 'server-event', data: { id: 2 }, mode: 'to', target: 'target', source: 'src', sourceId: 'src-1' },
            ]);

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler).toHaveBeenNthCalledWith(1, { id: 1 });
            expect(handler).toHaveBeenNthCalledWith(2, { id: 2 });
        });

        it('should handle empty events array', () => {
            expect(() => {
                events.processServerEvents([]);
            }).not.toThrow();
        });

        it('should handle mixed delivery modes', () => {
            const broadcastHandler = vi.fn();
            const selfHandler = vi.fn();
            const toHandler = vi.fn();

            events.on('broadcast-event', 'any', 'any-1', broadcastHandler);
            events.on('self-event', 'source', 'source-1', selfHandler);
            events.on('to-event', 'target', 'target-1', toHandler);

            events.processServerEvents([
                { name: 'broadcast-event', data: 'b', mode: 'broadcast', source: 'x', sourceId: 'x-1', target: null },
                { name: 'self-event', data: 's', mode: 'self', source: 'source', sourceId: 'source-1', target: null },
                { name: 'to-event', data: 't', mode: 'to', source: 'x', sourceId: 'x-1', target: 'target' },
            ]);

            expect(broadcastHandler).toHaveBeenCalledWith('b');
            expect(selfHandler).toHaveBeenCalledWith('s');
            expect(toHandler).toHaveBeenCalledWith('t');
        });
    });

    describe('edge cases', () => {
        it('should handle undefined data', () => {
            const handler = vi.fn();
            events.on('event', 'comp', 'comp-1', handler);

            events.emit('event', undefined, 'broadcast', 's', 's-1', null);

            expect(handler).toHaveBeenCalledWith(undefined);
        });

        it('should handle null data', () => {
            const handler = vi.fn();
            events.on('event', 'comp', 'comp-1', handler);

            events.emit('event', null, 'broadcast', 's', 's-1', null);

            expect(handler).toHaveBeenCalledWith(null);
        });

        it('should handle complex data objects', () => {
            const handler = vi.fn();
            events.on('event', 'comp', 'comp-1', handler);

            const complexData = {
                nested: { deep: { value: 123 } },
                array: [1, 2, 3],
                fn: () => {},
            };

            events.emit('event', complexData, 'broadcast', 's', 's-1', null);

            expect(handler).toHaveBeenCalledWith(complexData);
        });

        it('should handle event names with special characters', () => {
            const handler = vi.fn();
            events.on('user:created:v2', 'comp', 'comp-1', handler);

            events.emit('user:created:v2', 'data', 'broadcast', 's', 's-1', null);

            expect(handler).toHaveBeenCalledWith('data');
        });
    });
});
