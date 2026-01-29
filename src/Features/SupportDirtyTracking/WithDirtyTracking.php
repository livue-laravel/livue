<?php

namespace LiVue\Features\SupportDirtyTracking;

use LiVue\Features\SupportHooks\HookRegistry;

/**
 * Trait for components that need dirty tracking.
 *
 * Provides methods to check which properties have changed since the last
 * server sync, get original values, and reset properties to original values.
 *
 * Usage:
 *   class MyComponent extends Component
 *   {
 *       use WithDirtyTracking;
 *
 *       public function save(): void
 *       {
 *           if (!$this->isDirty()) {
 *               return; // No changes to save
 *           }
 *
 *           $changedFields = $this->getDirty();
 *           // Process changes...
 *       }
 *   }
 */
trait WithDirtyTracking
{
    /**
     * Check if any property (or a specific property) has changed.
     *
     * @param string|null $property Check specific property, or all if null
     * @return bool
     */
    public function isDirty(?string $property = null): bool
    {
        $original = $this->getOriginalState();
        $current = $this->getState();

        if ($property !== null) {
            return $this->valuesDiffer($original[$property] ?? null, $current[$property] ?? null);
        }

        // Check all properties
        $allKeys = array_unique(array_merge(array_keys($original), array_keys($current)));

        foreach ($allKeys as $key) {
            if ($this->valuesDiffer($original[$key] ?? null, $current[$key] ?? null)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get all dirty (changed) properties and their current values.
     *
     * @return array<string, mixed>
     */
    public function getDirty(): array
    {
        $original = $this->getOriginalState();
        $current = $this->getState();
        $dirty = [];

        $allKeys = array_unique(array_merge(array_keys($original), array_keys($current)));

        foreach ($allKeys as $key) {
            if ($this->valuesDiffer($original[$key] ?? null, $current[$key] ?? null)) {
                $dirty[$key] = $current[$key] ?? null;
            }
        }

        return $dirty;
    }

    /**
     * Get the original value of a property (or all original values).
     *
     * @param string|null $property Get specific property, or all if null
     * @return mixed
     */
    public function getOriginal(?string $property = null): mixed
    {
        $original = $this->getOriginalState();

        if ($property !== null) {
            return $original[$property] ?? null;
        }

        return $original;
    }

    /**
     * Check if a specific property is clean (unchanged).
     *
     * @param string $property
     * @return bool
     */
    public function isClean(string $property): bool
    {
        return ! $this->isDirty($property);
    }

    /**
     * Get the original state from the component store.
     *
     * @return array
     */
    protected function getOriginalState(): array
    {
        $hookRegistry = app(HookRegistry::class);
        $store = $hookRegistry->store($this);

        return $store->get('originalState', []);
    }

    /**
     * Compare two values for equality (deep comparison).
     *
     * @param mixed $a
     * @param mixed $b
     * @return bool True if values differ
     */
    protected function valuesDiffer(mixed $a, mixed $b): bool
    {
        // Handle objects by comparing JSON representation
        if (is_object($a) || is_object($b)) {
            return json_encode($a) !== json_encode($b);
        }

        // Handle arrays by comparing JSON representation
        if (is_array($a) || is_array($b)) {
            return json_encode($a) !== json_encode($b);
        }

        // Simple comparison for scalars
        return $a !== $b;
    }
}
