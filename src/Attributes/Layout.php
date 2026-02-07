<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportRendering\BaseLayout;

#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD)]
class Layout extends BaseLayout
{
}
