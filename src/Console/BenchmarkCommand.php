<?php

namespace LiVue\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use LiVue\Component;
use LiVue\Console\Contracts\BenchmarkSetup;
use LiVue\Events\BenchmarkFinished;
use LiVue\Events\BenchmarkStarting;
use LiVue\Facades\LiVue;
use LiVue\LifecycleManager;
use LiVue\LiVueManager;
use LiVue\Security\StateChecksum;
use LiVue\Synthesizers\SynthesizerRegistry;
use Symfony\Component\Console\Helper\TableSeparator;

class BenchmarkCommand extends Command
{
    protected $signature = 'livue:benchmark
        {component : Component class or registered name}
        {--iterations=10 : Number of iterations}
        {--method= : Method to call during update}
        {--params= : JSON-encoded method parameters}
        {--mount-params= : JSON-encoded mount parameters}
        {--format=table : Output format (table or json)}
        {--context= : JSON-encoded context variables for benchmark environment setup}
        {--setup= : Fully qualified class implementing BenchmarkSetup for custom setUp/tearDown}';

    protected $description = 'Benchmark lifecycle performance of a LiVue component';

    public function handle(): int
    {
        if (! app()->environment('local', 'testing')) {
            $this->components->error('Benchmark command is only available in local environment.');

            return self::FAILURE;
        }

        $componentArg = $this->argument('component');
        $iterations = (int) $this->option('iterations');
        $method = $this->option('method');
        $params = $this->option('params') ? json_decode($this->option('params'), true) : [];
        $mountParams = $this->option('mount-params') ? json_decode($this->option('mount-params'), true) : [];
        $format = $this->option('format');

        // Resolve the component class
        $componentClass = $this->resolveComponentClass($componentArg);

        if ($componentClass === null) {
            $this->components->error("Component [{$componentArg}] not found.");

            return self::FAILURE;
        }

        // Parse context
        $context = $this->parseContext();
        if ($context === null) {
            return self::FAILURE;
        }

        // Resolve setup
        $setup = $this->resolveSetup();
        if ($setup === false) {
            return self::FAILURE;
        }

        $this->components->info("Benchmarking [{$componentClass}] ({$iterations} iterations)");
        $this->newLine();

        // Dispatch starting event
        BenchmarkStarting::dispatch($componentClass, $context, $method, $iterations);

        // Call setUp if setup exists
        $setup?->setUp($context);

        $mountResults = [];
        $updateResults = [];

        try {
            $lifecycle = app(LifecycleManager::class);

            // Benchmark mount
            for ($i = 0; $i < $iterations; $i++) {
                $component = new $componentClass();
                if (! empty($mountParams)) {
                    $component->setState($mountParams);
                }
                $mountResults[] = $lifecycle->benchmarkMount($component, $mountParams);
            }

            // Benchmark update (requires a mounted component first)
            for ($i = 0; $i < $iterations; $i++) {
                $component = new $componentClass();
                if (! empty($mountParams)) {
                    $component->setState($mountParams);
                }
                $lifecycle->mount($component, $mountParams);

                $componentName = $component->getName();
                $rawState = $component->getState();
                $synthRegistry = app(SynthesizerRegistry::class);
                $dehydratedState = $synthRegistry->dehydrateState($rawState);
                $checksum = StateChecksum::generate($componentName, $dehydratedState);

                $memo = [
                    'name' => $componentName,
                    'class' => encrypt(get_class($component)),
                    'checksum' => $checksum,
                ];

                // Create a fresh component for the update
                $updateComponent = new $componentClass();

                $updateResults[] = $lifecycle->benchmarkUpdate(
                    $updateComponent,
                    $componentName,
                    $dehydratedState,
                    $memo,
                    [],
                    $method,
                    $params
                );
            }
        } finally {
            $setup?->tearDown();
            BenchmarkFinished::dispatch($componentClass, $context, $mountResults, $updateResults);
        }

        $peakMemory = memory_get_peak_usage(true);

        if ($format === 'json') {
            return $this->outputJson($mountResults, $updateResults, $peakMemory);
        }

        return $this->outputTable($mountResults, $updateResults, $peakMemory);
    }

    /**
     * Resolve a component argument to a fully qualified class name.
     */
    protected function resolveComponentClass(string $arg): ?string
    {
        // Try as a fully qualified class name
        if (class_exists($arg) && is_subclass_of($arg, Component::class)) {
            return $arg;
        }

        // Try as registered name via LiVueManager
        try {
            $class = LiVue::getComponentClass($arg);
            if ($class !== null && class_exists($class)) {
                return $class;
            }
        } catch (\Throwable) {
            // Ignore resolution failures
        }

        // Try discovery via all registered component namespaces
        $manager = app(LiVueManager::class);
        $className = Str::studly($arg);

        foreach ($manager->getComponentNamespaces() as $namespace) {
            $fullClass = $namespace . '\\' . $className;
            if (class_exists($fullClass) && is_subclass_of($fullClass, Component::class)) {
                return $fullClass;
            }
        }

        return null;
    }

    /**
     * Parse context from JSON option.
     */
    protected function parseContext(): ?array
    {
        $raw = $this->option('context');

        if ($raw === null) {
            return [];
        }

        $decoded = json_decode($raw, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->components->error('Invalid JSON for --context: ' . json_last_error_msg());

            return null;
        }

        return $decoded;
    }

