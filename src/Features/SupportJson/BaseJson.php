<?php

namespace LiVue\Features\SupportJson;

use Attribute;

/**
 * Mark a method as a JSON endpoint.
 *
 * Methods decorated with #[Json] return their value directly to JavaScript
 * as JSON data, without re-rendering the component. This is useful for:
 * - Search/autocomplete endpoints
 * - Loading data for charts/maps
 * - AJAX endpoints that need to return data to JS logic
 *
 * Usage:
 *   #[Json]
 *   public function search(string $query): array
 *   {
 *       return Post::where('title', 'like', "%{$query}%")
 *           ->limit(10)
 *           ->get();
 *   }
 *
 * In template:
 *   livue.call('search', [query]).then(results => {
 *       // results contains the returned array
 *   });
 *
 * Notes:
 * - The component does NOT re-render after the method executes
 * - Validation errors (422) reject the Promise with { status, errors }
 * - Server errors reject the Promise with { status, message }
 */
#[Attribute(Attribute::TARGET_METHOD)]
class BaseJson
{
}
