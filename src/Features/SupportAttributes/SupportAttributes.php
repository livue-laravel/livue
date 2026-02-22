<?php

namespace LiVue\Features\SupportAttributes;

use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use ReflectionClass;
use ReflectionMethod;
use ReflectionProperty;

/**
 * Unified dispatcher for ALL attributes (built-in and custom).
 *
 * Discovers attributes extending the Attribute base class on component
 * classes, properties, and methods via Reflection, then dispatches
 * lifecycle calls to them automatically.
 */
class SupportAttributes extends ComponentHook
{
    /**
     * Cache of discovered attribute blueprints per component class.
     */
    private static array $discoveryCache = [];

    public function boot(Component $component, ComponentStore $store): void
    {
        $attributes = $this->discoverAttributes($component);

        if (empty($attributes)) {
            return;
        }

        $store->set('attributes', $attributes);

        foreach ($attributes as $attribute) {
            if (method_exists($attribute, 'boot')) {
                $attribute->boot();
            }
        }
    }

    public function mount(Component $component, ComponentStore $store, array $params): void
    {
        $attributes = $store->get('attributes', []);

        foreach ($attributes as $attribute) {
            if (method_exists($attribute, 'mount')) {
                $attribute->mount($params);
            }
        }
    }

    public function hydrate(Component $component, ComponentStore $store): void
    {
        $attributes = $store->get('attributes', []);

        foreach ($attributes as $attribute) {
            if (method_exists($attribute, 'hydrate')) {
                $attribute->hydrate();
            }
        }
    }

    public function call(Component $component, ComponentStore $store, string $method, array $params): void
    {
        $attributes = $store->get('attributes', []);

        foreach ($attributes as $attribute) {
            if ($attribute->getLevel() !== AttributeLevel::METHOD) {
                continue;
            }

            if ($attribute->getName() !== $method) {
                continue;
            }

            if (method_exists($attribute, 'call')) {
                $attribute->call($params);
            }
        }
    }

    public function dehydrate(Component $component, ComponentStore $store): void
    {
        $attributes = $store->get('attributes', []);

        foreach ($attributes as $attribute) {
            if (method_exists($attribute, 'dehydrate')) {
                $attribute->dehydrate();
            }
        }
    }

    /**
     * Aggregate memo contributions from all attributes that implement dehydrateMemo().
     *
     * Merge strategy:
     * - If both existing and new values for a key are arrays → array_merge
     * - Otherwise → overwrite (e.g., tabSync, lazy — single class-level instance)
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $attributes = $store->get('attributes', []);
        $memo = [];

        foreach ($attributes as $attribute) {
            if (! method_exists($attribute, 'dehydrateMemo')) {
                continue;
            }

            foreach ($attribute->dehydrateMemo() as $key => $value) {
                if (isset($memo[$key]) && is_array($memo[$key]) && is_array($value)) {
                    $memo[$key] = array_merge($memo[$key], $value);
                } else {
                    $memo[$key] = $value;
                }
            }
        }

        return $memo;
    }

    /**
     * Distribute incoming memo data to all attributes that implement hydrateMemo().
     */
    public function hydrateMemo(Component $component, ComponentStore $store, array $memo): void
    {
        $attributes = $store->get('attributes', []);

        foreach ($attributes as $attribute) {
            if (method_exists($attribute, 'hydrateMemo')) {
                $attribute->hydrateMemo($memo);
            }
        }
    }

    /**
     * Discover all attributes on the component via Reflection.
     * Results are cached per component class and hydrated per instance.
     *
     * @return Attribute[]
     */
    private function discoverAttributes(Component $component): array
    {
        $className = get_class($component);

        if (isset(self::$discoveryCache[$className])) {
            return $this->hydrateFromCache($component, self::$discoveryCache[$className]);
        }

        $blueprints = [];
        $reflection = new ReflectionClass($component);

        // Scan class-level attributes
        foreach ($reflection->getAttributes() as $attr) {
            if ($this->isAttribute($attr->getName())) {
                $blueprints[] = [
                    'class' => $attr->getName(),
                    'args' => $attr->getArguments(),
                    'level' => AttributeLevel::ROOT,
                    'name' => $className,
                ];
            }
        }

        // Scan public property attributes
        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            foreach ($property->getAttributes() as $attr) {
                if ($this->isAttribute($attr->getName())) {
                    $blueprints[] = [
                        'class' => $attr->getName(),
                        'args' => $attr->getArguments(),
                        'level' => AttributeLevel::PROPERTY,
                        'name' => $property->getName(),
                    ];
                }
            }
        }

        // Scan public method attributes
        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            foreach ($method->getAttributes() as $attr) {
                if ($this->isAttribute($attr->getName())) {
                    $blueprints[] = [
                        'class' => $attr->getName(),
                        'args' => $attr->getArguments(),
                        'level' => AttributeLevel::METHOD,
                        'name' => $method->getName(),
                    ];
                }
            }
        }

        self::$discoveryCache[$className] = $blueprints;

        return $this->hydrateFromCache($component, $blueprints);
    }

    /**
     * Check if a class is an Attribute subclass.
     */
    private function isAttribute(string $className): bool
    {
        return is_subclass_of($className, Attribute::class);
    }

    /**
     * Instantiate attribute objects from cached blueprints and bind to the component.
     *
     * @return Attribute[]
     */
    private function hydrateFromCache(Component $component, array $blueprints): array
    {
        $attributes = [];

        foreach ($blueprints as $blueprint) {
            $instance = new $blueprint['class'](...$blueprint['args']);
            $instance->__boot($component, $blueprint['level'], $blueprint['name']);
            $attributes[] = $instance;
        }

        return $attributes;
    }
}
