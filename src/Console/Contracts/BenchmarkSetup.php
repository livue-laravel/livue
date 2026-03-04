<?php

namespace LiVue\Console\Contracts;

interface BenchmarkSetup
{
    public function setUp(array $context): void;

    public function tearDown(): void;
}
