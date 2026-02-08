/**
 * v-sort Directives
 *
 * Drag & Drop sorting using SortableJS.
 * Integrates SortableJS for drag-and-drop functionality.
 *
 * Usage:
 *   Server-side (calls PHP method):
 *   <ul v-sort="'reorder'">
 *       <li v-for="item in items" :key="item.id" v-sort-item="item.id">
 *           <span v-sort-handle>⋮⋮</span>
 *           {{ item.name }}
 *           <button v-sort-ignore>Delete</button>
 *       </li>
 *   </ul>
 *
 *   Client-side only (reorders Vue array locally):
 *   <div v-sort="items">
 *       <div v-for="(item, index) in items" :key="index" v-sort-item="index">...</div>
 *   </div>
 *
 *   Cross-list (Kanban):
 *   <ul v-sort="'reorderTodo'" v-sort-group="'tasks'">...</ul>
 *   <ul v-sort="'reorderDone'" v-sort-group="'tasks'">...</ul>
 *
 * Modifiers:
 *   .Xms          - Animation duration (default 150ms)
 *   .no-animation - Disable animation
 *   .horizontal   - Horizontal sorting direction
 */

import Sortable from 'sortablejs';

/**
 * WeakMap to store Sortable instances for cleanup.
 * @type {WeakMap<HTMLElement, Sortable>}
 */
const sortables = new WeakMap();

/**
 * WeakMap to store item IDs for fast lookup.
 * @type {WeakMap<HTMLElement, string|number>}
 */
const itemIds = new WeakMap();

/**
 * Get the livue helper from a vnode context.
 *
 * @param {object} vnode - Vue vnode
 * @returns {object|null} - livue helper or null
 */
function getLivueFromVnode(vnode) {
    let ctx = vnode.ctx;

    if (ctx && ctx.setupState && ctx.setupState.livue) {
        return ctx.setupState.livue;
    }

    if (ctx && ctx.parent && ctx.parent.setupState && ctx.parent.setupState.livue) {
        return ctx.parent.setupState.livue;
    }

    let parent = ctx ? ctx.parent : null;
    while (parent) {
        if (parent.setupState && parent.setupState.livue) {
            return parent.setupState.livue;
        }
        parent = parent.parent;
    }

    return null;
}

/**
 * Parse animation duration from modifiers.
 *
 * @param {object} modifiers - Vue binding modifiers
 * @returns {number} Duration in milliseconds
 */
function parseAnimation(modifiers) {
    if (modifiers['no-animation']) {
        return 0;
    }

    // Look for Xms modifier (e.g., 300ms)
    for (let key of Object.keys(modifiers)) {
        let match = key.match(/^(\d+)ms$/);
        if (match) {
            return parseInt(match[1], 10);
        }
    }

    return 150; // Default animation duration
}

/**
 * Parse binding value into method and extra params.
 *
 * @param {string|Array} value - Binding value
 * @returns {Array} [method, extraParams]
 */
function parseValue(value) {
    if (Array.isArray(value)) {
        return [value[0], value[1] || []];
    }
    return [value, []];
}

/**
 * WeakMap to store binding references for accessing current value in onEnd.
 * @type {WeakMap<HTMLElement, object>}
 */
const bindings = new WeakMap();

/**
 * v-sort: Main container directive.
 * Creates a SortableJS instance and calls PHP method on drop.
 */
