<?php

namespace LiVue\Features\SupportComposables;

use ArrayAccess;
use LiVue\Component;

/**
 * Array-access wrapper for composable state.
 *
 * Provides a clean API for accessing and modifying composable state
 * that is automatically persisted in the component snapshot.
 *
 * Usage in traits:
 *   $state = $this->composableState('counter', ['value' => 0]);
 *   $state['value']++;  // Modifications are persisted
 */
class ComposableState implements ArrayAccess
{
    /**
     * Reference to the component's composable state storage.
     */
    private array $storage;

    /**
     * The namespace for this composable's state.
     */
    private string $namespace;

    /**
     * Reference to the parent array for direct modification.
     */
    private Component $component;

    public function __construct(Component $component, string $namespace)
    {
        $this->component = $component;
        $this->namespace = $namespace;
    }

    /**
     * Check if a key exists in the state.
     */
    public function offsetExists(mixed $offset): bool
    {
        $state = $this->component->getComposableStateArray($this->namespace);

        return isset($state[$offset]);
    }

    /**
     * Get a value from the state.
     */
    public function offsetGet(mixed $offset): mixed
    {
        $state = $this->component->getComposableStateArray($this->namespace);

        return $state[$offset] ?? null;
    }

    /**
     * Set a value in the state.
     */
    public function offsetSet(mixed $offset, mixed $value): void
    {
        $this->component->setComposableStateValue($this->namespace, $offset, $value);
    }

    /**
     * Remove a key from the state.
     */
    public function offsetUnset(mixed $offset): void
    {
        $this->component->unsetComposableStateValue($this->namespace, $offset);
    }

    /**
     * Get all state as array.
     */
    public function all(): array
    {
        return $this->component->getComposableStateArray($this->namespace);
    }

    /**
     * Merge values into state.
     */
    public function merge(array $values): void
    {
        foreach ($values as $key => $value) {
            $this->component->setComposableStateValue($this->namespace, $key, $value);
        }
    }
}
