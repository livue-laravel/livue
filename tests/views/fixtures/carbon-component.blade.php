<div>
    @if($publishedAt)
        <span class="published-at">{{ $publishedAt->toIso8601String() }}</span>
    @endif

    @if($createdAt)
        <span class="created-at">{{ $createdAt->toIso8601String() }}</span>
    @endif
</div>
