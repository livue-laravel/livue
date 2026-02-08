<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use LiVue\TemporaryUploadedFile;
use LiVue\Tests\Fixtures\FileUploader;

describe('Upload Cleanup', function () {

    beforeEach(function () {
        Storage::fake('local');
    });

    describe('Purge Command', function () {

        it('deletes files older than max age', function () {
            $disk = Storage::disk('local');
            $directory = config('livue.temp_upload_directory', 'livue-tmp');

            // Create old file (2 hours ago)
            $disk->put("{$directory}/old-file.jpg", 'old content');
            touch($disk->path("{$directory}/old-file.jpg"), now()->subHours(2)->timestamp);

            // Create recent file (5 minutes ago)
            $disk->put("{$directory}/recent-file.jpg", 'recent content');

            $this->artisan('livue:purge-uploads')
                ->assertSuccessful();

            expect($disk->exists("{$directory}/old-file.jpg"))->toBeFalse();
            expect($disk->exists("{$directory}/recent-file.jpg"))->toBeTrue();
        });

        it('respects --hours option', function () {
            $disk = Storage::disk('local');
            $directory = config('livue.temp_upload_directory', 'livue-tmp');

            // Create file 30 minutes ago
            $disk->put("{$directory}/half-hour.jpg", 'content');
            touch($disk->path("{$directory}/half-hour.jpg"), now()->subMinutes(30)->timestamp);

            // With default 1 hour: should NOT delete
            $this->artisan('livue:purge-uploads')
                ->assertSuccessful();

            expect($disk->exists("{$directory}/half-hour.jpg"))->toBeTrue();

            // With 0 hours (delete everything): should delete
            $this->artisan('livue:purge-uploads', ['--hours' => 0])
                ->assertSuccessful();

            expect($disk->exists("{$directory}/half-hour.jpg"))->toBeFalse();
        });

        it('handles empty directory gracefully', function () {
            $this->artisan('livue:purge-uploads')
                ->assertSuccessful();
        });

        it('reports count of deleted files', function () {
            $disk = Storage::disk('local');
            $directory = config('livue.temp_upload_directory', 'livue-tmp');

            $disk->put("{$directory}/old1.jpg", 'c1');
            $disk->put("{$directory}/old2.jpg", 'c2');
            touch($disk->path("{$directory}/old1.jpg"), now()->subHours(2)->timestamp);
            touch($disk->path("{$directory}/old2.jpg"), now()->subHours(2)->timestamp);

            $this->artisan('livue:purge-uploads')
                ->expectsOutputToContain('2')
                ->assertSuccessful();
        });

    });

    describe('Remove Endpoint', function () {

        it('deletes temp files by encrypted ref', function () {
            $disk = Storage::disk('local');
            $directory = config('livue.temp_upload_directory', 'livue-tmp');

            // Create a temp file
            $path = "{$directory}/test-file.jpg";
            $disk->put($path, 'file content');

            $ref = encrypt([
                'path' => $path,
                'disk' => 'local',
                'originalName' => 'photo.jpg',
                'mimeType' => 'image/jpeg',
                'size' => 1234,
                'component' => 'file-uploader',
                'property' => 'photo',
                'expires' => now()->addHour()->timestamp,
            ]);

            $response = $this->postJson('/livue/upload-remove', [
                'refs' => [$ref],
            ]);

            $response->assertOk();
            $response->assertJson(['deleted' => 1]);
            expect($disk->exists($path))->toBeFalse();
        });

        it('handles multiple refs', function () {
            $disk = Storage::disk('local');
            $directory = config('livue.temp_upload_directory', 'livue-tmp');

            $disk->put("{$directory}/file1.jpg", 'c1');
            $disk->put("{$directory}/file2.jpg", 'c2');

            $ref1 = encrypt(['path' => "{$directory}/file1.jpg", 'disk' => 'local']);
            $ref2 = encrypt(['path' => "{$directory}/file2.jpg", 'disk' => 'local']);

            $response = $this->postJson('/livue/upload-remove', [
                'refs' => [$ref1, $ref2],
            ]);

            $response->assertOk();
            $response->assertJson(['deleted' => 2]);
            expect($disk->exists("{$directory}/file1.jpg"))->toBeFalse();
            expect($disk->exists("{$directory}/file2.jpg"))->toBeFalse();
        });

        it('skips invalid refs silently', function () {
            $response = $this->postJson('/livue/upload-remove', [
                'refs' => ['invalid-encrypted-string'],
            ]);

            $response->assertOk();
            $response->assertJson(['deleted' => 0]);
        });

        it('skips refs for non-existent files', function () {
            $ref = encrypt([
                'path' => 'livue-tmp/does-not-exist.jpg',
                'disk' => 'local',
            ]);

            $response = $this->postJson('/livue/upload-remove', [
                'refs' => [$ref],
            ]);

            $response->assertOk();
            $response->assertJson(['deleted' => 0]);
        });

        it('validates refs is required', function () {
            $this->withExceptionHandling();

            $response = $this->postJson('/livue/upload-remove', []);

            $response->assertStatus(422);
        });

        it('validates refs must be an array', function () {
            $this->withExceptionHandling();

            $response = $this->postJson('/livue/upload-remove', [
                'refs' => 'not-an-array',
            ]);

            $response->assertStatus(422);
        });

    });

    describe('TemporaryUploadedFile Cleanup', function () {

        it('deletes temp file on store()', function () {
            $disk = Storage::disk('local');
            Storage::fake('public');

            $file = UploadedFile::fake()->image('photo.jpg');
            $tempFile = TemporaryUploadedFile::createFromUpload($file);
            $tempPath = $tempFile->getPath();

            expect($disk->exists($tempPath))->toBeTrue();

            $tempFile->store('photos');

            expect($disk->exists($tempPath))->toBeFalse();
        });

        it('deletes temp file on storeAs()', function () {
            $disk = Storage::disk('local');
            Storage::fake('public');

            $file = UploadedFile::fake()->image('photo.jpg');
            $tempFile = TemporaryUploadedFile::createFromUpload($file);
            $tempPath = $tempFile->getPath();

            $tempFile->storeAs('photos', 'avatar.jpg');

            expect($disk->exists($tempPath))->toBeFalse();
        });

        it('cleanupUploads deletes all temp files on component', function () {
            $disk = Storage::disk('local');

            $file1 = UploadedFile::fake()->image('photo1.jpg');
            $file2 = UploadedFile::fake()->create('doc1.pdf', 100);
            $file3 = UploadedFile::fake()->create('doc2.pdf', 100);

            $temp1 = TemporaryUploadedFile::createFromUpload($file1);
            $temp2 = TemporaryUploadedFile::createFromUpload($file2);
            $temp3 = TemporaryUploadedFile::createFromUpload($file3);

            $testable = livue(FileUploader::class);
            $component = $testable->instance();
            $component->photo = $temp1;
            $component->documents = [$temp2, $temp3];

            expect($disk->exists($temp1->getPath()))->toBeTrue();
            expect($disk->exists($temp2->getPath()))->toBeTrue();
            expect($disk->exists($temp3->getPath()))->toBeTrue();

            $component->cleanupUploads();

            expect($disk->exists($temp1->getPath()))->toBeFalse();
            expect($disk->exists($temp2->getPath()))->toBeFalse();
            expect($disk->exists($temp3->getPath()))->toBeFalse();
        });

    });

});
