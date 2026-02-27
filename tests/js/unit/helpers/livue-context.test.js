/**
 * Tests for getLivueFromVnode helper.
 */

import { describe, it, expect } from 'vitest';
import { getLivueFromVnode } from '@/helpers/livue-context.js';

describe('getLivueFromVnode', () => {
    it('should return livue from direct setupState', () => {
        const livue = { call: () => {} };
        const vnode = {
            ctx: {
                setupState: { livue },
            },
        };

        expect(getLivueFromVnode(vnode)).toBe(livue);
    });

    it('should return livue from parent setupState', () => {
        const livue = { call: () => {} };
        const vnode = {
            ctx: {
                setupState: {},
                parent: {
                    setupState: { livue },
                },
            },
        };

        expect(getLivueFromVnode(vnode)).toBe(livue);
    });

    it('should walk up the parent chain', () => {
        const livue = { call: () => {} };
        const vnode = {
            ctx: {
                setupState: {},
                parent: {
                    setupState: {},
                    parent: {
                        setupState: {},
                        parent: {
                            setupState: { livue },
                            parent: null,
                        },
                    },
                },
            },
        };

        expect(getLivueFromVnode(vnode)).toBe(livue);
    });

    it('should return null when livue not found', () => {
        const vnode = {
            ctx: {
                setupState: {},
                parent: {
                    setupState: {},
                    parent: null,
                },
            },
        };

        expect(getLivueFromVnode(vnode)).toBeNull();
    });

    it('should return null when ctx is null', () => {
        const vnode = { ctx: null };

        expect(getLivueFromVnode(vnode)).toBeNull();
    });

    it('should return null when ctx has no setupState', () => {
        const vnode = { ctx: {} };

        expect(getLivueFromVnode(vnode)).toBeNull();
    });
});
