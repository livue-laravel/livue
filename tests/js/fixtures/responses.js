/**
 * Test fixture data for mock server responses.
 */

import { createSnapshot } from './snapshots.js';

/**
 * Create a successful component update response.
 */
export function createUpdateResponse(options = {}) {
    return {
        snapshot: JSON.stringify(createSnapshot(options)),
        html: options.html || '<div>Updated content</div>',
        events: options.events || [],
        ...options.extra,
    };
}

/**
 * Create a batch response with multiple component updates.
 */
export function createBatchResponse(responses = []) {
    return {
        responses: responses.map(r => createUpdateResponse(r)),
    };
}

/**
 * Create an error response.
 */
export function createErrorResponse(message, status = 500) {
    return {
        error: message,
        status,
    };
}

/**
 * Create a validation error response (422).
 */
export function createValidationErrorResponse(errors) {
    return {
        errors,
    };
}

/**
 * Create a redirect response.
 */
export function createRedirectResponse(url, navigate = false) {
    return {
        redirect: {
            url,
            navigate,
        },
    };
}

/**
 * Create a lazy load response.
 */
export function createLazyResponse(options = {}) {
    return {
        snapshot: JSON.stringify(createSnapshot(options)),
        html: options.html || '<div>Lazy loaded content</div>',
    };
}

/**
 * Create a batch response with lazy loads.
 */
export function createBatchWithLazyResponse(updates = [], lazyLoads = []) {
    return {
        responses: updates.map(r => createUpdateResponse(r)),
        lazyResponses: lazyLoads.map(r => createLazyResponse(r)),
    };
}

/**
 * Create a full page HTML response for navigation.
 */
export function createPageResponse(options = {}) {
    const title = options.title || 'Test Page';
    const body = options.body || '<div id="content">Page content</div>';
    const csrf = options.csrf || 'test-csrf-token';

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <meta name="csrf-token" content="${csrf}">
            ${options.head || ''}
        </head>
        <body>
            ${body}
            ${options.scripts || ''}
        </body>
        </html>
    `.trim();
}

/**
 * Create a page response with LiVue components.
 */
export function createLiVuePageResponse(components = [], options = {}) {
    const componentHtml = components.map(comp => {
        const snapshot = createSnapshot(comp);
        return `
            <div data-livue-id="${comp.id || 'comp-' + Math.random().toString(36).substr(2, 9)}"
                 data-livue-snapshot='${JSON.stringify(snapshot)}'
                 ${comp.island ? 'data-livue-island' : ''}
                 ${comp.persist ? `data-livue-persist="${comp.persist}"` : ''}>
                ${comp.html || '<div>Component content</div>'}
            </div>
        `;
    }).join('\n');

    return createPageResponse({
        ...options,
        body: componentHtml,
    });
}

/**
 * Common response fixtures.
 */
export const fixtures = {
    success: createUpdateResponse(),

    validationError: createValidationErrorResponse({
        email: ['The email must be a valid email address.'],
        password: ['The password must be at least 8 characters.'],
    }),

    serverError: createErrorResponse('Internal server error', 500),

    notFound: createErrorResponse('Method not found', 404),

    redirect: createRedirectResponse('/dashboard', true),

    classicRedirect: createRedirectResponse('/login', false),

    emptyPage: createPageResponse(),

    componentPage: createLiVuePageResponse([
        { id: 'comp-1', name: 'counter', state: { count: 0 } },
    ]),
};
