<?php

namespace LiVue\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Controller for file downloads from components.
 *
 * Handles GET /livue/download requests with encrypted tokens.
 */
class LiVueDownloadController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $request->validate(['token' => 'required|string']);

        try {
            $data = decrypt($request->input('token'));
        } catch (\Throwable $e) {
            abort(403, 'Invalid download token.');
        }

        // Verify token hasn't expired
        if (($data['expires'] ?? 0) < now()->timestamp) {
            abort(403, 'Download token expired.');
        }

        $name = $data['name'] ?? 'download';
        $headers = $data['headers'] ?? [];

        // Content-based download (from downloadContent())
        if (isset($data['type']) && $data['type'] === 'content') {
            return response($data['content'], 200, array_merge([
                'Content-Type' => 'application/octet-stream',
                'Content-Disposition' => 'attachment; filename="' . $this->sanitizeFilename($name) . '"',
            ], $headers));
        }

        // File-based download (from download())
        $path = $data['path'] ?? '';
        $disk = $data['disk'] ?? null;

        if ($disk) {
            // Storage disk download
            if (!Storage::disk($disk)->exists($path)) {
                abort(404, 'File not found.');
            }

            return Storage::disk($disk)->download($path, $name, $headers);
        }

        // Local filesystem download
        if (!file_exists($path)) {
            abort(404, 'File not found.');
        }

        return response()->download($path, $name, $headers);
    }

    /**
     * Sanitize filename to prevent header injection.
     */
    private function sanitizeFilename(string $filename): string
    {
        // Remove path separators and null bytes
        $filename = str_replace(['/', '\\', "\0"], '', $filename);

        // Remove or encode problematic characters
        $filename = preg_replace('/["\r\n]/', '', $filename);

        return $filename ?: 'download';
    }
}
