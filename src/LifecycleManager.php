<?php

namespace LiVue;

use Illuminate\Database\Eloquent\Model;
use LiVue\Features\SupportHooks\HookRegistry;
use LiVue\Features\SupportRendering\ComponentRenderer;
use LiVue\Security\StateChecksum;
use LiVue\Synthesizers\SynthesizerRegistry;
use LiVue\Features\SupportFileUploads\TemporaryUploadedFile;
use LiVue\Features\SupportFragments\SupportFragments;

class LifecycleManager
{
    /**
     * Lifecycle hook names that cannot be called from the client,
     * even when defined on the user's component class.
     */
    private const LIFECYCLE_HOOKS = [
        'boot',
        'mount',
        'hydrate',
        'dehydrate',
        'updating',
        'updated',
        'rendering',
        'rendered',
    ];

    /**
     * Utility method names that must not be callable from the client,
     * even if somehow registered as macros.
     */
    private const UTILITY_METHODS = [
        'macro',
        'mixin',
        'hasMacro',
        'flushMacros',
        'use',
        'getGlobalComposables',
        'flushGlobalComposables',
    ];

    public function __construct(
        protected EventBus $eventBus,
        protected HookRegistry $hookRegistry,
        protected SynthesizerRegistry $synthRegistry
    ) {}

    // -----------------------------------------------------------------
    //  Initial render lifecycle (mount)
    // -----------------------------------------------------------------

    /**
     * Boot and mount a component for initial rendering.
     * Called by LiVueManager::renderComponent() and LiVuePageController.
     */
    public function mount(Component $component, array $params = []): void
    {
        // Lifecycle event: booting (halting)
        if ($component->fireLifecycleEvent('booting', halt: true) === false) {
            return;
        }

        $this->hookRegistry->callHook('boot', $component);
        $this->callBoot($component);

        // Lifecycle event: booted
        $component->fireLifecycleEvent('booted');

        // Lifecycle event: mounting (halting)
        if ($component->fireLifecycleEvent('mounting', halt: true) === false) {
            return;
        }

        $this->hookRegistry->callHook('mount', $component, $params);
        $this->eventBus->dispatch('component.mount', $component, $params);

        // Call trait mount methods (mount{TraitName})
        foreach (class_uses_recursive($component) as $trait) {
            $method = 'mount' . class_basename($trait);

            if (method_exists($component, $method)) {
                $component->{$method}(...$params);
            }
        }

        if (method_exists($component, 'mount')) {
            $component->mount(...$params);
        }

        // Initialize Form objects with component reference
        $component->initializeForms();

        // Lifecycle event: mounted
        $component->fireLifecycleEvent('mounted');
    }

    // -----------------------------------------------------------------
    //  AJAX update lifecycle (full processUpdate flow)
    // -----------------------------------------------------------------

