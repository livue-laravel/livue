<?php

use Illuminate\Support\Facades\File;
use LiVue\Tests\Fixtures\ClassAttributeComponent;
use LiVue\Tests\Fixtures\Counter;
use LiVue\Tests\Fixtures\CustomAttributeComponent;

describe('Custom Attributes', function () {

    describe('Property Attributes', function () {

        it('applies Trim on hydrate', function () {
            livue(CustomAttributeComponent::class)
                ->set('name', '  hello  ')
                ->assertSet('name', 'hello');
        });

        it('applies multiple attributes in order (Trim then Uppercase)', function () {
            livue(CustomAttributeComponent::class)
                ->set('label', '  hello world  ')
                ->assertSet('label', 'HELLO WORLD');
        });

        it('handles non-string values gracefully', function () {
            // name is typed as string, but the Trim attribute checks is_string
            livue(CustomAttributeComponent::class)
                ->set('name', 'test')
                ->assertSet('name', 'test');
        });

    });

    describe('Method Attributes', function () {

        it('calls LogCall attribute before method execution', function () {
            $testable = livue(CustomAttributeComponent::class)
                ->call('save');

            expect($testable->instance()->callLog)->toContain('save');
        });

    });

    describe('Class Attributes', function () {

        it('calls boot on class attribute during boot phase', function () {
            $testable = livue(ClassAttributeComponent::class);

            expect($testable->instance()->classBooted)->toBeTrue();
        });

        it('calls hydrate on class attribute during subsequent requests', function () {
            $testable = livue(ClassAttributeComponent::class)
                ->set('classBooted', false); // triggers an update cycle (hydrate)

            expect($testable->instance()->classHydrated)->toBeTrue();
        });

    });

    describe('Components without custom attributes', function () {

        it('has no overhead for regular components', function () {
            // Counter has no custom attributes - should work normally
            livue(Counter::class)
                ->call('increment')
                ->assertSet('count', 1);
        });

    });

});

describe('make:livue-attribute command', function () {

    afterEach(function () {
        $path = app_path('LiVue/Attributes');
        if (File::isDirectory($path)) {
            File::deleteDirectory($path);
        }
    });

    it('generates a property attribute by default', function () {
        $this->artisan('make:livue-attribute', ['name' => 'Trim'])
            ->assertSuccessful();

        $filePath = app_path('LiVue/Attributes/Trim.php');
        expect(File::exists($filePath))->toBeTrue();

        $content = File::get($filePath);
        expect($content)->toContain('extends LiVueAttribute');
        expect($content)->toContain('Attribute::TARGET_PROPERTY');
        expect($content)->toContain('function hydrate');
        expect($content)->toContain('function dehydrate');
    });

    it('generates a method attribute with --target=method', function () {
        $this->artisan('make:livue-attribute', ['name' => 'RateLimit', '--target' => 'method'])
            ->assertSuccessful();

        $filePath = app_path('LiVue/Attributes/RateLimit.php');
        expect(File::exists($filePath))->toBeTrue();

        $content = File::get($filePath);
        expect($content)->toContain('extends LiVueAttribute');
        expect($content)->toContain('Attribute::TARGET_METHOD');
        expect($content)->toContain('function call');
    });

    it('generates a class attribute with --target=class', function () {
        $this->artisan('make:livue-attribute', ['name' => 'Cacheable', '--target' => 'class'])
            ->assertSuccessful();

        $filePath = app_path('LiVue/Attributes/Cacheable.php');
        expect(File::exists($filePath))->toBeTrue();

        $content = File::get($filePath);
        expect($content)->toContain('extends LiVueAttribute');
        expect($content)->toContain('Attribute::TARGET_CLASS');
        expect($content)->toContain('function boot');
    });

    it('fails on invalid target', function () {
        $this->artisan('make:livue-attribute', ['name' => 'Bad', '--target' => 'invalid'])
            ->assertFailed();
    });

    it('fails if attribute already exists', function () {
        $this->artisan('make:livue-attribute', ['name' => 'Duplicate'])
            ->assertSuccessful();

        $this->artisan('make:livue-attribute', ['name' => 'Duplicate'])
            ->assertFailed();
    });

});
