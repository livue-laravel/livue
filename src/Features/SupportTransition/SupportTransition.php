<?php

namespace LiVue\Features\SupportTransition;

use LiVue\Attributes\Transition;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use ReflectionClass;

/**
 * View Transition support for component methods.
 *
 * When a method has #[Transition], this feature captures the transition
 * configuration and includes it in the response so the JS runtime can
 * apply the appropriate View Transition.
 */
class SupportTransition extends ComponentHook
{
    /**
     * Before method execution, check for #[Transition] attribute.
     */
    public function call(Component $component, ComponentStore $store, string $method, array $params): void
    {
        $reflection = new ReflectionClass($component);

        if (!$reflection->hasMethod($method)) {
            return;
        }

        $attrs = $reflection->getMethod($method)->getAttributes(Transition::class);

        if (empty($attrs)) {
            return;
        }

        /** @var Transition $transition */
        $transition = $attrs[0]->newInstance();

        if ($transition->skip) {
            $store->set('skipTransition', true);
        } elseif ($transition->type) {
            $store->set('transitionType', $transition->type);
        }
    }

    /**
     * Include transition config in the dehydrated memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $result = [];

        $transitionType = $store->get('transitionType');
        if ($transitionType) {
            $result['transitionType'] = $transitionType;
        }

        $skipTransition = $store->get('skipTransition');
        if ($skipTransition) {
            $result['skipTransition'] = true;
        }

        return $result;
    }
}
