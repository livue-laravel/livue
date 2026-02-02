<?php

namespace LiVue\Assets;

use Composer\InstalledVersions;

/**
 * Base class for all asset types.
 *
 * Provides common functionality for managing package assets including
 * versioning, URL generation, and package association.
 */
abstract class Asset
{
    protected string $id;

    protected string $path;

    protected string $package = 'app';

    protected bool $isRemote = false;

    public function __construct(string $id, string $path = '')
    {
        $this->id = $id;
        $this->path = $path;
        $this->isRemote = $this->detectRemote($path);
    }

    /**
     * Create a new asset instance.
     */
    public static function make(string $id, string $path = ''): static
    {
        return new static($id, $path);
    }

    /**
     * Set the package this asset belongs to.
     */
    public function package(string $package): static
    {
        $this->package = $package;

        return $this;
    }

    /**
     * Get the asset ID.
     */
    public function getId(): string
    {
        return $this->id;
    }

    /**
     * Get the asset path.
     */
    public function getPath(): string
    {
        return $this->path;
    }

    /**
     * Get the package this asset belongs to.
     */
    public function getPackage(): string
    {
        return $this->package;
    }

    /**
     * Check if this is a remote asset (CDN, external URL).
     */
    public function isRemote(): bool
    {
        return $this->isRemote;
    }

    /**
     * Detect if a path is a remote URL.
     */
    protected function detectRemote(string $path): bool
    {
        return str_starts_with($path, 'http://')
            || str_starts_with($path, 'https://')
            || str_starts_with($path, '//');
    }

    /**
     * Get the version string for cache busting.
     *
     * For 'app' package, uses config value.
     * For other packages, tries to get version from Composer.
     */
    public function getVersion(): ?string
    {
        if ($this->package === 'app') {
            return config('livue.asset_version', config('app.asset_version'));
        }

        try {
            return InstalledVersions::getVersion($this->package);
        } catch (\OutOfBoundsException) {
            // Package not found in Composer, try filament/support-style fallback
            try {
                return InstalledVersions::getVersion('livue/livue');
            } catch (\OutOfBoundsException) {
                return null;
            }
        }
    }

    /**
     * Get the public URL for this asset.
     *
     * Remote assets return path as-is.
     * Local assets use configured path with optional version query string.
     */
    public function getUrl(): string
    {
        // Remote URL - return as-is
        if ($this->isRemote()) {
            return $this->path;
        }

        // If path is already a full URL (from url() helper), use it
        if (str_starts_with($this->path, '/') || str_contains($this->path, '://')) {
            $url = $this->path;
        } else {
            // Build path from configured assets directory
            $assetsPath = config('livue.assets_path', 'vendor/livue');
            $url = asset("{$assetsPath}/{$this->package}/{$this->id}.{$this->getExtension()}");
        }

        // Append version for cache busting
        if ($version = $this->getVersion()) {
            $separator = str_contains($url, '?') ? '&' : '?';
            $url .= $separator . 'v=' . $version;
        }

        return $url;
    }

    /**
     * Get the file extension for this asset type.
     */
    abstract public function getExtension(): string;

    /**
     * Render the HTML tag for this asset.
     */
    abstract public function toHtml(?string $nonce = null): string;
}
