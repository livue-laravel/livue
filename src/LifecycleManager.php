<?php

namespace LiVue;

use Illuminate\Database\Eloquent\Model;
use LiVue\Features\SupportHooks\HookRegistry;
use LiVue\Features\SupportRendering\ComponentRenderer;
use LiVue\Security\StateChecksum;
use LiVue\Synthesizers\SynthesizerRegistry;
use LiVue\TemporaryUploadedFile;

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
        $this->hookRegistry->callHook('boot', $component);
        $this->callBoot($component);

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
        $store = $this->hookRegistry->store($component);

        // 1. Boot
        $this->hookRegistry->callHook('boot', $component);
        $this->callBoot($component);

        // 1b. Restore #[Guarded] (locked) properties from encrypted memo.
        //     These are decrypted and merged back into state before hydration.
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

        // 2a. Snapshot baseline HTML BEFORE applying diffs.
        //     This ensures we detect changes from diffs (tab sync) not just methods.
        $renderer = new ComponentRenderer();
        $htmlBefore = $renderer->renderInnerHtml($component);

        // 2b. Apply client-side diffs (v-model changes) on top of verified state.
        //     Model properties are handled specially: changed attributes are
        //     applied via fill() on the already-hydrated model instance.
        //     #[Guarded] properties are excluded from public state (locked), so they
        //     cannot be present in diffs — any attempt would fail checksum verification.
        //     Upload references (__livue_upload) are hydrated to TemporaryUploadedFile first.
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

        // 3. Distribute memo to features (e.g., restore validation errors)
        $this->hookRegistry->distributeMemo($component, $memo);

        // 4. Lifecycle: hydrate
        $this->hookRegistry->callHook('hydrate', $component);
        $this->callHydrate($component);

        // 5. Execute method (if any)
        $methodReturnValue = null;

        if ($method !== null) {
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
            } catch (\Throwable $e) {
                $handled = $this->hookRegistry->callExceptionHook($component, $e);

                if ($handled === null) {
                    throw $e;
                }
            }

            // Clear computed cache so values are recomputed with post-method state
            $component->clearComputedCache();
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

            $this->hookRegistry->cleanup($component);

            return [
                'snapshot' => json_encode(['state' => $dehydratedState, 'memo' => $newMemo]),
                'redirect' => $redirect,
            ];
        }

        // 7b. Check for download intent — short-circuit if present
        $download = $component->getDownload();
        if ($download !== null) {
            $rawState = $component->getState();
            $dehydratedState = $this->synthRegistry->dehydrateState($rawState);

            // Extract #[Guarded] properties and encrypt them
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

            // Create encrypted download token with expiry
            $downloadToken = encrypt(array_merge($download, [
                'expires' => now()->addMinutes(5)->timestamp,
            ]));

            $this->hookRegistry->cleanup($component);

            return [
                'snapshot' => json_encode(['state' => $dehydratedState, 'memo' => $newMemo]),
                'download' => [
                    'token' => $downloadToken,
                    'name' => $download['name'],
                ],
            ];
        }

        // 8. Lifecycle: dehydrate (features may dispatch events here, e.g., #[Modelable])
        $this->hookRegistry->callHook('dehydrate', $component);
        $this->callDehydrate($component);

        // 9. Flush dispatched events (AFTER dehydrate so feature events are included)
        $events = $component->flushDispatchedEvents();
        foreach ($events as &$event) {
            $event['source'] = $componentName;
        }
        unset($event);

        // 10. Build new snapshot: dehydrate complex types as inline tuples, then checksum.
        //     The snapshot is returned as an opaque JSON string.
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
        $htmlAfter = null;

        if (! $store->get('renderless', false)) {
            $this->eventBus->dispatch('component.render', $component);
            $htmlAfter = $renderer->renderInnerHtml($component);
        }

        // 11a. Post-render hook: allows features to update state based on
        //      data created during render (e.g., composables with paginators).
        $this->hookRegistry->callHook('rendered', $component);

        // 11b. Collect memo contributions from features AFTER render + rendered hook.
        //      This ensures features like composables have access to render-time data.
        $featureMemo = $this->hookRegistry->collectMemo($component);
        $newMemo = array_merge($newMemo, $featureMemo);

        $result = [
            'snapshot' => json_encode(['state' => $dehydratedState, 'memo' => $newMemo]),
        ];

        if ($htmlAfter !== null && $htmlAfter !== $htmlBefore) {
            $result['html'] = $htmlAfter;
        }

        // 11b. Include JSON result if method was a #[Json] endpoint
        if ($store->get('json', false) && $methodReturnValue !== null) {
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

        // 12. Cleanup per-component feature instances and store
        $this->hookRegistry->cleanup($component);

        return $result;
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

        if (! method_exists($component, $method)) {
            throw new \BadMethodCallException("Method [{$method}] does not exist on component [{$component->getName()}].");
        }

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
