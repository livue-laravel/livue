<?php

namespace LiVue\Features\SupportPagination;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\HtmlString;
use LiVue\Attributes\Url;

/**
 * Pagination composable for LiVue components.
 *
 * Provides page tracking, navigation methods, automatic URL sync,
 * a `links()` helper to render pagination views, and a composable
 * that exposes pagination data and actions to Vue templates.
 *
 * The pagination view is resolved in order of priority:
 *   1. Component override of `paginationView()` method
 *   2. Config value `livue.pagination` ('default', 'simple', or custom view path)
 *
 * Usage:
 *   class UserList extends Component {
 *       use UsePagination;
 *       protected array $composables = ['usePagination'];
 *
 *       public function render(): string {
 *           return 'livue.user-list';
 *       }
 *   }
 *
 * In the Blade view:
 *   @php $users = $this->paginate(User::query(), 10) @endphp
 *   @foreach ($users as $user) ... @endforeach
 *   {{ $this->links() }}
 *
 * In Vue templates (via composable):
 *   <button @click="pagination.nextPage()">Next</button>
 *   <span>Page {{ pagination.page }} of {{ pagination.lastPage }}</span>
 */
trait UsePagination
{
    #[Url(except: 1)]
    public int $page = 1;

    /**
     * The paginator instance, stored internally after paginate() or setPaginator().
     */
    protected LengthAwarePaginator|Paginator|null $paginator = null;

    /**
     * Boot hook called on every instantiation.
     * Sets Laravel's current page resolver to use the component's page property.
     */
    public function bootUsePagination(): void
    {
        Paginator::currentPageResolver(fn () => $this->page);
    }

    // -----------------------------------------------------------------
    //  Composable
    // -----------------------------------------------------------------

    /**
     * Composable method exposing pagination data and actions to Vue.
     *
     * Data values are updated after render via the rendered() hook,
     * so paginator metadata (total, lastPage, etc.) is always current.
     */
    public function usePagination(): array
    {
        return [
            // Data
            'page' => $this->page,
            'total' => $this->paginator?->total() ?? 0,
            'perPage' => $this->paginator?->perPage() ?? 15,
            'lastPage' => $this->paginator?->lastPage() ?? 1,
            'hasPages' => $this->paginator?->hasPages() ?? false,
            'onFirstPage' => $this->paginator?->onFirstPage() ?? true,
            'hasMorePages' => $this->paginator?->hasMorePages() ?? false,

            // Actions
            'setPage' => fn (int $page) => $this->page = max(1, $page),
            'nextPage' => fn () => $this->page++,
            'previousPage' => fn () => $this->page = max(1, $this->page - 1),
            'resetPage' => fn () => $this->page = 1,
            'firstPage' => fn () => $this->page = 1,
        ];
    }

    // -----------------------------------------------------------------
    //  Paginator storage
    // -----------------------------------------------------------------

    /**
     * Paginate an Eloquent query and store the paginator internally.
     */
    public function paginate(Builder|Relation $query, int $perPage = 15, array $columns = ['*']): LengthAwarePaginator
    {
        $this->paginator = $query->paginate($perPage, $columns);

        return $this->paginator;
    }

    /**
     * Store an existing paginator instance (for manual/collection pagination).
     */
    public function setPaginator(LengthAwarePaginator|Paginator $paginator): LengthAwarePaginator|Paginator
    {
        $this->paginator = $paginator;

        return $this->paginator;
    }

    // -----------------------------------------------------------------
    //  Blade links
    // -----------------------------------------------------------------

    /**
     * Render the pagination links HTML.
     * Returns empty string if no paginator or single page.
     */
    public function links(): Htmlable
    {
        if (! $this->paginator || ! $this->paginator->hasPages()) {
            return new HtmlString('');
        }

        return $this->paginator->links($this->paginationView());
    }

    // -----------------------------------------------------------------
    //  View resolution (overridable per component)
    // -----------------------------------------------------------------

    /**
     * Get the pagination view name.
     *
     * Override this method in your component to use a custom view.
     */
    public function paginationView(): string
    {
        return match (config('livue.pagination', 'default')) {
            'default' => 'livue::pagination.tailwind',
            'simple' => 'livue::pagination.simple',
            default => config('livue.pagination'),
        };
    }

    /**
     * Get the simple pagination view name.
     *
     * Override this method in your component to use a custom simple view.
     */
    public function paginationSimpleView(): string
    {
        return match (config('livue.pagination', 'default')) {
            'default', 'simple' => 'livue::pagination.simple',
            default => config('livue.pagination'),
        };
    }

    // -----------------------------------------------------------------
    //  Navigation methods
    // -----------------------------------------------------------------

    /**
     * Set the current page.
     */
    public function setPage(int $page): void
    {
        $this->page = max(1, $page);
    }

    /**
     * Reset to the first page.
     */
    public function resetPage(): void
    {
        $this->page = 1;
    }

    /**
     * Go to the next page.
     */
    public function nextPage(): void
    {
        $this->page++;
    }

    /**
     * Go to the previous page.
     */
    public function previousPage(): void
    {
        $this->page = max(1, $this->page - 1);
    }

    /**
     * Go to the first page.
     */
    public function firstPage(): void
    {
        $this->page = 1;
    }

    /**
     * Go to the last page (requires knowing total pages).
     */
    public function lastPage(int $lastPage): void
    {
        $this->page = max(1, $lastPage);
    }
}
