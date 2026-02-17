import { defineConfig } from 'vite';
import { resolve } from 'path';

/**
 * Vite configuration for building LiVue ESM bundle.
 *
 * Output: dist/livue.esm.js - Vue external, for import with bundler
 *
 * Usage: npx vite build --config vite.config.esm.js
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
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: false, // Don't delete IIFE build
        lib: {
            entry: resolve(__dirname, 'resources/js/livue-esm.js'),
            name: 'LiVue',
            fileName: () => 'livue.esm.js',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
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
