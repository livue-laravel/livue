<?php

namespace LiVue\Features\SupportRendering;

use LiVue\Attributes\Renderless;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use ReflectionClass;

/**
 * Renderless method support.
 *
 * When a method annotated with #[Renderless] is called, this feature
 * sets a flag in the ComponentStore that tells the LifecycleManager
 * to skip the HTML re-render step. The updated state is still returned
 * in the snapshot.
 */
class SupportRendering extends ComponentHook
{
    /**
     * Before method execution, check if the method has #[Renderless].
     * If so, set the 'renderless' flag in the component store.
     */
    public function call(Component $component, ComponentStore $store, string $method, array $params): void
    {
        $reflection = new ReflectionClass($component);

        if (! $reflection->hasMethod($method)) {
            return;
        }

        $attrs = $reflection->getMethod($method)->getAttributes(Renderless::class);

        if (! empty($attrs)) {
            $store->set('renderless', true);
        }
    }
}
