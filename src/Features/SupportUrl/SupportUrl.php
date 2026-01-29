<?php

namespace LiVue\Features\SupportUrl;

use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;

use LiVue\Attributes\Url;
use LiVue\Component;
use ReflectionClass;
use ReflectionProperty;

/**
 * Query string synchronization support.
 *
 * On mount: reads URL query parameters and applies them to properties
 * marked with #[Url], overriding default values.
 *
 * On dehydrate: includes URL parameter configuration in the snapshot memo
 * so the JS runtime can update the browser URL after state changes.
 */
class SupportUrl extends ComponentHook
{
    /**
     * Static cache for resolved URL properties per component class.
     *
     * @var array<string, array<string, array>>
     */
    private static array $urlPropsCache = [];

    /**
     * On mount: initialize properties from URL query parameters.
     */
    public function mount(Component $component, ComponentStore $store, array $params): void
    {
        $urlProps = $this->getUrlProperties($component);

        if (empty($urlProps)) {
            return;
        }

        $query = request()->query();

        foreach ($urlProps as $property => $config) {
            $paramName = $config['as'] ?? $property;

            if (array_key_exists($paramName, $query)) {
                $value = $query[$paramName];

                // Cast the value to match the property type
                $component->{$property} = $this->castQueryValue($component, $property, $value);
            }
        }
    }

    /**
     * Include URL parameter config in the snapshot memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $urlProps = $this->getUrlProperties($component);

        if (empty($urlProps)) {
            return [];
        }

        return ['urlParams' => $urlProps];
    }

    /**
     * Get the URL property configuration for a component.
     *
     * @return array<string, array{as: ?string, history: bool, keep: bool, except: mixed}>
     */
    private function getUrlProperties(Component $component): array
    {
        $className = get_class($component);

        if (isset(self::$urlPropsCache[$className])) {
            return self::$urlPropsCache[$className];
        }

        $props = [];
        $reflection = new ReflectionClass($component);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            $attrs = $property->getAttributes(Url::class);

            if (empty($attrs)) {
                continue;
            }

            $instance = $attrs[0]->newInstance();

            $props[$property->getName()] = [
                'as' => $instance->as,
                'history' => $instance->history,
                'keep' => $instance->keep,
                'except' => $instance->except,
            ];
        }

        return self::$urlPropsCache[$className] = $props;
    }

    /**
     * Cast a query string value to the property's PHP type.
     */
    private function castQueryValue(Component $component, string $property, mixed $value): mixed
    {
        $reflection = new ReflectionClass($component);

        if (! $reflection->hasProperty($property)) {
            return $value;
        }

        $type = $reflection->getProperty($property)->getType();

        if ($type === null) {
            return $value;
        }

        $typeName = $type->getName();

        return match ($typeName) {
            'int', 'integer' => (int) $value,
            'float', 'double' => (float) $value,
            'bool', 'boolean' => filter_var($value, FILTER_VALIDATE_BOOLEAN),
            'array' => is_array($value) ? $value : [$value],
            default => $value,
        };
    }
}
