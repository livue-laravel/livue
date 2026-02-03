<?php

namespace LiVue\Features\SupportDownloads;

/**
 * Trait HandlesDownloads
 *
 * Provides file download functionality for LiVue components.
 * Allows components to trigger file downloads from storage or content.
 */
trait HandlesDownloads
{
    /**
     * Download intent set during the current request.
     */
    private ?array $downloadIntent = null;

    /**
     * Trigger a file download from the component.
     *
     * @param string      $path    Path to file or storage path
     * @param string|null $name    Download filename (defaults to original name)
     * @param array       $headers Additional HTTP headers
     * @param string|null $disk    Storage disk (null for local filesystem)
     */
    public function download(string $path, ?string $name = null, array $headers = [], ?string $disk = null): void
    {
        $this->downloadIntent = [
            'path' => $path,
            'name' => $name ?? basename($path),
            'headers' => $headers,
            'disk' => $disk,
        ];
    }

    /**
     * Stream download directly from content.
     *
     * @param string $content The file content
     * @param string $name    Download filename
     * @param array  $headers Additional HTTP headers
     */
    public function downloadContent(string $content, string $name, array $headers = []): void
    {
        $this->downloadIntent = [
            'content' => $content,
            'name' => $name,
            'headers' => $headers,
            'type' => 'content',
        ];
    }

    /**
     * Get and clear the download intent.
     *
     * @return array|null The download intent or null if none set
     */
    public function getDownload(): ?array
    {
        $download = $this->downloadIntent;
        $this->downloadIntent = null;

        return $download;
    }
}
