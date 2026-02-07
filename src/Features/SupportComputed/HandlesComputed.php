<?php

namespace LiVue\Features\SupportComputed;

use Illuminate\Support\Facades\Cache;
use LiVue\Attributes\Computed;
use ReflectionClass;
use ReflectionMethod;

/**
 * Trait HandlesComputed
 *
 * Provides computed property functionality for LiVue components.
 * Methods marked with #[Computed] are automatically cached and
 * accessible as properties via __get.
 */
trait HandlesComputed
{
    /**
     * Per-request cache for computed property values.
     */
    private array $computedCache = [];

    /**
     * Magic getter: intercept access to computed properties and getter methods.
     * Priority:
     * 1. Computed properties (methods with #[Computed] attribute)
     * 2. Getter methods (getPropertyName() for $propertyName)
     *
     * @param string $name The property name
     * @return mixed The computed value
     */
    public function __get(string $name): mixed
    {
        $computedMethods = $this->getComputedMethods();

        // Check computed properties first
        if (isset($computedMethods[$name])) {
            // Return from per-request cache if available
            if (array_key_exists($name, $this->computedCache)) {
                return $this->computedCache[$name];
            }

            $attr = $computedMethods[$name];

            // Persistent cache (across requests)
            if ($attr->persist) {
                $cacheKey = $attr->cache
                    ? 'livue.computed.' . $name
                    : 'livue.computed.' . static::class . '.' . $this->getId() . '.' . $name;

                $value = Cache::remember($cacheKey, $attr->seconds, fn () => $this->{$name}());
            } else {
                $value = $this->{$name}();
            }

            $this->computedCache[$name] = $value;

            return $value;
        }

        // Check for getter method (getPropertyName)
        $getterMethod = 'get' . ucfirst($name);

        if (method_exists($this, $getterMethod)) {
            return $this->{$getterMethod}();
        }

        trigger_error("Undefined property: " . static::class . "::\${$name}", E_USER_NOTICE);

        return null;
    }

    /**
     * Magic unset: clear computed property cache.
     *
     * @param string $name The property name
     */
    public function __unset(string $name): void
    {
        unset($this->computedCache[$name]);

        // Also clear persistent cache if applicable
        $computedMethods = $this->getComputedMethods();

        if (isset($computedMethods[$name]) && $computedMethods[$name]->persist) {
            $attr = $computedMethods[$name];
            $cacheKey = $attr->cache
                ? 'livue.computed.' . $name
                : 'livue.computed.' . static::class . '.' . $this->getId() . '.' . $name;

            Cache::forget($cacheKey);
        }
    }

    /**
     * Get all computed methods with their attribute instances.
     * Uses static cache for performance.
     *
     * @return array<string, Attributes\Computed> method-name => Computed attribute
     */
    public function getComputedMethods(): array
    {
        $className = static::class;
        $cacheKey = $className . '::ComputedMethods';

        if (array_key_exists($cacheKey, self::$attributeCache)) {
            return self::$attributeCache[$cacheKey];
        }

        $computed = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            $attrs = $method->getAttributes(Computed::class);

            if (! empty($attrs)) {
                $computed[$method->getName()] = $attrs[0]->newInstance();
            }
        }

        return self::$attributeCache[$cacheKey] = $computed;
    }

    /**
     * Clear the per-request computed cache.
     * Must be called after a method modifies state so computed values are fresh.
     */
    public function clearComputedCache(): void
    {
        $this->computedCache = [];
    }

    /**
     * Resolve all computed properties and return their values.
     * Used by the renderer to pass computed values as view data.
     *
     * @return array<string, mixed>
     */
    public function getComputedValues(): array
    {
        $values = [];
        $methods = $this->getComputedMethods();

        foreach ($methods as $name => $attr) {
            $values[$name] = $this->__get($name);
        }

        return $values;
    }
}
