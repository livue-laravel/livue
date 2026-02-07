<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportRendering\BaseTitle;

#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD)]
class Title extends BaseTitle
{
}
