<?php

namespace LiVue;

use LiVue\Attributes\Css;
use LiVue\Attributes\Js;
use ReflectionClass;

/**
 * Manages CSS and JS assets declared by LiVue components.
 *
 * Collects assets from components rendered during the request and
 * outputs them via @livueScripts / @livueStyles directives.
 * Assets are deduplicated - each unique asset is output only once.
 */
class AssetManager
{
    /**
     * Collected JS assets, keyed for deduplication.
     *
     * @var array<string, Js>
     */
    protected array $scripts = [];

    /**
     * Collected CSS assets, keyed for deduplication.
     *
     * @var array<string, Css>
     */
    protected array $styles = [];

    /**
     * Inline JS snippets from components.
     *
     * @var array<string, string>
     */
    protected array $inlineScripts = [];

    /**
     * Inline CSS snippets from components.
     *
     * @var array<string, string>
     */
    protected array $inlineStyles = [];

    /**
     * Cache of resolved attributes per class.
     *
     * @var array<string, array{js: Js[], css: Css[]}>
     */
    protected static array $attributeCache = [];

    /**
     * Register assets from a component class.
     * Called when a component is rendered.
     */
    public function registerFromComponent(Component $component): void
    {
        $class = get_class($component);

        // Get cached or resolve attributes
        $assets = $this->resolveComponentAssets($class);

        // Register JS assets
        foreach ($assets['js'] as $js) {
            $key = $js->getKey();
            if (! isset($this->scripts[$key])) {
                $this->scripts[$key] = $js;
            }
        }

        // Register CSS assets
        foreach ($assets['css'] as $css) {
            $key = $css->getKey();
            if (! isset($this->styles[$key])) {
                $this->styles[$key] = $css;
            }
        }

        // Check for assets() method
        if (method_exists($component, 'assets')) {
            $dynamicAssets = $component->assets();
            $this->registerDynamicAssets($dynamicAssets);
        }
    }

    /**
     * Register assets from a dynamic assets() method return.
     *
     * Expected format:
     * [
     *     'scripts' => ['https://cdn.example.com/lib.js', ...],
     *     'styles' => ['https://cdn.example.com/lib.css', ...],
     * ]
     */
    protected function registerDynamicAssets(array $assets): void
    {
        // Register scripts
        if (isset($assets['scripts'])) {
            foreach ($assets['scripts'] as $script) {
                if (is_string($script)) {
                    $js = new Js(src: $script);
                    $key = $js->getKey();
                    if (! isset($this->scripts[$key])) {
                        $this->scripts[$key] = $js;
                    }
                } elseif (is_array($script)) {
                    $js = new Js(
                        src: $script['src'] ?? null,
                        content: $script['content'] ?? null,
                        defer: $script['defer'] ?? true,
                        async: $script['async'] ?? false,
                        type: $script['type'] ?? null,
                    );
                    $key = $js->getKey();
                    if (! isset($this->scripts[$key])) {
                        $this->scripts[$key] = $js;
                    }
                }
            }
        }

        // Register styles
        if (isset($assets['styles'])) {
            foreach ($assets['styles'] as $style) {
                if (is_string($style)) {
                    $css = new Css(href: $style);
                    $key = $css->getKey();
                    if (! isset($this->styles[$key])) {
                        $this->styles[$key] = $css;
                    }
                } elseif (is_array($style)) {
                    $css = new Css(
                        href: $style['href'] ?? null,
                        content: $style['content'] ?? null,
                        media: $style['media'] ?? null,
                    );
                    $key = $css->getKey();
                    if (! isset($this->styles[$key])) {
                        $this->styles[$key] = $css;
                    }
                }
            }
        }
    }

    /**
     * Resolve #[Js] and #[Css] attributes from a component class.
     *
     * @return array{js: Js[], css: Css[]}
     */
    protected function resolveComponentAssets(string $class): array
    {
        if (isset(self::$attributeCache[$class])) {
            return self::$attributeCache[$class];
        }

        $reflection = new ReflectionClass($class);
        $result = ['js' => [], 'css' => []];

        // Get #[Js] attributes
        foreach ($reflection->getAttributes(Js::class) as $attr) {
            $result['js'][] = $attr->newInstance();
        }

        // Get #[Css] attributes
        foreach ($reflection->getAttributes(Css::class) as $attr) {
            $result['css'][] = $attr->newInstance();
        }

        self::$attributeCache[$class] = $result;

        return $result;
    }

    /**
     * Render all collected scripts as HTML.
     *
     * @param  string|null  $nonce  CSP nonce attribute
     */
    public function renderScripts(?string $nonce = null): string
    {
        $nonceAttr = $nonce ? ' nonce="' . e($nonce) . '"' : '';
        $output = '';

        foreach ($this->scripts as $js) {
            if ($js->isInline()) {
                $output .= '<script' . $nonceAttr . '>' . $js->content . '</script>' . "\n";
            } else {
                $attrs = 'src="' . e($js->src) . '"';

                if ($js->defer) {
                    $attrs .= ' defer';
                }

                if ($js->async) {
                    $attrs .= ' async';
                }

                if ($js->type) {
                    $attrs .= ' type="' . e($js->type) . '"';
                }

                $output .= '<script ' . $attrs . $nonceAttr . '></script>' . "\n";
            }
        }

        return $output;
    }

    /**
     * Render all collected styles as HTML.
     *
     * @param  string|null  $nonce  CSP nonce attribute
     */
    public function renderStyles(?string $nonce = null): string
    {
        $nonceAttr = $nonce ? ' nonce="' . e($nonce) . '"' : '';
        $output = '';

        foreach ($this->styles as $css) {
            if ($css->isInline()) {
                $output .= '<style' . $nonceAttr . '>' . $css->content . '</style>' . "\n";
            } else {
                $attrs = 'rel="stylesheet" href="' . e($css->href) . '"';

                if ($css->media) {
                    $attrs .= ' media="' . e($css->media) . '"';
                }

                $output .= '<link ' . $attrs . $nonceAttr . '>' . "\n";
            }
        }

        return $output;
    }

    /**
     * Check if any assets have been registered.
     */
    public function hasAssets(): bool
    {
        return ! empty($this->scripts) || ! empty($this->styles);
    }

    /**
     * Check if any scripts have been registered.
     */
    public function hasScripts(): bool
    {
        return ! empty($this->scripts);
    }

    /**
     * Check if any styles have been registered.
     */
    public function hasStyles(): bool
    {
        return ! empty($this->styles);
    }

    /**
     * Clear all registered assets.
     * Useful for testing.
     */
    public function clear(): void
    {
        $this->scripts = [];
        $this->styles = [];
    }
}
