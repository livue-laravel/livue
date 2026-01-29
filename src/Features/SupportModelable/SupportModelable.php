<?php

namespace LiVue\Features\SupportModelable;

use LiVue\Attributes\Modelable;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use ReflectionClass;
use ReflectionProperty;

/**
 * Modelable property support for two-way parent-child binding.
 *
 * When a child component has a property with #[Modelable], parent components
 * can bind to it using @livue('child', [], ['model' => 'parentProp']).
 *
 * Changes to the modelable property dispatch a $modelUpdate event that
 * the JS runtime captures and propagates to the parent.
 */
class SupportModelable extends ComponentHook
{
    /**
     * Cache for modelable property lookup per class.
     */
    private static array $modelableCache = [];

    /**
     * Boot hook: detect #[Modelable] property and store initial value.
     */
    public function boot(Component $component, ComponentStore $store): void
    {
        $modelable = $this->getModelableProperty($component);

        if ($modelable === null) {
            return;
        }

        $store->set('modelable', $modelable);

        // Store initial value for change detection
        $initialValue = $component->{$modelable} ?? null;
        $store->set('modelableInitial', $initialValue);
    }

    /**
     * Hydrate hook: store pre-hydrate value for change detection on updates.
     */
    public function hydrate(Component $component, ComponentStore $store): void
    {
        $modelable = $store->get('modelable');

        if ($modelable === null) {
            return;
        }

        // Store the value after hydration but before method call
        $store->set('modelableInitial', $component->{$modelable} ?? null);
    }

    /**
     * Dehydrate hook: check if modelable property changed and queue event.
     */
    public function dehydrate(Component $component, ComponentStore $store): void
    {
        $modelable = $store->get('modelable');

        if ($modelable === null) {
            return;
        }

        $initial = $store->get('modelableInitial');
        $current = $component->{$modelable} ?? null;

        // Check if value changed (serialize for comparison)
        if (json_encode($initial) !== json_encode($current)) {
            // Dispatch special event that JS runtime will handle
            $component->dispatch('$modelUpdate', [
                'value' => $current,
            ]);
        }
    }

    /**
     * Include modelable property name in memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $modelable = $store->get('modelable');

        if ($modelable === null) {
            return [];
        }

        return ['modelable' => $modelable];
    }

    /**
     * Get the #[Modelable] property name from a component.
     */
    private function getModelableProperty(Component $component): ?string
    {
        $className = get_class($component);

        if (array_key_exists($className, self::$modelableCache)) {
            return self::$modelableCache[$className];
        }

        $reflection = new ReflectionClass($component);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            $attrs = $property->getAttributes(Modelable::class);

            if (!empty($attrs)) {
                return self::$modelableCache[$className] = $property->getName();
            }
        }

        return self::$modelableCache[$className] = null;
    }
}
