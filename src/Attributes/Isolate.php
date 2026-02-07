<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportIsland\BaseIsolate;

#[Attribute(Attribute::TARGET_CLASS)]
class Isolate extends BaseIsolate
{
}
