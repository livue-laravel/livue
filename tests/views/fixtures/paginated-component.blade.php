<div>
    @php $items = $this->getItems() @endphp

    <ul>
        @foreach ($items as $item)
            <li>Item {{ $item }}</li>
        @endforeach
    </ul>

    {{ $this->links() }}
</div>
