<?php

namespace LiVue\Attributes;

use Attribute;

/**
 * Bind a component property to the URL query string.
 *
 * Changes to the property update the URL, and the URL initializes the property on page load.
 *
 * Options:
 *   - as: Alias for the query parameter name (default: property name)
 *   - history: Use pushState instead of replaceState (adds browser history entries)
 *   - keep: Always show in URL, even when empty
 *   - except: Value to exclude from URL (when the property equals this value, remove the param)
 *
 * Example:
 *   #[Url]
 *   public string $search = '';
 *
 *   #[Url(as: 'q', history: true)]
 *   public string $query = '';
 *
 *   #[Url(except: 'all')]
 *   public string $filter = 'all';
 */
#[Attribute(Attribute::TARGET_PROPERTY)]
class Url
{
    public function __construct(
        public ?string $as = null,
        public bool $history = false,
        public bool $keep = false,
        public mixed $except = null,
    ) {}
}
