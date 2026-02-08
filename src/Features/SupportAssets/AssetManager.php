<?php

namespace LiVue\Features\SupportAssets;

use LiVue\Attributes\Css;
use LiVue\Attributes\Js;
use LiVue\Component;
use LiVue\Features\SupportAssets\Css as CssAsset;
use LiVue\Features\SupportAssets\Js as JsAsset;
use ReflectionClass;

/**
 * Manages CSS and JS assets for LiVue.
 *
 * Provides a Filament-style asset management system with:
 * - Package-based organization
 * - CSS variables support
 * - Script data for JavaScript configuration
 * - Versioning support
 * - Backward compatibility with attribute-based registration
 */
class AssetManager
{
    /**
     * Registered JS assets grouped by package.
     *
     * @var array<string, array<string, JsAsset>>
     */
    protected array $scripts = [];

    /**
     * Registered CSS assets grouped by package.
     *
     * @var array<string, array<string, CssAsset>>
     */
    protected array $styles = [];

    /**
     * CSS variables grouped by package.
     *
     * @var array<string, array<string, string>>
     */
    protected array $cssVariables = [];

    /**
     * Script data grouped by package.
     *
     * @var array<string, array<string, mixed>>
     */
    protected array $scriptData = [];

    /**
     * Import map entries for ES modules.
     *
     * @var array<string, string>
     */
    protected array $importMap = [];

    /**
     * Cache of resolved attributes per class.
     *
     * @var array<string, array{js: Js[], css: Css[]}>
     */
    protected static array $attributeCache = [];

    /**
     * Register assets with optional package name.
     *
     * @param  array<Asset|array>  $assets  Array of Asset objects or legacy format
     * @param  string  $package  Package name for grouping
     */
    public function register(array $assets, string $package = 'app'): void
    {
        // Check for legacy format: ['scripts' => [...], 'styles' => [...]]
        if (isset($assets['scripts']) || isset($assets['styles'])) {
            $this->registerDynamicAssets($assets, $package);

            return;
        }

        // New typed asset registration
        foreach ($assets as $asset) {
            if ($asset instanceof Asset) {
                $asset->package($package);

                if ($asset instanceof CssAsset) {
                    $this->styles[$package][$asset->getId()] = $asset;
                } elseif ($asset instanceof JsAsset) {
                    $this->scripts[$package][$asset->getId()] = $asset;
                }
            }
        }
    }

    /**
     * Register a single script.
     * Backward compatible method for simple script registration.
     */
    public function registerScript(string $src, ?string $type = null, bool $defer = true, bool $async = false): void
    {
        $id = 'src:' . md5($src);
        $asset = JsAsset::make($id, $src)
            ->defer($defer)
            ->async($async)
            ->package('app');

        if ($type) {
            $asset->type($type);
        }

        $this->scripts['app'][$id] = $asset;
    }

    /**
     * Register a single stylesheet.
     * Backward compatible method for simple style registration.
     */
    public function registerStyle(string $href, ?string $media = null): void
    {
        $id = 'href:' . md5($href);
        $asset = CssAsset::make($id, $href)->package('app');

        if ($media) {
            $asset->media($media);
        }

        $this->styles['app'][$id] = $asset;
    }

    /**
     * Register CSS variables for a package.
     *
     * Variables are rendered as :root { --name: value; } blocks.
     *
     * @param  array<string, string>  $variables  Variable name => value pairs
     * @param  string  $package  Package name for grouping
     */
    public function registerCssVariables(array $variables, string $package = 'app'): void
    {
        if (! isset($this->cssVariables[$package])) {
            $this->cssVariables[$package] = [];
        }

        $this->cssVariables[$package] = array_merge($this->cssVariables[$package], $variables);
    }

    /**
     * Register script data available to JavaScript.
     *
     * Data is rendered as window.LiVueData = {...} before other scripts.
     *
     * @param  array<string, mixed>  $data  Data to pass to JavaScript
     * @param  string  $package  Package name for grouping
     */
    public function registerScriptData(array $data, string $package = 'app'): void
    {
        if (! isset($this->scriptData[$package])) {
            $this->scriptData[$package] = [];
        }

        $this->scriptData[$package] = array_merge($this->scriptData[$package], $data);
    }

