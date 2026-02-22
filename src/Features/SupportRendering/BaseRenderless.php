<?php

namespace LiVue\Features\SupportRendering;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

/**
 * Mark a component method as renderless.
 *
 * When a method annotated with #[Renderless] is called via AJAX,
 * the server will skip re-rendering the HTML template. The updated
 * state is still returned in the snapshot, so Vue reactivity handles
 * the DOM update from the state change alone.
 *
 * Useful for methods that only change state (counters, toggles, etc.)
 * where server-rendered HTML would be identical to what Vue produces.
 */
#[Attribute(Attribute::TARGET_METHOD)]
class BaseRenderless extends LiVueAttribute
{
}
