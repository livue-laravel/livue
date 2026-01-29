<?php

namespace LiVue\Synthesizers;

use Illuminate\Database\Eloquent\Model;

class EloquentModelSynth extends PropertySynthesizer
{
    public function key(): string
    {
        return 'mdl';
    }

    public function match(mixed $value): bool
    {
        return $value instanceof Model;
    }

    /**
     * Dehydrate: Model → [attributes_array, {s, class, key}]
     */
    public function dehydrate(mixed $value, string $property): array
    {
        /** @var Model $value */
        $meta = [
            's' => 'mdl',
            'class' => get_class($value),
            'key' => $value->getKey(),
        ];

        return [$value->toArray(), $meta];
    }

    /**
     * Hydrate: fetch the model from DB by key.
     * Security: never trust client attributes — always re-fetch.
     */
    public function hydrate(mixed $value, array $meta, string $property): mixed
    {
        $class = $meta['class'];
        $key = $meta['key'];

        if (! class_exists($class) || ! is_subclass_of($class, Model::class)) {
            throw new \InvalidArgumentException(
                "Invalid model class [{$class}] for property [{$property}]."
            );
        }

        return $class::findOrFail($key);
    }
}
