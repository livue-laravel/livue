/**
 * Tests for PHP Composables JavaScript support.
 *
 * Tests the createComposables, updateComposables, and hasComposables functions.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createComposables, updateComposables, hasComposables } from '@/features/composables.js';

describe('Composables Feature', () => {
    let mockCallFn;

    beforeEach(() => {
        mockCallFn = vi.fn();
    });

    describe('createComposables()', () => {
        it('should create reactive objects from composable data', () => {
            const memo = {
                composables: {
                    auth: {
                        user: 'John',
                        isAdmin: false,
                    },
                },
                composableActions: {},
            };

            const result = createComposables(memo, mockCallFn);

            expect(result.auth).toBeDefined();
            expect(result.auth.user).toBe('John');
            expect(result.auth.isAdmin).toBe(false);
        });

        it('should wrap actions as callable methods', () => {
            const memo = {
                composables: {
                    cart: { total: 0, items: [] },
                },
                composableActions: {
                    cart: { addItem: true, clear: true },
                },
            };

            const result = createComposables(memo, mockCallFn);

            expect(typeof result.cart.addItem).toBe('function');
            expect(typeof result.cart.clear).toBe('function');
        });

        it('should call server with correct namespace.action format', () => {
            const memo = {
                composables: {},
                composableActions: {
                    cart: { addItem: true },
                },
            };

            const result = createComposables(memo, mockCallFn);

            result.cart.addItem('product-1', 2);

            expect(mockCallFn).toHaveBeenCalledWith('cart.addItem', ['product-1', 2]);
        });

        it('should unwrap synthesizer tuples', () => {
            const memo = {
                composables: {
                    auth: {
                        user: ['John', { s: 'mdl' }],
                        role: 'admin',
                    },
                },
                composableActions: {},
            };

            const result = createComposables(memo, mockCallFn);

            expect(result.auth.user).toBe('John');
            expect(result.auth.role).toBe('admin');
        });

        it('should handle nested objects in composable data', () => {
            const memo = {
                composables: {
                    settings: {
                        theme: {
                            color: 'blue',
                            mode: ['dark', { s: 'enm' }],
                        },
                    },
                },
                composableActions: {},
            };

            const result = createComposables(memo, mockCallFn);

            expect(result.settings.theme.color).toBe('blue');
            expect(result.settings.theme.mode).toBe('dark');
        });

        it('should handle multiple namespaces', () => {
            const memo = {
                composables: {
                    auth: { user: 'John' },
                    cart: { total: 42 },
                },
                composableActions: {
                    auth: { logout: true },
                    cart: { clear: true },
                },
            };

            const result = createComposables(memo, mockCallFn);

            expect(result.auth.user).toBe('John');
            expect(result.cart.total).toBe(42);
            expect(typeof result.auth.logout).toBe('function');
            expect(typeof result.cart.clear).toBe('function');
        });

        it('should handle namespace with only actions', () => {
            const memo = {
                composables: {},
                composableActions: {
                    auth: { logout: true, refresh: true },
                },
            };

            const result = createComposables(memo, mockCallFn);

            expect(result.auth).toBeDefined();
            expect(typeof result.auth.logout).toBe('function');
            expect(typeof result.auth.refresh).toBe('function');
        });

        it('should handle namespace with only data', () => {
            const memo = {
                composables: {
                    config: { debug: true, version: '1.0' },
                },
                composableActions: {},
            };

            const result = createComposables(memo, mockCallFn);

            expect(result.config.debug).toBe(true);
            expect(result.config.version).toBe('1.0');
        });

        it('should handle empty memo', () => {
            const result = createComposables({}, mockCallFn);

            expect(Object.keys(result)).toHaveLength(0);
        });
    });

    describe('updateComposables()', () => {
        it('should update existing data in place', () => {
            const memo = {
                composables: {
                    cart: { total: 0, items: [] },
                },
                composableActions: {
                    cart: { addItem: true },
                },
            };

            const composables = createComposables(memo, mockCallFn);

            updateComposables(composables, {
                composables: {
                    cart: { total: 42, items: ['product-1'] },
                },
            });

            expect(composables.cart.total).toBe(42);
            expect(composables.cart.items).toEqual(['product-1']);
        });

        it('should not overwrite action methods', () => {
            const memo = {
                composables: {
                    cart: { total: 0 },
                },
                composableActions: {
                    cart: { addItem: true },
                },
            };

            const composables = createComposables(memo, mockCallFn);
            const originalAddItem = composables.cart.addItem;

            updateComposables(composables, {
                composables: {
                    cart: { total: 10 },
                },
            });

            expect(composables.cart.addItem).toBe(originalAddItem);
        });

        it('should unwrap tuples in new data', () => {
            const memo = {
                composables: {
                    auth: { user: 'John' },
                },
                composableActions: {},
            };

            const composables = createComposables(memo, mockCallFn);

            updateComposables(composables, {
                composables: {
                    auth: { user: ['Jane', { s: 'mdl' }] },
                },
            });

            expect(composables.auth.user).toBe('Jane');
        });

        it('should handle update with no composable data', () => {
            const memo = {
                composables: {
                    cart: { total: 0 },
                },
                composableActions: {},
            };

            const composables = createComposables(memo, mockCallFn);

            // Should not throw
            updateComposables(composables, {});

            expect(composables.cart.total).toBe(0);
        });
    });

    describe('hasComposables()', () => {
        it('should return true when composables data exists', () => {
            expect(hasComposables({
                composables: { auth: { user: 'John' } },
            })).toBe(true);
        });

        it('should return true when composable actions exist', () => {
            expect(hasComposables({
                composableActions: { auth: { logout: true } },
            })).toBe(true);
        });

        it('should return false for empty memo', () => {
            expect(hasComposables({})).toBeFalsy();
        });

        it('should return false for empty composables', () => {
            expect(hasComposables({
                composables: {},
                composableActions: {},
            })).toBe(false);
        });
    });
});
