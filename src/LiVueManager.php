<?php

namespace LiVue;

use Illuminate\Routing\Route as RoutingRoute;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Str;
use LiVue\Compilers\MultiFileCompiler;
use LiVue\Compilers\SingleFileCompiler;
use LiVue\Features\SupportLazy\SupportLazy;
use LiVue\Features\SupportPersistentMiddleware\SupportPersistentMiddleware;
use LiVue\Features\SupportRendering\ComponentRenderer;
use LiVue\Features\SupportTesting\Testable;
use LiVue\Http\Controllers\LiVuePageController;
use LiVue\Http\Middleware\LiVueCspMiddleware;
use LiVue\Synthesizers\PropertySynthesizer;
use LiVue\Synthesizers\SynthesizerRegistry;

class LiVueManager
{
    /**
     * Registered component mappings: name => class.
     */
    protected array $components = [];

    /**
     * Reverse mapping: class => registered name.
     * Used to look up the name for a component resolved by class.
     */
    protected array $classToName = [];

    /**
     * Render a component by name, returning the full HTML with wrapper div.
     *
     * @param  string  $name     Component name
     * @param  array   $props    Properties to pass to the component
     * @param  array   $options  Render options (e.g., ['ref' => 'myRef'])
     */
    public function renderComponent(string $name, array $props = [], array $options = []): string
    {
        $component = $this->resolve($name);

        // Check if component is lazy - if so, render placeholder only
        if (SupportLazy::isLazy($component)) {
            return $this->renderLazyPlaceholder($component, $props, $options);
        }

        if (! empty($props)) {
            $component->setState($props);
        }

        // Delegate mount lifecycle to LifecycleManager
        $lifecycle = app(LifecycleManager::class);
        $lifecycle->mount($component);

        $renderer = new ComponentRenderer();

        return $renderer->render($component, $options);
    }

    /**
     * Render a lazy component placeholder.
     * The full component will be loaded via AJAX when it enters the viewport.
     * Uses <livue-lazy> wrapper component so Vue handles the lazy loading within the parent app.
     */
    protected function renderLazyPlaceholder(Component $component, array $props = [], array $options = []): string
    {
        $lazyConfig = SupportLazy::getLazyConfig($component);

        // Get placeholder content from component method or view
        $placeholderHtml = $this->getPlaceholderContent($component, $lazyConfig);

        // Build config object for livue-lazy component
        $config = [
            'name' => $component->getName(),
            'props' => $props,
            'onLoad' => $lazyConfig['onLoad'] ?? false,
        ];

        // Add ref to config if specified
        if (isset($options['ref'])) {
            $config['ref'] = $options['ref'];
        }

        // livue-lazy component handles IntersectionObserver and loading
        // Placeholder content goes in the default slot
        return sprintf(
            '<livue-lazy :config=\'%s\'>%s</livue-lazy>',
            e(json_encode($config)),
            $placeholderHtml
        );
    }

    /**
     * Get the placeholder HTML for a lazy component.
     * Checks for placeholder() method on component, then falls back to view.
     */
    protected function getPlaceholderContent(Component $component, array $lazyConfig): string
    {
        // First check if component has a placeholder() method
        if (method_exists($component, 'placeholder')) {
            $placeholderView = $component->placeholder();

            if (View::exists($placeholderView)) {
                return View::make($placeholderView)->render();
            }
        }

        // Fall back to config placeholder view
        $placeholderView = $lazyConfig['placeholder'] ?? 'livue::placeholders.default';

        if (View::exists($placeholderView)) {
            return View::make($placeholderView)->render();
        }

        return '<div class="livue-placeholder">Loading...</div>';
    }

