<?php

namespace LiVue\Events;

use Illuminate\Foundation\Events\Dispatchable;

class BenchmarkStarting
{
    use Dispatchable;

    public function __construct(
        public readonly string $componentClass,
        public readonly array $context,
        public readonly ?string $method,
        public readonly int $iterations,
    ) {}
}
