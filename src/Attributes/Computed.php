<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportComputed\BaseComputed;

#[Attribute(Attribute::TARGET_METHOD)]
class Computed extends BaseComputed
{
}
