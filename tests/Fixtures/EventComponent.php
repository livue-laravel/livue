<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Attributes\On;
use LiVue\Component;

class EventComponent extends Component
{
    public string $message = '';
    public int $eventCount = 0;

    protected array $listeners = [
        'custom-event' => 'handleCustomEvent',
        'increment-count' => 'incrementCount',
    ];

    public function triggerEvent(): void
    {
        $this->dispatch('event-triggered', ['time' => now()->toIso8601String()]);
    }

    public function triggerMultipleEvents(): void
    {
        $this->dispatch('first-event');
        $this->dispatch('second-event');
        $this->dispatch('third-event');
    }

    public function handleCustomEvent(array $data = []): void
    {
        $this->message = $data['message'] ?? 'Event received';
        $this->eventCount++;
    }

    public function incrementCount(): void
    {
        $this->eventCount++;
    }

    #[On('annotated-event')]
    public function handleAnnotatedEvent(): void
    {
        $this->message = 'Annotated event handled';
    }

    public function render(): string
    {
        return 'fixtures.event-component';
    }
}
