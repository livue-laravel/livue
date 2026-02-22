<?php

namespace LiVue\Tests\Fixtures\CustomAttributes;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

#[Attribute(Attribute::TARGET_PROPERTY)]
class Uppercase extends LiVueAttribute
{
    public function hydrate(): void
    {
        $value = $this->getValue();

        if (is_string($value)) {
            $this->setValue(strtoupper($value));
        }
    }
}