    /**
     * Process a single component update from an AJAX request.
     * This is the full lifecycle pipeline.
     *
     * The state in the snapshot is the server-confirmed state (matching the checksum).
     * Client-side changes (v-model) arrive as separate diffs and are applied after
     * checksum verification.
     *
     * @param  Component    $component
     * @param  string       $componentName
     * @param  array        $state         The server-confirmed snapshot state (matches checksum)
     * @param  array        $memo          The full snapshot memo (name, checksum, errors, listeners)
     * @param  array        $diffs         Client-side property changes (v-model) to apply after verification
     * @param  string|null  $method
     * @param  array        $params
     * @return array
     */
    public function processUpdate(
        Component $component,
        string $componentName,
        array $state,
        array $memo,
        array $diffs,
        ?string $method,
        array $params
    ): array {
        $bench = app()->environment('local') && config('livue.benchmark_responses', false);
        $benchTimings = [];
        $benchTotal = $bench ? hrtime(true) : 0;

        $store = $this->hookRegistry->store($component);

        // 1. Boot
        if ($bench) {
            $benchT = hrtime(true);
        }
        if ($component->fireLifecycleEvent('booting', halt: true) === false) {
            $this->hookRegistry->cleanup($component);

            return ['snapshot' => json_encode(['state' => [], 'memo' => $memo])];
        }

        $this->hookRegistry->callHook('boot', $component);
        $this->callBoot($component);

        $component->fireLifecycleEvent('booted');
        if ($bench) {
            $benchTimings['boot'] = (int) ((hrtime(true) - $benchT) / 1000);
        }

        // 1b. Restore #[Guarded] (locked) properties from encrypted memo.
        //     These are decrypted and merged back into state before hydration.
        if ($bench) {
            $benchT = hrtime(true);
        }
        $lockedValues = $this->restoreLockedProperties($memo);
        if (! empty($lockedValues)) {
            $state = array_merge($state, $lockedValues);
        }

        // 2. Strip computed properties from incoming state (they'll be recomputed).
        $computedKeys = $memo['computed'] ?? [];

        foreach ($computedKeys as $computedKey) {
            unset($state[$computedKey]);
        }

        // Hydrate state from inline tuples [value, {s: '...', ...}].
        //    hydrateState detects tuples, reconstructs PHP objects, and returns
        //    the types map for later diff processing.
        [$hydratedState, $types] = $this->synthRegistry->hydrateState($state);

        // Also extract flat (unwrapped) values for model diff comparison
        [$flatSnapshotState, $_] = $this->synthRegistry->unwrapState($state);

        $component->setState($hydratedState);

        // Initialize Form objects with component reference
        $component->initializeForms();
        if ($bench) {
            $benchTimings['hydrate_state'] = (int) ((hrtime(true) - $benchT) / 1000);
        }

        // 3. Distribute memo to features (e.g., restore validation errors, tenancy context)
        //    This must happen before htmlBefore so features that set up rendering context
        //    (like URL::defaults for multi-tenancy) are active during the first render.
        if ($bench) {
            $benchT = hrtime(true);
        }
        $this->hookRegistry->distributeMemo($component, $memo);
        if ($bench) {
            $benchTimings['distribute_memo'] = (int) ((hrtime(true) - $benchT) / 1000);
        }

        // 2a. Snapshot baseline HTML BEFORE applying diffs.
        //     This ensures we detect changes from diffs (tab sync) not just methods.
        if ($bench) {
            $benchT = hrtime(true);
        }
        $renderer = new ComponentRenderer();
        $htmlBefore = $renderer->renderInnerHtml($component);
        if ($bench) {
            $benchTimings['baseline_render'] = (int) ((hrtime(true) - $benchT) / 1000);
        }

        // 2b. Apply client-side diffs (v-model changes) on top of verified state.
        //     Model properties are handled specially: changed attributes are
        //     applied via fill() on the already-hydrated model instance.
        //     #[Guarded] properties are excluded from public state (locked), so they
        //     cannot be present in diffs — any attempt would fail checksum verification.
        //     Upload references (__livue_upload) are hydrated to TemporaryUploadedFile first.
        if ($bench) {
            $benchT = hrtime(true);
        }
        if (! empty($diffs)) {
            // Hydrate encrypted upload references into TemporaryUploadedFile instances
            $this->processUploadDiffs($diffs, $componentName);

            $remainingDiffs = $this->processSynthDiffs($diffs, $types, $flatSnapshotState, $component);

            if (! empty($remainingDiffs)) {
                $component->setState($remainingDiffs, fromClient: true);
            }

            // Re-initialize Form objects after diffs
            $component->initializeForms();
        }
        if ($bench) {
            $benchTimings['apply_diffs'] = (int) ((hrtime(true) - $benchT) / 1000);
        }

        // 4. Lifecycle: hydrate
        if ($bench) {
            $benchT = hrtime(true);
        }
        $component->fireLifecycleEvent('hydrating', halt: true);

        $this->hookRegistry->callHook('hydrate', $component);
        $this->callHydrate($component);

        $component->fireLifecycleEvent('hydrated');
        if ($bench) {
            $benchTimings['hydrate_hooks'] = (int) ((hrtime(true) - $benchT) / 1000);
        }

        // 5. Execute method (if any)
        if ($bench) {
            $benchT = hrtime(true);
        }
        $methodReturnValue = null;

        if ($method !== null) {
            // Lifecycle event: calling (halting — can skip the call)
            $callingCancelled = $component->fireLifecycleEvent('calling', true, $method, $params) === false;

            if (! $callingCancelled) {
                try {
                    $this->hookRegistry->callHook('call', $component, $method, $params);

                    // Check if a composable action handled the call (e.g., 'auth.logout')
                    $store = $this->hookRegistry->store($component);
                    if (! $store->get('composableActionHandled', false)) {
                        $methodReturnValue = $this->callMethod($component, $method, $params);
                    } else {
                        // Retrieve return value from composable action (if any)
                        $methodReturnValue = $store->get('composableActionReturnValue');
                    }

                    // Lifecycle event: called
                    $component->fireLifecycleEvent('called', false, $method, $params);
                } catch (\Throwable $e) {
                    // Lifecycle event: exception
                    $component->fireLifecycleEvent('exception', false, $e);

                    $handled = $this->hookRegistry->callExceptionHook($component, $e);

                    if ($handled === null) {
                        throw $e;
                    }
                }
            }

            // Clear computed cache so values are recomputed with post-method state
            $component->clearComputedCache();
        }
        if ($bench) {
            $benchTimings['method_call'] = (int) ((hrtime(true) - $benchT) / 1000);
        }

        // 7. Check for redirect intent — short-circuit if present
        $redirect = $component->getRedirect();
        if ($redirect !== null) {
            $rawState = $component->getState();
            $dehydratedState = $this->synthRegistry->dehydrateState($rawState);

            // Extract #[Guarded] properties and encrypt them
            [$dehydratedState, $lockedMemo] = $this->extractLockedProperties($component, $dehydratedState);

            $redirectComputed = $component->getComputedValues();
            if (! empty($redirectComputed)) {
                $dehydratedState = array_merge($dehydratedState, $this->synthRegistry->dehydrateState($redirectComputed));
            }

            $newChecksum = StateChecksum::generate($componentName, $dehydratedState);
            $newMemo = [
                'name' => $componentName,
                'class' => $memo['class'] ?? encrypt(get_class($component)),
                'checksum' => $newChecksum,
            ];

            if (! empty($lockedMemo)) {
                $newMemo['locked'] = $lockedMemo;
            }

            if (! empty($redirectComputed)) {
                $newMemo['computed'] = array_keys($redirectComputed);
            }

            // Collect memo contributions from hooks so feature data (e.g., tenant ID)
            // is preserved in the snapshot for subsequent AJAX requests.
            $featureMemo = $this->hookRegistry->collectMemo($component);
            $newMemo = array_merge($newMemo, $featureMemo);

            $this->hookRegistry->cleanup($component);

            return [
                'snapshot' => json_encode(['state' => $dehydratedState, 'memo' => $newMemo]),
                'redirect' => $redirect,
            ];
        }

        // 7b. Check for download intent — short-circuit (like redirect).
        //     The modal closes via Vue reactivity (mountedAction state update in snapshot).
        $download = $component->getDownload();
        if ($download !== null) {
            $rawState = $component->getState();
            $dehydratedState = $this->synthRegistry->dehydrateState($rawState);

            [$dehydratedState, $lockedMemo] = $this->extractLockedProperties($component, $dehydratedState);

            $downloadComputed = $component->getComputedValues();
            if (! empty($downloadComputed)) {
                $dehydratedState = array_merge($dehydratedState, $this->synthRegistry->dehydrateState($downloadComputed));
            }

            $newChecksum = StateChecksum::generate($componentName, $dehydratedState);
            $newMemo = [
                'name' => $componentName,
                'class' => $memo['class'] ?? encrypt(get_class($component)),
                'checksum' => $newChecksum,
            ];

            if (! empty($lockedMemo)) {
                $newMemo['locked'] = $lockedMemo;
            }

            if (! empty($downloadComputed)) {
                $newMemo['computed'] = array_keys($downloadComputed);
            }

            $downloadToken = encrypt(array_merge($download, [
                'expires' => now()->addMinutes(5)->timestamp,
            ]));

            // Collect memo from hooks (tenant ID, etc.)
            $featureMemo = $this->hookRegistry->collectMemo($component);
            $newMemo = array_merge($newMemo, $featureMemo);

            $this->hookRegistry->cleanup($component);

            return [
                'snapshot' => json_encode(['state' => $dehydratedState, 'memo' => $newMemo]),
                'download' => ['token' => $downloadToken, 'name' => $download['name']],
            ];
        }

        // 8. Lifecycle: dehydrate (features may dispatch events here, e.g., #[Modelable])
        if ($bench) {
            $benchT = hrtime(true);
        }
        $component->fireLifecycleEvent('dehydrating', halt: true);

        $this->hookRegistry->callHook('dehydrate', $component);
        $this->callDehydrate($component);

        $component->fireLifecycleEvent('dehydrated');
        if ($bench) {
            $benchTimings['dehydrate'] = (int) ((hrtime(true) - $benchT) / 1000);
        }

        // 9. Flush dispatched events (AFTER dehydrate so feature events are included)
        if ($bench) {
            $benchT = hrtime(true);
        }
        $events = $component->flushDispatchedEvents();
        foreach ($events as &$event) {
            $event['source'] = $componentName;
        }
        unset($event);
        if ($bench) {
            $benchTimings['events_flush'] = (int) ((hrtime(true) - $benchT) / 1000);
        }

        // 10. Build new snapshot: dehydrate complex types as inline tuples, then checksum.
        //     The snapshot is returned as an opaque JSON string.
        if ($bench) {
            $benchT = hrtime(true);
        }
        $rawState = $component->getState();
        $dehydratedState = $this->synthRegistry->dehydrateState($rawState);

        // Extract #[Guarded] properties and encrypt them
        [$dehydratedState, $lockedMemo] = $this->extractLockedProperties($component, $dehydratedState);

        // Add recomputed values from #[Computed] methods
        $computed = $component->getComputedValues();
        $newComputedKeys = array_keys($computed);

        if (! empty($computed)) {
            $dehydratedComputed = $this->synthRegistry->dehydrateState($computed);
            $dehydratedState = array_merge($dehydratedState, $dehydratedComputed);
        }

        $newChecksum = StateChecksum::generate($componentName, $dehydratedState);
        if ($bench) {
            $benchTimings['build_snapshot'] = (int) ((hrtime(true) - $benchT) / 1000);
        }

        $newMemo = [
            'name' => $componentName,
            'class' => $memo['class'] ?? encrypt(get_class($component)),
            'checksum' => $newChecksum,
        ];

        if (! empty($lockedMemo)) {
            $newMemo['locked'] = $lockedMemo;
        }

        if (! empty($newComputedKeys)) {
            $newMemo['computed'] = $newComputedKeys;
        }

        $listeners = $component->getListeners();
        if (! empty($listeners)) {
            $newMemo['listeners'] = $listeners;
        }

        // Include #[Vue] methods in memo for client-side execution
        $vueMethods = $component->getVueMethods();
        if (! empty($vueMethods)) {
            $newMemo['vueMethods'] = $vueMethods;
        }

        // 11. Render (unless renderless or json)
        if ($bench) {
            $benchT = hrtime(true);
        }
        $htmlAfter = null;

        if (! $store->get('renderless', false)) {
            $component->fireLifecycleEvent('rendering', halt: true);

            $this->eventBus->dispatch('component.render', $component);
            $htmlAfter = $renderer->renderInnerHtml($component);

            $component->fireLifecycleEvent('rendered');
        }

        // 11a. Post-render hook: allows features to update state based on
        //      data created during render (e.g., composables with paginators).
        $this->hookRegistry->callHook('rendered', $component);
        if ($bench) {
            $benchTimings['render'] = (int) ((hrtime(true) - $benchT) / 1000);
        }

        // 11b. Collect memo contributions from features AFTER render + rendered hook.
        //      This ensures features like composables have access to render-time data.
        if ($bench) {
            $benchT = hrtime(true);
        }
        $featureMemo = $this->hookRegistry->collectMemo($component);
        $newMemo = array_merge($newMemo, $featureMemo);
        if ($bench) {
            $benchTimings['collect_memo'] = (int) ((hrtime(true) - $benchT) / 1000);
            $benchTimings['total'] = (int) ((hrtime(true) - $benchTotal) / 1000);
        }

        $result = [
            'snapshot' => json_encode(['state' => $dehydratedState, 'memo' => $newMemo]),
        ];

        if ($htmlAfter !== null && $htmlAfter !== $htmlBefore) {
            $fragmentNames = $store->get('fragmentNames');

            if ($fragmentNames) {
                $fragments = SupportFragments::extractFragments($htmlAfter, $fragmentNames);

                if (! empty($fragments)) {
                    $result['fragments'] = $fragments;
                } else {
                    $result['html'] = $htmlAfter; // fallback: markers not found
                }
            } else {
                $result['html'] = $htmlAfter;
            }
        }

        // 11b. Include return value if method returned something
        if ($methodReturnValue !== null) {
            $result['jsonResult'] = $methodReturnValue;
        }

        if (! empty($events)) {
            $result['events'] = $events;
        }

        // 11b. Include pending JavaScript from ->vue() calls
        $pendingJs = $component->flushJs();
        if (! empty($pendingJs)) {
            $result['js'] = $pendingJs;
        }

        if ($bench) {
            $result['benchmark'] = $benchTimings;
        }

        // 12. Cleanup per-component feature instances and store
        $this->hookRegistry->cleanup($component);

        return $result;
    }

