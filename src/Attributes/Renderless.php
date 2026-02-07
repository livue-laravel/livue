<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportRendering\BaseRenderless;

#[Attribute(Attribute::TARGET_METHOD)]
class Renderless extends BaseRenderless
{
}
