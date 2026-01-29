<?php

namespace LiVue\Attributes;

use Attribute;

/**
 * Configure View Transitions for a method.
 *
 * When a method decorated with #[Transition] is called, the DOM update
 * will use the View Transitions API with the specified type. This allows
 * different animation styles for different actions (e.g., forward/backward
 * navigation).
 *
 * Usage:
 *   #[Transition(type: 'forward')]
 *   public function nextPage() { ... }
 *
 *   #[Transition(type: 'backward')]
 *   public function previousPage() { ... }
 *
 *   #[Transition(skip: true)]
 *   public function instantUpdate() { ... }
 *
 * CSS targeting:
 *   .livue-transition-forward::view-transition-old(root) { ... }
 *   .livue-transition-forward::view-transition-new(root) { ... }
 *
 * Notes:
 * - Requires browser support for View Transitions API
 * - Falls back gracefully in unsupported browsers
 * - Respects prefers-reduced-motion user preference
 */
#[Attribute(Attribute::TARGET_METHOD)]
class Transition
{
    public function __construct(
        /**
         * The transition type name. Added as a class on documentElement
         * so CSS can target specific transitions.
         */
        public ?string $type = null,

        /**
         * When true, skip the View Transition for this method.
         * The DOM update happens instantly without animation.
         */
        public bool $skip = false,
    ) {}
}
