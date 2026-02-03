<?php

namespace LiVue\Features\SupportEvents;

/**
 * Trait HandlesEvents
 *
 * Provides event dispatching and listening functionality for LiVue components.
 * Allows components to communicate with each other through events.
 */
trait HandlesEvents
{
    /**
     * Event listeners: event-name => method-name.
     * Override in subclasses to declare which events this component handles.
     *
     * Example: protected array $listeners = ['open-modal' => 'open'];
     */
    protected array $listeners = [];

    /**
     * Buffer of events dispatched during the current request.
     */
    private array $dispatchedEvents = [];

    /**
     * Dispatch an event to all listening components (broadcast).
     *
     * @param string $event The event name
     * @param mixed  $data  Optional data to pass with the event
     */
    public function dispatch(string $event, mixed $data = null): void
    {
        $this->dispatchedEvents[] = [
            'name' => $event,
            'data' => $data,
            'mode' => 'broadcast',
            'target' => null,
        ];
    }

    /**
     * Dispatch an event to a specific component by name.
     *
     * @param string $componentName Target component name
     * @param string $event         The event name
     * @param mixed  $data          Optional data to pass with the event
     */
    public function dispatchTo(string $componentName, string $event, mixed $data = null): void
    {
        $this->dispatchedEvents[] = [
            'name' => $event,
            'data' => $data,
            'mode' => 'to',
            'target' => $componentName,
        ];
    }

    /**
     * Dispatch an event to this component only.
     *
     * @param string $event The event name
     * @param mixed  $data  Optional data to pass with the event
     */
    public function dispatchSelf(string $event, mixed $data = null): void
    {
        $this->dispatchedEvents[] = [
            'name' => $event,
            'data' => $data,
            'mode' => 'self',
            'target' => null,
        ];
    }

    /**
     * Get and clear the dispatched events buffer.
     *
     * @return array Array of dispatched events
     */
    public function flushDispatchedEvents(): array
    {
        $events = $this->dispatchedEvents;
        $this->dispatchedEvents = [];

        return $events;
    }

    /**
     * Get the listeners map for this component.
     * Merges property-based $listeners with #[On] attributes.
     * Attributes take precedence on key conflict.
     *
     * @return array<string, string> event-name => method-name
     */
    public function getListeners(): array
    {
        $fromAttributes = $this->resolveOnAttributes();

        return array_merge($this->listeners, $fromAttributes);
    }
}
