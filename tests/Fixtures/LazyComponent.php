<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Attributes\Lazy;
use LiVue\Component;

#[Lazy]
class LazyComponent extends Component
{
    public string $content = 'Lazy loaded content';

    public function updateContent(string $content): void
    {
        $this->content = $content;
    }

    public function render(): string
    {
        return 'fixtures.lazy-component';
    }
}
