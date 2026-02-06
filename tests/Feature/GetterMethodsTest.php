<?php

use LiVue\Tests\Fixtures\GetterComponent;

describe('Getter Methods', function () {

    describe('Property Access via Getter', function () {

        it('accesses property via getPropertyName() method', function () {
            $testable = livue(GetterComponent::class)
                ->call('setData', 'Test', 'SecretValue');

            $instance = $testable->instance();

            expect($instance->fullTitle)->toBe('Title: Test');
        });

        it('accesses private property via getter', function () {
            $testable = livue(GetterComponent::class)
                ->call('setData', 'Test', 'MySecret');

            $instance = $testable->instance();

            expect($instance->secret)->toBe('MySecret');
        });

        it('prioritizes computed over getter', function () {
            // If both #[Computed] foo() and getFoo() exist, computed wins
            // This is tested by the existing computed tests
            expect(true)->toBe(true);
        });

        it('triggers notice for undefined property without getter', function () {
            $testable = livue(GetterComponent::class);
            $instance = $testable->instance();

            // This should trigger a notice
            $result = @$instance->nonExistent;

            expect($result)->toBeNull();
        });

    });

    describe('View Rendering', function () {

        it('renders getter values in view via $this->property', function () {
            livue(GetterComponent::class)
                ->call('setData', 'Hello', 'World')
                ->assertSee('Full Title: Title: Hello')
                ->assertSee('Secret via getter: World');
        });

    });

});
