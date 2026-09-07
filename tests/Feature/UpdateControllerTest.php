<?php

use LiVue\Security\StateChecksum;
use LiVue\Tests\Fixtures\Counter;

describe('Update Controller', function () {
    beforeEach(function () {
        app(\LiVue\LiVueManager::class)->register('counter', Counter::class);
    });

    /**
     * Helper to build a valid update payload.
     */
    function buildUpdatePayload(array $state, string $name, ?string $method = null, array $params = [], array $diffs = []): array
    {
        $checksum = StateChecksum::generate($name, $state);

        $update = [
            'snapshot' => json_encode([
                'state' => $state,
                'memo' => [
                    'name' => $name,
                    'checksum' => $checksum,
                    'class' => encrypt(Counter::class),
                ],
            ]),
        ];

        if ($method !== null) {
            $update['method'] = $method;
            $update['params'] = $params;
        }

        if (! empty($diffs)) {
            $update['diffs'] = $diffs;
        }

        return $update;
    }

    describe('checksum verification', function () {
        it('returns 403 for tampered state', function () {
            $state = ['count' => 0];
            $checksum = StateChecksum::generate('counter', $state);

            $response = $this->postJson('/livue/update', [
                'updates' => [
                    [
                        'snapshot' => json_encode([
                            'state' => ['count' => 999],
                            'memo' => [
                                'name' => 'counter',
                                'checksum' => $checksum,
                                'class' => encrypt(Counter::class),
                            ],
                        ]),
                        'method' => 'increment',
                        'params' => [],
                    ],
                ],
            ]);

            $response->assertStatus(200);
            $data = $response->json();
            expect($data['responses'][0]['status'])->toBe(403);
            expect($data['responses'][0]['error'])->toBe('State integrity check failed.');
        });
    });


    describe('http exceptions', function () {
        /**
         * An HTTP exception is a deliberate answer, not a crash.
         *
         * Before this, every abort() and every rate limiter fell through to the generic
         * Throwable handler and reached the browser as a 500 "Server error." with the
         * message discarded — so an application could refuse an action but could not say
         * why. And it was invisible: Testable already handled HttpException correctly, so
         * assertions on 403 and 429 passed while the real client got a 500.
         */
        it('keeps the status and the message of an http exception', function () {
            $response = $this->postJson('/livue/update', [
                'updates' => [buildUpdatePayload(['count' => 0], 'counter', 'refuse')],
            ]);

            $response->assertStatus(200);

            expect($response->json('responses.0.status'))->toBe(429)
                ->and($response->json('responses.0.error'))->toBe('Too fast. Try again in 30 seconds.');
        });

        it('keeps the message in production too', function () {
            // The point of the whole change: these messages are written *for* the user, so
            // hiding them outside debug would leave the interface unable to explain itself
            // exactly where it matters. It is what Laravel does for a normal request.
            config()->set('app.debug', false);

            $response = $this->postJson('/livue/update', [
                'updates' => [buildUpdatePayload(['count' => 0], 'counter', 'refuse')],
            ]);

            expect($response->json('responses.0.status'))->toBe(429)
                ->and($response->json('responses.0.error'))->toBe('Too fast. Try again in 30 seconds.');
        });

        it('falls back to a short message when the status is the whole answer', function () {
            // abort(403) carries no message: an empty string would reach the client as an
            // error with nothing to show, which reads as a silent failure.
            $response = $this->postJson('/livue/update', [
                'updates' => [buildUpdatePayload(['count' => 0], 'counter', 'refuseWithoutMessage')],
            ]);

            expect($response->json('responses.0.status'))->toBe(403)
                ->and($response->json('responses.0.error'))->toBe('Request failed.');
        });

        it('still hides the message of a real failure', function () {
            // The other half, and the reason the two cases must not be merged: a genuine
            // exception can carry anything — a query, a credential — and stays a 500.
            config()->set('app.debug', false);

            $response = $this->postJson('/livue/update', [
                'updates' => [buildUpdatePayload(['count' => 0], 'counter', 'explode')],
            ]);

            expect($response->json('responses.0.status'))->toBe(500)
                ->and($response->json('responses.0.error'))->toBe('Server error.')
                ->and($response->json('responses.0.error'))->not->toContain('secret-value');
        });
    });

    describe('component resolution', function () {
        it('returns 404 for non-existent component', function () {
            $state = ['count' => 0];
            $checksum = StateChecksum::generate('non-existent', $state);

            $response = $this->postJson('/livue/update', [
                'updates' => [
                    [
                        'snapshot' => json_encode([
                            'state' => $state,
                            'memo' => [
                                'name' => 'non-existent',
                                'checksum' => $checksum,
                            ],
                        ]),
                    ],
                ],
            ]);

            $response->assertStatus(200);
            $data = $response->json();
            expect($data['responses'][0]['status'])->toBe(404);
        });
    });

    describe('method execution', function () {
        it('processes a valid update and returns new snapshot', function () {
            $state = ['count' => 0];
            $update = buildUpdatePayload($state, 'counter', 'increment');

            $response = $this->postJson('/livue/update', [
                'updates' => [$update],
            ]);

            $response->assertStatus(200);
            $data = $response->json();

            $snapshot = json_decode($data['responses'][0]['snapshot'], true);
            expect($snapshot['state']['count'])->toBe(1);
        });

        it('returns 422 for BadMethodCallException', function () {
            $state = ['count' => 0];
            $checksum = StateChecksum::generate('counter', $state);

            $response = $this->postJson('/livue/update', [
                'updates' => [
                    [
                        'snapshot' => json_encode([
                            'state' => $state,
                            'memo' => [
                                'name' => 'counter',
                                'checksum' => $checksum,
                                'class' => encrypt(Counter::class),
                            ],
                        ]),
                        'method' => 'nonExistentMethod',
                        'params' => [],
                    ],
                ],
            ]);

            $response->assertStatus(200);
            $data = $response->json();
            expect($data['responses'][0]['status'])->toBe(422);
        });

        it('returns validation errors via Testable', function () {
            // Test validation errors through the Testable harness
            // which directly exercises the LifecycleManager pipeline
            livue(\LiVue\Tests\Fixtures\ContactForm::class)
                ->set('name', '')
                ->set('email', 'invalid')
                ->set('message', 'short')
                ->call('submit')
                ->assertHasErrors(['name', 'email', 'message']);
        });
    });

    describe('batch processing', function () {
        it('processes multiple components in one request', function () {
            $state1 = ['count' => 0];
            $state2 = ['count' => 5];

            $update1 = buildUpdatePayload($state1, 'counter', 'increment');
            $update2 = buildUpdatePayload($state2, 'counter', 'incrementBy', [3]);

            $response = $this->postJson('/livue/update', [
                'updates' => [$update1, $update2],
            ]);

            $response->assertStatus(200);
            $data = $response->json();

            expect($data['responses'])->toHaveCount(2);

            $snapshot1 = json_decode($data['responses'][0]['snapshot'], true);
            $snapshot2 = json_decode($data['responses'][1]['snapshot'], true);
            expect($snapshot1['state']['count'])->toBe(1);
            expect($snapshot2['state']['count'])->toBe(8);
        });
    });

    describe('lazy loads', function () {
        it('processes lazy load requests', function () {
            $response = $this->postJson('/livue/update', [
                'lazyLoads' => [
                    [
                        'component' => 'counter',
                        'props' => [],
                    ],
                ],
            ]);

            $response->assertStatus(200);
            $data = $response->json();

            expect($data)->toHaveKey('lazyResponses');
            expect($data['lazyResponses'])->toHaveCount(1);
            expect($data['lazyResponses'][0])->toHaveKey('html');
            expect($data['lazyResponses'][0])->toHaveKey('snapshot');
        });

        it('returns 404 for non-existent lazy component', function () {
            $response = $this->postJson('/livue/update', [
                'lazyLoads' => [
                    [
                        'component' => 'does-not-exist',
                        'props' => [],
                    ],
                ],
            ]);

            $response->assertStatus(200);
            $data = $response->json();
            expect($data['lazyResponses'][0]['status'])->toBe(404);
        });
    });
});
