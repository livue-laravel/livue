<?php

use LiVue\Component;
use LiVue\Tests\Fixtures\MacroTestComponent;

beforeEach(function () {
    Component::flushMacros();
});

afterEach(function () {
    Component::flushMacros();
});

describe('Macros - client callability', function () {
    it('allows calling a registered macro from the client', function () {
        Component::macro('incrementByMacro', function () {
            $this->count++;
        });

        livue(MacroTestComponent::class)
            ->call('incrementByMacro')
            ->assertSet('count', 1);
    });

    it('allows calling a macro with parameters from the client', function () {
        Component::macro('setNameMacro', function (string $value) {
            $this->name = $value;
        });

        livue(MacroTestComponent::class)
            ->call('setNameMacro', 'macro-value')
            ->assertSet('name', 'macro-value');
    });

    it('gives precedence to real methods over macros with same name', function () {
        Component::macro('realMethod', function () {
            $this->count = 111;
        });

        livue(MacroTestComponent::class)
            ->call('realMethod')
            ->assertSet('count', 999);
    });
});

describe('Macros - security gates', function () {
    it('blocks macros named as magic methods', function () {
        Component::macro('__evil', function () {
            $this->count = 666;
        });

        livue(MacroTestComponent::class)
            ->call('__evil')
            ->assertForbidden();
    });

    it('blocks macros named as lifecycle hooks', function () {
        Component::macro('boot', function () {
            $this->count = 666;
        });

        livue(MacroTestComponent::class)
            ->call('boot')
            ->assertForbidden();
    });

    it('blocks macros named as mount', function () {
        Component::macro('mount', function () {
            $this->count = 666;
        });

        livue(MacroTestComponent::class)
            ->call('mount')
            ->assertForbidden();
    });

    it('blocks non-existent macros from client', function () {
        livue(MacroTestComponent::class)
            ->call('nonExistentMacro')
            ->assertForbidden();
    });
});

describe('Macroable utility methods - blocked from client', function () {
    it('blocks macro() from client', function () {
        livue(MacroTestComponent::class)
            ->call('macro')
            ->assertForbidden();
    });

    it('blocks hasMacro() from client', function () {
        livue(MacroTestComponent::class)
            ->call('hasMacro')
            ->assertForbidden();
    });

    it('blocks flushMacros() from client', function () {
        livue(MacroTestComponent::class)
            ->call('flushMacros')
            ->assertForbidden();
    });

    it('blocks mixin() from client', function () {
        livue(MacroTestComponent::class)
            ->call('mixin')
            ->assertForbidden();
    });
});

describe('Macros - PHP-side usage', function () {
    it('macros are callable from PHP on component instance', function () {
        Component::macro('greet', function () {
            return 'Hello, ' . $this->name;
        });

        $component = new MacroTestComponent();
        expect($component->greet())->toBe('Hello, test');
    });

    it('hasMacro works correctly', function () {
        expect(Component::hasMacro('myMacro'))->toBeFalse();

        Component::macro('myMacro', function () {});

        expect(Component::hasMacro('myMacro'))->toBeTrue();
    });

    it('flushMacros clears all macros', function () {
        Component::macro('temp', function () {});
        expect(Component::hasMacro('temp'))->toBeTrue();

        Component::flushMacros();
        expect(Component::hasMacro('temp'))->toBeFalse();
    });
});
