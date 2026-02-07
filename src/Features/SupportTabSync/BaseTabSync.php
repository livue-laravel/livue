<?php

namespace LiVue\Features\SupportTabSync;

use Attribute;

/**
 * Enable cross-tab state synchronization for this component.
 *
 * When a component's state changes in one browser tab, other tabs
 * with the same component type will receive the update automatically.
 *
 * Options:
 *   - only: Only sync these specific properties
 *   - except: Sync all properties except these
 *   - reactive: Properties that trigger a server refresh (for Blade-rendered values)
 *
 * Usage:
 *   #[TabSync]                                    // Sync all, Vue-only update
 *   #[TabSync(only: ['items', 'total'])]          // Only sync items and total
 *   #[TabSync(except: ['tempData'])]              // Sync all except tempData
 *   #[TabSync(reactive: ['count', 'items'])]      // Server refresh for count/items
 *   #[TabSync(reactive: true)]                    // Server refresh for all synced props
 */
#[Attribute(Attribute::TARGET_CLASS)]
class BaseTabSync
{
    public function __construct(
        public ?array $only = null,
        public ?array $except = null,
        public array|bool $reactive = false,
    ) {
    }
}
