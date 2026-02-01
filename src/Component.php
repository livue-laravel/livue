<?php

namespace LiVue;

use Illuminate\Support\Facades\Cache;
use LiVue\Features\SupportValidation\HandlesValidation;
use ReflectionClass;
use ReflectionMethod;
use ReflectionProperty;

abstract class Component
{
    use HandlesValidation;

    /**
     * Unique instance ID for this component.
     */
    public string $id;

    /**
     * Whether this component should mount as an isolated Vue app (island).
     * When false (default), nested components share the parent's Vue app.
     */
    protected bool $island = false;

    /**
     * Custom type casts for properties.
     * Overrides the default reflection-based casting.
     *
     * Supported: 'int', 'float', 'bool', 'string', 'array', 'json'
     *
     * Example: protected array $casts = ['count' => 'int', 'settings' => 'json'];
     */
    protected array $casts = [];

    /**
     * @deprecated Use #[Guarded] attribute on individual properties instead.
     * Legacy support: properties listed here are excluded from public state
     * and encrypted (locked behavior).
     */
    protected array $guarded = [];

    /**
     * Event listeners: event-name => method-name.
     * Override in subclasses to declare which events this component handles.
     *
     * Example: protected array $listeners = ['open-modal' => 'open'];
     */
    protected array $listeners = [];

    /**
     * Buffer of events dispatched during the current request.
     */
    private array $dispatchedEvents = [];

    /**
     * Per-request cache for computed property values.
     */
    private array $computedCache = [];

    /**
     * Redirect intent set during the current request.
     * Stores ['url' => string, 'navigate' => bool] or null.
     */
    private ?array $redirectIntent = null;

    /**
     * Buffer of JavaScript snippets to execute after the server response.
     */
    private array $pendingJs = [];

    /**
     * Static cache for resolved attribute values, keyed by class name.
     * Prevents redundant reflection within the same request.
     */
    private static array $attributeCache = [];

    /**
     * The layout view to use when rendering as a full page.
     * When null, falls back to config('livue.layout').
     */
    protected ?string $layout = null;

    /**
     * The page title when rendering as a full page.
     * When null, falls back to config('app.name').
     */
    protected ?string $title = null;

    /**
     * Get the Blade view name for this component.
     */
    abstract protected function render(): string;

    public function __construct()
    {
        $this->id = uniqid('livue-', true);
        $this->initializeHandlesValidation();
    }

    // ---------------------------------------------------------------
    //  View rendering with $this context
    // ---------------------------------------------------------------

    /**
     * Render a Blade view in the context of this component.
     * This allows $this to be available in the view template, like Livewire.
     */
    public function renderView(string $viewName, array $viewData): string
    {
        $compiler = app('blade.compiler');
        $finder = app('view.finder');

        $path = $finder->find($viewName);
        $compiled = $compiler->getCompiledPath($path);

        if (! file_exists($compiled) || $compiler->isExpired($path)) {
            $compiler->compile($path);
        }

        // Blade needs $__env for directives like @foreach, @include, etc.
        $__env = app(\Illuminate\View\Factory::class);

        // Use private variable names to avoid collisions with view data
        $__path = $compiled;
        $__data = $viewData;

        // Extract variables - $this will be available because we're inside a method!
        extract($__data, EXTR_SKIP);

        ob_start();
        include $__path;

        return ob_get_clean();
    }

    // ---------------------------------------------------------------
    //  Event dispatching
    // ---------------------------------------------------------------

    /**
     * Dispatch an event to all listening components (broadcast).
     */
    public function dispatch(string $event, mixed $data = null): void
    {
        $this->dispatchedEvents[] = [
            'name' => $event,
            'data' => $data,
            'mode' => 'broadcast',
            'target' => null,
        ];
    }

    /**
     * Dispatch an event to a specific component by name.
     */
    public function dispatchTo(string $componentName, string $event, mixed $data = null): void
    {
        $this->dispatchedEvents[] = [
            'name' => $event,
            'data' => $data,
            'mode' => 'to',
            'target' => $componentName,
        ];
    }

