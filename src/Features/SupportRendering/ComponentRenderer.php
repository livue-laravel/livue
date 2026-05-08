<?php

namespace LiVue\Features\SupportRendering;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ViewErrorBag;
use LiVue\Component;
use LiVue\Exceptions\RootTagMissingFromViewException;
use LiVue\Features\SupportAssets\AssetManager;
use LiVue\Features\SupportHooks\HookRegistry;
use LiVue\Features\SupportMultiFile\MultiFileComponent;
use LiVue\Security\StateChecksum;
use LiVue\Synthesizers\SynthesizerRegistry;

class ComponentRenderer
{
    /**
     * View data from the last render (for testing).
     */
    protected array $lastViewData = [];

    /**
     * Get the view data from the last render.
     * Useful for testing with assertViewHas().
     */
    public function getLastViewData(): array
    {
        return $this->lastViewData;
    }

    /**
     * Render a LiVue component to HTML with the wrapper div and data attributes.
     *
     * @param  Component  $component  The component to render
     * @param  array      $options    Render options (e.g., ['ref' => 'myRef'])
     */
    public function render(Component $component, array $options = []): string
    {
        // Register component assets for @livueScripts / @livueStyles
        app(AssetManager::class)->registerFromComponent($component);

        $state = $component->getState();
        $computed = $component->getComputedValues();

        // Dehydrate complex types for JSON serialization.
        // Synthesized values become inline tuples [value, {s: '...', ...}] in the state.
        $registry = app(SynthesizerRegistry::class);
        $dehydratedState = $registry->dehydrateState($state);

        // Extract and encrypt #[Guarded] properties (Locked behavior)
        // These are removed from public state and stored encrypted in memo
        [$dehydratedState, $lockedMemo] = $this->extractLockedProperties($component, $dehydratedState);

        // Share $errors with Blade views so @error directives work.
        // Save a revert callback so nested @livue components don't overwrite our errors.
        $revertErrors = $this->shareErrorsWithView($component);

        // Blade receives raw state (with PHP objects) + computed values for template rendering
        $viewData = array_merge($state, $computed);

        // Add slots to view data if provided
        if (isset($options['slots']) && is_array($options['slots'])) {
            $viewData['slots'] = $options['slots'];
            $viewData['slot'] = $options['slots']['default'] ?? '';
        }

        // Provide $attributes (Illuminate ComponentAttributeBag) to the Blade view.
        //
        // When inheritsAttrs() is true (default), the bag is empty in the view
        // because the attributes are auto-applied to the root element below.
        // When false, the full bag is available so the developer can place it
        // explicitly with {{ $attributes }} or $attributes->merge([...]).
        $rawFallthroughAttrs = isset($options['attributes']) && is_array($options['attributes'])
            ? $options['attributes']
            : [];

        $viewData['attributes'] = new \Illuminate\View\ComponentAttributeBag(
            $component->inheritsAttrs() ? [] : $rawFallthroughAttrs
        );

        $viewName = $component->getView();

        // Call rendering() hook - allows modifying view data before render
        if (method_exists($component, 'rendering')) {
            $result = $component->rendering($viewName, $viewData);
            if (is_array($result)) {
                $viewData = $result;
            }
        }

        // Store view data for testing
        $this->lastViewData = $viewData;

        // Push to rendering stack so LiVueCompilerEngine can bind $this to this
        // component in ALL Blade templates (including anonymous components).
        RenderingStack::push($component);

        try {
            $html = $component->renderView($viewName, $viewData);
        } finally {
            RenderingStack::pop();
        }

        // Restore previous $errors so parent components keep their error bag
        $revertErrors();

        // Call rendered() hook - allows post-processing HTML
        if (method_exists($component, 'rendered')) {
            $result = $component->rendered($viewName, $html);
            if (is_string($result)) {
                $html = $result;
            }
        }

        // Call rendered() hook on features — allows features to update state
        // based on data created during render (e.g., composables with paginators).
        $hookRegistry = app(HookRegistry::class);
        $hookRegistry->callHook('rendered', $component);

        $componentName = $component->getName();
        $componentId = $component->getId();
        $checksum = StateChecksum::generate($componentName, $dehydratedState);
        $islandAttr = $component->isIsland() ? ' data-livue-island' : '';

        // Add scope attribute for MFC components with scoped CSS
        $scopeAttr = '';
        if ($component instanceof MultiFileComponent && $component->hasScopedCss()) {
            $scopeAttr = ' data-livue-scope-' . $component->getScopeId();
        }

        // Add ref attribute for parent-child communication
        $refAttr = '';
        if (isset($options['ref']) && is_string($options['ref'])) {
            $refAttr = ' data-livue-ref="' . e($options['ref']) . '"';
        }

        // Add model attribute for two-way parent-child binding (#[Modelable])
        $modelAttr = '';
        if (isset($options['model']) && is_string($options['model'])) {
            $modelAttr = ' data-livue-model="' . e($options['model']) . '"';
        }

        $memo = [
            'id' => $componentId,
            'name' => $componentName,
            'class' => encrypt(get_class($component)),
            'checksum' => $checksum,
        ];

        // Include locked (encrypted guarded values) in memo
        if (! empty($lockedMemo)) {
            $memo['locked'] = $lockedMemo;
        }

        $listeners = $component->getListeners();
        if (! empty($listeners)) {
            $memo['listeners'] = $listeners;
        }

        // Include validation errors in memo if present
        $errors = $component->getErrorBag()->toArray();
        if (! empty($errors)) {
            $memo['errors'] = $errors;
        }

        // Include #[Reactive] property names for parent→child sync
        $reactiveProps = $component->getReactiveProperties();
        if (! empty($reactiveProps)) {
            $memo['reactive'] = $reactiveProps;
        }

        // Mark isolated components in memo (#[Isolate])
        if ($component->isIsolated()) {
            $memo['isolate'] = true;
        }

        // Include #[Vue] methods JS code in memo for client-side execution
        $vueMethods = $component->getVueMethods();
        if (! empty($vueMethods)) {
            $memo['vueMethods'] = $vueMethods;
        }

        // Collect memo contributions from feature hooks (e.g., upload tokens, URL params)
        $hookRegistry = app(HookRegistry::class);
        $featureMemo = $hookRegistry->collectMemo($component);
        $memo = array_merge($memo, $featureMemo);

        // Add computed values to the snapshot state (read-only, for Vue access).
        // Computed values are dehydrated through synthesizers for JSON safety.
        if (! empty($computed)) {
            $dehydratedComputed = $registry->dehydrateState($computed);
            $dehydratedState = array_merge($dehydratedState, $dehydratedComputed);
            $memo['computed'] = array_keys($computed);

            // Recompute checksum to include computed values
            $checksum = StateChecksum::generate($componentName, $dehydratedState);
            $memo['checksum'] = $checksum;
        }

        // Snapshot uses dehydrated state (JSON-safe)
        $snapshot = ['state' => $dehydratedState, 'memo' => $memo];
        $encodedSnapshot = htmlspecialchars(json_encode($snapshot), ENT_QUOTES, 'UTF-8');

        // Inject scoped CSS for MFC components BEFORE the root tag (outside Vue template)
        $styleTag = '';
        if ($component instanceof MultiFileComponent && $component->hasScopedCss()) {
            $scopedCss = $component->getScopedCss();
            $styleTag = "<style>{$scopedCss}</style>\n";
        }

        // Build the LiVue-internal attributes string to inject into the root HTML tag
        $vCloak = $component->shouldCloak() ? 'v-cloak ' : '';
        $livueAttrs = $vCloak . 'data-livue-id="' . $componentId . '" data-livue-snapshot="' . $encodedSnapshot . '"';
        $livueAttrs .= $islandAttr . $scopeAttr . $refAttr . $modelAttr;

        // Resolve fallthrough HTML attributes (class, style, id, data-*, aria-*, ...)
        // passed at the usage site that don't match a component property.
        $fallthroughAttrs = isset($options['attributes']) && is_array($options['attributes'])
            ? $options['attributes']
            : [];

        $rootMergeAttrs = $component->inheritsAttrs() ? $fallthroughAttrs : [];

        $html = $this->insertAttributesIntoHtmlRoot($html, $livueAttrs, $componentName, $rootMergeAttrs);

        return $styleTag . $html;
    }

