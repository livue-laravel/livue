<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class LifecycleEventsCounter extends Component
{
    public int $count = 0;

    protected array $dispatchesEvents = [
        'mounted' => CounterMounted::class,
    ];

    public function increment(): void
    {
        $this->count++;
    }

    public function render(): string
    {
        return 'fixtures.counter';
    }
}
