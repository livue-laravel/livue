<?php

namespace LiVue;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use LiVue\Blade\LiVueBladeDirectives;
use LiVue\Compilers\MultiFileCompiler;
use LiVue\Compilers\SingleFileCompiler;
use LiVue\Console\MakeLiVueCommand;
use LiVue\Console\MakeLiVueFormCommand;
use LiVue\Console\MakeLiVueLayoutCommand;
use LiVue\Features\SupportComposables\SupportComposables;
use LiVue\Features\SupportConfirm\SupportConfirm;
use LiVue\Features\SupportDirtyTracking\SupportDirtyTracking;
use LiVue\Features\SupportErrorBoundary\SupportErrorBoundary;
use LiVue\Features\SupportFileUploads\SupportFileUploads;
use LiVue\Features\SupportJson\SupportJson;
use LiVue\Features\SupportModelable\SupportModelable;
use LiVue\Features\SupportSession\SupportSession;
use LiVue\Features\SupportTransition\SupportTransition;
use LiVue\Features\SupportBroadcast\SupportBroadcast;
use LiVue\Features\SupportTabSync\SupportTabSync;
use LiVue\Features\SupportHooks\HookRegistry;
use LiVue\Features\SupportLazy\SupportLazy;
use LiVue\Features\SupportMultiFile\CssScopingService;
use LiVue\Features\SupportMultiFile\SupportMultiFile;
use LiVue\Features\SupportPersistentMiddleware\SupportPersistentMiddleware;
use LiVue\Features\SupportRenderless\SupportRenderless;
use LiVue\Features\SupportSingleFile\SupportSingleFile;
use LiVue\Features\SupportStreaming\SupportStreaming;
use LiVue\Features\SupportUrl\SupportUrl;
use LiVue\Features\SupportValidation\SupportValidation;
use LiVue\Http\Controllers\LiVueAssetController;
use LiVue\Http\Controllers\LiVueDownloadController;
use LiVue\Http\Controllers\LiVueStreamController;
use LiVue\Http\Controllers\LiVueUploadController;
use LiVue\Http\Middleware\LiVueAssetInjectionMiddleware;
use LiVue\Http\Middleware\LiVueRequestValidator;
use LiVue\Synthesizers\CarbonSynth;
use LiVue\Synthesizers\CollectionSynth;
use LiVue\Synthesizers\EloquentModelSynth;
use LiVue\Synthesizers\EnumSynth;
use LiVue\Synthesizers\FormSynth;
use LiVue\Synthesizers\SynthesizerRegistry;
use LiVue\Synthesizers\TemporaryUploadedFileArraySynth;
use LiVue\Synthesizers\TemporaryUploadedFileSynth;

class LiVueServiceProvider extends ServiceProvider
{
    /**
     * Register package services.
     */
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/livue.php', 'livue');

        $this->app->singleton(EventBus::class);
        $this->app->singleton(HookRegistry::class);
        $this->app->singleton(LifecycleManager::class);
        $this->app->singleton(LiVueManager::class);
        $this->app->singleton(AssetManager::class);

        // SFC and MFC compilers
        $this->app->singleton(SingleFileCompiler::class, function ($app) {
            return new SingleFileCompiler($app->make(Filesystem::class));
        });

        $this->app->singleton(CssScopingService::class);

        $this->app->singleton(MultiFileCompiler::class, function ($app) {
            return new MultiFileCompiler(
                $app->make(Filesystem::class),
                $app->make(CssScopingService::class)
            );
        });

