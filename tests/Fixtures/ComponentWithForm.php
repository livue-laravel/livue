<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;
use LiVue\Tests\Fixtures\Forms\PostForm;

class ComponentWithForm extends Component
{
    public ?PostForm $form = null;

    public bool $saved = false;

    public array $lastSavedData = [];

    public function boot(): void
    {
        if ($this->form === null) {
            $this->form = new PostForm();
        }
    }

    public function save(): void
    {
        $this->form->validate();
        $this->lastSavedData = $this->form->all();
        $this->saved = true;
    }

    public function saveOnly(): void
    {
        $this->form->validate();
        $this->lastSavedData = $this->form->only(['title', 'content']);
        $this->saved = true;
    }

    public function fillFromArray(array $data): void
    {
        $this->form->fill($data);
    }

    public function resetForm(): void
    {
        $this->form->reset();
    }

    public function resetFormFields(array $fields): void
    {
        $this->form->reset($fields);
    }

    public function pullAndReset(): array
    {
        return $this->form->pull();
    }

    public function pullFields(array $fields): array
    {
        return $this->form->pull($fields);
    }

    public function validateTitle(): void
    {
        $this->form->validateOnly('title');
    }

    public function addCustomError(): void
    {
        $this->form->addError('title', 'Custom error message');
    }

    public function clearErrors(): void
    {
        $this->form->resetErrors();
    }

    public function render(): string
    {
        return 'fixtures.component-with-form';
    }
}
