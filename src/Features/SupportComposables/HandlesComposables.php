<?php

namespace LiVue\Features\SupportComposables;

use LiVue\ComposableState;

/**
 * Trait HandlesComposables
 *
 * Provides composable state management for LiVue components.
 * Allows traits to store and retrieve namespaced state that persists
 * across requests through the component snapshot.
 */
trait HandlesComposables
{
    /**
     * Internal storage for composable state.
     * Keyed by namespace (e.g., 'counter', 'cart').
     */
    protected array $__composableState = [];

    /**
     * Get a ComposableState wrapper for a namespace.
     * The wrapper provides ArrayAccess for convenient state manipulation.
     *
     * Usage in traits:
     *   $state = $this->composableState('counter', ['value' => 0]);
     *   $state['value']++;  // Auto-persisted in snapshot
     *
     * @param string $namespace The composable namespace (e.g., 'counter')
     * @param array  $defaults  Default values if state doesn't exist
     * @return ComposableState The state wrapper with ArrayAccess
     */
    public function composableState(string $namespace, array $defaults = []): ComposableState
    {
        if (! isset($this->__composableState[$namespace])) {
            $this->__composableState[$namespace] = $defaults;
        }

        return new ComposableState($this, $namespace);
    }

    /**
     * Get the raw composable state array for a namespace.
     * Used internally by ComposableState wrapper.
     *
     * @param string $namespace The namespace to get
     * @return array The state array
     */
    public function getComposableStateArray(string $namespace): array
    {
        return $this->__composableState[$namespace] ?? [];
    }

    /**
     * Set a value in the composable state.
     * Used internally by ComposableState wrapper.
     *
     * @param string $namespace The namespace
     * @param string $key       The key to set
     * @param mixed  $value     The value to set
     */
    public function setComposableStateValue(string $namespace, string $key, mixed $value): void
    {
        if (! isset($this->__composableState[$namespace])) {
            $this->__composableState[$namespace] = [];
        }

        $this->__composableState[$namespace][$key] = $value;
    }

    /**
     * Unset a value in the composable state.
     * Used internally by ComposableState wrapper.
     *
     * @param string $namespace The namespace
     * @param string $key       The key to unset
     */
    public function unsetComposableStateValue(string $namespace, string $key): void
    {
        unset($this->__composableState[$namespace][$key]);
    }

    /**
     * Get all composable state for serialization.
     * Used by SupportComposables hook during dehydration.
     *
     * @return array All composable state
     */
    public function getAllComposableState(): array
    {
        return $this->__composableState;
    }

    /**
     * Restore composable state from memo.
     * Used by SupportComposables hook during hydration.
     *
     * @param array $state The state to restore
     */
    public function restoreComposableState(array $state): void
    {
        $this->__composableState = $state;
    }
}
