<?php

namespace LiVue\Synthesizers;

use LiVue\Features\SupportFileUploads\TemporaryUploadedFile;

/**
 * Synthesizer for arrays of TemporaryUploadedFile.
 *
 * Dehydrate: [arrayOfClientData, {s: 'tua', items: [{path, disk}, ...]}]
 * Hydrate: reconstruct array of TemporaryUploadedFile from item metadata.
 */
class TemporaryUploadedFileArraySynth extends PropertySynthesizer
{
    public function key(): string
    {
        return 'tua';
    }

    public function match(mixed $value): bool
    {
        if (! is_array($value) || empty($value)) {
            return false;
        }

        foreach ($value as $item) {
            if (! ($item instanceof TemporaryUploadedFile)) {
                return false;
            }
        }

        return true;
    }

    public function dehydrate(mixed $value, string $property): array
    {
        $clientData = [];
        $items = [];

        foreach ($value as $file) {
            /** @var TemporaryUploadedFile $file */
            $clientData[] = [
                'originalName' => $file->getOriginalName(),
                'mimeType' => $file->getMimeType(),
                'size' => $file->getSize(),
                'previewUrl' => $file->isImage() ? $file->temporaryUrl() : null,
            ];

            $items[] = [
                'path' => $file->getPath(),
                'disk' => $file->getDisk(),
            ];
        }

        $meta = [
            's' => 'tua',
            'items' => $items,
        ];

        return [$clientData, $meta];
    }

    public function hydrate(mixed $value, array $meta, string $property): mixed
    {
        $items = $meta['items'] ?? [];
        $result = [];

        foreach ($items as $i => $itemMeta) {
            $clientData = $value[$i] ?? [];
            $path = $itemMeta['path'] ?? null;
            $disk = $itemMeta['disk'] ?? 'local';

            if ($path === null) {
                continue;
            }

            $result[] = new TemporaryUploadedFile(
                $path,
                $clientData['originalName'] ?? 'unknown',
                $clientData['mimeType'] ?? 'application/octet-stream',
                $clientData['size'] ?? 0,
                $disk
            );
        }

        return $result;
    }
}
