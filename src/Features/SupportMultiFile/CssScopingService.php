<?php

namespace LiVue\Features\SupportMultiFile;

/**
 * Service for scoping CSS rules to a specific component.
 *
 * Adds a data attribute selector prefix to all CSS selectors,
 * ensuring styles only apply to elements within the component.
 */
class CssScopingService
{
    /**
     * Scope CSS rules by prefixing selectors with a component-specific attribute.
     *
     * Input:
     *   .counter { color: blue; }
     *   .btn { padding: 10px; }
     *
     * Output:
     *   [data-livue-scope-counter] .counter { color: blue; }
     *   [data-livue-scope-counter] .btn { padding: 10px; }
     */
    public function scope(string $css, string $componentName): string
    {
        $scopeAttr = "[data-livue-scope-{$componentName}]";

        // Process at-rules first
        $css = $this->processAtRules($css, $scopeAttr);

        // Process regular rules
        $css = $this->processRules($css, $scopeAttr);

        return $css;
    }

    /**
     * Process @media, @supports, and other at-rules.
     */
    protected function processAtRules(string $css, string $scopeAttr): string
    {
        // Match @media, @supports blocks
        $pattern = '/(@(?:media|supports)[^{]+)\{((?:[^{}]|\{[^{}]*\})*)\}/s';

        return preg_replace_callback($pattern, function ($matches) use ($scopeAttr) {
            $atRule = $matches[1];
            $content = $matches[2];

            // Process the content inside the at-rule
            $scopedContent = $this->processRules($content, $scopeAttr);

            return $atRule . '{' . $scopedContent . '}';
        }, $css);
    }

    /**
     * Process regular CSS rules (outside of at-rules).
     */
    protected function processRules(string $css, string $scopeAttr): string
    {
        // Skip @keyframes - they don't need scoping
        $css = preg_replace_callback(
            '/@keyframes\s+[^{]+\{(?:[^{}]|\{[^{}]*\})*\}/s',
            function ($match) {
                // Return keyframes unchanged but mark them to skip later processing
                return '/*KEYFRAME_START*/' . $match[0] . '/*KEYFRAME_END*/';
            },
            $css
        );

        // Match selector { declarations } patterns
        $pattern = '/([^{}@]+)\{([^{}]*)\}/s';

        $css = preg_replace_callback($pattern, function ($matches) use ($scopeAttr) {
            $selectors = $matches[1];
            $declarations = $matches[2];

            // Skip if this is inside a keyframe marker
            if (str_contains($selectors, 'KEYFRAME_START')) {
                return $matches[0];
            }

            // Scope each selector
            $scopedSelectors = $this->scopeSelectors($selectors, $scopeAttr);

            return $scopedSelectors . '{' . $declarations . '}';
        }, $css);

        // Remove keyframe markers
        $css = str_replace(['/*KEYFRAME_START*/', '/*KEYFRAME_END*/'], '', $css);

        return $css;
    }

    /**
     * Scope a comma-separated list of selectors.
     */
    protected function scopeSelectors(string $selectors, string $scopeAttr): string
    {
        $parts = array_map('trim', explode(',', $selectors));
        $scoped = [];

        foreach ($parts as $selector) {
            if (empty($selector)) {
                continue;
            }

            $scoped[] = $this->scopeSelector($selector, $scopeAttr);
        }

        return implode(', ', $scoped);
    }

    /**
     * Scope a single selector.
     */
    protected function scopeSelector(string $selector, string $scopeAttr): string
    {
        $selector = trim($selector);

        // Skip empty selectors
        if (empty($selector)) {
            return $selector;
        }

        // Handle special pseudo-selectors that shouldn't be prefixed
        // :root should become [scope]:root
        if (str_starts_with($selector, ':root')) {
            return $scopeAttr . $selector;
        }

        // For regular selectors, prepend the scope attribute
        // This handles: .class, #id, element, [attr], * etc.
        return $scopeAttr . ' ' . $selector;
    }

    /**
     * Generate the scope attribute value for a component.
     */
    public function getScopeAttribute(string $componentName): string
    {
        return "data-livue-scope-{$componentName}";
    }
}
