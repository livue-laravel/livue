<?php

namespace LiVue\Console;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;

class MakeLiVueLayoutCommand extends Command
{
    protected $signature = 'livue:layout
        {name=app : The layout name}
        {--force : Overwrite existing layout}';

    protected $description = 'Create a LiVue page layout';

    protected Filesystem $files;

    public function __construct(Filesystem $files)
    {
        parent::__construct();

        $this->files = $files;
    }

    public function handle(): int
    {
        $name = $this->argument('name');
        $path = resource_path("views/components/layouts/{$name}.blade.php");

        if ($this->files->exists($path) && ! $this->option('force')) {
            $this->components->error("Layout [{$name}] already exists! Use --force to overwrite.");

            return self::FAILURE;
        }

        $this->files->ensureDirectoryExists(dirname($path));

        $stub = $this->files->get(__DIR__ . '/../../stubs/livue-layout.stub');
        $this->files->put($path, $stub);

        $this->components->info("LiVue layout [{$name}] created at: {$path}");

        return self::SUCCESS;
    }
}
