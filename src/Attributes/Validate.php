<?php

namespace LiVue\Attributes;

use Attribute;

/**
 * Declare validation rules on a component property.
 *
 * This attribute is repeatable, so you can stack multiple rules:
 *
 *   #[Validate('required')]
 *   #[Validate('min:3', message: 'Too short')]
 *   public string $title = '';
 *
 * Or combine rules in a single attribute:
 *
 *   #[Validate('required|email')]
 *   public string $email = '';
 */
#[Attribute(Attribute::IS_REPEATABLE | Attribute::TARGET_PROPERTY)]
class Validate
{
    /**
     * @param string|array $rule     Laravel validation rule(s)
     * @param string|null  $message  Custom error message
     * @param string|null  $as       Custom attribute name for messages
     * @param bool         $onUpdate Validate automatically on property update (reserved for future use)
     */
    public function __construct(
        public string|array $rule,
        public ?string $message = null,
        public ?string $as = null,
        public bool $onUpdate = false,
    ) {}
}
