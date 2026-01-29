/**
 * v-transition Directive
 *
 * Enables smooth animations using the browser's View Transitions API.
 * Uses the browser's View Transitions API for smooth updates.
 *
 * Usage:
 *   <div v-transition>...</div>                   <!-- Auto-generated name -->
 *   <div v-transition="'sidebar'">...</div>       <!-- Custom transition name -->
 *   <div v-transition.skip>...</div>              <!-- Skip transition for this element -->
 *
 * The directive sets CSS view-transition-name on the element.
 * The LiVue runtime automatically uses startViewTransition() when updating
 * components that contain elements with v-transition.
 *
 * CSS customization:
 *   ::view-transition-old(sidebar) { animation: fade-out 0.2s; }
 *   ::view-transition-new(sidebar) { animation: fade-in 0.2s; }
 *
 * Browser support:
 *   Chrome 111+, Edge 111+, Safari 18+
 *   Firefox 144+ (basic support)
 *   Falls back gracefully in unsupported browsers.
 */

/**
 * Counter for auto-generated transition names.
 */
let _transitionCounter = 0;

/**
 * Check if View Transitions API is supported.
 *
 * @returns {boolean}
 */
export function isViewTransitionsSupported() {
    return typeof document !== 'undefined' && 'startViewTransition' in document;
}

/**
 * WeakMap to store transition state.
 * @type {WeakMap<HTMLElement, object>}
 */
const transitionState = new WeakMap();

/**
 * Global flag to track if any component has v-transition elements.
 * Used by the component update system to decide whether to use startViewTransition.
 */
let _hasTransitions = false;

/**
 * Check if there are any elements with v-transition in the document.
 *
 * @returns {boolean}
 */
export function hasActiveTransitions() {
    return _hasTransitions;
}

/**
 * Set the global transitions flag.
 *
 * @param {boolean} value
 */
function updateTransitionsFlag(value) {
    _hasTransitions = value;
}

/**
 * Recount active transitions in the document.
 */
function recountTransitions() {
    let count = document.querySelectorAll('[data-livue-transition]').length;
    updateTransitionsFlag(count > 0);
}

export default {
    created(el, binding) {
        let modifiers = binding.modifiers || {};

        // Skip modifier - don't apply transition to this element
        if (modifiers.skip) {
            el.setAttribute('data-livue-transition-skip', '');
            return;
        }

        // Determine transition name
        let transitionName = binding.value;

        if (!transitionName) {
            // Auto-generate a unique name
            _transitionCounter++;
            transitionName = 'livue-transition-' + _transitionCounter;
        }

        // Store state
        transitionState.set(el, {
            name: transitionName,
        });

        // Mark element for transition detection
        el.setAttribute('data-livue-transition', transitionName);

        // Apply CSS view-transition-name
        if (isViewTransitionsSupported()) {
            el.style.viewTransitionName = transitionName;
        }
    },

    mounted(el, binding) {
        // Update global flag
        recountTransitions();
    },

    updated(el, binding) {
        let state = transitionState.get(el);

        // Check if value changed
        if (binding.value !== binding.oldValue && binding.value) {
            let newName = binding.value;

            if (state) {
                state.name = newName;
            }

            el.setAttribute('data-livue-transition', newName);

            if (isViewTransitionsSupported()) {
                el.style.viewTransitionName = newName;
            }
        }
    },

    unmounted(el) {
        transitionState.delete(el);
        el.removeAttribute('data-livue-transition');

        // Update global flag
        recountTransitions();
    },
};

/**
 * Execute a callback with View Transitions if supported.
 * Falls back to direct execution if not supported.
 * The View Transitions API automatically handles only elements with view-transition-name set.
 *
 * @param {Function} callback - The DOM mutation callback
 * @param {object} [options] - Options
 * @param {string} [options.type] - Transition type (e.g., 'forward', 'backward')
 * @returns {Promise<void>}
 */
export function withViewTransition(callback, options = {}) {
    // Check for reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia) {
        let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (reducedMotion.matches) {
            callback();
            return Promise.resolve();
        }
    }

    // Set transition type class if provided
    if (options.type) {
        document.documentElement.classList.add('livue-transition-' + options.type);
    }

    // Use View Transitions API
    let transition = document.startViewTransition(callback);

    return transition.finished.then(function () {
        // Clean up type class
        if (options.type) {
            document.documentElement.classList.remove('livue-transition-' + options.type);
        }
    }).catch(function () {
        // Clean up on error too
        if (options.type) {
            document.documentElement.classList.remove('livue-transition-' + options.type);
        }
    });
}