export const sortDirective = {
    mounted(el, binding, vnode) {
        let livue = getLivueFromVnode(vnode);
        let modifiers = binding.modifiers || {};
        let value = binding.value;

        // Validate: warn if no livue context found
        if (!livue) {
            console.warn('[LiVue] v-sort: No LiVue component context found. The directive must be used inside a LiVue component.');
        }

        // Validate: value must be a string (method name) or array ([method, params])
        if (typeof value !== 'string' && !Array.isArray(value)) {
            console.warn('[LiVue] v-sort: Invalid value. Expected a string (method name) or array [method, params], got ' + typeof value + '.');
        }

        let animation = parseAnimation(modifiers);
        let direction = modifiers.horizontal ? 'horizontal' : 'vertical';

        // Store binding for access in onEnd (to get current value)
        bindings.set(el, binding);

        // Get group name if v-sort-group is set
        let groupName = el.dataset.livueSortGroup || null;

        // Build Sortable options
        let options = {
            animation: animation,
            direction: direction,
            ghostClass: 'livue-sort-ghost',
            chosenClass: 'livue-sort-chosen',
            dragClass: 'livue-sort-drag',

            // Draggable items selector (elements with data-livue-sort-item)
            draggable: '[data-livue-sort-item]',

            // Filter out ignored elements (prevents drag on buttons, etc.)
            filter: '[data-livue-sort-ignore]',
            preventOnFilter: false,

            // Callback when item is dropped
            onEnd: function (evt) {
                let newIndex = evt.newIndex;
                let oldIndex = evt.oldIndex;

                if (oldIndex === newIndex) {
                    return;
                }

                // Get current binding value (may have changed since mount)
                let currentBinding = bindings.get(el);
                let value = currentBinding ? currentBinding.value : null;

                // Determine mode based on current value type:
                // - string: server-side (call PHP method)
                // - array: client-side (reorder Vue array locally)
                let isServerMode = typeof value === 'string';
                let isLocalMode = Array.isArray(value);

                // Local mode: reorder Vue array directly
                if (isLocalMode) {
                    // Revert DOM changes made by SortableJS - let Vue handle rendering
                    let parent = evt.from;
                    if (oldIndex < newIndex) {
                        parent.insertBefore(evt.item, parent.children[oldIndex]);
                    } else {
                        parent.insertBefore(evt.item, parent.children[oldIndex + 1]);
                    }

                    // Now update the Vue array - Vue will re-render correctly
                    let item = value.splice(oldIndex, 1)[0];
                    value.splice(newIndex, 0, item);
                    return;
                }

                // Server mode: call PHP method
                if (isServerMode && livue) {
                    let method = value;
                    let extraParams = [];

                    let itemEl = evt.item;

                    // Get item ID from WeakMap or fallback to data attribute
                    let itemId = itemIds.get(itemEl);
                    if (itemId === undefined) {
                        itemId = itemEl.dataset.livueSortItem;
                    }

                    // Try to convert to number if it looks like one
                    if (typeof itemId === 'string' && /^\d+$/.test(itemId)) {
                        itemId = parseInt(itemId, 10);
                    }

                    let fromList = evt.from;
                    let toList = evt.to;

                    // Build params: [itemId, newPosition, ...extraParams]
                    let params = [itemId, newIndex].concat(extraParams);

                    // If moved between lists, use destination list's method and add fromList info
                    let isCrossList = fromList !== toList;
                    if (isCrossList) {
                        // Use the method from the DESTINATION list
                        let destMethod = toList.dataset.livueSortMethod;
                        if (destMethod) {
                            method = destMethod;
                        }

                        // Use data-livue-sort-id for list identification (separate from group name)
                        // Falls back to data-livue-sort-group if sort-id not set
                        let fromListId = fromList.dataset.livueSortId || fromList.dataset.livueSortGroup || null;
                        params.push(fromListId);
                    }

                    // Call the server - SortableJS has already updated the DOM optimistically
                    livue.call(method, params);
                }
            },
        };

        // Store method on element for cross-list access (server mode only)
        if (typeof binding.value === 'string') {
            el.dataset.livueSortMethod = binding.value;
        }

        // Check for handle elements
        let hasHandle = el.querySelector('[data-livue-sort-handle]');
        if (hasHandle) {
            options.handle = '[data-livue-sort-handle]';
        }

        // Group support for cross-list drag
        if (groupName) {
            options.group = groupName;
        }

        // Create Sortable instance
        let sortable = Sortable.create(el, options);
        sortables.set(el, sortable);
    },

    updated(el, binding) {
        // Update stored binding reference
        bindings.set(el, binding);

        // Re-check for handles after Vue updates (v-for changes)
        let sortable = sortables.get(el);
        if (sortable) {
            let hasHandle = el.querySelector('[data-livue-sort-handle]');
            if (hasHandle) {
                sortable.option('handle', '[data-livue-sort-handle]');
            }
        }
    },

    unmounted(el) {
        let sortable = sortables.get(el);

        if (sortable) {
            sortable.destroy();
            sortables.delete(el);
        }

        bindings.delete(el);
    },
};

/**
 * v-sort-item: Mark element as draggable item.
 * Value is the unique ID of the item.
 */
export const sortItemDirective = {
    mounted(el, binding) {
        let itemId = binding.value;

        // Store in WeakMap for fast lookup
        itemIds.set(el, itemId);

        // Also set data attribute for SortableJS selector
        el.setAttribute('data-livue-sort-item', itemId);
    },

    updated(el, binding) {
        let itemId = binding.value;
        itemIds.set(el, itemId);
        el.setAttribute('data-livue-sort-item', itemId);
    },

    unmounted(el) {
        itemIds.delete(el);
        // Defensive: element may have been removed by Vue re-render
        if (el && el.removeAttribute) {
            try {
                el.removeAttribute('data-livue-sort-item');
            } catch (e) {
                // Ignore errors if element is detached
            }
        }
    },
};

/**
 * v-sort-handle: Mark element as drag handle.
 * Dragging will only work when starting from this element.
 */
export const sortHandleDirective = {
    mounted(el) {
        el.setAttribute('data-livue-sort-handle', '');
    },

    unmounted(el) {
        // Defensive: element may have been removed by Vue re-render
        if (el && el.removeAttribute) {
            try {
                el.removeAttribute('data-livue-sort-handle');
            } catch (e) {
                // Ignore errors if element is detached
            }
        }
    },
};

/**
 * v-sort-ignore: Exclude element from drag operations.
 * Useful for buttons, inputs, and other interactive elements.
 */
export const sortIgnoreDirective = {
    mounted(el) {
        el.setAttribute('data-livue-sort-ignore', '');
    },

    unmounted(el) {
        // Defensive: element may have been removed by Vue re-render
        if (el && el.removeAttribute) {
            try {
                el.removeAttribute('data-livue-sort-ignore');
            } catch (e) {
                // Ignore errors if element is detached
            }
        }
    },
};

/**
 * v-sort-group: Set group name for cross-list dragging.
 * Lists with the same group name can exchange items.
 */
export const sortGroupDirective = {
    mounted(el, binding) {
        let groupName = binding.value;
        el.setAttribute('data-livue-sort-group', groupName);

        // If a Sortable already exists, update its group
        let sortable = sortables.get(el);
        if (sortable) {
            sortable.option('group', groupName);
        }
    },

    updated(el, binding) {
        let groupName = binding.value;
        el.setAttribute('data-livue-sort-group', groupName);

        let sortable = sortables.get(el);
        if (sortable) {
            sortable.option('group', groupName);
        }
    },

    unmounted(el) {
        // Defensive: element may have been removed by Vue re-render
        if (el && el.removeAttribute) {
            try {
                el.removeAttribute('data-livue-sort-group');
            } catch (e) {
                // Ignore errors if element is detached
            }
        }
    },
};

// Default export for backward compatibility
export default sortDirective;
