<?php

namespace LiVue\Features\SupportRendering;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ViewErrorBag;
use LiVue\AssetManager;
use LiVue\Component;
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

        // Share $errors with Blade views so @error directives work
        $this->shareErrorsWithView($component);

        // Blade receives raw state (with PHP objects) + computed values for template rendering
        $viewData = array_merge($state, $computed);

        // Add slots to view data if provided
        if (isset($options['slots']) && is_array($options['slots'])) {
            $viewData['slots'] = $options['slots'];
            $viewData['slot'] = $options['slots']['default'] ?? '';
        }

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

        $html = $component->renderView($viewName, $viewData);

        // Call rendered() hook - allows post-processing HTML
        if (method_exists($component, 'rendered')) {
            $result = $component->rendered($viewName, $html);
            if (is_string($result)) {
                $html = $result;
            }
        }

        $componentName = $component->getName();
        $componentId = $component->id;
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

        // Inject scoped CSS for MFC components BEFORE the wrapper (outside Vue template)
        $styleTag = '';
        if ($component instanceof MultiFileComponent && $component->hasScopedCss()) {
            $scopedCss = $component->getScopedCss();
            $styleTag = "<style>{$scopedCss}</style>\n";
        }

        return <<<HTML
        {$styleTag}<div data-livue-id="{$componentId}" data-livue-snapshot="{$encodedSnapshot}"{$islandAttr}{$scopeAttr}{$refAttr}{$modelAttr}>
        {$html}
        </div>
        HTML;
    }

    /**
     * Render only the inner Blade template HTML (no wrapper div).
     * Used by the update controller to return morphable HTML.
     */
    public function renderInnerHtml(Component $component): string
    {
        $state = $component->getState();
        $computed = $component->getComputedValues();

        // Share $errors with Blade views so @error directives work
        $this->shareErrorsWithView($component);

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

        $html = $component->renderView($viewName, $viewData);

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
     */
    protected function shareErrorsWithView(Component $component): void
    {
        $viewErrorBag = new ViewErrorBag();
        $viewErrorBag->put('default', $component->getErrorBag());

        View::share('errors', $viewErrorBag);
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
