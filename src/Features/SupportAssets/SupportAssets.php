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
        });
    }
}
