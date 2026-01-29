/**
 * Vite Plugin for LiVue HMR (Hot Module Replacement)
 *
 * This plugin watches for changes in Blade templates and PHP component classes,
 * then sends custom HMR events to the client. The client then uses LiVue.reboot()
 * to reload components while preserving state.
 *
 * @param {object} options - Plugin options
 * @param {string[]} [options.watchPaths] - Paths to watch for changes
 * @param {boolean} [options.verbose] - Enable verbose logging
 * @returns {object} Vite plugin
 */
export default function livueHmr(options = {}) {
    const defaultWatchPaths = [
        'resources/views/livue',
        'resources/views/components',
        'app/LiVue',
    ];

    const watchPaths = options.watchPaths || defaultWatchPaths;
    const verbose = options.verbose || false;

    // Track last update time to debounce rapid changes
    let lastUpdateTime = 0;
    const debounceMs = 100;

    return {
        name: 'livue-hmr',

        /**
         * Configure the Vite dev server to watch for file changes.
         */
        configureServer(server) {
            // Only run in development
            if (server.config.command !== 'serve') {
                return;
            }

            // Use the existing file watcher from Vite
            const watcher = server.watcher;

            watcher.on('change', (file) => {
                // Normalize path separators
                const normalizedFile = file.replace(/\\/g, '/');

                // Check if this is a file we care about
                if (!shouldHandleFile(normalizedFile, watchPaths)) {
                    return;
                }

                // Debounce rapid changes
                const now = Date.now();
                if (now - lastUpdateTime < debounceMs) {
                    return;
                }
                lastUpdateTime = now;

                // Determine file type
                const fileType = getFileType(normalizedFile);
                const fileName = normalizedFile.split('/').pop();

                if (verbose) {
                    console.log(`[livue-hmr] ${fileType} changed: ${fileName}`);
                }

                // Send custom HMR event to all connected clients
                server.ws.send({
                    type: 'custom',
                    event: 'livue:hmr',
                    data: {
                        file: normalizedFile,
                        fileName: fileName,
                        type: fileType,
                        timestamp: now,
                    },
                });
            });

            // Also handle file additions
            watcher.on('add', (file) => {
                const normalizedFile = file.replace(/\\/g, '/');

                if (!shouldHandleFile(normalizedFile, watchPaths)) {
                    return;
                }

                const now = Date.now();
                if (now - lastUpdateTime < debounceMs) {
                    return;
                }
                lastUpdateTime = now;

                const fileType = getFileType(normalizedFile);
                const fileName = normalizedFile.split('/').pop();

                if (verbose) {
                    console.log(`[livue-hmr] ${fileType} added: ${fileName}`);
                }

                // New files require full reload since they might be new components
                server.ws.send({
                    type: 'custom',
                    event: 'livue:hmr',
                    data: {
                        file: normalizedFile,
                        fileName: fileName,
                        type: fileType,
                        isNew: true,
                        timestamp: now,
                    },
                });
            });

            if (verbose) {
                console.log('[livue-hmr] Watching paths:', watchPaths);
            }
        },
    };
}

/**
 * Check if a file should trigger HMR.
 *
 * @param {string} file - Normalized file path
 * @param {string[]} watchPaths - Paths to watch
 * @returns {boolean}
 */
function shouldHandleFile(file, watchPaths) {
    // Only handle .blade.php and .php files
    if (!file.endsWith('.blade.php') && !file.endsWith('.php')) {
        return false;
    }

    // Check if the file is in one of the watched paths
    for (const watchPath of watchPaths) {
        if (file.includes(watchPath)) {
            return true;
        }
    }

    return false;
}

/**
 * Get the type of file for HMR handling.
 *
 * @param {string} file - File path
 * @returns {'template'|'class'}
 */
function getFileType(file) {
    if (file.endsWith('.blade.php')) {
        return 'template';
    }
    return 'class';
}
