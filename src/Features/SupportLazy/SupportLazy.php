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
 * Detects #[Lazy] and #[Defer] attributes on components and includes
 * loading configuration in the snapshot memo for the JS runtime.
 *
 * #[Lazy] - Loads when component enters viewport (IntersectionObserver)
 * #[Lazy(onLoad: true)] - Loads immediately after page load
 * #[Defer] - Alias for immediate load after page load (DOMContentLoaded)
 * #[Defer(bundle: true)] - Bundle with other deferred components in single request
 */
class SupportLazy extends ComponentHook
{
    public static function provide(): void
    {
        View::addNamespace('livue', __DIR__ . '/views');
    }

    /**
     * Cache for lazy/defer attribute lookup, keyed by class name.
     * Value is an array with 'type' and 'config', or null if neither attribute present.
     */
    private static array $lazyCache = [];

    /**
     * Boot hook: detect #[Lazy] or #[Defer] attribute and store configuration.
     */
    public function boot(Component $component, ComponentStore $store): void
    {
        $config = $this->getLoadingConfig($component);

        if ($config !== null) {
            $store->set('lazy', true);
            $store->set('lazyConfig', $config);
        }
    }

    /**
     * Contribute lazy/defer configuration to snapshot memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        if (!$store->get('lazy')) {
            return [];
        }

        return [
            'lazy' => $store->get('lazyConfig'),
        ];
    }

    /**
     * Get the loading configuration from #[Lazy] or #[Defer] attribute.
     *
     * Returns array with:
     * - onLoad: bool - true to load immediately after page load
     * - bundle: bool - true to bundle with other deferred components
     * - placeholder: ?string - custom placeholder view
     */
    private function getLoadingConfig(Component $component): ?array
    {
        $className = get_class($component);

        if (array_key_exists($className, self::$lazyCache)) {
            return self::$lazyCache[$className];
        }

        $reflection = new ReflectionClass($component);

        // Check for #[Defer] first (more specific)
        $deferAttrs = $reflection->getAttributes(Defer::class);
        if (!empty($deferAttrs)) {
            /** @var Defer $defer */
            $defer = $deferAttrs[0]->newInstance();

            return self::$lazyCache[$className] = [
                'onLoad' => true, // Defer always loads on page load
                'bundle' => $defer->bundle,
                'placeholder' => $defer->placeholder ?? 'livue::placeholders.default',
            ];
        }

        // Check for #[Lazy]
        $lazyAttrs = $reflection->getAttributes(Lazy::class);
        if (!empty($lazyAttrs)) {
            /** @var Lazy $lazy */
            $lazy = $lazyAttrs[0]->newInstance();

            return self::$lazyCache[$className] = [
                'onLoad' => $lazy->onLoad,
                'bundle' => false, // Lazy doesn't support bundling
                'placeholder' => $lazy->placeholder ?? 'livue::placeholders.default',
            ];
        }

        return self::$lazyCache[$className] = null;
    }

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
