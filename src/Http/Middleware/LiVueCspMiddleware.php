<?php

namespace LiVue\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

/**
 * CSP Nonce Middleware.
 *
 * Generates a unique nonce for each request and makes it available
 * to LiVue for use in inline scripts. This allows using a strict
 * Content Security Policy without 'unsafe-inline'.
 *
 * Usage:
 * 1. Add this middleware to your web middleware group
 * 2. Enable CSP nonce in config/livue.php: 'csp_nonce' => true
 * 3. Use the nonce in your CSP header: script-src 'nonce-{nonce}'
 *
 * Example middleware registration (app/Http/Kernel.php):
 *   'web' => [
 *       // ... other middleware
 *       \LiVue\Http\Middleware\LiVueCspMiddleware::class,
 *   ],
 *
 * Example CSP header (in a middleware or response):
 *   $nonce = \LiVue\Facades\LiVue::getNonce();
 *   $response->headers->set(
 *       'Content-Security-Policy',
 *       "script-src 'nonce-{$nonce}' 'strict-dynamic'"
 *   );
 */
class LiVueCspMiddleware
{
    /**
     * The generated nonce for this request.
     */
    protected static ?string $nonce = null;

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Generate a new nonce for this request
        static::$nonce = $this->generateNonce();

        // Store it in the container for access throughout the request
        app()->instance('livue.nonce', static::$nonce);

        return $next($request);
    }

    /**
     * Generate a cryptographically secure nonce.
     */
    protected function generateNonce(): string
    {
        return base64_encode(random_bytes(16));
    }

    /**
     * Get the current request's nonce.
     */
    public static function getNonce(): ?string
    {
        // First check static cache
        if (static::$nonce !== null) {
            return static::$nonce;
        }

        // Fall back to container
        if (app()->bound('livue.nonce')) {
            return app('livue.nonce');
        }

        return null;
    }

    /**
     * Set a custom nonce (for testing or manual nonce generation).
     */
    public static function setNonce(string $nonce): void
    {
        static::$nonce = $nonce;
        app()->instance('livue.nonce', $nonce);
    }

    /**
     * Clear the nonce (useful between tests).
     */
    public static function clearNonce(): void
    {
        static::$nonce = null;

        if (app()->bound('livue.nonce')) {
            app()->forgetInstance('livue.nonce');
        }
    }
}
