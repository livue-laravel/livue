/**
 * Internal Registry for LiVue.
 *
 * This module stores built-in directives that are registered during boot()
 * and applied to every Vue app instance.
 *
 * User-facing registration APIs have been replaced by LiVue.setup().
 *
 * No imports from other LiVue modules — this is a leaf dependency.
 */

/**
 * Built-in directives storage.
 * @type {Array<{name: string, directive: object}>}
 */
var _builtInDirectives = [];

/**
 * Register a built-in directive.
 * Used internally by directives/index.js during boot.
 *
 * @param {string} name - Directive name (without 'v-' prefix)
 * @param {object|Function} directive - Vue directive definition
 * @param {null} _filters - Ignored, kept for backward compatibility
 */
export function addDirective(name, directive, _filters) {
    _builtInDirectives.push({
        name: name,
        directive: directive,
    });
}

/**
 * Get all built-in directives to register on a Vue app.
 *
 * @returns {Array<{name: string, directive: object}>}
 */
export function getBuiltInDirectives() {
    return _builtInDirectives;
}

/**
 * Get all registrations (for DevTools).
 * Returns built-in directives.
 *
 * @returns {object} { plugins: [], stores: [], components: [], directives: [...] }
 */
export function getAllRegistrations() {
    return {
        plugins: [],
        stores: [],
        components: [],
        directives: _builtInDirectives.map(function (d) {
            return { name: d.name, filters: null };
        }),
    };
}