        $this->app->singleton(SynthesizerRegistry::class, function () {
            $registry = new SynthesizerRegistry();

            $registry->register(new EloquentModelSynth());
            $registry->register(new CarbonSynth());
            $registry->register(new EnumSynth());
            $registry->register(new CollectionSynth($registry));
            $registry->register(new TemporaryUploadedFileSynth());
            $registry->register(new TemporaryUploadedFileArraySynth());
            $registry->register(new FormSynth());

            return $registry;
        });
    }

    /**
     * Bootstrap package services.
     */
    public function boot(): void
    {
        $this->registerFeatures();
        $this->registerRoutes();
        $this->registerBladeDirectives();
        $this->registerCommands();
        $this->registerPublishing();
        $this->registerViews();
        $this->registerAssetInjection();
    }

    /**
     * Register asset auto-injection middleware if enabled.
     */
    protected function registerAssetInjection(): void
    {
        if (! config('livue.inject_assets', true)) {
            return;
        }

        // Add middleware to web group
        $router = $this->app->make(\Illuminate\Routing\Router::class);
        $router->pushMiddlewareToGroup('web', LiVueAssetInjectionMiddleware::class);
    }

    /**
     * Register LiVue routes.
     *
     * The update route uses LiVueRequestValidator (expects JSON batched updates).
     * Upload routes use only the base middleware (they accept multipart/form-data).
     */
    protected function registerRoutes(): void
    {
        $baseMiddleware = config('livue.middleware', ['web']);
        $prefix = config('livue.route_prefix', 'livue');

        // Update route (JSON + LiVueRequestValidator)
        Route::middleware(array_merge($baseMiddleware, [LiVueRequestValidator::class]))
            ->prefix($prefix)
            ->group(__DIR__ . '/../routes/livue.php');

        // Upload, download, and stream routes (no LiVueRequestValidator - they have custom formats)
        Route::middleware($baseMiddleware)
            ->prefix($prefix)
            ->group(function () {
                Route::post('/upload', [LiVueUploadController::class, 'upload'])->name('livue.upload');
                Route::get('/upload-preview', [LiVueUploadController::class, 'preview'])->name('livue.upload-preview');
                Route::get('/download', LiVueDownloadController::class)->name('livue.download');
                Route::post('/stream', LiVueStreamController::class)->name('livue.stream');
            });

        // Asset routes (no middleware - public static files)
        Route::prefix($prefix)->group(function () {
            Route::get('/livue.js', [LiVueAssetController::class, 'script'])->name('livue.script');
            Route::get('/livue.js.map', [LiVueAssetController::class, 'sourceMap'])->name('livue.script.map');
        });
    }

    /**
     * Register LiVue Blade directives.
     */
    protected function registerBladeDirectives(): void
    {
        LiVueBladeDirectives::register();
    }

    /**
     * Register Artisan commands.
     */
    protected function registerCommands(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([
                MakeLiVueCommand::class,
                MakeLiVueFormCommand::class,
                MakeLiVueLayoutCommand::class,
            ]);
        }
    }

    /**
     * Register built-in lifecycle features.
     * Registration order determines execution order.
     */
    protected function registerFeatures(): void
    {
        $registry = $this->app->make(HookRegistry::class);

        $registry->register(SupportComposables::class);
        $registry->register(SupportValidation::class);
        $registry->register(SupportRenderless::class);
        $registry->register(SupportJson::class);
        $registry->register(SupportUrl::class);
        $registry->register(SupportFileUploads::class);
        $registry->register(SupportLazy::class);
        $registry->register(SupportConfirm::class);
        $registry->register(SupportModelable::class);
        $registry->register(SupportSession::class);
        $registry->register(SupportTransition::class);
        $registry->register(SupportSingleFile::class);
        $registry->register(SupportMultiFile::class);
        $registry->register(SupportDirtyTracking::class);
        $registry->register(SupportTabSync::class);
        $registry->register(SupportBroadcast::class);
        $registry->register(SupportStreaming::class);
        $registry->register(SupportPersistentMiddleware::class);
        $registry->register(SupportErrorBoundary::class);

        // Register custom persistent middleware from config
        $customMiddleware = config('livue.persistent_middleware', []);

        if (! empty($customMiddleware)) {
            SupportPersistentMiddleware::addPersistentMiddleware($customMiddleware);
        }
    }

    /**
     * Register package views (e.g., pagination templates).
     */
    protected function registerViews(): void
    {
        $this->loadViewsFrom(__DIR__ . '/../resources/views', 'livue');

        // Register SFC compiled views namespace
        $sfcCachePath = config('livue.compiled_path', storage_path('framework/livue')) . '/sfc';
        View::addNamespace('livue-sfc', $sfcCachePath);

        // Register MFC compiled views namespace
        $mfcCachePath = config('livue.compiled_path', storage_path('framework/livue')) . '/mfc';
        View::addNamespace('livue-mfc', $mfcCachePath);
    }

    /**
     * Register publishable resources.
     */
    protected function registerPublishing(): void
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../config/livue.php' => config_path('livue.php'),
            ], 'livue-config');

            // Publish built assets (single bundle with CSS inline)
            $this->publishes([
                __DIR__ . '/../dist/livue.js' => public_path('vendor/livue/livue.js'),
                __DIR__ . '/../dist/livue.js.map' => public_path('vendor/livue/livue.js.map'),
            ], 'livue-assets');

            $this->publishes([
                __DIR__ . '/../stubs' => base_path('stubs/livue'),
            ], 'livue-stubs');

            $this->publishes([
                __DIR__ . '/../stubs/livue-layout.stub' => resource_path('views/components/layouts/app.blade.php'),
            ], 'livue-layout');
        }
    }
}
