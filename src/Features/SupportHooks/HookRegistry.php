<?php

namespace LiVue\Features\SupportHooks;

use LiVue\Component;

/**
 * Central registry for lifecycle features.
 *
 * Registered as a singleton in the service provider.
 * Feature classes are registered globally; instances and stores
 * are created per-component (keyed by component ID).
 */
class HookRegistry
{
    /**
     * Registered feature class names (shared across all components).
     *
     * @var array<class-string<ComponentHook>>
     */
    protected array $featureClasses = [];

    /**
     * Resolved feature instances, keyed by component ID.
     *
     * @var array<string, ComponentHook[]>
     */
    protected array $instances = [];

    /**
     * Per-component stores, keyed by component ID.
     *
     * @var array<string, ComponentStore>
     */
    protected array $stores = [];

    /**
     * Register a feature class. Called during ServiceProvider boot.
     */
    public function register(string $featureClass): void
    {
        if (! in_array($featureClass, $this->featureClasses, true)) {
            $this->featureClasses[] = $featureClass;
        }
    }

    /**
     * Get or create the ComponentStore for a component.
     */
    public function store(Component $component): ComponentStore
    {
        $id = $component->id;

        if (! isset($this->stores[$id])) {
            $this->stores[$id] = new ComponentStore();
        }

        return $this->stores[$id];
    }

    /**
     * Get all feature instances for a component, instantiating if needed.
     *
     * @return ComponentHook[]
     */
    public function features(Component $component): array
    {
        $id = $component->id;

        if (! isset($this->instances[$id])) {
            $this->instances[$id] = array_map(
                fn (string $class) => new $class(),
                $this->featureClasses
            );
        }

        return $this->instances[$id];
    }

    /**
     * Call a lifecycle hook on all registered features.
     */
    public function callHook(string $hook, Component $component, mixed ...$args): void
    {
        $store = $this->store($component);

        foreach ($this->features($component) as $feature) {
            $feature->{$hook}($component, $store, ...$args);
        }
    }

    /**
     * Call the exception hook on all features.
     * Returns the first non-null result (exception was handled).
     */
    public function callExceptionHook(Component $component, \Throwable $e): mixed
    {
        $store = $this->store($component);

        foreach ($this->features($component) as $feature) {
            $result = $feature->exception($component, $store, $e);

            if ($result !== null) {
                return $result;
            }
        }

        return null;
    }

    /**
     * Collect memo contributions from all features (dehydrate phase).
     */
    public function collectMemo(Component $component): array
    {
        $store = $this->store($component);
        $memo = [];

        foreach ($this->features($component) as $feature) {
            $memo = array_merge($memo, $feature->dehydrateMemo($component, $store));
        }

        return $memo;
    }

    /**
     * Distribute incoming memo to all features (hydrate phase).
     */
    public function distributeMemo(Component $component, array $memo): void
    {
        $store = $this->store($component);

        foreach ($this->features($component) as $feature) {
            $feature->hydrateMemo($component, $store, $memo);
        }
    }

    /**
     * Clean up feature instances and store for a component.
     * Prevents memory leaks in long-running processes (Octane, queues).
     */
    public function cleanup(Component $component): void
    {
        $id = $component->id;

        unset($this->instances[$id], $this->stores[$id]);
    }
}
