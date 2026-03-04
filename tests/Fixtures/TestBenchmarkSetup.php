<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Console\Contracts\BenchmarkSetup;

class TestBenchmarkSetup implements BenchmarkSetup
{
    public static bool $setUpCalled = false;

    public static bool $tearDownCalled = false;

    public static array $receivedContext = [];

    public static function reset(): void
    {
        static::$setUpCalled = false;
        static::$tearDownCalled = false;
        static::$receivedContext = [];
    }

    public function setUp(array $context): void
    {
        static::$setUpCalled = true;
        static::$receivedContext = $context;
    }

    public function tearDown(): void
    {
        static::$tearDownCalled = true;
    }
}
