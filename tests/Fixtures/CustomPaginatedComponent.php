<?php

namespace LiVue\Tests\Fixtures;

use Illuminate\Pagination\LengthAwarePaginator;
use LiVue\Component;
use LiVue\Features\SupportPagination\UsePagination;

class CustomPaginatedComponent extends Component
{
    use UsePagination;

    protected array $composables = ['usePagination'];
    protected int $perPage = 5;

    public function paginationView(): string
    {
        return 'fixtures.custom-pagination';
    }

    public function getItems(): LengthAwarePaginator
    {
        $items = range(1, 20);

        return $this->setPaginator(new LengthAwarePaginator(
            items: array_slice($items, ($this->page - 1) * $this->perPage, $this->perPage),
            total: count($items),
            perPage: $this->perPage,
            currentPage: $this->page,
            options: ['path' => '/test'],
        ));
    }

    public function render(): string
    {
        return 'fixtures.paginated-component';
    }
}