    /**
     * Dispatch an event to this component only.
     */
    public function dispatchSelf(string $event, mixed $data = null): void
    {
        $this->dispatchedEvents[] = [
            'name' => $event,
            'data' => $data,
            'mode' => 'self',
            'target' => null,
        ];
    }

    /**
     * Get and clear the dispatched events buffer.
     */
    public function flushDispatchedEvents(): array
    {
        $events = $this->dispatchedEvents;
        $this->dispatchedEvents = [];

        return $events;
    }

    /**
     * Get the listeners map for this component.
     * Merges property-based $listeners with #[On] attributes.
     * Attributes take precedence on key conflict.
     */
    public function getListeners(): array
    {
        $fromAttributes = $this->resolveOnAttributes();

        return array_merge($this->listeners, $fromAttributes);
    }

    // ---------------------------------------------------------------
    //  Navigation / Redirect
    // ---------------------------------------------------------------

    /**
     * Redirect the user to a URL after the current action completes.
     *
     * @param string $url       The target URL
     * @param bool   $navigate  If true, use SPA navigation (no full page reload)
     */
    public function redirect(string $url, bool $navigate = false): void
    {
        $this->redirectIntent = [
            'url' => $url,
            'navigate' => $navigate,
        ];
    }

    /**
     * Get and clear the redirect intent.
     */
    public function getRedirect(): ?array
    {
        $redirect = $this->redirectIntent;
        $this->redirectIntent = null;

        return $redirect;
    }

    // ---------------------------------------------------------------
    //  File Downloads
    // ---------------------------------------------------------------

    /**
     * Download intent set during the current request.
     */
    private ?array $downloadIntent = null;

    /**
     * Trigger a file download from the component.
     *
     * @param string      $path    Path to file or storage path
     * @param string|null $name    Download filename (defaults to original name)
     * @param array       $headers Additional HTTP headers
     * @param string|null $disk    Storage disk (null for local filesystem)
     */
    public function download(string $path, ?string $name = null, array $headers = [], ?string $disk = null): void
    {
        $this->downloadIntent = [
            'path' => $path,
            'name' => $name ?? basename($path),
            'headers' => $headers,
            'disk' => $disk,
        ];
    }

    /**
     * Stream download directly from content.
     *
     * @param string $content The file content
     * @param string $name    Download filename
     * @param array  $headers Additional HTTP headers
     */
    public function downloadContent(string $content, string $name, array $headers = []): void
    {
        $this->downloadIntent = [
            'content' => $content,
            'name' => $name,
            'headers' => $headers,
            'type' => 'content',
        ];
    }

    /**
     * Get and clear the download intent.
     */
    public function getDownload(): ?array
    {
        $download = $this->downloadIntent;
        $this->downloadIntent = null;

        return $download;
    }

    // ---------------------------------------------------------------
    //  JavaScript bridge (->vue() and #[Vue])
    // ---------------------------------------------------------------

    /**
     * Queue JavaScript to execute after the server response arrives.
     *
     * @param string $js JavaScript code to execute on the client
     */
    public function vue(string $js): void
    {
        $this->pendingJs[] = $js;
    }

    /**
     * Get and clear the pending JavaScript buffer.
     *
     * @return string[]
     */
    public function flushJs(): array
    {
        $js = $this->pendingJs;
        $this->pendingJs = [];

        return $js;
    }

    /**
     * Resolve all #[Vue] methods and return their JS code.
     * Each method is called and its return value (a JS string) is collected.
     *
     * @return array<string, string> method-name => js-code
     */
    public function getVueMethods(): array
    {
        $className = static::class;
        $cacheKey = $className . '::VueMethods';

        // Cache only the method names, not the JS code (which could depend on state)
        if (! array_key_exists($cacheKey, self::$attributeCache)) {
            $methods = [];
            $reflection = new ReflectionClass($this);

            foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
                $attrs = $method->getAttributes(Attributes\Vue::class);

                if (! empty($attrs)) {
                    $methods[] = $method->getName();
                }
            }

            self::$attributeCache[$cacheKey] = $methods;
        }

