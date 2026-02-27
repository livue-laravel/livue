/**
 * v-click directive for LiVue.
 *
 * Provides a cleaner syntax for calling server methods on click events.
 * Cleaner alternative to @click="livue.call('method')".
 *
 * Usage:
 *   <button v-click:increment>+1</button>
 *   <button v-click:save="item.id">Save</button>
 *   <button v-click:update="[item.id, 'active']">Update</button>
 *
 * With modifiers:
 *   <button v-click:submit.prevent>Submit</button>
 *   <a v-click:navigate.prevent.stop="'/dashboard'">Go</a>
 *   <button v-click:save.debounce.500ms>Save</button>
 *   <button v-click:track.throttle.1000ms>Track</button>
 *   <button v-click:delete.confirm="item.id">Delete</button>
 *   <div v-click:close.outside>Modal</div>
 *   <button v-click:init.once>Initialize</button>
 *   <div v-click:handleOverlay.self>Overlay</div>
 *
 * Alternative syntax (method name as value):
 *   <button v-click="'increment'">+1</button>
 */

import { createEventDirective } from './event-factory.js';

export default createEventDirective('click', { supportsOutside: true });
