<?php

namespace LiVue\Facades;

use Illuminate\Support\Facades\Facade;
use LiVue\LiVueManager;

/**
 * @method static \Illuminate\Routing\Route route(string $uri, string $component)
 * @method static string renderComponent(string $name, array $props = [])
 * @method static void register(string $name, string $class)
 * @method static void registerNamespace(string|array $namespace)
 * @method static array<int, string> getComponentNamespaces()
 * @method static bool componentExists(string $name)
 * @method static \LiVue\Component resolve(string $name)
 * @method static \LiVue\Component resolveByClass(string $class)
 * @method static \LiVue\Features\SupportTesting\Testable test(string $componentClass, array $params = [])
 * @method static string|null installedVersion()
 * @method static string|null getNonce()
 * @method static string renderOnRequestStyle(string $id, string $package = 'app')
 * @method static string renderOnRequestScript(string $id, string $package = 'app', array $options = [])
 * @method static void addPersistentMiddleware(array $middleware)
 * @method static void createStore(string $name, array|callable $definition)
 * @method static array<string, mixed>|null getGlobalStore(string $name)
 * @method static void flushGlobalStores()
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
