/**
 * Shared helper to retrieve the livue instance from a Vue vnode context.
 *
 * Removes duplication across directive files by providing a single
 * getLivueFromVnode function that traverses the component parent chain.
 */

/**
 * Get the livue helper from a vnode context.
 * Traverses up the parent chain if needed.
 *
 * @param {object} vnode - Vue vnode
 * @returns {object|null} - livue helper or null
 */
export function getLivueFromVnode(vnode) {
    let ctx = vnode.ctx;

    // Try direct setupState first
    if (ctx && ctx.setupState && ctx.setupState.livue) {
        return ctx.setupState.livue;
    }

    // Try parent's setupState (for nested elements)
    if (ctx && ctx.parent && ctx.parent.setupState && ctx.parent.setupState.livue) {
        return ctx.parent.setupState.livue;
    }

    // Walk up the parent chain
    let parent = ctx ? ctx.parent : null;
    while (parent) {
        if (parent.setupState && parent.setupState.livue) {
            return parent.setupState.livue;
        }
        parent = parent.parent;
    }

    return null;
}
