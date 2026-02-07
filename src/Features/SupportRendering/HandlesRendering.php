<?php

namespace LiVue\Features\SupportRendering;

use LiVue\Attributes\Layout;
use LiVue\Attributes\Title;

/**
 * Trait HandlesRendering
 *
 * Provides view rendering and page layout functionality for LiVue components.
 * Handles Blade view rendering with $this context and page metadata.
 */
trait HandlesRendering
{
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
     * Render a Blade view in the context of this component.
     * This allows $this to be available in the view template, like Livewire.
     *
     * @param string $viewName The Blade view name
     * @param array  $viewData Data to pass to the view
     * @return string The rendered HTML
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

    /**
     * Get the Blade view name.
     *
     * @return string The view name from render()
     */
    public function getView(): string
    {
        return $this->render();
    }

    /**
     * Get the layout view name for full-page rendering.
     *
     * @return string|null The layout view name or null for default
     */
    public function getLayout(): ?string
    {
        $attr = $this->resolveAttribute(Layout::class);

        if ($attr !== null) {
            return $attr->name;
        }

        return $this->layout;
    }

    /**
     * Get the page title for full-page rendering.
     *
     * @return string|null The page title or null for default
     */
    public function getTitle(): ?string
    {
        $attr = $this->resolveAttribute(Title::class);

        if ($attr !== null) {
            return $attr->name;
        }

        return $this->title;
    }
}