    /**
     * Resolve setup class.
     */
    protected function resolveSetup(): BenchmarkSetup|false|null
    {
        $class = $this->option('setup');

        if ($class === null) {
            return null;
        }

        if (! class_exists($class)) {
            $this->components->error("Setup class [{$class}] not found.");

            return false;
        }

        if (! is_subclass_of($class, BenchmarkSetup::class)) {
            $this->components->error("Setup class [{$class}] must implement " . BenchmarkSetup::class);

            return false;
        }

        return new $class();
    }

    /**
     * Compute statistics (min, max, avg, median) for a set of values.
     */
    protected function computeStats(array $values): array
    {
        if (empty($values)) {
            return ['min' => 0, 'max' => 0, 'avg' => 0, 'median' => 0];
        }

        sort($values);
        $count = count($values);
        $mid = (int) floor($count / 2);

        return [
            'min' => $values[0],
            'max' => $values[$count - 1],
            'avg' => (int) round(array_sum($values) / $count),
            'median' => $count % 2 === 0
                ? (int) round(($values[$mid - 1] + $values[$mid]) / 2)
                : $values[$mid],
        ];
    }

    /**
     * Extract per-phase values from result arrays and compute stats.
     */
    protected function aggregatePhases(array $results): array
    {
        if (empty($results)) {
            return [];
        }

        $phases = array_keys($results[0]);
        $aggregated = [];

        foreach ($phases as $phase) {
            $values = array_map(fn ($r) => $r[$phase] ?? 0, $results);
            $aggregated[$phase] = $this->computeStats($values);
        }

        return $aggregated;
    }

    /**
     * Output results as a table.
     */
    protected function outputTable(array $mountResults, array $updateResults, int $peakMemory): int
    {
        $mountStats = $this->aggregatePhases($mountResults);
        $updateStats = $this->aggregatePhases($updateResults);

        // Mount table
        $this->components->info('Mount Lifecycle (microseconds)');
        $rows = [];
        foreach ($mountStats as $phase => $stats) {
            if ($phase === 'total') {
                $rows[] = new TableSeparator();
            }
            $rows[] = [
                $phase === 'total' ? '<fg=white;options=bold>' . $phase . '</>' : $phase,
                $this->colorize($stats['min'], $phase),
                $this->colorize($stats['max'], $phase),
                $this->colorize($stats['avg'], $phase),
                $this->colorize($stats['median'], $phase),
            ];
        }
        $this->table(['Phase', 'Min', 'Max', 'Avg', 'Median'], $rows);

        $this->newLine();

        // Update table
        $this->components->info('Update Lifecycle (microseconds)');
        $rows = [];
        foreach ($updateStats as $phase => $stats) {
            if ($phase === 'total') {
                $rows[] = new TableSeparator();
            }
            $rows[] = [
                $phase === 'total' ? '<fg=white;options=bold>' . $phase . '</>' : $phase,
                $this->colorize($stats['min'], $phase),
                $this->colorize($stats['max'], $phase),
                $this->colorize($stats['avg'], $phase),
                $this->colorize($stats['median'], $phase),
            ];
        }
        $this->table(['Phase', 'Min', 'Max', 'Avg', 'Median'], $rows);

        $this->newLine();
        $this->components->info('Peak Memory: ' . $this->formatBytes($peakMemory));

        return self::SUCCESS;
    }

    /**
     * Phases that involve user code (DB queries, business logic, rendering).
     * These use relaxed thresholds: green <50ms, yellow 50-200ms, red >200ms.
     */
    protected const USER_PHASES = ['mount', 'method_call', 'render', 'total'];

    /**
     * Format a microsecond value with unit and color based on thresholds.
     *
     * Values are displayed in ms, or seconds if >= 1000ms.
     *
     * Framework phases (boot, hydrate, dehydrate, etc.):
     *   Green: < 5ms — fast
     *   Yellow: 5–20ms — attention
     *   Red: > 20ms — slow
     *
     * User phases (mount, method_call, render, total):
     *   Green: < 50ms — fast
     *   Yellow: 50–200ms — attention
     *   Red: > 200ms — slow
     */
    protected function colorize(int $us, string $phase = ''): string
    {
        $ms = $us / 1000;

        $label = $ms >= 1000
            ? number_format($ms / 1000, 2) . 's'
            : number_format($ms, 2) . 'ms';

        $isUserPhase = in_array($phase, self::USER_PHASES, true);
        $greenMax = $isUserPhase ? 50 : 5;
        $yellowMax = $isUserPhase ? 200 : 20;

        if ($ms < $greenMax) {
            return "<fg=green>{$label}</>";
        }

        if ($ms < $yellowMax) {
            return "<fg=yellow>{$label}</>";
        }

        return "<fg=red>{$label}</>";
    }

    /**
     * Output results as JSON.
     */
    protected function outputJson(array $mountResults, array $updateResults, int $peakMemory): int
    {
        $output = [
            'mount' => $this->aggregatePhases($mountResults),
            'update' => $this->aggregatePhases($updateResults),
            'peak_memory' => $peakMemory,
            'iterations' => count($mountResults),
        ];

        $this->line(json_encode($output, JSON_PRETTY_PRINT));

        return self::SUCCESS;
    }

    /**
     * Format bytes to human-readable string.
     */
    protected function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $i = 0;
        $value = $bytes;

        while ($value >= 1024 && $i < count($units) - 1) {
            $value /= 1024;
            $i++;
        }

        return round($value, 2) . ' ' . $units[$i];
    }
}