    /**
     * Render only the inner Blade template HTML (no wrapper div).
     * Used by the update controller to return morphable HTML.
     */
    public function renderInnerHtml(Component $component): string
    {
        $state = $component->getState();
        $computed = $component->getComputedValues();

        // Share $errors with Blade views so @error directives work.
        // Save a revert callback so nested @livue components don't overwrite our errors.
        $revertErrors = $this->shareErrorsWithView($component);

        $viewData = array_merge($state, $computed);
        $viewName = $component->getView();

        // Call rendering() hook - allows modifying view data before render
        if (method_exists($component, 'rendering')) {
            $result = $component->rendering($viewName, $viewData);
            if (is_array($result)) {
                $viewData = $result;
            }
        }

        // Store view data for testing
        $this->lastViewData = $viewData;

        // Push to rendering stack so LiVueCompilerEngine can bind $this to this
        // component in ALL Blade templates (including anonymous components).
        RenderingStack::push($component);

        try {
            $html = $component->renderView($viewName, $viewData);
            if (! is_string($html)) {
                throw new \RuntimeException(
                    'Component view "' . $viewName . '" did not return a string (got ' . gettype($html) . ')'
                );
            }
        } finally {
            RenderingStack::pop();
        }

        // Restore previous $errors so parent components keep their error bag
        $revertErrors();

        // Call rendered() hook - allows post-processing HTML
        if (method_exists($component, 'rendered')) {
            $result = $component->rendered($viewName, $html);
            if (is_string($result)) {
                $html = $result;
            }
        }

        return $html;
    }

