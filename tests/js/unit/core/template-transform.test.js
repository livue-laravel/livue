/**
 * Tests for template transformations applied before Vue.compile().
 *
 * transformMagicVariables rewrites $errors to livue.errors so that
 * Vue's template compiler resolves them through the setup proxy
 * (Vue's PublicInstanceProxyHandlers.get skips setupState for $-prefixed keys).
 */

import { describe, it, expect } from 'vitest';
import { transformMagicVariables } from '@/core/template-transform.js';

describe('transformMagicVariables', () => {

    describe('$errors rewriting', () => {
        it('should transform $errors in v-if directives', () => {
            let html = '<span v-if="$errors.name">error</span>';
            expect(transformMagicVariables(html)).toBe('<span v-if="livue.errors.name">error</span>');
        });

        it('should transform $errors in :class bindings', () => {
            let html = ':class="$errors.name ? \'red\' : \'gray\'"';
            expect(transformMagicVariables(html)).toBe(':class="livue.errors.name ? \'red\' : \'gray\'"');
        });

        it('should transform $errors in mustache interpolation', () => {
            let html = '{{ $errors.name[0] }}';
            expect(transformMagicVariables(html)).toBe('{{ livue.errors.name[0] }}');
        });

        it('should transform multiple $errors in the same template', () => {
            let html = '<span v-if="$errors.name">{{ $errors.name[0] }}</span><span v-if="$errors.email">{{ $errors.email[0] }}</span>';
            let result = transformMagicVariables(html);
            expect(result).not.toContain('$errors');
            expect(result).toContain('livue.errors.name');
            expect(result).toContain('livue.errors.email');
        });

        it('should not transform $errorsSomething (word boundary)', () => {
            let html = '<span>{{ $errorsSomething }}</span>';
            expect(transformMagicVariables(html)).toBe('<span>{{ $errorsSomething }}</span>');
        });

        it('should leave templates without $errors unchanged', () => {
            let html = '<div v-if="count > 0">{{ name }}</div>';
            expect(transformMagicVariables(html)).toBe(html);
        });
    });
});
