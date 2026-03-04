<?php

namespace LiVue\Features\SupportRendering;

use LiVue\Component;

/**
 * Static stack that tracks which LiVue component is currently being rendered.
 *
 * This enables LiVueCompilerEngine to bind $this to the correct component
 * in every Blade template (including anonymous components) rendered during
 * the component's render cycle.
 */
class RenderingStack
{
    protected static array $stack = [];

    public static function push(Component $component): void
    {
        static::$stack[] = $component;
    }

    public static function pop(): void
    {
        array_pop(static::$stack);
    }

    public static function current(): ?Component
    {
        return empty(static::$stack) ? null : end(static::$stack);
    }

    public static function isRendering(): bool
    {
        return ! empty(static::$stack);
    }
}
