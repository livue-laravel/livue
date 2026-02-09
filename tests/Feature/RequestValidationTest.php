<?php

use LiVue\Security\StateChecksum;

describe('Request Validation Middleware', function () {
    beforeEach(function () {
        // Register counter component for tests
        app(\LiVue\LiVueManager::class)->register('counter', \LiVue\Tests\Fixtures\Counter::class);
    });

    it('rejects non-JSON requests', function () {
        $response = $this->post('/livue/update', ['updates' => []], [
            'Accept' => 'text/html',
        ]);

        $response->assertStatus(400);
    });

    it('rejects requests with empty updates and lazyLoads', function () {
        $response = $this->postJson('/livue/update', []);

        $response->assertStatus(400);
        $response->assertJson(['error' => 'Missing required fields.']);
    });

    it('rejects updates with missing snapshot', function () {
        $response = $this->postJson('/livue/update', [
            'updates' => [
                ['method' => 'increment'],
            ],
        ]);

        $response->assertStatus(400);
    });

    it('rejects updates with invalid snapshot format', function () {
        $response = $this->postJson('/livue/update', [
            'updates' => [
                ['snapshot' => json_encode(['invalid' => 'data'])],
            ],
        ]);

        $response->assertStatus(400);
        $response->assertJsonFragment(['error' => 'Invalid snapshot format in update at index 0.']);
    });

    it('rejects component names with path traversal characters', function () {
        $response = $this->postJson('/livue/update', [
            'updates' => [
                [
                    'snapshot' => json_encode([
                        'state' => ['count' => 0],
                        'memo' => ['name' => '../evil/component'],
                    ]),
                ],
            ],
        ]);

        $response->assertStatus(400);
        $response->assertJsonFragment(['error' => 'Invalid component name in update at index 0.']);
    });

    it('rejects component names with special characters', function () {
        $response = $this->postJson('/livue/update', [
            'updates' => [
                [
                    'snapshot' => json_encode([
                        'state' => ['count' => 0],
                        'memo' => ['name' => 'App\\Evil\\Component'],
                    ]),
                ],
            ],
        ]);

        $response->assertStatus(400);
    });

    it('rejects methods starting with double underscore', function () {
        $state = ['count' => 0];
        $checksum = StateChecksum::generate('counter', $state);

        $response = $this->postJson('/livue/update', [
            'updates' => [
                [
                    'snapshot' => json_encode([
                        'state' => $state,
                        'memo' => ['name' => 'counter', 'checksum' => $checksum],
                    ]),
                    'method' => '__construct',
                ],
            ],
        ]);

        $response->assertStatus(403);
    });

    it('accepts valid batch update request', function () {
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
                            'class' => encrypt(\LiVue\Tests\Fixtures\Counter::class),
                        ],
                    ]),
                    'method' => 'increment',
                    'params' => [],
                ],
            ],
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['responses']);
    });

    it('rejects invalid diffs format', function () {
        $response = $this->postJson('/livue/update', [
            'updates' => [
                [
                    'snapshot' => json_encode([
                        'state' => ['count' => 0],
                        'memo' => ['name' => 'counter', 'checksum' => 'abc'],
                    ]),
                    'diffs' => 'not-an-array',
                ],
            ],
        ]);

        $response->assertStatus(400);
    });
});
