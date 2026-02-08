<?php

namespace LiVue\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class PurgeUploadsCommand extends Command
{
    protected $signature = 'livue:purge-uploads
        {--hours= : Max age in hours (default from config)}';

    protected $description = 'Delete temporary upload files older than the configured max age';

    public function handle(): int
    {
        $disk = config('livue.temp_upload_disk', 'local');
        $directory = config('livue.temp_upload_directory', 'livue-tmp');
        $maxAgeHours = $this->option('hours') ?? config('livue.temp_upload_max_age', 1);

        $storage = Storage::disk($disk);

        if (! $storage->exists($directory)) {
            $this->components->info('No temporary upload directory found. Nothing to purge.');

            return self::SUCCESS;
        }

        $cutoff = Carbon::now()->subHours((int) $maxAgeHours);
        $files = $storage->files($directory);
        $deleted = 0;

        foreach ($files as $file) {
            $lastModified = Carbon::createFromTimestamp($storage->lastModified($file));

            if ($lastModified->isBefore($cutoff)) {
                $storage->delete($file);
                $deleted++;
            }
        }

        $this->components->info("Purged {$deleted} temporary upload file(s) older than {$maxAgeHours} hour(s).");

        return self::SUCCESS;
    }
}
