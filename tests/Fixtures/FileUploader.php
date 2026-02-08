<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Attributes\Validate;
use LiVue\Component;
use LiVue\Features\SupportFileUploads\WithFileUploads;
use LiVue\Features\SupportFileUploads\TemporaryUploadedFile;

class FileUploader extends Component
{
    use WithFileUploads;

    public ?TemporaryUploadedFile $photo = null;

    public array $documents = [];

    public bool $uploaded = false;
    public ?string $filename = null;
    public array $uploadedFilenames = [];

    public function fileRules(): array
    {
        return [
            'photo' => ['image', 'max:2048'],
            'documents' => ['file', 'max:5120'],
        ];
    }

    public function savePhoto(): void
    {
        if ($this->photo === null) {
            $this->addError('photo', 'Please upload a photo first.');
            return;
        }

        $this->filename = $this->photo->getClientOriginalName();
        $this->uploaded = true;
        $this->dispatch('photo-uploaded', ['filename' => $this->filename]);
    }

    public function saveDocuments(): void
    {
        if (empty($this->documents)) {
            $this->addError('documents', 'Please upload at least one document.');
            return;
        }

        foreach ($this->documents as $document) {
            $this->uploadedFilenames[] = $document->getClientOriginalName();
        }

        $this->dispatch('documents-uploaded', ['count' => count($this->documents)]);
    }

    public function resetUpload(): void
    {
        $this->cleanupUploads();
        $this->photo = null;
        $this->documents = [];
        $this->uploaded = false;
        $this->filename = null;
        $this->uploadedFilenames = [];
    }

    public function render(): string
    {
        return 'fixtures.file-uploader';
    }
}
