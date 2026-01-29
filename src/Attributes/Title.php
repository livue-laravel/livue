<?php

namespace LiVue\Attributes;

use Attribute;

#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD)]
class Title
{
    public function __construct(
        public string $name
    ) {}
}
