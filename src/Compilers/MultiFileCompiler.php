<?php

namespace LiVue\Compilers;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;
use LiVue\Features\SupportMultiFile\CssScopingService;

/**
 * Compiler for Multi File Components.
 *
 * MFC structure:
 *   resources/views/livue/counter/
 *   ├── counter.php        # Required: anonymous class
 *   ├── counter.blade.php  # Required: template
 *   ├── counter.js         # Optional: @script content
 *   └── counter.css        # Optional: scoped styles
 */
class MultiFileCompiler
{
    protected Filesystem $files;

    protected CssScopingService $cssScoper;

    protected string $cachePath;

    public function __construct(Filesystem $files, CssScopingService $cssScoper)
    {
        $this->files = $files;
        $this->cssScoper = $cssScoper;
        $this->cachePath = config('livue.compiled_path', storage_path('framework/livue')) . '/mfc';
    }

    /**
     * Check if a directory is a valid Multi File Component structure.
     */
    public function isMultiFile(string $dirPath, string $name): bool
    {
        if (! $this->files->isDirectory($dirPath)) {
            return false;
        }

        // Must have both PHP and Blade files
        $phpPath = $dirPath . '/' . $name . '.php';
        $bladePath = $dirPath . '/' . $name . '.blade.php';

        return $this->files->exists($phpPath) && $this->files->exists($bladePath);
    }

    /**
     * Compile a Multi File Component and return the compiled class name.
     */
    public function compile(string $dirPath, string $viewName, string $componentName): string
    {
        $this->ensureCacheDirectoryExists();

        $className = $this->generateClassName($componentName);
        $classCachePath = $this->getClassCachePath($componentName);
        $viewCachePath = $this->getViewCachePath($componentName);

        $files = $this->getComponentFiles($dirPath, $viewName);

        if ($this->needsRecompilation($files, $classCachePath)) {
            // Compile PHP class
            $compiledClass = $this->compilePhpClass(
                $files['php'],
                $className,
                $componentName,
                $dirPath,
                $files['css'] ?? null,
                $viewName
            );
            $this->files->put($classCachePath, $compiledClass);

            // Compile assembled view (blade + js + css)
            $compiledView = $this->compileAssembledView(
                $files['blade'],
                $files['js'] ?? null,
                $files['css'] ?? null,
                $componentName
            );
            $this->files->put($viewCachePath, $compiledView);
        }

        // Include the compiled class file
        require_once $classCachePath;

        return 'LiVue\\Compiled\\MultiFile\\' . $className;
    }

    /**
     * Get all component files from the directory.
     */
    protected function getComponentFiles(string $dirPath, string $name): array
    {
        $files = [
            'php' => $dirPath . '/' . $name . '.php',
            'blade' => $dirPath . '/' . $name . '.blade.php',
        ];

        $jsPath = $dirPath . '/' . $name . '.js';
        if ($this->files->exists($jsPath)) {
            $files['js'] = $jsPath;
        }

        $cssPath = $dirPath . '/' . $name . '.css';
        if ($this->files->exists($cssPath)) {
            $files['css'] = $cssPath;
        }

        return $files;
    }

    /**
     * Generate a unique class name for the component.
     */
    protected function generateClassName(string $componentName): string
    {
        $base = Str::studly(str_replace(['-', '.'], '_', $componentName));
        $hash = substr(hash('xxh128', 'mfc.' . $componentName), 0, 8);

        return $base . '_' . $hash;
    }

    /**
     * Get the cache path for the compiled class.
     */
    public function getClassCachePath(string $componentName): string
    {
        $hash = hash('xxh128', 'mfc.class.' . $componentName);

        return $this->cachePath . '/' . $hash . '.php';
    }

    /**
     * Get the cache path for the assembled view.
     */
    public function getViewCachePath(string $componentName): string
    {
        $hash = hash('xxh128', 'mfc.view.' . $componentName);

        return $this->cachePath . '/' . $hash . '.blade.php';
    }

    /**
     * Check if any component file needs recompilation.
     */
    protected function needsRecompilation(array $files, string $classCachePath): bool
    {
        if (config('app.debug') && ! config('livue.cache_mfc', false)) {
            return true;
        }

        if (! $this->files->exists($classCachePath)) {
            return true;
        }

        $cacheTime = $this->files->lastModified($classCachePath);

        // Check all component files
        foreach ($files as $path) {
            if ($this->files->lastModified($path) >= $cacheTime) {
                return true;
            }
        }

        return false;
    }

    /**
     * Compile the PHP class file.
     */
    protected function compilePhpClass(
        string $phpPath,
        string $className,
        string $componentName,
        string $sourcePath,
        ?string $cssPath,
        string $viewName
    ): string {
        $phpCode = $this->files->get($phpPath);

        // Extract use statements
        $useStatements = $this->extractUseStatements($phpCode);

        // Extract class body
        $classBody = $this->extractClassBody($phpCode);

        // Get scoped CSS if present
        $scopedCss = null;
        if ($cssPath !== null && config('livue.scope_css', true)) {
            $css = $this->files->get($cssPath);
            $scopedCss = $this->cssScoper->scope($css, $viewName);
        }

        return $this->buildCompiledClass(
            $className,
            $classBody,
            $useStatements,
            $componentName,
            $sourcePath,
            $scopedCss
        );
    }

