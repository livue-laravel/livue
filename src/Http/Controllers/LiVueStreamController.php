<?php

namespace LiVue\Http\Controllers;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;
use LiVue\Exceptions\ComponentNotFoundException;
use LiVue\Features\SupportPersistentMiddleware\SupportPersistentMiddleware;
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
    ): StreamedResponse|JsonResponse {
        $validated = $request->validate([
            'snapshot' => 'required|string',
            'diffs' => 'nullable|array',
            'method' => 'required|string',
            'params' => 'nullable|array',
        ]);

        // Decode and validate snapshot
        $snapshot = json_decode($validated['snapshot'], true);

        if (! is_array($snapshot) || ! isset($snapshot['state'], $snapshot['memo'])) {
            return response()->json(['error' => 'Invalid snapshot format.'], 400);
        }

        $state = $snapshot['state'];
        $memo = $snapshot['memo'];
        $componentName = $memo['name'] ?? null;
        $checksum = $memo['checksum'] ?? null;
        $diffs = $validated['diffs'] ?? [];
        $method = $validated['method'];
        $params = $validated['params'] ?? [];

        if (! $componentName || ! $checksum) {
            return response()->json(['error' => 'Missing component name or checksum.'], 400);
        }

        // Verify state integrity
        if (! StateChecksum::verify($componentName, $state, $checksum)) {
            return response()->json(['error' => 'State integrity check failed.'], 403);
        }

        // Re-apply persistent middleware (auth, can, etc.) before processing
        try {
            SupportPersistentMiddleware::applyMiddleware($memo, request());
        } catch (AuthenticationException) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        } catch (AuthorizationException) {
            return response()->json(['error' => 'Unauthorized.'], 403);
        }

        // Resolve component: prefer encrypted class (new system), fallback to name (legacy)
        $encryptedClass = $memo['class'] ?? null;
        $componentClass = null;

        if ($encryptedClass) {
            try {
                $componentClass = decrypt($encryptedClass);
            } catch (\Illuminate\Contracts\Encryption\DecryptException) {
                // Invalid encrypted class, fall through to name-based resolution
            }
        }

        if ($componentClass && class_exists($componentClass)) {
            try {
                $component = $manager->resolveByClass($componentClass);
            } catch (ComponentNotFoundException) {
                return response()->json(['error' => 'Component not found.'], 404);
            }
        } elseif ($manager->componentExists($componentName)) {
            $component = $manager->resolve($componentName);
        } else {
            return response()->json(['error' => 'Component not found.'], 404);
        }

        // Preserve component instance ID across requests
        $snapshotId = $memo['id'] ?? null;
        if (is_string($snapshotId) && $snapshotId !== '') {
            if (! preg_match('/^[A-Za-z0-9._:-]+$/', $snapshotId)) {
                return response()->json(['error' => 'Invalid component id.'], 400);
            }

            $component->setId($snapshotId);
        }

        // Check if component supports streaming
        if (! in_array(WithStreaming::class, class_uses_recursive($component))) {
            return response()->json(['error' => 'Component does not support streaming.'], 400);
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
                $result = $lifecycle->processUpdate(
                    $component,
                    $componentName,
                    $state,
                    $memo,
                    $diffs,
                    [['method' => $method, 'params' => $params]]
                );

                echo json_encode($result) . "\n";
                flush();
            } catch (ValidationException $e) {
                $error = $e->getMessage();
                echo json_encode(['error' => $error, 'errors' => $e->errors(), 'status' => 422]) . "\n";
                flush();
            } catch (\BadMethodCallException $e) {
                echo json_encode(['error' => $e->getMessage(), 'status' => 422]) . "\n";
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
}
