<?php

use LiVue\Tests\Fixtures\ComputedComponent;

describe('Computed Properties', function () {

    describe('Basic Computed', function () {

        it('accesses computed via magic getter', function () {
            $testable = livue(ComputedComponent::class)
                ->call('setName', 'John', 'Doe');

            $instance = $testable->instance();

            expect($instance->fullName)->toBe('John Doe');
            expect($instance->initials)->toBe('JD');
        });

        it('caches computed within single request cycle', function () {
            $testable = livue(ComputedComponent::class)
                ->call('setName', 'John', 'Doe');

            $instance = $testable->instance();

            // Multiple accesses should return cached value
            $value1 = $instance->fullName;
            $value2 = $instance->fullName;
            $value3 = $instance->fullName;

            // All values should be identical (from cache)
            expect($value1)->toBe('John Doe');
            expect($value2)->toBe('John Doe');
            expect($value3)->toBe('John Doe');
        });

        it('clears computed cache on method call', function () {
            $testable = livue(ComputedComponent::class)
                ->call('setName', 'John', 'Doe');

            expect($testable->instance()->fullName)->toBe('John Doe');

            // Method call clears computed cache
            $testable->call('setName', 'Jane', 'Smith');

            expect($testable->instance()->fullName)->toBe('Jane Smith');
        });

        it('recomputes after state change via method', function () {
            $testable = livue(ComputedComponent::class)
                ->call('setName', 'John', 'Doe');

            expect($testable->instance()->fullName)->toBe('John Doe');

            $testable->call('setName', 'Jane', 'Doe');

            expect($testable->instance()->fullName)->toBe('Jane Doe');
        });

        it('handles empty values correctly', function () {
            $testable = livue(ComputedComponent::class);

            expect($testable->instance()->fullName)->toBe('');
            expect($testable->instance()->initials)->toBe('');
            expect($testable->instance()->isComplete)->toBe(false);
        });

        it('returns boolean computed property', function () {
            $testable = livue(ComputedComponent::class);

            expect($testable->instance()->isComplete)->toBe(false);

            $testable->call('setName', 'John', 'Doe');

            expect($testable->instance()->isComplete)->toBe(true);
        });

    });

    describe('Snapshot & State', function () {

        it('includes computed in snapshot state', function () {
            $testable = livue(ComputedComponent::class)
                ->call('setName', 'John', 'Doe');

            $snapshot = $testable->snapshot();

            expect($snapshot['state'])->toHaveKey('fullName');
            expect($snapshot['state']['fullName'])->toBe('John Doe');
        });

        it('includes computed keys in memo', function () {
            $testable = livue(ComputedComponent::class)
                ->call('setName', 'John', 'Doe');

            $snapshot = $testable->snapshot();

            expect($snapshot['memo'])->toHaveKey('computed');
            expect($snapshot['memo']['computed'])->toContain('fullName');
            expect($snapshot['memo']['computed'])->toContain('initials');
            expect($snapshot['memo']['computed'])->toContain('isComplete');
        });

    });

    describe('View Data', function () {

        it('passes computed values to view', function () {
            livue(ComputedComponent::class)
                ->call('setName', 'John', 'Doe')
                ->assertViewHas('fullName', 'John Doe')
                ->assertViewHas('initials', 'JD')
                ->assertViewHas('isComplete', true);
        });

        it('renders computed in HTML', function () {
            livue(ComputedComponent::class)
                ->call('setName', 'John', 'Doe')
                ->assertSee('John Doe')
                ->assertSee('JD')
                ->assertSee('Name is complete');
        });

        it('updates rendered HTML after state change', function () {
            livue(ComputedComponent::class)
                ->call('setName', 'John', 'Doe')
                ->assertSee('John Doe')
                ->call('setName', 'Jane', 'Doe')
                ->assertSee('Jane Doe')
                ->assertDontSee('John Doe');
        });

    });

});
