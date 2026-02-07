<?php

namespace LiVue\Features\SupportComputed;

use Attribute;

/**
 * Mark a method as a computed property.
 *
 * Computed properties are accessed as `$this->methodName` (via __get magic)
 * and are cached for the duration of the request by default.
 *
 * Options:
 *   - persist: Cache the result across requests using Laravel's cache
 *   - seconds: Cache TTL in seconds (default 3600, only with persist: true)
 *   - cache: Share cached value across all component instances (requires persist)
 *
 * Example:
 *   #[Computed]
 *   public function fullName() { return $this->first . ' ' . $this->last; }
 *
 *   #[Computed(persist: true, seconds: 7200)]
 *   public function expensiveQuery() { return DB::table(...)->get(); }
 *
 * Access: $this->fullName (not $this->fullName())
 * Clear cache: unset($this->fullName)
 */
#[Attribute(Attribute::TARGET_METHOD)]
class BaseComputed
{
    public function __construct(
        public bool $persist = false,
        public int $seconds = 3600,
        public bool $cache = false,
    ) {}
}
