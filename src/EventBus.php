<?php

namespace LiVue;

class EventBus
{
    /**
     * Registered listeners: event-name => [callable, callable, ...]
     */
    protected array $listeners = [];

    /**
     * Register a listener for an event.
     * Returns a closure that removes the listener when called.
     */
    public function listen(string $event, callable $callback): \Closure
    {
        $this->listeners[$event][] = $callback;

        return function () use ($event, $callback) {
            $this->removeListener($event, $callback);
        };
    }

    /**
     * Dispatch an event, calling all registered listeners with the given params.
     * Returns the first non-null value returned by any listener.
     */
    public function dispatch(string $event, mixed ...$params): mixed
    {
        $result = null;

        foreach ($this->listeners[$event] ?? [] as $callback) {
            $returned = $callback(...$params);

            if ($result === null && $returned !== null) {
                $result = $returned;
            }
        }

        return $result;
    }

    /**
     * Remove all listeners for an event.
     */
    public function forget(string $event): void
    {
        unset($this->listeners[$event]);
    }

    /**
     * Check if any listeners are registered for an event.
     */
    public function hasListeners(string $event): bool
    {
        return ! empty($this->listeners[$event]);
    }

    /**
     * Remove a specific listener from an event.
     */
    protected function removeListener(string $event, callable $callback): void
    {
        if (! isset($this->listeners[$event])) {
            return;
        }

        $this->listeners[$event] = array_values(
            array_filter(
                $this->listeners[$event],
                fn ($listener) => $listener !== $callback
            )
        );

        if (empty($this->listeners[$event])) {
            unset($this->listeners[$event]);
        }
    }
}
