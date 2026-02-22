<?php

namespace LiVue\Features\SupportAssets;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

/**
 * Declare JavaScript assets for a component.
 *
 * Can be used multiple times on a class to declare multiple scripts.
 * Scripts are loaded once per page, regardless of component instances.
 *
 * Usage:
 *   #[Js('https://cdn.example.com/library.js')]
 *   #[Js('/js/my-script.js')]
 *   #[Js(content: 'console.log("inline script");')]
 */
#[Attribute(Attribute::TARGET_CLASS | Attribute::IS_REPEATABLE)]
class BaseJs extends LiVueAttribute
{
    public function __construct(
        public ?string $src = null,
        public ?string $content = null,
        public bool $defer = true,
        public bool $async = false,
        public ?string $type = null,
    ) {}

    /**
     * Check if this is an inline script (content) or external (src).
     */
    public function isInline(): bool
    {
        return $this->content !== null;
    }

    /**
     * Get a unique key for deduplication.
     */
    public function getKey(): string
    {
        if ($this->isInline()) {
            return 'inline:' . md5($this->content);
        }

        return 'src:' . $this->src;
    }
}
