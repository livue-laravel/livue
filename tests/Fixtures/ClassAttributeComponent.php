<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;
use LiVue\Tests\Fixtures\CustomAttributes\TrackBoot;

#[TrackBoot]
class ClassAttributeComponent extends Component
{
    public bool $classBooted = false;
    public bool $classHydrated = false;
    public bool $classDehydrated = false;

    public function render(): string
    {
        return 'fixtures.class-attribute-component';
    }
}
