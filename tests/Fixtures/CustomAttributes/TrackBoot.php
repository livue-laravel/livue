<?php

namespace LiVue\Tests\Fixtures\CustomAttributes;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

#[Attribute(Attribute::TARGET_CLASS)]
class TrackBoot extends LiVueAttribute
{
    public function boot(): void
    {
        $this->getComponent()->classBooted = true;
    }

    public function hydrate(): void
    {
        $this->getComponent()->classHydrated = true;
    }

    public function dehydrate(): void
    {
        $this->getComponent()->classDehydrated = true;
    }
}