    // -----------------------------------------------------------------
    //  Benchmarking
    // -----------------------------------------------------------------

    /**
     * Benchmark the mount lifecycle, returning per-phase timings in microseconds.
     *
     * @param  Component  $component
     * @param  array      $params
     * @return array<string, int>  Phase name => microseconds
     */
    public function benchmarkMount(Component $component, array $params = []): array
    {
        $total = hrtime(true);
        $timings = [];

        // Boot
        $t = hrtime(true);
        if ($component->fireLifecycleEvent('booting', halt: true) === false) {
            return ['boot' => (int) ((hrtime(true) - $t) / 1000)];
        }
        $this->hookRegistry->callHook('boot', $component);
        $this->callBoot($component);
        $component->fireLifecycleEvent('booted');
        $timings['boot'] = (int) ((hrtime(true) - $t) / 1000);

        // Mount
        $t = hrtime(true);
        if ($component->fireLifecycleEvent('mounting', halt: true) !== false) {
            $this->hookRegistry->callHook('mount', $component, $params);
            $this->eventBus->dispatch('component.mount', $component, $params);

            foreach (class_uses_recursive($component) as $trait) {
                $method = 'mount' . class_basename($trait);
                if (method_exists($component, $method)) {
                    $component->{$method}(...$params);
                }
            }

            if (method_exists($component, 'mount')) {
                $component->mount(...$params);
            }
        }
        $component->fireLifecycleEvent('mounted');
        $timings['mount'] = (int) ((hrtime(true) - $t) / 1000);

        // Forms
        $t = hrtime(true);
        $component->initializeForms();
        $timings['forms'] = (int) ((hrtime(true) - $t) / 1000);

        // Render
        $t = hrtime(true);
        $renderer = new ComponentRenderer();
        $renderer->render($component);
        $timings['render'] = (int) ((hrtime(true) - $t) / 1000);

        // Snapshot (dehydrate + checksum)
        $t = hrtime(true);
        $rawState = $component->getState();
        $dehydratedState = $this->synthRegistry->dehydrateState($rawState);
        [$dehydratedState, $lockedMemo] = $this->extractLockedProperties($component, $dehydratedState);
        $computed = $component->getComputedValues();
        if (! empty($computed)) {
            $dehydratedState = array_merge($dehydratedState, $this->synthRegistry->dehydrateState($computed));
        }
        StateChecksum::generate($component->getName(), $dehydratedState);
        $timings['snapshot'] = (int) ((hrtime(true) - $t) / 1000);

        $timings['total'] = (int) ((hrtime(true) - $total) / 1000);

        return $timings;
    }

