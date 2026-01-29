<?php

namespace LiVue\Features\SupportStreaming;

/**
 * Add streaming support to a LiVue component.
 *
 * Use $this->stream() to send real-time content updates to the client
 * during long-running operations (AI responses, progress updates, etc.).
 *
 * The content is streamed to elements marked with v-stream="target-id".
 */
trait WithStreaming
{
    /**
     * Whether this component is currently in streaming mode.
     */
    private bool $__streaming = false;

    /**
     * Callback to write stream chunks.
     * Set by the streaming controller before method execution.
     *
     * @var callable|null
     */
    private $__streamCallback = null;

    /**
     * Stream content to a target element on the client.
     *
     * @param string $to      Target identifier (matches v-stream="to" on client)
     * @param mixed  $content Content to stream (string, HTML, etc.)
     * @param bool   $replace If true, replace target content; if false, append
     */
    public function stream(string $to, mixed $content, bool $replace = false): void
    {
        if (! $this->__streaming || $this->__streamCallback === null) {
            return;
        }

        ($this->__streamCallback)([
            'to' => $to,
            'content' => $content,
            'replace' => $replace,
        ]);
    }

    /**
     * Check if the component is in streaming mode.
     */
    public function isStreaming(): bool
    {
        return $this->__streaming;
    }

    /**
     * Enable streaming mode and set the output callback.
     * Called by the streaming controller.
     *
     * @internal
     */
    public function enableStreaming(callable $callback): void
    {
        $this->__streaming = true;
        $this->__streamCallback = $callback;
    }

    /**
     * Disable streaming mode.
     *
     * @internal
     */
    public function disableStreaming(): void
    {
        $this->__streaming = false;
        $this->__streamCallback = null;
    }
}
