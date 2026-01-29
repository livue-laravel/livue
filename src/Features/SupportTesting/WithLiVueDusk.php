<?php

namespace LiVue\Features\SupportTesting;

use Laravel\Dusk\Browser;

/**
 * Helper trait for Laravel Dusk browser tests with LiVue components.
 *
 * Add this trait to your DuskTestCase to get helpful methods for
 * testing LiVue components in a real browser environment.
 *
 * Usage:
 *   class ExampleTest extends DuskTestCase
 *   {
 *       use WithLiVueDusk;
 *
 *       public function test_counter_increments()
 *       {
 *           $this->browse(function (Browser $browser) {
 *               $browser->visit('/counter')
 *                   ->waitForLiVue()
 *                   ->assertLiVueState('count', 0)
 *                   ->clickLiVue('@click="livue.call(\'increment\')"')
 *                   ->waitForLiVueResponse()
 *                   ->assertLiVueState('count', 1);
 *           });
 *       }
 *   }
 */
trait WithLiVueDusk
{
    /**
     * Wait for LiVue to be fully initialized on the page.
     */
    public function waitForLiVue(Browser $browser, int $seconds = 5): Browser
    {
        return $browser->waitUntil(
            "typeof window.LiVue !== 'undefined' && window.LiVue.ready === true",
            $seconds
        );
    }

    /**
     * Wait for a LiVue AJAX response to complete.
     */
    public function waitForLiVueResponse(Browser $browser, int $seconds = 5): Browser
    {
        // Wait for loading state to become false
        return $browser->waitUntil(
            "typeof window.LiVue !== 'undefined' && !window.LiVue.loading",
            $seconds
        );
    }

    /**
     * Wait for a specific component to be mounted.
     */
    public function waitForComponent(Browser $browser, string $name, int $seconds = 5): Browser
    {
        return $browser->waitUntil(
            "document.querySelector('[data-livue-id][data-livue-snapshot*=\"\\\"name\\\":\\\"{$name}\\\"\"]') !== null",
            $seconds
        );
    }

    /**
     * Assert that a LiVue component state property has a specific value.
     */
    public function assertLiVueState(Browser $browser, string $property, mixed $expected, ?string $componentSelector = null): Browser
    {
        $selector = $componentSelector ?? '[data-livue-id]';

        $actual = $browser->script([
            "const el = document.querySelector('{$selector}');",
            "if (!el) return undefined;",
            "const snapshot = JSON.parse(el.getAttribute('data-livue-snapshot'));",
            "return snapshot.state['{$property}'];",
        ])[0];

        \PHPUnit\Framework\Assert::assertEquals(
            $expected,
            $actual,
            "LiVue state [{$property}] expected to be [" . json_encode($expected)
            . "] but is [" . json_encode($actual) . "]."
        );

        return $browser;
    }

    /**
     * Get a LiVue component's state value.
     */
    public function getLiVueState(Browser $browser, string $property, ?string $componentSelector = null): mixed
    {
        $selector = $componentSelector ?? '[data-livue-id]';

        return $browser->script([
            "const el = document.querySelector('{$selector}');",
            "if (!el) return undefined;",
            "const snapshot = JSON.parse(el.getAttribute('data-livue-snapshot'));",
            "return snapshot.state['{$property}'];",
        ])[0];
    }

    /**
     * Call a LiVue component method via JavaScript.
     */
    public function callLiVue(Browser $browser, string $method, array $params = [], ?string $componentSelector = null): Browser
    {
        $selector = $componentSelector ?? '[data-livue-id]';
        $paramsJson = json_encode($params);

        $browser->script([
            "const el = document.querySelector('{$selector}');",
            "if (!el || !el.__livue) return;",
            "el.__livue.call('{$method}', ...{$paramsJson});",
        ]);

        return $browser;
    }

    /**
     * Set a LiVue component property via JavaScript.
     */
    public function setLiVue(Browser $browser, string $property, mixed $value, ?string $componentSelector = null): Browser
    {
        $selector = $componentSelector ?? '[data-livue-id]';
        $valueJson = json_encode($value);

        $browser->script([
            "const el = document.querySelector('{$selector}');",
            "if (!el || !el.__livue) return;",
            "el.__livue.{$property} = {$valueJson};",
        ]);

        return $browser;
    }

    /**
     * Assert that a LiVue component has validation errors.
     */
    public function assertLiVueHasErrors(Browser $browser, string|array $keys = [], ?string $componentSelector = null): Browser
    {
        $selector = $componentSelector ?? '[data-livue-id]';

        $errors = $browser->script([
            "const el = document.querySelector('{$selector}');",
            "if (!el) return {};",
            "const snapshot = JSON.parse(el.getAttribute('data-livue-snapshot'));",
            "return snapshot.memo.errors || {};",
        ])[0];

        $keys = is_string($keys) ? [$keys] : $keys;

        if (empty($keys)) {
            \PHPUnit\Framework\Assert::assertNotEmpty(
                $errors,
                "Expected LiVue component to have validation errors."
            );
        } else {
            foreach ($keys as $key) {
                \PHPUnit\Framework\Assert::assertArrayHasKey(
                    $key,
                    $errors,
                    "Expected LiVue component to have error for [{$key}]."
                );
            }
        }

        return $browser;
    }

    /**
     * Assert that a LiVue component has no validation errors.
     */
    public function assertLiVueHasNoErrors(Browser $browser, string|array $keys = [], ?string $componentSelector = null): Browser
    {
        $selector = $componentSelector ?? '[data-livue-id]';

        $errors = $browser->script([
            "const el = document.querySelector('{$selector}');",
            "if (!el) return {};",
            "const snapshot = JSON.parse(el.getAttribute('data-livue-snapshot'));",
            "return snapshot.memo.errors || {};",
        ])[0];

        $keys = is_string($keys) ? [$keys] : $keys;

        if (empty($keys)) {
            \PHPUnit\Framework\Assert::assertEmpty(
                $errors,
                "Expected LiVue component to have no validation errors."
            );
        } else {
            foreach ($keys as $key) {
                \PHPUnit\Framework\Assert::assertArrayNotHasKey(
                    $key,
                    $errors,
                    "Expected LiVue component to not have error for [{$key}]."
                );
            }
        }

        return $browser;
    }

    /**
     * Wait for LiVue to finish loading (no pending requests).
     */
    public function waitForLiVueIdle(Browser $browser, int $seconds = 5): Browser
    {
        return $browser->waitUntil(
            "typeof window.LiVue !== 'undefined' && !window.LiVue.loading && window.LiVue.pendingRequests === 0",
            $seconds
        );
    }

    /**
     * Click an element and wait for LiVue response.
     */
    public function clickAndWaitForLiVue(Browser $browser, string $selector, int $seconds = 5): Browser
    {
        $browser->click($selector);

        return $this->waitForLiVueResponse($browser, $seconds);
    }

    /**
     * Type into an input and wait for LiVue debounce.
     */
    public function typeLiVue(Browser $browser, string $selector, string $value, int $debounceMs = 300): Browser
    {
        $browser->type($selector, $value);

        // Wait for debounce + response
        $browser->pause($debounceMs + 100);

        return $this->waitForLiVueResponse($browser);
    }
}
