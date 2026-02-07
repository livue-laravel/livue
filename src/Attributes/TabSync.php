<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportTabSync\BaseTabSync;

#[Attribute(Attribute::TARGET_CLASS)]
class TabSync extends BaseTabSync
{
}
