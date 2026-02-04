/**
 * Tests for v-sort directives.
 *
 * The v-sort directives enable drag & drop sorting using SortableJS.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock SortableJS
const mockSortableInstance = {
    option: vi.fn(),
    destroy: vi.fn(),
};

vi.mock('sortablejs', () => ({
    default: {
        create: vi.fn(() => mockSortableInstance),
    },
}));

let sortDirective;
let sortItemDirective;
let sortHandleDirective;
let sortIgnoreDirective;
let sortGroupDirective;
let mockLivue;
let mockVnode;

beforeEach(async () => {
    vi.resetModules();
    vi.clearAllMocks();

    const module = await import('@/directives/sort.js');
    sortDirective = module.sortDirective;
    sortItemDirective = module.sortItemDirective;
    sortHandleDirective = module.sortHandleDirective;
    sortIgnoreDirective = module.sortIgnoreDirective;
    sortGroupDirective = module.sortGroupDirective;

    mockLivue = { call: vi.fn() };
    mockVnode = {
        ctx: { setupState: { livue: mockLivue } },
    };
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('v-sort Directive', () => {
    describe('mounted()', () => {
        it('should create Sortable instance', async () => {
            const Sortable = (await import('sortablejs')).default;
            const el = document.createElement('ul');

            sortDirective.mounted(el, { value: 'reorder', modifiers: {} }, mockVnode);

            expect(Sortable.create).toHaveBeenCalledWith(el, expect.objectContaining({
                animation: 150,
                direction: 'vertical',
                draggable: '[data-livue-sort-item]',
            }));
        });

        it('should parse animation from modifiers', async () => {
            const Sortable = (await import('sortablejs')).default;
            const el = document.createElement('ul');

            sortDirective.mounted(el, { value: 'reorder', modifiers: { '300ms': true } }, mockVnode);

            expect(Sortable.create).toHaveBeenCalledWith(el, expect.objectContaining({
                animation: 300,
            }));
        });

        it('should disable animation with .no-animation', async () => {
            const Sortable = (await import('sortablejs')).default;
            const el = document.createElement('ul');

            sortDirective.mounted(el, { value: 'reorder', modifiers: { 'no-animation': true } }, mockVnode);

            expect(Sortable.create).toHaveBeenCalledWith(el, expect.objectContaining({
                animation: 0,
            }));
        });

        it('should use horizontal direction', async () => {
            const Sortable = (await import('sortablejs')).default;
            const el = document.createElement('ul');

            sortDirective.mounted(el, { value: 'reorder', modifiers: { horizontal: true } }, mockVnode);

            expect(Sortable.create).toHaveBeenCalledWith(el, expect.objectContaining({
                direction: 'horizontal',
            }));
        });

        it('should detect handle elements', async () => {
            const Sortable = (await import('sortablejs')).default;
            const el = document.createElement('ul');
            const handle = document.createElement('span');
            handle.setAttribute('data-livue-sort-handle', '');
            el.appendChild(handle);

            sortDirective.mounted(el, { value: 'reorder', modifiers: {} }, mockVnode);

            expect(Sortable.create).toHaveBeenCalledWith(el, expect.objectContaining({
                handle: '[data-livue-sort-handle]',
            }));
        });

        it('should use group from data attribute', async () => {
            const Sortable = (await import('sortablejs')).default;
            const el = document.createElement('ul');
            el.dataset.livueSortGroup = 'tasks';

            sortDirective.mounted(el, { value: 'reorder', modifiers: {} }, mockVnode);

            expect(Sortable.create).toHaveBeenCalledWith(el, expect.objectContaining({
                group: 'tasks',
            }));
        });

        it('should store method on element', () => {
            const el = document.createElement('ul');

            sortDirective.mounted(el, { value: 'reorder', modifiers: {} }, mockVnode);

            expect(el.dataset.livueSortMethod).toBe('reorder');
        });

        it('should accept array value with extra params', async () => {
            const Sortable = (await import('sortablejs')).default;
            const el = document.createElement('ul');

            sortDirective.mounted(el, { value: ['reorder', ['list-id']], modifiers: {} }, mockVnode);

            expect(Sortable.create).toHaveBeenCalled();
        });

        it('should warn without livue context', () => {
            const el = document.createElement('ul');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            sortDirective.mounted(el, { value: 'reorder', modifiers: {} }, { ctx: {} });

            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });

        it('should warn for invalid method value', () => {
            const el = document.createElement('ul');
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            sortDirective.mounted(el, { value: 123, modifiers: {} }, mockVnode);

            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });
    });

    describe('updated()', () => {
        it('should update handle option after Vue updates', async () => {
            const el = document.createElement('ul');

            sortDirective.mounted(el, { value: 'reorder', modifiers: {} }, mockVnode);

            // Add handle after mount
            const handle = document.createElement('span');
            handle.setAttribute('data-livue-sort-handle', '');
            el.appendChild(handle);

            sortDirective.updated(el);

            expect(mockSortableInstance.option).toHaveBeenCalledWith('handle', '[data-livue-sort-handle]');
        });
    });

    describe('unmounted()', () => {
        it('should destroy Sortable instance', () => {
            const el = document.createElement('ul');

            sortDirective.mounted(el, { value: 'reorder', modifiers: {} }, mockVnode);
            sortDirective.unmounted(el);

            expect(mockSortableInstance.destroy).toHaveBeenCalled();
        });
    });
});

describe('v-sort-item Directive', () => {
    describe('mounted()', () => {
        it('should set data attribute with item ID', () => {
            const el = document.createElement('li');

            sortItemDirective.mounted(el, { value: 42 });

            expect(el.getAttribute('data-livue-sort-item')).toBe('42');
        });

        it('should handle string IDs', () => {
            const el = document.createElement('li');

            sortItemDirective.mounted(el, { value: 'item-abc' });

            expect(el.getAttribute('data-livue-sort-item')).toBe('item-abc');
        });
    });

    describe('updated()', () => {
        it('should update item ID', () => {
            const el = document.createElement('li');

            sortItemDirective.mounted(el, { value: 1 });
            sortItemDirective.updated(el, { value: 2 });

            expect(el.getAttribute('data-livue-sort-item')).toBe('2');
        });
    });

    describe('unmounted()', () => {
        it('should remove data attribute', () => {
            const el = document.createElement('li');

            sortItemDirective.mounted(el, { value: 1 });
            sortItemDirective.unmounted(el);

            expect(el.hasAttribute('data-livue-sort-item')).toBe(false);
        });
    });
});

describe('v-sort-handle Directive', () => {
    describe('mounted()', () => {
        it('should set handle attribute', () => {
            const el = document.createElement('span');

            sortHandleDirective.mounted(el);

            expect(el.hasAttribute('data-livue-sort-handle')).toBe(true);
        });
    });

    describe('unmounted()', () => {
        it('should remove handle attribute', () => {
            const el = document.createElement('span');

            sortHandleDirective.mounted(el);
            sortHandleDirective.unmounted(el);

            expect(el.hasAttribute('data-livue-sort-handle')).toBe(false);
        });
    });
});

describe('v-sort-ignore Directive', () => {
    describe('mounted()', () => {
        it('should set ignore attribute', () => {
            const el = document.createElement('button');

            sortIgnoreDirective.mounted(el);

            expect(el.hasAttribute('data-livue-sort-ignore')).toBe(true);
        });
    });

    describe('unmounted()', () => {
        it('should remove ignore attribute', () => {
            const el = document.createElement('button');

            sortIgnoreDirective.mounted(el);
            sortIgnoreDirective.unmounted(el);

            expect(el.hasAttribute('data-livue-sort-ignore')).toBe(false);
        });
    });
});

describe('v-sort-group Directive', () => {
    describe('mounted()', () => {
        it('should set group attribute', () => {
            const el = document.createElement('ul');

            sortGroupDirective.mounted(el, { value: 'tasks' });

            expect(el.getAttribute('data-livue-sort-group')).toBe('tasks');
        });

        it('should update existing Sortable group', () => {
            const el = document.createElement('ul');

            sortDirective.mounted(el, { value: 'reorder', modifiers: {} }, mockVnode);
            sortGroupDirective.mounted(el, { value: 'tasks' });

            expect(mockSortableInstance.option).toHaveBeenCalledWith('group', 'tasks');
        });
    });

    describe('updated()', () => {
        it('should update group attribute', () => {
            const el = document.createElement('ul');

            sortGroupDirective.mounted(el, { value: 'tasks' });
            sortGroupDirective.updated(el, { value: 'projects' });

            expect(el.getAttribute('data-livue-sort-group')).toBe('projects');
        });
    });

    describe('unmounted()', () => {
        it('should remove group attribute', () => {
            const el = document.createElement('ul');

            sortGroupDirective.mounted(el, { value: 'tasks' });
            sortGroupDirective.unmounted(el);

            expect(el.hasAttribute('data-livue-sort-group')).toBe(false);
        });
    });
});
