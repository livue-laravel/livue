<?php

namespace LiVue\Contracts;

/**
 * Marker for models that must be re-fetched WITHOUT their global scopes during
 * LiVue property restoration (hydration).
 *
 * Use it for admin-managed models hidden from ordinary queries by a global scope
 * (e.g. a "published" scope): the admin component still needs to hydrate drafts
 * by primary key. Security relies on the re-fetch by key plus the component's own
 * authorization (canEdit / policies) — the same trade-off already made for
 * SoftDeletes, which restoration bypasses via withTrashed().
 */
interface RestoresWithoutGlobalScopes
{
}
