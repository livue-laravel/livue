<?php

namespace LiVue\Features\SupportDownloads;

use Illuminate\Support\Facades\Route;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Http\Controllers\LiVueDownloadController;

class SupportDownloads extends ComponentHook
{
    public static function provide(): void
    {
        $middleware = config('livue.middleware', ['web']);
        $prefix = config('livue.route_prefix', 'livue');

        Route::middleware($middleware)
            ->prefix($prefix)
            ->group(function () {
                Route::get('/download', LiVueDownloadController::class)->name('livue.download');
            });
    }
}
