<?php

use LiVue\Component;
use LiVue\Features\SupportComposables\SupportComposables;
use LiVue\Tests\Fixtures\ComposableAutoDiscoverComponent;
use LiVue\Tests\Fixtures\ComposableTestComponent;

beforeEach(function () {
    Component::flushGlobalComposables();
    SupportComposables::flushCache();
});

afterEach(function () {
    Component::flushGlobalComposables();
    SupportComposables::flushCache();
});

// -------------------------------------------------------------------------
//  Component::use() — closure-based
// -------------------------------------------------------------------------

describe('Component::use() - closure-based', function () {
    it('registers a global composable available to all components', function () {
        Component::use('greeting', function () {
            return [
                'message' => 'Hello, World!',
            ];
        });

        livue(ComposableTestComponent::class)
            ->assertSnapshotHas('composables');
    });

    it('binds $this to the component instance', function () {
        Component::use('greet', function () {
            return [
                'greeting' => 'Hello, ' . $this->name,
            ];
        });

        $snapshot = livue(ComposableTestComponent::class)->snapshot();
        $composables = $snapshot['memo']['composables'];

        expect($composables)->toHaveKey('greet');
        expect($composables['greet']['greeting'])->toBe('Hello, test');
    });

    it('allows calling global composable actions from client', function () {
        Component::use('counter', function () {
            return [
                'value' => $this->count,
                'increment' => fn () => $this->count++,
            ];
        });

        livue(ComposableTestComponent::class)
            ->call('counter.increment')
            ->assertSet('count', 1)
            ->call('counter.increment')
            ->assertSet('count', 2);
    });

    it('allows calling global composable actions with parameters', function () {
        Component::use('setter', function () {
            return [
                'setName' => fn (string $value) => $this->name = $value,
            ];
        });

        livue(ComposableTestComponent::class)
            ->call('setter.setName', 'changed')
            ->assertSet('name', 'changed');
    });

    it('supports composableState() in global composables', function () {
        Component::use('stateful', function () {
            $state = $this->composableState('stateful', ['value' => 0]);

            return [
                'value' => $state['value'],
                'increment' => function () use ($state) {
                    $state['value'] = $state['value'] + 1;
                },
            ];
        });

        $testable = livue(ComposableTestComponent::class);
        $snapshot = $testable->snapshot();

        expect($snapshot['memo']['composables']['stateful']['value'])->toBe(0);

        $testable->call('stateful.increment');
        $snapshot = $testable->snapshot();

        expect($snapshot['memo']['composables']['stateful']['value'])->toBe(1);
    });
});

// -------------------------------------------------------------------------
//  Component::use() — class-based (mixin pattern)
// -------------------------------------------------------------------------

describe('Component::use() - class-based', function () {
    it('registers composables from a class with use* methods', function () {
        Component::use(new class
        {
            public function useExample()
            {
                return function (): array {
                    return ['value' => 'from-class'];
                };
            }
        });

        $snapshot = livue(ComposableTestComponent::class)->snapshot();

        expect($snapshot['memo']['composables']['example']['value'])->toBe('from-class');
    });

    it('registers multiple composables from a single class', function () {
        Component::use(new class
        {
            public function useAlpha()
            {
                return function (): array {
                    return ['letter' => 'A'];
                };
            }

            public function useBeta()
            {
                return function (): array {
                    return ['letter' => 'B'];
                };
            }
        });

        $snapshot = livue(ComposableTestComponent::class)->snapshot();

        expect($snapshot['memo']['composables']['alpha']['letter'])->toBe('A');
        expect($snapshot['memo']['composables']['beta']['letter'])->toBe('B');
    });

    it('binds class methods to the component instance', function () {
        Component::use(new class
        {
            public function useInfo()
            {
                return function (): array {
                    return ['name' => $this->name];
                };
            }
        });

        $snapshot = livue(ComposableTestComponent::class)->snapshot();

        expect($snapshot['memo']['composables']['info']['name'])->toBe('test');
    });

    it('allows calling class-based composable actions', function () {
        Component::use(new class
        {
            public function useActions()
            {
                return function (): array {
                    return [
                        'count' => $this->count,
                        'increment' => fn () => $this->count++,
                    ];
                };
            }
        });

        livue(ComposableTestComponent::class)
            ->call('actions.increment')
            ->assertSet('count', 1);
    });

    it('ignores non-closure return values from class methods', function () {
        Component::use(new class
        {
            public function useValid()
            {
                return function (): array {
                    return ['ok' => true];
                };
            }

            public function useInvalid(): string
            {
                return 'not-a-closure';
            }
        });

        $snapshot = livue(ComposableTestComponent::class)->snapshot();

        expect($snapshot['memo']['composables'])->toHaveKey('valid');
        expect($snapshot['memo']['composables'])->not->toHaveKey('invalid');
    });
});

// -------------------------------------------------------------------------
//  Auto-discovery
// -------------------------------------------------------------------------

describe('Auto-discovery', function () {
    it('auto-discovers use* methods without $composables declaration', function () {
        $snapshot = livue(ComposableAutoDiscoverComponent::class)->snapshot();

        expect($snapshot['memo']['composables'])->toHaveKey('local');
        expect($snapshot['memo']['composables']['local']['source'])->toBe('component');
        expect($snapshot['memo']['composables']['local']['name'])->toBe('test');
    });

    it('allows calling auto-discovered composable actions', function () {
        livue(ComposableAutoDiscoverComponent::class)
            ->call('local.increment')
            ->assertSet('count', 1);
    });
});

// -------------------------------------------------------------------------
//  Precedence
// -------------------------------------------------------------------------

describe('Precedence', function () {
    it('local composable takes precedence over global with same namespace', function () {
        Component::use('local', function () {
            return ['source' => 'global'];
        });

        $snapshot = livue(ComposableAutoDiscoverComponent::class)->snapshot();

        expect($snapshot['memo']['composables']['local']['source'])->toBe('component');
    });

    it('global composable is available when no local override exists', function () {
        Component::use('extra', function () {
            return ['source' => 'global'];
        });

        $snapshot = livue(ComposableAutoDiscoverComponent::class)->snapshot();

        expect($snapshot['memo']['composables']['extra']['source'])->toBe('global');
        expect($snapshot['memo']['composables']['local']['source'])->toBe('component');
    });
});

// -------------------------------------------------------------------------
//  Security
// -------------------------------------------------------------------------

describe('Security - utility methods blocked from client', function () {
    it('blocks use() from client', function () {
        livue(ComposableTestComponent::class)
            ->call('use')
            ->assertForbidden();
    });

    it('blocks getGlobalComposables() from client', function () {
        livue(ComposableTestComponent::class)
            ->call('getGlobalComposables')
            ->assertForbidden();
    });

    it('blocks flushGlobalComposables() from client', function () {
        livue(ComposableTestComponent::class)
            ->call('flushGlobalComposables')
            ->assertForbidden();
    });
});

// -------------------------------------------------------------------------
//  Cleanup
// -------------------------------------------------------------------------

describe('flushGlobalComposables', function () {
    it('clears all global composables', function () {
        Component::use('temp', function () {
            return ['value' => 1];
        });

        expect(Component::getGlobalComposables())->toHaveKey('temp');

        Component::flushGlobalComposables();

        expect(Component::getGlobalComposables())->toBeEmpty();
    });
});
