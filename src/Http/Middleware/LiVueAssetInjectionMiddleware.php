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
 * 2. Injects CSRF meta tag if not already present (for AJAX requests)
 * 3. Injects component CSS (#[Css]) before </head>
 * 4. Injects JS (LiVue bundle + component #[Js]) before </body>
 * 5. Prevents duplicate injection if @livueScripts/@livueStyles are already present
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

        // Inject CSRF meta tag if not present
        if (! $this->hasCsrfMetaTag($html)) {
            $html = $this->injectCsrfToken($html);
        }

        // Inject styles (component CSS) before </head>
        if (! $this->hasStylesAlready($html)) {
            $html = $this->injectStyles($html);
        }

        // Inject scripts before </body>
        if (! $this->hasScriptsAlready($html)) {
            $html = $this->injectScripts($html);
        }

        // For full-page responses, execute on-request loaders early by hoisting them to <head>.
        // For SPA navigate responses, keep loaders in body so the navigation runtime can
        // replay and execute them after DOM swap.
        if (! $request->headers->has('X-LiVue-Navigate')) {
            $html = $this->hoistOnRequestLoadersToHead($html);
        }

        $response->setContent($html);

        return $response;
    }

    /**
     * Determine if assets should be injected into this response.
     */
    protected function shouldInjectAssets(BaseResponse $response): bool
    {
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
     * Check if a CSRF meta tag is already present in the HTML.
     */
    protected function hasCsrfMetaTag(string $html): bool
    {
        return (bool) preg_match('/<meta\s[^>]*name=["\']csrf-token["\']/i', $html);
    }

    /**
     * Inject CSRF meta tag before </head>.
     */
    protected function injectCsrfToken(string $html): string
    {
        $token = csrf_token();
        $meta = '<meta name="csrf-token" content="' . e($token) . '">';

        $pos = stripos($html, '</head>');

        if ($pos !== false) {
            $html = substr_replace($html, $meta . "\n    ", $pos, 0);
        }

        return $html;
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
        // Check for the smart loader (data-livue-loader attribute)
        if (str_contains($html, 'data-livue-loader')) {
            return true;
        }

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

    /**
     * Move @livueLoadStyle/@livueLoadScript loader snippets into <head>.
     *
     * This avoids late execution in the middle of body markup, reducing
     * FOUC/race conditions for scoped assets that should be available early.
     */
    protected function hoistOnRequestLoadersToHead(string $html): string
    {
        if (! str_contains($html, 'data-livue-on-request-loader')) {
            return $html;
        }

        $pattern = '/<script\b[^>]*\bdata-livue-on-request-loader\b[^>]*>.*?<\/script>\s*/is';

        if (! preg_match_all($pattern, $html, $matches)) {
            return $html;
        }

        $uniqueSnippets = [];
        foreach ($matches[0] as $snippet) {
            $normalized = trim($snippet);
            if ($normalized === '') {
                continue;
            }

            $uniqueSnippets[$normalized] = $normalized;
        }

        if ($uniqueSnippets === []) {
            return $html;
        }

        $hoisted = implode("\n", array_values($uniqueSnippets));
        $html = preg_replace($pattern, '', $html) ?? $html;

        $headEnd = stripos($html, '</head>');
        if ($headEnd !== false) {
            return substr_replace($html, $hoisted . "\n", $headEnd, 0);
        }

        $bodyEnd = stripos($html, '</body>');
        if ($bodyEnd !== false) {
            return substr_replace($html, $hoisted . "\n", $bodyEnd, 0);
        }

        return $hoisted . "\n" . $html;
    }
}
