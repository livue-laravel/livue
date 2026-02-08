<?php

namespace LiVue\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use LiVue\LiVueManager;
use LiVue\Features\SupportFileUploads\TemporaryUploadedFile;

class LiVueUploadController extends Controller
{
    /**
     * Handle file upload to temporary storage.
     *
     * Supports both single file and batch uploads:
     * - Single: file (single file) → returns single result object
     * - Batch: files[] (array) → returns { results: [], errors: [] }
     *
     * Common fields:
     * - component: component name (for logging/debugging)
     * - property: property name
     * - checksum: encrypted upload token containing class, property, and rules
     */
    public function upload(Request $request, LiVueManager $manager): JsonResponse
    {
        // Detect batch vs single mode
        $isBatch = $request->hasFile('files');

        // Validate common fields
        $request->validate([
            'component' => 'required|string',
            'property' => 'required|string',
            'checksum' => 'required|string',
        ]);

        // Validate file(s) presence
        if ($isBatch) {
            $request->validate([
                'files' => 'required|array|min:1',
                'files.*' => 'required|file',
            ]);
        } else {
            $request->validate([
                'file' => 'required|file',
            ]);
        }

        $componentName = $request->input('component');
        $property = $request->input('property');
        $checksum = $request->input('checksum');

        // Decrypt and verify the upload token
        try {
            $tokenData = decrypt($checksum);
        } catch (\Throwable $e) {
            return response()->json(['error' => 'Invalid upload token.'], 403);
        }

        // Verify token hasn't expired
        if (($tokenData['expires'] ?? 0) < now()->timestamp) {
            return response()->json(['error' => 'Upload token expired.'], 403);
        }

        // Verify the property matches
        if (($tokenData['property'] ?? '') !== $property) {
            return response()->json(['error' => 'Property mismatch.'], 403);
        }

        // Verify the component class exists
        $componentClass = $tokenData['class'] ?? null;
        if (! $componentClass || ! class_exists($componentClass)) {
            return response()->json(['error' => 'Component class not found.'], 404);
        }

        // Use validation rules from the token
        $rules = $tokenData['rules'] ?? [];

        // Batch upload mode
        if ($isBatch) {
            return $this->handleBatchUpload($request->file('files'), $rules, $componentName, $property);
        }

        // Single file mode
        return $this->handleSingleUpload($request->file('file'), $rules, $componentName, $property);
    }

    /**
     * Handle single file upload.
     */
    protected function handleSingleUpload($file, array $rules, string $componentName, string $property): JsonResponse
    {
        if (! empty($rules)) {
            $validator = validator(['file' => $file], ['file' => $rules]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation failed.',
                    'errors' => $validator->errors()->toArray(),
                ], 422);
            }
        }

        $tempFile = TemporaryUploadedFile::createFromUpload($file);

        return response()->json([
            'ref' => encrypt([
                'path' => $tempFile->getPath(),
                'disk' => $tempFile->getDisk(),
                'originalName' => $tempFile->getOriginalName(),
                'mimeType' => $tempFile->getMimeType(),
                'size' => $tempFile->getSize(),
                'component' => $componentName,
                'property' => $property,
                'expires' => now()->addHours(1)->timestamp,
            ]),
            'originalName' => $tempFile->getOriginalName(),
            'mimeType' => $tempFile->getMimeType(),
            'size' => $tempFile->getSize(),
            'previewUrl' => $tempFile->isImage() ? $tempFile->temporaryUrl() : null,
        ]);
    }

    /**
     * Handle batch file upload.
     */
    protected function handleBatchUpload(array $files, array $rules, string $componentName, string $property): JsonResponse
    {
        $results = [];
        $errors = [];

        foreach ($files as $index => $file) {
            // Validate each file individually
            if (! empty($rules)) {
                $validator = validator(['file' => $file], ['file' => $rules]);

                if ($validator->fails()) {
                    $errors[] = [
                        'index' => $index,
                        'file' => $file->getClientOriginalName(),
                        'error' => $validator->errors()->first('file'),
                    ];
                    continue;
                }
            }

            $tempFile = TemporaryUploadedFile::createFromUpload($file);

            $results[] = [
                'index' => $index,
                'ref' => encrypt([
                    'path' => $tempFile->getPath(),
                    'disk' => $tempFile->getDisk(),
                    'originalName' => $tempFile->getOriginalName(),
                    'mimeType' => $tempFile->getMimeType(),
                    'size' => $tempFile->getSize(),
                    'component' => $componentName,
                    'property' => $property,
                    'expires' => now()->addHours(1)->timestamp,
                ]),
                'originalName' => $tempFile->getOriginalName(),
                'mimeType' => $tempFile->getMimeType(),
                'size' => $tempFile->getSize(),
                'previewUrl' => $tempFile->isImage() ? $tempFile->temporaryUrl() : null,
            ];
        }

        return response()->json([
            'results' => $results,
            'errors' => $errors,
        ]);
    }

    /**
     * Remove one or more temporary uploaded files.
     *
     * Accepts an array of encrypted refs (same format returned by upload).
     * Each ref is decrypted, validated, and the temp file is deleted.
     * Invalid or expired refs are silently skipped.
     */
    public function remove(Request $request): JsonResponse
    {
        $request->validate([
            'refs' => 'required|array|min:1',
            'refs.*' => 'required|string',
        ]);

        $deleted = 0;

        foreach ($request->input('refs') as $ref) {
            try {
                $data = decrypt($ref);
            } catch (\Throwable $e) {
                continue;
            }

            $path = $data['path'] ?? null;
            $disk = $data['disk'] ?? 'local';

            if ($path && Storage::disk($disk)->exists($path)) {
                Storage::disk($disk)->delete($path);
                $deleted++;
            }
        }

        return response()->json(['deleted' => $deleted]);
    }

    /**
     * Serve a temporary file for preview via encrypted token.
     */
    public function preview(Request $request): mixed
    {
        $request->validate(['token' => 'required|string']);

        try {
            $data = decrypt($request->input('token'));
        } catch (\Throwable $e) {
            abort(403, 'Invalid preview token.');
        }

        if (($data['expires'] ?? 0) < now()->timestamp) {
            abort(403, 'Preview token expired.');
        }

        $disk = $data['disk'] ?? 'local';
        $path = $data['path'] ?? '';

        if (! Storage::disk($disk)->exists($path)) {
            abort(404, 'File not found.');
        }

        return Storage::disk($disk)->response($path);
    }

}
