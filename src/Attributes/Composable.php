<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportComposables\BaseComposable;

#[Attribute(Attribute::TARGET_METHOD)]
class Composable extends BaseComposable
{
}
