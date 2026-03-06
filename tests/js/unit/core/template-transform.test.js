/**
 * Tests for template transformations applied before Vue.compile().
 *
 * transformMagicVariables rewrites:
 * - $errors to lvErrors so that
 * Vue's template compiler resolves them through the setup proxy
 * (Vue's PublicInstanceProxyHandlers.get skips setupState for $-prefixed keys).
 *
 * lvErrors is a Proxy over livue.errors that auto-unwraps arrays
 * to their first element, so $errors.field returns the message string
 * directly instead of an array.
 *
 * It also rewrites known $shortcut() calls (e.g. $dispatch()) to
 * livue.$shortcut() so templates can use concise "magic" calls.
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

    describe('magic shortcut rewriting', () => {
        it('should rewrite $refresh() to livue.$refresh()', () => {
            let html = '<button @click="$refresh()"></button>';
            expect(transformMagicVariables(html)).toBe('<button @click="livue.$refresh()"></button>');
        });

        it('should rewrite $dispatch(), $call(), and $on()', () => {
            let html = '@click="$dispatch(\'saved\', { id: 1 }); $call(\'syncNow\'); $on(\'saved\', cb)"';
            let result = transformMagicVariables(html);

            expect(result).toContain('livue.$dispatch(\'saved\', { id: 1 })');
            expect(result).toContain('livue.$call(\'syncNow\')');
            expect(result).toContain('livue.$on(\'saved\', cb)');
        });

        it('should support optional whitespace before parentheses', () => {
            let html = '@click="$dispatch (\'saved\')"';
            expect(transformMagicVariables(html)).toBe('@click="livue.$dispatch (\'saved\')"');
        });

        it('should not rewrite non-matching names (word boundary)', () => {
            let html = '@click="$dispatcher()"';
            expect(transformMagicVariables(html)).toBe(html);
        });

        it('should not rewrite property-like usage without call parentheses', () => {
            let html = '{{ $refresh }}';
            expect(transformMagicVariables(html)).toBe(html);
        });
    });
});
