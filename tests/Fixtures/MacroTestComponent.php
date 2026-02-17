<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class MacroTestComponent extends Component
{
    public string $name = 'test';
    public int $count = 0;

    public function realMethod(): void
    {
        $this->count = 999;
    }

    public function render(): string
    {
        return 'fixtures.macro-test-component';
    }
}