        $vueMethods = [];

        foreach (self::$attributeCache[$cacheKey] as $methodName) {
            $vueMethods[$methodName] = $this->{$methodName}();
        }

        return $vueMethods;
    }

    // ---------------------------------------------------------------
    //  Computed properties
    // ---------------------------------------------------------------

    /**
     * Magic getter: intercept access to computed properties.
     * If a method with #[Computed] exists matching the name, call and cache it.
     */
    public function __get(string $name): mixed
    {
        $computedMethods = $this->getComputedMethods();

        if (! isset($computedMethods[$name])) {
            trigger_error("Undefined property: " . static::class . "::\${$name}", E_USER_NOTICE);

            return null;
        }

        // Return from per-request cache if available
        if (array_key_exists($name, $this->computedCache)) {
            return $this->computedCache[$name];
        }

        $attr = $computedMethods[$name];

        // Persistent cache (across requests)
        if ($attr->persist) {
            $cacheKey = $attr->cache
                ? 'livue.computed.' . $name
                : 'livue.computed.' . static::class . '.' . $this->id . '.' . $name;

            $value = Cache::remember($cacheKey, $attr->seconds, fn () => $this->{$name}());
        } else {
            $value = $this->{$name}();
        }

        $this->computedCache[$name] = $value;

        return $value;
    }

    /**
     * Magic unset: clear computed property cache.
     */
    public function __unset(string $name): void
    {
        unset($this->computedCache[$name]);

        // Also clear persistent cache if applicable
        $computedMethods = $this->getComputedMethods();

        if (isset($computedMethods[$name]) && $computedMethods[$name]->persist) {
            $attr = $computedMethods[$name];
            $cacheKey = $attr->cache
                ? 'livue.computed.' . $name
                : 'livue.computed.' . static::class . '.' . $this->id . '.' . $name;

            Cache::forget($cacheKey);
        }
    }

    /**
     * Get all computed methods with their attribute instances.
     * Uses static cache for performance.
     *
     * @return array<string, Attributes\Computed> method-name => Computed attribute
     */
    public function getComputedMethods(): array
    {
        $className = static::class;
        $cacheKey = $className . '::ComputedMethods';

        if (array_key_exists($cacheKey, self::$attributeCache)) {
            return self::$attributeCache[$cacheKey];
        }

        $computed = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            $attrs = $method->getAttributes(Attributes\Computed::class);

            if (! empty($attrs)) {
                $computed[$method->getName()] = $attrs[0]->newInstance();
            }
        }

        return self::$attributeCache[$cacheKey] = $computed;
    }

    /**
     * Clear the per-request computed cache.
     * Must be called after a method modifies state so computed values are fresh.
     */
    public function clearComputedCache(): void
    {
        $this->computedCache = [];
    }

    /**
     * Resolve all computed properties and return their values.
     * Used by the renderer to pass computed values as view data.
     *
     * @return array<string, mixed>
     */
    public function getComputedValues(): array
    {
        $values = [];
        $methods = $this->getComputedMethods();

        foreach ($methods as $name => $attr) {
            $values[$name] = $this->__get($name);
        }

        return $values;
    }

    // ---------------------------------------------------------------
    //  Composable state
    // ---------------------------------------------------------------

    /**
     * Internal storage for composable state.
     * Keyed by namespace (e.g., 'counter', 'cart').
     */
    protected array $__composableState = [];

    /**
     * Get a ComposableState wrapper for a namespace.
     * The wrapper provides ArrayAccess for convenient state manipulation.
     *
     * Usage in traits:
     *   $state = $this->composableState('counter', ['value' => 0]);
     *   $state['value']++;  // Auto-persisted in snapshot
     *
     * @param string $namespace The composable namespace (e.g., 'counter')
     * @param array  $defaults  Default values if state doesn't exist
     */
    public function composableState(string $namespace, array $defaults = []): ComposableState
    {
        if (! isset($this->__composableState[$namespace])) {
            $this->__composableState[$namespace] = $defaults;
        }

        return new ComposableState($this, $namespace);
    }

    /**
     * Get the raw composable state array for a namespace.
     * Used internally by ComposableState wrapper.
     */
    public function getComposableStateArray(string $namespace): array
    {
        return $this->__composableState[$namespace] ?? [];
    }

    /**
     * Set a value in the composable state.
     * Used internally by ComposableState wrapper.
     */
    public function setComposableStateValue(string $namespace, string $key, mixed $value): void
    {
        if (! isset($this->__composableState[$namespace])) {
            $this->__composableState[$namespace] = [];
        }

        $this->__composableState[$namespace][$key] = $value;
    }

    /**
     * Unset a value in the composable state.
     * Used internally by ComposableState wrapper.
     */
    public function unsetComposableStateValue(string $namespace, string $key): void
    {
        unset($this->__composableState[$namespace][$key]);
    }

    /**
     * Get all composable state for serialization.
     * Used by SupportComposables hook during dehydration.
     */
    public function getAllComposableState(): array
    {
        return $this->__composableState;
    }

    /**
     * Restore composable state from memo.
     * Used by SupportComposables hook during hydration.
     */
    public function restoreComposableState(array $state): void
    {
        $this->__composableState = $state;
    }

    // ---------------------------------------------------------------
    //  Component identity
    // ---------------------------------------------------------------

    /**
     * Get the component name in kebab-case.
     */
    public function getName(): string
    {
        $class = (new ReflectionClass($this))->getShortName();

        return strtolower(preg_replace('/([a-z])([A-Z])/', '$1-$2', $class));
    }

    /**
     * Get the Blade view name.
     */
    public function getView(): string
    {
        return $this->render();
    }

    /**
     * Get all public properties as an associative array (the component state).
     * Excludes internal properties like $id.
     */
    public function getState(): array
    {
        $state = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            $name = $property->getName();

            if (in_array($name, $this->getInternalProperties())) {
                continue;
            }

            $state[$name] = $property->getValue($this);
        }

        return $state;
    }

    /**
     * Hydrate the component from a state array.
     * Dispatches updating/updated lifecycle events via EventBus
     * and calls the component's own hooks if defined.
     *
     * Supports property-specific hooks:
     * - updatingPropertyName($value) - called before updating
     * - updatedPropertyName($value) - called after updating
     * - updatedPropertyName($value, $key) - for array properties, called per changed key
     *
     * @param bool $fromClient Legacy parameter, no longer used.
     *                         #[Guarded] properties are now completely hidden from
     *                         the client (locked), so they can't appear in diffs.
     */
    public function setState(array $state, bool $fromClient = false): void
    {
        $reflection = new ReflectionClass($this);
        $eventBus = app()->bound(EventBus::class) ? app(EventBus::class) : null;

        foreach ($state as $key => $value) {
            if (in_array($key, $this->getInternalProperties())) {
                continue;
            }

            if (! $reflection->hasProperty($key)) {
                continue;
            }

            $property = $reflection->getProperty($key);

            if (! $property->isPublic()) {
                continue;
            }

            // Capture old value for array key change detection
            $oldValue = $this->{$key} ?? null;

            $casted = $this->castValue($property, $value);

            $eventBus?->dispatch('component.updating', $this, $key, $casted);

            // Generic updating() hook
            if (method_exists($this, 'updating')) {
                $casted = $this->updating($key, $casted);
            }

            // Trait-based updating{TraitName}() hooks
            foreach (class_uses_recursive($this) as $trait) {
                $traitMethod = 'updating' . class_basename($trait);

                if (method_exists($this, $traitMethod)) {
                    $result = $this->{$traitMethod}($key, $casted);
                    if ($result !== null) {
                        $casted = $result;
                    }
                }
            }

            // Property-specific updatingPropertyName() hook
            $updatingMethod = 'updating' . $this->propertyMethodName($key);
            if (method_exists($this, $updatingMethod)) {
                $casted = $this->{$updatingMethod}($casted);
            }

            $this->{$key} = $casted;

            $eventBus?->dispatch('component.updated', $this, $key, $casted);

            // Generic updated() hook
            if (method_exists($this, 'updated')) {
                $this->updated($key, $casted);
            }

            // Trait-based updated{TraitName}() hooks
            foreach (class_uses_recursive($this) as $trait) {
                $traitMethod = 'updated' . class_basename($trait);

                if (method_exists($this, $traitMethod)) {
                    $this->{$traitMethod}($key, $casted);
                }
            }

            // Property-specific updatedPropertyName() hook
            $updatedMethod = 'updated' . $this->propertyMethodName($key);
            if (method_exists($this, $updatedMethod)) {
                // For array properties, call with ($value, $key) for each changed key
                if (is_array($casted) && is_array($oldValue)) {
                    $this->callArrayUpdatedHook($updatedMethod, $oldValue, $casted);
                } else {
                    $this->{$updatedMethod}($casted);
                }
            }
        }
    }

    /**
     * Call the updated hook for array properties with changed keys.
     * Detects which keys changed and calls the hook for each.
     */
    protected function callArrayUpdatedHook(string $method, array $oldValue, array $newValue): void
    {
        $reflection = new ReflectionMethod($this, $method);
        $paramCount = $reflection->getNumberOfParameters();

        // If hook accepts 2 parameters, call per-key
        if ($paramCount >= 2) {
            $changedKeys = $this->getChangedArrayKeys($oldValue, $newValue);

            foreach ($changedKeys as $arrayKey) {
                $this->{$method}($newValue[$arrayKey] ?? null, $arrayKey);
            }

            // If no keys changed but the arrays are different (structural change),
            // call once with the full new value
            if (empty($changedKeys) && $oldValue !== $newValue) {
                $this->{$method}($newValue, null);
            }
        } else {
            // Single parameter: call with full array
            $this->{$method}($newValue);
        }
    }

    /**
     * Get the keys that changed between two arrays.
     */
    protected function getChangedArrayKeys(array $old, array $new): array
    {
        $changed = [];

        // Check for new or modified keys
        foreach ($new as $key => $value) {
            if (! array_key_exists($key, $old) || $old[$key] !== $value) {
                $changed[] = $key;
            }
        }

        // Check for removed keys
        foreach ($old as $key => $value) {
            if (! array_key_exists($key, $new) && ! in_array($key, $changed)) {
                $changed[] = $key;
            }
        }

        return $changed;
    }

    /**
     * Initialize Form objects with component reference.
     * Called after hydration to link Form instances to their parent component.
     */
    public function initializeForms(): void
    {
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            $value = $property->getValue($this);

            if ($value instanceof Form) {
                $value->setComponent($this);
            }
        }
    }

    /**
     * Convert a property name to PascalCase for method suffix.
     * Examples: 'email' => 'Email', 'user_name' => 'UserName', 'first-name' => 'FirstName'
     */
    protected function propertyMethodName(string $property): string
    {
        // Handle snake_case and kebab-case
        $property = str_replace(['-', '_'], ' ', $property);
        $property = ucwords($property);

        return str_replace(' ', '', $property);
    }

    /**
     * Lifecycle hook names that cannot be called from the client,
     * even when defined on the user's component class.
     */
    private const LIFECYCLE_HOOKS = [
        'boot',
        'mount',
        'hydrate',
        'dehydrate',
        'updating',
        'updated',
        'rendering',
        'rendered',
    ];

    /**
     * Call a public method on the component.
     *
     * Only methods declared on the user's concrete component class are callable.
     * Methods inherited from the base Component class, protected methods,
     * magic methods, and lifecycle hooks are automatically blocked.
     */
    public function callMethod(string $method, array $params = []): mixed
    {
        if (str_starts_with($method, '__')) {
            throw new \BadMethodCallException("Method [{$method}] cannot be called from the client.");
        }

        if (in_array($method, self::LIFECYCLE_HOOKS)) {
            throw new \BadMethodCallException("Method [{$method}] cannot be called from the client.");
        }

        if (! method_exists($this, $method)) {
            throw new \BadMethodCallException("Method [{$method}] does not exist on component [{$this->getName()}].");
        }

        $reflection = new ReflectionClass($this);
        $reflectionMethod = $reflection->getMethod($method);

        if (! $reflectionMethod->isPublic()) {
            throw new \BadMethodCallException("Method [{$method}] is not public on component [{$this->getName()}].");
        }

        // Block methods declared on the base Component class.
        // Only methods defined directly on the user's component are callable.
        if ($reflectionMethod->getDeclaringClass()->getName() === self::class) {
            throw new \BadMethodCallException("Method [{$method}] cannot be called from the client.");
        }

        return $this->{$method}(...$params);
    }

    /**
     * Whether this component is an island (separate Vue app).
     * Checks for #[Island] attribute or $island property.
     */
    public function isIsland(): bool
    {
        if ($this->resolveAttribute(Attributes\Island::class) !== null) {
            return true;
        }

        return $this->island;
    }

    /**
     * Whether this component's requests should be isolated from the pool.
     * Checks for #[Isolate] attribute on the component class.
     */
    public function isIsolated(): bool
    {
        return $this->resolveAttribute(Attributes\Isolate::class) !== null;
    }

    /**
     * Get the names of properties marked with #[Reactive].
     * These properties automatically sync from parent to child on re-render.
     *
     * @return string[]
     */
    public function getReactiveProperties(): array
    {
        $className = static::class;
        $cacheKey = $className . '::ReactiveList';

        if (array_key_exists($cacheKey, self::$attributeCache)) {
            return self::$attributeCache[$cacheKey];
        }

        $reactive = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            $attrs = $property->getAttributes(Attributes\Reactive::class);

            if (! empty($attrs)) {
                $reactive[] = $property->getName();
            }
        }

        return self::$attributeCache[$cacheKey] = $reactive;
    }

    // ---------------------------------------------------------------
    //  Attribute resolution
    // ---------------------------------------------------------------

    /**
     * Resolve a single-value attribute from the render() method or the class.
     * Method-level attributes take precedence over class-level.
     */
    private function resolveAttribute(string $attributeClass): ?object
    {
        $className = static::class;
        $cacheKey = $className . '::' . $attributeClass;

        if (array_key_exists($cacheKey, self::$attributeCache)) {
            return self::$attributeCache[$cacheKey];
        }

        $reflection = new ReflectionClass($this);

        // Check render() method first (higher priority)
        if ($reflection->hasMethod('render')) {
            $methodAttrs = $reflection->getMethod('render')
                ->getAttributes($attributeClass);

            if (! empty($methodAttrs)) {
                return self::$attributeCache[$cacheKey] = $methodAttrs[0]->newInstance();
            }
        }

        // Fall back to class-level
        $classAttrs = $reflection->getAttributes($attributeClass);

        if (! empty($classAttrs)) {
            return self::$attributeCache[$cacheKey] = $classAttrs[0]->newInstance();
        }

        return self::$attributeCache[$cacheKey] = null;
    }

    /**
     * Scan all public methods for #[On] attributes and return the listeners map.
     *
     * @return array<string, string> event-name => method-name
     */
    private function resolveOnAttributes(): array
    {
        $className = static::class;
        $cacheKey = $className . '::On';

        if (array_key_exists($cacheKey, self::$attributeCache)) {
            return self::$attributeCache[$cacheKey];
        }

        $listeners = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            $attrs = $method->getAttributes(Attributes\On::class);

            foreach ($attrs as $attr) {
                $instance = $attr->newInstance();
                $listeners[$instance->event] = $method->getName();
            }
        }

        return self::$attributeCache[$cacheKey] = $listeners;
    }

    // ---------------------------------------------------------------
    //  Property protection (Locked)
    // ---------------------------------------------------------------

    /**
     * Check if a property is guarded (locked / hidden from client).
     *
     * Guarded properties are completely excluded from the public snapshot
     * and encrypted in memo.locked. The client cannot see or modify them.
     *
     * Checks both the #[Guarded] attribute and the legacy $guarded array.
     */
    public function isGuarded(string $property): bool
    {
        // Legacy support
        if (in_array($property, $this->guarded)) {
            return true;
        }

        return $this->hasPropertyAttribute($property, Attributes\Guarded::class);
    }

    /**
     * Get all guarded (locked) property names for this component.
     *
     * These properties are excluded from the public snapshot and encrypted.
     *
     * @return string[]
     */
    public function getGuardedProperties(): array
    {
        $className = static::class;
        $cacheKey = $className . '::GuardedList';

        if (array_key_exists($cacheKey, self::$attributeCache)) {
            return self::$attributeCache[$cacheKey];
        }

        $guarded = $this->guarded;
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            $attrs = $property->getAttributes(Attributes\Guarded::class);

            if (! empty($attrs) && ! in_array($property->getName(), $guarded)) {
                $guarded[] = $property->getName();
            }
        }

        return self::$attributeCache[$cacheKey] = $guarded;
    }

    /**
     * Check if a property has a specific attribute.
     */
    protected function hasPropertyAttribute(string $property, string $attributeClass): bool
    {
        $className = static::class;
        $cacheKey = $className . '::prop::' . $property . '::' . $attributeClass;

        if (array_key_exists($cacheKey, self::$attributeCache)) {
            return self::$attributeCache[$cacheKey];
        }

        $reflection = new ReflectionClass($this);

        if (! $reflection->hasProperty($property)) {
            return self::$attributeCache[$cacheKey] = false;
        }

        $attrs = $reflection->getProperty($property)->getAttributes($attributeClass);

        return self::$attributeCache[$cacheKey] = ! empty($attrs);
    }

    // ---------------------------------------------------------------
    //  Page component metadata
    // ---------------------------------------------------------------

    /**
     * Get the layout view name for full-page rendering.
     */
    public function getLayout(): ?string
    {
        $attr = $this->resolveAttribute(Attributes\Layout::class);

        if ($attr !== null) {
            return $attr->name;
        }

        return $this->layout;
    }

    /**
     * Get the page title for full-page rendering.
     */
    public function getTitle(): ?string
    {
        $attr = $this->resolveAttribute(Attributes\Title::class);

        if ($attr !== null) {
            return $attr->name;
        }

        return $this->title;
    }

    /**
     * Properties that are internal and should not be part of the state.
     */
    protected function getInternalProperties(): array
    {
        return ['id'];
    }

    /**
     * Cast a value to match the property's type.
     * Uses $casts first, then falls back to reflection-based type detection.
     */
    protected function castValue(ReflectionProperty $property, mixed $value): mixed
    {
        $name = $property->getName();
        $type = $property->getType();

        // When null arrives (e.g. from ConvertEmptyStringsToNull middleware)
        // but the property is not nullable, cast to the type's default.
        if ($value === null) {
            if ($type !== null && ! $type->allowsNull()) {
                $typeName = isset($this->casts[$name]) ? $this->casts[$name] : $type->getName();

                return $this->applyCast($typeName, $value);
            }

            return $value;
        }

        // Custom cast takes priority
        if (isset($this->casts[$name])) {
            return $this->applyCast($this->casts[$name], $value);
        }

        // Fallback to reflection-based casting
        if ($type === null) {
            return $value;
        }

        return $this->applyCast($type->getName(), $value);
    }

    /**
     * Apply a type cast to a value.
     */
    protected function applyCast(string $cast, mixed $value): mixed
    {
        return match ($cast) {
            'int', 'integer' => (int) $value,
            'float', 'double' => (float) $value,
            'bool', 'boolean' => (bool) $value,
            'string' => (string) $value,
            'array' => (array) $value,
            'json' => is_string($value) ? json_decode($value, true) : (array) $value,
            default => $value,
        };
    }
}
