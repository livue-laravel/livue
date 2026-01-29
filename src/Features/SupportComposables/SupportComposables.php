<?php

namespace LiVue\Features\SupportComposables;

use Closure;
use LiVue\Attributes\Composable;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use LiVue\Synthesizers\SynthesizerRegistry;
use ReflectionClass;
use ReflectionMethod;

/**
 * PHP Composables support.
 *
 * Allows components to use "composable" trait methods that return an array
 * of data and actions. Data values are exposed as reactive state in Vue
 * templates, and callable values (closures) become actions callable via
 * livue.call('namespace.action').
 *
 * Composable method naming convention:
 *   useAuth() -> exposes data as 'auth.*' in templates
 *   useCart() -> exposes data as 'cart.*' in templates
 *
 * Registration in components:
 *   protected array $composables = ['useAuth', 'useCart'];
 *   OR
 *   #[Composable] attribute on methods
 *   OR
 *   getComposables() method returning array
 */
class SupportComposables extends ComponentHook
{
    /**
     * Cache for composable method names per component class.
     */
    private static array $composablesCache = [];

    /**
     * On mount: execute composables for initial page load.
     * State starts fresh with defaults.
     */
    public function mount(Component $component, ComponentStore $store, array $params): void
    {
        $this->resolveComposables($component, $store);
    }

    /**
     * On hydrate: re-execute composables after state restoration.
     * hydrateMemo() runs BEFORE this, so composableState is already restored.
     */
    public function hydrate(Component $component, ComponentStore $store): void
    {
        $this->resolveComposables($component, $store);
    }

    /**
     * Restore composable state from the incoming snapshot memo.
     * This runs BEFORE hydrate(), ensuring state is available when composables execute.
     */
    public function hydrateMemo(Component $component, ComponentStore $store, array $memo): void
    {
        if (isset($memo['composableState']) && is_array($memo['composableState'])) {
            // Hydrate state values (may contain synthesized types like Models)
            $registry = app(SynthesizerRegistry::class);
            $hydratedState = [];

            foreach ($memo['composableState'] as $namespace => $values) {
                // hydrateState returns [$hydrated, $types] - we only need the hydrated values
                [$hydrated, $types] = $registry->hydrateState($values);
                $hydratedState[$namespace] = $hydrated;
            }

            $component->restoreComposableState($hydratedState);
        }
    }

    /**
     * Before method execution: intercept composable action calls.
     * Format: 'namespace.action' (e.g., 'auth.logout')
     */
    public function call(Component $component, ComponentStore $store, string $method, array $params): void
    {
        // Check if this is a composable action call (contains a dot)
        if (! str_contains($method, '.')) {
            return;
        }

        [$namespace, $action] = explode('.', $method, 2);

        $actions = $store->get('composables.actions', []);

        // Check if this namespace.action is a registered composable action
        if (! isset($actions[$namespace][$action])) {
            return;
        }

        // Find the composable method that provides this namespace
        $composableMethod = $this->findComposableMethod($component, $namespace);

        if ($composableMethod === null) {
            return;
        }

        // Re-execute the composable to get a fresh closure
        $result = $component->{$composableMethod}();

        if (! is_array($result) || ! isset($result[$action])) {
            return;
        }

        $callable = $result[$action];

        if (! $this->isCallable($callable)) {
            return;
        }

        // Execute the action with provided params
        $returnValue = $callable(...$params);

        // Mark the call as handled (so LifecycleManager doesn't try callMethod)
        $store->set('composableActionHandled', true);
        $store->set('composableActionReturnValue', $returnValue);

        // Refresh composable data after action execution
        $this->resolveComposables($component, $store);
    }

