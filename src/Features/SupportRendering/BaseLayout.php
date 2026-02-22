<?php

namespace LiVue\Features\SupportRendering;

use Attribute;
use LiVue\Attribute as LiVueAttribute;

#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD)]
class BaseLayout extends LiVueAttribute
{
    public function __construct(
        public string $name
    ) {}
}
