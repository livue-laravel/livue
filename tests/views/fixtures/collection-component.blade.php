<div>
    <span class="count">{{ $items->count() }} items</span>

    <ul>
        @foreach($items as $item)
            <li class="{{ $item['completed'] ? 'completed' : '' }}">
                {{ $item['name'] }}
            </li>
        @endforeach
    </ul>
</div>
