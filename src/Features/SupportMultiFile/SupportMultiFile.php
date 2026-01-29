<?php

namespace LiVue\Features\SupportMultiFile;

use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;

/**
 * Feature hook for Multi File Components.
 *
 * Detects MFC components and handles scoped CSS.
 */
class SupportMultiFile extends ComponentHook
{
    /**
     * Boot hook: detect MFC components and store metadata.
     */
    public function boot(Component $component, ComponentStore $store): void
    {
        if ($component instanceof MultiFileComponent) {
            $store->set('mfc', true);
            $store->set('mfcPath', $component->getSourcePath());

            // Check for scoped CSS
            if ($component->hasScopedCss()) {
                $store->set('scopedCss', $component->getScopedCss());
            }
        }
    }

    /**
     * Contribute MFC info and scoped CSS to memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $memo = [];

        // Include scoped CSS info if present
        // The CSS is already injected inline in the view, but we mark it in memo
        // for potential client-side handling
        if ($store->get('scopedCss')) {
            $memo['_hasScopedCss'] = true;
        }

        // Only include debug info in debug mode
        if (config('app.debug') && $store->get('mfc')) {
            $memo['_mfc'] = true;
        }

        return $memo;
    }
}
