<?php

namespace LiVue\Features\SupportComposables;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

/**
 * Mark a method as a composable.
 *
 * Composables are methods that return an array of data and actions.
 * Data values become reactive in Vue templates, and callable values
 * (closures) become actions that can be called via livue.call().
 *
 * The composable method name follows the convention useXxx() which
 * exposes data under the 'xxx' namespace (e.g., useAuth -> auth.*).
 *
 * Options:
 *   - as: Override the default namespace derivation
 *
 * Example:
 *   #[Composable]
 *   public function useAuth(): array
 *   {
 *       return [
 *           'user' => auth()->user(),
 *           'isAuthenticated' => auth()->check(),
 *           'logout' => fn() => auth()->logout(),
 *       ];
 *   }
 *
 *   #[Composable(as: 'user')]
 *   public function useAuth(): array { ... }
 *
 * Template access:
 *   {{ auth.user.name }}
 *   <button @click="auth.logout()">Logout</button>
 *   <button @click="livue.call('auth.logout')">Logout</button>
 */
#[Attribute(Attribute::TARGET_METHOD)]
class BaseComposable extends LiVueAttribute
{
    public function __construct(
        public ?string $as = null,
    ) {}
}
