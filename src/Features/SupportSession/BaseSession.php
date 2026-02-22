<?php

namespace LiVue\Features\SupportSession;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

/**
 * Persist a property value in the user's session.
 *
 * When a property is marked with #[Session], its value is automatically
 * saved to the session whenever it changes, and restored from the session
 * when the component mounts.
 *
 * Usage:
 *   #[Session]
 *   public string $search = '';
 *
 *   #[Session(key: 'user_search')]
 *   public string $search = '';
 *
 * Dynamic keys with property interpolation:
 *   #[Session(key: 'search-{category}')]
 *   public string $search = '';
 *
 * Notes:
 * - Unlike #[Url], session values are NOT visible in the browser URL
 * - Unlike #[Url], session values are NOT shareable via link
 * - Avoid storing large objects; use IDs and fetch from database instead
 * - Session data persists across page refreshes and browser sessions
 */
#[Attribute(Attribute::TARGET_PROPERTY)]
class BaseSession extends LiVueAttribute
{
    /**
     * Stored initial value for change detection during hydrate/dehydrate.
     */
    private mixed $initialValue = null;

    public function __construct(
        /**
         * Custom session key. If null, uses 'livue.{component}.{property}'.
         * Supports property interpolation: 'search-{category}' will resolve
         * property values from the component.
         */
        public ?string $key = null,
    ) {}

    /**
     * On mount: load value from session if it exists.
     */
    public function mount(array $params): void
    {
        $sessionKey = $this->resolveSessionKey();

        if (session()->has($sessionKey)) {
            $this->setValue(session()->get($sessionKey));
        }
    }

    /**
     * On hydrate: store initial value for change detection.
     */
    public function hydrate(): void
    {
        $this->initialValue = $this->getValue();
    }

    /**
     * On dehydrate: save current value to session.
     */
    public function dehydrate(): void
    {
        $sessionKey = $this->resolveSessionKey();
        $value = $this->getValue();

        session()->put($sessionKey, $value);
    }

    /**
     * Resolve the session key for this property.
     *
     * Handles dynamic keys with property interpolation: 'search-{category}'
     */
    private function resolveSessionKey(): string
    {
        $key = $this->key;

        if ($key === null) {
            return 'livue.' . $this->getComponent()->getName() . '.' . $this->getName();
        }

        if (str_contains($key, '{')) {
            $component = $this->getComponent();
            $key = preg_replace_callback('/\{(\w+(?:\.\w+)*)\}/', function ($matches) use ($component) {
                return $this->resolvePropertyPath($component, $matches[1]);
            }, $key);
        }

        return $key;
    }

    /**
     * Resolve a dot-notated property path (e.g., 'author.id').
     */
    private function resolvePropertyPath(object $component, string $path): string
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
