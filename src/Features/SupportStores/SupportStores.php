<?php

namespace LiVue\Features\SupportStores;

use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use LiVue\LiVueManager;
use LiVue\Synthesizers\SynthesizerRegistry;

/**
 * Snapshot memo support for PHP-defined stores.
 */
class SupportStores extends ComponentHook
{
    /**
     * Restore component-declared stores from incoming memo.
     */
    public function hydrateMemo(Component $component, ComponentStore $store, array $memo): void
    {
        $stores = $memo['stores'] ?? null;

        if (! is_array($stores) || empty($stores)) {
            $component->restoreDeclaredStores([]);

            return;
        }

        $registry = app(SynthesizerRegistry::class);
        $restored = [];

        foreach ($stores as $entry) {
            if (! is_array($entry)) {
                continue;
            }

            // Restore only stores declared from component context.
            // Global stores declared via LiVue::createStore() are re-provided by manager.
            if (($entry['source'] ?? null) !== 'component') {
                continue;
            }

            $state = $entry['state'] ?? [];
            if (is_array($state)) {
                [$hydrated] = $registry->hydrateState($state);
                $entry['state'] = $hydrated;
            }

            $restored[] = $entry;
        }

        $component->restoreDeclaredStores($restored);
    }

    /**
     * Contribute merged global + component stores to snapshot memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        // Ensure component stores declared via defineStores() are available.
        $component->initializeDefinedStores();

        $manager = app(LiVueManager::class);
        $globalStores = $manager->getGlobalStores();
        $componentStores = $component->getDeclaredStores();

        if (empty($globalStores) && empty($componentStores)) {
            return [];
        }

        $registry = app(SynthesizerRegistry::class);

        $serialized = [];

        // Global first, component later (component can shadow by name in JS lookup).
        foreach ($globalStores as $entry) {
            if (! is_array($entry)) {
                continue;
            }

            $copy = $entry;
            $copy['source'] = 'manager';
            $state = $copy['state'] ?? [];

            if (is_array($state)) {
                $copy['state'] = $registry->dehydrateState($state);
            } else {
                $copy['state'] = [];
            }

            $serialized[] = $copy;
        }

        foreach ($componentStores as $entry) {
            if (! is_array($entry)) {
                continue;
            }

            $copy = $entry;
            $copy['source'] = 'component';
            $state = $copy['state'] ?? [];

            if (is_array($state)) {
                $copy['state'] = $registry->dehydrateState($state);
            } else {
                $copy['state'] = [];
            }

            $serialized[] = $copy;
        }

        if (empty($serialized)) {
            return [];
        }

        return ['stores' => $serialized];
    }
}
