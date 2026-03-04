import { describe, it, expect, vi, beforeEach } from 'vitest';

let executeSetupCode;
let defineStoreMock;

beforeEach(async () => {
    vi.resetModules();

    defineStoreMock = vi.fn((id, definition) => {
        let instance = { $id: id, definition: definition };
        let useStore = vi.fn(() => instance);
        useStore.__instance = instance;
        return useStore;
    });

    vi.doMock('pinia', () => ({
        defineStore: defineStoreMock,
    }));

    let mod = await import('@/core/setup-script.js');
    executeSetupCode = mod.executeSetupCode;
});

describe('executeSetupCode store helper', () => {
    it('registers a component-scoped store by default', () => {
        let result = executeSetupCode(
            'var cart = store("cart", { state: function () { return { count: 0 }; } }); return { sid: cart.$id };',
            {},
            { $id: 'livue-abc', $name: 'cart-widget' }
        );

        expect(defineStoreMock).toHaveBeenCalledTimes(1);
        expect(defineStoreMock.mock.calls[0][0]).toBe('livue-abc:cart');
        expect(result.sid).toBe('livue-abc:cart');
    });

    it('supports global scope when requested', () => {
        let result = executeSetupCode(
            'var auth = store("auth", function () { return { ok: true }; }, { scope: "global" }); return { sid: auth.$id };',
            {},
            { $id: 'livue-xyz', $name: 'header' }
        );

        expect(defineStoreMock).toHaveBeenCalledTimes(1);
        expect(defineStoreMock.mock.calls[0][0]).toBe('auth');
        expect(result.sid).toBe('auth');
    });

    it('reuses existing store definitions for the same resolved id', () => {
        let livue = { $id: 'livue-42', $name: 'counter' };

        executeSetupCode(
            'var a = store("stats", { state: function () { return { count: 0 }; } });' +
            'var b = store("stats", { state: function () { return { count: 10 }; } });' +
            'return { sameId: a.$id === b.$id };',
            {},
            livue
        );

        expect(defineStoreMock).toHaveBeenCalledTimes(1);
        expect(defineStoreMock.mock.calls[0][0]).toBe('livue-42:stats');
    });

    it('allows resolving a pre-registered store via useStore(name)', () => {
        let livue = { $id: 'livue-bridge', $name: 'counter' };

        executeSetupCode(
            'var s = store("shared", { state: function () { return { count: 1 }; } }); return { sid: s.$id };',
            {},
            livue
        );

        let result = executeSetupCode(
            'var s = useStore("shared"); return { sid: s.$id };',
            {},
            livue
        );

        expect(result.sid).toBe('livue-bridge:shared');
    });

    it('allows store(name) without definition when store is already registered', () => {
        let livue = { $id: 'livue-existing', $name: 'counter' };

        executeSetupCode(
            'store("shared", { state: function () { return { count: 0 }; } }); return {};',
            {},
            livue
        );

        let result = executeSetupCode(
            'var s = store("shared"); return { sid: s.$id };',
            {},
            livue
        );

        expect(result.sid).toBe('livue-existing:shared');
    });
});
