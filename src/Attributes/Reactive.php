<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportReactiveProps\BaseReactive;

#[Attribute(Attribute::TARGET_PROPERTY)]
class Reactive extends BaseReactive
{
}
