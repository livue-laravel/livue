<?php

namespace LiVue\Features\SupportLazy;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

/**
 * Mark a component for deferred loading.
 *
 * Deferred components render a placeholder initially and load their full content
 * via AJAX immediately after the page finishes loading (DOMContentLoaded).
 *
 * Unlike #[Lazy] which waits for viewport intersection, #[Defer] loads right after
 * page load. This is useful for below-the-fold content or slow components that
 * would block the initial page render.
 *
 * Usage:
 *   #[Defer]
 *   class HeavyDashboard extends Component { }
 *
 *   #[Defer(bundle: true)]
 *   class Widget extends Component { }
 *
 *   #[Defer(placeholder: 'components.dashboard-skeleton')]
 *   class Dashboard extends Component { }
 */
#[Attribute(Attribute::TARGET_CLASS)]
class BaseDefer extends LiVueAttribute
{
    public function __construct(
        /**
         * When true, bundle this component's load request with other deferred components.
         * This reduces the number of HTTP requests when multiple deferred components exist.
         */
        public bool $bundle = false,

        /**
         * Custom placeholder view name. When null, uses 'livue::placeholders.default'.
         */
        public ?string $placeholder = null,
    ) {}

    /**
     * Contribute deferred loading configuration to snapshot memo.
     */
    public function dehydrateMemo(): array
    {
        return ['lazy' => [
            'onLoad' => true,
            'bundle' => $this->bundle,
            'placeholder' => $this->placeholder ?? 'livue::placeholders.default',
        ]];
    }
}
