<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class HeadPropertyComponent extends Component
{
    protected array $head = [
        'description' => 'A test page description',
        'og:title' => 'Test OG Title',
        'twitter:card' => 'summary',
    ];

    public function render(): string
    {
        return 'fixtures.counter';
    }
}