    /**
     * Output the LiVue JavaScript loader plus component-declared scripts.
     * Includes nonce attribute if CSP support is enabled and navigation config.
     *
     * The loader auto-detects whether the user has called LiVue.setup() (ESM mode)
     * or needs the standalone bundle. This eliminates the need for custom_vue config.
     *
     * Component scripts (#[Js] attributes and assets() method) are appended
     * after the main LiVue loader.
     */
    public function renderScripts(): string
    {
        $prefix = config('livue.route_prefix', 'livue');
        $bundleUrl = url($prefix . '/livue.js');
        $nonce = $this->getNonce();
        $nonceAttr = $this->getNonceAttribute();

        // Build config for navigation
        $navigateConfig = config('livue.navigate', []);
        $jsConfig = [
            'showProgressBar' => $navigateConfig['show_progress_bar'] ?? true,
            'progressBarColor' => $navigateConfig['progress_bar_color'] ?? '#29d',
            'prefetch' => $navigateConfig['prefetch'] ?? true,
            'prefetchOnHover' => $navigateConfig['prefetch_on_hover'] ?? true,
            'hoverDelay' => $navigateConfig['hover_delay'] ?? 60,
            'cachePages' => $navigateConfig['cache_pages'] ?? true,
            'maxCacheSize' => $navigateConfig['max_cache_size'] ?? 10,
            'restoreScroll' => $navigateConfig['restore_scroll'] ?? true,
        ];

        $configScript = '<script' . $nonceAttr . '>window.LiVueConfig = ' . json_encode($jsConfig) . ';</script>';

        // Smart loader: checks if LiVue.setup() was called (ESM mode)
        // If not, loads the standalone bundle dynamically
        $loaderScript = <<<JS
<script{$nonceAttr} data-livue-loader>
(function() {
    function loadStandaloneBundle() {
        var script = document.createElement('script');
        script.src = '{$bundleUrl}';
        document.head.appendChild(script);
    }

    function check() {
        // If LiVue exists and has components, it's already booted (SPA navigation)
        if (window.LiVue && window.LiVue.components && window.LiVue.components.size > 0) {
            return; // Already running - do nothing
        }
        // If LiVue exists and has setup callbacks, ESM mode is active
        if (window.LiVue && window.LiVue._setupCallbacks && window.LiVue._setupCallbacks.length > 0) {
            return; // ESM mode - do nothing
        }
        // No setup called and no components - load standalone bundle
        loadStandaloneBundle();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', check);
    } else {
        check();
    }
})();
</script>
JS;

        // Append import map and component-declared scripts
        $assetManager = app(AssetManager::class);

        // Start with script data (window.LiVueData) - must come first
        $output = $assetManager->renderScriptData($nonce);

        // Then import map - MUST come before any module scripts
        if ($assetManager->hasImportMap()) {
            $output .= $assetManager->renderImportMap() . "\n";
        }

        // Then config and loader
        $output .= $configScript . "\n" . $loaderScript;

        // Finally, append component-declared scripts (modules)
        $componentScripts = $assetManager->renderScripts($nonce);

        if ($componentScripts) {
            $output .= "\n" . $componentScripts;
        }

        return $output;
    }

    /**
     * Output component-declared CSS styles.
     *
     * Note: The main LiVue CSS is inlined in the JS bundle.
     * This method outputs only component-specific styles declared
     * via #[Css] attributes or assets() method.
     */
    public function renderStyles(): string
    {
        $nonce = $this->getNonce();
        $assetManager = app(AssetManager::class);

        return $assetManager->renderStyles($nonce);
    }

    /**
     * Get the current CSP nonce.
     * Returns null if CSP support is disabled.
     */
    public function getNonce(): ?string
    {
        if (! config('livue.csp_nonce', false)) {
            return null;
        }

        return LiVueCspMiddleware::getNonce();
    }

    /**
     * Get the nonce attribute string for HTML tags.
     */
    protected function getNonceAttribute(): string
    {
        $nonce = $this->getNonce();

        if ($nonce === null) {
            return '';
        }

        return ' nonce="' . e($nonce) . '"';
    }

    /**
     * Register custom persistent middleware.
     * These middleware will be re-applied on subsequent AJAX requests.
     */
    public function addPersistentMiddleware(array $middleware): void
    {
        SupportPersistentMiddleware::addPersistentMiddleware($middleware);
    }

    /**
     * Register a GET route that renders a LiVue component as a full page.
     */
    public function route(string $uri, string $component): RoutingRoute
    {
        return Route::middleware('web')
            ->get($uri, LiVuePageController::class)
            ->defaults('_livue_component', $component);
    }

    /**
     * Register a custom property synthesizer.
     * The class must extend PropertySynthesizer and will be resolved
     * through the container (so constructor dependencies are auto-wired).
     *
     * @param  string  $class  Fully qualified class name extending PropertySynthesizer
     */
    public function registerSynthesizer(string $class): void
    {
        $synth = app($class);

        if (! $synth instanceof PropertySynthesizer) {
            throw new \InvalidArgumentException(
                "Synthesizer [{$class}] must extend " . PropertySynthesizer::class . '.'
            );
        }

        app(SynthesizerRegistry::class)->register($synth);
    }

    /**
     * Create a testable instance for a LiVue component.
     *
     * @param  string  $componentClass  Fully qualified component class name
     * @param  array   $params          Parameters to pass to mount()
     */
    public function test(string $componentClass, array $params = []): Testable
    {
        return new Testable($componentClass, $params);
    }

    /**
     * Register a component by name.
     */
    public function register(string $name, string $class): void
    {
        $normalizedClass = ltrim($class, '\\');
        $this->components[$name] = $normalizedClass;
        $this->classToName[$normalizedClass] = $name;
    }

    /**
     * Generate a hash-based name for a component class.
     * Used when components are resolved by class rather than by name.
     */
    public function generateHashName(string $class): string
    {
        $normalizedClass = ltrim($class, '\\');

        return 'lv' . crc32($normalizedClass);
    }

