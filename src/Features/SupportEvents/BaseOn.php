<?php

namespace LiVue\Features\SupportEvents;

use Attribute;

#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class BaseOn
{
    public function __construct(
        public string $event
    ) {}
}
