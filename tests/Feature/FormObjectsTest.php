<?php

use Illuminate\Validation\ValidationException;
use LiVue\Tests\Fixtures\ComponentWithForm;
use LiVue\Tests\Fixtures\Forms\PostForm;
use LiVue\Tests\Fixtures\Forms\UserProfileForm;

describe('Form Objects', function () {

    describe('Data Methods', function () {

        it('fills form from array', function () {
            livue(ComponentWithForm::class)
                ->call('fillFromArray', [
                    'title' => 'Test Title',
                    'content' => 'This is test content that is long enough',
                    'tags' => ['php', 'laravel'],
                ])
                ->assertSet('form.title', 'Test Title')
                ->assertSet('form.content', 'This is test content that is long enough')
                ->assertSet('form.tags', ['php', 'laravel']);
        });

        it('ignores non-existent properties when filling', function () {
            $testable = livue(ComponentWithForm::class)
                ->call('fillFromArray', [
                    'title' => 'Test',
                    'nonExistent' => 'value',
                ]);

            expect($testable->get('form.title'))->toBe('Test');
        });

        it('returns all properties with all()', function () {
            $testable = livue(ComponentWithForm::class)
                ->call('fillFromArray', [
                    'title' => 'My Title',
                    'content' => 'My content here',
                    'tags' => ['test'],
                    'published' => true,
                ]);

            $all = $testable->instance()->form->all();

            expect($all)->toHaveKeys(['title', 'content', 'tags', 'published']);
            expect($all['title'])->toBe('My Title');
            expect($all['published'])->toBe(true);
        });

        it('returns specific properties with only()', function () {
            $testable = livue(ComponentWithForm::class)
                ->call('fillFromArray', [
                    'title' => 'My Title',
                    'content' => 'My content',
                    'tags' => ['test'],
                ]);

            $only = $testable->instance()->form->only(['title', 'content']);

            expect($only)->toHaveKeys(['title', 'content']);
            expect($only)->not->toHaveKey('tags');
        });

        it('returns all except specified with except()', function () {
            $testable = livue(ComponentWithForm::class)
                ->call('fillFromArray', [
                    'title' => 'My Title',
                    'content' => 'My content',
                    'tags' => ['test'],
                ]);

            $except = $testable->instance()->form->except(['tags', 'published']);

            expect($except)->toHaveKeys(['title', 'content']);
            expect($except)->not->toHaveKey('tags');
            expect($except)->not->toHaveKey('published');
        });

        it('resets all fields to defaults', function () {
            livue(ComponentWithForm::class)
                ->call('fillFromArray', [
                    'title' => 'My Title',
                    'content' => 'My content',
                    'published' => true,
                ])
                ->call('resetForm')
                ->assertSet('form.title', '')
                ->assertSet('form.content', '')
                ->assertSet('form.published', false);
        });

        it('resets specific fields only', function () {
            livue(ComponentWithForm::class)
                ->call('fillFromArray', [
                    'title' => 'My Title',
                    'content' => 'My content',
                ])
                ->call('resetFormFields', ['title'])
                ->assertSet('form.title', '')
                ->assertSet('form.content', 'My content');
        });

        it('pulls data and resets form', function () {
            $testable = livue(ComponentWithForm::class)
                ->call('fillFromArray', [
                    'title' => 'My Title',
                    'content' => 'My content',
                ]);

            $pulled = $testable->call('pullAndReset')->instance()->lastSavedData;

            // Form should be reset after pull
            expect($testable->get('form.title'))->toBe('');
            expect($testable->get('form.content'))->toBe('');
        });

        it('pulls specific fields and resets only those', function () {
            $testable = livue(ComponentWithForm::class)
                ->call('fillFromArray', [
                    'title' => 'My Title',
                    'content' => 'My content',
                ])
                ->call('pullFields', ['title']);

            // Only title should be reset
            expect($testable->get('form.title'))->toBe('');
            expect($testable->get('form.content'))->toBe('My content');
        });

    });

    describe('Validation', function () {

        it('validates all fields', function () {
            livue(ComponentWithForm::class)
                ->call('save')
                ->assertHasErrors(['form.title', 'form.content']);
        });

        it('validates with #[Validate] attributes', function () {
            livue(ComponentWithForm::class)
                ->call('fillFromArray', [
                    'title' => 'abc',  // min:5 fails
                    'content' => 'This is a long enough content for validation',
                ])
                ->call('save')
                ->assertHasErrors('form.title')
                ->assertHasNoErrors('form.content');
        });

        it('validates single field with validateOnly()', function () {
            livue(ComponentWithForm::class)
                ->set('form.title', 'ab')  // min:5 fails
                ->call('validateTitle')
                ->assertHasErrors('form.title')
                ->assertHasNoErrors('form.content');  // content not validated
        });

        it('passes validation with valid data', function () {
            livue(ComponentWithForm::class)
                ->call('fillFromArray', [
                    'title' => 'Valid Title',
                    'content' => 'This is a valid content that is long enough',
                ])
                ->call('save')
                ->assertHasNoErrors()
                ->assertSet('saved', true);
        });

        it('clears errors on successful validation', function () {
            $testable = livue(ComponentWithForm::class)
                ->call('save')
                ->assertHasErrors(['form.title', 'form.content']);

            $testable
                ->call('fillFromArray', [
                    'title' => 'Valid Title',
                    'content' => 'This is a valid content that is long enough',
                ])
                ->call('save')
                ->assertHasNoErrors();
        });

        it('adds manual errors with addError()', function () {
            livue(ComponentWithForm::class)
                ->call('addCustomError')
                ->assertHasErrors('form.title');
        });

        it('resets errors with resetErrors()', function () {
            livue(ComponentWithForm::class)
                ->call('addCustomError')
                ->assertHasErrors('form.title')
                ->call('clearErrors')
                ->assertHasNoErrors();
        });

    });

    describe('Component Integration', function () {

        it('syncs form errors to parent component', function () {
            $testable = livue(ComponentWithForm::class)
                ->call('save');

            $errorBag = $testable->instance()->getErrorBag();

            expect($errorBag->has('form.title'))->toBeTrue();
            expect($errorBag->has('form.content'))->toBeTrue();
        });

        it('prefixes errors with form property name', function () {
            $testable = livue(ComponentWithForm::class)
                ->call('save');

            $errorBag = $testable->instance()->getErrorBag();

            // Errors should be prefixed with "form."
            expect($errorBag->keys())->each->toStartWith('form.');
        });

        it('clears prefixed errors when form errors are reset', function () {
            $testable = livue(ComponentWithForm::class)
                ->call('save')
                ->assertHasErrors('form.title')
                ->call('clearErrors')
                ->assertHasNoErrors();
        });

        it('form maintains component reference', function () {
            $testable = livue(ComponentWithForm::class);

            $form = $testable->instance()->form;
            $component = $form->getComponent();

            expect($component)->toBe($testable->instance());
        });

    });

    describe('Rules Resolution', function () {

        it('collects rules from #[Validate] attributes', function () {
            $form = new PostForm();
            $reflection = new ReflectionClass($form);
            $method = $reflection->getMethod('resolveRules');
            $method->setAccessible(true);

            $rules = $method->invoke($form);

            expect($rules)->toHaveKey('title');
            expect($rules)->toHaveKey('content');
            expect($rules['title'])->toContain('required');
            expect($rules['title'])->toContain('min:5');
        });

        it('merges rules() method with attributes (method takes precedence)', function () {
            $form = new UserProfileForm();
            $reflection = new ReflectionClass($form);
            $method = $reflection->getMethod('resolveRules');
            $method->setAccessible(true);

            $rules = $method->invoke($form);

            // The rules() method overrides email rules
            expect($rules['email'])->toContain('max:255');
        });

        it('resolves custom attribute names with "as" parameter', function () {
            $form = new UserProfileForm();
            $reflection = new ReflectionClass($form);
            $method = $reflection->getMethod('resolveAttributes');
            $method->setAccessible(true);

            $attributes = $method->invoke($form);

            expect($attributes['firstName'])->toBe('first name');
            expect($attributes['lastName'])->toBe('last name');
        });

    });

});
