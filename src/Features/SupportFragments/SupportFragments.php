<?php

namespace LiVue\Features\SupportFragments;

use LiVue\Attributes\Fragment;
use LiVue\Component;
use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;
use ReflectionClass;

/**
 * Fragment support for partial template updates.
 *
 * When a method annotated with #[Fragment('name')] is called, this feature
 * saves the fragment names in the component store. The LifecycleManager then
 * extracts only the matching sections from the rendered HTML and sends them
 * as a compact `fragments` response instead of the full `html`.
 */
class SupportFragments extends ComponentHook
{
    /**
     * Before method execution, check if the method has #[Fragment].
     * If so, collect all fragment names and store them.
     */
    public function call(Component $component, ComponentStore $store, string $method, array $params): void
    {
        $reflection = new ReflectionClass($component);

        if (! $reflection->hasMethod($method)) {
            return;
        }

        $attrs = $reflection->getMethod($method)->getAttributes(Fragment::class);

        if (empty($attrs)) {
            return;
        }

        $names = [];

        foreach ($attrs as $attr) {
            $instance = $attr->newInstance();
            $names = array_merge($names, $instance->names);
        }

        $store->set('fragmentNames', array_unique($names));
    }

    /**
     * Extract fragment sections from rendered HTML.
     *
     * Searches for markers <!--livue-fragment:name-->...<!--/livue-fragment:name-->
     * and returns the matching sections (including markers).
     *
     * @param  string  $html  The full rendered HTML
     * @param  array  $names  Fragment names to extract
     * @return array<string, string>  Map of fragment name => content with markers
     */
    public static function extractFragments(string $html, array $names): array
    {
        $fragments = [];

        foreach ($names as $name) {
            $startMarker = '<!--livue-fragment:' . $name . '-->';
            $endMarker = '<!--/livue-fragment:' . $name . '-->';

            $startPos = strpos($html, $startMarker);
            $endPos = strpos($html, $endMarker);

            if ($startPos === false || $endPos === false) {
                continue;
            }

            $fragments[$name] = substr($html, $startPos, $endPos + strlen($endMarker) - $startPos);
        }

        return $fragments;
    }
}
