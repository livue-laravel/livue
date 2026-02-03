<?php

namespace LiVue\Tests;

use LiVue\LiVueServiceProvider;
use Orchestra\Testbench\TestCase as OrchestraTestCase;

abstract class TestCase extends OrchestraTestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutExceptionHandling();
    }

    protected function getPackageProviders($app): array
    {
        return [
            LiVueServiceProvider::class,
        ];
    }

    protected function getPackageAliases($app): array
    {
        return [
            'LiVue' => \LiVue\Facades\LiVue::class,
        ];
    }

    protected function defineEnvironment($app): void
    {
        $app['config']->set('app.key', 'base64:' . base64_encode(random_bytes(32)));
        $app['config']->set('database.default', 'testing');
        $app['config']->set('database.connections.testing', [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
        ]);

        $app['config']->set('view.paths', [
            __DIR__ . '/views',
        ]);
    }
}
