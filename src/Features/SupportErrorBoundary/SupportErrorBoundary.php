<?php

namespace LiVue\Features\SupportErrorBoundary;

use LiVue\Attributes\ErrorBoundary;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use Illuminate\Support\Facades\Log;
use ReflectionClass;
use ReflectionMethod;
use Throwable;

/**
 * Feature hook for error boundary support.
 *
 * Provides structured error handling for components:
 * - Catches errors during method execution
 * - Calls handleError() if defined on the component
 * - Logs errors if configured
 * - Can render fallback views on error
 * - Sends error state to client for UI feedback
 */
class SupportErrorBoundary extends ComponentHook
{
    /**
     * Cache for error boundary configuration by class name.
     */
    private static array $configCache = [];

    /**
     * Contribute error boundary config to snapshot memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $config = $this->getErrorBoundaryConfig($component);

        if (empty($config)) {
            return [];
        }

        // Only send relevant config to client
        return [
            'errorBoundary' => [
                'enabled' => true,
                'recover' => $config['recover'],
                'fallback' => $config['fallback'],
                'showDetails' => $config['showDetails'] && config('app.debug', false),
            ],
        ];
    }

    /**
     * Get the error boundary configuration for a component.
     *
     * Checks for #[ErrorBoundary] on the class level.
     */
    public function getErrorBoundaryConfig(Component $component): array
    {
        $className = get_class($component);

        if (isset(self::$configCache[$className])) {
            return self::$configCache[$className];
        }

        $reflection = new ReflectionClass($component);
        $attrs = $reflection->getAttributes(ErrorBoundary::class);

        if (empty($attrs)) {
            return self::$configCache[$className] = [];
        }

        $instance = $attrs[0]->newInstance();

        return self::$configCache[$className] = [
            'fallback' => $instance->fallback,
            'recover' => $instance->recover,
            'log' => $instance->log,
            'message' => $instance->message,
            'showDetails' => $instance->showDetails,
        ];
    }

    /**
     * Get error boundary configuration for a specific method.
     *
     * Method-level #[ErrorBoundary] overrides class-level.
     */
    public function getMethodErrorConfig(Component $component, string $method): ?array
    {
        try {
            $reflection = new ReflectionMethod($component, $method);
            $attrs = $reflection->getAttributes(ErrorBoundary::class);

            if (empty($attrs)) {
                return null;
            }

            $instance = $attrs[0]->newInstance();

            return [
                'fallback' => $instance->fallback,
                'recover' => $instance->recover,
                'log' => $instance->log,
                'message' => $instance->message,
                'showDetails' => $instance->showDetails,
            ];
        } catch (Throwable) {
            return null;
        }
    }

    /**
     * Handle an error that occurred during component method execution.
     *
     * @param Component $component The component instance
     * @param Throwable $exception The caught exception
     * @param string|null $method The method that was being executed
     * @return array Error response data for the client
     */
    public function handleComponentError(
        Component $component,
        Throwable $exception,
        ?string $method = null
    ): array {
        // Get config (method-level overrides class-level)
        $config = $method
            ? ($this->getMethodErrorConfig($component, $method) ?? $this->getErrorBoundaryConfig($component))
            : $this->getErrorBoundaryConfig($component);

        // Default config if no attribute is present
        if (empty($config)) {
            $config = [
                'fallback' => null,
                'recover' => true,
                'log' => true,
                'message' => null,
                'showDetails' => true,
            ];
        }

        // Log the error if configured
        if ($config['log']) {
            Log::error('LiVue component error', [
                'component' => get_class($component),
                'method' => $method,
                'exception' => $exception->getMessage(),
                'trace' => $exception->getTraceAsString(),
            ]);
        }

        // Check if component has a handleError method
        $handled = false;
        $handlerResult = null;

        if (method_exists($component, 'handleError')) {
            try {
                $handlerResult = $component->handleError($exception, $method);
                $handled = true;
            } catch (Throwable $handlerException) {
                // Handler itself threw, log and continue
                Log::error('LiVue error handler failed', [
                    'component' => get_class($component),
                    'exception' => $handlerException->getMessage(),
                ]);
            }
        }

        // Build error response for client
        $errorMessage = $config['message'] ?? 'An error occurred';
        $showDetails = $config['showDetails'] && config('app.debug', false);

        return [
            'hasError' => true,
            'errorHandled' => $handled,
            'errorMessage' => $errorMessage,
            'errorDetails' => $showDetails ? $exception->getMessage() : null,
            'errorMethod' => $method,
            'recover' => $config['recover'],
            'fallback' => $config['fallback'],
            'handlerResult' => $handlerResult,
        ];
    }

    /**
     * Check if a component has error boundary enabled.
     */
    public function hasErrorBoundary(Component $component): bool
    {
        return !empty($this->getErrorBoundaryConfig($component));
    }
}
