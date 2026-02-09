<?php

use LiVue\Tests\Fixtures\SecurityTestComponent;

describe('Method Protection', function () {
    describe('magic methods', function () {
        it('blocks __construct from client', function () {
            livue(SecurityTestComponent::class)
                ->call('__construct')
                ->assertForbidden();
        });

        it('blocks __toString from client', function () {
            livue(SecurityTestComponent::class)
                ->call('__toString')
                ->assertForbidden();
        });

        it('blocks __get from client', function () {
            livue(SecurityTestComponent::class)
                ->call('__get')
                ->assertForbidden();
        });

        it('blocks __set from client', function () {
            livue(SecurityTestComponent::class)
                ->call('__set')
                ->assertForbidden();
        });
    });

    describe('lifecycle hooks', function () {
        it('blocks boot from client', function () {
            livue(SecurityTestComponent::class)
                ->call('boot')
                ->assertForbidden();
        });

        it('blocks mount from client', function () {
            livue(SecurityTestComponent::class)
                ->call('mount')
                ->assertForbidden();
        });

        it('blocks hydrate from client', function () {
            livue(SecurityTestComponent::class)
                ->call('hydrate')
                ->assertForbidden();
        });

        it('blocks dehydrate from client', function () {
            livue(SecurityTestComponent::class)
                ->call('dehydrate')
                ->assertForbidden();
        });

        it('blocks updating from client', function () {
            livue(SecurityTestComponent::class)
                ->call('updating')
                ->assertForbidden();
        });

        it('blocks updated from client', function () {
            livue(SecurityTestComponent::class)
                ->call('updated')
                ->assertForbidden();
        });

        it('blocks rendering from client', function () {
            livue(SecurityTestComponent::class)
                ->call('rendering')
                ->assertForbidden();
        });

        it('blocks rendered from client', function () {
            livue(SecurityTestComponent::class)
                ->call('rendered')
                ->assertForbidden();
        });
    });

    describe('visibility', function () {
        it('blocks protected methods from client', function () {
            livue(SecurityTestComponent::class)
                ->call('protectedAction')
                ->assertForbidden();
        });

        it('blocks private methods from client', function () {
            livue(SecurityTestComponent::class)
                ->call('privateAction')
                ->assertForbidden();
        });
    });

    describe('base Component methods', function () {
        it('blocks getId from client', function () {
            livue(SecurityTestComponent::class)
                ->call('getId')
                ->assertForbidden();
        });

        it('blocks setId from client', function () {
            livue(SecurityTestComponent::class)
                ->call('setId', 'evil-id')
                ->assertForbidden();
        });

        it('blocks getName from client', function () {
            livue(SecurityTestComponent::class)
                ->call('getName')
                ->assertForbidden();
        });
    });

    describe('valid user methods', function () {
        it('allows public user methods', function () {
            livue(SecurityTestComponent::class)
                ->call('publicAction')
                ->assertSet('count', 1);
        });

        it('allows public methods with parameters', function () {
            livue(SecurityTestComponent::class)
                ->call('publicWithParams', 'new-value')
                ->assertSet('name', 'new-value');
        });
    });

    describe('non-existent methods', function () {
        it('blocks non-existent methods', function () {
            livue(SecurityTestComponent::class)
                ->call('nonExistentMethod')
                ->assertForbidden();
        });
    });
});
