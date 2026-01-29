<?php

namespace LiVue\Attributes;

use Attribute;

/**
 * Lock a public property so it's completely hidden from the client.
 *
 * Guarded properties are:
 * - Excluded from the public snapshot state (client never sees the value)
 * - Encrypted and stored in memo.locked for server-side restoration
 * - Automatically restored during hydration from the encrypted memo
 *
 * This provides maximum security: the client cannot read, modify, or
 * tamper with guarded values. Use this for sensitive data like IDs,
 * tokens, or internal state that should never be exposed to JavaScript.
 *
 * The property is still accessible in Blade templates (server-rendered)
 * and can be modified freely by server-side code.
 *
 * Example:
 *   #[Guarded]
 *   public int $postId;    // Client cannot see or modify this
 *
 *   #[Guarded]
 *   public string $secret; // Completely hidden from browser
 */
#[Attribute(Attribute::TARGET_PROPERTY)]
class Guarded
{
}
