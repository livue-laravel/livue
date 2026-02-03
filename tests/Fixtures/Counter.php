<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class Counter extends Component
{
    public int $count = 0;

    public function increment(): void
    {
        $this->count++;
    }

    public function decrement(): void
    {
        $this->count--;
    }

    public function incrementBy(int $amount): void
    {
        $this->count += $amount;
    }

    public function render(): string
    {
        return 'fixtures.counter';
    }
}
