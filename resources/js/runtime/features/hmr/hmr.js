/**
 * LiVue HMR (Hot Module Replacement) Module.
 *
 * Handles hot reloading of LiVue components when Blade templates
 * or PHP classes change during development.
 *
 * Uses Vite's HMR API to receive file change notifications from the
 * custom livue-hmr Vite plugin, then reloads components while preserving
 * their reactive state.
 */

import * as indicator from './hmr-indicator.js';

/**
 * @type {LiVueRuntime|null}
 */
let runtime = null;

/**
 * @type {boolean}
 */
let enabled = true;

/**
 * @type {boolean}
 */
let preserveState = true;

/**
 * @type {boolean}
 */
let showIndicator = true;

/**
 * @type {Array<Function>}
 */
let updateCallbacks = [];

/**
 * @type {boolean}
 */
let isSetup = false;

/**
 * Setup HMR handling.
 *
 * @param {LiVueRuntime} runtimeInstance - The LiVue runtime instance
 */
export function setup(runtimeInstance) {
    if (isSetup) {
        return;
    }

    runtime = runtimeInstance;

    // Only setup if HMR is available (Vite dev server)
    if (!import.meta.hot) {
        return;
    }

    isSetup = true;

    // Listen for custom HMR events from the Vite plugin
    import.meta.hot.on('livue:hmr', handleHmrUpdate);

    // Also accept updates to this module
    import.meta.hot.accept();
}

/**
 * Handle an HMR update event.
 *
 * @param {object} data - Event data from Vite plugin
 * @param {string} data.file - Full file path
 * @param {string} data.fileName - File name only
 * @param {'template'|'class'} data.type - Type of file
 * @param {boolean} [data.isNew] - Whether this is a new file
 * @param {number} data.timestamp - Update timestamp
 */
async function handleHmrUpdate(data) {
    if (!enabled) {
        return;
    }

    console.log('[LiVue HMR] ' + data.type + ' changed: ' + data.fileName);

    // Show updating indicator
    if (showIndicator) {
        indicator.show('updating', data.fileName);
    }

    // Notify callbacks
    updateCallbacks.forEach(function (callback) {
        try {
            callback(data);
        } catch (e) {
            console.error('[LiVue HMR] Callback error:', e);
        }
    });

    try {
        // Save component states before reboot
        const savedStates = preserveState ? saveComponentStates() : null;

        // Fetch fresh HTML from the server
        const response = await fetch(window.location.href, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-LiVue-HMR': '1',
            },
        });

        if (!response.ok) {
            throw new Error('Server returned ' + response.status);
        }

        const html = await response.text();

        // Parse the HTML to extract the body content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Find all LiVue component elements in the new HTML
        const newComponents = doc.querySelectorAll('[data-livue-id]');

        if (newComponents.length === 0) {
            // No components found in new HTML, might be an error page
            console.warn('[LiVue HMR] No components found in response, skipping update');
            if (showIndicator) {
                indicator.show('error');
            }
            return;
        }

        // Update each component's template
        newComponents.forEach(function (newEl) {
            const id = newEl.dataset.livueId;
            const existingEl = document.querySelector('[data-livue-id="' + id + '"]');

            if (existingEl) {
                // Update the snapshot data
                if (newEl.dataset.livueSnapshot) {
                    existingEl.dataset.livueSnapshot = newEl.dataset.livueSnapshot;
                }

                // Update the inner HTML (template content)
                existingEl.innerHTML = newEl.innerHTML;
            }
        });

        // Reboot the runtime to re-mount components with new templates
        runtime.reboot();

        // Restore states after reboot
        if (savedStates) {
            // Wait for Vue to mount
            await nextTick();
            restoreComponentStates(savedStates);
        }

        // Show success indicator
        if (showIndicator) {
            indicator.show('done');
        }

    } catch (error) {
        console.error('[LiVue HMR] Update failed:', error);

        if (showIndicator) {
            indicator.show('error');
        }
    }
}

