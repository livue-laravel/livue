<?php

namespace LiVue\Features\SupportTesting;

use PHPUnit\Framework\Assert;

/**
 * Fluent assertion methods for LiVue component testing.
 *
 * Used by the Testable class to provide chainable assertions
 * for properties, rendered HTML, validation errors, events,
 * redirects and snapshot memo.
 */
trait MakesAssertions
{
    // -----------------------------------------------------------------
    //  Property assertions
    // -----------------------------------------------------------------

    /**
     * Assert that a property equals the expected value.
     */
    public function assertSet(string $property, mixed $expected): static
    {
        $actual = $this->get($property);

        Assert::assertEquals(
            $expected,
            $actual,
            "Property [{$property}] expected to be [" . json_encode($expected)
            . "] but is [" . json_encode($actual) . "]."
        );

        return $this;
    }

    /**
     * Assert that a property does NOT equal the given value.
     */
    public function assertNotSet(string $property, mixed $unexpected): static
    {
        $actual = $this->get($property);

        Assert::assertNotEquals(
            $unexpected,
            $actual,
            "Property [{$property}] should not be [" . json_encode($unexpected) . "]."
        );

        return $this;
    }

    /**
     * Assert that a countable property has exactly N items.
     */
    public function assertCount(string $property, int $count): static
    {
        $actual = $this->get($property);

        Assert::assertCount(
            $count,
            $actual,
            "Property [{$property}] expected count [{$count}] but got [" . count($actual) . "]."
        );

        return $this;
    }

    // -----------------------------------------------------------------
    //  View / HTML assertions
    // -----------------------------------------------------------------

    /**
     * Assert that the rendered HTML contains the given text.
     */
    public function assertSee(string $text): static
    {
        Assert::assertStringContainsString(
            $text,
            $this->html(),
            "Failed asserting that the component HTML contains [{$text}]."
        );

        return $this;
    }

    /**
     * Assert that the rendered HTML does NOT contain the given text.
     */
    public function assertDontSee(string $text): static
    {
        Assert::assertStringNotContainsString(
            $text,
            $this->html(),
            "Failed asserting that the component HTML does not contain [{$text}]."
        );

        return $this;
    }

    /**
     * Assert that the rendered HTML contains the given raw HTML fragment.
     */
    public function assertSeeHtml(string $html): static
    {
        Assert::assertStringContainsString(
            $html,
            $this->html(),
            "Failed asserting that the component HTML contains [{$html}]."
        );

        return $this;
    }

    /**
     * Assert that the rendered HTML does NOT contain the given raw HTML fragment.
     */
    public function assertDontSeeHtml(string $html): static
    {
        Assert::assertStringNotContainsString(
            $html,
            $this->html(),
            "Failed asserting that the component HTML does not contain [{$html}]."
        );

        return $this;
    }

    /**
     * Assert that the given texts appear in the HTML in order.
     */
    public function assertSeeInOrder(array $texts): static
    {
        $lastPos = -1;

        foreach ($texts as $text) {
            $pos = strpos($this->html(), $text, $lastPos + 1);

            Assert::assertNotFalse(
                $pos,
                "Failed asserting that [{$text}] appears in HTML after position [{$lastPos}]."
            );

            $lastPos = $pos;
        }

        return $this;
    }

    // -----------------------------------------------------------------
    //  Validation assertions
    // -----------------------------------------------------------------

    /**
     * Assert that validation errors exist.
     *
     * Without arguments: asserts that any errors exist.
     * With a string: asserts that errors exist for that key.
     * With an array of strings: asserts that errors exist for each key.
     */
    public function assertHasErrors(string|array $keys = []): static
    {
        $errorBag = $this->component->getErrorBag();
        $keys = is_string($keys) ? [$keys] : $keys;

        if (empty($keys)) {
            Assert::assertTrue(
                $errorBag->isNotEmpty(),
                'Failed asserting that the component has validation errors.'
            );
        } else {
            foreach ($keys as $key) {
                Assert::assertTrue(
                    $errorBag->has($key),
                    "Failed asserting that validation errors exist for [{$key}]."
                );
            }
        }

        return $this;
    }

