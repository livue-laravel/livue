<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class ComposableTestComponent extends Component
{
    public string $name = 'test';

    public int $count = 0;

    public function render(): string
    {
        return 'fixtures.composable-test-component';
    }
}
