<?php

namespace LiVue\Features\SupportAssets;

/**
 * CSS stylesheet asset.
 *
 * Supports external stylesheets, inline styles, and media queries.
 */
class Css extends Asset
{
    protected ?string $media = null;

    protected ?string $content = null;

    /**
     * Set media query for this stylesheet.
     */
    public function media(?string $media): static
    {
        $this->media = $media;

        return $this;
    }

    /**
     * Set inline style content.
     */
    public function inline(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Check if this is an inline style.
     */
    public function isInline(): bool
    {
        return $this->content !== null;
    }

    /**
     * Get the inline content.
     */
    public function getContent(): ?string
    {
        return $this->content;
    }

    /**
     * Get the media query.
     */
    public function getMedia(): ?string
    {
        return $this->media;
    }

    public function getExtension(): string
    {
        return 'css';
    }

    public function toHtml(?string $nonce = null): string
    {
        $nonceAttr = $nonce ? ' nonce="' . e($nonce) . '"' : '';

        if ($this->isInline()) {
            $mediaAttr = $this->media ? ' media="' . e($this->media) . '"' : '';

            return '<style' . $mediaAttr . $nonceAttr . '>' . $this->content . '</style>';
        }

        $attrs = 'rel="stylesheet" href="' . e($this->getUrl()) . '"';

        if ($this->media) {
            $attrs .= ' media="' . e($this->media) . '"';
        }

        return '<link ' . $attrs . $nonceAttr . '>';
    }
}
