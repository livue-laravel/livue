<?php

namespace LiVue\Attributes;

use Attribute;

/**
 * Configure error handling for a component or method.
 *
 * When applied to a class, configures error handling for all methods.
 * When applied to a method, configures error handling for that specific method.
 *
 * The component can define a handleError($exception, $method) method to
 * handle errors before they propagate to the client. This method can:
 * - Log the error
 * - Set a user-friendly message
 * - Recover and continue
 * - Re-throw to let the error propagate
 *
 * Usage:
 *   #[ErrorBoundary]
 *   class MyComponent extends Component
 *   {
 *       public function handleError(\Throwable $e, ?string $method): mixed
 *       {
 *           Log::error($e);
 *           $this->errorMessage = 'Something went wrong';
 *           return null; // Prevent error propagation
 *       }
 *   }
 *
 *   #[ErrorBoundary(fallback: 'error-fallback')]
 *   class MyComponent extends Component { }
 *
 *   #[ErrorBoundary(recover: true)]
 *   public function riskyMethod(): void { }
 */
#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD)]
class ErrorBoundary
{
    public function __construct(
        /**
         * Name of a fallback view to render on error.
         * If null, the component will render normally but with error state.
         */
        public ?string $fallback = null,

        /**
         * Whether to attempt recovery after an error.
         * If true, the component state is preserved and the component
         * continues to function after displaying the error.
         */
        public bool $recover = true,

        /**
         * Whether to log the error.
         * Defaults to true.
         */
        public bool $log = true,

        /**
         * Custom error message to display.
         * If null, uses a generic message.
         */
        public ?string $message = null,

        /**
         * Whether to show error details in development mode.
         * Defaults to true.
         */
        public bool $showDetails = true,
    ) {}
}
