<?php

namespace LiVue\Features\SupportDirtyTracking;

use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;

/**
 * Dirty tracking lifecycle hook.
 *
 * Stores the original state at hydration time, allowing components
 * to check which properties have changed since the last server sync.
 */
class SupportDirtyTracking extends ComponentHook
{
    /**
     * Called during initial mount - store the initial state.
     */
    public function mount(Component $component, ComponentStore $store, array $params): void
    {
        $store->set('originalState', $component->getState());
    }

    /**
     * Called during AJAX update after state hydration - store the hydrated state.
     */
    public function hydrate(Component $component, ComponentStore $store): void
    {
        $store->set('originalState', $component->getState());
    }
}
