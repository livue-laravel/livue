<?php

namespace LiVue\Features\SupportStreaming;

use Illuminate\Support\Facades\Route;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use LiVue\Http\Controllers\LiVueStreamController;

/**
 * Feature hook that adds streaming capability metadata to the snapshot memo.
 *
 * When a component uses WithStreaming trait, this hook adds a 'streaming' flag
 * to the memo so the client knows streaming is available.
 */
class SupportStreaming extends ComponentHook
{
    public static function provide(): void
    {
        $middleware = config('livue.middleware', ['web']);
        $prefix = config('livue.route_prefix', 'livue');

        Route::middleware($middleware)
            ->prefix($prefix)
            ->group(function () {
                Route::post('/stream', LiVueStreamController::class)->name('livue.stream');
            });
    }

    /**
     * Contribute streaming configuration to the snapshot memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        if (! $this->hasStreamingTrait($component)) {
            return [];
        }

        return ['streaming' => true];
    }

    /**
     * Check if the component uses the WithStreaming trait.
     */
    protected function hasStreamingTrait(Component $component): bool
    {
        return in_array(WithStreaming::class, class_uses_recursive($component));
    }
}
