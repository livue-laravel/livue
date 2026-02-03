<?php

namespace LiVue\Tests\Fixtures;

use Illuminate\Support\Collection;
use LiVue\Component;

class CollectionComponent extends Component
{
    public ?Collection $items = null;

    public function boot(): void
    {
        if ($this->items === null) {
            $this->items = collect();
        }
    }

    public function addItem(string $name): void
    {
        $this->items->push(['name' => $name, 'completed' => false]);
    }

    public function setItems(array $items): void
    {
        $this->items = collect($items);
    }

    public function markComplete(int $index): void
    {
        $item = $this->items->get($index);

        if ($item !== null) {
            $item['completed'] = true;
            $this->items->put($index, $item);
        }
    }

    public function clearItems(): void
    {
        $this->items = collect();
    }

    public function getItemCount(): int
    {
        return $this->items->count();
    }

    public function render(): string
    {
        return 'fixtures.collection-component';
    }
}
