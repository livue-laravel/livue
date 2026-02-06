<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class GetterComponent extends Component
{
    public string $name = '';

    private string $secret = 'hidden';

    public function getFullTitle(): string
    {
        return 'Title: ' . $this->name;
    }

    public function getSecret(): string
    {
        return $this->secret;
    }

    public function setData(string $name, string $secret): void
    {
        $this->name = $name;
        $this->secret = $secret;
    }

    public function render(): string
    {
        return 'fixtures.getter-component';
    }
}
