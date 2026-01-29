<?php

namespace LiVue\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;
use LiVue\LiVueManager;
use LiVue\TemporaryUploadedFile;

class LiVueUploadController extends Controller
{
    /**
     * Handle file upload to temporary storage.
     *
     * Expects multipart/form-data with:
     * - file: the uploaded file
     * - component: component name
     * - property: property name
     * - checksum: HMAC upload token
     */
    public function upload(Request $request, LiVueManager $manager): JsonResponse
    {
        $request->validate([
            'file' => 'required|file',
            'component' => 'required|string',
            'property' => 'required|string',
            'checksum' => 'required|string',
        ]);

        $componentName = $request->input('component');
        $property = $request->input('property');
        $checksum = $request->input('checksum');

        // Verify the component exists
        if (! $manager->componentExists($componentName)) {
            return response()->json(['error' => 'Component not found.'], 404);
        }

        // Verify the upload HMAC token
        if (! $this->verifyUploadAuth($componentName, $property, $checksum)) {
            return response()->json(['error' => 'Unauthorized upload.'], 403);
        }

        // Resolve component to check for file validation rules
        $component = $manager->resolve($componentName);
        $rules = $this->getFileRules($component, $property);

        if (! empty($rules)) {
            $request->validate(['file' => $rules]);
        }

        $file = $request->file('file');
        $tempFile = TemporaryUploadedFile::createFromUpload($file);

        // Return encrypted reference (client cannot forge) + display metadata
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

    /**
     * Verify the HMAC upload token.
     */
    protected function verifyUploadAuth(string $component, string $property, string $checksum): bool
    {
        $expected = hash_hmac('sha256', "upload:{$component}:{$property}", $this->getKey());

        return hash_equals($expected, $checksum);
    }

    /**
     * Get file validation rules from the component's fileRules() method.
     */
    protected function getFileRules(mixed $component, string $property): array
    {
        if (method_exists($component, 'fileRules')) {
            $rules = $component->fileRules();

            return $rules[$property] ?? [];
        }

        return [];
    }

    protected function getKey(): string
    {
        $key = config('app.key');

        if (str_starts_with($key, 'base64:')) {
            $key = base64_decode(substr($key, 7));
        }

        return $key;
    }
}
