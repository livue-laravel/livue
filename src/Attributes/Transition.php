<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportTransition\BaseTransition;

#[Attribute(Attribute::TARGET_METHOD)]
class Transition extends BaseTransition
{
}