    /**
     * Get all CSS variables, optionally filtered by packages.
     *
     * @param  array<string>|null  $packages  Filter by these packages, or all if null
     * @return array<string, array<string, string>>
     */
    public function getCssVariables(?array $packages = null): array
    {
        if ($packages === null) {
            return $this->cssVariables;
        }

        return array_intersect_key($this->cssVariables, array_flip($packages));
    }

    /**
     * Get all script data merged together, optionally filtered by packages.
     *
     * @param  array<string>|null  $packages  Filter by these packages, or all if null
     * @return array<string, mixed>
     */
    public function getScriptData(?array $packages = null): array
    {
        $data = [];

        foreach ($this->scriptData as $package => $packageData) {
            if ($packages !== null && ! in_array($package, $packages)) {
                continue;
            }

            $data = array_merge($data, $packageData);
        }

        return $data;
    }

    /**
     * Get all registered styles, optionally filtered by packages.
     *
     * @param  array<string>|null  $packages  Filter by these packages, or all if null
     * @return array<CssAsset>
     */
    public function getStyles(?array $packages = null): array
    {
        $styles = [];

        foreach ($this->styles as $package => $packageStyles) {
            if ($packages !== null && ! in_array($package, $packages)) {
                continue;
            }

            $styles = array_merge($styles, array_values($packageStyles));
        }

        return $styles;
    }

    /**
     * Get all registered scripts, optionally filtered by packages.
     *
     * @param  array<string>|null  $packages  Filter by these packages, or all if null
     * @return array<JsAsset>
     */
    public function getScripts(?array $packages = null): array
    {
        $scripts = [];

        foreach ($this->scripts as $package => $packageScripts) {
            if ($packages !== null && ! in_array($package, $packages)) {
                continue;
            }

            $scripts = array_merge($scripts, array_values($packageScripts));
        }

        return $scripts;
    }

    /**
     * Register an import map entry for ES module resolution.
     */
    public function registerImport(string $module, string $url): void
    {
        $this->importMap[$module] = $url;
    }

    /**
     * Register multiple import map entries.
     *
     * @param  array<string, string>  $imports  Module name => URL mappings
     */
    public function registerImports(array $imports): void
    {
        foreach ($imports as $module => $url) {
            $this->importMap[$module] = $url;
        }
    }

    /**
     * Get all registered import map entries.
     *
     * @return array<string, string>
     */
    public function getImportMap(): array
    {
        return $this->importMap;
    }

    /**
     * Check if any import map entries are registered.
     */
    public function hasImportMap(): bool
    {
        return ! empty($this->importMap);
    }

