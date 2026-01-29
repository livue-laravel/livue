<?php

namespace LiVue\Synthesizers;

class EnumSynth extends PropertySynthesizer
{
    public function key(): string
    {
        return 'enm';
    }

    public function match(mixed $value): bool
    {
        return $value instanceof \BackedEnum;
    }

    /**
     * Dehydrate: BackedEnum → [backing_value, {s, class}]
     */
    public function dehydrate(mixed $value, string $property): array
    {
        /** @var \BackedEnum $value */
        $meta = [
            's' => 'enm',
            'class' => get_class($value),
        ];

        return [$value->value, $meta];
    }

    /**
     * Hydrate: reconstruct the enum from its backing value.
     */
    public function hydrate(mixed $value, array $meta, string $property): mixed
    {
        $class = $meta['class'];

        if (! enum_exists($class) || ! is_subclass_of($class, \BackedEnum::class)) {
            throw new \InvalidArgumentException(
                "Invalid enum class [{$class}] for property [{$property}]."
            );
        }

        return $class::from($value);
    }
}
