<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Attributes\Computed;
use LiVue\Component;

class ComputedComponent extends Component
{
    public string $firstName = '';

    public string $lastName = '';

    public int $computedCallCount = 0;

    #[Computed]
    public function fullName(): string
    {
        $this->computedCallCount++;

        return trim($this->firstName . ' ' . $this->lastName);
    }

    #[Computed]
    public function initials(): string
    {
        $first = $this->firstName ? strtoupper($this->firstName[0]) : '';
        $last = $this->lastName ? strtoupper($this->lastName[0]) : '';

        return $first . $last;
    }

    #[Computed]
    public function isComplete(): bool
    {
        return $this->firstName !== '' && $this->lastName !== '';
    }

    public function setName(string $first, string $last): void
    {
        $this->firstName = $first;
        $this->lastName = $last;
    }

    public function clearComputedCacheManually(): void
    {
        unset($this->fullName);
    }

    public function render(): string
    {
        return 'fixtures.computed-component';
    }
}
