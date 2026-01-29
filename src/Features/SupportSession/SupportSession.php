<?php

namespace LiVue\Features\SupportSession;

use LiVue\Attributes\Session as SessionAttribute;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use ReflectionClass;
use ReflectionProperty;

/**
 * Session persistence support for component properties.
 *
 * Properties marked with #[Session] are automatically loaded from the
 * session on mount and saved to the session after each request.
 */
class SupportSession extends ComponentHook
{
    /**
     * Cache for session properties per component class.
     */
    private static array $sessionPropsCache = [];

    /**
     * Boot hook: detect #[Session] properties.
     */
    public function boot(Component $component, ComponentStore $store): void
    {
        $sessionProps = $this->getSessionProperties($component);

        if (!empty($sessionProps)) {
            $store->set('sessionProps', $sessionProps);
        }
    }

    /**
     * Mount hook: load values from session.
     */
    public function mount(Component $component, ComponentStore $store, array $params): void
    {
        $sessionProps = $store->get('sessionProps', []);

        if (empty($sessionProps)) {
            return;
        }

        foreach ($sessionProps as $property => $config) {
            $sessionKey = $this->resolveSessionKey($component, $property, $config);

            if (session()->has($sessionKey)) {
                $component->{$property} = session()->get($sessionKey);
            }
        }
    }

    /**
     * Hydrate hook: load values from session for subsequent requests.
     */
    public function hydrate(Component $component, ComponentStore $store): void
    {
        // For subsequent requests, we don't need to load from session
        // because the state is already in the snapshot.
        // But we store the initial values for change detection.
        $sessionProps = $store->get('sessionProps', []);

        if (empty($sessionProps)) {
            return;
        }

        $initialValues = [];
        foreach ($sessionProps as $property => $config) {
            $initialValues[$property] = $component->{$property} ?? null;
        }

        $store->set('sessionInitial', $initialValues);
    }

    /**
     * Dehydrate hook: save changed values to session.
     */
    public function dehydrate(Component $component, ComponentStore $store): void
    {
        $sessionProps = $store->get('sessionProps', []);

        if (empty($sessionProps)) {
            return;
        }

        foreach ($sessionProps as $property => $config) {
            $sessionKey = $this->resolveSessionKey($component, $property, $config);
            $value = $component->{$property} ?? null;

            // Always save to session (including null values to clear)
            session()->put($sessionKey, $value);
        }
    }

    /**
     * Get the #[Session] properties for a component.
     *
     * @return array<string, array{key: ?string}>
     */
    private function getSessionProperties(Component $component): array
    {
        $className = get_class($component);

        if (isset(self::$sessionPropsCache[$className])) {
            return self::$sessionPropsCache[$className];
        }

        $props = [];
        $reflection = new ReflectionClass($component);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            $attrs = $property->getAttributes(SessionAttribute::class);

            if (empty($attrs)) {
                continue;
            }

            /** @var SessionAttribute $instance */
            $instance = $attrs[0]->newInstance();

            $props[$property->getName()] = [
                'key' => $instance->key,
            ];
        }

        return self::$sessionPropsCache[$className] = $props;
    }

    /**
     * Resolve the session key for a property.
     *
     * Handles dynamic keys with property interpolation: 'search-{category}'
     */
    private function resolveSessionKey(Component $component, string $property, array $config): string
    {
        $key = $config['key'];

        if ($key === null) {
            // Default key format
            return 'livue.' . $component->getName() . '.' . $property;
        }

        // Handle dynamic keys with property interpolation
        if (str_contains($key, '{')) {
            $key = preg_replace_callback('/\{(\w+(?:\.\w+)*)\}/', function ($matches) use ($component) {
                return $this->resolvePropertyPath($component, $matches[1]);
            }, $key);
        }

        return $key;
    }

    /**
     * Resolve a dot-notated property path (e.g., 'author.id').
     */
    private function resolvePropertyPath(Component $component, string $path): string
    {
        $segments = explode('.', $path);
        $value = $component;

        foreach ($segments as $segment) {
            if (is_object($value) && property_exists($value, $segment)) {
                $value = $value->{$segment};
            } elseif (is_array($value) && isset($value[$segment])) {
                $value = $value[$segment];
            } else {
                return '';
            }
        }

        return (string) $value;
    }
}
