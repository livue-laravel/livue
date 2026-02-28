<?php

namespace LiVue\Features\SupportJson;

use LiVue\Attributes\Json;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use ReflectionClass;
use ReflectionMethod;

/**
 * JSON method support.
 *
 * When a method annotated with #[Json] is called, this feature:
 * 1. Sets the renderless flag to skip HTML re-rendering
 * 2. Marks the call as a JSON method so validation errors are isolated
 *    (they go into the Promise reject, not the component error bag)
 *
 * The client uses the jsonMethods list from memo to:
 * - Send the request in isolation (bypass batching pool)
 * - Reject the Promise with validation errors instead of populating livue.errors
 *
 * Return values are always included in the response regardless of this attribute.
 * The JavaScript Promise from livue.call() resolves with the returned data.
 */
class SupportJson extends ComponentHook
{
    /**
     * Cache for #[Json] method names per component class.
     */
    private static array $cache = [];

    /**
     * Before method execution, check if the method has #[Json].
     * If so, set flags in the component store.
     */
    public function call(Component $component, ComponentStore $store, string $method, array $params): void
    {
        $jsonMethods = $this->getJsonMethodNames($component);

        if (in_array($method, $jsonMethods, true)) {
            // Skip rendering (like #[Renderless])
            $store->set('renderless', true);

            // Mark as JSON method for isolated validation handling
            $store->set('jsonMethod', true);
        }
    }

    /**
     * Include the list of #[Json] method names in the snapshot memo.
     * The client uses this to decide isolation and validation behavior.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $methods = $this->getJsonMethodNames($component);

        if (! empty($methods)) {
            return ['jsonMethods' => $methods];
        }

        return [];
    }

    /**
     * Get the names of all public methods with #[Json] on a component.
     * Results are cached per class.
     *
     * @return string[]
     */
    private function getJsonMethodNames(Component $component): array
    {
        $className = get_class($component);

        if (array_key_exists($className, self::$cache)) {
            return self::$cache[$className];
        }

        $methods = [];
        $reflection = new ReflectionClass($component);

        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            $attrs = $method->getAttributes(Json::class);

            if (! empty($attrs)) {
                $methods[] = $method->getName();
            }
        }

        return self::$cache[$className] = $methods;
    }
}
