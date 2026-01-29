<?php

namespace LiVue\Synthesizers;

class SynthesizerRegistry
{
    /**
     * Ordered list of registered synthesizers.
     *
     * @var PropertySynthesizer[]
     */
    protected array $synthesizers = [];

    /**
     * Map of synth short keys to registered instances.
     * Built dynamically from register() calls.
     *
     * @var array<string, PropertySynthesizer>
     */
    protected array $keyMap = [];

    /**
     * Register a synthesizer instance.
     * The synth's key() is used to populate the keyMap for hydration lookups.
     */
    public function register(PropertySynthesizer $synth): void
    {
        $this->synthesizers[] = $synth;
        $this->keyMap[$synth->key()] = $synth;
    }

    /**
     * Find the synthesizer that matches a value.
     * Returns null for scalar/array values that need no synthesis.
     */
    public function match(mixed $value): ?PropertySynthesizer
    {
        foreach ($this->synthesizers as $synth) {
            if ($synth->match($value)) {
                return $synth;
            }
        }

        return null;
    }

    /**
     * Dehydrate a single value.
     * Returns [plain_value, meta] if a synthesizer matches,
     * or [value, null] if no synthesis needed.
     */
    public function dehydrateValue(mixed $value, string $property): array
    {
        $synth = $this->match($value);

        if ($synth === null) {
            return [$value, null];
        }

        return $synth->dehydrate($value, $property);
    }

    /**
     * Hydrate a single value using its type metadata.
     */
    public function hydrateValue(mixed $value, array $meta, string $property): mixed
    {
        $synth = $this->findBySynthKey($meta['s'] ?? null);

        if ($synth === null) {
            return $value;
        }

        return $synth->hydrate($value, $meta, $property);
    }

    // -----------------------------------------------------------------
    //  Inline tuple format: [value, {s: '...', ...}]
    // -----------------------------------------------------------------

    /**
     * Check if a value is a synthesizer tuple [value, {s: '...'}].
     */
    public static function isTuple(mixed $value): bool
    {
        return is_array($value)
            && array_key_exists(0, $value)
            && array_key_exists(1, $value)
            && count($value) === 2
            && is_array($value[1])
            && isset($value[1]['s']);
    }

    /**
     * Dehydrate an entire state array.
     * Synthesized values are wrapped as inline tuples [value, meta].
     * Plain values are left as-is.
     */
    public function dehydrateState(array $state): array
    {
        $dehydrated = [];

        foreach ($state as $key => $value) {
            [$plain, $meta] = $this->dehydrateValue($value, $key);

            if ($meta !== null) {
                // Wrap as inline tuple
                $dehydrated[$key] = [$plain, $meta];
            } else {
                $dehydrated[$key] = $plain;
            }
        }

        return $dehydrated;
    }

    /**
     * Hydrate an entire state array by detecting inline tuples.
     * Returns [hydrated_state, types_map] where types_map tracks
     * which properties had synthesizer metadata (for diff processing).
     *
     * @return array{0: array, 1: array} [hydrated_state, types_map]
     */
    public function hydrateState(array $state): array
    {
        $hydrated = [];
        $types = [];

        foreach ($state as $key => $value) {
            if (static::isTuple($value)) {
                $types[$key] = $value[1];
                $hydrated[$key] = $this->hydrateValue($value[0], $value[1], $key);
            } else {
                $hydrated[$key] = $value;
            }
        }

        return [$hydrated, $types];
    }

    /**
     * Extract flat (unwrapped) values from a state with inline tuples.
     * Returns [flat_values, types_map].
     * Used to get the plain representation for diff processing.
     *
     * @return array{0: array, 1: array} [flat_values, types_map]
     */
    public function unwrapState(array $state): array
    {
        $flat = [];
        $types = [];

        foreach ($state as $key => $value) {
            if (static::isTuple($value)) {
                $flat[$key] = $value[0];
                $types[$key] = $value[1];
            } else {
                $flat[$key] = $value;
            }
        }

        return [$flat, $types];
    }

    /**
     * Find a synthesizer by its short key (e.g., 'mdl', 'crb', 'enm', 'clc').
     */
    protected function findBySynthKey(?string $key): ?PropertySynthesizer
    {
        if ($key === null) {
            return null;
        }

        return $this->keyMap[$key] ?? null;
    }
}
