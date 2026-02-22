<?php

namespace LiVue\Features\SupportLazy;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

/**
 * Mark a component for lazy loading.
 *
 * Lazy components render a placeholder initially and load their full content
 * via AJAX when they enter the viewport (or immediately after page load if onLoad is true).
 *
 * Usage:
 *   #[Lazy]
 *   class HeavyDashboard extends Component { }
 *
 *   #[Lazy(onLoad: true)]
 *   class DeferredWidget extends Component { }
 *
 *   #[Lazy(placeholder: 'components.dashboard-skeleton')]
 *   class Dashboard extends Component { }
 */
#[Attribute(Attribute::TARGET_CLASS)]
class BaseLazy extends LiVueAttribute
{
    public function __construct(
        /**
         * When true, load immediately after page load instead of waiting for viewport intersection.
         */
        public bool $onLoad = false,

        /**
         * Custom placeholder view name. When null, uses 'livue::placeholders.default'.
         */
        public ?string $placeholder = null,
    ) {}

    /**
     * Contribute lazy loading configuration to snapshot memo.
     */
    public function dehydrateMemo(): array
    {
        return ['lazy' => [
            'onLoad' => $this->onLoad,
            'bundle' => false,
            'placeholder' => $this->placeholder ?? 'livue::placeholders.default',
        ]];
    }
}
