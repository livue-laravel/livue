<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class ThrowingMountComponent extends Component
{
    public function mount(): void
    {
        throw new \RuntimeException('mount failure');
    }

    public function render(): string
    {
        return 'fixtures.counter';
    }
}
