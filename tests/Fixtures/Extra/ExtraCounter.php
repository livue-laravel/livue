<?php

namespace LiVue\Tests\Fixtures\Extra;

use LiVue\Component;

class ExtraCounter extends Component
{
    public int $count = 0;

    public function increment(): void
    {
        $this->count++;
    }

    public function render(): string
    {
        return 'fixtures.counter';
    }
}
