<?php

namespace LiVue\Attributes;

use Attribute;

#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class On
{
    public function __construct(
        public string $event
    ) {}
}
