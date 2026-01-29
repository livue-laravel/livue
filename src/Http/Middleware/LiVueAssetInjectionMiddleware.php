<?php

namespace LiVue\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use LiVue\LiVueManager;
use Symfony\Component\HttpFoundation\Response as BaseResponse;

/**
 * Auto-injects LiVue assets into HTML responses.
 *
 * This middleware:
 * 1. Detects if any LiVue component was rendered in the response
 * 2. Injects component CSS (#[Css]) before </head>
 * 3. Injects JS (LiVue bundle + component #[Js]) before </body>
 * 4. Prevents duplicate injection if @livueScripts/@livueStyles are already present
 *
 * Assets are served via route (e.g., /livue/livue.js) - no vendor:publish required.
 */
class LiVueAssetInjectionMiddleware
{
    public function __construct(
        protected LiVueManager $manager
    ) {}

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): BaseResponse
    {
        $response = $next($request);

        // Only process HTML responses
        if (! $this->shouldInjectAssets($response)) {
            return $response;
        }

        $html = $response->getContent();

        // Check if LiVue components are present in the response
        if (! $this->hasLiVueComponents($html)) {
            return $response;
        }

        // Inject styles (component CSS) before </head>
        if (! $this->hasStylesAlready($html)) {
            $html = $this->injectStyles($html);
        }

        // Inject scripts before </body>
        if (! $this->hasScriptsAlready($html)) {
            $html = $this->injectScripts($html);
        }

        $response->setContent($html);

        return $response;
    }

    /**
     * Determine if assets should be injected into this response.
     */
    protected function shouldInjectAssets(BaseResponse $response): bool
    {
        // Skip injection if custom_vue is enabled
        // When custom_vue is true, the user imports LiVue in their app.js
        // and configures it with LiVue.setup() to share Vue instance
        if (config('livue.custom_vue', false)) {
            return false;
        }

        // Only process successful HTML responses
        if (! $response instanceof Response) {
            return false;
        }

        if ($response->getStatusCode() !== 200) {
            return false;
        }

        $contentType = $response->headers->get('Content-Type', '');

        if (! str_contains($contentType, 'text/html') && $contentType !== '') {
            return false;
        }

        return true;
    }

    /**
     * Check if the HTML contains LiVue components.
     */
    protected function hasLiVueComponents(string $html): bool
    {
        return str_contains($html, 'data-livue-id=')
            || str_contains($html, 'data-livue-snapshot=')
            || str_contains($html, '<livue-lazy');
    }

    /**
     * Check if LiVue scripts are already in the HTML.
     */
    protected function hasScriptsAlready(string $html): bool
    {
        $prefix = config('livue.route_prefix', 'livue');

        // Check for route-based URL (e.g., /livue/livue.js)
        if (str_contains($html, $prefix . '/livue.js')) {
            return true;
        }

        // Check for Vite-loaded LiVue (development mode with Vite)
        // When LiVue is in the Vite array, it shares Vue instance with Vuetify
        if (str_contains($html, 'packages/livue/resources/js/livue.js')) {
            return true;
        }

        return false;
    }

    /**
     * Check if component styles have already been injected.
     */
    protected function hasStylesAlready(string $html): bool
    {
        return str_contains($html, '<!-- livue-styles -->');
    }

    /**
     * Inject component CSS before </head>.
     */
    protected function injectStyles(string $html): string
    {
        $styles = $this->manager->renderStyles();

        if (empty($styles)) {
            return $html;
        }

        // Add marker to prevent duplicate injection
        $styles = "<!-- livue-styles -->\n" . $styles;

        $pos = stripos($html, '</head>');

        if ($pos !== false) {
            $html = substr_replace($html, $styles, $pos, 0);
        }

        return $html;
    }

    /**
     * Inject LiVue scripts in <head> BEFORE any user scripts.
     *
     * This ensures window.LiVue is available when Vite/user scripts execute.
     * Looks for <!-- livue-assets --> marker first, then falls back to
     * injecting before the first <script or @vite directive.
     */
    protected function injectScripts(string $html): string
    {
        $scripts = $this->manager->renderScripts();

        // 1. Check for explicit marker (recommended placement)
        $markerPos = strpos($html, '<!-- livue-assets -->');
        if ($markerPos !== false) {
            // Replace the marker with the scripts
            return str_replace('<!-- livue-assets -->', $scripts, $html);
        }

        // 2. Find the <head> section
        $headStart = stripos($html, '<head');
        $headEnd = stripos($html, '</head>');

        if ($headStart === false || $headEnd === false) {
            // No head section, inject before </body> as fallback
            $pos = stripos($html, '</body>');
            if ($pos !== false) {
                $html = substr_replace($html, $scripts . "\n", $pos, 0);
            }

            return $html;
        }

        // 3. Find first script or @vite in <head>
        $headContent = substr($html, $headStart, $headEnd - $headStart);

        // Look for @vite or <script in head section
        $vitePos = strpos($headContent, '@vite');
        $scriptPos = stripos($headContent, '<script');

        // Find the earliest position
        $insertPos = null;
        if ($vitePos !== false && $scriptPos !== false) {
            $insertPos = min($vitePos, $scriptPos);
        } elseif ($vitePos !== false) {
            $insertPos = $vitePos;
        } elseif ($scriptPos !== false) {
            $insertPos = $scriptPos;
        }

        if ($insertPos !== null) {
            // Insert before the first script/@vite (relative to document start)
            $absolutePos = $headStart + $insertPos;
            $html = substr_replace($html, $scripts . "\n    ", $absolutePos, 0);
        } else {
            // No scripts in head, insert before </head>
            $html = substr_replace($html, $scripts . "\n", $headEnd, 0);
        }

        return $html;
    }
}
