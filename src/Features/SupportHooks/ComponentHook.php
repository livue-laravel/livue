<?php

namespace LiVue\Features\SupportHooks;

use LiVue\Component;

/**
 * Abstract base class for lifecycle features.
 *
 * Each feature extends this class and overrides only the lifecycle
 * hooks it needs. The HookRegistry iterates all registered features
 * at each lifecycle stage, calling the appropriate method.
 *
 * Every hook receives the Component and the per-component ComponentStore,
 * allowing features to read/write shared state without coupling to each other.
 */
abstract class ComponentHook
{
    /**
     * Called on every component instantiation (both mount and update).
     */
    public function boot(Component $component, ComponentStore $store): void {}

    /**
     * Called during initial page load (first render), after boot.
     */
    public function mount(Component $component, ComponentStore $store, array $params): void {}

    /**
     * Called during AJAX update after state hydration.
     */
    public function hydrate(Component $component, ComponentStore $store): void {}

    /**
     * Called before a method is executed on the component.
     */
    public function call(Component $component, ComponentStore $store, string $method, array $params): void {}

    /**
     * Called after method execution, before rendering.
     */
    public function dehydrate(Component $component, ComponentStore $store): void {}

    /**
     * Called when an exception is thrown during the lifecycle.
     * Return a non-null value to signal the exception was handled.
     */
    public function exception(Component $component, ComponentStore $store, \Throwable $e): mixed
    {
        return null;
    }

    /**
     * Contribute data to the snapshot memo (e.g., validation errors).
     * Return an associative array to merge into memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        return [];
    }

    /**
     * Receive memo data from the incoming snapshot (restore feature state).
     */
    public function hydrateMemo(Component $component, ComponentStore $store, array $memo): void {}
}
