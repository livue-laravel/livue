<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class SecurityTestComponent extends Component
{
    public string $name = 'test';
    public int $count = 0;

    public function publicAction(): void
    {
        $this->count++;
    }

    public function publicWithParams(string $value): void
    {
        $this->name = $value;
    }

    protected function protectedAction(): void
    {
        $this->count = 999;
    }

    private function privateAction(): void
    {
        $this->count = 888;
    }

    public function boot(): void
    {
        // User-defined boot hook
    }

    public function render(): string
    {
        return 'fixtures.security-test-component';
    }
}
