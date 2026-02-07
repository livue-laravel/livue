<?php

namespace LiVue\Features\SupportRendering;

use Attribute;

#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD)]
class BaseLayout
{
    public function __construct(
        public string $name
    ) {}
}