    /**
     * Share the component's error bag with Blade views as $errors.
     *
     * Returns a revert callback that restores the previous $errors value.
     * This prevents nested component renders (e.g., @livue directives inside
     * the parent template) from overwriting the parent's errors with empty bags.
     *
     * @see https://github.com/livewire/livewire — same share-and-revert pattern
     */
    protected function shareErrorsWithView(Component $component): \Closure
    {
        $viewErrorBag = new ViewErrorBag();
        $viewErrorBag->put('default', $component->getErrorBag());

        $previous = View::shared('errors');

        View::share('errors', $viewErrorBag);

        return function () use ($previous) {
            if ($previous === null) {
                View::share('errors', new ViewErrorBag());
            } else {
                View::share('errors', $previous);
            }
        };
    }

    /**
     * Build the snapshot JSON string for a component.
     * Used by lazy loading and other features that need just the snapshot.
     */
    public function buildSnapshot(Component $component): string
    {
        $state = $component->getState();
        $computed = $component->getComputedValues();

        $registry = app(SynthesizerRegistry::class);
        $dehydratedState = $registry->dehydrateState($state);

        // Extract and encrypt #[Guarded] properties (Locked behavior)
        [$dehydratedState, $lockedMemo] = $this->extractLockedProperties($component, $dehydratedState);

        $componentClass = get_class($component);
        $componentName = $component->getName();
        $checksum = StateChecksum::generate($componentName, $dehydratedState);

        $memo = [
            'id' => $component->getId(),
            'name' => $componentName,
            'class' => encrypt($componentClass),
            'checksum' => $checksum,
        ];

        // Include locked (encrypted guarded values) in memo
        if (! empty($lockedMemo)) {
            $memo['locked'] = $lockedMemo;
        }

        $listeners = $component->getListeners();
        if (! empty($listeners)) {
            $memo['listeners'] = $listeners;
        }

        $errors = $component->getErrorBag()->toArray();
        if (! empty($errors)) {
            $memo['errors'] = $errors;
        }

        $reactiveProps = $component->getReactiveProperties();
        if (! empty($reactiveProps)) {
            $memo['reactive'] = $reactiveProps;
        }

        if ($component->isIsolated()) {
            $memo['isolate'] = true;
        }

        $vueMethods = $component->getVueMethods();
        if (! empty($vueMethods)) {
            $memo['vueMethods'] = $vueMethods;
        }

        $hookRegistry = app(HookRegistry::class);
        $featureMemo = $hookRegistry->collectMemo($component);
        $memo = array_merge($memo, $featureMemo);

        if (! empty($computed)) {
            $dehydratedComputed = $registry->dehydrateState($computed);
            $dehydratedState = array_merge($dehydratedState, $dehydratedComputed);
            $memo['computed'] = array_keys($computed);
            $checksum = StateChecksum::generate($componentName, $dehydratedState);
            $memo['checksum'] = $checksum;
        }

        $snapshot = ['state' => $dehydratedState, 'memo' => $memo];

        return json_encode($snapshot);
    }

