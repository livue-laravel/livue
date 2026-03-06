<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Attributes\Validate;
use LiVue\Component;

class ErrorDirectiveForm extends Component
{
    #[Validate('required|email')]
    public string $email = '';

    public function submit(): void
    {
        $this->validate();
    }

    public function render(): string
    {
        return 'fixtures.error-directive-form';
    }
}

