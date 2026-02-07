<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportEvents\BaseOn;

#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class On extends BaseOn
{
}
