<?php

namespace LiVue\Features\SupportGuarded;

use LiVue\Attributes\Guarded;
use ReflectionClass;
use ReflectionProperty;

/**
 * Trait HandlesGuarded
 *
 * Provides property protection functionality for LiVue components.
 * Guarded properties are excluded from public state and encrypted in memo.
 */
trait HandlesGuarded
{
    /**
     * @deprecated Use #[Guarded] attribute on individual properties instead.
     * Legacy support: properties listed here are excluded from public state
     * and encrypted (locked behavior).
     */
    protected array $guarded = [];

    /**
     * Check if a property is guarded (locked / hidden from client).
     *
     * Guarded properties are completely excluded from the public snapshot
     * and encrypted in memo.locked. The client cannot see or modify them.
     *
     * Checks both the #[Guarded] attribute and the legacy $guarded array.
     *
     * @param string $property The property name to check
     * @return bool True if the property is guarded
     */
    public function isGuarded(string $property): bool
    {
        // Legacy support
        if (in_array($property, $this->guarded)) {
            return true;
        }

        return $this->hasPropertyAttribute($property, Guarded::class);
    }

    /**
     * Get all guarded (locked) property names for this component.
     *
     * These properties are excluded from the public snapshot and encrypted.
     *
     * @return string[] Array of guarded property names
     */
    public function getGuardedProperties(): array
    {
        $className = static::class;
        $cacheKey = $className . '::GuardedList';

        if (array_key_exists($cacheKey, self::$attributeCache)) {
            return self::$attributeCache[$cacheKey];
        }

        $guarded = $this->guarded;
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            $attrs = $property->getAttributes(Guarded::class);

            if (! empty($attrs) && ! in_array($property->getName(), $guarded)) {
                $guarded[] = $property->getName();
            }
        }

        return self::$attributeCache[$cacheKey] = $guarded;
    }
}
