<?php

namespace LiVue\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

class MakeLiVueComposableCommand extends Command
{
    protected $signature = 'make:livue-composable {name : The name of the Composable trait}';

    protected $description = 'Create a new LiVue Composable trait';

    protected Filesystem $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->setAliases(['livue:composable']);

        $this->files = $files;
    }

    public function handle(): int
    {
        $name = $this->argument('name');
        $className = Str::studly($name);

        if (! Str::startsWith($className, 'Use')) {
            $className = 'Use' . $className;
        }

        $method = Str::camel($className);
        $namespaceKey = Str::camel(Str::after($className, 'Use'));

        $namespace = config('livue.composable_namespace', 'App\\LiVue\\Composables');
        $path = config('livue.composable_path', app_path('LiVue/Composables'));
        $filePath = $path . '/' . $className . '.php';

        if ($this->files->exists($filePath)) {
            $this->components->error("Composable [{$className}] already exists!");

            return self::FAILURE;
        }

        $this->files->ensureDirectoryExists($path);

        $stub = $this->files->get($this->getStubPath('livue-composable.stub'));

        $stub = str_replace(
            ['{{ namespace }}', '{{ class }}', '{{ method }}', '{{ namespace_key }}'],
            [$namespace, $className, $method, $namespaceKey],
            $stub,
        );

        $this->files->put($filePath, $stub);

        $this->components->info("LiVue Composable [{$className}] created successfully.");
        $this->line("  <comment>{$path}/{$className}.php</comment>");

        return self::SUCCESS;
    }

    protected function getStubPath(string $stub): string
    {
        return __DIR__ . '/../../stubs/' . $stub;
    }
}
