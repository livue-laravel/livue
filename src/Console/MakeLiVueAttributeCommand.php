<?php

namespace LiVue\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

class MakeLiVueAttributeCommand extends Command
{
    protected $signature = 'make:livue-attribute {name : The name of the Attribute class}
                            {--target=property : The attribute target (property, method, class)}';

    protected $description = 'Create a new LiVue PHP Attribute';

    private const VALID_TARGETS = ['property', 'method', 'class'];

    protected Filesystem $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->setAliases(['livue:attribute']);

        $this->files = $files;
    }

    public function handle(): int
    {
        $name = $this->argument('name');
        $className = Str::studly($name);
        $target = strtolower($this->option('target'));

        if (! in_array($target, self::VALID_TARGETS, true)) {
            $this->components->error('Invalid target. Use: property, method, or class.');

            return self::FAILURE;
        }

        $namespace = config('livue.attribute_namespace', 'App\\LiVue\\Attributes');
        $path = config('livue.attribute_path', app_path('LiVue/Attributes'));
        $filePath = $path . '/' . $className . '.php';

        if ($this->files->exists($filePath)) {
            $this->components->error("Attribute [{$className}] already exists!");

            return self::FAILURE;
        }

        $this->files->ensureDirectoryExists($path);

        $stubName = "livue-{$target}-attribute.stub";
        $stub = $this->files->get($this->getStubPath($stubName));

        $stub = str_replace(
            ['{{ namespace }}', '{{ class }}'],
            [$namespace, $className],
            $stub,
        );

        $this->files->put($filePath, $stub);

        $this->components->info("LiVue Attribute [{$className}] created successfully.");
        $this->line("  <comment>Target:</comment> {$target}");
        $this->line("  <comment>Extends:</comment> LiVueAttribute");
        $this->line("  <comment>Path:</comment> {$filePath}");

        return self::SUCCESS;
    }

    protected function getStubPath(string $stub): string
    {
        // Check for published stubs first
        $publishedPath = base_path("stubs/livue/{$stub}");

        if ($this->files->exists($publishedPath)) {
            return $publishedPath;
        }

        return __DIR__ . '/../../stubs/' . $stub;
    }
}
