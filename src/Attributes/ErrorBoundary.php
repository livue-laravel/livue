<?php

namespace LiVue\Attributes;

use Attribute;
use LiVue\Features\SupportErrorBoundary\BaseErrorBoundary;

#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD)]
class ErrorBoundary extends BaseErrorBoundary
{
}
