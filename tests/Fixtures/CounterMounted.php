<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class CounterMounted
{
    public Component $component;

    public function __construct(Component $component)
    {
        $this->component = $component;
    }
}
