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
        $target = $this->resolveTarget($this->option('target'));

        if ($target === null) {
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

        $stub = $this->files->get($this->getStubPath('livue-attribute.stub'));

        $stub = str_replace(
            ['{{ namespace }}', '{{ class }}', '{{ target }}'],
            [$namespace, $className, $target],
            $stub,
        );

        $this->files->put($filePath, $stub);

        $this->components->info("LiVue Attribute [{$className}] created successfully.");
        $this->line("  <comment>{$path}/{$className}.php</comment>");

        return self::SUCCESS;
    }

    protected function resolveTarget(string $target): ?string
    {
        return match (strtolower($target)) {
            'property' => 'Attribute::TARGET_PROPERTY',
            'method' => 'Attribute::TARGET_METHOD',
            'class' => 'Attribute::TARGET_CLASS',
            default => null,
        };
    }

    protected function getStubPath(string $stub): string
    {
        return __DIR__ . '/../../stubs/' . $stub;
    }
}