    /**
     * Contribute composable data, actions, and persistent state to snapshot memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $data = $store->get('composables.data', []);
        $actions = $store->get('composables.actions', []);
        $composableState = $component->getAllComposableState();

        if (empty($data) && empty($actions) && empty($composableState)) {
            return [];
        }

        // Dehydrate complex types using synthesizers
        $registry = app(SynthesizerRegistry::class);
        $dehydratedData = [];

        foreach ($data as $namespace => $values) {
            $dehydratedData[$namespace] = $registry->dehydrateState($values);
        }

        $memo = [];

        if (! empty($dehydratedData)) {
            $memo['composables'] = $dehydratedData;
        }

        if (! empty($actions)) {
            $memo['composableActions'] = $actions;
        }

        // Persist composable internal state (for traits using composableState())
        if (! empty($composableState)) {
            // Also dehydrate state values (may contain Models, Carbon, etc.)
            $dehydratedState = [];
            foreach ($composableState as $namespace => $values) {
                $dehydratedState[$namespace] = $registry->dehydrateState($values);
            }
            $memo['composableState'] = $dehydratedState;
        }

        return $memo;
    }

    /**
     * Execute all composables and store their data and actions.
     */
    private function resolveComposables(Component $component, ComponentStore $store): void
    {
        $composables = $this->getComposables($component);

        if (empty($composables)) {
            return;
        }

        $data = [];
        $actions = [];

        foreach ($composables as $methodName) {
            if (! method_exists($component, $methodName)) {
                continue;
            }

            $result = $component->{$methodName}();

            if (! is_array($result)) {
                continue;
            }

            $namespace = $this->deriveNamespace($methodName, $component);

            foreach ($result as $key => $value) {
                if ($this->isCallable($value)) {
                    // Register action (callable/closure)
                    $actions[$namespace][$key] = true;
                } else {
                    // Store data
                    $data[$namespace][$key] = $value;
                }
            }
        }

        $store->set('composables.data', $data);
        $store->set('composables.actions', $actions);
    }

    /**
     * Get the list of composable methods for a component.
     */
    private function getComposables(Component $component): array
    {
        $className = get_class($component);

        if (isset(self::$composablesCache[$className])) {
            return self::$composablesCache[$className];
        }

        $composables = [];
        $reflection = new ReflectionClass($component);

        // Method 1: $composables property
        if ($reflection->hasProperty('composables')) {
            $prop = $reflection->getProperty('composables');
            $prop->setAccessible(true);
            $declared = $prop->getValue($component);

            if (is_array($declared)) {
                $composables = array_merge($composables, $declared);
            }
        }

        // Method 2: getComposables() method
        if (method_exists($component, 'getComposables')) {
            $dynamic = $component->getComposables();

            if (is_array($dynamic)) {
                $composables = array_merge($composables, $dynamic);
            }
        }

        // Method 3: #[Composable] attributes on methods
        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            $attrs = $method->getAttributes(Composable::class);

            if (! empty($attrs)) {
                $composables[] = $method->getName();
            }
        }

        return self::$composablesCache[$className] = array_unique($composables);
    }

    /**
     * Derive namespace from method name: useAuth -> auth
     * Can be overridden with #[Composable(as: 'custom')]
     */
    private function deriveNamespace(string $method, Component $component): string
    {
        $reflection = new ReflectionClass($component);

        // Check for #[Composable(as: 'custom')] override
        if ($reflection->hasMethod($method)) {
            $attrs = $reflection->getMethod($method)->getAttributes(Composable::class);

            if (! empty($attrs)) {
                $instance = $attrs[0]->newInstance();

                if ($instance->as !== null) {
                    return $instance->as;
                }
            }
        }

        // Default: useAuth -> auth, useNotifications -> notifications
        if (str_starts_with($method, 'use') && strlen($method) > 3) {
            return lcfirst(substr($method, 3));
        }

        return $method;
    }

    /**
     * Find the composable method name from a namespace.
     */
    private function findComposableMethod(Component $component, string $namespace): ?string
    {
        foreach ($this->getComposables($component) as $method) {
            if ($this->deriveNamespace($method, $component) === $namespace) {
                return $method;
            }
        }

        return null;
    }

    /**
     * Check if a value is callable (closure or invokable).
     */
    private function isCallable(mixed $value): bool
    {
        return $value instanceof Closure || (is_object($value) && is_callable($value));
    }
}
