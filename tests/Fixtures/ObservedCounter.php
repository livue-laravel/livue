<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Attributes\ObservedBy;
use LiVue\Component;

#[ObservedBy(CounterObserver::class)]
class ObservedCounter extends Component
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