    /**
     * Assert that no validation errors exist.
     *
     * Without arguments: asserts that no errors exist at all.
     * With keys: asserts that no errors exist for those specific keys.
     */
    public function assertHasNoErrors(string|array $keys = []): static
    {
        $errorBag = $this->component->getErrorBag();
        $keys = is_string($keys) ? [$keys] : $keys;

        if (empty($keys)) {
            Assert::assertTrue(
                $errorBag->isEmpty(),
                'Failed asserting that the component has no validation errors. '
                . 'Errors: ' . json_encode($errorBag->toArray())
            );
        } else {
            foreach ($keys as $key) {
                Assert::assertFalse(
                    $errorBag->has($key),
                    "Failed asserting that there are no validation errors for [{$key}]."
                );
            }
        }

        return $this;
    }

    // -----------------------------------------------------------------
    //  Event assertions
    // -----------------------------------------------------------------

    /**
     * Assert that an event was dispatched during the last interaction.
     */
    public function assertDispatched(string $event): static
    {
        $events = $this->lastResponse['events'] ?? [];
        $found = false;

        foreach ($events as $e) {
            if (($e['name'] ?? null) === $event) {
                $found = true;
                break;
            }
        }

        Assert::assertTrue(
            $found,
            "Failed asserting that event [{$event}] was dispatched."
        );

        return $this;
    }

    /**
     * Assert that an event was NOT dispatched during the last interaction.
     */
    public function assertNotDispatched(string $event): static
    {
        $events = $this->lastResponse['events'] ?? [];
        $found = false;

        foreach ($events as $e) {
            if (($e['name'] ?? null) === $event) {
                $found = true;
                break;
            }
        }

        Assert::assertFalse(
            $found,
            "Failed asserting that event [{$event}] was not dispatched."
        );

        return $this;
    }

    // -----------------------------------------------------------------
    //  Redirect / navigation assertions
    // -----------------------------------------------------------------

    /**
     * Assert that a redirect was triggered.
     * Optionally assert the redirect URL.
     */
    public function assertRedirect(?string $url = null): static
    {
        $redirect = $this->lastResponse['redirect'] ?? null;

        Assert::assertNotNull(
            $redirect,
            'Failed asserting that a redirect was triggered.'
        );

        if ($url !== null) {
            Assert::assertEquals(
                $url,
                $redirect['url'],
                "Expected redirect to [{$url}] but got [{$redirect['url']}]."
            );
        }

        return $this;
    }

    /**
     * Assert that no redirect was triggered.
     */
    public function assertNoRedirect(): static
    {
        $redirect = $this->lastResponse['redirect'] ?? null;

        Assert::assertNull(
            $redirect,
            'Failed asserting that no redirect was triggered.'
        );

        return $this;
    }

    /**
     * Assert that a SPA navigation (navigate: true) was triggered.
     * Optionally assert the navigation URL.
     */
    public function assertNavigate(?string $url = null): static
    {
        $redirect = $this->lastResponse['redirect'] ?? null;

        Assert::assertNotNull(
            $redirect,
            'Failed asserting that a SPA navigation was triggered.'
        );

        Assert::assertTrue(
            $redirect['navigate'] ?? false,
            'Failed asserting that navigate mode was used (expected navigate: true).'
        );

        if ($url !== null) {
            Assert::assertEquals($url, $redirect['url']);
        }

        return $this;
    }

    // -----------------------------------------------------------------
    //  Snapshot assertions
    // -----------------------------------------------------------------

    /**
     * Assert that the snapshot memo contains a given key.
     */
    public function assertSnapshotHas(string $memoKey): static
    {
        Assert::assertArrayHasKey(
            $memoKey,
            $this->lastSnapshot['memo'],
            "Failed asserting that snapshot memo contains [{$memoKey}]."
        );

        return $this;
    }

