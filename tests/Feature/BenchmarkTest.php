<?php

use Illuminate\Support\Facades\Event;
use LiVue\Events\BenchmarkFinished;
use LiVue\Events\BenchmarkStarting;
use LiVue\LifecycleManager;
use LiVue\Security\StateChecksum;
use LiVue\Synthesizers\SynthesizerRegistry;
use LiVue\Tests\Fixtures\Counter;
use LiVue\Tests\Fixtures\TestBenchmarkSetup;

describe('Benchmark', function () {
    describe('benchmarkMount()', function () {
        it('returns timing for all mount phases', function () {
            $lifecycle = app(LifecycleManager::class);
            $component = new Counter();

            $timings = $lifecycle->benchmarkMount($component);

            expect($timings)->toBeArray();
            expect($timings)->toHaveKeys(['boot', 'mount', 'forms', 'render', 'snapshot', 'total']);

            // All values should be non-negative integers (microseconds)
            foreach ($timings as $phase => $us) {
                expect($us)->toBeInt()->toBeGreaterThanOrEqual(0);
            }
        });
    });

    describe('benchmarkUpdate()', function () {
        it('returns timing for all update phases', function () {
            $lifecycle = app(LifecycleManager::class);
            $synthRegistry = app(SynthesizerRegistry::class);

            // First mount
            $component = new Counter();
            $lifecycle->mount($component);

            $componentName = $component->getName();
            $rawState = $component->getState();
            $dehydratedState = $synthRegistry->dehydrateState($rawState);
            $checksum = StateChecksum::generate($componentName, $dehydratedState);

            $memo = [
                'name' => $componentName,
                'class' => encrypt(get_class($component)),
                'checksum' => $checksum,
            ];

            // Benchmark update
            $updateComponent = new Counter();
            $timings = $lifecycle->benchmarkUpdate(
                $updateComponent,
                $componentName,
                $dehydratedState,
                $memo,
                [],
                null,
                []
            );

            expect($timings)->toBeArray();
            expect($timings)->toHaveKeys([
                'boot', 'hydrate_state', 'baseline_render', 'apply_diffs',
                'distribute_memo', 'hydrate_hooks', 'method_call',
                'dehydrate', 'events_flush', 'build_snapshot',
                'render', 'collect_memo', 'total',
            ]);

            // All values should be non-negative integers (microseconds)
            foreach ($timings as $phase => $us) {
                expect($us)->toBeInt()->toBeGreaterThanOrEqual(0);
            }

            // Total should be >= sum of other phases (approximately)
            expect($timings['total'])->toBeGreaterThan(0);
        });

        it('returns timing with method call', function () {
            $lifecycle = app(LifecycleManager::class);
            $synthRegistry = app(SynthesizerRegistry::class);

            $component = new Counter();
            $lifecycle->mount($component);

            $componentName = $component->getName();
            $rawState = $component->getState();
            $dehydratedState = $synthRegistry->dehydrateState($rawState);
            $checksum = StateChecksum::generate($componentName, $dehydratedState);

            $memo = [
                'name' => $componentName,
                'class' => encrypt(get_class($component)),
                'checksum' => $checksum,
            ];

            $updateComponent = new Counter();
            $timings = $lifecycle->benchmarkUpdate(
                $updateComponent,
                $componentName,
                $dehydratedState,
                $memo,
                [],
                'increment',
                []
            );

            expect($timings)->toHaveKey('method_call');
            expect($timings['method_call'])->toBeGreaterThan(0);
        });
    });

    describe('inline benchmark in processUpdate()', function () {
        it('includes benchmark in response when config is active', function () {
            app()->detectEnvironment(fn () => 'local');
            config()->set('livue.benchmark_responses', true);

            $response = livue(Counter::class)
                ->call('increment')
                ->response();

            expect($response)->toHaveKey('benchmark');
            expect($response['benchmark'])->toBeArray();
            expect($response['benchmark'])->toHaveKeys([
                'boot', 'hydrate_state', 'baseline_render', 'apply_diffs',
                'distribute_memo', 'hydrate_hooks', 'method_call',
                'dehydrate', 'events_flush', 'build_snapshot',
                'render', 'collect_memo', 'total',
            ]);

            app()->detectEnvironment(fn () => 'testing');
            config()->set('livue.benchmark_responses', false);
        });

        it('does NOT include benchmark in response when config is off', function () {
            app()->detectEnvironment(fn () => 'local');
            config()->set('livue.benchmark_responses', false);

            $response = livue(Counter::class)
                ->call('increment')
                ->response();

            expect($response)->not->toHaveKey('benchmark');

            app()->detectEnvironment(fn () => 'testing');
        });
    });

    describe('BenchmarkCommand', function () {
        it('runs successfully with a valid component class', function () {
            $this->artisan('livue:benchmark', [
                'component' => Counter::class,
                '--iterations' => 3,
            ])->assertSuccessful();
        });

        it('runs with --method option', function () {
            $this->artisan('livue:benchmark', [
                'component' => Counter::class,
                '--iterations' => 3,
                '--method' => 'increment',
            ])->assertSuccessful();
        });

        it('outputs JSON format', function () {
            $this->artisan('livue:benchmark', [
                'component' => Counter::class,
                '--iterations' => 3,
                '--format' => 'json',
            ])->assertSuccessful();
        });

        it('fails with non-existent component', function () {
            $this->artisan('livue:benchmark', [
                'component' => 'App\\LiVue\\NonExistentComponent',
            ])->assertFailed();
        });

        it('runs with valid --context JSON', function () {
            $this->artisan('livue:benchmark', [
                'component' => Counter::class,
                '--iterations' => 2,
                '--context' => '{"tenant_id": 1, "locale": "en"}',
            ])->assertSuccessful();
        });

        it('fails with invalid --context JSON', function () {
            $this->artisan('livue:benchmark', [
                'component' => Counter::class,
                '--context' => '{invalid json}',
            ])->assertFailed();
        });

        it('fails with non-existent --setup class', function () {
            $this->artisan('livue:benchmark', [
                'component' => Counter::class,
                '--setup' => 'App\\NonExistent\\SetupClass',
            ])->assertFailed();
        });

        it('fails when --setup class does not implement BenchmarkSetup', function () {
            $this->artisan('livue:benchmark', [
                'component' => Counter::class,
                '--setup' => Counter::class,
            ])->assertFailed();
        });

        it('calls setUp and tearDown on --setup class', function () {
            TestBenchmarkSetup::reset();

            $this->artisan('livue:benchmark', [
                'component' => Counter::class,
                '--iterations' => 2,
                '--setup' => TestBenchmarkSetup::class,
                '--context' => '{"tenant_id": 5}',
            ])->assertSuccessful();

            expect(TestBenchmarkSetup::$setUpCalled)->toBeTrue();
            expect(TestBenchmarkSetup::$tearDownCalled)->toBeTrue();
            expect(TestBenchmarkSetup::$receivedContext)->toBe(['tenant_id' => 5]);
        });

        it('dispatches BenchmarkStarting and BenchmarkFinished events', function () {
            Event::fake([BenchmarkStarting::class, BenchmarkFinished::class]);

            $this->artisan('livue:benchmark', [
                'component' => Counter::class,
                '--iterations' => 2,
                '--context' => '{"test": true}',
            ])->assertSuccessful();

            Event::assertDispatched(BenchmarkStarting::class, function ($event) {
                return $event->componentClass === Counter::class
                    && $event->context === ['test' => true]
                    && $event->iterations === 2;
            });

            Event::assertDispatched(BenchmarkFinished::class, function ($event) {
                return $event->componentClass === Counter::class
                    && $event->context === ['test' => true]
                    && count($event->mountResults) === 2
                    && count($event->updateResults) === 2;
            });
        });
    });
});
