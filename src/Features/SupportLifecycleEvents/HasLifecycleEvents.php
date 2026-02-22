<?php

namespace LiVue\Features\SupportLifecycleEvents;

use Illuminate\Contracts\Events\Dispatcher;
use LiVue\Attributes\ObservedBy;
use ReflectionClass;

trait HasLifecycleEvents
{
    /**
     * The event dispatcher instance.
     */
    protected static ?Dispatcher $dispatcher = null;

    /**
     * Track which classes have already resolved their #[ObservedBy] observers.
     *
     * @var array<string, bool>
     */
    protected static array $observersResolved = [];

    /**
     * Map lifecycle event names to custom event classes.
     * Override in component to dispatch custom event objects.
     *
     * Example: protected array $dispatchesEvents = ['mounted' => CounterMounted::class];
     *
     * @var array<string, string>
     */
    protected array $dispatchesEvents = [];

    /**
     * Additional observable event names beyond the standard lifecycle.
     *
     * @var string[]
     */
    protected array $observables = [];

    /**
     * All standard lifecycle event names.
     */
    protected const LIFECYCLE_EVENTS = [
        'booting',
        'booted',
        'mounting',
        'mounted',
        'hydrating',
        'hydrated',
        'calling',
        'called',
        'dehydrating',
        'dehydrated',
        'rendering',
        'rendered',
        'exception',
    ];

    /**
     * Initialize the HasLifecycleEvents trait.
     * Resolves #[ObservedBy] attributes once per class.
     */
    public function initializeHasLifecycleEvents(): void
    {
        $class = static::class;

        if (isset(static::$observersResolved[$class])) {
            return;
        }

        static::$observersResolved[$class] = true;

        $reflection = new ReflectionClass($class);
        $attributes = $reflection->getAttributes(ObservedBy::class);

        foreach ($attributes as $attribute) {
            $observedBy = $attribute->newInstance();

            foreach ($observedBy->classes as $observerClass) {
                static::observe($observerClass);
            }
        }
    }

    // -----------------------------------------------------------------
    //  Static registration methods
    // -----------------------------------------------------------------

    public static function booting(\Closure $callback): void
    {
        static::registerLifecycleEvent('booting', $callback);
    }

    public static function booted(\Closure $callback): void
    {
        static::registerLifecycleEvent('booted', $callback);
    }

    public static function mounting(\Closure $callback): void
    {
        static::registerLifecycleEvent('mounting', $callback);
    }

    public static function mounted(\Closure $callback): void
    {
        static::registerLifecycleEvent('mounted', $callback);
    }

    public static function hydrating(\Closure $callback): void
    {
        static::registerLifecycleEvent('hydrating', $callback);
    }

    public static function hydrated(\Closure $callback): void
    {
        static::registerLifecycleEvent('hydrated', $callback);
    }

    public static function calling(\Closure $callback): void
    {
        static::registerLifecycleEvent('calling', $callback);
    }

    public static function called(\Closure $callback): void
    {
        static::registerLifecycleEvent('called', $callback);
    }

    public static function dehydrating(\Closure $callback): void
    {
        static::registerLifecycleEvent('dehydrating', $callback);
    }

    public static function dehydrated(\Closure $callback): void
    {
        static::registerLifecycleEvent('dehydrated', $callback);
    }

    public static function onRendering(\Closure $callback): void
    {
        static::registerLifecycleEvent('rendering', $callback);
    }

    public static function onRendered(\Closure $callback): void
    {
        static::registerLifecycleEvent('rendered', $callback);
    }

    // -----------------------------------------------------------------
    //  Observer pattern
    // -----------------------------------------------------------------

    /**
     * Register one or more observer classes.
     *
     * @param  string|array|object  $classes
     */
    public static function observe(string|array|object $classes): void
    {
        $classes = is_array($classes) ? $classes : [$classes];

        foreach ($classes as $class) {
            static::registerObserver($class);
        }
    }

    /**
     * Register a single observer.
     */
    protected static function registerObserver(string|object $observer): void
    {
        $instance = is_string($observer) ? new $observer() : $observer;

        foreach (static::LIFECYCLE_EVENTS as $event) {
            if (method_exists($instance, $event)) {
                static::registerLifecycleEvent($event, function () use ($instance, $event) {
                    return $instance->{$event}(...func_get_args());
                });
            }
        }
    }

    // -----------------------------------------------------------------
    //  Event registration & firing
    // -----------------------------------------------------------------

    /**
     * Register a callback for a lifecycle event.
     */
    protected static function registerLifecycleEvent(string $event, \Closure $callback): void
    {
        if (! isset(static::$dispatcher)) {
            return;
        }

        $eventName = "livue.{$event}: " . static::class;

        static::$dispatcher->listen($eventName, $callback);
    }

    /**
     * Fire a lifecycle event.
     *
     * @param  string  $event  The event name (e.g., 'booting', 'mounted')
     * @param  bool    $halt   Whether the event is halting (can be cancelled)
     * @param  mixed   ...$extra  Additional arguments passed to callbacks
     * @return bool|null  For halting events: false if cancelled. Otherwise null.
     */
    public function fireLifecycleEvent(string $event, bool $halt = false, mixed ...$extra): bool|null
    {
        if (! isset(static::$dispatcher)) {
            return null;
        }

        // If $dispatchesEvents has a mapping, dispatch the custom event class
        if (isset($this->dispatchesEvents[$event])) {
            $eventClass = $this->dispatchesEvents[$event];
            static::$dispatcher->dispatch(new $eventClass($this, ...$extra));
        }

        // Fire the namespaced event
        $eventName = "livue.{$event}: " . static::class;
        $args = [$this, ...$extra];

        if ($halt) {
            $result = static::$dispatcher->until($eventName, $args);

            return $result === false ? false : null;
        }

        static::$dispatcher->dispatch($eventName, $args);

        return null;
    }

    // -----------------------------------------------------------------
    //  Utilities
    // -----------------------------------------------------------------

    /**
     * Execute a callback without firing lifecycle events.
     */
    public static function withoutLifecycleEvents(callable $callback): mixed
    {
        $dispatcher = static::getEventDispatcher();
        static::unsetEventDispatcher();

        try {
            return $callback();
        } finally {
            if ($dispatcher) {
                static::setEventDispatcher($dispatcher);
            }
        }
    }

    /**
     * Remove all registered lifecycle event listeners for this component class.
     */
    public static function flushLifecycleEventListeners(): void
    {
        if (! isset(static::$dispatcher)) {
            return;
        }

        $class = static::class;

        foreach (static::LIFECYCLE_EVENTS as $event) {
            static::$dispatcher->forget("livue.{$event}: {$class}");
        }

        static::$observersResolved = [];
    }

    /**
     * Get the event dispatcher instance.
     */
    public static function getEventDispatcher(): ?Dispatcher
    {
        return static::$dispatcher;
    }

    /**
     * Set the event dispatcher instance.
     */
    public static function setEventDispatcher(Dispatcher $dispatcher): void
    {
        static::$dispatcher = $dispatcher;
    }

    /**
     * Unset the event dispatcher.
     */
    public static function unsetEventDispatcher(): void
    {
        static::$dispatcher = null;
    }
}
