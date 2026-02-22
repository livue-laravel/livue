<?php

namespace LiVue\Features\SupportIsland;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

/**
 * Isolate a component's AJAX requests from the request pool.
 *
 * By default, LiVue batches simultaneous component updates into a single
 * HTTP request. Components marked with #[Isolate] send their requests
 * independently, allowing them to execute in parallel without blocking
 * or being blocked by other components.
 *
 * Use this when a component performs expensive operations (complex queries,
 * external API calls) that would slow down the entire batch.
 *
 * Example:
 *   #[Isolate]
 *   class SlowDashboard extends Component { ... }
 */
#[Attribute(Attribute::TARGET_CLASS)]
class BaseIsolate extends LiVueAttribute
{
}
