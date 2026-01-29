<?php

namespace LiVue\Features\SupportTesting;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

/**
 * Base test case for LiVue component tests.
 *
 * Extends Laravel's TestCase and provides a convenience method
 * to create Testable instances.
 *
 * Usage:
 *   class CounterTest extends \LiVue\Features\SupportTesting\TestCase
 *   {
 *       public function test_counter_increments(): void
 *       {
 *           $this->livue(Counter::class)
 *               ->assertSet('count', 0)
 *               ->call('increment')
 *               ->assertSet('count', 1);
 *       }
 *   }
 */
abstract class TestCase extends BaseTestCase
{
    /**
     * Create a testable instance for a LiVue component.
     *
     * @param  string  $componentClass  The fully qualified component class name
     * @param  array   $params          Parameters to pass to mount()
     */
    protected function livue(string $componentClass, array $params = []): Testable
    {
        return new Testable($componentClass, $params);
    }
}
