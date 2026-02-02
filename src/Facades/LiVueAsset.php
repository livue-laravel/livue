<?php

namespace LiVue\Facades;

use Illuminate\Support\Facades\Facade;
use LiVue\AssetManager;

/**
 * Facade for LiVue Asset Management.
 *
 * @method static void register(array $assets, string $package = 'app')
 * @method static void registerScript(string $src, ?string $type = null, bool $defer = true, bool $async = false)
 * @method static void registerStyle(string $href, ?string $media = null)
 * @method static void registerCssVariables(array $variables, string $package = 'app')
 * @method static void registerScriptData(array $data, string $package = 'app')
 * @method static void registerImport(string $module, string $url)
 * @method static void registerImports(array $imports)
 * @method static array getStyles(?array $packages = null)
 * @method static array getScripts(?array $packages = null)
 * @method static array getCssVariables(?array $packages = null)
 * @method static array getScriptData(?array $packages = null)
 * @method static string renderStyles(?string $nonce = null)
 * @method static string renderScripts(?string $nonce = null)
 * @method static string renderCssVariables(?string $nonce = null)
 * @method static string renderScriptData(?string $nonce = null)
 * @method static string renderImportMap()
 *
 * @see \LiVue\AssetManager
 */
class LiVueAsset extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return AssetManager::class;
    }
}
