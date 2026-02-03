<?php

use LiVue\Facades\LiVue;
use LiVue\Tests\TestCase;

pest()->extend(TestCase::class)->in('Feature');

/**
 * Helper function to test LiVue components.
 *
 * @param  string  $componentClass  The component class to test
 * @param  array   $params          Parameters to pass to mount()
 * @return \LiVue\Features\SupportTesting\Testable
 */
function livue(string $componentClass, array $params = [])
{
    return LiVue::test($componentClass, $params);
}
