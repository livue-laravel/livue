<?php

namespace LiVue\Events;

use Illuminate\Foundation\Events\Dispatchable;

class BenchmarkFinished
{
    use Dispatchable;

    public function __construct(
        public readonly string $componentClass,
        public readonly array $context,
        public readonly array $mountResults,
        public readonly array $updateResults,
    ) {}
}
