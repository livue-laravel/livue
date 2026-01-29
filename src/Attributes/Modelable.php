<?php

namespace LiVue\Attributes;

use Attribute;

/**
 * Mark a property as modelable by parent components.
 *
 * When a property is marked with #[Modelable], parent components can bind
 * to it using the 'model' option in @livue(). Changes to the modelable
 * property automatically sync back to the parent.
 *
 * Usage (child component):
 *   #[Modelable]
 *   public string $value = '';
 *
 * Usage (parent template):
 *   @livue('child-input', [], ['model' => 'searchTerm'])
 *
 * This binds the child's `$value` to the parent's `$searchTerm`.
 * When the child updates `$value`, the parent's `$searchTerm` updates too.
 *
 * Notes:
 * - Only ONE property per component can be modelable
 * - The binding is two-way: parent changes also update the child
 * - Works with any property type (string, int, array, etc.)
 */
#[Attribute(Attribute::TARGET_PROPERTY)]
class Modelable
{
}
