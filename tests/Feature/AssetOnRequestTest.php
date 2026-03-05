<?php

use LiVue\Features\SupportAssets\AssetManager;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use LiVue\LiVueManager;

describe('onRequest assets', function () {

    beforeEach(function () {
        app(AssetManager::class)->clear();
    });

    it('excludes onRequest assets from default global rendering', function () {
        $manager = app(AssetManager::class);

        $manager->register([
            Js::make('always-js', 'https://cdn.example.com/always.js'),
            Js::make('lazy-js', 'https://cdn.example.com/lazy.js')->onRequest(),
            Css::make('always-css', 'https://cdn.example.com/always.css'),
            Css::make('lazy-css', 'https://cdn.example.com/lazy.css')->onRequest(),
        ], 'primix/test');

        $scripts = $manager->renderScripts();
        $styles = $manager->renderStyles();

        expect($scripts)->toContain('always.js');
        expect($scripts)->not->toContain('lazy.js');
        expect($styles)->toContain('always.css');
        expect($styles)->not->toContain('lazy.css');
    });

    it('supports loadedOnRequest alias', function () {
        $manager = app(AssetManager::class);

        $manager->register([
            Js::make('legacy-lazy-js', 'https://cdn.example.com/legacy.js')->loadedOnRequest(),
            Css::make('legacy-lazy-css', 'https://cdn.example.com/legacy.css')->loadedOnRequest(),
        ], 'primix/test');

        $scripts = $manager->renderScripts();
        $styles = $manager->renderStyles();

        expect($scripts)->not->toContain('legacy.js');
        expect($styles)->not->toContain('legacy.css');
    });

    it('resolves script and style urls by id and package', function () {
        $manager = app(AssetManager::class);

        $manager->register([
            Js::make('table-js', 'https://cdn.example.com/table.js')->onRequest(),
            Css::make('table-css', 'https://cdn.example.com/table.css')->onRequest(),
        ], 'primix/tables');

        expect($manager->getScriptSrc('table-js', 'primix/tables'))
            ->toBe('https://cdn.example.com/table.js');
        expect($manager->getStyleHref('table-css', 'primix/tables'))
            ->toBe('https://cdn.example.com/table.css');
    });

    it('throws if requested script or style id is missing', function () {
        $manager = app(AssetManager::class);

        expect(fn () => $manager->getScriptSrc('missing-script', 'primix/forms'))
            ->toThrow(Exception::class);
        expect(fn () => $manager->getStyleHref('missing-style', 'primix/forms'))
            ->toThrow(Exception::class);
    });

    it('supports onRequest option in dynamic assets arrays', function () {
        $manager = app(AssetManager::class);

        $manager->register([
            'scripts' => [
                ['src' => 'https://cdn.example.com/eager.js'],
                ['src' => 'https://cdn.example.com/lazy.js', 'onRequest' => true],
            ],
            'styles' => [
                ['href' => 'https://cdn.example.com/eager.css'],
                ['href' => 'https://cdn.example.com/lazy.css', 'onRequest' => true],
            ],
        ], 'primix/dynamic');

        $scripts = $manager->renderScripts();
        $styles = $manager->renderStyles();

        expect($scripts)->toContain('eager.js');
        expect($scripts)->not->toContain('lazy.js');
        expect($styles)->toContain('eager.css');
        expect($styles)->not->toContain('lazy.css');
    });

    it('renders utility snippets for on-request style and script loading', function () {
        $assetManager = app(AssetManager::class);
        $manager = app(LiVueManager::class);

        $assetManager->register([
            Js::make('table-js', 'https://cdn.example.com/table.js')->onRequest(),
            Css::make('table-css', 'https://cdn.example.com/table.css')->onRequest(),
        ], 'primix/tables');

        $styleLoader = $manager->renderOnRequestStyle('table-css', 'primix/tables');
        $scriptLoader = $manager->renderOnRequestScript('table-js', 'primix/tables', ['type' => 'module', 'defer' => false]);

        expect($styleLoader)->toContain('data-livue-on-request-loader');
        expect($styleLoader)->toContain('style:primix/tables:table-css');
        expect($styleLoader)->toContain('https://cdn.example.com/table.css');

        expect($scriptLoader)->toContain('data-livue-on-request-loader');
        expect($scriptLoader)->toContain('script:primix/tables:table-js');
        expect($scriptLoader)->toContain('https://cdn.example.com/table.js');
        expect($scriptLoader)->toContain('"type":"module"');
        expect($scriptLoader)->toContain('"defer":false');
    });

    it('registers blade directives for quick on-request loading', function () {
        $compiled = app('blade.compiler')->compileString(<<<'BLADE'
@livueLoadStyle('table-css', 'primix/tables')
@livueLoadScript('table-js', 'primix/tables')
BLADE);

        expect($compiled)->toContain('renderOnRequestStyle');
        expect($compiled)->toContain('renderOnRequestScript');
    });
});
