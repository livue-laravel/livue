<?php

namespace LiVue\Features\SupportPagination;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\View;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;

/**
 * Automatic pagination view support for LiVue components.
 *
 * When a component uses the UsePagination trait, this hook automatically
 * overrides Laravel's default pagination views with LiVue-compatible ones
 * that use v-click: directives instead of page reload links.
 *
 * The view is resolved from the component's paginationView() and
 * paginationSimpleView() methods (provided by UsePagination trait,
 * overridable per-component).
 */
class SupportPagination extends ComponentHook
{
    public static function provide(): void
    {
        View::addNamespace('livue', __DIR__ . '/views');
    }

    /**
     * Original default view name to restore after render.
     */
    private ?string $previousDefaultView = null;

    /**
     * Original simple view name to restore after render.
     */
    private ?string $previousSimpleView = null;

    /**
     * Called on every component instantiation.
     * Override Laravel's pagination views for components using UsePagination.
     */
    public function boot(Component $component, ComponentStore $store): void
    {
        if (! $this->usesPagination($component)) {
            return;
        }

        // Store current defaults to restore later
        $this->previousDefaultView = Paginator::$defaultView;
        $this->previousSimpleView = Paginator::$defaultSimpleView;

        // Override with LiVue-compatible views from the component
        Paginator::defaultView($component->paginationView());
        Paginator::defaultSimpleView($component->paginationSimpleView());
    }

    /**
     * Called after the Blade view has been rendered.
     * Restore original pagination views to not affect other parts of the app.
     */
    public function rendered(Component $component, ComponentStore $store): void
    {
        if ($this->previousDefaultView !== null) {
            Paginator::defaultView($this->previousDefaultView);
            $this->previousDefaultView = null;
        }

        if ($this->previousSimpleView !== null) {
            Paginator::defaultSimpleView($this->previousSimpleView);
            $this->previousSimpleView = null;
        }
    }

    /**
     * Determine if the component uses the UsePagination trait.
     */
    private function usesPagination(Component $component): bool
    {
        return in_array(
            UsePagination::class,
            class_uses_recursive($component),
            true
        );
    }
}
