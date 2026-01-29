import { defineConfig } from 'vite';
import { resolve } from 'path';

/**
 * Vite configuration for building LiVue IIFE bundle.
 *
 * Output: dist/livue.js - Vue included, for <script> tag
 *
 * Usage: npx vite build --config vite.config.build.js
 */
export default defineConfig({
    root: __dirname,
    publicDir: false,
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        '__VUE_OPTIONS_API__': true,
        '__VUE_PROD_DEVTOOLS__': false,
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false,
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm-bundler.js',
        },
    },
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        lib: {
            entry: resolve(__dirname, 'resources/js/livue.js'),
            name: 'LiVue',
            fileName: () => 'livue.js',
            formats: ['iife'],
        },
        cssCodeSplit: false,
        minify: 'esbuild',
        sourcemap: true,
        target: 'es2020',
    },
    css: {
        postcss: {},
    },
});