    /**
     * Get the registered name for a component class.
     * Returns null if the class is not registered.
     */
    public function getNameForClass(string $class): ?string
    {
        $normalizedClass = ltrim($class, '\\');

        return $this->classToName[$normalizedClass] ?? null;
    }

    /**
     * Check if a component is registered or discoverable.
     */
    public function componentExists(string $name): bool
    {
        if (isset($this->components[$name])) {
            return true;
        }

        if ($this->discoverComponent($name) !== null) {
            return true;
        }

        // Check SFC
        $viewName = Str::kebab($name);
        $sfcPath = config('livue.sfc_path', resource_path('views/livue'));
        $bladePath = $sfcPath . '/' . $viewName . '.blade.php';

        if (file_exists($bladePath)) {
            $compiler = app(SingleFileCompiler::class);
            if ($compiler->isSingleFile($bladePath)) {
                return true;
            }
        }

        // Check MFC
        $mfcPath = config('livue.mfc_path', resource_path('views/livue'));
        $dirPath = $mfcPath . '/' . $viewName;

        if (is_dir($dirPath)) {
            $compiler = app(MultiFileCompiler::class);
            if ($compiler->isMultiFile($dirPath, $viewName)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Resolve a component instance by name.
     *
     * Resolution priority:
     * 1. Manually registered components
     * 2. Class-based components (App\LiVue\Name)
     * 3. Single File Components (resources/views/livue/name.blade.php with <?php)
     * 4. Multi File Components (resources/views/livue/name/ folder)
     */
    public function resolve(string $name): Component
    {
        // 1. Check manually registered components
        if (isset($this->components[$name])) {
            return new ($this->components[$name])();
        }

        // 2. Try class-based discovery
        $class = $this->discoverComponent($name);
        if ($class !== null) {
            return new $class();
        }

        // 3. Try Single File Component
        $class = $this->discoverSingleFile($name);
        if ($class !== null) {
            return new $class();
        }

        // 4. Try Multi File Component
        $class = $this->discoverMultiFile($name);
        if ($class !== null) {
            return new $class();
        }

        throw new \InvalidArgumentException("LiVue component [{$name}] not found.");
    }

    /**
     * Resolve a component by its fully qualified class name.
     * Auto-registers the component with a hash-based name for subsequent AJAX lookups.
     */
    public function resolveByClass(string $class): Component
    {
        if (! class_exists($class)) {
            throw new \InvalidArgumentException("LiVue component class [{$class}] not found.");
        }

        $normalizedClass = ltrim($class, '\\');

        // Auto-register with hash name if not already registered
        if (! isset($this->classToName[$normalizedClass])) {
            $hashName = $this->generateHashName($normalizedClass);
            $this->register($hashName, $normalizedClass);
        }

        return new $normalizedClass();
    }

    /**
     * Get the class name for a registered component.
     */
    public function getComponentClass(string $name): ?string
    {
        return $this->components[$name] ?? $this->discoverComponent($name);
    }

    /**
     * Try to discover a component from the configured namespace.
     */
    protected function discoverComponent(string $name): ?string
    {
        $namespace = config('livue.component_namespace', 'App\\LiVue');
        $className = Str::studly($name);
        $fullClass = $namespace . '\\' . $className;

        if (class_exists($fullClass) && is_subclass_of($fullClass, Component::class)) {
            $this->register($name, $fullClass);

            return $fullClass;
        }

        return null;
    }

    /**
     * Try to discover a Single File Component.
     *
     * Checks if a blade file exists with an embedded PHP class definition.
     */
    protected function discoverSingleFile(string $name): ?string
    {
        $viewName = Str::kebab($name);
        $sfcPath = config('livue.sfc_path', resource_path('views/livue'));
        $bladePath = $sfcPath . '/' . $viewName . '.blade.php';

        if (! file_exists($bladePath)) {
            return null;
        }

        $compiler = app(SingleFileCompiler::class);

        if (! $compiler->isSingleFile($bladePath)) {
            return null;
        }

        $class = $compiler->compile($bladePath, $name);

        // Register for future lookups (populates both mappings)
        $this->register($name, $class);

        return $class;
    }

    /**
     * Try to discover a Multi File Component.
     *
     * Checks if a folder exists with component files (php, blade, js, css).
     */
    protected function discoverMultiFile(string $name): ?string
    {
        $viewName = Str::kebab($name);
        $mfcPath = config('livue.mfc_path', resource_path('views/livue'));
        $dirPath = $mfcPath . '/' . $viewName;

        if (! is_dir($dirPath)) {
            return null;
        }

        $compiler = app(MultiFileCompiler::class);

        if (! $compiler->isMultiFile($dirPath, $viewName)) {
            return null;
        }

        $class = $compiler->compile($dirPath, $viewName, $name);

        // Register for future lookups (populates both mappings)
        $this->register($name, $class);

        return $class;
    }
}
