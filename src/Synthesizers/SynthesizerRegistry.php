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
     * Recursively processes nested arrays to dehydrate synthesizable
     * values at any depth (e.g., TemporaryUploadedFile inside form data).
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
                // Recurse into nested arrays to find synthesizable values
                $dehydrated[$key] = $this->dehydrateNested($plain, (string) $key);
            }
        }

        return $dehydrated;
    }

    /**
     * Recursively dehydrate synthesizable values within nested arrays.
     * Checks each nested value against registered synthesizers and wraps
     * matches as inline tuples. Plain values and scalars pass through as-is.
     */
    protected function dehydrateNested(mixed $value, string $path): mixed
    {
        if (! is_array($value)) {
            return $value;
        }

        $result = [];

        foreach ($value as $k => $v) {
            $childPath = $path . '.' . $k;
            [$plain, $meta] = $this->dehydrateValue($v, $childPath);

            if ($meta !== null) {
                $result[$k] = [$plain, $meta];
            } else {
                $result[$k] = $this->dehydrateNested($v, $childPath);
            }
        }

        return $result;
    }

    /**
     * Hydrate an entire state array by detecting inline tuples.
     * Returns [hydrated_state, types_map] where types_map tracks
     * which top-level properties had synthesizer metadata (for diff processing).
     * Recursively hydrates nested tuples at any depth.
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
                $hydrated[$key] = $this->hydrateNested($value, (string) $key);
            }
        }

        return [$hydrated, $types];
    }

    /**
     * Recursively hydrate inline tuples within nested arrays.
     */
    protected function hydrateNested(mixed $value, string $path): mixed
    {
        if (! is_array($value)) {
            return $value;
        }

        $result = [];

        foreach ($value as $k => $v) {
            if (static::isTuple($v)) {
                $result[$k] = $this->hydrateValue($v[0], $v[1], $path . '.' . $k);
            } else {
                $result[$k] = $this->hydrateNested($v, $path . '.' . $k);
            }
        }

        return $result;
    }

    /**
     * Extract flat (unwrapped) values from a state with inline tuples.
     * Returns [flat_values, types_map].
     * Used to get the plain representation for diff processing.
     * Recursively unwraps nested tuples at any depth.
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
                $flat[$key] = $this->unwrapNested($value);
            }
        }

        return [$flat, $types];
    }

    /**
     * Recursively unwrap inline tuples within nested arrays.
     */
    protected function unwrapNested(mixed $value): mixed
    {
        if (! is_array($value)) {
            return $value;
        }

        $result = [];

        foreach ($value as $k => $v) {
            if (static::isTuple($v)) {
                $result[$k] = $v[0];
            } else {
                $result[$k] = $this->unwrapNested($v);
            }
        }

        return $result;
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
