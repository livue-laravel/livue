<?php

namespace LiVue\Features\SupportAssets;

use Illuminate\Support\Facades\Route;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Http\Controllers\LiVueAssetController;

class SupportAssets extends ComponentHook
{
    public static function provide(): void
    {
        $prefix = config('livue.route_prefix', 'livue');

        Route::prefix($prefix)->group(function () {
            Route::get('/livue.js', [LiVueAssetController::class, 'script'])->name('livue.script');
            Route::get('/livue.js.map', [LiVueAssetController::class, 'sourceMap'])->name('livue.script.map');
            // The ESM bundle served via /livue.js?module ends with
            // `sourceMappingURL=livue.esm.js.map`, so browsers request the
            // map at this literal path relative to the route prefix.
            Route::get('/livue.esm.js.map', [LiVueAssetController::class, 'esmSourceMap'])->name('livue.script.esm-map');
        });
    }
}
