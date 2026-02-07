<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportLazy\BaseLazy;

#[Attribute(Attribute::TARGET_CLASS)]
class Lazy extends BaseLazy
{
}
