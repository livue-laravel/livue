<?php

namespace LiVue\Features\SupportJson;

use LiVue\Attributes\Json;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use ReflectionClass;

/**
 * JSON method support.
 *
 * When a method annotated with #[Json] is called, this feature:
 * 1. Sets a flag to skip HTML re-render (like #[Renderless])
 * 2. Captures the method return value
 * 3. Returns the value as JSON in the response
 *
 * The JavaScript Promise from livue.call() resolves with the returned data.
 */
class SupportJson extends ComponentHook
{
    /**
     * Before method execution, check if the method has #[Json].
     * If so, set flags in the component store.
     */
    public function call(Component $component, ComponentStore $store, string $method, array $params): void
    {
        $reflection = new ReflectionClass($component);

        if (!$reflection->hasMethod($method)) {
            return;
        }

        $attrs = $reflection->getMethod($method)->getAttributes(Json::class);

        if (!empty($attrs)) {
            // Skip rendering (like #[Renderless])
            $store->set('renderless', true);

            // Mark as JSON method to capture return value
            $store->set('json', true);
        }
    }
}
