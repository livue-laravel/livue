<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportJavascript\BaseVue;

#[Attribute(Attribute::TARGET_METHOD)]
class Vue extends BaseVue
{
}
