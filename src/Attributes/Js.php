<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportAssets\BaseJs;

#[Attribute(Attribute::TARGET_CLASS | Attribute::IS_REPEATABLE)]
class Js extends BaseJs
{
}
