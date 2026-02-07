<?php

namespace LiVue\Features\SupportAssets;

use Attribute;

/**
 * Declare CSS assets for a component.
 *
 * Can be used multiple times on a class to declare multiple stylesheets.
 * Stylesheets are loaded once per page, regardless of component instances.
 *
 * Usage:
 *   #[Css('https://cdn.example.com/library.css')]
 *   #[Css('/css/my-styles.css')]
 *   #[Css(content: '.my-class { color: red; }')]
 */
#[Attribute(Attribute::TARGET_CLASS | Attribute::IS_REPEATABLE)]
class BaseCss
{
    public function __construct(
        public ?string $href = null,
        public ?string $content = null,
        public ?string $media = null,
    ) {}

    /**
     * Check if this is inline CSS (content) or external (href).
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

        return 'href:' . $this->href;
    }
}