    /**
     * Benchmark the update lifecycle, returning per-phase timings in microseconds.
     *
     * @param  Component    $component
     * @param  string       $componentName
     * @param  array        $state
     * @param  array        $memo
     * @param  array        $diffs
     * @param  string|null  $method
     * @param  array        $params
     * @return array<string, int>  Phase name => microseconds
     */
    public function benchmarkUpdate(
        Component $component,
        string $componentName,
        array $state,
        array $memo,
        array $diffs,
        ?string $method,
        array $params
    ): array {
        $timings = [];
        $total = hrtime(true);

        // Boot
        $t = hrtime(true);
        $store = $this->hookRegistry->store($component);
        if ($component->fireLifecycleEvent('booting', halt: true) === false) {
            $this->hookRegistry->cleanup($component);
            return ['boot' => (int) ((hrtime(true) - $t) / 1000)];
        }
        $this->hookRegistry->callHook('boot', $component);
        $this->callBoot($component);
        $component->fireLifecycleEvent('booted');
        $timings['boot'] = (int) ((hrtime(true) - $t) / 1000);

        // Hydrate state
        $t = hrtime(true);
        $lockedValues = $this->restoreLockedProperties($memo);
        if (! empty($lockedValues)) {
            $state = array_merge($state, $lockedValues);
        }
        $computedKeys = $memo['computed'] ?? [];
        foreach ($computedKeys as $computedKey) {
            unset($state[$computedKey]);
        }
        [$hydratedState, $types] = $this->synthRegistry->hydrateState($state);
        [$flatSnapshotState, $_] = $this->synthRegistry->unwrapState($state);
        $component->setState($hydratedState);
        $component->initializeForms();
        $timings['hydrate_state'] = (int) ((hrtime(true) - $t) / 1000);

        // Baseline render
        $t = hrtime(true);
        $renderer = new ComponentRenderer();
        $htmlBefore = $renderer->renderInnerHtml($component);
        $timings['baseline_render'] = (int) ((hrtime(true) - $t) / 1000);

        // Apply diffs
        $t = hrtime(true);
        if (! empty($diffs)) {
            $this->processUploadDiffs($diffs, $componentName);
            $remainingDiffs = $this->processSynthDiffs($diffs, $types, $flatSnapshotState, $component);
            if (! empty($remainingDiffs)) {
                $component->setState($remainingDiffs, fromClient: true);
            }
            $component->initializeForms();
        }
        $timings['apply_diffs'] = (int) ((hrtime(true) - $t) / 1000);

        // Distribute memo
        $t = hrtime(true);
        $this->hookRegistry->distributeMemo($component, $memo);
        $timings['distribute_memo'] = (int) ((hrtime(true) - $t) / 1000);

        // Hydrate hooks
        $t = hrtime(true);
        $component->fireLifecycleEvent('hydrating', halt: true);
        $this->hookRegistry->callHook('hydrate', $component);
        $this->callHydrate($component);
        $component->fireLifecycleEvent('hydrated');
        $timings['hydrate_hooks'] = (int) ((hrtime(true) - $t) / 1000);

        // Method call
        $t = hrtime(true);
        if ($method !== null) {
            $callingCancelled = $component->fireLifecycleEvent('calling', true, $method, $params) === false;
            if (! $callingCancelled) {
                try {
                    $this->hookRegistry->callHook('call', $component, $method, $params);
                    $store = $this->hookRegistry->store($component);
                    if (! $store->get('composableActionHandled', false)) {
                        $this->callMethod($component, $method, $params);
                    }
                    $component->fireLifecycleEvent('called', false, $method, $params);
                } catch (\Throwable $e) {
                    $component->fireLifecycleEvent('exception', false, $e);
                    $handled = $this->hookRegistry->callExceptionHook($component, $e);
                    if ($handled === null) {
                        throw $e;
                    }
                }
            }
            $component->clearComputedCache();
        }
        $timings['method_call'] = (int) ((hrtime(true) - $t) / 1000);

        // Dehydrate
        $t = hrtime(true);
        $component->fireLifecycleEvent('dehydrating', halt: true);
        $this->hookRegistry->callHook('dehydrate', $component);
        $this->callDehydrate($component);
        $component->fireLifecycleEvent('dehydrated');
        $timings['dehydrate'] = (int) ((hrtime(true) - $t) / 1000);

        // Events flush
        $t = hrtime(true);
        $component->flushDispatchedEvents();
        $timings['events_flush'] = (int) ((hrtime(true) - $t) / 1000);

        // Build snapshot
        $t = hrtime(true);
        $rawState = $component->getState();
        $dehydratedState = $this->synthRegistry->dehydrateState($rawState);
        [$dehydratedState, $lockedMemo] = $this->extractLockedProperties($component, $dehydratedState);
        $computed = $component->getComputedValues();
        if (! empty($computed)) {
            $dehydratedComputed = $this->synthRegistry->dehydrateState($computed);
            $dehydratedState = array_merge($dehydratedState, $dehydratedComputed);
        }
        StateChecksum::generate($componentName, $dehydratedState);
        $timings['build_snapshot'] = (int) ((hrtime(true) - $t) / 1000);

        // Render
        $t = hrtime(true);
        if (! $store->get('renderless', false)) {
            $component->fireLifecycleEvent('rendering', halt: true);
            $this->eventBus->dispatch('component.render', $component);
            $renderer->renderInnerHtml($component);
            $component->fireLifecycleEvent('rendered');
        }
        $this->hookRegistry->callHook('rendered', $component);
        $timings['render'] = (int) ((hrtime(true) - $t) / 1000);

        // Collect memo
        $t = hrtime(true);
        $this->hookRegistry->collectMemo($component);
        $timings['collect_memo'] = (int) ((hrtime(true) - $t) / 1000);

        $timings['total'] = (int) ((hrtime(true) - $total) / 1000);

        $this->hookRegistry->cleanup($component);

        return $timings;
    }

