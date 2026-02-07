<?php

namespace LiVue\Features\SupportSingleFile;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

class SingleFileCompiler
{
    protected Filesystem $files;

    protected string $cachePath;

    public function __construct(Filesystem $files)
    {
        $this->files = $files;
        $this->cachePath = config('livue.compiled_path', storage_path('framework/livue')) . '/sfc';
    }

    public function isSingleFile(string $bladePath): bool
    {
        if (! $this->files->exists($bladePath)) {
            return false;
        }

        $content = $this->files->get($bladePath);

        return $this->containsAnonymousClass($content);
    }

    protected function containsAnonymousClass(string $content): bool
    {
        // Check if content starts with PHP block and has anonymous class
        if (strpos(ltrim($content), '<?php') !== 0) {
            return false;
        }

        return strpos($content, 'new class extends') !== false
            && strpos($content, 'Component') !== false;
    }

    public function compile(string $bladePath, string $componentName): string
    {
        $this->ensureCacheDirectoryExists();

        $className = $this->generateClassName($componentName);
        $classCachePath = $this->getCachePath($componentName);
        $viewCachePath = $this->getViewCachePath($componentName);

        if ($this->needsRecompilation($bladePath, $classCachePath)) {
            $content = $this->files->get($bladePath);

            // Extract template and save separately
            list($phpCode, $templateStart) = $this->extractPhpBlock($content);
            $template = substr($content, $templateStart);
            $this->files->put($viewCachePath, trim($template));

            // Compile and save class
            $compiledClass = $this->compileClass($content, $className, $componentName, $bladePath);
            $this->files->put($classCachePath, $compiledClass);
        }

        require_once $classCachePath;

        return 'LiVue\\Compiled\\SingleFile\\' . $className;
    }

    public function getViewCachePath(string $componentName): string
    {
        $hash = hash('xxh128', 'sfc.view.' . $componentName);

        return $this->cachePath . '/' . $hash . '.blade.php';
    }

    public function getCachePath(string $componentName): string
    {
        $hash = hash('xxh128', 'sfc.' . $componentName);

        return $this->cachePath . '/' . $hash . '.php';
    }

    protected function generateClassName(string $componentName): string
    {
        $base = Str::studly(str_replace(['-', '.'], '_', $componentName));
        $hash = substr(hash('xxh128', $componentName), 0, 8);

        return $base . '_' . $hash;
    }

    protected function needsRecompilation(string $bladePath, string $cachePath): bool
    {
        if (config('app.debug') && ! config('livue.cache_sfc', false)) {
            return true;
        }

        if (! $this->files->exists($cachePath)) {
            return true;
        }

        return $this->files->lastModified($bladePath) >= $this->files->lastModified($cachePath);
    }

    protected function compileClass(
        string $content,
        string $className,
        string $componentName,
        string $bladePath
    ): string {
        list($phpCode, $templateStart) = $this->extractPhpBlock($content);

        $classBody = $this->extractClassBody($phpCode);
        $useStatements = $this->extractUseStatements($phpCode);
        $viewName = Str::kebab(str_replace(['.', '_'], '-', $componentName));

        return $this->buildCompiledClass(
            $className,
            $classBody,
            $useStatements,
            $componentName,
            $bladePath
        );
    }

    protected function extractPhpBlock(string $content): array
    {
        $endTag = '?>';
        $endPos = strpos($content, $endTag);

        if ($endPos === false) {
            throw new \RuntimeException('Invalid Single File Component: missing closing PHP tag');
        }

        $phpCode = substr($content, 0, $endPos);
        $phpCode = preg_replace('#^\s*<\?php\s*#', '', $phpCode);
        $templateStart = $endPos + strlen($endTag);

        return [trim($phpCode), $templateStart];
    }

    protected function extractUseStatements(string $phpCode): array
    {
        $uses = [];
        $lines = explode("\n", $phpCode);

        foreach ($lines as $line) {
            $line = trim($line);
            if (strpos($line, 'use ') === 0 && strpos($line, ';') !== false) {
                $uses[] = $line;
            }
        }

        return $uses;
    }

