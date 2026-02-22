<?php

namespace LiVue\Features\SupportTabSync;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

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
class BaseTabSync extends LiVueAttribute
{
    public function __construct(
        public ?array $only = null,
        public ?array $except = null,
        public array|bool $reactive = false,
    ) {
    }

    /**
     * Contribute tab sync configuration to snapshot memo.
     */
    public function dehydrateMemo(): array
    {
        return ['tabSync' => [
            'enabled' => true,
            'only' => $this->only,
            'except' => $this->except,
            'reactive' => $this->reactive,
        ]];
    }
}
