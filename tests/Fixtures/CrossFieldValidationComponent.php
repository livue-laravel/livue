<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Attributes\Validate;
use LiVue\Component;

/**
 * Regole che fanno riferimento a un ALTRO campo, il quale a sua volta non ha regole
 * proprie: e' il caso in cui il campo referenziato deve comunque raggiungere il validatore.
 */
class CrossFieldValidationComponent extends Component
{
    #[Validate('required|confirmed')]
    public string $password = '';

    public string $password_confirmation = '';

    #[Validate('nullable|different:nickname')]
    public string $displayName = '';

    public string $nickname = '';

    public ?string $newsletterEmail = null;

    public bool $wantsNewsletter = false;

    public bool $submitted = false;

    protected function rules(): array
    {
        return [
            // required_if e non required_with: per Laravel un booleano false e'
            // comunque "presente", quindi required_with scatterebbe sempre.
            'newsletterEmail' => 'required_if:wantsNewsletter,true|nullable|email',
        ];
    }

    public function submit(): void
    {
        $this->validate();

        $this->submitted = true;
    }

    public function render(): string
    {
        return 'fixtures.cross-field-validation-component';
    }
}
