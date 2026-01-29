<?php

namespace LiVue\Features\SupportPagination;

use Illuminate\Pagination\Paginator;
use LiVue\Attributes\Url;

/**
 * Add pagination support to a LiVue component.
 *
 * Provides page tracking, navigation methods, and automatic URL sync.
 * The `$page` property is automatically bound to the URL query string
 * via #[Url] so users can bookmark and share paginated views.
 *
 * Usage:
 *   class UserList extends Component {
 *       use WithPagination;
 *
 *       protected function render(): string {
 *           return 'livue.user-list';
 *       }
 *   }
 *
 * In the Blade view, pass $page to the paginator:
 *   @php $users = \App\Models\User::paginate(10) @endphp
 *   {{-- render users --}}
 *   {!! $users->links('livue::pagination.tailwind') !!}
 */
trait WithPagination
{
    #[Url(except: 1)]
    public int $page = 1;

    /**
     * Boot hook called on every instantiation.
     * Sets Laravel's current page resolver to use the component's page property.
     */
    public function bootWithPagination(): void
    {
        $component = $this;

        Paginator::currentPageResolver(function () use ($component) {
            return $component->page;
        });
    }

    /**
     * Set the current page.
     */
    public function setPage(int $page, string $pageName = 'page'): void
    {
        $this->{$pageName} = max(1, $page);
    }

    /**
     * Reset to the first page.
     */
    public function resetPage(string $pageName = 'page'): void
    {
        $this->{$pageName} = 1;
    }

    /**
     * Go to the next page.
     */
    public function nextPage(string $pageName = 'page'): void
    {
        $this->{$pageName}++;
    }

    /**
     * Go to the previous page.
     */
    public function previousPage(string $pageName = 'page'): void
    {
        $this->{$pageName} = max(1, $this->{$pageName} - 1);
    }

    /**
     * Go to the first page.
     */
    public function firstPage(string $pageName = 'page'): void
    {
        $this->{$pageName} = 1;
    }

    /**
     * Go to the last page (requires knowing total pages).
     */
    public function lastPage(int $lastPage, string $pageName = 'page'): void
    {
        $this->{$pageName} = max(1, $lastPage);
    }
}
