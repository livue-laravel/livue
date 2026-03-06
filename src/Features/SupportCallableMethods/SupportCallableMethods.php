<?php

namespace LiVue\Features\SupportCallableMethods;

use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;

/**
 * Expose client-callable component method names in snapshot memo.
 *
 * The JS runtime uses this whitelist to avoid treating undefined template
 * identifiers as server method proxies.
 */
class SupportCallableMethods extends ComponentHook
{
    /**
     * Add callable method names to memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        return ['methods' => $component->getClientCallableMethods()];
    }
}
