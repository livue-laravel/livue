<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportValidation\BaseValidate;

#[Attribute(Attribute::IS_REPEATABLE | Attribute::TARGET_PROPERTY)]
class Validate extends BaseValidate
{
}
