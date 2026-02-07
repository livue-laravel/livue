@if ($paginator->hasPages())
    <nav class="custom-pagination">
        <span>Page {{ $paginator->currentPage() }} of {{ $paginator->lastPage() }}</span>
    </nav>
@endif
