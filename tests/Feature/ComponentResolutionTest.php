<?php

use LiVue\LiVueManager;
use LiVue\Tests\Fixtures\Counter;

describe('Component Resolution', function () {
    it('resolves registered component by name', function () {
        $manager = app(LiVueManager::class);
        $manager->register('counter', Counter::class);

        $component = $manager->resolve('counter');

        expect($component)->toBeInstanceOf(Counter::class);
    });

    it('resolves component by class', function () {
        $manager = app(LiVueManager::class);

        $component = $manager->resolveByClass(Counter::class);

        expect($component)->toBeInstanceOf(Counter::class);
    });

    it('auto-registers hash name for class-based resolution', function () {
        $manager = app(LiVueManager::class);
        $manager->resolveByClass(Counter::class);

        $name = $manager->getNameForClass(Counter::class);

        expect($name)->not->toBeNull();
        expect($name)->toStartWith('lv');
    });

    it('componentExists returns true for registered component', function () {
        $manager = app(LiVueManager::class);
        $manager->register('my-counter', Counter::class);

        expect($manager->componentExists('my-counter'))->toBeTrue();
    });

    it('componentExists returns false for unknown component', function () {
        $manager = app(LiVueManager::class);

        expect($manager->componentExists('totally-unknown-component'))->toBeFalse();
    });

    it('throws for non-existent component name', function () {
        $manager = app(LiVueManager::class);

        $manager->resolve('non-existent-component-xyz');
    })->throws(InvalidArgumentException::class, 'not found');

    it('throws for non-existent component class', function () {
        $manager = app(LiVueManager::class);

        $manager->resolveByClass('App\\NonExistent\\FakeComponent');
    })->throws(InvalidArgumentException::class, 'not found');

    it('generates deterministic hash names', function () {
        $manager = app(LiVueManager::class);

        $hash1 = $manager->generateHashName(Counter::class);
        $hash2 = $manager->generateHashName(Counter::class);

        expect($hash1)->toBe($hash2);
        expect($hash1)->toStartWith('lv');
    });

    it('maintains bidirectional mapping after register', function () {
        $manager = app(LiVueManager::class);
        $manager->register('test-counter', Counter::class);

        expect($manager->getNameForClass(Counter::class))->toBe('test-counter');
        expect($manager->getComponentClass('test-counter'))->toBe(Counter::class);
    });
});
