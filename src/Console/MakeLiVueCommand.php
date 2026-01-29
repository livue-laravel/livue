<?php

namespace LiVue\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

class MakeLiVueCommand extends Command
{
    protected $signature = 'make:livue
        {name : The name of the LiVue component}
        {--single : Create a Single File Component}
        {--multi : Create a Multi File Component}';

    protected $description = 'Create a new LiVue component';

    protected Filesystem $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->files = $files;
    }

    public function handle(): int
    {
        $name = $this->argument('name');
        $className = Str::studly($name);
        $viewName = Str::kebab($name);

        // Check for mutually exclusive options
        if ($this->option('single') && $this->option('multi')) {
            $this->components->error('Cannot use --single and --multi together.');

            return self::FAILURE;
        }

        if ($this->option('single')) {
            return $this->createSingleFileComponent($className, $viewName);
        }

        if ($this->option('multi')) {
            return $this->createMultiFileComponent($className, $viewName);
        }

        // Default: class-based component
        $this->createComponentClass($className);
        $this->createBladeView($className, $viewName);

        $this->components->info("LiVue component [{$className}] created successfully.");

        return self::SUCCESS;
    }

    /**
     * Create a Single File Component.
     */
    protected function createSingleFileComponent(string $className, string $viewName): int
    {
        $path = config('livue.sfc_path', resource_path('views/livue'));
        $filePath = $path . '/' . $viewName . '.blade.php';

        if ($this->files->exists($filePath)) {
            $this->components->error("Single File Component [{$viewName}] already exists!");

            return self::FAILURE;
        }

        $this->files->ensureDirectoryExists($path);

        $stub = $this->files->get($this->getStubPath('livue-single.stub'));
        $stub = str_replace('{{ name }}', $className, $stub);

        $this->files->put($filePath, $stub);

        $this->components->info("Single File Component [{$viewName}] created at:");
        $this->line("  <comment>resources/views/livue/{$viewName}.blade.php</comment>");

        return self::SUCCESS;
    }

    /**
     * Create a Multi File Component folder structure.
     */
    protected function createMultiFileComponent(string $className, string $viewName): int
    {
        $basePath = config('livue.mfc_path', resource_path('views/livue')) . '/' . $viewName;

        if ($this->files->isDirectory($basePath)) {
            $this->components->error("Multi File Component [{$viewName}] already exists!");

            return self::FAILURE;
        }

        $this->files->ensureDirectoryExists($basePath);

        // Create PHP file
        $phpStub = $this->files->get($this->getStubPath('livue-multi-php.stub'));
        $phpStub = str_replace('{{ name }}', $className, $phpStub);
        $this->files->put($basePath . '/' . $viewName . '.php', $phpStub);

        // Create Blade file
        $bladeStub = $this->files->get($this->getStubPath('livue-multi-blade.stub'));
        $bladeStub = str_replace('{{ name }}', $className, $bladeStub);
        $this->files->put($basePath . '/' . $viewName . '.blade.php', $bladeStub);

        // Create JS file
        $jsStub = $this->files->get($this->getStubPath('livue-multi-js.stub'));
        $this->files->put($basePath . '/' . $viewName . '.js', $jsStub);

        // Create CSS file
        $cssStub = $this->files->get($this->getStubPath('livue-multi-css.stub'));
        $cssStub = str_replace('{{ name }}', $viewName, $cssStub);
        $this->files->put($basePath . '/' . $viewName . '.css', $cssStub);

        $this->components->info("Multi File Component [{$viewName}] created at:");
        $this->line("  <comment>resources/views/livue/{$viewName}/</comment>");
        $this->line("    ├── {$viewName}.php");
        $this->line("    ├── {$viewName}.blade.php");
        $this->line("    ├── {$viewName}.js");
        $this->line("    └── {$viewName}.css");

        return self::SUCCESS;
    }

    /**
     * Create a class-based component (default behavior).
     */
    protected function createComponentClass(string $className): void
    {
        $namespace = config('livue.component_namespace', 'App\\LiVue');
        $path = config('livue.component_path', app_path('LiVue'));
        $filePath = $path . '/' . $className . '.php';

        if ($this->files->exists($filePath)) {
            $this->components->error("Component [{$className}] already exists!");

            return;
        }

        $this->files->ensureDirectoryExists($path);

        $stub = $this->files->get($this->getStubPath('livue-component.stub'));

        $stub = str_replace(
            ['{{ namespace }}', '{{ class }}', '{{ view }}'],
            [$namespace, $className, Str::kebab($className)],
            $stub,
        );

        $this->files->put($filePath, $stub);
    }

    /**
     * Create a Blade view for class-based components.
     */
    protected function createBladeView(string $className, string $viewName): void
    {
        $path = resource_path('views/livue');
        $filePath = $path . '/' . $viewName . '.blade.php';

        if ($this->files->exists($filePath)) {
            $this->components->warn("View [livue.{$viewName}] already exists, skipping.");

            return;
        }

        $this->files->ensureDirectoryExists($path);

        $stub = $this->files->get($this->getStubPath('livue-view.stub'));

        $stub = str_replace('{{ name }}', $className, $stub);

        $this->files->put($filePath, $stub);
    }

    protected function getStubPath(string $stub): string
    {
        return __DIR__ . '/../../stubs/' . $stub;
    }
}
