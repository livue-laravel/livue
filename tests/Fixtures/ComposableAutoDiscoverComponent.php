<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

/**
 * Component that relies on auto-discovery — no $composables property.
 */
class ComposableAutoDiscoverComponent extends Component
{
    public string $name = 'test';

    public int $count = 0;

    public function useLocal(): array
    {
        return [
            'source' => 'component',
            'name' => $this->name,
            'increment' => fn () => $this->count++,
        ];
    }

    public function render(): string
    {
        return 'fixtures.composable-auto-discover-component';
    }
}
