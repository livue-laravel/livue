<?php

namespace LiVue\Synthesizers;

use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Carbon\CarbonInterface;

class CarbonSynth extends PropertySynthesizer
{
    public function key(): string
    {
        return 'crb';
    }

    public function match(mixed $value): bool
    {
        return $value instanceof CarbonInterface;
    }

    /**
     * Dehydrate: Carbon → [iso8601_string, {s, immutable?}]
     */
    public function dehydrate(mixed $value, string $property): array
    {
        /** @var CarbonInterface $value */
        $meta = ['s' => 'crb'];

        if ($value instanceof CarbonImmutable) {
            $meta['immutable'] = true;
        }

        return [$value->toIso8601String(), $meta];
    }

    /**
     * Hydrate: parse ISO 8601 string back to Carbon or CarbonImmutable.
     */
    public function hydrate(mixed $value, array $meta, string $property): mixed
    {
        if (! is_string($value)) {
            throw new \InvalidArgumentException(
                "Expected string for Carbon property [{$property}], got " . gettype($value) . '.'
            );
        }

        if (! empty($meta['immutable'])) {
            return CarbonImmutable::parse($value);
        }

        return Carbon::parse($value);
    }
}
