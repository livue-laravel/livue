<?php

namespace LiVue\Features\SupportConfirm;

use LiVue\Attributes\Confirm;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use ReflectionClass;
use ReflectionMethod;

/**
 * Feature hook for confirmation dialog support.
 *
 * Scans component methods for #[Confirm] attribute and includes their
 * configuration in the snapshot memo for the JS runtime.
 */
class SupportConfirm extends ComponentHook
{
    /**
     * Cache for confirm methods lookup, keyed by class name.
     */
    private static array $confirmCache = [];

    /**
     * Contribute confirm configurations to snapshot memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $confirms = $this->getConfirmMethods($component);

        if (empty($confirms)) {
            return [];
        }

        return ['confirms' => $confirms];
    }

    /**
     * Get all methods with #[Confirm] and their configuration.
     *
     * @return array<string, array{message: string, title: ?string, confirmText: string, cancelText: string}>
     */
    private function getConfirmMethods(Component $component): array
    {
        $className = get_class($component);

        if (isset(self::$confirmCache[$className])) {
            return self::$confirmCache[$className];
        }

        $confirms = [];
        $reflection = new ReflectionClass($component);

        foreach ($reflection->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            // Skip methods from the base Component class
            if ($method->getDeclaringClass()->getName() !== $className) {
                continue;
            }

            $attrs = $method->getAttributes(Confirm::class);

            if (empty($attrs)) {
                continue;
            }

            $instance = $attrs[0]->newInstance();

            $confirms[$method->getName()] = [
                'message' => $instance->message,
                'title' => $instance->title,
                'confirmText' => $instance->confirmText,
                'cancelText' => $instance->cancelText,
            ];
        }

        return self::$confirmCache[$className] = $confirms;
    }
}
