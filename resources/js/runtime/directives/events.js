/**
 * DOM Event Directives for LiVue.
 *
 * All event directives generated via createEventDirective factory.
 * Each provides the same syntax as v-click for its respective DOM event.
 *
 * Usage examples:
 *   <div v-mouseenter:highlight>Hover me</div>
 *   <input v-keydown:search.enter.debounce.300ms>
 *   <div v-contextmenu:showMenu.prevent="item.id">Right click</div>
 *   <div v-touchstart:swipe.passive>Touch area</div>
 *   <input v-change:sync="field">
 *   <div v-dragstart:startDrag="item.id">Draggable</div>
 *   <div v-copy:onCopy>Copy me</div>
 */

import { createEventDirective } from './event-factory.js';

// --- Mouse Events ---
export const dblclickDirective = createEventDirective('dblclick');
export const mousedownDirective = createEventDirective('mousedown');
export const mouseupDirective = createEventDirective('mouseup');
export const mouseenterDirective = createEventDirective('mouseenter');
export const mouseleaveDirective = createEventDirective('mouseleave');
export const mouseoverDirective = createEventDirective('mouseover');
export const mouseoutDirective = createEventDirective('mouseout');
export const mousemoveDirective = createEventDirective('mousemove');
export const contextmenuDirective = createEventDirective('contextmenu');

// --- Keyboard Events ---
export const keydownDirective = createEventDirective('keydown', { isKeyboardEvent: true });
export const keyupDirective = createEventDirective('keyup', { isKeyboardEvent: true });
export const keypressDirective = createEventDirective('keypress', { isKeyboardEvent: true });

// --- Focus Events ---
export const focusDirective = createEventDirective('focus');
export const focusinDirective = createEventDirective('focusin');
export const focusoutDirective = createEventDirective('focusout');

// --- Touch Events ---
export const touchstartDirective = createEventDirective('touchstart');
export const touchendDirective = createEventDirective('touchend');
export const touchmoveDirective = createEventDirective('touchmove');
export const touchcancelDirective = createEventDirective('touchcancel');

// --- Form Events ---
export const changeDirective = createEventDirective('change');
export const inputDirective = createEventDirective('input');
export const resetDirective = createEventDirective('reset');

// --- Drag Events ---
export const dragstartDirective = createEventDirective('dragstart');
export const dragendDirective = createEventDirective('dragend');
export const dragenterDirective = createEventDirective('dragenter');
export const dragleaveDirective = createEventDirective('dragleave');
export const dragoverDirective = createEventDirective('dragover');
export const dropDirective = createEventDirective('drop');

// --- Clipboard Events ---
export const copyDirective = createEventDirective('copy');
export const cutDirective = createEventDirective('cut');
export const pasteDirective = createEventDirective('paste');

// --- Other Events ---
export const wheelDirective = createEventDirective('wheel');
export const resizeDirective = createEventDirective('resize');
