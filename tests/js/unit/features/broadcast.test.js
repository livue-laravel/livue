/**
 * Tests for cross-tab state synchronization.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let broadcast;

beforeEach(async () => {
    vi.resetModules();

    // Reset BroadcastChannel mock
    MockBroadcastChannel.reset();

    broadcast = await import('@/features/broadcast.js');
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('Broadcast (Tab Sync)', () => {
    describe('register() / unregister()', () => {
        it('should register a component listener', () => {
            const callback = vi.fn();

            broadcast.register('shopping-cart', callback);

            // Simulate message from another tab
            const channel = MockBroadcastChannel.instances.get('livue-tab-sync');
            channel.onmessage({
                data: {
                    tabId: 'other-tab',
                    component: 'shopping-cart',
                    state: { items: 3 },
                    properties: ['items'],
                    config: {},
                },
            });

            expect(callback).toHaveBeenCalledWith(
                { items: 3 },
                ['items'],
                {}
            );
        });

        it('should unregister a component listener', () => {
            const callback = vi.fn();

            broadcast.register('cart', callback);
            broadcast.unregister('cart');

            // Simulate message
            const channel = MockBroadcastChannel.instances.get('livue-tab-sync');
            channel.onmessage({
                data: {
                    tabId: 'other-tab',
                    component: 'cart',
                    state: {},
                    properties: [],
                    config: {},
                },
            });

            expect(callback).not.toHaveBeenCalled();
        });

        it('should only call matching component callbacks', () => {
            const cartCallback = vi.fn();
            const userCallback = vi.fn();

            broadcast.register('cart', cartCallback);
            broadcast.register('user', userCallback);

            const channel = MockBroadcastChannel.instances.get('livue-tab-sync');
            channel.onmessage({
                data: {
                    tabId: 'other-tab',
                    component: 'cart',
                    state: { items: 1 },
                    properties: ['items'],
                    config: {},
                },
            });

            expect(cartCallback).toHaveBeenCalled();
            expect(userCallback).not.toHaveBeenCalled();
        });
    });

    describe('broadcast()', () => {
        it('should send message via BroadcastChannel', () => {
            broadcast.register('test', vi.fn()); // Initialize channel

            const postMessageSpy = vi.spyOn(
                MockBroadcastChannel.instances.get('livue-tab-sync'),
                'postMessage'
            );

            broadcast.broadcast('cart', { items: 5 }, ['items'], { enabled: true });

            expect(postMessageSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    component: 'cart',
                    state: { items: 5 },
                    properties: ['items'],
                    config: { enabled: true },
                })
            );
        });

        it('should include tabId in broadcast', () => {
            broadcast.register('test', vi.fn());

            const postMessageSpy = vi.spyOn(
                MockBroadcastChannel.instances.get('livue-tab-sync'),
                'postMessage'
            );

            broadcast.broadcast('comp', {}, [], {});

            expect(postMessageSpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    tabId: expect.any(String),
                })
            );
        });

        it('should ignore own messages', () => {
            const callback = vi.fn();
            broadcast.register('self', callback);

            // Get own tabId
            const tabId = broadcast.getTabId();

            // Simulate receiving own message
            const channel = MockBroadcastChannel.instances.get('livue-tab-sync');
            channel.onmessage({
                data: {
                    tabId: tabId, // Same as own
                    component: 'self',
                    state: {},
                    properties: [],
                    config: {},
                },
            });

            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe('filterState()', () => {
        it('should return all changed properties by default', () => {
            const state = { a: 1, b: 2, c: 3 };
            const properties = ['a', 'b', 'c'];
            const config = {};

            const filtered = broadcast.filterState(state, properties, config);

            expect(filtered).toEqual({ a: 1, b: 2, c: 3 });
        });

        it('should filter with only option', () => {
            const state = { a: 1, b: 2, c: 3 };
            const properties = ['a', 'b', 'c'];
            const config = { only: ['a', 'c'] };

            const filtered = broadcast.filterState(state, properties, config);

            expect(filtered).toEqual({ a: 1, c: 3 });
            expect(filtered.b).toBeUndefined();
        });

        it('should filter with except option', () => {
            const state = { a: 1, b: 2, c: 3 };
            const properties = ['a', 'b', 'c'];
            const config = { except: ['b'] };

            const filtered = broadcast.filterState(state, properties, config);

            expect(filtered).toEqual({ a: 1, c: 3 });
            expect(filtered.b).toBeUndefined();
        });

        it('should only include changed properties', () => {
            const state = { a: 1, b: 2, c: 3, d: 4 };
            const properties = ['a', 'c']; // Only a and c changed
            const config = {};

            const filtered = broadcast.filterState(state, properties, config);

            expect(filtered).toEqual({ a: 1, c: 3 });
            expect(filtered.b).toBeUndefined();
            expect(filtered.d).toBeUndefined();
        });

        it('should handle empty properties array', () => {
            const state = { a: 1 };
            const properties = [];
            const config = {};

            const filtered = broadcast.filterState(state, properties, config);

            expect(filtered).toEqual({});
        });
    });

    describe('getTabId()', () => {
        it('should return a unique string', () => {
            const tabId = broadcast.getTabId();

            expect(typeof tabId).toBe('string');
            expect(tabId.length).toBeGreaterThan(0);
        });

        it('should return consistent tabId', () => {
            const tabId1 = broadcast.getTabId();
            const tabId2 = broadcast.getTabId();

            expect(tabId1).toBe(tabId2);
        });
    });

    describe('localStorage fallback', () => {
        it('should use localStorage when BroadcastChannel not available', async () => {
            vi.resetModules();

            // Remove BroadcastChannel
            const originalBC = globalThis.BroadcastChannel;
            delete globalThis.BroadcastChannel;

            // Create a mock localStorage to track calls
            const mockStorage = {
                setItem: vi.fn(),
                removeItem: vi.fn(),
                getItem: vi.fn(() => null),
                clear: vi.fn(),
                key: vi.fn(),
                length: 0,
            };
            const originalLocalStorage = globalThis.localStorage;
            Object.defineProperty(globalThis, 'localStorage', {
                value: mockStorage,
                writable: true,
                configurable: true,
            });

            const broadcastFallback = await import('@/features/broadcast.js');

            broadcastFallback.register('test', vi.fn());
            broadcastFallback.broadcast('comp', { value: 1 }, ['value'], {});

            expect(mockStorage.setItem).toHaveBeenCalledWith('livue-tab-sync', expect.any(String));
            expect(mockStorage.removeItem).toHaveBeenCalledWith('livue-tab-sync');

            // Restore localStorage and BroadcastChannel
            Object.defineProperty(globalThis, 'localStorage', {
                value: originalLocalStorage,
                writable: true,
                configurable: true,
            });
            globalThis.BroadcastChannel = originalBC;
        });
    });

    describe('default export', () => {
        it('should export all functions', () => {
            expect(broadcast.default.register).toBe(broadcast.register);
            expect(broadcast.default.unregister).toBe(broadcast.unregister);
            expect(broadcast.default.broadcast).toBe(broadcast.broadcast);
            expect(broadcast.default.filterState).toBe(broadcast.filterState);
            expect(broadcast.default.getTabId).toBe(broadcast.getTabId);
        });
    });
});
