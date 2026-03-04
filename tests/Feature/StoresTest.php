<?php

use LiVue\Facades\LiVue;
use LiVue\Tests\Fixtures\StoreTestComponent;

beforeEach(function () {
    LiVue::flushGlobalStores();
});

afterEach(function () {
    LiVue::flushGlobalStores();
});

function findStoreEntry(array $stores, string $name, string $scope, ?string $source = null): ?array
{
    foreach ($stores as $entry) {
        if (($entry['name'] ?? null) !== $name) {
            continue;
        }
        if (($entry['scope'] ?? null) !== $scope) {
            continue;
        }
        if ($source !== null && ($entry['source'] ?? null) !== $source) {
            continue;
        }

        return $entry;
    }

    return null;
}

it('adds LiVue::createStore stores to snapshot memo as global scope', function () {
    LiVue::createStore('auth', [
        'state' => [
            'logged' => false,
        ],
    ]);

    $snapshot = livue(StoreTestComponent::class)->snapshot();
    $stores = $snapshot['memo']['stores'] ?? [];

    $entry = findStoreEntry($stores, 'auth', 'global', 'manager');

    expect($entry)->not->toBeNull();
    expect($entry['state']['logged'])->toBeFalse();
});

it('registers component stores with implicit component scope', function () {
    $snapshot = livue(StoreTestComponent::class)->snapshot();
    $stores = $snapshot['memo']['stores'] ?? [];

    $entry = findStoreEntry($stores, 'local', 'component', 'component');

    expect($entry)->not->toBeNull();
    expect($entry['state']['count'])->toBe(5);
    expect($entry['bridge']['count']['prop'])->toBe('serverCount');
    expect($entry['bridge']['count']['mode'])->toBe('two-way');
});

it('resolves global stores via useGlobalStore accessor', function () {
    LiVue::createStore('shared', [
        'state' => [
            'ready' => true,
        ],
    ]);

    $testable = livue(StoreTestComponent::class)->call('globalStoreReady');
    $response = $testable->response();

    expect($response['jsonResult'] ?? null)->toBeTrue();
});

it('persists component-declared stores across refresh cycles', function () {
    LiVue::createStore('shared', [
        'state' => [
            'ready' => true,
        ],
    ]);

    $testable = livue(StoreTestComponent::class);

    $initial = $testable->snapshot();
    $initialStores = $initial['memo']['stores'] ?? [];
    expect(findStoreEntry($initialStores, 'shared', 'global', 'manager'))->not->toBeNull();
    expect(findStoreEntry($initialStores, 'local', 'component', 'component'))->not->toBeNull();

    $testable->refresh();

    $next = $testable->snapshot();
    $nextStores = $next['memo']['stores'] ?? [];
    expect(findStoreEntry($nextStores, 'shared', 'global', 'manager'))->not->toBeNull();
    expect(findStoreEntry($nextStores, 'local', 'component', 'component'))->not->toBeNull();
});
