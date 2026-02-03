<?php

namespace LiVue\Tests\Fixtures;

use Carbon\Carbon;
use Carbon\CarbonImmutable;
use LiVue\Component;

class CarbonComponent extends Component
{
    public ?Carbon $publishedAt = null;

    public ?CarbonImmutable $createdAt = null;

    public function setPublishedAt(string $date): void
    {
        $this->publishedAt = Carbon::parse($date);
    }

    public function setCreatedAt(string $date): void
    {
        $this->createdAt = CarbonImmutable::parse($date);
    }

    public function clearPublishedAt(): void
    {
        $this->publishedAt = null;
    }

    public function modifyPublishedAt(): void
    {
        if ($this->publishedAt !== null) {
            $this->publishedAt = $this->publishedAt->addDay();
        }
    }

    public function render(): string
    {
        return 'fixtures.carbon-component';
    }
}
