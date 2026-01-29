<?php

namespace LiVue\Facades;

use Illuminate\Support\Facades\Facade;
use LiVue\LiVueManager;

/**
 * @method static \Illuminate\Routing\Route route(string $uri, string $component)
 * @method static string renderComponent(string $name, array $props = [])
 * @method static void register(string $name, string $class)
 * @method static bool componentExists(string $name)
 * @method static \LiVue\Component resolve(string $name)
 * @method static \LiVue\Component resolveByClass(string $class)
 * @method static \LiVue\Features\SupportTesting\Testable test(string $componentClass, array $params = [])
 * @method static string|null getNonce()
 * @method static void addPersistentMiddleware(array $middleware)
 *
 * @see \LiVue\LiVueManager
 */
class LiVue extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return LiVueManager::class;
    }
}
