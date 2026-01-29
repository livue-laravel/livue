<?php

namespace LiVue\Features\SupportTabSync;

use LiVue\Attributes\TabSync;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use ReflectionClass;

/**
 * Tab synchronization lifecycle hook.
 *
 * Detects if a component has the #[TabSync] attribute and includes
 * the configuration in the memo, so the JS runtime can enable
 * cross-tab synchronization via BroadcastChannel.
 */
class SupportTabSync extends ComponentHook
{
    /**
     * Cache for TabSync attribute detection.
     *
     * @var array<string, array|null>
     */
    private static array $tabSyncCache = [];

    /**
     * Contribute tab sync configuration to the snapshot memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $config = $this->getTabSyncConfig($component);

        if ($config === null) {
            return [];
        }

        return ['tabSync' => $config];
    }

    /**
     * Get the TabSync configuration for a component.
     *
     * @param Component $component
     * @return array|null Null if no #[TabSync] attribute
     */
    private function getTabSyncConfig(Component $component): ?array
    {
        $className = get_class($component);

        if (array_key_exists($className, self::$tabSyncCache)) {
            return self::$tabSyncCache[$className];
        }

        $reflection = new ReflectionClass($component);
        $attrs = $reflection->getAttributes(TabSync::class);

        if (empty($attrs)) {
            self::$tabSyncCache[$className] = null;

            return null;
        }

        /** @var TabSync $instance */
        $instance = $attrs[0]->newInstance();

        self::$tabSyncCache[$className] = [
            'enabled' => true,
            'only' => $instance->only,
            'except' => $instance->except,
            'reactive' => $instance->reactive,
        ];

        return self::$tabSyncCache[$className];
    }

    /**
     * Check if a component has TabSync enabled.
     *
     * @param Component $component
     * @return bool
     */
    public static function hasTabSync(Component $component): bool
    {
        $className = get_class($component);

        if (array_key_exists($className, self::$tabSyncCache)) {
            return self::$tabSyncCache[$className] !== null;
        }

        $reflection = new ReflectionClass($component);
        $attrs = $reflection->getAttributes(TabSync::class);

        return ! empty($attrs);
    }
}
