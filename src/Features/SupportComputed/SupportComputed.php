<?php

namespace LiVue\Features\SupportComputed;

use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;

/**
 * Computed properties lifecycle hook.
 *
 * Clears the per-request computed cache after method execution,
 * ensuring computed values are fresh for the next render.
 */
class SupportComputed extends ComponentHook
{
    /**
     * After method execution, clear computed cache so values are recalculated.
     */
    public function dehydrate(Component $component, ComponentStore $store): void
    {
        if (method_exists($component, 'clearComputedCache')) {
            $component->clearComputedCache();
        }
    }
}
