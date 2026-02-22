<?php

namespace LiVue\Features\SupportLazy;

use Illuminate\Support\Facades\View;
use LiVue\Attributes\Defer;
use LiVue\Attributes\Lazy;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use ReflectionClass;

/**
 * Feature hook for lazy and deferred loading support.
 *
 * Provides view namespace registration and static helper methods
 * used by LiVueManager to detect and configure lazy/deferred components.
 *
 * Lifecycle logic (dehydrateMemo) is handled by BaseLazy and BaseDefer
 * attributes directly via SupportAttributes dispatcher.
 */
class SupportLazy extends ComponentHook
{
    public static function provide(): void
    {
        View::addNamespace('livue', __DIR__ . '/views');
    }

    /**
     * Cache for lazy/defer attribute lookup, keyed by class name.
     * Value is an array with config, or null if neither attribute present.
     */
    private static array $lazyCache = [];

    /**
     * Check if a component class has #[Lazy] or #[Defer] attribute.
     */
    public static function isLazy(Component $component): bool
    {
        $className = get_class($component);

        if (array_key_exists($className, self::$lazyCache)) {
            return self::$lazyCache[$className] !== null;
        }

        $reflection = new ReflectionClass($component);

        // Check for #[Defer]
        $deferAttrs = $reflection->getAttributes(Defer::class);
        if (!empty($deferAttrs)) {
            /** @var Defer $defer */
            $defer = $deferAttrs[0]->newInstance();
            self::$lazyCache[$className] = [
                'onLoad' => true,
                'bundle' => $defer->bundle,
                'placeholder' => $defer->placeholder ?? 'livue::placeholders.default',
            ];
            return true;
        }

        // Check for #[Lazy]
        $lazyAttrs = $reflection->getAttributes(Lazy::class);
        if (!empty($lazyAttrs)) {
            /** @var Lazy $lazy */
            $lazy = $lazyAttrs[0]->newInstance();
            self::$lazyCache[$className] = [
                'onLoad' => $lazy->onLoad,
                'bundle' => false,
                'placeholder' => $lazy->placeholder ?? 'livue::placeholders.default',
            ];
            return true;
        }

        self::$lazyCache[$className] = null;
        return false;
    }

    /**
     * Get lazy/defer configuration for a component.
     */
    public static function getLazyConfig(Component $component): ?array
    {
        $className = get_class($component);

        if (array_key_exists($className, self::$lazyCache)) {
            return self::$lazyCache[$className];
        }

        // Trigger cache population
        self::isLazy($component);

        return self::$lazyCache[$className];
    }
}
