<?php

namespace LiVue\Features\SupportReactiveProps;

use Attribute;

/**
 * Mark a property as reactive to parent changes.
 *
 * When a parent component re-renders and passes new values to a child
 * component, properties marked with #[Reactive] on the child will
 * automatically update to reflect the parent's new values.
 *
 * Without this attribute, child properties remain independent from
 * parent changes after initial mount.
 *
 * Example (child component):
 *   #[Reactive]
 *   public array $todos = [];
 *
 * Parent template:
 *   @livue('child-name', ['todos' => $this->todos])
 */
#[Attribute(Attribute::TARGET_PROPERTY)]
class BaseReactive
{
}