    /**
     * Generate an HTML error placeholder for a render exception.
     *
     * In debug mode, shows the exception class, message, and stack trace.
     * In production, shows a generic error message.
     */
    public static function renderErrorHtml(\Throwable $e, string $componentName = ''): string
    {
        $label = $componentName !== '' ? htmlspecialchars($componentName) : 'Component';

        if (config('app.debug', false)) {
            $class   = htmlspecialchars(get_class($e));
            $message = htmlspecialchars($e->getMessage());
            $trace   = htmlspecialchars($e->getTraceAsString());

            return <<<HTML
<div data-livue-render-error style="border:2px solid #e53e3e;border-radius:6px;padding:16px;margin:8px 0;background:#fff5f5;font-family:monospace;font-size:13px;color:#742a2a;">
  <strong style="font-size:14px;">&#x26A0; LiVue Render Error</strong> &mdash; {$label}<br><br>
  <strong>{$class}:</strong> {$message}<br><br>
  <details><summary style="cursor:pointer;color:#c53030;">Stack trace</summary><pre style="margin-top:8px;overflow:auto;font-size:11px;">{$trace}</pre></details>
</div>
HTML;
        }

        return <<<HTML
<div data-livue-render-error style="border:2px solid #e53e3e;border-radius:6px;padding:16px;margin:8px 0;background:#fff5f5;font-family:sans-serif;color:#742a2a;">
  <strong>Something went wrong.</strong>
  <p style="margin:4px 0 0;">This component could not be rendered. Please try again or contact support.</p>
</div>
HTML;
    }

    /**
     * Insert attributes into the first HTML root tag of the template.
     *
     * Injects the LiVue-internal attribute string right after the tag name.
     * When $fallthroughAttrs is non-empty, also merges those attributes into
     * the existing attribute list of the root element (smart merge for
     * class/style; existing root values win for any other attribute).
     *
     * @param  string  $html              The component template HTML
     * @param  string  $attributeString   LiVue-internal attrs (e.g., 'v-cloak data-livue-id="..."')
     * @param  string  $componentName     The component name (for error messages)
     * @param  array   $fallthroughAttrs  Fallthrough HTML attributes to merge into root tag
     * @return string  The HTML with attributes injected
     *
     * @throws RootTagMissingFromViewException
     */
    protected function insertAttributesIntoHtmlRoot(
        string $html,
        string $attributeString,
        string $componentName = '',
        array $fallthroughAttrs = []
    ): string {
        // Find the first HTML tag in the output (skipping whitespace/newlines)
        if (! preg_match('/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/', $html, $matches, PREG_OFFSET_CAPTURE)) {
            throw new RootTagMissingFromViewException($componentName);
        }

        $tagName = $matches[1][0];
        $tagNameStart = $matches[1][1];
        $afterTagName = $tagNameStart + strlen($tagName);

        // If we have fallthrough attributes to merge, find the end of the opening
        // tag (first '>' not inside a quoted attribute value) and merge them into
        // the existing attribute string of the root element.
        if (! empty($fallthroughAttrs)) {
            $tagEnd = $this->findRootTagEnd($html, $afterTagName);

            if ($tagEnd !== -1) {
                $existingAttrs = substr($html, $afterTagName, $tagEnd - $afterTagName);

                // Self-closing slash at the end (e.g. " />") must stay outside
                // the merged attribute string.
                $trailingSlash = '';
                $stripped = rtrim($existingAttrs);
                if (str_ends_with($stripped, '/')) {
                    $trailingSlash = '/';
                    $existingAttrs = substr($stripped, 0, -1);
                }

                $merged = $this->mergeFallthroughAttributes($existingAttrs, $fallthroughAttrs);

                $rebuilt = ' ' . trim($merged);
                if ($trailingSlash !== '') {
                    $rebuilt .= ' ' . $trailingSlash;
                }

                $html = substr($html, 0, $afterTagName) . $rebuilt . substr($html, $tagEnd);
            }
        }

        // Re-find the position (the html may have changed length above).
        if (! preg_match('/(?:\n\s*|^\s*)<([a-zA-Z0-9\-]+)/', $html, $matches, PREG_OFFSET_CAPTURE)) {
            throw new RootTagMissingFromViewException($componentName);
        }

        $tagName = $matches[1][0];
        $tagNameStart = $matches[1][1];
        $insertPosition = $tagNameStart + strlen($tagName);

        return substr($html, 0, $insertPosition) . ' ' . $attributeString . substr($html, $insertPosition);
    }

