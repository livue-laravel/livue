<?php

use LiVue\Tests\Fixtures\FileUploader;

describe('File Uploads', function () {

    describe('Component Setup', function () {

        it('detects file upload properties', function () {
            $testable = livue(FileUploader::class);
            $component = $testable->instance();

            $properties = $component->getFileUploadProperties();

            expect($properties)->toContain('photo');
            expect($properties)->toContain('documents');
        });

        it('generates upload tokens for properties', function () {
            $testable = livue(FileUploader::class);
            $component = $testable->instance();

            $tokens = $component->getUploadTokens();

            expect($tokens)->toHaveKey('photo');
            expect($tokens)->toHaveKey('documents');
            expect($tokens['photo'])->toBeString();
            expect($tokens['documents'])->toBeString();
        });

        it('returns file rules', function () {
            $testable = livue(FileUploader::class);
            $component = $testable->instance();

            $rules = $component->fileRules();

            expect($rules['photo'])->toBe(['image', 'max:2048']);
            expect($rules['documents'])->toBe(['file', 'max:5120']);
        });

    });

    describe('Initial State', function () {

        it('initializes with null photo', function () {
            livue(FileUploader::class)
                ->assertSet('photo', null)
                ->assertSet('uploaded', false)
                ->assertSet('filename', null);
        });

        it('initializes with empty documents array', function () {
            livue(FileUploader::class)
                ->assertSet('documents', [])
                ->assertSet('uploadedFilenames', []);
        });

    });

    describe('Validation', function () {

        it('requires photo before saving', function () {
            livue(FileUploader::class)
                ->call('savePhoto')
                ->assertHasErrors('photo');
        });

        it('requires documents before saving', function () {
            livue(FileUploader::class)
                ->call('saveDocuments')
                ->assertHasErrors('documents');
        });

    });

    describe('Reset', function () {

        it('resets upload state', function () {
            livue(FileUploader::class)
                ->set('uploaded', true)
                ->set('filename', 'test.jpg')
                ->call('resetUpload')
                ->assertSet('uploaded', false)
                ->assertSet('filename', null)
                ->assertSet('photo', null)
                ->assertSet('documents', [])
                ->assertSet('uploadedFilenames', []);
        });

    });

});