    // -----------------------------------------------------------------
    //  HTTP Status assertions
    // -----------------------------------------------------------------

    /**
     * Assert that the last response had a specific HTTP status code.
     */
    public function assertStatus(int $status): static
    {
        Assert::assertEquals(
            $status,
            $this->lastStatusCode,
            "Expected status [{$status}] but got [{$this->lastStatusCode}]."
        );

        return $this;
    }

    /**
     * Assert that the last response was successful (2xx).
     */
    public function assertSuccessful(): static
    {
        Assert::assertTrue(
            $this->lastStatusCode >= 200 && $this->lastStatusCode < 300,
            "Expected successful status (2xx) but got [{$this->lastStatusCode}]."
        );

        return $this;
    }

    /**
     * Assert that the last response was 403 Forbidden.
     */
    public function assertForbidden(): static
    {
        return $this->assertStatus(403);
    }

    /**
     * Assert that the last response was 401 Unauthorized.
     */
    public function assertUnauthorized(): static
    {
        return $this->assertStatus(401);
    }

    /**
     * Assert that the last response was 404 Not Found.
     */
    public function assertNotFound(): static
    {
        return $this->assertStatus(404);
    }

    // -----------------------------------------------------------------
    //  View data assertions
    // -----------------------------------------------------------------

    /**
     * Assert that the view received specific data.
     *
     * @param  string  $key    The data key (supports dot notation)
     * @param  mixed   $value  Optional value to check (if null, just checks key exists)
     */
    public function assertViewHas(string $key, mixed $value = null): static
    {
        $actual = data_get($this->lastViewData, $key);

        if (func_num_args() === 1) {
            Assert::assertTrue(
                data_get($this->lastViewData, $key) !== null
                    || array_key_exists($key, $this->lastViewData),
                "Failed asserting that view has data [{$key}]."
            );
        } else {
            Assert::assertEquals(
                $value,
                $actual,
                "View data [{$key}] expected to be [" . json_encode($value)
                . "] but is [" . json_encode($actual) . "]."
            );
        }

        return $this;
    }

    /**
     * Assert that the view does NOT have specific data.
     */
    public function assertViewMissing(string $key): static
    {
        Assert::assertNull(
            data_get($this->lastViewData, $key),
            "Failed asserting that view does not have data [{$key}]."
        );

        return $this;
    }

    // -----------------------------------------------------------------
    //  Download assertions
    // -----------------------------------------------------------------

    /**
     * Assert that a file download was triggered.
     *
     * @param  string|null  $filename  Optional filename to check
     */
    public function assertFileDownloaded(?string $filename = null): static
    {
        $download = $this->lastResponse['download'] ?? null;

        Assert::assertNotNull(
            $download,
            'Failed asserting that a file download was triggered.'
        );

        if ($filename !== null) {
            Assert::assertEquals(
                $filename,
                $download['name'] ?? null,
                "Expected download filename [{$filename}] but got [{$download['name']}]."
            );
        }

        return $this;
    }

    /**
     * Assert that no file download was triggered.
     */
    public function assertNoFileDownloaded(): static
    {
        $download = $this->lastResponse['download'] ?? null;

        Assert::assertNull(
            $download,
            'Failed asserting that no file download was triggered.'
        );

        return $this;
    }

    // -----------------------------------------------------------------
    //  Exception assertions
    // -----------------------------------------------------------------

    /**
     * Assert that an exception was thrown during the last interaction.
     */
    public function assertThrown(string $exceptionClass): static
    {
        $exception = $this->lastResponse['exception'] ?? null;

        Assert::assertNotNull(
            $exception,
            "Expected exception [{$exceptionClass}] but none was thrown."
        );

        Assert::assertInstanceOf(
            $exceptionClass,
            $exception,
            "Expected exception [{$exceptionClass}] but got [" . get_class($exception) . "]."
        );

        return $this;
    }
}
