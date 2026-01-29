<?php

namespace LiVue\Synthesizers;

use Illuminate\Support\Collection;

class CollectionSynth extends PropertySynthesizer
{
    /**
     * Reference to the registry for recursive synthesis of items.
     */
    private SynthesizerRegistry $registry;

    public function __construct(SynthesizerRegistry $registry)
    {
        $this->registry = $registry;
    }

    public function key(): string
    {
        return 'clc';
    }

    public function match(mixed $value): bool
    {
        return $value instanceof Collection;
    }

    /**
     * Dehydrate: Collection → [items_array, {s, class, items?}]
     *
     * Each item is individually dehydrated via the registry,
     * so a Collection of Models is handled recursively.
     */
    public function dehydrate(mixed $value, string $property): array
    {
        /** @var Collection $value */
        $items = [];
        $itemTypes = [];

        foreach ($value->values()->all() as $index => $item) {
            [$dehydrated, $itemMeta] = $this->registry->dehydrateValue($item, $property . '.' . $index);

            $items[] = $dehydrated;

            if ($itemMeta !== null) {
                $itemTypes[(string) $index] = $itemMeta;
            }
        }

        $meta = [
            's' => 'clc',
            'class' => get_class($value),
        ];

        if (! empty($itemTypes)) {
            $meta['items'] = $itemTypes;
        }

        return [$items, $meta];
    }

    /**
     * Hydrate: reconstruct the collection and each item via the registry.
     */
    public function hydrate(mixed $value, array $meta, string $property): mixed
    {
        $class = $meta['class'] ?? Collection::class;
        $itemTypes = $meta['items'] ?? [];

        if (! is_array($value)) {
            throw new \InvalidArgumentException(
                "Expected array for Collection property [{$property}], got " . gettype($value) . '.'
            );
        }

        $items = [];

        foreach ($value as $index => $item) {
            $indexStr = (string) $index;

            if (isset($itemTypes[$indexStr])) {
                $items[] = $this->registry->hydrateValue($item, $itemTypes[$indexStr], $property . '.' . $index);
            } else {
                $items[] = $item;
            }
        }

        if (! class_exists($class) || ! is_a($class, Collection::class, true)) {
            $class = Collection::class;
        }

        return new $class($items);
    }
}
