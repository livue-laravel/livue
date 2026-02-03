<?php

namespace LiVue\Tests\Fixtures\Forms;

use LiVue\Attributes\Validate;
use LiVue\Form;

class UserProfileForm extends Form
{
    #[Validate('required|min:2', as: 'first name')]
    public string $firstName = '';

    #[Validate('required|min:2', as: 'last name')]
    public string $lastName = '';

    #[Validate('required|email')]
    public string $email = '';

    #[Validate('nullable|min:10')]
    public ?string $bio = null;

    /**
     * Custom rules via method.
     */
    protected function rules(): array
    {
        return [
            'email' => ['required', 'email', 'max:255'],
        ];
    }

    /**
     * Custom messages via method.
     */
    protected function messages(): array
    {
        return [
            'firstName.required' => 'Please provide your first name.',
        ];
    }
}
