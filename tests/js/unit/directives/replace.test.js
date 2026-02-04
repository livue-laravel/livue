/**
 * Tests for v-replace directive.
 *
 * The v-replace directive forces complete element replacement instead
 * of Vue's default DOM reuse.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

let replaceDirective;
let replaceVersions;
let incrementReplaceVersion;
let getReplaceVersion;
let processReplaceElements;

beforeEach(async () => {
    vi.resetModules();

    const module = await import('@/directives/replace.js');
    replaceDirective = module.default;
    replaceVersions = module.replaceVersions;
    incrementReplaceVersion = module.incrementReplaceVersion;
    getReplaceVersion = module.getReplaceVersion;
    processReplaceElements = module.processReplaceElements;
});

afterEach(() => {
    vi.clearAllMocks();
    replaceVersions.clear();
});

describe('v-replace Directive', () => {
    describe('created()', () => {
        it('should generate unique replace ID', () => {
            const el1 = document.createElement('div');
            const el2 = document.createElement('div');

            replaceDirective.created(el1, { modifiers: {} });
            replaceDirective.created(el2, { modifiers: {} });

            expect(el1.getAttribute('data-livue-replace-id')).not.toBe(
                el2.getAttribute('data-livue-replace-id')
            );
        });

        it('should set data attribute', () => {
            const el = document.createElement('div');

            replaceDirective.created(el, { modifiers: {} });

            expect(el.hasAttribute('data-livue-replace-id')).toBe(true);
            expect(el.getAttribute('data-livue-replace-id')).toMatch(/^livue-replace-\d+$/);
        });

        it('should handle .self modifier', () => {
            const el = document.createElement('div');

            replaceDirective.created(el, { modifiers: { self: true } });

            expect(el.hasAttribute('data-livue-replace-self')).toBe(true);
        });

        it('should initialize version in global map', () => {
            const el = document.createElement('div');

            replaceDirective.created(el, { modifiers: {} });

            const replaceId = el.getAttribute('data-livue-replace-id');
            expect(replaceVersions.get(replaceId)).toBe(0);
        });
    });

    describe('mounted()', () => {
        it('should ensure markers are present', () => {
            const el = document.createElement('div');

            replaceDirective.created(el, { modifiers: {} });
            const id = el.getAttribute('data-livue-replace-id');
            el.removeAttribute('data-livue-replace-id');

            replaceDirective.mounted(el, { modifiers: {} });

            expect(el.getAttribute('data-livue-replace-id')).toBe(id);
        });
    });

    describe('beforeUpdate()', () => {
        it('should increment version before update', () => {
            const el = document.createElement('div');

            replaceDirective.created(el, { modifiers: {} });
            const replaceId = el.getAttribute('data-livue-replace-id');

            expect(replaceVersions.get(replaceId)).toBe(0);

            replaceDirective.beforeUpdate(el, { modifiers: {} });

            expect(replaceVersions.get(replaceId)).toBe(1);
        });

        it('should set version attribute on element', () => {
            const el = document.createElement('div');

            replaceDirective.created(el, { modifiers: {} });
            replaceDirective.beforeUpdate(el, { modifiers: {} });

            expect(el.getAttribute('data-livue-replace-version')).toBe('1');
        });
    });

    describe('unmounted()', () => {
        it('should cleanup version from global map', () => {
            const el = document.createElement('div');

            replaceDirective.created(el, { modifiers: {} });
            const replaceId = el.getAttribute('data-livue-replace-id');

            replaceDirective.unmounted(el);

            expect(replaceVersions.has(replaceId)).toBe(false);
        });
    });
});

describe('incrementReplaceVersion()', () => {
    it('should increment and return new version', () => {
        replaceVersions.set('test-id', 5);

        const newVersion = incrementReplaceVersion('test-id');

        expect(newVersion).toBe(6);
        expect(replaceVersions.get('test-id')).toBe(6);
    });

    it('should start at 1 for new IDs', () => {
        const newVersion = incrementReplaceVersion('new-id');

        expect(newVersion).toBe(1);
    });
});

describe('getReplaceVersion()', () => {
    it('should return current version', () => {
        replaceVersions.set('test-id', 3);

        expect(getReplaceVersion('test-id')).toBe(3);
    });

    it('should return 0 for unknown IDs', () => {
        expect(getReplaceVersion('unknown-id')).toBe(0);
    });
});

describe('processReplaceElements()', () => {
    it('should inject :key binding into template', () => {
        replaceVersions.set('livue-replace-1', 2);

        const template = '<div data-livue-replace-id="livue-replace-1">Content</div>';
        const result = processReplaceElements(template);

        // The function injects :key="'livue-replace-1-2'" (double quotes containing single quotes)
        expect(result).toContain('livue-replace-1-2');
        expect(result).toContain(':key=');
    });

    it('should not override existing :key', () => {
        const template = '<div :key="item.id" data-livue-replace-id="livue-replace-1">Content</div>';
        const result = processReplaceElements(template);

        expect(result).toContain(':key="item.id"');
    });

    it('should handle multiple elements', () => {
        replaceVersions.set('livue-replace-1', 1);
        replaceVersions.set('livue-replace-2', 2);

        const template = `
            <div data-livue-replace-id="livue-replace-1">First</div>
            <div data-livue-replace-id="livue-replace-2">Second</div>
        `;
        const result = processReplaceElements(template);

        expect(result).toContain('livue-replace-1-1');
        expect(result).toContain('livue-replace-2-2');
    });

    it('should preserve other attributes', () => {
        replaceVersions.set('livue-replace-1', 0);

        const template = '<div class="widget" data-livue-replace-id="livue-replace-1" id="my-widget">Content</div>';
        const result = processReplaceElements(template);

        expect(result).toContain('class="widget"');
        expect(result).toContain('id="my-widget"');
    });
});

describe('use cases', () => {
    it('should handle third-party widget', () => {
        const el = document.createElement('div');
        el.innerHTML = '<third-party-widget></third-party-widget>';

        replaceDirective.created(el, { modifiers: {} });

        expect(el.hasAttribute('data-livue-replace-id')).toBe(true);
    });

    it('should force fresh DOM on each render', () => {
        const el = document.createElement('div');

        replaceDirective.created(el, { modifiers: {} });
        const v1 = replaceVersions.get(el.getAttribute('data-livue-replace-id'));

        replaceDirective.beforeUpdate(el, { modifiers: {} });
        const v2 = replaceVersions.get(el.getAttribute('data-livue-replace-id'));

        replaceDirective.beforeUpdate(el, { modifiers: {} });
        const v3 = replaceVersions.get(el.getAttribute('data-livue-replace-id'));

        expect(v2).toBe(v1 + 1);
        expect(v3).toBe(v2 + 1);
    });
});
