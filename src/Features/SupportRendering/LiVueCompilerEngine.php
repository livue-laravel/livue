<?php

namespace LiVue\Features\SupportRendering;

use Illuminate\View\Engines\CompilerEngine;

/**
 * Custom Blade compiler engine that binds $this to the current LiVue component
 * for every template evaluated during the component's render cycle.
 *
 * This replicates Livewire's ExtendedCompilerEngine pattern:
 * when a LiVue component is rendering, Closure::bind() is used to execute
 * every Blade template (including anonymous components like <x-foo::bar />)
 * with $this = the LiVue component, making $this universally available
 * without needing to pass it as a prop.
 *
 * Outside a LiVue render cycle, the standard CompilerEngine behaviour is used.
 */
class LiVueCompilerEngine extends CompilerEngine
{
    protected function evaluatePath($__path, $__data)
    {
        $component = RenderingStack::current();

        // Outside a LiVue render cycle: standard behaviour
        if ($component === null) {
            return parent::evaluatePath($__path, $__data);
        }

        $obLevel = ob_get_level();
        ob_start();

        try {
            // Bind the template closure to the LiVue component so that $this
            // inside any Blade template (including nested anonymous components)
            // refers to the currently rendering LiVue component.
            \Closure::bind(function () use ($__path, $__data) {
                extract($__data, EXTR_SKIP);
                include $__path;
            }, $component, $component)();
        } catch (\Throwable $e) {
            $this->handleViewException($e, $obLevel);
        }

        return ltrim(ob_get_clean());
    }
}
