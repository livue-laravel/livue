<?php

namespace LiVue\Features\SupportAssets;

/**
 * JavaScript asset.
 *
 * Supports external scripts, inline scripts, ES modules,
 * and various loading strategies (defer, async).
 */
class Js extends Asset
{
    protected bool $defer = true;

    protected bool $async = false;

    protected ?string $type = null;

    protected ?string $content = null;

    /**
     * Set defer attribute.
     * Deferred scripts execute after HTML parsing completes.
     */
    public function defer(bool $defer = true): static
    {
        $this->defer = $defer;

        return $this;
    }

    /**
     * Set async attribute.
     * Async scripts execute as soon as they're loaded.
     */
    public function async(bool $async = true): static
    {
        $this->async = $async;

        return $this;
    }

    /**
     * Mark this script as an ES module.
     */
    public function module(bool $isModule = true): static
    {
        $this->type = $isModule ? 'module' : null;

        return $this;
    }

    /**
     * Set the script type attribute.
     */
    public function type(?string $type): static
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Set inline script content.
     */
    public function inline(string $content): static
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Check if this is an inline script.
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
     * Check if defer is enabled.
     */
    public function isDefer(): bool
    {
        return $this->defer;
    }

    /**
     * Check if async is enabled.
     */
    public function isAsync(): bool
    {
        return $this->async;
    }

    /**
     * Get the script type.
     */
    public function getType(): ?string
    {
        return $this->type;
    }

    /**
     * Check if this is a module script.
     */
    public function isModule(): bool
    {
        return $this->type === 'module';
    }

    public function getExtension(): string
    {
        return 'js';
    }

    public function toHtml(?string $nonce = null): string
    {
        $nonceAttr = $nonce ? ' nonce="' . e($nonce) . '"' : '';

        if ($this->isInline()) {
            $typeAttr = $this->type ? ' type="' . e($this->type) . '"' : '';

            return '<script' . $typeAttr . $nonceAttr . '>' . $this->content . '</script>';
        }

        $attrs = 'src="' . e($this->getUrl()) . '"';

        if ($this->type) {
            $attrs .= ' type="' . e($this->type) . '"';
        }

        if ($this->defer && ! $this->isModule()) {
            $attrs .= ' defer';
        }

        if ($this->async) {
            $attrs .= ' async';
        }

        return '<script ' . $attrs . $nonceAttr . '></script>';
    }
}
