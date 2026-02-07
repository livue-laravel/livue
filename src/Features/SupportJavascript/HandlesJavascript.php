<?php

namespace LiVue\Features\SupportJavascript;

use LiVue\Attributes\Vue;
use ReflectionClass;
use ReflectionMethod;

/**
 * Trait HandlesJavascript
 *
 * Provides JavaScript bridge functionality for LiVue components.
 * Allows PHP code to queue JavaScript for execution on the client
 * and exposes methods marked with #[Vue] attribute.
 */
trait HandlesJavascript
{
    /**
     * Buffer of JavaScript snippets to execute after the server response.
     */
    private array $pendingJs = [];

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
     * @return string[] Array of JavaScript code snippets
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
                $attrs = $method->getAttributes(Vue::class);

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
}