    // -----------------------------------------------------------------
    //  Synthesizer diff processing
    // -----------------------------------------------------------------

    /**
     * Process diffs with synthesizer awareness.
     *
     * For model properties, changed attributes (compared against the original
     * dehydrated snapshot state) are applied via fill() directly on the
     * already-hydrated model instance. This respects the model's $fillable.
     *
     * Non-model synthesized types (Carbon, Enum, Collection) are hydrated
     * and set directly on the component.
     *
     * Returns remaining non-synthesized diffs for standard setState().
     */
    private function processSynthDiffs(array $diffs, array $types, array $snapshotState, Component $component): array
    {
        $remainingDiffs = [];

        foreach ($diffs as $key => $diffValue) {
            if (! isset($types[$key])) {
                $remainingDiffs[$key] = $diffValue;
                continue;
            }

            $synthKey = $types[$key]['s'];

            if ($synthKey === 'mdl') {
                // Model: apply only changed attributes via fill()
                $originalDehydrated = $snapshotState[$key] ?? [];

                if (is_array($diffValue) && is_array($originalDehydrated) && isset($component->{$key}) && $component->{$key} instanceof Model) {
                    $changed = [];

                    foreach ($diffValue as $attr => $val) {
                        if (! array_key_exists($attr, $originalDehydrated) || json_encode($originalDehydrated[$attr]) !== json_encode($val)) {
                            $changed[$attr] = $val;
                        }
                    }

                    if (! empty($changed)) {
                        $component->{$key}->fill($changed);
                    }
                }
            } else {
                // Other synthesized types (Carbon, Enum, Collection): hydrate and set
                $hydrated = $this->synthRegistry->hydrateValue($diffValue, $types[$key], $key);
                $component->{$key} = $hydrated;
            }
        }

        return $remainingDiffs;
    }

