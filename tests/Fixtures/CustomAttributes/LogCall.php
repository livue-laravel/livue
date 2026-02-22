<?php

namespace LiVue\Tests\Fixtures\CustomAttributes;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

#[Attribute(Attribute::TARGET_METHOD)]
class LogCall extends LiVueAttribute
{
    public function call(array $params): void
    {
        $component = $this->getComponent();
        $component->callLog[] = $this->getName();
    }
}
