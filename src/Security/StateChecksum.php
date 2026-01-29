<?php

namespace LiVue\Security;

class StateChecksum
{
    /**
     * Generate an HMAC-SHA256 checksum for a component's state.
     * This prevents the client from tampering with state values
     * that were not originally set by the server.
     */
    public static function generate(string $componentName, array $state): string
    {
        $normalized = static::normalize($state);
        $payload = $componentName . ':' . json_encode($normalized, JSON_THROW_ON_ERROR);

        return hash_hmac('sha256', $payload, static::getKey());
    }

    /**
     * Verify that a checksum matches the given component name and state.
     */
    public static function verify(string $componentName, array $state, string $checksum): bool
    {
        $expected = static::generate($componentName, $state);

        return hash_equals($expected, $checksum);
    }

    /**
     * Normalize state for consistent checksums.
     * Mirrors Laravel's ConvertEmptyStringsToNull middleware:
     * empty strings become null so the checksum matches
     * what the client sends through the middleware.
     */
    protected static function normalize(array $state): array
    {
        return array_map(function ($value) {
            if (is_string($value) && $value === '') {
                return null;
            }
            if (is_array($value)) {
                return static::normalize($value);
            }

            return $value;
        }, $state);
    }

    /**
     * Get the HMAC key from the application key.
     */
    protected static function getKey(): string
    {
        $key = config('app.key');

        // Strip the base64: prefix if present
        if (str_starts_with($key, 'base64:')) {
            $key = base64_decode(substr($key, 7));
        }

        return $key;
    }
}
