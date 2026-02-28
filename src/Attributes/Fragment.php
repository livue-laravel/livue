<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportFragments\BaseFragment;

#[Attribute(Attribute::TARGET_METHOD | Attribute::IS_REPEATABLE)]
class Fragment extends BaseFragment
{
}
