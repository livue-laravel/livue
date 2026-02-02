<?php

namespace LiVue\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * Serves LiVue JavaScript assets via route.
 *
 * This eliminates the need for users to publish assets.
 * The JS file is served directly from the package's dist/ directory.
 */
class LiVueAssetController
{
    /**
     * Serve the LiVue JavaScript bundle.
     *
     * By default serves the standalone bundle.
     * With ?module query parameter, serves the ES module version.
     *
     * Examples:
     *   /livue/livue.js         → standalone bundle
     *   /livue/livue.js?module  → ES module (for import maps)
     */
    public function script(Request $request): BinaryFileResponse|Response
    {
        $isModule = $request->has('module');
        $path = $isModule ? $this->getEsmPath() : $this->getStandalonePath();

        if (! file_exists($path)) {
            $type = $isModule ? 'ESM' : 'standalone';

            return response("LiVue {$type} bundle not found. Run: npm run build:livue", 404);
        }

        return $this->serveFile($path, 'application/javascript');
    }

    /**
     * Serve the source map for debugging.
     *
     * Automatically detects which source map to serve based on ?module parameter.
     */
    public function sourceMap(Request $request): BinaryFileResponse|Response
    {
        $isModule = $request->has('module');
        $path = ($isModule ? $this->getEsmPath() : $this->getStandalonePath()) . '.map';

        if (! file_exists($path)) {
            return response('Source map not found', 404);
        }

        return $this->serveFile($path, 'application/json');
    }

    /**
     * Get the path to the standalone bundle.
     */
    protected function getStandalonePath(): string
    {
        return dirname(__DIR__, 3) . '/dist/livue.js';
    }

    /**
     * Get the path to the ES module bundle.
     */
    protected function getEsmPath(): string
    {
        return dirname(__DIR__, 3) . '/dist/livue.esm.js';
    }

    /**
     * Serve a file with appropriate headers.
     */
    protected function serveFile(string $path, string $mimeType): BinaryFileResponse
    {
        $lastModified = filemtime($path);
        $etag = md5_file($path);

        return response()->file($path, [
            'Content-Type' => $mimeType,
            'Cache-Control' => 'public, max-age=31536000',
            'ETag' => '"' . $etag . '"',
            'Last-Modified' => gmdate('D, d M Y H:i:s', $lastModified) . ' GMT',
        ]);
    }
}
