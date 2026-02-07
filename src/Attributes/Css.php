<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportAssets\BaseCss;

#[Attribute(Attribute::TARGET_CLASS | Attribute::IS_REPEATABLE)]
class Css extends BaseCss
{
}
