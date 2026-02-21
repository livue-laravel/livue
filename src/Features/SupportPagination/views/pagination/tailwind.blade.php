@if ($paginator->hasPages())
    <nav role="navigation" aria-label="Pagination Navigation" class="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {{-- Results Info --}}
        <p class="text-sm text-gray-700 dark:text-gray-400">
            Showing
            @if ($paginator->firstItem())
                <span class="font-medium text-gray-900 dark:text-white">{{ $paginator->firstItem() }}</span>
                to
                <span class="font-medium text-gray-900 dark:text-white">{{ $paginator->lastItem() }}</span>
            @else
                {{ $paginator->count() }}
            @endif
            of
            <span class="font-medium text-gray-900 dark:text-white">{{ $paginator->total() }}</span>
            results
        </p>

        {{-- Page Navigation --}}
        <div class="inline-flex items-center gap-1">
            {{-- Previous Page --}}
            @if ($paginator->onFirstPage())
                <span class="inline-flex items-center justify-center w-9 h-9 rounded-md text-gray-300 dark:text-gray-600 cursor-default" aria-disabled="true" aria-label="Previous">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </span>
            @else
                <button v-click:previousPage class="inline-flex items-center justify-center w-9 h-9 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition" aria-label="Previous">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
            @endif

            {{-- Page Numbers --}}
            @foreach ($elements as $element)
                @if (is_string($element))
                    <span class="inline-flex items-center justify-center w-9 h-9 text-sm text-gray-400 dark:text-gray-500 select-none">{{ $element }}</span>
                @endif

                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                            <span class="inline-flex items-center justify-center w-9 h-9 rounded-md bg-primary-600 text-sm font-semibold text-white" aria-current="page">{{ $page }}</span>
                        @else
                            <button v-click:setPage="{{ $page }}" class="inline-flex items-center justify-center w-9 h-9 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition" aria-label="Go to page {{ $page }}">
                                {{ $page }}
                            </button>
                        @endif
                    @endforeach
                @endif
            @endforeach

            {{-- Next Page --}}
            @if ($paginator->hasMorePages())
                <button v-click:nextPage class="inline-flex items-center justify-center w-9 h-9 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition" aria-label="Next">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
            @else
                <span class="inline-flex items-center justify-center w-9 h-9 rounded-md text-gray-300 dark:text-gray-600 cursor-default" aria-disabled="true" aria-label="Next">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </span>
            @endif
        </div>
    </nav>
@endif
