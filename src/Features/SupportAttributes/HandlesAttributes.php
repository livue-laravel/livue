<?php

namespace LiVue\Features\SupportAttributes;

use LiVue\Attributes\On;
use LiVue\Attributes\Reactive;
use ReflectionClass;
use ReflectionMethod;
use ReflectionProperty;

/**
 * Trait HandlesAttributes
 *
 * Provides PHP attribute resolution functionality for LiVue components.
 * Handles caching and lookup of class, method, and property attributes.
 */
trait HandlesAttributes
{
    /**
     * Static cache for resolved attribute values, keyed by class name.
     * Prevents redundant reflection within the same request.
     * Protected to allow access from other trait methods.
     */
    protected static array $attributeCache = [];

    /**
     * Resolve a single-value attribute from the render() method or the class.
     * Method-level attributes take precedence over class-level.
     *
     * @param string $attributeClass The fully qualified attribute class name
     * @return object|null The attribute instance or null if not found
     */
    protected function resolveAttribute(string $attributeClass): ?object
    {
        $className = static::class;
        $cacheKey = $className . '::' . $attributeClass;

        if (array_key_exists($cacheKey, self::$attributeCache)) {
            return self::$attributeCache[$cacheKey];
        }

        $reflection = new ReflectionClass($this);

        // Check render() method first (higher priority)
        if ($reflection->hasMethod('render')) {
            $methodAttrs = $reflection->getMethod('render')
                ->getAttributes($attributeClass);

            if (! empty($methodAttrs)) {
                return self::$attributeCache[$cacheKey] = $methodAttrs[0]->newInstance();
            }
        }

        // Fall back to class-level
        $classAttrs = $reflection->getAttributes($attributeClass);

        if (! empty($classAttrs)) {
            return self::$attributeCache[$cacheKey] = $classAttrs[0]->newInstance();
        }

        return self::$attributeCache[$cacheKey] = null;
    }

    /**
     * Check if a property has a specific attribute.
     *
     * @param string $property       The property name
     * @param string $attributeClass The fully qualified attribute class name
     * @return bool True if the property has the attribute
     */
    protected function hasPropertyAttribute(string $property, string $attributeClass): bool
    {
        $className = static::class;
        $cacheKey = $className . '::prop::' . $property . '::' . $attributeClass;

        if (array_key_exists($cacheKey, self::$attributeCache)) {
            return self::$attributeCache[$cacheKey];
        }

        $reflection = new ReflectionClass($this);

        if (! $reflection->hasProperty($property)) {
            return self::$attributeCache[$cacheKey] = false;
        }

        $attrs = $reflection->getProperty($property)->getAttributes($attributeClass);

        return self::$attributeCache[$cacheKey] = ! empty($attrs);
    }

    /**
     * Scan all public methods for #[On] attributes and return the listeners map.
     * Used by HandlesEvents trait.
     *
     * @return array<string, string> event-name => method-name
     */
    protected function resolveOnAttributes(): array
    {
        $className = static::class;
        $cacheKey = $className . '::On';

        if (array_key_exists($cacheKey, self::$attributeCache)) {
            return self::$attributeCache[$cacheKey];
        }

        $listeners = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            $attrs = $method->getAttributes(On::class);

            foreach ($attrs as $attr) {
                $instance = $attr->newInstance();
                $listeners[$instance->event] = $method->getName();
            }
        }

        return self::$attributeCache[$cacheKey] = $listeners;
    }

    /**
     * Get the names of properties marked with #[Reactive].
     * These properties automatically sync from parent to child on re-render.
     *
     * @return string[]
     */
    public function getReactiveProperties(): array
    {
        $className = static::class;
        $cacheKey = $className . '::ReactiveList';

        if (array_key_exists($cacheKey, self::$attributeCache)) {
            return self::$attributeCache[$cacheKey];
        }

        $reactive = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            $attrs = $property->getAttributes(Reactive::class);

            if (! empty($attrs)) {
                $reactive[] = $property->getName();
            }
        }

        return self::$attributeCache[$cacheKey] = $reactive;
    }
}
