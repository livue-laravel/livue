<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Attributes\Validate;
use LiVue\Component;

class ContactForm extends Component
{
    #[Validate('required|min:2')]
    public string $name = '';

    #[Validate('required|email')]
    public string $email = '';

    #[Validate('required|min:10')]
    public string $message = '';

    public bool $submitted = false;

    public function submit(): void
    {
        $this->validate();

        $this->submitted = true;
        $this->dispatch('form-submitted', ['name' => $this->name]);

        // Reset fields manually (Component doesn't have reset() like Form)
        $this->name = '';
        $this->email = '';
        $this->message = '';
    }

    public function resetForm(): void
    {
        $this->submitted = false;
    }

    public function render(): string
    {
        return 'fixtures.contact-form';
    }
}
