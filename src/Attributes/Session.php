<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportSession\BaseSession;

#[Attribute(Attribute::TARGET_PROPERTY)]
class Session extends BaseSession
{
}