    protected function extractClassBody(string $phpCode): string
    {
        // Remove use statements
        $lines = explode("\n", $phpCode);
        $filtered = [];

        foreach ($lines as $line) {
            $trimmed = trim($line);
            if (strpos($trimmed, 'use ') !== 0 || strpos($trimmed, ';') === false) {
                $filtered[] = $line;
            }
        }

        $phpCode = implode("\n", $filtered);

        // Find class body between braces
        $startPos = strpos($phpCode, '{');
        if ($startPos === false) {
            throw new \RuntimeException('Invalid Single File Component: cannot find class body start');
        }

        // Find matching closing brace
        $depth = 0;
        $endPos = 0;

        for ($i = $startPos; $i < strlen($phpCode); $i++) {
            $char = $phpCode[$i];

            if ($char === '{') {
                $depth++;
            } elseif ($char === '}') {
                $depth--;
                if ($depth === 0) {
                    $endPos = $i;
                    break;
                }
            }
        }

        if ($endPos === 0) {
            throw new \RuntimeException('Invalid Single File Component: cannot find class body end');
        }

        $body = substr($phpCode, $startPos + 1, $endPos - $startPos - 1);

        return trim($body);
    }

    protected function buildCompiledClass(
        string $className,
        string $classBody,
        array $useStatements,
        string $componentName,
        string $sourcePath
    ): string {
        $uses = implode("\n", $useStatements);

        // Remove any existing render() method
        $classBody = $this->removeRenderMethod($classBody);
        $classBody = trim($classBody);

        // View name is the hash used for the cached view file
        $viewHash = hash('xxh128', 'sfc.view.' . $componentName);

        $lines = [];
        $lines[] = '<?php';
        $lines[] = '';
        $lines[] = 'namespace LiVue\\Compiled\\SingleFile;';
        $lines[] = '';
        if ($uses) {
            $lines[] = $uses;
        }
        $lines[] = 'use LiVue\\Features\\SupportSingleFile\\SingleFileComponent;';
        $lines[] = '';
        // Store original component name for resolution (kebab-case)
        $kebabName = \Illuminate\Support\Str::kebab($componentName);

        $lines[] = 'class ' . $className . ' extends SingleFileComponent';
        $lines[] = '{';
        $lines[] = '    protected static string $sourcePath = \'' . addslashes($sourcePath) . '\';';
        $lines[] = '';
        $lines[] = '    protected static string $componentName = \'' . $kebabName . '\';';
        $lines[] = '';
        $lines[] = $classBody;
        $lines[] = '';
        $lines[] = '    protected function render(): string';
        $lines[] = '    {';
        $lines[] = '        return \'livue-sfc::' . $viewHash . '\';';
        $lines[] = '    }';
        $lines[] = '}';

        return implode("\n", $lines);
    }

    protected function removeRenderMethod(string $classBody): string
    {
        // Simple approach: find and remove render() method
        $lines = explode("\n", $classBody);
        $result = [];
        $inRenderMethod = false;
        $braceDepth = 0;

        foreach ($lines as $line) {
            if (!$inRenderMethod) {
                if (preg_match('/\bfunction\s+render\s*\(/', $line)) {
                    $inRenderMethod = true;
                    $braceDepth = 0;
                } else {
                    $result[] = $line;
                    continue;
                }
            }

            if ($inRenderMethod) {
                $braceDepth += substr_count($line, '{');
                $braceDepth -= substr_count($line, '}');

                if ($braceDepth <= 0 && strpos($line, '}') !== false) {
                    $inRenderMethod = false;
                }
            }
        }

        return implode("\n", $result);
    }

    protected function ensureCacheDirectoryExists(): void
    {
        if (! $this->files->isDirectory($this->cachePath)) {
            $this->files->makeDirectory($this->cachePath, 0755, true);
        }
    }

    public function clearCache(): void
    {
        if ($this->files->isDirectory($this->cachePath)) {
            $this->files->deleteDirectory($this->cachePath, preserve: true);
        }
    }
}
