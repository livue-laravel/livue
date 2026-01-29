<?php

namespace LiVue\Synthesizers;

abstract class PropertySynthesizer
{
    /**
     * Short key that identifies this synthesizer in inline tuples.
     * Must be unique across all registered synthesizers.
     * Example: 'mdl', 'crb', 'enm', 'clc'.
     */
    abstract public function key(): string;

    /**
     * Whether this synthesizer handles the given value.
     * Called during dehydration to find the right synthesizer.
     */
    abstract public function match(mixed $value): bool;

    /**
     * Convert a PHP value to a JSON-safe representation.
     *
     * @param  mixed  $value     The PHP value (e.g., Model, Carbon, Enum)
     * @param  string $property  The property name (for error context)
     * @return array{0: mixed, 1: array}  [plain_value, type_metadata]
     */
    abstract public function dehydrate(mixed $value, string $property): array;

    /**
     * Reconstruct a PHP value from its dehydrated form and type metadata.
     *
     * @param  mixed  $value     The dehydrated (plain) value
     * @param  array  $meta      The inline tuple metadata {s: '...', ...}
     * @param  string $property  The property name (for error context)
     * @return mixed             The reconstructed PHP value
     */
    abstract public function hydrate(mixed $value, array $meta, string $property): mixed;
}