    /**
     * Extract use statements from PHP code.
     */
    protected function extractUseStatements(string $phpCode): array
    {
        $uses = [];
        $pattern = '/^use\s+([^;]+);/m';

        if (preg_match_all($pattern, $phpCode, $matches)) {
            $uses = $matches[0];
        }

        return $uses;
    }

    /**
     * Extract the class body from the anonymous class declaration.
     */
    protected function extractClassBody(string $phpCode): string
    {
        // Remove <?php if present
        $phpCode = preg_replace('/^<\?php\s*/s', '', $phpCode);

        // Remove use statements
        $phpCode = preg_replace('/^use\s+[^;]+;\s*/m', '', $phpCode);

        // Find "new class extends ... {" and extract everything inside
        $pattern = '/new\s+class\s+extends\s+\S+\s*\{(.*)};?\s*$/s';

        if (preg_match($pattern, $phpCode, $matches)) {
            return trim($matches[1]);
        }

        throw new \RuntimeException('Invalid Multi File Component: cannot extract class body from PHP file');
    }

    /**
     * Build the compiled class file content.
     */
    protected function buildCompiledClass(
        string $className,
        string $classBody,
        array $useStatements,
        string $componentName,
        string $sourcePath,
        ?string $scopedCss
    ): string {
        $uses = implode("\n", $useStatements);

        // Remove any existing render() method from the class body
        $classBody = preg_replace(
            '/(?:protected|public)\s+function\s+render\s*\([^)]*\)\s*(?::\s*\S+)?\s*\{[^}]*\}/s',
            '',
            $classBody
        );

        $classBody = trim($classBody);

        // Build view path to point to the cached assembled view
        $viewHash = hash('xxh128', 'mfc.view.' . $componentName);
        $viewPath = config('livue.compiled_path', storage_path('framework/livue')) . '/mfc/' . $viewHash . '.blade.php';

        // Escape for PHP string
        $escapedSourcePath = addslashes($sourcePath);
        $escapedCss = $scopedCss ? addslashes($scopedCss) : 'null';
        $cssLine = $scopedCss !== null
            ? "    protected static ?string \$scopedCss = '{$escapedCss}';"
            : '    protected static ?string $scopedCss = null;';

        // Scope ID matches the CSS scoping (kebab-case component name)
        $scopeId = \Illuminate\Support\Str::kebab($componentName);

        $php = "<?php\n\n";
        $php .= "namespace LiVue\\Compiled\\MultiFile;\n\n";
        $php .= $uses . "\n";
        $php .= "use LiVue\\Features\\SupportMultiFile\\MultiFileComponent;\n\n";
        $php .= "class {$className} extends MultiFileComponent\n";
        $php .= "{\n";
        $php .= "    protected static string \$sourcePath = '{$escapedSourcePath}';\n\n";
        $php .= $cssLine . "\n\n";
        $php .= "    protected static string \$scopeId = '{$scopeId}';\n\n";
        $php .= "    protected static string \$componentName = '{$scopeId}';\n\n";
        $php .= $classBody . "\n\n";
        $php .= "    protected function render(): string\n";
        $php .= "    {\n";
        $php .= "        return 'livue-mfc::{$viewHash}';\n";
        $php .= "    }\n";
        $php .= "}\n";

        return $php;
    }

    /**
     * Compile the assembled view (blade + injected js + css).
     */
    protected function compileAssembledView(
        string $bladePath,
        ?string $jsPath,
        ?string $cssPath,
        string $componentName
    ): string {
        $template = $this->files->get($bladePath);

        // Inject JS as @script block if present
        if ($jsPath !== null) {
            $jsContent = $this->files->get($jsPath);
            $template .= "\n\n@script\n{$jsContent}\n@endscript";
        }

        // Note: Scoped CSS is NOT injected here anymore.
        // It's stored in the compiled class ($scopedCss property) and
        // injected by ComponentRenderer OUTSIDE the component wrapper
        // to avoid Vue template compilation errors.

        return $template;
    }

    /**
     * Ensure the cache directory exists.
     */
    protected function ensureCacheDirectoryExists(): void
    {
        if (! $this->files->isDirectory($this->cachePath)) {
            $this->files->makeDirectory($this->cachePath, 0755, true);
        }
    }

    /**
     * Clear all compiled MFC cache files.
     */
    public function clearCache(): void
    {
        if ($this->files->isDirectory($this->cachePath)) {
            $this->files->deleteDirectory($this->cachePath, preserve: true);
        }
    }
}
