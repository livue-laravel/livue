<?php

use LiVue\Tests\Fixtures\CrossFieldValidationComponent;
use LiVue\Tests\Fixtures\Forms\CrossFieldForm;

describe('Cross-field validation', function () {

    it('passes `confirmed` when the confirmation field matches', function () {
        livue(CrossFieldValidationComponent::class)
            ->set('password', 'secret-password')
            ->set('password_confirmation', 'secret-password')
            ->call('submit')
            ->assertHasNoErrors('password')
            ->assertSet('submitted', true);
    });

    it('fails `confirmed` when the confirmation field differs', function () {
        livue(CrossFieldValidationComponent::class)
            ->set('password', 'secret-password')
            ->set('password_confirmation', 'something-else')
            ->call('submit')
            ->assertHasErrors('password')
            ->assertSet('submitted', false);
    });

    it('reads a referenced field that has no rules of its own for `different`', function () {
        livue(CrossFieldValidationComponent::class)
            ->set('password', 'secret-password')
            ->set('password_confirmation', 'secret-password')
            ->set('nickname', 'magnus')
            ->set('displayName', 'magnus')
            ->call('submit')
            ->assertHasErrors('displayName');
    });

    it('passes `different` when the two fields differ', function () {
        livue(CrossFieldValidationComponent::class)
            ->set('password', 'secret-password')
            ->set('password_confirmation', 'secret-password')
            ->set('nickname', 'magnus')
            ->set('displayName', 'Magnus Carlsen')
            ->call('submit')
            ->assertHasNoErrors('displayName');
    });

    it('reads a referenced field that has no rules for `required_if`', function () {
        livue(CrossFieldValidationComponent::class)
            ->set('password', 'secret-password')
            ->set('password_confirmation', 'secret-password')
            ->set('wantsNewsletter', true)
            ->call('submit')
            ->assertHasErrors('newsletterEmail');
    });

    it('does not require the dependent field when the condition is not met', function () {
        livue(CrossFieldValidationComponent::class)
            ->set('password', 'secret-password')
            ->set('password_confirmation', 'secret-password')
            ->set('wantsNewsletter', false)
            ->call('submit')
            ->assertHasNoErrors('newsletterEmail');
    });

    it('supports cross-field rules inside Form objects', function () {
        $form = new CrossFieldForm();
        $form->fill([
            'password' => 'secret-password',
            'password_confirmation' => 'secret-password',
            'echoPassword' => 'secret-password',
        ]);

        expect($form->validate())->toHaveKey('password');
    });

    it('reports Form cross-field failures', function () {
        $form = new CrossFieldForm();
        $form->fill([
            'password' => 'secret-password',
            'password_confirmation' => 'mismatch',
            'echoPassword' => '',
        ]);

        expect(fn () => $form->validate())
            ->toThrow(Illuminate\Validation\ValidationException::class);
    });
});
