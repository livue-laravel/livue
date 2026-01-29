<?php

namespace LiVue\Blade;

use Illuminate\Support\Facades\Blade;
use LiVue\LiVueManager;

class LiVueBladeDirectives
{
    /**
     * Register all LiVue Blade directives.
     */
    public static function register(): void
    {
        static::registerComponentTagCompiler();
        static::registerLiVueDirective();
        static::registerScriptsDirective();
        static::registerStylesDirective();
        static::registerSetupScriptDirectives();
        static::registerTeleportDirectives();
        static::registerPersistDirectives();
    }

    /**
     * Register the component tag precompiler for <livue:*> syntax.
     */
    protected static function registerComponentTagCompiler(): void
    {
        Blade::precompiler(function (string $value) {
            return (new LiVueComponentTagCompiler())->compile($value);
        });
    }

    /**
     * @livue('component-name') or @livue('component-name', ['prop' => value])
     */
    protected static function registerLiVueDirective(): void
    {
        Blade::directive('livue', function (string $expression) {
            return "<?php echo app(\\LiVue\\LiVueManager::class)->renderComponent({$expression}); ?>";
        });
    }

    /**
     * @livueScripts - Outputs the LiVue JavaScript tag.
     */
    protected static function registerScriptsDirective(): void
    {
        Blade::directive('livueScripts', function () {
            return '<?php echo app(\\LiVue\\LiVueManager::class)->renderScripts(); ?>';
        });
    }

    /**
     * @livueStyles - Outputs the LiVue CSS tag.
     */
    protected static function registerStylesDirective(): void
    {
        Blade::directive('livueStyles', function () {
            return '<?php echo app(\\LiVue\\LiVueManager::class)->renderStyles(); ?>';
        });
    }

    /**
     * @script / @endscript - Define Vue Composition API setup code.
     *
     * Outputs a <script type="application/livue-setup"> block that is
     * extracted by the JS runtime and executed inside the component's
     * setup() function. The code has access to Vue APIs (ref, computed,
     * watch, onMounted, etc.), server state properties as refs, and
     * the livue helper. Must return an object with additional bindings.
     *
     * Includes nonce attribute if CSP support is enabled.
     */
    protected static function registerSetupScriptDirectives(): void
    {
        Blade::directive('script', function () {
            return '<?php
                $__livue_nonce = app(\\LiVue\\LiVueManager::class)->getNonce();
                $__livue_nonce_attr = $__livue_nonce ? \' nonce="\' . e($__livue_nonce) . \'"\' : \'\';
            ?><script type="application/livue-setup"<?php echo $__livue_nonce_attr; ?>>';
        });

        Blade::directive('endscript', function () {
            return '</script>';
        });
    }

    /**
     * @teleport / @endteleport - Render content outside the component.
     *
     * Uses Vue 3's built-in Teleport component to render content at a
     * different location in the DOM (e.g., body for modals).
     *
     * Usage:
     *   @teleport('body')
     *       <div class="modal">...</div>
     *   @endteleport
     *
     *   @teleport('#notifications')
     *       <div class="toast">...</div>
     *   @endteleport
     */
    protected static function registerTeleportDirectives(): void
    {
        Blade::directive('teleport', function (string $expression) {
            return '<Teleport to=' . $expression . '>';
        });

        Blade::directive('endteleport', function () {
            return '</Teleport>';
        });
    }

    /**
     * @persist / @endpersist - Preserve DOM elements across SPA navigations.
     *
     * Wraps content in a div with data-livue-persist attribute that is
     * preserved when navigating between pages. Useful for video players,
     * audio players, or any element that should maintain its state during
     * SPA navigation.
     *
     * Usage:
     *   @persist('player')
     *       <video id="main-player" autoplay>...</video>
     *   @endpersist
     *
     *   @persist('audio')
     *       <audio src="..." autoplay></audio>
     *   @endpersist
     *
     * The key must be unique across pages where the element should persist.
     * On the new page, include the same @persist block with the same key.
     */
    protected static function registerPersistDirectives(): void
    {
        Blade::directive('persist', function (string $expression) {
            return '<div data-livue-persist=' . $expression . '>';
        });

        Blade::directive('endpersist', function () {
            return '</div>';
        });
    }

}
