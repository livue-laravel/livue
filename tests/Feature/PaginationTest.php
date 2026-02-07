<?php

use LiVue\Tests\Fixtures\PaginatedComponent;
use LiVue\Tests\Fixtures\CustomPaginatedComponent;

describe('UsePagination', function () {

    describe('Page Property', function () {

        it('initializes with page 1', function () {
            livue(PaginatedComponent::class)
                ->assertSet('page', 1);
        });

        it('navigates to next page', function () {
            livue(PaginatedComponent::class)
                ->call('nextPage')
                ->assertSet('page', 2);
        });

        it('navigates to previous page', function () {
            livue(PaginatedComponent::class)
                ->set('page', 3)
                ->call('previousPage')
                ->assertSet('page', 2);
        });

        it('does not go below page 1 on previousPage', function () {
            livue(PaginatedComponent::class)
                ->call('previousPage')
                ->assertSet('page', 1);
        });

        it('sets a specific page', function () {
            livue(PaginatedComponent::class)
                ->call('setPage', 3)
                ->assertSet('page', 3);
        });

        it('resets to first page', function () {
            livue(PaginatedComponent::class)
                ->set('page', 5)
                ->call('resetPage')
                ->assertSet('page', 1);
        });

        it('goes to first page', function () {
            livue(PaginatedComponent::class)
                ->set('page', 3)
                ->call('firstPage')
                ->assertSet('page', 1);
        });

        it('goes to last page', function () {
            livue(PaginatedComponent::class)
                ->call('lastPage', 4)
                ->assertSet('page', 4);
        });

    });

    describe('Composable Actions', function () {

        it('navigates to next page via composable action', function () {
            livue(PaginatedComponent::class)
                ->call('pagination.nextPage')
                ->assertSet('page', 2);
        });

        it('navigates to previous page via composable action', function () {
            livue(PaginatedComponent::class)
                ->set('page', 3)
                ->call('pagination.previousPage')
                ->assertSet('page', 2);
        });

        it('sets specific page via composable action', function () {
            livue(PaginatedComponent::class)
                ->call('pagination.setPage', 3)
                ->assertSet('page', 3);
        });

        it('resets page via composable action', function () {
            livue(PaginatedComponent::class)
                ->set('page', 5)
                ->call('pagination.resetPage')
                ->assertSet('page', 1);
        });

        it('goes to first page via composable action', function () {
            livue(PaginatedComponent::class)
                ->set('page', 3)
                ->call('pagination.firstPage')
                ->assertSet('page', 1);
        });

    });

    describe('Composable Data', function () {

        it('exposes pagination data in snapshot', function () {
            livue(PaginatedComponent::class)
                ->assertSnapshotHas('composables');
        });

        it('provides correct pagination metadata', function () {
            $testable = livue(PaginatedComponent::class);

            $snapshot = $testable->snapshot();
            $composables = $snapshot['memo']['composables']['pagination'] ?? [];

            expect($composables['page'])->toBe(1);
            expect($composables['total'])->toBe(20);
            expect($composables['perPage'])->toBe(5);
            expect($composables['lastPage'])->toBe(4);
            expect($composables['hasPages'])->toBeTrue();
            expect($composables['onFirstPage'])->toBeTrue();
            expect($composables['hasMorePages'])->toBeTrue();
        });

        it('updates composable data after page change', function () {
            $testable = livue(PaginatedComponent::class)
                ->call('pagination.nextPage');

            $snapshot = $testable->snapshot();
            $composables = $snapshot['memo']['composables']['pagination'] ?? [];

            expect($composables['page'])->toBe(2);
            expect($composables['onFirstPage'])->toBeFalse();
            expect($composables['hasMorePages'])->toBeTrue();
        });

        it('reflects last page state in composable data', function () {
            $testable = livue(PaginatedComponent::class)
                ->call('setPage', 4);

            $snapshot = $testable->snapshot();
            $composables = $snapshot['memo']['composables']['pagination'] ?? [];

            expect($composables['page'])->toBe(4);
            expect($composables['onFirstPage'])->toBeFalse();
            expect($composables['hasMorePages'])->toBeFalse();
        });

        it('exposes composable actions in snapshot', function () {
            livue(PaginatedComponent::class)
                ->assertSnapshotHas('composableActions');
        });

    });

    describe('Pagination View Resolution', function () {

        it('uses tailwind view by default', function () {
            $component = livue(PaginatedComponent::class)->instance();

            expect($component->paginationView())->toBe('livue::pagination.tailwind');
        });

        it('uses simple view when config is simple', function () {
            config()->set('livue.pagination', 'simple');

            $component = livue(PaginatedComponent::class)->instance();

            expect($component->paginationView())->toBe('livue::pagination.simple');
        });

        it('uses custom view path from config', function () {
            config()->set('livue.pagination', 'fixtures.custom-pagination');

            $component = livue(PaginatedComponent::class)->instance();

            expect($component->paginationView())->toBe('fixtures.custom-pagination');
        });

        it('allows component to override paginationView', function () {
            $component = livue(CustomPaginatedComponent::class)->instance();

            expect($component->paginationView())->toBe('fixtures.custom-pagination');
        });

    });

    describe('Simple Pagination View Resolution', function () {

        it('uses simple view by default', function () {
            $component = livue(PaginatedComponent::class)->instance();

            expect($component->paginationSimpleView())->toBe('livue::pagination.simple');
        });

        it('uses simple view when config is simple', function () {
            config()->set('livue.pagination', 'simple');

            $component = livue(PaginatedComponent::class)->instance();

            expect($component->paginationSimpleView())->toBe('livue::pagination.simple');
        });

        it('uses custom view path from config for simple view', function () {
            config()->set('livue.pagination', 'fixtures.custom-pagination');

            $component = livue(PaginatedComponent::class)->instance();

            expect($component->paginationSimpleView())->toBe('fixtures.custom-pagination');
        });

    });

    describe('Links and Rendering', function () {

        it('renders pagination HTML with items', function () {
            livue(PaginatedComponent::class)
                ->assertSee('Item 1')
                ->assertSee('Item 5')
                ->assertDontSee('Item 6');
        });

        it('renders correct items on page 2', function () {
            livue(PaginatedComponent::class)
                ->call('setPage', 2)
                ->assertSee('Item 6')
                ->assertDontSee('Item 5');
        });

        it('renders pagination with custom view override', function () {
            livue(CustomPaginatedComponent::class)
                ->assertSee('custom-pagination')
                ->assertSee('Page 1 of 4');
        });

        it('links returns empty when no paginator is set', function () {
            $component = new PaginatedComponent();

            $links = $component->links();

            expect((string) $links)->toBe('');
        });

    });

    describe('setPaginator', function () {

        it('stores and returns the paginator', function () {
            $testable = livue(PaginatedComponent::class);
            $instance = $testable->instance();

            $paginator = $instance->getItems();

            expect($paginator)->toBeInstanceOf(\Illuminate\Pagination\LengthAwarePaginator::class);
            expect($paginator->total())->toBe(20);
            expect($paginator->perPage())->toBe(5);
        });

    });

});
