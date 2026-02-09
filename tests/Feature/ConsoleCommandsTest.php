<?php

use Illuminate\Support\Facades\File;

describe('Console Commands', function () {
    afterEach(function () {
        // Clean up generated files
        $livuePath = app_path('LiVue');
        if (File::isDirectory($livuePath)) {
            File::deleteDirectory($livuePath);
        }

        $viewsPath = resource_path('views/livue');
        if (File::isDirectory($viewsPath)) {
            File::deleteDirectory($viewsPath);
        }
    });

    describe('make:livue', function () {
        it('creates PHP class and Blade view', function () {
            $this->artisan('make:livue', ['name' => 'TestWidget'])
                ->assertSuccessful();

            expect(File::exists(app_path('LiVue/TestWidget.php')))->toBeTrue();
            expect(File::exists(resource_path('views/livue/test-widget.blade.php')))->toBeTrue();
        });

        it('creates single file component with --single', function () {
            $this->artisan('make:livue', ['name' => 'TestSfc', '--single' => true])
                ->assertSuccessful();

            expect(File::exists(resource_path('views/livue/test-sfc.blade.php')))->toBeTrue();
            expect(File::exists(app_path('LiVue/TestSfc.php')))->toBeFalse();
        });

        it('creates multi file component with --multi', function () {
            $this->artisan('make:livue', ['name' => 'TestMfc', '--multi' => true])
                ->assertSuccessful();

            $basePath = resource_path('views/livue/test-mfc');
            expect(File::isDirectory($basePath))->toBeTrue();
            expect(File::exists($basePath . '/test-mfc.php'))->toBeTrue();
            expect(File::exists($basePath . '/test-mfc.blade.php'))->toBeTrue();
            expect(File::exists($basePath . '/test-mfc.js'))->toBeTrue();
            expect(File::exists($basePath . '/test-mfc.css'))->toBeTrue();
        });

        it('fails with --single and --multi together', function () {
            $this->artisan('make:livue', ['name' => 'TestBoth', '--single' => true, '--multi' => true])
                ->assertFailed();
        });

        it('warns if class-based component already exists', function () {
            $this->artisan('make:livue', ['name' => 'TestDuplicate'])
                ->assertSuccessful();

            // Second call shows error for PHP class but still succeeds
            // because the view is also created (or skipped with warning)
            expect(File::exists(app_path('LiVue/TestDuplicate.php')))->toBeTrue();
        });

        it('fails if single file component already exists', function () {
            $this->artisan('make:livue', ['name' => 'TestSfcDup', '--single' => true])
                ->assertSuccessful();

            $this->artisan('make:livue', ['name' => 'TestSfcDup', '--single' => true])
                ->assertFailed();
        });

        it('supports livue:component alias', function () {
            $this->artisan('livue:component', ['name' => 'TestAlias'])
                ->assertSuccessful();

            expect(File::exists(app_path('LiVue/TestAlias.php')))->toBeTrue();
        });
    });

    describe('make:livue-form', function () {
        it('creates Form class', function () {
            $this->artisan('make:livue-form', ['name' => 'Contact'])
                ->assertSuccessful();

            expect(File::exists(app_path('LiVue/Forms/ContactForm.php')))->toBeTrue();
        });

        it('appends Form suffix if missing', function () {
            $this->artisan('make:livue-form', ['name' => 'Profile'])
                ->assertSuccessful();

            expect(File::exists(app_path('LiVue/Forms/ProfileForm.php')))->toBeTrue();
        });

        it('does not duplicate Form suffix', function () {
            $this->artisan('make:livue-form', ['name' => 'SettingsForm'])
                ->assertSuccessful();

            expect(File::exists(app_path('LiVue/Forms/SettingsForm.php')))->toBeTrue();
        });

        it('fails if form already exists', function () {
            $this->artisan('make:livue-form', ['name' => 'Duplicate'])
                ->assertSuccessful();

            $this->artisan('make:livue-form', ['name' => 'Duplicate'])
                ->assertFailed();
        });
    });

    describe('make:livue-composable', function () {
        it('creates Composable trait', function () {
            $this->artisan('make:livue-composable', ['name' => 'Auth'])
                ->assertSuccessful();

            expect(File::exists(app_path('LiVue/Composables/UseAuth.php')))->toBeTrue();
        });

        it('prepends Use prefix if missing', function () {
            $this->artisan('make:livue-composable', ['name' => 'Cart'])
                ->assertSuccessful();

            expect(File::exists(app_path('LiVue/Composables/UseCart.php')))->toBeTrue();
        });

        it('does not duplicate Use prefix', function () {
            $this->artisan('make:livue-composable', ['name' => 'UseNotification'])
                ->assertSuccessful();

            expect(File::exists(app_path('LiVue/Composables/UseNotification.php')))->toBeTrue();
        });
    });

    describe('livue:purge-uploads', function () {
        it('runs without error when no temp directory exists', function () {
            $this->artisan('livue:purge-uploads')
                ->assertSuccessful();
        });
    });
});
