<?php

namespace LiVue\Features\SupportFileUploads;

use LiVue\TemporaryUploadedFile;
use ReflectionClass;
use ReflectionNamedType;
use ReflectionProperty;

/**
 * Add file upload support to a LiVue component.
 *
 * Properties typed as ?TemporaryUploadedFile (single) or array (multiple)
 * will be populated by the upload system after the client uploads files.
 *
 * Override fileRules() to define per-property validation rules.
 */
trait WithFileUploads
{
    /**
     * Define file validation rules per upload property.
     * Override in your component.
     *
     * @return array<string, array|string> property => rules
     */
    public function fileRules(): array
    {
        return [];
    }

    /**
     * Generate upload authorization tokens for file properties.
     * Each token is an HMAC over "upload:{component}:{property}" using the app key.
     *
     * @return array<string, string> property => HMAC token
     */
    public function getUploadTokens(): array
    {
        $tokens = [];
        $componentName = $this->getName();
        $key = $this->getUploadKey();
        $properties = $this->getFileUploadProperties();

        foreach ($properties as $property) {
            $tokens[$property] = hash_hmac('sha256', "upload:{$componentName}:{$property}", $key);
        }

        return $tokens;
    }

    /**
     * Get the list of properties that accept file uploads.
     * Detected via type hints (TemporaryUploadedFile) or presence in fileRules().
     *
     * @return string[]
     */
    public function getFileUploadProperties(): array
    {
        $properties = [];
        $reflection = new ReflectionClass($this);
        $fileRules = $this->fileRules();

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            if ($property->getDeclaringClass()->getName() === \LiVue\Component::class) {
                continue;
            }

            $propName = $property->getName();
            $type = $property->getType();

            // Check type hint for TemporaryUploadedFile
            if ($type instanceof ReflectionNamedType) {
                $typeName = $type->getName();

                if ($typeName === TemporaryUploadedFile::class) {
                    $properties[] = $propName;
                    continue;
                }
            }

            // Check if array property is listed in fileRules()
            if (isset($fileRules[$propName])) {
                $properties[] = $propName;
            }
        }

        return $properties;
    }

    /**
     * Clean up all temporary files on this component.
     */
    public function cleanupUploads(): void
    {
        foreach ($this->getFileUploadProperties() as $property) {
            $value = $this->{$property};

            if ($value instanceof TemporaryUploadedFile) {
                if ($value->exists()) {
                    $value->delete();
                }
            } elseif (is_array($value)) {
                foreach ($value as $item) {
                    if ($item instanceof TemporaryUploadedFile && $item->exists()) {
                        $item->delete();
                    }
                }
            }
        }
    }

    private function getUploadKey(): string
    {
        $key = config('app.key');

        if (str_starts_with($key, 'base64:')) {
            $key = base64_decode(substr($key, 7));
        }

        return $key;
    }
}
