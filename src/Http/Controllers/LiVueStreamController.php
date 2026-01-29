<?php

namespace LiVue\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use LiVue\Features\SupportRendering\ComponentRenderer;
use LiVue\Features\SupportStreaming\WithStreaming;
use LiVue\LifecycleManager;
use LiVue\LiVueManager;
use LiVue\Security\StateChecksum;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Handle streaming requests for LiVue components.
 *
 * This controller uses HTTP streaming (StreamedResponse) to send
 * real-time updates to the client during long-running operations.
 *
 * Format: NDJSON (newline-delimited JSON)
 * - Stream chunks: {"stream":{"to":"id","content":"...","replace":false}}
 * - Final response: {"snapshot":"...","html":"...","events":[]}
 */
class LiVueStreamController extends Controller
{
    public function __invoke(
        Request $request,
        LiVueManager $manager,
        LifecycleManager $lifecycle
    ): StreamedResponse {
        $validated = $request->validate([
            'snapshot' => 'required|string',
            'diffs' => 'nullable|array',
            'method' => 'required|string',
            'params' => 'nullable|array',
        ]);

        // Decode and validate snapshot
        $snapshot = json_decode($validated['snapshot'], true);

        if (! is_array($snapshot) || ! isset($snapshot['state'], $snapshot['memo'])) {
            return $this->errorResponse('Invalid snapshot format.', 400);
        }

        $state = $snapshot['state'];
        $memo = $snapshot['memo'];
        $componentName = $memo['name'] ?? null;
        $checksum = $memo['checksum'] ?? null;
        $diffs = $validated['diffs'] ?? [];
        $method = $validated['method'];
        $params = $validated['params'] ?? [];

        if (! $componentName || ! $checksum) {
            return $this->errorResponse('Missing component name or checksum.', 400);
        }

        // Verify state integrity
        if (! StateChecksum::verify($componentName, $state, $checksum)) {
            return $this->errorResponse('State integrity check failed.', 403);
        }

        if (! $manager->componentExists($componentName)) {
            return $this->errorResponse('Component not found.', 404);
        }

        $component = $manager->resolve($componentName);

        // Check if component supports streaming
        if (! in_array(WithStreaming::class, class_uses_recursive($component))) {
            return $this->errorResponse('Component does not support streaming.', 400);
        }

        return new StreamedResponse(function () use (
            $component,
            $componentName,
            $state,
            $memo,
            $diffs,
            $method,
            $params,
            $lifecycle
        ) {
            // Disable output buffering for real-time streaming
            while (ob_get_level() > 0) {
                ob_end_flush();
            }

            // Set up stream callback
            $component->enableStreaming(function (array $chunk) {
                echo json_encode(['stream' => $chunk]) . "\n";
                flush();
            });

            try {
                // Process the update with streaming enabled
                $result = $this->processStreamingUpdate(
                    $component,
                    $componentName,
                    $state,
                    $memo,
                    $diffs,
                    $method,
                    $params,
                    $lifecycle
                );

                // Send final response
                echo json_encode($result) . "\n";
                flush();
            } catch (\Throwable $e) {
                $error = config('app.debug') ? $e->getMessage() : 'Server error.';
                echo json_encode(['error' => $error, 'status' => 500]) . "\n";
                flush();
            } finally {
                $component->disableStreaming();
            }
        }, 200, [
            'Content-Type' => 'application/x-ndjson',
            'Cache-Control' => 'no-cache',
            'X-Accel-Buffering' => 'no', // Disable nginx buffering
        ]);
    }

