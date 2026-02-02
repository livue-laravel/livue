<?php

namespace LiVue\Http\Controllers;

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
     */
    public function script(): BinaryFileResponse|Response
    {
        $path = $this->getScriptPath();

        if (! file_exists($path)) {
            return response('LiVue script not found. Run: npm run build:livue', 404);
        }

        return $this->serveFile($path, 'application/javascript');
    }

    /**
     * Serve the LiVue ES Module bundle.
     *
     * This version is for use with import maps and bundlers.
     * It exports LiVue as an ES module.
     */
    public function esm(): BinaryFileResponse|Response
    {
        $path = $this->getEsmPath();

        if (! file_exists($path)) {
            return response('LiVue ESM not found. Run: npm run build:livue', 404);
        }

        return $this->serveFile($path, 'application/javascript');
    }

    /**
     * Serve the source map for debugging.
     */
    public function sourceMap(): BinaryFileResponse|Response
    {
        $path = $this->getScriptPath() . '.map';

        if (! file_exists($path)) {
            return response('Source map not found', 404);
        }

        return $this->serveFile($path, 'application/json');
    }

    /**
     * Serve the ESM source map for debugging.
     */
    public function esmSourceMap(): BinaryFileResponse|Response
    {
        $path = $this->getEsmPath() . '.map';

        if (! file_exists($path)) {
            return response('ESM source map not found', 404);
        }

        return $this->serveFile($path, 'application/json');
    }

    /**
     * Get the path to the script file.
     */
    protected function getScriptPath(): string
    {
        return dirname(__DIR__, 3) . '/dist/livue.js';
    }

    /**
     * Get the path to the ESM script file.
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