    // -----------------------------------------------------------------
    //  Upload diff processing
    // -----------------------------------------------------------------

    /**
     * Process upload references in diffs.
     *
     * Replaces { __livue_upload: true, ref: '...' } objects with
     * TemporaryUploadedFile instances by decrypting the encrypted reference.
     * Also handles arrays of upload references (multiple file upload) and
     * recursively searches nested objects for upload references.
     */
    protected function processUploadDiffs(array &$diffs, string $componentName, string $prefix = ''): void
    {
        foreach ($diffs as $key => &$value) {
            $fullPath = $prefix ? "{$prefix}.{$key}" : $key;

            if ($this->isUploadReference($value)) {
                $value = $this->hydrateUploadReference($value, $componentName, $fullPath);
            } elseif (is_array($value) && ! empty($value) && ! isset($value['__livue_upload'])) {
                // Check for array of upload references (multiple file upload)
                $allUploads = true;
                $hasNumericKeys = array_keys($value) === range(0, count($value) - 1);

                if ($hasNumericKeys) {
                    foreach ($value as $item) {
                        if (! $this->isUploadReference($item)) {
                            $allUploads = false;
                            break;
                        }
                    }

                    if ($allUploads) {
                        foreach ($value as $i => &$item) {
                            $item = $this->hydrateUploadReference($item, $componentName, $fullPath);
                        }
                        unset($item);
                        continue;
                    }
                }

                // Recursively process nested associative arrays
                $this->processUploadDiffs($value, $componentName, $fullPath);
            }
        }
        unset($value);
    }

