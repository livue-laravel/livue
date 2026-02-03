<?php

namespace LiVue\Features\SupportCasting;

use ReflectionProperty;

/**
 * Trait HandlesCasting
 *
 * Provides type casting functionality for component properties.
 * Allows automatic type conversion when setting property values.
 */
trait HandlesCasting
{
    /**
     * Custom type casts for properties.
     * Overrides the default reflection-based casting.
     *
     * Supported: 'int', 'float', 'bool', 'string', 'array', 'json'
     *
     * Example: protected array $casts = ['count' => 'int', 'settings' => 'json'];
     */
    protected array $casts = [];

    /**
     * Cast a value to match the property's type.
     * Uses $casts first, then falls back to reflection-based type detection.
     *
     * @param ReflectionProperty $property The property to cast for
     * @param mixed              $value    The value to cast
     * @return mixed The casted value
     */
    protected function castValue(ReflectionProperty $property, mixed $value): mixed
    {
        $name = $property->getName();
        $type = $property->getType();

        // When null arrives (e.g. from ConvertEmptyStringsToNull middleware)
        // but the property is not nullable, cast to the type's default.
        if ($value === null) {
            if ($type !== null && ! $type->allowsNull()) {
                $typeName = $this->casts[$name] ?? $type->getName();

                return $this->applyCast($typeName, $value);
            }

            return $value;
        }

        // Custom cast takes priority
        if (isset($this->casts[$name])) {
            return $this->applyCast($this->casts[$name], $value);
        }

        // Fallback to reflection-based casting
        if ($type === null) {
            return $value;
        }

        return $this->applyCast($type->getName(), $value);
    }

    /**
     * Apply a type cast to a value.
     *
     * @param string $cast  The type to cast to
     * @param mixed  $value The value to cast
     * @return mixed The casted value
     */
    protected function applyCast(string $cast, mixed $value): mixed
    {
        return match ($cast) {
            'int', 'integer' => (int) $value,
            'float', 'double' => (float) $value,
            'bool', 'boolean' => (bool) $value,
            'string' => (string) $value,
            'array' => (array) $value,
            'json' => is_string($value) ? json_decode($value, true) : (array) $value,
            default => $value,
        };
    }
}
