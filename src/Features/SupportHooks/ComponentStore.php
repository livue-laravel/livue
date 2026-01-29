<?php

namespace LiVue\Features\SupportHooks;

/**
 * Per-component key-value store for the lifecycle duration.
 *
 * Features use this store to communicate with each other and with
 * the LifecycleManager during a single request cycle. The store
 * is NOT persisted across requests — use dehydrateMemo/hydrateMemo
 * on ComponentHook for cross-request persistence.
 */
class ComponentStore
{
    private array $data = [];

    /**
     * Set a value in the store.
     */
    public function set(string $key, mixed $value): void
    {
        $this->data[$key] = $value;
    }

    /**
     * Get a value from the store.
     */
    public function get(string $key, mixed $default = null): mixed
    {
        return $this->data[$key] ?? $default;
    }

    /**
     * Check if a key exists in the store.
     */
    public function has(string $key): bool
    {
        return array_key_exists($key, $this->data);
    }

    /**
     * Remove a key from the store.
     */
    public function forget(string $key): void
    {
        unset($this->data[$key]);
    }

    /**
     * Get all stored data.
     */
    public function all(): array
    {
        return $this->data;
    }

    /**
     * Reset the store.
     */
    public function reset(): void
    {
        $this->data = [];
    }
}
