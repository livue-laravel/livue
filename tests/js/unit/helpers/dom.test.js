/**
 * Tests for DOM helper utilities.
 */

import { describe, it, expect } from 'vitest';
import { insertAttributesIntoHtmlRoot } from '@/helpers/dom.js';

describe('DOM Helpers', () => {
    describe('insertAttributesIntoHtmlRoot()', () => {
        it('should inject attributes into a simple div tag', () => {
            let html = '<div>Content</div>';
            let result = insertAttributesIntoHtmlRoot(html, 'data-livue-id="abc"');

            expect(result).toBe('<div data-livue-id="abc">Content</div>');
        });

        it('should inject attributes into a tag with existing attributes', () => {
            let html = '<div class="my-class">Content</div>';
            let result = insertAttributesIntoHtmlRoot(html, 'data-livue-id="abc"');

            expect(result).toBe('<div data-livue-id="abc" class="my-class">Content</div>');
        });

        it('should handle non-div root tags', () => {
            let html = '<section>Content</section>';
            let result = insertAttributesIntoHtmlRoot(html, 'data-livue-id="abc"');

            expect(result).toBe('<section data-livue-id="abc">Content</section>');
        });

        it('should handle header root tag', () => {
            let html = '<header class="main-header">\n  <h1>Title</h1>\n</header>';
            let result = insertAttributesIntoHtmlRoot(html, 'v-cloak data-livue-id="123"');

            expect(result).toBe('<header v-cloak data-livue-id="123" class="main-header">\n  <h1>Title</h1>\n</header>');
        });

        it('should handle leading whitespace', () => {
            let html = '\n  <div>Content</div>';
            let result = insertAttributesIntoHtmlRoot(html, 'data-livue-id="abc"');

            expect(result).toBe('\n  <div data-livue-id="abc">Content</div>');
        });

        it('should handle custom element tags', () => {
            let html = '<my-component>Content</my-component>';
            let result = insertAttributesIntoHtmlRoot(html, 'data-livue-id="abc"');

            expect(result).toBe('<my-component data-livue-id="abc">Content</my-component>');
        });

        it('should only inject into the first tag', () => {
            let html = '<div>First</div><div>Second</div>';
            let result = insertAttributesIntoHtmlRoot(html, 'data-livue-id="abc"');

            expect(result).toBe('<div data-livue-id="abc">First</div><div>Second</div>');
        });

        it('should return original HTML if no tag found', () => {
            let html = 'Just plain text';
            let result = insertAttributesIntoHtmlRoot(html, 'data-livue-id="abc"');

            expect(result).toBe('Just plain text');
        });

        it('should handle multiple attributes', () => {
            let html = '<div>Content</div>';
            let result = insertAttributesIntoHtmlRoot(html, 'v-cloak data-livue-id="abc" data-livue-snapshot="encoded"');

            expect(result).toBe('<div v-cloak data-livue-id="abc" data-livue-snapshot="encoded">Content</div>');
        });

        it('should handle self-closing-style tags', () => {
            let html = '<article id="main">\n  <p>Text</p>\n</article>';
            let result = insertAttributesIntoHtmlRoot(html, 'data-livue-id="abc"');

            expect(result).toBe('<article data-livue-id="abc" id="main">\n  <p>Text</p>\n</article>');
        });
    });
});
