<?php

namespace LiVue\Features\SupportState;

use LiVue\EventBus;
use ReflectionClass;
use ReflectionMethod;
use ReflectionProperty;

/**
 * Trait HandlesState
 *
 * Provides state management functionality for LiVue components.
 * Handles getting and setting component state, including lifecycle hooks
 * and property casting during hydration.
 */
trait HandlesState
{
    /**
     * Get all public properties as an associative array (the component state).
     * Excludes internal properties like $id.
     *
     * @return array The component state
     */
    public function getState(): array
    {
        $state = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            $name = $property->getName();

            if (in_array($name, $this->getInternalProperties())) {
                continue;
            }

            $state[$name] = $property->getValue($this);
        }

        return $state;
    }

    /**
     * Hydrate the component from a state array.
     * Dispatches updating/updated lifecycle events via EventBus
     * and calls the component's own hooks if defined.
     *
     * Supports property-specific hooks:
     * - updatingPropertyName($value) - called before updating
     * - updatedPropertyName($value) - called after updating
     * - updatedPropertyName($value, $key) - for array properties, called per changed key
     *
     * @param array $state      The state array to hydrate from
     * @param bool  $fromClient Legacy parameter, no longer used.
     *                          #[Guarded] properties are now completely hidden from
     *                          the client (locked), so they can't appear in diffs.
     */
    public function setState(array $state, bool $fromClient = false): void
    {
        $reflection = new ReflectionClass($this);
        $eventBus = app()->bound(EventBus::class) ? app(EventBus::class) : null;

        foreach ($state as $key => $value) {
            if (in_array($key, $this->getInternalProperties())) {
                continue;
            }

            if (! $reflection->hasProperty($key)) {
                continue;
            }

            $property = $reflection->getProperty($key);

            if (! $property->isPublic()) {
                continue;
            }

            // Capture old value for array key change detection
            $oldValue = $this->{$key} ?? null;

            $casted = $this->castValue($property, $value);

            $eventBus?->dispatch('component.updating', $this, $key, $casted);

            // Generic updating() hook
            if (method_exists($this, 'updating')) {
                $casted = $this->updating($key, $casted);
            }

            // Trait-based updating{TraitName}() hooks
            foreach (class_uses_recursive($this) as $trait) {
                $traitMethod = 'updating' . class_basename($trait);

                if (method_exists($this, $traitMethod)) {
                    $result = $this->{$traitMethod}($key, $casted);
                    if ($result !== null) {
                        $casted = $result;
                    }
                }
            }

            // Property-specific updatingPropertyName() hook
            $updatingMethod = 'updating' . $this->propertyMethodName($key);
            if (method_exists($this, $updatingMethod)) {
                $casted = $this->{$updatingMethod}($casted);
            }

            $this->{$key} = $casted;

            $eventBus?->dispatch('component.updated', $this, $key, $casted);

            // Generic updated() hook
            if (method_exists($this, 'updated')) {
                $this->updated($key, $casted);
            }

            // Trait-based updated{TraitName}() hooks
            foreach (class_uses_recursive($this) as $trait) {
                $traitMethod = 'updated' . class_basename($trait);

                if (method_exists($this, $traitMethod)) {
                    $this->{$traitMethod}($key, $casted);
                }
            }

            // Property-specific updatedPropertyName() hook
            $updatedMethod = 'updated' . $this->propertyMethodName($key);
            if (method_exists($this, $updatedMethod)) {
                // For array properties, call with ($value, $key) for each changed key
                if (is_array($casted) && is_array($oldValue)) {
                    $this->callArrayUpdatedHook($updatedMethod, $oldValue, $casted);
                } else {
                    $this->{$updatedMethod}($casted);
                }
            }
        }
    }

    /**
     * Call the updated hook for array properties with changed keys.
     * Detects which keys changed and calls the hook for each.
     *
     * @param string $method   The hook method name
     * @param array  $oldValue The previous array value
     * @param array  $newValue The new array value
     */
    protected function callArrayUpdatedHook(string $method, array $oldValue, array $newValue): void
    {
        $reflection = new ReflectionMethod($this, $method);
        $paramCount = $reflection->getNumberOfParameters();

        // If hook accepts 2 parameters, call per-key
        if ($paramCount >= 2) {
            $changedKeys = $this->getChangedArrayKeys($oldValue, $newValue);

            foreach ($changedKeys as $arrayKey) {
                $this->{$method}($newValue[$arrayKey] ?? null, $arrayKey);
            }

            // If no keys changed but the arrays are different (structural change),
            // call once with the full new value
            if (empty($changedKeys) && $oldValue !== $newValue) {
                $this->{$method}($newValue, null);
            }
        } else {
            // Single parameter: call with full array
            $this->{$method}($newValue);
        }
    }

    /**
     * Get the keys that changed between two arrays.
     *
     * @param array $old The old array
     * @param array $new The new array
     * @return array List of changed keys
     */
    protected function getChangedArrayKeys(array $old, array $new): array
    {
        $changed = [];

        // Check for new or modified keys
        foreach ($new as $key => $value) {
            if (! array_key_exists($key, $old) || $old[$key] !== $value) {
                $changed[] = $key;
            }
        }

        // Check for removed keys
        foreach ($old as $key => $value) {
            if (! array_key_exists($key, $new) && ! in_array($key, $changed)) {
                $changed[] = $key;
            }
        }

        return $changed;
    }

    /**
     * Convert a property name to PascalCase for method suffix.
     * Examples: 'email' => 'Email', 'user_name' => 'UserName', 'first-name' => 'FirstName'
     *
     * @param string $property The property name
     * @return string The PascalCase method suffix
     */
    protected function propertyMethodName(string $property): string
    {
        // Handle snake_case and kebab-case
        $property = str_replace(['-', '_'], ' ', $property);
        $property = ucwords($property);

        return str_replace(' ', '', $property);
    }

    /**
     * Properties that are internal and should not be part of the state.
     *
     * @return array List of internal property names
     */
    protected function getInternalProperties(): array
    {
        return [];
    }
}
