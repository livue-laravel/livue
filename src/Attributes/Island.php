<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportIsland\BaseIsland;

#[Attribute(Attribute::TARGET_CLASS)]
class Island extends BaseIsland
{
}
