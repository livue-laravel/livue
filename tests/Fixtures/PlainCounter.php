<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class PlainCounter extends Component
{
    public int $count = 0;

    public function render(): string
    {
        return 'fixtures.plain-counter';
    }
}
