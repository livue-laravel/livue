<?php

namespace LiVue\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LiVueRequestValidator
{
    /**
     * Validate the structure and basic security of a LiVue request.
     * All requests use the batch format: { updates: [...] }
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Ensure the request is JSON/AJAX
        if (! $request->expectsJson() && ! $request->ajax()) {
            return response()->json(['error' => 'Invalid request.'], 400);
        }

        $updates = $request->input('updates', []);
        $lazyLoads = $request->input('lazyLoads', []);

        // At least one of updates or lazyLoads must be present
        if (empty($updates) && empty($lazyLoads)) {
            return response()->json(['error' => 'Missing required fields.'], 400);
        }

        foreach ($updates as $index => $update) {
            $snapshotRaw = $update['snapshot'] ?? null;

            // Snapshot is an opaque JSON string
            if (! is_string($snapshotRaw)) {
                return response()->json([
                    'error' => 'Missing required fields in update at index ' . $index . '.',
                ], 400);
            }

            $snapshot = json_decode($snapshotRaw, true);

            if (! is_array($snapshot) || ! isset($snapshot['state']) || ! isset($snapshot['memo']['name'])) {
                return response()->json([
                    'error' => 'Invalid snapshot format in update at index ' . $index . '.',
                ], 400);
            }

            // Block component names that look like class traversal attempts
            if (preg_match('/[^a-zA-Z0-9\-_]/', $snapshot['memo']['name'])) {
                return response()->json([
                    'error' => 'Invalid component name in update at index ' . $index . '.',
                ], 400);
            }

            // Diffs must be an array if present
            if (isset($update['diffs']) && ! is_array($update['diffs'])) {
                return response()->json([
                    'error' => 'Invalid diffs in update at index ' . $index . '.',
                ], 400);
            }

            // Block methods starting with __ (magic methods)
            $method = $update['method'] ?? null;

            if ($method !== null && str_starts_with($method, '__')) {
                return response()->json([
                    'error' => 'Invalid method in update at index ' . $index . '.',
                ], 403);
            }
        }

        return $next($request);
    }
}
