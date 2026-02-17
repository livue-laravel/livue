<?php

namespace LiVue;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Traits\Macroable;
use LiVue\Features\SupportAttributes\HandlesAttributes;
use LiVue\Features\SupportCasting\HandlesCasting;
use LiVue\Features\SupportComposables\HandlesComposables;
use LiVue\Features\SupportComputed\HandlesComputed;
use LiVue\Features\SupportDownloads\HandlesDownloads;
use LiVue\Features\SupportEvents\HandlesEvents;
use LiVue\Features\SupportForms\HandlesForms;
use LiVue\Features\SupportGuarded\HandlesGuarded;
use LiVue\Features\SupportHead\HandlesHead;
use LiVue\Features\SupportIsland\HandlesIsland;
use LiVue\Features\SupportJavascript\HandlesJavascript;
use LiVue\Features\SupportNavigation\HandlesNavigation;
use LiVue\Features\SupportRendering\HandlesRendering;
use LiVue\Features\SupportState\HandlesState;
use LiVue\Features\SupportValidation\HandlesValidation;
use LiVue\Features\SupportComposables\SupportComposables;
use ReflectionClass;
use ReflectionMethod;

abstract class Component
{
    use AuthorizesRequests;
    use HandlesAttributes;
    use HandlesCasting;
    use HandlesComposables;
    use HandlesComputed;
    use HandlesDownloads;
    use HandlesEvents;
    use HandlesForms;
    use HandlesGuarded;
    use HandlesHead;
    use HandlesIsland;
    use HandlesJavascript;
    use HandlesNavigation;
    use HandlesRendering;
    use HandlesState;
    use HandlesValidation;
    use Macroable;

    // ---------------------------------------------------------------
    //  Core properties
    // ---------------------------------------------------------------

    /**
     * Unique instance ID for this component.
     * Use getId() to access this value.
     */
    private string $__id;

    /**
     * Globally registered composables, keyed by namespace.
     *
     * @var array<string, \Closure>
     */
    protected static array $globalComposables = [];

    // ---------------------------------------------------------------
    //  Abstract methods
    // ---------------------------------------------------------------

    /**
     * Get the Blade view name for this component.
     */
    abstract protected function render(): string;

    // ---------------------------------------------------------------
    //  Constructor
    // ---------------------------------------------------------------

    public function __construct()
    {
        $this->__id = uniqid('livue-', true);
        $this->initializeHandlesValidation();
    }

    /**
     * Get the unique instance ID for this component.
     */
    public function getId(): string
    {
        return $this->__id;
    }

    /**
     * Set the component ID.
     * Used internally during hydration.
     */
    public function setId(string $id): void
    {
        $this->__id = $id;
    }

    // ---------------------------------------------------------------
    //  Component identity
    // ---------------------------------------------------------------

    /**
     * Get the component name.
     *
     * Returns the registered name (including hash-based names for components
     * resolved by class) if available, otherwise falls back to kebab-case
     * derived from the class short name.
     */
    public function getName(): string
    {
        // Check if this component class has a registered name
        $manager = app(LiVueManager::class);
        $registeredName = $manager->getNameForClass(static::class);

        if ($registeredName !== null) {
            return $registeredName;
        }

        // Fallback to kebab-case from class short name
        $class = (new ReflectionClass($this))->getShortName();

        return strtolower(preg_replace('/([a-z])([A-Z])/', '$1-$2', $class));
    }

    // ---------------------------------------------------------------
    //  Global composables
    // ---------------------------------------------------------------

    /**
     * Register a global composable available to all components.
     *
     * Closure-based:
     *   Component::use('auth', function () {
     *       return ['user' => auth()->user(), 'logout' => fn() => auth()->logout()];
     *   });
     *
     * Class-based:
     *   Component::use(UseAuth::class);
     *   Component::use(new UseAuth());
     */
    public static function use(string|object $nameOrClass, ?\Closure $composable = null): void
    {
        if ($composable !== null && is_string($nameOrClass)) {
            static::$globalComposables[$nameOrClass] = $composable;

            return;
        }

        $instance = is_string($nameOrClass) ? new $nameOrClass() : $nameOrClass;
        $reflection = new ReflectionClass($instance);

        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            $methodName = $method->getName();

            if (! str_starts_with($methodName, 'use') || strlen($methodName) <= 3) {
                continue;
            }

            if (str_starts_with($methodName, '__')) {
                continue;
            }

            $namespace = lcfirst(substr($methodName, 3));

            // Mixin pattern: call the method — it must return a Closure
            // that will be bound to the component at execution time.
            $closure = $method->invoke($instance);

            if ($closure instanceof \Closure) {
                static::$globalComposables[$namespace] = $closure;
            }
        }
    }

    /**
     * Get all globally registered composables.
     *
     * @return array<string, \Closure>
     */
    public static function getGlobalComposables(): array
    {
        return static::$globalComposables;
    }

    /**
     * Remove all globally registered composables.
     */
    public static function flushGlobalComposables(): void
    {
        static::$globalComposables = [];
        SupportComposables::flushCache();
    }
}
