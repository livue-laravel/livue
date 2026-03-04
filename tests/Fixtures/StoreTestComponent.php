<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class StoreTestComponent extends Component
{
    public int $count = 0;
    public int $serverCount = 5;

    protected function defineStores(): array
    {
        return [
            'local' => [
                'state' => [
                    'count' => $this->serverCount,
                ],
                'bridge' => [
                    'count' => 'serverCount',
                ],
            ],
        ];
    }

    public function globalStoreReady(string $name = 'shared'): bool
    {
        $store = $this->useGlobalStore($name);

        return (bool) data_get($store, 'state.ready', false);
    }

    protected function render(): string
    {
        return 'fixtures.counter';
    }
}
