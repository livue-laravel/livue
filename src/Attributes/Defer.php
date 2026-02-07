<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportLazy\BaseDefer;

#[Attribute(Attribute::TARGET_CLASS)]
class Defer extends BaseDefer
{
}
