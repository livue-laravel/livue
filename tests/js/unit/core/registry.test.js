/**
 * Tests for the internal registry.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

let registry;

beforeEach(async () => {
    vi.resetModules();
    registry = await import('@/core/registry.js');
});

describe('Registry', () => {
    describe('addDirective()', () => {
        it('should register a directive', () => {
            const directive = { mounted: vi.fn() };

            registry.addDirective('test', directive);

            const directives = registry.getBuiltInDirectives();
            const found = directives.find(d => d.name === 'test');

            expect(found).toBeDefined();
            expect(found.directive).toBe(directive);
        });

        it('should allow multiple directives', () => {
            registry.addDirective('one', { mounted: vi.fn() });
            registry.addDirective('two', { mounted: vi.fn() });
            registry.addDirective('three', { mounted: vi.fn() });

            const directives = registry.getBuiltInDirectives();
            const names = directives.map(d => d.name);

            expect(names).toContain('one');
            expect(names).toContain('two');
            expect(names).toContain('three');
        });

        it('should accept function directive', () => {
            const fnDirective = vi.fn();

            registry.addDirective('fn', fnDirective);

            const directives = registry.getBuiltInDirectives();
            const found = directives.find(d => d.name === 'fn');

            expect(found.directive).toBe(fnDirective);
        });

        it('should ignore third parameter (backward compatibility)', () => {
            const directive = { mounted: vi.fn() };

            // Third parameter was for filters, now ignored
            registry.addDirective('compat', directive, ['some', 'filters']);

            const directives = registry.getBuiltInDirectives();
            const found = directives.find(d => d.name === 'compat');

            expect(found).toBeDefined();
        });
    });

    describe('getBuiltInDirectives()', () => {
        it('should return array of directive entries', () => {
            const directives = registry.getBuiltInDirectives();

            expect(Array.isArray(directives)).toBe(true);
        });

        it('should return entries with name and directive properties', () => {
            registry.addDirective('sample', { mounted: vi.fn() });

            const directives = registry.getBuiltInDirectives();
            const sample = directives.find(d => d.name === 'sample');

            expect(sample).toHaveProperty('name');
            expect(sample).toHaveProperty('directive');
        });
    });

    describe('getAllRegistrations()', () => {
        it('should return object with all registration types', () => {
            const all = registry.getAllRegistrations();

            expect(all).toHaveProperty('plugins');
            expect(all).toHaveProperty('stores');
            expect(all).toHaveProperty('components');
            expect(all).toHaveProperty('directives');
        });

        it('should return empty arrays for plugins, stores, components', () => {
            const all = registry.getAllRegistrations();

            expect(all.plugins).toEqual([]);
            expect(all.stores).toEqual([]);
            expect(all.components).toEqual([]);
        });

        it('should return registered directives', () => {
            registry.addDirective('mydir', { mounted: vi.fn() });

            const all = registry.getAllRegistrations();
            const found = all.directives.find(d => d.name === 'mydir');

            expect(found).toBeDefined();
            expect(found.filters).toBeNull();
        });
    });
});