/**
 * Save the state of all components.
 *
 * @returns {Map<string, { name: string, state: object }>}
 */
function saveComponentStates() {
    const states = new Map();

    if (!runtime) {
        return states;
    }

    // Get all root/island components
    const components = runtime.all();

    components.forEach(function (component) {
        // Save root component state
        saveComponentState(component.componentId, component.name, component.state, states);

        // Save child component states
        if (component._childRegistry) {
            for (const childId in component._childRegistry) {
                const child = component._childRegistry[childId];
                saveComponentState(childId, child.name, child.state, states);
            }
        }
    });

    return states;
}

/**
 * Save a single component's state.
 *
 * @param {string} id - Component ID
 * @param {string} name - Component name
 * @param {object} state - Reactive state object
 * @param {Map} states - Map to store states in
 */
function saveComponentState(id, name, state, states) {
    const savedState = {};

    for (const key in state) {
        const value = state[key];

        // Skip functions and symbols
        if (typeof value === 'function' || typeof value === 'symbol') {
            continue;
        }

        // Deep clone to avoid reactivity issues
        try {
            savedState[key] = JSON.parse(JSON.stringify(value));
        } catch (e) {
            // Skip non-serializable values
            console.warn('[LiVue HMR] Could not save state for ' + name + '.' + key);
        }
    }

    states.set(id, { name: name, state: savedState });
}

/**
 * Restore component states after reboot.
 *
 * @param {Map<string, { name: string, state: object }>} savedStates
 */
function restoreComponentStates(savedStates) {
    if (!runtime) {
        return;
    }

    savedStates.forEach(function (data, oldId) {
        // Try to find component by name (ID may have changed)
        const matches = runtime.getByName(data.name);

        if (matches.length > 0) {
            const component = matches[0];

            // Restore state
            for (const key in data.state) {
                if (key in component.state) {
                    component.state[key] = data.state[key];
                }
            }
        }
    });
}

/**
 * Wait for next tick (Vue's microtask queue to flush).
 *
 * @returns {Promise<void>}
 */
function nextTick() {
    return new Promise(function (resolve) {
        setTimeout(resolve, 0);
    });
}

/**
 * Check if HMR is available (Vite dev server running).
 *
 * @returns {boolean}
 */
export function isAvailable() {
    return typeof import.meta !== 'undefined' && !!import.meta.hot;
}

/**
 * Enable HMR updates.
 */
export function enable() {
    enabled = true;
}

/**
 * Disable HMR updates.
 */
export function disable() {
    enabled = false;
}

/**
 * Check if HMR is enabled.
 *
 * @returns {boolean}
 */
export function isEnabled() {
    return enabled;
}

/**
 * Configure HMR behavior.
 *
 * @param {object} options
 * @param {boolean} [options.indicator] - Show visual indicator
 * @param {boolean} [options.preserveState] - Preserve component state on reload
 */
export function configure(options) {
    if (options.indicator !== undefined) {
        showIndicator = options.indicator;
    }
    if (options.preserveState !== undefined) {
        preserveState = options.preserveState;
    }
}

/**
 * Register a callback to be called on HMR updates.
 *
 * @param {Function} callback - Function called with update data
 * @returns {Function} Unsubscribe function
 */
export function onUpdate(callback) {
    updateCallbacks.push(callback);

    return function () {
        const index = updateCallbacks.indexOf(callback);
        if (index !== -1) {
            updateCallbacks.splice(index, 1);
        }
    };
}

/**
 * Manually trigger an HMR-like reload.
 * Useful for testing or programmatic refreshes.
 */
export async function trigger() {
    if (!runtime) {
        return;
    }

    await handleHmrUpdate({
        file: 'manual-trigger',
        fileName: 'manual',
        type: 'template',
        timestamp: Date.now(),
    });
}
