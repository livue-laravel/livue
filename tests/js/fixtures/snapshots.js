/**
 * Test fixture data for LiVue snapshots.
 */

/**
 * Create a minimal valid snapshot.
 */
export function createSnapshot(options = {}) {
    return {
        state: options.state || {},
        memo: {
            name: options.name || 'test-component',
            checksum: options.checksum || 'test-checksum-' + Math.random().toString(36).substr(2, 9),
            ...options.memo,
        },
    };
}

/**
 * Create a snapshot with state.
 */
export function createCounterSnapshot(count = 0) {
    return createSnapshot({
        name: 'counter',
        state: { count },
    });
}

/**
 * Create a snapshot with computed properties.
 */
export function createComputedSnapshot(state, computed = []) {
    return createSnapshot({
        state,
        memo: {
            computed,
        },
    });
}

/**
 * Create a snapshot with validation errors.
 */
export function createErrorSnapshot(state, errors = {}) {
    return createSnapshot({
        state,
        memo: {
            errors,
        },
    });
}

/**
 * Create a snapshot with listeners.
 */
export function createListenerSnapshot(state, listeners = {}) {
    return createSnapshot({
        state,
        memo: {
            listeners,
        },
    });
}

/**
 * Create a snapshot JSON string.
 */
export function stringifySnapshot(options = {}) {
    return JSON.stringify(createSnapshot(options));
}

/**
 * Common snapshot fixtures.
 */
export const fixtures = {
    empty: createSnapshot(),

    counter: createCounterSnapshot(0),

    form: createSnapshot({
        name: 'contact-form',
        state: {
            name: '',
            email: '',
            message: '',
        },
    }),

    withErrors: createErrorSnapshot(
        { email: 'invalid' },
        { email: ['The email must be a valid email address.'] }
    ),

    withListeners: createListenerSnapshot(
        {},
        { 'user-created': 'handleUserCreated' }
    ),
};
