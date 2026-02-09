<?php

namespace LiVue\Features\SupportFileUploads;

use Illuminate\Console\Application as Artisan;
use Illuminate\Support\Facades\Route;
use LiVue\Component;
use LiVue\Console\PurgeUploadsCommand;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use LiVue\Http\Controllers\LiVueUploadController;

/**
 * Contribute upload configuration (HMAC tokens + rules) to the snapshot memo.
 *
 * This allows the JS runtime to authenticate upload requests and know
 * which properties accept file uploads.
 */
class SupportFileUploads extends ComponentHook
{
    public static function provide(): void
    {
        $middleware = config('livue.middleware', ['web']);
        $prefix = config('livue.route_prefix', 'livue');

        Route::middleware($middleware)
            ->prefix($prefix)
            ->group(function () {
                Route::post('/upload', [LiVueUploadController::class, 'upload'])->name('livue.upload');
                Route::post('/upload-remove', [LiVueUploadController::class, 'remove'])->name('livue.upload-remove');
                Route::get('/upload-preview', [LiVueUploadController::class, 'preview'])->name('livue.upload-preview');
            });

        if (app()->runningInConsole()) {
            Artisan::starting(function (Artisan $artisan) {
                $artisan->resolveCommands([PurgeUploadsCommand::class]);
            });
        }
    }

    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        if (! in_array(WithFileUploads::class, class_uses_recursive($component))) {
            return [];
        }

        $tokens = $component->getUploadTokens();

        if (empty($tokens)) {
            return [];
        }

        $fileRules = $component->fileRules();
        $config = [];

        foreach ($tokens as $property => $token) {
            $config[$property] = [
                'token' => $token,
                'rules' => $fileRules[$property] ?? [],
            ];
        }

        return ['uploads' => $config];
    }
}
