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
     * Get the path to the script file.
     */
    protected function getScriptPath(): string
    {
        return dirname(__DIR__, 3) . '/dist/livue.js';
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
