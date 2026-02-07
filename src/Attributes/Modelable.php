<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportModelable\BaseModelable;

#[Attribute(Attribute::TARGET_PROPERTY)]
class Modelable extends BaseModelable
{
}
