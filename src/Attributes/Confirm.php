<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportConfirm\BaseConfirm;

#[Attribute(Attribute::TARGET_METHOD)]
class Confirm extends BaseConfirm
{
}
