<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportGuarded\BaseGuarded;

#[Attribute(Attribute::TARGET_PROPERTY)]
class Guarded extends BaseGuarded
{
}
