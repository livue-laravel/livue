/**
 * DOM helper utilities for LiVue runtime.
 */

/**
 * Insert attributes into the first HTML root tag of an HTML string.
 *
 * Finds the first HTML tag and injects the attribute string right after
 * the tag name. Mirrors the PHP insertAttributesIntoHtmlRoot() behavior.
 *
 * @param {string} html - The HTML string
 * @param {string} attributeString - The attributes to inject (e.g., 'data-livue-id="abc"')
 * @returns {string} HTML with attributes injected into the root tag
 */
export function insertAttributesIntoHtmlRoot(html, attributeString) {
    let match = html.match(/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/);
    if (!match) {
        console.error('[LiVue] Component template must have a root HTML tag.');
        return html;
    }

    let tagName = match[1];
    let tagNameEnd = match.index + match[0].length;

    return html.slice(0, tagNameEnd) + ' ' + attributeString + html.slice(tagNameEnd);
}
