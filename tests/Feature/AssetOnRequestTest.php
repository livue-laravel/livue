<?php

use LiVue\Features\SupportAssets\AssetManager;
use LiVue\Features\SupportAssets\Css;
use LiVue\Features\SupportAssets\Js;
use LiVue\Http\Middleware\LiVueAssetInjectionMiddleware;
use LiVue\LiVueManager;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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

    it('appends explicit asset version query string when provided', function () {
        $manager = app(AssetManager::class);

        $manager->register([
            Js::make('table-js', '/js/table.js')->version('1.2.3')->onRequest(),
            Css::make('table-css', '/css/table.css?theme=dark')->version('1.2.3')->onRequest(),
        ], 'primix/tables');

        expect($manager->getScriptSrc('table-js', 'primix/tables'))
            ->toBe('/js/table.js?v=1.2.3');
        expect($manager->getStyleHref('table-css', 'primix/tables'))
            ->toBe('/css/table.css?theme=dark&v=1.2.3');
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
                ['src' => '/js/versioned.js', 'onRequest' => true, 'version' => '9.9.9'],
            ],
            'styles' => [
                ['href' => 'https://cdn.example.com/eager.css'],
                ['href' => 'https://cdn.example.com/lazy.css', 'onRequest' => true],
                ['href' => '/css/versioned.css', 'onRequest' => true, 'version' => '9.9.9'],
            ],
        ], 'primix/dynamic');

        $scripts = $manager->renderScripts();
        $styles = $manager->renderStyles();

        expect($scripts)->toContain('eager.js');
        expect($scripts)->not->toContain('lazy.js');
        expect($manager->getScriptSrc('src:' . md5('/js/versioned.js'), 'primix/dynamic'))
            ->toBe('/js/versioned.js?v=9.9.9');
        expect($styles)->toContain('eager.css');
        expect($styles)->not->toContain('lazy.css');
        expect($manager->getStyleHref('href:' . md5('/css/versioned.css'), 'primix/dynamic'))
            ->toBe('/css/versioned.css?v=9.9.9');
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

    it('hoists on-request loader snippets into head before body content', function () {
        $assetManager = app(AssetManager::class);
        $manager = app(LiVueManager::class);
        $middleware = new class($manager) extends LiVueAssetInjectionMiddleware
        {
            public function hoistForTest(string $html): string
            {
                return $this->hoistOnRequestLoadersToHead($html);
            }
        };

        $assetManager->register([
            Js::make('table-js', 'https://cdn.example.com/table.js')->onRequest(),
            Css::make('table-css', 'https://cdn.example.com/table.css')->onRequest(),
        ], 'primix/tables');

        $styleLoader = $manager->renderOnRequestStyle('table-css', 'primix/tables');
        $scriptLoader = $manager->renderOnRequestScript('table-js', 'primix/tables');

        $html = <<<HTML
<!doctype html>
<html>
<head><title>Test</title></head>
<body>
    <div id="content">Hello</div>
    {$styleLoader}
    {$scriptLoader}
</body>
</html>
HTML;

        $result = $middleware->hoistForTest($html);

        $headEndPos = stripos($result, '</head>');
        $bodyContentPos = strpos($result, '<div id="content">');
        $styleKeyPos = strpos($result, 'style:primix/tables:table-css');
        $scriptKeyPos = strpos($result, 'script:primix/tables:table-js');

        expect($headEndPos)->not->toBeFalse();
        expect($bodyContentPos)->not->toBeFalse();
        expect($styleKeyPos)->not->toBeFalse();
        expect($scriptKeyPos)->not->toBeFalse();
        expect($styleKeyPos)->toBeLessThan($headEndPos);
        expect($scriptKeyPos)->toBeLessThan($headEndPos);
        expect(substr($result, $bodyContentPos))->not->toContain('data-livue-on-request-loader');
    });

    it('deduplicates hoisted on-request loader snippets', function () {
        $assetManager = app(AssetManager::class);
        $manager = app(LiVueManager::class);
        $middleware = new class($manager) extends LiVueAssetInjectionMiddleware
        {
            public function hoistForTest(string $html): string
            {
                return $this->hoistOnRequestLoadersToHead($html);
            }
        };

        $assetManager->register([
            Css::make('table-css', 'https://cdn.example.com/table.css')->onRequest(),
        ], 'primix/tables');

        $styleLoader = $manager->renderOnRequestStyle('table-css', 'primix/tables');

        $html = <<<HTML
<!doctype html>
<html>
<head></head>
<body>
    {$styleLoader}
    {$styleLoader}
</body>
</html>
HTML;

        $result = $middleware->hoistForTest($html);

        expect(substr_count($result, 'style:primix/tables:table-css'))->toBe(1);
    });

    it('does not hoist on-request loaders for SPA navigate responses', function () {
        $assetManager = app(AssetManager::class);
        $manager = app(LiVueManager::class);
        $middleware = app(LiVueAssetInjectionMiddleware::class);

        $assetManager->register([
            Js::make('table-js', 'https://cdn.example.com/table.js')->onRequest(),
            Css::make('table-css', 'https://cdn.example.com/table.css')->onRequest(),
        ], 'primix/tables');

        $styleLoader = $manager->renderOnRequestStyle('table-css', 'primix/tables');
        $scriptLoader = $manager->renderOnRequestScript('table-js', 'primix/tables');

        $html = <<<HTML
<!doctype html>
<html>
<head><title>Test</title></head>
<body>
    <div id="content" data-livue-id="abc" data-livue-snapshot="{}">Hello</div>
    {$styleLoader}
    {$scriptLoader}
</body>
</html>
HTML;

        $request = Request::create('/test', 'GET', server: [
            'HTTP_X_LIVUE_NAVIGATE' => '1',
        ]);

        $response = new Response($html, 200, ['Content-Type' => 'text/html']);

        $result = $middleware->handle($request, fn () => $response)->getContent();
        $bodyPos = strpos($result, '<body>');

        expect($bodyPos)->not->toBeFalse();
        expect(substr($result, $bodyPos))->toContain('data-livue-on-request-loader');
    });
});
