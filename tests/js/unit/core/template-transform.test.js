/**
 * Tests for template transformations applied before Vue.compile().
 *
 * transformMagicVariables rewrites $errors to lvErrors so that
 * Vue's template compiler resolves them through the setup proxy
 * (Vue's PublicInstanceProxyHandlers.get skips setupState for $-prefixed keys).
 *
 * lvErrors is a Proxy over livue.errors that auto-unwraps arrays
 * to their first element, so $errors.field returns the message string
 * directly instead of an array.
 */

import { describe, it, expect } from 'vitest';
import { transformMagicVariables } from '@/core/template-transform.js';

describe('transformMagicVariables', () => {

    describe('$errors rewriting', () => {
        it('should transform $errors in v-if directives', () => {
            let html = '<span v-if="$errors.name">error</span>';
            expect(transformMagicVariables(html)).toBe('<span v-if="lvErrors.name">error</span>');
        });

        it('should transform $errors in :class bindings', () => {
            let html = ':class="$errors.name ? \'red\' : \'gray\'"';
            expect(transformMagicVariables(html)).toBe(':class="lvErrors.name ? \'red\' : \'gray\'"');
        });

        it('should transform $errors in mustache interpolation', () => {
            let html = '{{ $errors.name }}';
            expect(transformMagicVariables(html)).toBe('{{ lvErrors.name }}');
        });

        it('should transform multiple $errors in the same template', () => {
            let html = '<span v-if="$errors.name">{{ $errors.name }}</span><span v-if="$errors.email">{{ $errors.email }}</span>';
            let result = transformMagicVariables(html);
            expect(result).not.toContain('$errors');
            expect(result).toContain('lvErrors.name');
            expect(result).toContain('lvErrors.email');
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