    /**
     * Process a streaming update.
     * Similar to LifecycleManager::processUpdate but without the full lifecycle
     * (we skip HTML diff optimization and always return HTML).
     */
    protected function processStreamingUpdate(
        $component,
        string $componentName,
        array $state,
        array $memo,
        array $diffs,
        string $method,
        array $params,
        LifecycleManager $lifecycle
    ): array {
        // Use reflection to access protected methods on LifecycleManager
        // or duplicate minimal necessary logic here

        $hookRegistry = app(\LiVue\Features\SupportHooks\HookRegistry::class);
        $synthRegistry = app(\LiVue\Synthesizers\SynthesizerRegistry::class);
        $eventBus = app(\LiVue\EventBus::class);

        // Boot
        $hookRegistry->callHook('boot', $component);
        $eventBus->dispatch('component.boot', $component);

        if (method_exists($component, 'boot')) {
            $component->boot();
        }

        // Restore locked properties
        $locked = $memo['locked'] ?? null;
        if ($locked !== null) {
            try {
                $lockedValues = decrypt($locked);
                $state = array_merge($state, $lockedValues);
            } catch (\Throwable) {
                throw new \RuntimeException('Invalid or tampered locked properties.');
            }
        }

        // Strip computed properties
        $computedKeys = $memo['computed'] ?? [];
        foreach ($computedKeys as $computedKey) {
            unset($state[$computedKey]);
        }

        // Hydrate state
        [$hydratedState, $types] = $synthRegistry->hydrateState($state);
        $component->setState($hydratedState);

        // Apply diffs if any
        if (! empty($diffs)) {
            [$flatSnapshotState, $_] = $synthRegistry->unwrapState($state);

            foreach ($diffs as $key => $diffValue) {
                if (isset($types[$key]) && $types[$key]['s'] === 'mdl') {
                    // Model diff handling - simplified
                    continue;
                }

                if (isset($types[$key])) {
                    $hydrated = $synthRegistry->hydrateValue($diffValue, $types[$key], $key);
                    $component->{$key} = $hydrated;
                } else {
                    $component->{$key} = $diffValue;
                }
            }
        }

        // Distribute memo to features
        $hookRegistry->distributeMemo($component, $memo);

        // Hydrate hook
        $hookRegistry->callHook('hydrate', $component);
        $eventBus->dispatch('component.hydrate', $component);

        if (method_exists($component, 'hydrate')) {
            $component->hydrate();
        }

        // Execute method
        $hookRegistry->callHook('call', $component, $method, $params);
        $eventBus->dispatch('component.call', $component, $method, $params);
        $component->callMethod($method, $params);

        // Clear computed cache
        $component->clearComputedCache();

        // Check for redirect
        $redirect = $component->getRedirect();
        if ($redirect !== null) {
            return $this->buildFinalResponse($component, $componentName, $synthRegistry, $hookRegistry, [
                'redirect' => $redirect,
            ]);
        }

        // Dehydrate
        $hookRegistry->callHook('dehydrate', $component);
        $eventBus->dispatch('component.dehydrate', $component);

        if (method_exists($component, 'dehydrate')) {
            $component->dehydrate();
        }

        // Flush events
        $events = $component->flushDispatchedEvents();
        foreach ($events as &$event) {
            $event['source'] = $componentName;
        }
        unset($event);

        // Build final response with HTML
        $extras = [];

        if (! empty($events)) {
            $extras['events'] = $events;
        }

        $pendingJs = $component->flushJs();
        if (! empty($pendingJs)) {
            $extras['js'] = $pendingJs;
        }

        return $this->buildFinalResponse($component, $componentName, $synthRegistry, $hookRegistry, $extras, true);
    }

    /**
     * Build the final response with snapshot and optional HTML.
     */
    protected function buildFinalResponse(
        $component,
        string $componentName,
        $synthRegistry,
        $hookRegistry,
        array $extras = [],
        bool $includeHtml = false
    ): array {
        $rawState = $component->getState();
        $dehydratedState = $synthRegistry->dehydrateState($rawState);

        // Extract guarded properties
        $guardedProps = $component->getGuardedProperties();
        $lockedMemo = null;

        if (! empty($guardedProps)) {
            $lockedValues = [];

            foreach ($guardedProps as $prop) {
                if (array_key_exists($prop, $dehydratedState)) {
                    $lockedValues[$prop] = $dehydratedState[$prop];
                    unset($dehydratedState[$prop]);
                }
            }

            if (! empty($lockedValues)) {
                $lockedMemo = encrypt($lockedValues);
            }
        }

        // Add computed values
        $computed = $component->getComputedValues();
        $newComputedKeys = array_keys($computed);

        if (! empty($computed)) {
            $dehydratedComputed = $synthRegistry->dehydrateState($computed);
            $dehydratedState = array_merge($dehydratedState, $dehydratedComputed);
        }

        $newChecksum = \LiVue\Security\StateChecksum::generate($componentName, $dehydratedState);

        $newMemo = ['name' => $componentName, 'checksum' => $newChecksum];

        if ($lockedMemo !== null) {
            $newMemo['locked'] = $lockedMemo;
        }

        if (! empty($newComputedKeys)) {
            $newMemo['computed'] = $newComputedKeys;
        }

        $listeners = $component->getListeners();
        if (! empty($listeners)) {
            $newMemo['listeners'] = $listeners;
        }

        $vueMethods = $component->getVueMethods();
        if (! empty($vueMethods)) {
            $newMemo['vueMethods'] = $vueMethods;
        }

        // Collect feature memo
        $featureMemo = $hookRegistry->collectMemo($component);
        $newMemo = array_merge($newMemo, $featureMemo);

        $result = array_merge([
            'snapshot' => json_encode(['state' => $dehydratedState, 'memo' => $newMemo]),
        ], $extras);

        // Include HTML for streaming (always render after streaming completes)
        if ($includeHtml) {
            $renderer = app(ComponentRenderer::class);
            $result['html'] = $renderer->renderInnerHtml($component);
        }

        // Cleanup
        $hookRegistry->cleanup($component);

        return $result;
    }

    /**
     * Return an error as a streamed response.
     */
    protected function errorResponse(string $message, int $status): StreamedResponse
    {
        return new StreamedResponse(function () use ($message, $status) {
            echo json_encode(['error' => $message, 'status' => $status]) . "\n";
            flush();
        }, 200, [
            'Content-Type' => 'application/x-ndjson',
        ]);
    }
}