    /**
     * Render the import map as a script tag.
     * Must be placed BEFORE any module scripts in the HTML.
     */
    public function renderImportMap(): string
    {
        if (empty($this->importMap)) {
            return '';
        }

        $json = json_encode(['imports' => $this->importMap], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        return '<script type="importmap">' . $json . '</script>';
    }

    /**
     * Register assets from a component class.
     * Converts #[Js] and #[Css] attributes to Asset objects.
     */
    public function registerFromComponent(Component $component): void
    {
        $class = get_class($component);
        $assets = $this->resolveComponentAssets($class);

        // Convert Js attributes to JsAsset objects
        foreach ($assets['js'] as $js) {
            $id = $js->getKey();
            if (! isset($this->scripts['component'][$id])) {
                $asset = $this->convertJsAttributeToAsset($js);
                $this->scripts['component'][$id] = $asset;
            }
        }

        // Convert Css attributes to CssAsset objects
        foreach ($assets['css'] as $css) {
            $id = $css->getKey();
            if (! isset($this->styles['component'][$id])) {
                $asset = $this->convertCssAttributeToAsset($css);
                $this->styles['component'][$id] = $asset;
            }
        }

        // Handle dynamic assets() method
        if (method_exists($component, 'assets')) {
            $dynamicAssets = $component->assets();
            $this->registerDynamicAssets($dynamicAssets, 'component');
        }
    }

    /**
     * Convert a Js attribute to a JsAsset object.
     */
    protected function convertJsAttributeToAsset(Js $js): JsAsset
    {
        if ($js->isInline()) {
            return JsAsset::make('inline:' . md5($js->content), '')
                ->inline($js->content)
                ->package('component');
        }

        $asset = JsAsset::make('src:' . md5($js->src), $js->src)
            ->defer($js->defer)
            ->async($js->async)
            ->package('component');

        if ($js->type) {
            $asset->type($js->type);
        }

        return $asset;
    }

    /**
     * Convert a Css attribute to a CssAsset object.
     */
    protected function convertCssAttributeToAsset(Css $css): CssAsset
    {
        if ($css->isInline()) {
            return CssAsset::make('inline:' . md5($css->content), '')
                ->inline($css->content)
                ->package('component');
        }

        $asset = CssAsset::make('href:' . md5($css->href), $css->href)
            ->package('component');

        if ($css->media) {
            $asset->media($css->media);
        }

        return $asset;
    }

    /**
     * Register assets from a dynamic assets() method return or legacy format.
     *
     * Expected format:
     * [
     *     'scripts' => ['https://cdn.example.com/lib.js', ...],
     *     'styles' => ['https://cdn.example.com/lib.css', ...],
     * ]
     */
    protected function registerDynamicAssets(array $assets, string $package = 'component'): void
    {
        // Register scripts
        if (isset($assets['scripts'])) {
            foreach ($assets['scripts'] as $script) {
                if (is_string($script)) {
                    $id = 'src:' . md5($script);
                    $asset = JsAsset::make($id, $script)->package($package);
                    $this->scripts[$package][$id] = $asset;
                } elseif (is_array($script)) {
                    $src = $script['src'] ?? '';
                    $content = $script['content'] ?? null;
                    $id = $content ? 'inline:' . md5($content) : 'src:' . md5($src);

                    $asset = JsAsset::make($id, $src)
                        ->defer($script['defer'] ?? true)
                        ->async($script['async'] ?? false)
                        ->package($package);

                    if (isset($script['type'])) {
                        $asset->type($script['type']);
                    }

                    if ($content) {
                        $asset->inline($content);
                    }

                    $this->scripts[$package][$id] = $asset;
                }
            }
        }

        // Register styles
        if (isset($assets['styles'])) {
            foreach ($assets['styles'] as $style) {
                if (is_string($style)) {
                    $id = 'href:' . md5($style);
                    $asset = CssAsset::make($id, $style)->package($package);
                    $this->styles[$package][$id] = $asset;
                } elseif (is_array($style)) {
                    $href = $style['href'] ?? '';
                    $content = $style['content'] ?? null;
                    $id = $content ? 'inline:' . md5($content) : 'href:' . md5($href);

                    $asset = CssAsset::make($id, $href)->package($package);

                    if (isset($style['media'])) {
                        $asset->media($style['media']);
                    }

                    if ($content) {
                        $asset->inline($content);
                    }

                    $this->styles[$package][$id] = $asset;
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
     * Render CSS variables as inline style block.
     */
    public function renderCssVariables(?string $nonce = null): string
    {
        if (empty($this->cssVariables)) {
            return '';
        }

        $nonceAttr = $nonce ? ' nonce="' . e($nonce) . '"' : '';
        $output = '';

        foreach ($this->cssVariables as $package => $vars) {
            $varCss = '';
            foreach ($vars as $name => $value) {
                // Ensure variable name has -- prefix
                $varName = str_starts_with($name, '--') ? $name : '--' . $name;
                $varCss .= "    {$varName}: {$value};\n";
            }

            $output .= "<style{$nonceAttr}>/* {$package} */\n:root {\n{$varCss}}</style>\n";
        }

        return $output;
    }

    /**
     * Render script data as JavaScript object.
     */
    public function renderScriptData(?string $nonce = null): string
    {
        $data = $this->getScriptData();

        if (empty($data)) {
            return '';
        }

        $nonceAttr = $nonce ? ' nonce="' . e($nonce) . '"' : '';

        return '<script' . $nonceAttr . '>window.LiVueData = ' . json_encode($data, JSON_UNESCAPED_SLASHES) . ';</script>' . "\n";
    }

    /**
     * Render all collected styles as HTML.
     */
    public function renderStyles(?string $nonce = null): string
    {
        $output = '';

        // First render CSS variables
        $output .= $this->renderCssVariables($nonce);

        // Then render stylesheets
        foreach ($this->getStyles() as $asset) {
            $output .= $asset->toHtml($nonce) . "\n";
        }

        return $output;
    }

    /**
     * Render all collected scripts as HTML.
     */
    public function renderScripts(?string $nonce = null): string
    {
        $output = '';

        // Render scripts
        foreach ($this->getScripts() as $asset) {
            $output .= $asset->toHtml($nonce) . "\n";
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
        $this->cssVariables = [];
        $this->scriptData = [];
        $this->importMap = [];
    }
}
