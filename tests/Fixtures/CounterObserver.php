<?php

namespace LiVue\Tests\Fixtures;

class CounterObserver
{
    public bool $bootingCalled = false;
    public bool $bootedCalled = false;
    public bool $mountingCalled = false;
    public bool $mountedCalled = false;
    public bool $hydratingCalled = false;
    public bool $hydratedCalled = false;
    public bool $callingCalled = false;
    public bool $calledCalled = false;
    public bool $dehydratingCalled = false;
    public bool $dehydratedCalled = false;
    public bool $renderingCalled = false;
    public bool $renderedCalled = false;

    public ?string $calledMethod = null;
    public ?array $calledParams = null;

    public function booting($component): void
    {
        $this->bootingCalled = true;
    }

    public function booted($component): void
    {
        $this->bootedCalled = true;
    }

    public function mounting($component): void
    {
        $this->mountingCalled = true;
    }

    public function mounted($component): void
    {
        $this->mountedCalled = true;
    }

    public function hydrating($component): void
    {
        $this->hydratingCalled = true;
    }

    public function hydrated($component): void
    {
        $this->hydratedCalled = true;
    }

    public function calling($component, $method, $params): void
    {
        $this->callingCalled = true;
        $this->calledMethod = $method;
        $this->calledParams = $params;
    }

    public function called($component, $method, $params): void
    {
        $this->calledCalled = true;
    }

    public function dehydrating($component): void
    {
        $this->dehydratingCalled = true;
    }

    public function dehydrated($component): void
    {
        $this->dehydratedCalled = true;
    }

    public function rendering($component): void
    {
        $this->renderingCalled = true;
    }

    public function rendered($component): void
    {
        $this->renderedCalled = true;
    }
}
