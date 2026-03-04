<?php

namespace LiVue\Features\SupportStores;

use LiVue\Component;

/**
 * Normalizes PHP store definitions into a serializable shape for snapshot memo.
 *
 * Accepted inputs:
 * - state shorthand:
 *     ['count' => 0]
 * - config array:
 *     ['state' => ['count' => 0], 'bridge' => ['count' => 'serverCount']]
 * - resolver:
 *     fn () => [...]
 */
class StoreDefinition
{
    /**
     * @param array|callable $definition
     */
    public static function normalize(string $name, array|callable $definition, string $scope, ?Component $component = null): array
    {
        if ($name === '') {
            throw new \InvalidArgumentException('Store name must be a non-empty string.');
        }

        $resolved = self::resolveCallable($definition, $component);

        if (! is_array($resolved)) {
            throw new \InvalidArgumentException("Store [{$name}] definition must resolve to an array.");
        }

        $config = self::looksLikeConfig($resolved)
            ? $resolved
            : ['state' => $resolved];

        $state = $config['state'] ?? [];
        $state = self::resolveCallable($state, $component);

        if (! is_array($state)) {
            throw new \InvalidArgumentException("Store [{$name}] state must be an array.");
        }

        $normalized = [
            'name' => $name,
            'scope' => $scope === 'global' ? 'global' : 'component',
            'state' => $state,
        ];

        if (isset($config['bridge'])) {
            $bridge = self::normalizeBridge($config['bridge']);
            if (! empty($bridge)) {
                $normalized['bridge'] = $bridge;
            }
        }

        return $normalized;
    }

    private static function looksLikeConfig(array $value): bool
    {
        return array_key_exists('state', $value)
            || array_key_exists('bridge', $value);
    }

    private static function normalizeBridge(mixed $bridge): array
    {
        if (! is_array($bridge)) {
            return [];
        }

        $normalized = [];
        $allowedModes = ['two-way', 'store-to-state', 'state-to-store'];

        foreach ($bridge as $storeKey => $rule) {
            if (! is_string($storeKey) || $storeKey === '') {
                continue;
            }

            if (is_string($rule) && $rule !== '') {
                $normalized[$storeKey] = [
                    'prop' => $rule,
                    'mode' => 'two-way',
                ];
                continue;
            }

            if (! is_array($rule)) {
                continue;
            }

            $prop = $rule['prop'] ?? null;
            if (! is_string($prop) || $prop === '') {
                continue;
            }

            $mode = $rule['mode'] ?? 'two-way';
            if (! in_array($mode, $allowedModes, true)) {
                $mode = 'two-way';
            }

            $normalized[$storeKey] = [
                'prop' => $prop,
                'mode' => $mode,
            ];
        }

        return $normalized;
    }

    private static function resolveCallable(mixed $value, ?Component $component): mixed
    {
        if (is_array($value) || ! is_callable($value)) {
            return $value;
        }

        if ($value instanceof \Closure && $component !== null) {
            $value = $value->bindTo($component, get_class($component));
        }

        return $value();
    }
}
