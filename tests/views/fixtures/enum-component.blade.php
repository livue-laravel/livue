<div>
    <span class="status">{{ $status->value }}</span>
    <span class="priority">{{ $priority->value }}</span>

    <button @click="publish">Publish</button>
    <button @click="archive">Archive</button>
</div>
