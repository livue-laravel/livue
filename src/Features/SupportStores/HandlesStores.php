<?php

namespace LiVue\Features\SupportStores;

/**
 * Trait HandlesStores
 *
 * Registers PHP-defined store metadata for frontend Pinia hydration.
 */
trait HandlesStores
{
    /**
     * Component/local stores declared by this component.
     *
     * @var array<int, array<string, mixed>>
     */
    protected array $__stores = [];

    /**
     * Whether stores from defineStores() were already initialized.
     */
    protected bool $__storesInitialized = false;

    /**
     * Register a component-scoped store.
     *
     * @param array|callable $definition
     */
    public function useStore(string $name, array|callable $definition): void
    {
        $this->registerStoreDefinition($name, $definition, 'component');
    }

    /**
     * Resolve a global store previously registered via LiVue::createStore().
     *
     * This does not define a new store; it only reads manager-registered stores.
     *
     * @return array<string, mixed>
     */
    public function useGlobalStore(string $name): array
    {
        $manager = app(\LiVue\LiVueManager::class);
        $store = $manager->getGlobalStore($name);

        if ($store === null) {
            throw new \InvalidArgumentException(
                "Global store [{$name}] is not registered. Define it with LiVue::createStore()."
            );
        }

        return $store;
    }

    /**
     * Return store definitions declared by this component.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getDeclaredStores(): array
    {
        return $this->__stores;
    }

    /**
     * Restore definitions from incoming snapshot memo.
     *
     * @param array<int, array<string, mixed>> $stores
     */
    public function restoreDeclaredStores(array $stores): void
    {
        $this->__stores = $stores;
        $this->__storesInitialized = ! empty($stores);
    }

    /**
     * Remove all component-declared store definitions.
     */
    public function flushDeclaredStores(): void
    {
        $this->__stores = [];
        $this->__storesInitialized = false;
    }

    /**
     * Auto-register component stores declared by defineStores().
     *
     * Called by SupportStores during snapshot memo dehydration.
     */
    public function initializeDefinedStores(): void
    {
        if ($this->__storesInitialized) {
            return;
        }

        $definitions = $this->defineStores();

        if (! is_array($definitions)) {
            throw new \InvalidArgumentException('defineStores() must return an array.');
        }

        foreach ($definitions as $key => $entry) {
            [$name, $definition] = $this->parseStoreDeclaration($key, $entry);
            $this->useStore($name, $definition);
        }

        $this->__storesInitialized = true;
    }

    /**
     * Declare component-scoped stores without registering them in mount().
     *
     * Supported shapes:
     * - Associative: ['cart' => [...], 'prefs' => fn () => [...]]
     * - List items: [['name' => 'cart', 'definition' => [...]], ...]
     *
     * @return array<int|string, mixed>
     */
    protected function defineStores(): array
    {
        return [];
    }

    /**
     * @param array|callable $definition
     */
    protected function registerStoreDefinition(string $name, array|callable $definition, string $scope): void
    {
        $normalized = StoreDefinition::normalize($name, $definition, $scope, $this);

        foreach ($this->__stores as $index => $existing) {
            if (($existing['name'] ?? null) === $normalized['name']
                && ($existing['scope'] ?? null) === $normalized['scope']) {
                $this->__stores[$index] = $normalized;

                return;
            }
        }

        $this->__stores[] = $normalized;
    }

    /**
     * @param mixed $entry
     * @return array{0: string, 1: array|callable}
     */
    protected function parseStoreDeclaration(int|string $key, mixed $entry): array
    {
        if (is_string($key) && $key !== '') {
            return [$key, $entry];
        }

        if (! is_array($entry)) {
            throw new \InvalidArgumentException(
                'Each defineStores() entry must be keyed by name or provide a [name, definition] array.'
            );
        }

        $name = $entry['name'] ?? null;

        if (! is_string($name) || $name === '') {
            throw new \InvalidArgumentException('Store entries from defineStores() require a non-empty [name].');
        }

        if (array_key_exists('definition', $entry)) {
            $definition = $entry['definition'];

            return [$name, $definition];
        }

        $definition = $entry;
        unset($definition['name']);

        if (empty($definition)) {
            throw new \InvalidArgumentException(
                "Store [{$name}] from defineStores() must include [definition] or an inline config."
            );
        }

        return [$name, $definition];
    }
}
