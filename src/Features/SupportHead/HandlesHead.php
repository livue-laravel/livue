<?php

namespace LiVue\Features\SupportHead;

/**
 * Trait HandlesHead
 *
 * Provides dynamic <head> element management for LiVue page components.
 * Supports meta tags, Open Graph, Twitter Cards, canonical URLs, and JSON-LD.
 *
 * Components can define head elements via a protected $head property (static)
 * or a head() method (dynamic, takes priority over the property).
 */
trait HandlesHead
{
    /**
     * Static head elements for this page component.
     * Override in your component or use the head() method for dynamic values.
     *
     * Supported keys:
     * - 'description', 'keywords', 'robots', etc. → <meta name="..." content="...">
     * - 'og:title', 'og:image', etc. → <meta property="og:..." content="...">
     * - 'twitter:card', 'twitter:title', etc. → <meta name="twitter:..." content="...">
     * - 'canonical' → <link rel="canonical" href="...">
     * - 'json-ld' → <script type="application/ld+json">...</script>
     */
    protected array $head = [];

    /**
     * Get the head elements for this page component.
     *
     * Resolves in order of priority:
     * 1. head() method (if defined on the component)
     * 2. $head property
     *
     * @return array<string, mixed>
     */
    public function getHead(): array
    {
        if (method_exists($this, 'head')) {
            return $this->head();
        }

        return $this->head;
    }
}