    protected function isUploadReference(mixed $value): bool
    {
        return is_array($value)
            && ($value['__livue_upload'] ?? false) === true
            && isset($value['ref']);
    }

    protected function hydrateUploadReference(array $value, string $componentName, string $property): TemporaryUploadedFile
    {
        $ref = decrypt($value['ref']);

        if (($ref['component'] ?? '') !== $componentName || ($ref['property'] ?? '') !== $property) {
            throw new \RuntimeException(
                "Upload reference mismatch for [{$property}] on component [{$componentName}]."
            );
        }

        if (($ref['expires'] ?? 0) < now()->timestamp) {
            throw new \RuntimeException(
                "Upload reference expired for [{$property}] on component [{$componentName}]."
            );
        }

        return new TemporaryUploadedFile(
            $ref['path'],
            $ref['originalName'],
            $ref['mimeType'],
            $ref['size'],
            $ref['disk']
        );
    }

    // -----------------------------------------------------------------
    //  Exception handling
    // -----------------------------------------------------------------

    /**
     * Notify EventBus listeners of a component exception.
     */
    public function handleException(Component $component, \Throwable $exception): mixed
    {
        return $this->eventBus->dispatch('component.exception', $component, $exception);
    }

    // -----------------------------------------------------------------
    //  Individual lifecycle steps
    // -----------------------------------------------------------------

