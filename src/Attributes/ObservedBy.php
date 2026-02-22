<?php

namespace LiVue\Attributes;

use Attribute;

#[Attribute(Attribute::TARGET_CLASS | Attribute::IS_REPEATABLE)]
class ObservedBy
{
    public array $classes;

    public function __construct(string ...$classes)
    {
        $this->classes = $classes;
    }
}
