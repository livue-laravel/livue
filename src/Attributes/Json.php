<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportJson\BaseJson;

#[Attribute(Attribute::TARGET_METHOD)]
class Json extends BaseJson
{
}
