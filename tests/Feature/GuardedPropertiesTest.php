<?php

use LiVue\Tests\Fixtures\GuardedComponent;

describe('Guarded Properties', function () {

    it('initializes guarded properties with defaults', function () {
        $testable = livue(GuardedComponent::class);

        expect($testable->instance()->secretId)->toBe(0);
        expect($testable->instance()->apiToken)->toBe('');
    });

    it('excludes guarded from public state', function () {
        $testable = livue(GuardedComponent::class)
            ->call('setSecret', 123, 'secret-token');

        $snapshot = $testable->snapshot();

        // Guarded properties should not be in the plain state
        expect($snapshot['state'])->not->toHaveKey('secretId');
        expect($snapshot['state'])->not->toHaveKey('apiToken');

        // But public field should be there
        expect($snapshot['state'])->toHaveKey('publicField');
    });

    it('can read guarded in server code', function () {
        $testable = livue(GuardedComponent::class)
            ->call('setSecret', 456, 'my-api-key');

        // Can access via method
        expect($testable->call('getSecretId')->instance()->getSecretId())->toBe(456);
        expect($testable->call('getApiToken')->instance()->getApiToken())->toBe('my-api-key');
    });

    it('can modify guarded via method call', function () {
        $testable = livue(GuardedComponent::class)
            ->call('setSecret', 100, 'token-1')
            ->call('setSecret', 200, 'token-2');

        expect($testable->instance()->secretId)->toBe(200);
        expect($testable->instance()->apiToken)->toBe('token-2');
    });

    it('preserves guarded across request cycles', function () {
        $testable = livue(GuardedComponent::class)
            ->call('setSecret', 999, 'persistent-token')
            ->call('setPublicField', 'updated');

        // After another request cycle, guarded should be restored
        expect($testable->instance()->secretId)->toBe(999);
        expect($testable->instance()->apiToken)->toBe('persistent-token');
    });

    it('stores guarded in encrypted memo.locked', function () {
        $testable = livue(GuardedComponent::class)
            ->call('setSecret', 123, 'secret');

        $snapshot = $testable->snapshot();

        // Should have locked key in memo
        expect($snapshot['memo'])->toHaveKey('locked');
    });

});
