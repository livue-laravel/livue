<?php

namespace LiVue\Attributes;

use Attribute;

#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD)]
class Layout
{
    public function __construct(
        public string $name
    ) {}
}
