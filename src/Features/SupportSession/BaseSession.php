<?php

namespace LiVue\Features\SupportSession;

use Attribute;

/**
 * Persist a property value in the user's session.
 *
 * When a property is marked with #[Session], its value is automatically
 * saved to the session whenever it changes, and restored from the session
 * when the component mounts.
 *
 * Usage:
 *   #[Session]
 *   public string $search = '';
 *
 *   #[Session(key: 'user_search')]
 *   public string $search = '';
 *
 * Dynamic keys with property interpolation:
 *   #[Session(key: 'search-{category}')]
 *   public string $search = '';
 *
 * Notes:
 * - Unlike #[Url], session values are NOT visible in the browser URL
 * - Unlike #[Url], session values are NOT shareable via link
 * - Avoid storing large objects; use IDs and fetch from database instead
 * - Session data persists across page refreshes and browser sessions
 */
#[Attribute(Attribute::TARGET_PROPERTY)]
class BaseSession
{
    public function __construct(
        /**
         * Custom session key. If null, uses 'livue.{component}.{property}'.
         * Supports property interpolation: 'search-{category}' will resolve
         * property values from the component.
         */
        public ?string $key = null,
    ) {}
}
