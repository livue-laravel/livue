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

    /** A deliberate refusal carrying a message meant for the person on the other side. */
    public function refuse(): void
    {
        throw new \Symfony\Component\HttpKernel\Exception\HttpException(429, 'Too fast. Try again in 30 seconds.');
    }

    /** abort() without a message: the status is the whole answer. */
    public function refuseWithoutMessage(): void
    {
        abort(403);
    }

    /** A real failure, which must stay a 500 and must not leak its message. */
    public function explode(): void
    {
        throw new \RuntimeException('Database credentials are wrong: secret-value');
    }

    public function render(): string
    {
        return 'fixtures.counter';
    }
}
