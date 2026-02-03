<?php

use LiVue\Tests\Fixtures\ContactForm;

describe('Validation', function () {

    it('validates required fields on submit', function () {
        livue(ContactForm::class)
            ->call('submit')
            ->assertHasErrors(['name', 'email', 'message']);
    });

    it('validates email format', function () {
        livue(ContactForm::class)
            ->set('name', 'John')
            ->set('email', 'invalid-email')
            ->set('message', 'This is a valid test message')
            ->call('submit')
            ->assertHasErrors('email')
            ->assertHasNoErrors(['name', 'message']);
    });

    it('validates minimum length for name', function () {
        livue(ContactForm::class)
            ->set('name', 'J')
            ->set('email', 'john@example.com')
            ->set('message', 'This is a valid test message')
            ->call('submit')
            ->assertHasErrors('name')
            ->assertHasNoErrors(['email', 'message']);
    });

    it('validates minimum length for message', function () {
        livue(ContactForm::class)
            ->set('name', 'John')
            ->set('email', 'john@example.com')
            ->set('message', 'Short')
            ->call('submit')
            ->assertHasErrors('message')
            ->assertHasNoErrors(['name', 'email']);
    });

    it('passes validation with valid data', function () {
        livue(ContactForm::class)
            ->set([
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'message' => 'This is a complete message for testing purposes',
            ])
            ->call('submit')
            ->assertHasNoErrors()
            ->assertSet('submitted', true);
    });

    it('clears errors when valid data is provided', function () {
        $testable = livue(ContactForm::class)
            ->call('submit')
            ->assertHasErrors(['name', 'email', 'message']);

        $testable
            ->set([
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'message' => 'This is a complete message for testing',
            ])
            ->call('submit')
            ->assertHasNoErrors();
    });

});
