<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class AbortingMountComponent extends Component
{
    public function mount(): void
    {
        abort(403);
    }

    public function render(): string
    {
        return 'fixtures.counter';
    }
}
