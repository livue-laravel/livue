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
