<?php

use LiVue\Component;
use LiVue\Tests\Fixtures\Counter;
use LiVue\Tests\Fixtures\MacroTestComponent;

beforeEach(function () {
    Component::flushMacros();
});

afterEach(function () {
    Component::flushMacros();
});

describe('Callable methods memo', function () {
    it('includes callable component methods in snapshot memo', function () {
        $snapshot = livue(Counter::class)->snapshot();
        $methods = $snapshot['memo']['methods'] ?? [];

        expect($methods)->toContain('increment');
        expect($methods)->toContain('decrement');
        expect($methods)->toContain('incrementBy');
    });

    it('excludes lifecycle hooks and base utility methods', function () {
        $snapshot = livue(Counter::class)->snapshot();
        $methods = $snapshot['memo']['methods'] ?? [];

        expect($methods)->not->toContain('rendered');
        expect($methods)->not->toContain('hydrate');
        expect($methods)->not->toContain('mount');
        expect($methods)->not->toContain('macro');
        expect($methods)->not->toContain('__construct');
    });

    it('includes allowed macros and excludes blocked macro names', function () {
        Component::macro('safeMacro', function () {});
        Component::macro('boot', function () {});
        Component::macro('macro', function () {});

        $snapshot = livue(MacroTestComponent::class)->snapshot();
        $methods = $snapshot['memo']['methods'] ?? [];

        expect($methods)->toContain('safeMacro');
        expect($methods)->not->toContain('boot');
        expect($methods)->not->toContain('macro');
    });
});
