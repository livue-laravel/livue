/**
 * v-click directive for LiVue.
 *
 * Provides a cleaner syntax for calling server methods on click events.
 * Cleaner alternative to @click="livue.call('method')".
 *
 * Usage:
 *   <button v-click="increment">+1</button>
 *   <button v-click="['save', item.id]">Save</button>
 *   <button v-click="['update', item.id, 'active']">Update</button>
 *
 * With modifiers:
 *   <button v-click.prevent="submit">Submit</button>
 *   <a v-click.prevent.stop="navigate">Go</a>
 *   <button v-click.debounce.500ms="save">Save</button>
 *   <button v-click.throttle.1000ms="track">Track</button>
 *   <button v-click.confirm="['delete', item.id]">Delete</button>
 *   <div v-click.outside="close">Modal</div>
 *   <button v-click.once="init">Initialize</button>
 *   <div v-click.self="handleOverlay">Overlay</div>
 */

import { createEventDirective } from './event-factory.js';

export default createEventDirective('click', {
    supportsOutside: true,
    allowArg: false,
});
