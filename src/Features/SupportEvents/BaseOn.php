<?php

namespace LiVue\Features\SupportEvents;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class BaseOn extends LiVueAttribute
{
    public function __construct(
        public string $event
    ) {}
}
