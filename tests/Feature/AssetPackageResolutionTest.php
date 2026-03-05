<?php

use LiVue\Features\SupportAssets\AssetManager;
use LiVue\Features\SupportAssets\Js;

function deleteTempDirectory(string $path): void
{
    if (! is_dir($path)) {
        return;
    }

    $items = scandir($path);
    if (! is_array($items)) {
        return;
    }

    foreach ($items as $item) {
        if ($item === '.' || $item === '..') {
            continue;
        }

        $fullPath = $path . DIRECTORY_SEPARATOR . $item;

        if (is_dir($fullPath)) {
            deleteTempDirectory($fullPath);
        } else {
            @unlink($fullPath);
        }
    }

    @rmdir($path);
}

describe('asset package resolution', function () {
    beforeEach(function () {
        app(AssetManager::class)->clear();
    });

    it('resolves package name from nearest composer.json directory', function () {
        $manager = app(AssetManager::class);

        $tmpRoot = sys_get_temp_dir() . '/livue-package-' . uniqid('', true);
        $packageDir = $tmpRoot . '/my-package';
        $innerDir = $packageDir . '/src/Providers';

        mkdir($innerDir, 0777, true);
        file_put_contents($packageDir . '/composer.json', json_encode([
            'name' => 'vendor/my-package',
        ]));

        $resolved = $manager->resolvePackageName($innerDir);

        expect($resolved)->toBe('vendor/my-package');

        deleteTempDirectory($tmpRoot);
    });

    it('registers assets using dynamically resolved package name', function () {
        $manager = app(AssetManager::class);

        $tmpRoot = sys_get_temp_dir() . '/livue-register-' . uniqid('', true);
        $packageDir = $tmpRoot . '/my-package';
        $innerDir = $packageDir . '/src';

        mkdir($innerDir, 0777, true);
        file_put_contents($packageDir . '/composer.json', json_encode([
            'name' => 'vendor/dynamic-package',
        ]));

        $package = $manager->registerForPackage([
            Js::make('dynamic-js', '/js/dynamic.js')->onRequest(),
        ], $innerDir);

        expect($package)->toBe('vendor/dynamic-package');
        expect($manager->getScriptSrc('dynamic-js', 'vendor/dynamic-package'))
            ->toContain('/js/dynamic.js?v=');

        deleteTempDirectory($tmpRoot);
    });

    it('falls back when composer.json is missing or invalid', function () {
        $manager = app(AssetManager::class);

        $missing = $manager->resolvePackageName('/tmp/non-existent-livue-path', 'vendor/fallback');
        expect($missing)->toBe('vendor/fallback');

        $tmpRoot = sys_get_temp_dir() . '/livue-invalid-' . uniqid('', true);
        mkdir($tmpRoot, 0777, true);
        file_put_contents($tmpRoot . '/composer.json', '{invalid-json');

        $invalid = $manager->resolvePackageName($tmpRoot, 'vendor/fallback');
        expect($invalid)->toBe('vendor/fallback');

        deleteTempDirectory($tmpRoot);
    });
});
