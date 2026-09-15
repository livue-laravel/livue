<?php

use Illuminate\Contracts\Http\Kernel as HttpKernel;
use Illuminate\Routing\Router;
use LiVue\Http\Middleware\LiVueAssetInjectionMiddleware;

describe('asset injection registration', function () {

    it('survives an HTTP kernel resolved after the providers booted', function () {
        // The kernel syncs its own middleware groups onto the router when it is built.
        // Building a fresh one here reproduces a test suite or a lazily-resolving server:
        // anything pushed straight onto the router during boot would be gone.
        app()->forgetInstance(HttpKernel::class);
        app(HttpKernel::class);

        expect(app(Router::class)->getMiddlewareGroups()['web'] ?? [])
            ->toContain(LiVueAssetInjectionMiddleware::class);
    });

    it('does not append the middleware twice', function () {
        app()->forgetInstance(HttpKernel::class);
        app(HttpKernel::class);
        app()->forgetInstance(HttpKernel::class);
        app(HttpKernel::class);

        $web = app(Router::class)->getMiddlewareGroups()['web'] ?? [];

        expect(array_count_values($web)[LiVueAssetInjectionMiddleware::class] ?? 0)->toBe(1);
    });
});
