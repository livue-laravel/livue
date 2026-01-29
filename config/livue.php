<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Asset Injection
    |--------------------------------------------------------------------------
    |
    | When enabled, LiVue will automatically inject CSS and JS assets into
    | HTML responses that contain LiVue components. This eliminates the need
    | to manually add @livueStyles and @livueScripts to your layout.
    |
    | In development, assets are loaded via Vite dev server.
    | In production, assets are loaded from public/vendor/livue/.
    |
    */
    'inject_assets' => true,

    /*
    |--------------------------------------------------------------------------
    | Custom Vue Configuration
    |--------------------------------------------------------------------------
    |
    | Set to true if you want to customize the Vue instance (e.g., add Vuetify,
    | Pinia, or other Vue plugins that need to share the same Vue instance).
    |
    | When true, LiVue will NOT auto-inject its bundle. You must import LiVue
    | in your app.js and configure it with LiVue.setup().
    |
    | Example in app.js:
    |   import LiVue from 'livue';
    |   import { createVuetify } from 'vuetify';
    |   const vuetify = createVuetify({...});
    |   LiVue.setup((app) => app.use(vuetify));
    |
    */
    'custom_vue' => true,

    /*
    |--------------------------------------------------------------------------
    | Route Prefix
    |--------------------------------------------------------------------------
    |
    | The URI prefix for LiVue AJAX endpoints.
    |
    */
    'route_prefix' => 'livue',

    /*
    |--------------------------------------------------------------------------
    | Middleware
    |--------------------------------------------------------------------------
    |
    | Middleware applied to LiVue routes.
    |
    */
    'middleware' => ['web'],

    /*
    |--------------------------------------------------------------------------
    | Component Namespace
    |--------------------------------------------------------------------------
    |
    | The default namespace where LiVue components are located.
    |
    */
    'component_namespace' => 'App\\LiVue',

    /*
    |--------------------------------------------------------------------------
    | Component Path
    |--------------------------------------------------------------------------
    |
    | The directory path where LiVue components are stored.
    |
    */
    'component_path' => app_path('LiVue'),

    /*
    |--------------------------------------------------------------------------
    | Temporary Upload Disk
    |--------------------------------------------------------------------------
    |
    | The filesystem disk used to store temporary file uploads.
    |
    */
    'temp_upload_disk' => 'local',

    /*
    |--------------------------------------------------------------------------
    | Temporary Upload Directory
    |--------------------------------------------------------------------------
    |
    | The directory within the temp disk where uploads are stored.
    |
    */
    'temp_upload_directory' => 'livue-tmp',

    /*
    |--------------------------------------------------------------------------
    | Page Layout
    |--------------------------------------------------------------------------
    |
    | The default Blade layout view used when rendering LiVue components
    | as full pages via LiVue::route(). Components can override this
    | by setting their protected $layout property.
    |
    */
    'layout' => 'components.layouts.app',

    /*
    |--------------------------------------------------------------------------
    | Single File Components Path
    |--------------------------------------------------------------------------
    |
    | The directory path where Single File Components are located.
    | SFC files are Blade templates with embedded PHP classes.
    |
    */
    'sfc_path' => resource_path('views/livue'),

    /*
    |--------------------------------------------------------------------------
    | Multi File Components Path
    |--------------------------------------------------------------------------
    |
    | The directory path where Multi File Component folders are located.
    |
    */
    'mfc_path' => resource_path('views/livue'),

    /*
    |--------------------------------------------------------------------------
    | Compiled Components Cache Path
    |--------------------------------------------------------------------------
    |
    | Where to store compiled SFC and MFC class files.
    |
    */
    'compiled_path' => storage_path('framework/livue'),

    /*
    |--------------------------------------------------------------------------
    | CSS Scoping
    |--------------------------------------------------------------------------
    |
    | Whether to enable automatic CSS scoping for Multi File Components.
    |
    */
    'scope_css' => true,

    /*
    |--------------------------------------------------------------------------
    | Cache SFC/MFC in Debug Mode
    |--------------------------------------------------------------------------
    |
    | By default, SFC and MFC are recompiled on every request in debug mode.
    | Set these to true to enable caching even in debug mode.
    |
    */
    'cache_sfc' => false,
    'cache_mfc' => false,

    /*
    |--------------------------------------------------------------------------
    | Content Security Policy (CSP) Nonce
    |--------------------------------------------------------------------------
    |
    | When enabled, LiVue will add a nonce attribute to inline scripts,
    | allowing you to use a strict CSP without 'unsafe-inline'.
    |
    | To use:
    | 1. Enable this option
    | 2. Add LiVueCspMiddleware to your middleware stack (or generate nonce yourself)
    | 3. Add the nonce to your CSP header: script-src 'nonce-{nonce}'
    |
    | You can access the nonce via LiVue::getNonce() for use in your CSP header.
    |
    */
    'csp_nonce' => env('LIVUE_CSP_NONCE', false),

    /*
    |--------------------------------------------------------------------------
    | Persistent Middleware
    |--------------------------------------------------------------------------
    |
    | Additional middleware that should be re-applied on AJAX updates.
    | By default, LiVue re-applies auth, can, verified, etc.
    | Add your custom authorization middleware here.
    |
    */
    'persistent_middleware' => [
        // 'custom.middleware',
    ],

    /*
    |--------------------------------------------------------------------------
    | Navigation Settings
    |--------------------------------------------------------------------------
    |
    | Configure SPA navigation behavior for v-navigate links.
    |
    */
    'navigate' => [
        // Show progress bar during SPA navigation
        'show_progress_bar' => true,

        // Progress bar color
        'progress_bar_color' => '#29d',

        // Enable prefetching for v-navigate links
        'prefetch' => true,

        // Prefetch on hover (true) or only on mousedown (false)
        'prefetch_on_hover' => true,

        // Delay in ms before prefetching on hover
        'hover_delay' => 60,

        // Cache pages for instant back/forward navigation
        'cache_pages' => true,

        // Maximum number of pages to cache
        'max_cache_size' => 10,

        // Restore scroll position on back/forward
        'restore_scroll' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Hot Module Replacement (HMR)
    |--------------------------------------------------------------------------
    |
    | Configure HMR behavior during development.
    | HMR allows you to edit Blade templates and PHP classes and see
    | changes reflected immediately without losing component state.
    |
    | Note: HMR only works in development with the Vite dev server running.
    |
    */
    'hmr' => [
        // Enable HMR (only active when Vite dev server is running)
        'enabled' => env('LIVUE_HMR', true),

        // Show visual indicator during HMR updates
        'indicator' => true,

        // Preserve component state during hot reload
        'preserve_state' => true,

        // Paths to watch for changes (configured in vite.config.js)
        // 'resources/views/livue' - Blade templates
        // 'app/LiVue' - PHP component classes
    ],

];
