<?php

namespace LiVue\Features\SupportIsland;

use Attribute;

/**
 * Mark a component as an island (separate Vue app).
 *
 * Islands mount as independent Vue apps, isolated from their parent's
 * Vue instance. Useful for heavy components that need their own state tree
 * or when you want to prevent state/reactivity bleeding between components.
 *
 * Usage:
 *   #[Island]
 *   class HeavyDashboard extends Component { }
 *
 *   #[Island(defer: true)]
 *   class AnalyticsWidget extends Component { }
 */
#[Attribute(Attribute::TARGET_CLASS)]
class BaseIsland
{
    public function __construct(
        /**
         * When true, defer mounting until after page load.
         * Useful for heavy widgets that shouldn't block initial render.
         */
        public bool $defer = false,
    ) {}
}
