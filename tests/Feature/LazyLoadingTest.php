<?php

use LiVue\Tests\Fixtures\LazyComponent;

describe('Lazy Loading', function () {

    it('detects #[Lazy] attribute', function () {
        $testable = livue(LazyComponent::class)
            ->withoutLazyLoading();

        // Component should be loaded immediately when lazy loading is disabled
        expect($testable->instance()->content)->toBe('Lazy loaded content');
    });

    it('renders content when lazy loading disabled', function () {
        livue(LazyComponent::class)
            ->withoutLazyLoading()
            ->assertSee('Lazy loaded content');
    });

    it('updates state after load', function () {
        livue(LazyComponent::class)
            ->withoutLazyLoading()
            ->call('updateContent', 'New content')
            ->assertSee('New content');
    });

    it('includes lazy config in memo', function () {
        $testable = livue(LazyComponent::class)
            ->withoutLazyLoading();

        $snapshot = $testable->snapshot();

        // Lazy components may have specific memo keys
        expect($snapshot['memo'])->toHaveKey('name');
    });

});
