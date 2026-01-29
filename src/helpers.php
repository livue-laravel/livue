<?php

namespace LiVue;

if (! function_exists('LiVue\\on')) {
    /**
     * Register a global lifecycle hook listener.
     *
     * Usage: \LiVue\on('component.mount', function ($component, $params) { ... });
     * Or:    use function LiVue\on; on('component.mount', fn ($c) => ...);
     *
     * @return \Closure Remover function — call it to unregister the listener.
     */
    function on(string $event, callable $callback): \Closure
    {
        return app(EventBus::class)->listen($event, $callback);
    }
}

if (! function_exists('LiVue\\emit')) {
    /**
     * Dispatch an event through the EventBus.
     *
     * Usage: \LiVue\emit('component.boot', $component);
     * Or:    use function LiVue\emit; emit('custom.event', $data);
     */
    function emit(string $event, mixed ...$params): mixed
    {
        return app(EventBus::class)->dispatch($event, ...$params);
    }
}
