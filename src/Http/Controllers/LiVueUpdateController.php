<?php

namespace LiVue\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;
use LiVue\Features\SupportPersistentMiddleware\SupportPersistentMiddleware;
use LiVue\Features\SupportRendering\ComponentRenderer;
use LiVue\LifecycleManager;
use LiVue\LiVueManager;
use LiVue\Security\StateChecksum;

class LiVueUpdateController extends Controller
{
    public function __invoke(
        Request $request,
        LiVueManager $manager,
        LifecycleManager $lifecycle
    ): JsonResponse {
        $validated = $request->validate([
            'updates' => 'nullable|array|max:20',
            'updates.*.snapshot' => 'required|string',
            'updates.*.diffs' => 'nullable|array',
            'updates.*.method' => 'nullable|string',
            'updates.*.params' => 'nullable|array',
            'lazyLoads' => 'nullable|array|max:20',
            'lazyLoads.*.component' => 'required|string',
            'lazyLoads.*.props' => 'nullable|array',
        ]);

        $responses = [];
        $lazyResponses = [];

        // Process component updates
        $updates = $validated['updates'] ?? [];
        foreach ($updates as $update) {
            $responses[] = $this->processUpdate($update, $manager, $lifecycle);
        }

        // Process lazy load requests
        $lazyLoads = $validated['lazyLoads'] ?? [];
        foreach ($lazyLoads as $lazyLoad) {
            $lazyResponses[] = $this->processLazyLoad($lazyLoad, $manager, $lifecycle);
        }

        $result = ['responses' => $responses];

        if (! empty($lazyResponses)) {
            $result['lazyResponses'] = $lazyResponses;
        }

        return response()->json($result);
    }

    /**
     * Process a single component update within the batch.
     * Errors are captured per-component so one failure does not break others.
     */
    protected function processUpdate(
        array $update,
        LiVueManager $manager,
        LifecycleManager $lifecycle
    ): array {
        // Decode the opaque snapshot string
        $snapshot = json_decode($update['snapshot'], true);

        if (! is_array($snapshot) || ! isset($snapshot['state'], $snapshot['memo'])) {
            return ['error' => 'Invalid snapshot format.', 'status' => 400];
        }

        $state = $snapshot['state'];
        $memo = $snapshot['memo'];
        $componentName = $memo['name'] ?? null;
        $checksum = $memo['checksum'] ?? null;
        $diffs = $update['diffs'] ?? [];
        $method = $update['method'] ?? null;
        $params = $update['params'] ?? [];

        if (! $componentName || ! $checksum) {
            return ['error' => 'Missing component name or checksum.', 'status' => 400];
        }

        // Verify state integrity (checksum covers state including inline tuples)
        if (! StateChecksum::verify($componentName, $state, $checksum)) {
            return [
                'error' => 'State integrity check failed.',
                'status' => 403,
            ];
        }

        // Re-apply persistent middleware (auth, can, etc.) before processing
        // This protects against permission changes after page load
        try {
            SupportPersistentMiddleware::applyMiddleware($memo, request());
        } catch (AuthenticationException $e) {
            return ['error' => 'Unauthenticated.', 'status' => 401];
        } catch (AuthorizationException $e) {
            return ['error' => 'Unauthorized.', 'status' => 403];
        }

        // Resolve component: prefer encrypted class (new system), fallback to name (legacy)
        $encryptedClass = $memo['class'] ?? null;
        $componentClass = null;

        if ($encryptedClass) {
            try {
                $componentClass = decrypt($encryptedClass);
            } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
                // Invalid encrypted class, fall through to name-based resolution
            }
        }

        if ($componentClass && class_exists($componentClass)) {
            // New system: resolve by decrypted class
            try {
                $component = $manager->resolveByClass($componentClass);
            } catch (\InvalidArgumentException $e) {
                return ['error' => 'Component not found.', 'status' => 404];
            }
        } elseif ($manager->componentExists($componentName)) {
            // Legacy fallback: resolve by name
            $component = $manager->resolve($componentName);
        } else {
            return ['error' => 'Component not found.', 'status' => 404];
        }

        try {
            // Delegate entire lifecycle to LifecycleManager
            return $lifecycle->processUpdate(
                $component,
                $componentName,
                $state,
                $memo,
                $diffs,
                $method,
                $params
            );
        } catch (ValidationException $e) {
            return ['errors' => $e->errors(), 'status' => 422];
        } catch (\BadMethodCallException $e) {
            return ['error' => $e->getMessage(), 'status' => 422];
        } catch (\Throwable $e) {
            if (isset($component)) {
                $lifecycle->handleException($component, $e);
            }

            $error = config('app.debug')
                ? $e->getMessage()
                : 'Server error.';

            return ['error' => $error, 'status' => 500];
        }
    }

    /**
     * Process a lazy load request within the batch.
     * Creates and mounts a new component, returning HTML and snapshot.
     */
    protected function processLazyLoad(
        array $lazyLoad,
        LiVueManager $manager,
        LifecycleManager $lifecycle
    ): array {
        $componentName = $lazyLoad['component'];
        $props = $lazyLoad['props'] ?? [];
        $memo = $lazyLoad['memo'] ?? [];

        // Re-apply persistent middleware for lazy loads too
        try {
            SupportPersistentMiddleware::applyMiddleware($memo, request());
        } catch (AuthenticationException $e) {
            return ['error' => 'Unauthenticated.', 'status' => 401];
        } catch (AuthorizationException $e) {
            return ['error' => 'Unauthorized.', 'status' => 403];
        }

        if (! $manager->componentExists($componentName)) {
            return ['error' => 'Component not found.', 'status' => 404];
        }

        try {
            $component = $manager->resolve($componentName);
            $lifecycle->mount($component, $props);

            $renderer = app(ComponentRenderer::class);
            $html = $renderer->renderInnerHtml($component);
            $snapshot = $renderer->buildSnapshot($component);

            return [
                'html' => $html,
                'snapshot' => $snapshot,
            ];
        } catch (\Throwable $e) {
            $error = config('app.debug')
                ? $e->getMessage()
                : 'Server error.';

            return ['error' => $error, 'status' => 500];
        }
    }
}