    /**
     * Call boot on a component. Boot runs on every instantiation.
     * Also calls boot{TraitName} methods from used traits (e.g., bootWithPagination).
     */
    protected function callBoot(Component $component): void
    {
        $this->eventBus->dispatch('component.boot', $component);

        // Call trait boot methods (boot{TraitName})
        foreach (class_uses_recursive($component) as $trait) {
            $method = 'boot' . class_basename($trait);

            if (method_exists($component, $method)) {
                $component->{$method}();
            }
        }

        if (method_exists($component, 'boot')) {
            $component->boot();
        }
    }

    /**
     * Call the hydrate lifecycle hook.
     * Also calls hydrate{TraitName} methods from used traits (e.g., hydrateHasForms).
     */
    protected function callHydrate(Component $component): void
    {
        $this->eventBus->dispatch('component.hydrate', $component);

        // Call trait hydrate methods (hydrate{TraitName})
        foreach (class_uses_recursive($component) as $trait) {
            $method = 'hydrate' . class_basename($trait);

            if (method_exists($component, $method)) {
                $component->{$method}();
            }
        }

        if (method_exists($component, 'hydrate')) {
            $component->hydrate();
        }
    }

    /**
     * Call a method on the component with security validation.
     *
     * Only methods declared on the user's concrete component class are callable.
     * Methods inherited from the base Component class, protected methods,
     * magic methods, and lifecycle hooks are automatically blocked.
     */
    protected function callMethod(Component $component, string $method, array $params): mixed
    {
        // Block magic methods
        if (str_starts_with($method, '__')) {
            throw new \BadMethodCallException("Method [{$method}] cannot be called from the client.");
        }

        // Block lifecycle hooks
        if (in_array($method, self::LIFECYCLE_HOOKS)) {
            throw new \BadMethodCallException("Method [{$method}] cannot be called from the client.");
        }

        // Real methods take precedence — full reflection security gates
        if (method_exists($component, $method)) {
            $reflection = new \ReflectionClass($component);
            $reflectionMethod = $reflection->getMethod($method);

            if (! $reflectionMethod->isPublic()) {
                throw new \BadMethodCallException("Method [{$method}] is not public on component [{$component->getName()}].");
            }

            // Block methods declared on the base Component class.
            // Only methods defined directly on the user's component are callable.
            if ($reflectionMethod->getDeclaringClass()->getName() === Component::class) {
                throw new \BadMethodCallException("Method [{$method}] cannot be called from the client.");
            }

            $this->eventBus->dispatch('component.call', $component, $method, $params);

            return $component->{$method}(...$params);
        }

        // Macros — dynamic methods registered via Component::macro()
        if ($component::hasMacro($method)) {
            if (in_array($method, self::UTILITY_METHODS)) {
                throw new \BadMethodCallException("Method [{$method}] cannot be called from the client.");
            }

            $this->eventBus->dispatch('component.call', $component, $method, $params);

            return $component->{$method}(...$params);
        }

        throw new \BadMethodCallException("Method [{$method}] does not exist on component [{$component->getName()}].");
    }

    /**
     * Call the dehydrate lifecycle hook.
     */
    protected function callDehydrate(Component $component): void
    {
        $this->eventBus->dispatch('component.dehydrate', $component);

        if (method_exists($component, 'dehydrate')) {
            $component->dehydrate();
        }
    }

    // -----------------------------------------------------------------
    //  Locked (Guarded) property handling
    // -----------------------------------------------------------------

    /**
     * Restore #[Guarded] properties from encrypted memo value.
     *
     * @return array The decrypted locked property values
     */
    protected function restoreLockedProperties(array $memo): array
    {
        $locked = $memo['locked'] ?? null;

        if ($locked === null) {
            return [];
        }

        try {
            return decrypt($locked);
        } catch (\Throwable) {
            throw new \RuntimeException('Invalid or tampered locked properties.');
        }
    }

    /**
     * Extract #[Guarded] properties from state and encrypt them.
     *
     * @return array{0: array, 1: string|null} [filteredState, encryptedLocked]
     */
    protected function extractLockedProperties(Component $component, array $dehydratedState): array
    {
        $guardedProps = $component->getGuardedProperties();

        if (empty($guardedProps)) {
            return [$dehydratedState, null];
        }

        $lockedValues = [];

        foreach ($guardedProps as $prop) {
            if (array_key_exists($prop, $dehydratedState)) {
                $lockedValues[$prop] = $dehydratedState[$prop];
                unset($dehydratedState[$prop]);
            }
        }

        if (empty($lockedValues)) {
            return [$dehydratedState, null];
        }

        return [$dehydratedState, encrypt($lockedValues)];
    }
}
