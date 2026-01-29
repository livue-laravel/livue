<?php

namespace LiVue\Attributes;

use Attribute;

/**
 * Mark a method as a client-side Vue/JS method.
 *
 * The method must return a JavaScript string. When called from the template,
 * the JS is executed directly in the browser without a server round-trip.
 *
 * The JS code has access to `state` (the reactive Vue state object)
 * and `livue` (the livue helper with call, set, sync, etc.).
 *
 * Example:
 *   #[Vue]
 *   public function resetForm()
 *   {
 *       return <<<'JS'
 *           state.title = '';
 *           state.content = '';
 *       JS;
 *   }
 *
 * Template: <button @click="livue.call('resetForm')">Reset</button>
 */
#[Attribute(Attribute::TARGET_METHOD)]
class Vue
{
}