    /**
     * Find the position of the closing '>' of the opening root tag, skipping
     * '>' characters inside quoted attribute values.
     *
     * @param  string  $html        The full rendered HTML
     * @param  int     $startAfter  Position just after the tag name (where attributes begin)
     * @return int     Position of the closing '>', or -1 if not found
     */
    protected function findRootTagEnd(string $html, int $startAfter): int
    {
        $len = strlen($html);
        $inQuote = null;

        for ($i = $startAfter; $i < $len; $i++) {
            $ch = $html[$i];

            if ($inQuote !== null) {
                if ($ch === $inQuote) {
                    $inQuote = null;
                }
                continue;
            }

            if ($ch === '"' || $ch === "'") {
                $inQuote = $ch;
                continue;
            }

            if ($ch === '>') {
                return $i;
            }
        }

        return -1;
    }

    /**
     * Merge fallthrough attributes into the existing attribute string of an HTML tag.
     *
     * Rules:
     *  - `class`: concatenated (existing class + ' ' + fallthrough class)
     *  - `style`: concatenated with ';' separator
     *  - other attributes: existing value wins; fallthrough is added only if absent
     *  - boolean true: emitted as name-only attribute
     *  - false / null values: skipped
     *
     * @param  string  $existingAttrs  Existing attribute substring of the root tag
     * @param  array   $fallthrough    Map of attribute name => value to merge in
     * @return string  Merged attribute substring
     */
    protected function mergeFallthroughAttributes(string $existingAttrs, array $fallthrough): string
    {
        $result = $existingAttrs;

        foreach ($fallthrough as $name => $value) {
            if (! is_string($name) || $name === '') {
                continue;
            }

            if ($value === false || $value === null) {
                continue;
            }

            $isBool = ($value === true);
            $stringValue = $isBool ? '' : (string) $value;
            $lowerName = strtolower($name);
            $isMergeable = ($lowerName === 'class' || $lowerName === 'style');

            $quotedPattern = '/(?<=^|\s)(' . preg_quote($name, '/') . ')\s*=\s*(["\'])(.*?)\2/i';
            $bareSpacePattern = '/(?<=^|\s)(' . preg_quote($name, '/') . ')(?=\s|$)/i';

            if (preg_match($quotedPattern, $result, $m, PREG_OFFSET_CAPTURE)) {
                if (! $isMergeable) {
                    // Existing value wins; skip the fallthrough.
                    continue;
                }

                $current = $m[3][0];
                $quote = $m[2][0];

                if ($lowerName === 'class') {
                    $merged = trim($current . ' ' . $stringValue);
                } else {
                    $current = rtrim($current);
                    $separator = ($current === '' || str_ends_with($current, ';')) ? '' : ';';
                    $merged = trim($current . $separator . $stringValue, " \t\n\r\0\x0B;");
                }

                $escaped = htmlspecialchars($merged, ENT_QUOTES);
                $replacement = $name . '=' . $quote . $escaped . $quote;
                $matchStart = $m[0][1];
                $matchLen = strlen($m[0][0]);
                $result = substr($result, 0, $matchStart) . $replacement . substr($result, $matchStart + $matchLen);
                continue;
            }

            if (preg_match($bareSpacePattern, $result)) {
                continue;
            }

            $prefix = ($result === '' || str_ends_with($result, ' ')) ? '' : ' ';

            if ($isBool) {
                $result .= $prefix . $name;
            } else {
                $escaped = htmlspecialchars($stringValue, ENT_QUOTES);
                $result .= $prefix . $name . '="' . $escaped . '"';
            }
        }

        return $result;
    }

    /**
     * Extract #[Guarded] properties from state and encrypt them.
     *
     * Returns a tuple of [filteredState, encryptedLockedValue].
     * The locked properties are removed from public state and encrypted
     * so the client cannot see or modify them.
     *
     * @return array{0: array, 1: string|null}
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

        // Encrypt the locked values so they can't be read or modified by the client
        $encrypted = encrypt($lockedValues);

        return [$dehydratedState, $encrypted];
    }
}
