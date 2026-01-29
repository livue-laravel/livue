<?php

namespace LiVue\Features\SupportPersistentMiddleware;

use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;

/**
 * Persistent Middleware Support.
 *
 * This feature captures the authorization middleware from the initial page request
 * and re-applies them on subsequent AJAX updates. This protects against scenarios
 * where a user's permissions change after the page load but they still have an
 * open browser tab.
 *
 * Example scenario this prevents:
 * 1. User loads admin page with `can:manage-users` middleware
 * 2. Admin revokes user's permission
 * 3. User (still on the page) clicks a button
 * 4. Without persistent middleware: action succeeds (dangerous!)
 * 5. With persistent middleware: action fails with 403 (safe!)
 */
class SupportPersistentMiddleware extends ComponentHook
{
    /**
     * Middleware that should be re-applied on subsequent requests.
     * These are security-related middleware that check authorization.
     */
    protected static array $persistentMiddleware = [
        'auth',
        'auth.basic',
        'can',
        'password.confirm',
        'verified',
        'signed',
    ];

    /**
     * Custom middleware registered by the application.
     */
    protected static array $customPersistentMiddleware = [];

    /**
     * Register custom middleware as persistent.
     * Call this in your AppServiceProvider.
     */
    public static function addPersistentMiddleware(array $middleware): void
    {
        static::$customPersistentMiddleware = array_merge(
            static::$customPersistentMiddleware,
            $middleware
        );
    }

    /**
     * Get all persistent middleware names.
     */
    public static function getPersistentMiddleware(): array
    {
        return array_merge(
            static::$persistentMiddleware,
            static::$customPersistentMiddleware
        );
    }

    /**
     * Add persistent middleware info to the memo during dehydration.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $route = request()->route();

        if (! $route instanceof Route) {
            return [];
        }

        $middleware = $this->extractPersistentMiddleware($route);

        if (empty($middleware)) {
            return [];
        }

        return ['persistentMiddleware' => $middleware];
    }

    /**
     * Extract middleware that should persist from the route.
     * Returns only security-related middleware with their parameters.
     */
    protected function extractPersistentMiddleware(Route $route): array
    {
        $routeMiddleware = $route->gatherMiddleware();
        $persistent = [];

        foreach ($routeMiddleware as $middleware) {
            $name = $this->getMiddlewareName($middleware);

            if ($this->isPersistent($name)) {
                $persistent[] = $middleware;
            }
        }

        return $persistent;
    }

    /**
     * Get the middleware name (without parameters).
     */
    protected function getMiddlewareName(string $middleware): string
    {
        if (str_contains($middleware, ':')) {
            return explode(':', $middleware, 2)[0];
        }

        return $middleware;
    }

    /**
     * Check if a middleware should be persistent.
     */
    protected function isPersistent(string $name): bool
    {
        $allPersistent = static::getPersistentMiddleware();

        return in_array($name, $allPersistent);
    }

    /**
     * Re-apply persistent middleware from the memo.
     * Returns true if all checks pass, throws exception on failure.
     *
     * @throws \Illuminate\Auth\AuthenticationException
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public static function applyMiddleware(array $memo, Request $request): void
    {
        $middleware = $memo['persistentMiddleware'] ?? [];

        if (empty($middleware)) {
            return;
        }

        foreach ($middleware as $middlewareString) {
            static::applyMiddlewareCheck($middlewareString, $request);
        }
    }

    /**
     * Apply a single middleware check.
     *
     * @throws \Illuminate\Auth\AuthenticationException
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    protected static function applyMiddlewareCheck(string $middleware, Request $request): void
    {
        [$name, $parameters] = static::parseMiddleware($middleware);

        match ($name) {
            'auth' => static::checkAuth($parameters),
            'can' => static::checkCan($parameters, $request),
            'verified' => static::checkVerified(),
            default => null, // Other middleware handled differently
        };
    }

    /**
     * Parse middleware string into name and parameters.
     */
    protected static function parseMiddleware(string $middleware): array
    {
        if (str_contains($middleware, ':')) {
            [$name, $params] = explode(':', $middleware, 2);

            return [$name, explode(',', $params)];
        }

        return [$middleware, []];
    }

    /**
     * Check 'auth' middleware - user must be authenticated.
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    protected static function checkAuth(array $guards): void
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                Auth::shouldUse($guard);

                return;
            }
        }

        throw new \Illuminate\Auth\AuthenticationException(
            'Unauthenticated.',
            $guards
        );
    }

    /**
     * Check 'can' middleware - user must have the ability.
     * Format: can:ability,model (e.g., can:update,post)
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    protected static function checkCan(array $parameters, Request $request): void
    {
        if (empty($parameters)) {
            return;
        }

        $ability = $parameters[0];
        $models = array_slice($parameters, 1);

        // If no model specified, just check the ability
        if (empty($models)) {
            $gate = app(Gate::class);

            if (! $gate->check($ability)) {
                throw new \Illuminate\Auth\Access\AuthorizationException(
                    "This action is unauthorized."
                );
            }

            return;
        }

        // With model, resolve and authorize
        $gate = app(Gate::class);
        $arguments = static::resolveGateArguments($models, $request);

        if (! $gate->check($ability, $arguments)) {
            throw new \Illuminate\Auth\Access\AuthorizationException(
                "This action is unauthorized."
            );
        }
    }

    /**
     * Resolve gate arguments (models) from the request.
     */
    protected static function resolveGateArguments(array $models, Request $request): array
    {
        $arguments = [];

        foreach ($models as $model) {
            // Try to get from route parameters first
            if ($request->route($model)) {
                $arguments[] = $request->route($model);
            } else {
                // Otherwise, treat as class name
                $arguments[] = $model;
            }
        }

        return $arguments;
    }

    /**
     * Check 'verified' middleware - user email must be verified.
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    protected static function checkVerified(): void
    {
        $user = Auth::user();

        if (! $user || ! method_exists($user, 'hasVerifiedEmail')) {
            return;
        }

        if (! $user->hasVerifiedEmail()) {
            throw new \Illuminate\Auth\Access\AuthorizationException(
                "Your email address is not verified."
            );
        }
    }
}
