<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class NoInheritAttrsCounter extends Component
{
    public int $count = 0;

    protected bool $inheritAttrs = false;

    public function render(): string
    {
        return 'fixtures.no-inherit-attrs-counter';
    }
}
