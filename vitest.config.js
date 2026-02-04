import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'happy-dom',
        globals: true,
        setupFiles: ['./tests/js/setup.js'],
        include: ['tests/js/**/*.test.js'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['resources/js/runtime/**/*.js'],
            exclude: [
                'resources/js/runtime/devtools/**',
                'resources/js/livue.js',
                'resources/js/livue-esm.js',
                'resources/js/livue-slim.js',
            ],
            thresholds: {
                lines: 70,
                functions: 70,
                branches: 60,
                statements: 70,
            },
        },
        mockReset: true,
        restoreMocks: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js/runtime'),
            'vue': 'vue/dist/vue.esm-bundler.js',
        },
    },
    define: {
        'import.meta.env.DEV': false,
    },
});
