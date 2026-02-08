<?php

namespace LiVue\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

class MakeLiVueSynthCommand extends Command
{
    protected $signature = 'make:livue-synth {name : The name of the Synthesizer class}';

    protected $description = 'Create a new LiVue Property Synthesizer';

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

        if (! Str::endsWith($className, 'Synth')) {
            $className .= 'Synth';
        }

        $namespace = config('livue.synth_namespace', 'App\\LiVue\\Synthesizers');
        $path = config('livue.synth_path', app_path('LiVue/Synthesizers'));
        $filePath = $path . '/' . $className . '.php';

        if ($this->files->exists($filePath)) {
            $this->components->error("Synthesizer [{$className}] already exists!");

            return self::FAILURE;
        }

        $this->files->ensureDirectoryExists($path);

        $stub = $this->files->get($this->getStubPath('livue-synth.stub'));

        $stub = str_replace(
            ['{{ namespace }}', '{{ class }}'],
            [$namespace, $className],
            $stub,
        );

        $this->files->put($filePath, $stub);

        $this->components->info("LiVue Synthesizer [{$className}] created successfully.");
        $this->line("  <comment>{$path}/{$className}.php</comment>");

        return self::SUCCESS;
    }

    protected function getStubPath(string $stub): string
    {
        return __DIR__ . '/../../stubs/' . $stub;
    }
}
