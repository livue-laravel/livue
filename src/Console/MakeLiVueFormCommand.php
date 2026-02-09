<?php

namespace LiVue\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

class MakeLiVueFormCommand extends Command
{
    protected $signature = 'make:livue-form {name : The name of the Form class}';

    protected $description = 'Create a new LiVue Form class';

    protected Filesystem $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->setAliases(['livue:form']);

        $this->files = $files;
    }

    public function handle(): int
    {
        $name = $this->argument('name');
        $className = Str::studly($name);

        // Ensure the name ends with "Form"
        if (! Str::endsWith($className, 'Form')) {
            $className .= 'Form';
        }

        $namespace = config('livue.form_namespace', 'App\\LiVue\\Forms');
        $path = config('livue.form_path', app_path('LiVue/Forms'));
        $filePath = $path . '/' . $className . '.php';

        if ($this->files->exists($filePath)) {
            $this->components->error("Form [{$className}] already exists!");

            return self::FAILURE;
        }

        $this->files->ensureDirectoryExists($path);

        $stub = $this->files->get($this->getStubPath('livue-form.stub'));

        $stub = str_replace(
            ['{{ namespace }}', '{{ class }}'],
            [$namespace, $className],
            $stub,
        );

        $this->files->put($filePath, $stub);

        $this->components->info("LiVue Form [{$className}] created successfully.");
        $this->line("  <comment>{$path}/{$className}.php</comment>");

        return self::SUCCESS;
    }

    protected function getStubPath(string $stub): string
    {
        return __DIR__ . '/../../stubs/' . $stub;
    }
}
