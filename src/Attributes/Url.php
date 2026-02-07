<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportUrl\BaseUrl;

#[Attribute(Attribute::TARGET_PROPERTY)]
class Url extends BaseUrl
{
}
