<?php

namespace LiVue\Features\SupportSingleFile;

use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;

/**
 * Feature hook for Single File Components.
 *
 * Detects SFC components and stores metadata for debugging/devtools.
 */
class SupportSingleFile extends ComponentHook
{
    /**
     * Boot hook: detect SFC components and store metadata.
     */
    public function boot(Component $component, ComponentStore $store): void
    {
        if ($component instanceof SingleFileComponent) {
            $store->set('sfc', true);
            $store->set('sfcPath', $component->getSourcePath());
        }
    }

    /**
     * Contribute SFC info to memo (for debugging/devtools).
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        if (! $store->get('sfc')) {
            return [];
        }

        // Only include debug info in debug mode
        if (! config('app.debug')) {
            return [];
        }

        return ['_sfc' => true];
    }
}
