<?php

namespace LiVue\Features\SupportFileUploads;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TemporaryUploadedFile
{
    /**
     * @param  string  $path          Path in temporary storage
     * @param  string  $originalName  Original client filename
     * @param  string  $mimeType      MIME type
     * @param  int     $size          File size in bytes
     * @param  string  $disk          Storage disk used for temp
     */
    public function __construct(
        protected string $path,
        protected string $originalName,
        protected string $mimeType,
        protected int $size,
        protected string $disk = 'local'
    ) {}

    /**
     * Create from a Laravel UploadedFile and store to temp directory.
     */
    public static function createFromUpload(UploadedFile $file): static
    {
        $disk = config('livue.temp_upload_disk', 'local');
        $directory = config('livue.temp_upload_directory', 'livue-tmp');

        $path = $file->store($directory, $disk);

        return new static(
            $path,
            $file->getClientOriginalName(),
            $file->getMimeType(),
            $file->getSize(),
            $disk
        );
    }

    /**
     * Store the file permanently with a random filename.
     *
     * @return string The path of the stored file
     */
    public function store(string $directory, string $disk = 'public'): string
    {
        $extension = pathinfo($this->originalName, PATHINFO_EXTENSION);
        $filename = Str::random(40) . ($extension ? '.' . $extension : '');
        $newPath = rtrim($directory, '/') . '/' . $filename;

        Storage::disk($disk)->put(
            $newPath,
            Storage::disk($this->disk)->get($this->path)
        );

        $this->delete();

        return $newPath;
    }

    /**
     * Store the file permanently with a specific filename.
     *
     * @return string The path of the stored file
     */
    public function storeAs(string $directory, string $name, string $disk = 'public'): string
    {
        $newPath = rtrim($directory, '/') . '/' . $name;

        Storage::disk($disk)->put(
            $newPath,
            Storage::disk($this->disk)->get($this->path)
        );

        $this->delete();

        return $newPath;
    }

    /**
     * Get a temporary preview URL (encrypted token routed to the preview controller).
     */
    public function temporaryUrl(): string
    {
        $token = encrypt([
            'path' => $this->path,
            'disk' => $this->disk,
            'expires' => now()->addMinutes(30)->timestamp,
        ]);

        $prefix = config('livue.route_prefix', 'livue');

        return '/' . $prefix . '/upload-preview?token=' . urlencode($token);
    }

    /**
     * Check if the temp file still exists.
     */
    public function exists(): bool
    {
        return Storage::disk($this->disk)->exists($this->path);
    }

    /**
     * Delete the temporary file.
     */
    public function delete(): void
    {
        Storage::disk($this->disk)->delete($this->path);
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function getOriginalName(): string
    {
        return $this->originalName;
    }

    public function getMimeType(): string
    {
        return $this->mimeType;
    }

    public function getSize(): int
    {
        return $this->size;
    }

    public function getDisk(): string
    {
        return $this->disk;
    }

    /**
     * Check if this file is an image based on MIME type.
     */
    public function isImage(): bool
    {
        return str_starts_with($this->mimeType, 'image/');
    }
}
