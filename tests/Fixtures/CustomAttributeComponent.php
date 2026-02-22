<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;
use LiVue\Tests\Fixtures\CustomAttributes\Trim;
use LiVue\Tests\Fixtures\CustomAttributes\Uppercase;
use LiVue\Tests\Fixtures\CustomAttributes\LogCall;

class CustomAttributeComponent extends Component
{
    #[Trim]
    public string $name = '';

    #[Trim]
    #[Uppercase]
    public string $label = '';

    public array $callLog = [];

    #[LogCall]
    public function save(): void
    {
        // noop
    }

    public function render(): string
    {
        return 'fixtures.custom-attribute-component';
    }
}
