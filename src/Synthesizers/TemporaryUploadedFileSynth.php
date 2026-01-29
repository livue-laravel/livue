<?php

namespace LiVue\Synthesizers;

use LiVue\TemporaryUploadedFile;

/**
 * Synthesizer for single TemporaryUploadedFile properties.
 *
 * Dehydrate: [clientDisplayData, {s: 'tuf', path, disk}]
 * - Client-visible value contains display metadata (name, mime, size, preview URL)
 * - Server path is stored in the meta (protected by snapshot HMAC checksum)
 *
 * Hydrate: reconstruct TemporaryUploadedFile from meta path/disk + value metadata.
 */
class TemporaryUploadedFileSynth extends PropertySynthesizer
{
    public function key(): string
    {
        return 'tuf';
    }

    public function match(mixed $value): bool
    {
        return $value instanceof TemporaryUploadedFile;
    }

    public function dehydrate(mixed $value, string $property): array
    {
        /** @var TemporaryUploadedFile $value */
        $meta = [
            's' => 'tuf',
            'path' => $value->getPath(),
            'disk' => $value->getDisk(),
        ];

        $clientData = [
            'originalName' => $value->getOriginalName(),
            'mimeType' => $value->getMimeType(),
            'size' => $value->getSize(),
            'previewUrl' => $value->isImage() ? $value->temporaryUrl() : null,
        ];

        return [$clientData, $meta];
    }

    public function hydrate(mixed $value, array $meta, string $property): mixed
    {
        $path = $meta['path'] ?? null;
        $disk = $meta['disk'] ?? 'local';

        if ($path === null) {
            return null;
        }

        return new TemporaryUploadedFile(
            $path,
            $value['originalName'] ?? 'unknown',
            $value['mimeType'] ?? 'application/octet-stream',
            $value['size'] ?? 0,
            $disk
        );
    }
}
