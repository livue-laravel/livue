<?php

use LiVue\Security\StateChecksum;

describe('StateChecksum', function () {
    describe('generate', function () {
        it('produces consistent output for same input', function () {
            $checksum1 = StateChecksum::generate('counter', ['count' => 0]);
            $checksum2 = StateChecksum::generate('counter', ['count' => 0]);

            expect($checksum1)->toBe($checksum2);
        });

        it('produces different output for different state', function () {
            $checksum1 = StateChecksum::generate('counter', ['count' => 0]);
            $checksum2 = StateChecksum::generate('counter', ['count' => 1]);

            expect($checksum1)->not->toBe($checksum2);
        });

        it('produces different output for different component names', function () {
            $checksum1 = StateChecksum::generate('counter', ['count' => 0]);
            $checksum2 = StateChecksum::generate('timer', ['count' => 0]);

            expect($checksum1)->not->toBe($checksum2);
        });

        it('returns a 64-character hex string (SHA-256)', function () {
            $checksum = StateChecksum::generate('counter', ['count' => 0]);

            expect($checksum)->toMatch('/^[a-f0-9]{64}$/');
        });
    });

    describe('verify', function () {
        it('returns true for valid checksum', function () {
            $state = ['count' => 0, 'name' => 'test'];
            $checksum = StateChecksum::generate('counter', $state);

            expect(StateChecksum::verify('counter', $state, $checksum))->toBeTrue();
        });

        it('returns false for tampered state', function () {
            $state = ['count' => 0];
            $checksum = StateChecksum::generate('counter', $state);

            $tamperedState = ['count' => 999];

            expect(StateChecksum::verify('counter', $tamperedState, $checksum))->toBeFalse();
        });

        it('returns false for tampered component name', function () {
            $state = ['count' => 0];
            $checksum = StateChecksum::generate('counter', $state);

            expect(StateChecksum::verify('evil-component', $state, $checksum))->toBeFalse();
        });

        it('returns false for invalid checksum string', function () {
            $state = ['count' => 0];

            expect(StateChecksum::verify('counter', $state, 'invalid-checksum'))->toBeFalse();
        });

        it('returns false for empty checksum', function () {
            $state = ['count' => 0];

            expect(StateChecksum::verify('counter', $state, ''))->toBeFalse();
        });
    });

    describe('normalization', function () {
        it('treats empty strings as null', function () {
            $checksum1 = StateChecksum::generate('test', ['name' => '']);
            $checksum2 = StateChecksum::generate('test', ['name' => null]);

            expect($checksum1)->toBe($checksum2);
        });

        it('normalizes nested arrays', function () {
            $checksum1 = StateChecksum::generate('test', ['data' => ['name' => '', 'age' => 25]]);
            $checksum2 = StateChecksum::generate('test', ['data' => ['name' => null, 'age' => 25]]);

            expect($checksum1)->toBe($checksum2);
        });

        it('preserves non-empty strings', function () {
            $checksum1 = StateChecksum::generate('test', ['name' => 'hello']);
            $checksum2 = StateChecksum::generate('test', ['name' => null]);

            expect($checksum1)->not->toBe($checksum2);
        });

        it('preserves integer zero', function () {
            $checksum1 = StateChecksum::generate('test', ['count' => 0]);
            $checksum2 = StateChecksum::generate('test', ['count' => null]);

            expect($checksum1)->not->toBe($checksum2);
        });

        it('preserves boolean false', function () {
            $checksum1 = StateChecksum::generate('test', ['active' => false]);
            $checksum2 = StateChecksum::generate('test', ['active' => null]);

            expect($checksum1)->not->toBe($checksum2);
        });
    });

    describe('round-trip integrity', function () {
        it('verifies after mount-dehydrate cycle', function () {
            $testable = livue(\LiVue\Tests\Fixtures\Counter::class);
            $snapshot = $testable->snapshot();

            $state = $snapshot['state'];
            $checksum = $snapshot['memo']['checksum'];
            $componentName = $snapshot['memo']['name'];

            expect(StateChecksum::verify($componentName, $state, $checksum))->toBeTrue();
        });

        it('verifies after state change cycle', function () {
            $testable = livue(\LiVue\Tests\Fixtures\Counter::class)
                ->call('increment');

            $snapshot = $testable->snapshot();

            $state = $snapshot['state'];
            $checksum = $snapshot['memo']['checksum'];
            $componentName = $snapshot['memo']['name'];

            expect(StateChecksum::verify($componentName, $state, $checksum))->toBeTrue();
        });

        it('verifies after multiple updates cycle', function () {
            $testable = livue(\LiVue\Tests\Fixtures\Counter::class)
                ->call('increment')
                ->call('increment')
                ->call('incrementBy', 5);

            $snapshot = $testable->snapshot();

            $state = $snapshot['state'];
            $checksum = $snapshot['memo']['checksum'];
            $componentName = $snapshot['memo']['name'];

            expect(StateChecksum::verify($componentName, $state, $checksum))->toBeTrue();
            expect($testable->instance()->count)->toBe(7);
        });
    });
});
