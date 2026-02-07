<?php

namespace LiVue\Features\SupportBladeDirectives;

/**
 * Compiles <livue:*> tags into @livue() directive calls.
 *
 * This precompiler runs before standard Blade compilation, transforming
 * component tag syntax into LiVue directive calls that the existing
 * rendering system can handle.
 *
 * Supported syntax:
 *   <livue:counter />
 *   <livue:counter count="5" />
 *   <livue:counter :count="$initialCount" />
 *   <livue:counter ref="myRef" />
 *   <livue:counter active />
 *
 * With slots:
 *   <livue:card>
 *       <livue:slot:header>Header content</livue:slot:header>
 *       Default slot content
 *   </livue:card>
 */
class ComponentTagCompiler
{
    /**
     * Options that should be passed as the third argument to renderComponent.
     */
    protected array $optionAttributes = ['ref', 'model'];

    /**
     * Compile <livue:*> tags to renderComponent() calls.
     */
    public function compile(string $value): string
    {
        // First compile tags with content (opening/closing)
        $value = $this->compileOpeningClosingTags($value);

        // Then compile self-closing tags
        $value = $this->compileSelfClosingTags($value);

        return $value;
    }

    /**
     * Compile tags with opening and closing: <livue:name>...</livue:name>
     */
    protected function compileOpeningClosingTags(string $value): string
    {
        // Pattern to match opening tag, content, and closing tag
        // Uses a recursive pattern to handle nested livue components
        $pattern = '/
            <livue:(?<name>[\w\-\.]+)       # Opening tag with component name
            (?<attributes>                   # Attributes
                (?:
                    \s+
                    (?:
                        :?[\w\-:.]+
                        (?:
                            =
                            (?:
                                \"[^\"]*\"
                                |
                                \'[^\']*\'
                            )
                        )?
                    )
                )*
            )
            \s*
            >                                # End of opening tag (not self-closing)
            (?<content>                      # Content between tags
                (?:
                    (?!<livue:\1[\s>])       # Not another opening of same component
                    (?!<\/livue:\1>)         # Not the closing tag
                    .
                )*?
            )
            <\/livue:\1\s*>                  # Closing tag matching component name
        /xs';

        // Process from innermost to outermost to handle nesting
        $maxIterations = 10;
        $iteration = 0;

        while ($iteration < $maxIterations && preg_match($pattern, $value)) {
            $value = preg_replace_callback($pattern, function ($matches) {
                return $this->compileTagWithContent(
                    $matches['name'],
                    $matches['attributes'] ?? '',
                    $matches['content'] ?? ''
                );
            }, $value);
            $iteration++;
        }

        return $value;
    }

    /**
     * Compile a tag with content (slots) into a renderComponent() call.
     */
    protected function compileTagWithContent(string $name, string $attributeString, string $content): string
    {
        [$props, $options] = $this->parseAttributes(trim($attributeString));

        // Extract named slots from content
        [$slots, $defaultSlot] = $this->extractSlots($content);

        // Build the slots array for options
        if (! empty($defaultSlot) || ! empty($slots)) {
            $slotsPhp = $this->buildSlotsPhp($slots, $defaultSlot);
            $options['slots'] = $slotsPhp;
        }

        $propsPhp = $this->arrayToPhp($props);
        $optionsPhp = $this->arrayToPhpRaw($options);

        if (empty($props) && empty($options)) {
            return "<?php echo app(\\LiVue\\LiVueManager::class)->renderComponent('{$name}'); ?>";
        }

        if (empty($options)) {
            return "<?php echo app(\\LiVue\\LiVueManager::class)->renderComponent('{$name}', [{$propsPhp}]); ?>";
        }

        return "<?php echo app(\\LiVue\\LiVueManager::class)->renderComponent('{$name}', [{$propsPhp}], [{$optionsPhp}]); ?>";
    }

    /**
     * Extract named slots and default slot from content.
     *
     * @return array{0: array<string, string>, 1: string} [namedSlots, defaultSlot]
     */
    protected function extractSlots(string $content): array
    {
        $slots = [];

        // Pattern for named slots: <livue:slot:name>...</livue:slot:name>
        $slotPattern = '/<livue:slot:(?<name>[\w\-]+)\s*>(?<content>.*?)<\/livue:slot:\1\s*>/s';

        // Extract named slots
        $content = preg_replace_callback($slotPattern, function ($matches) use (&$slots) {
            $slots[$matches['name']] = trim($matches['content']);

            return ''; // Remove from content
        }, $content);

        // Remaining content is the default slot
        $defaultSlot = trim($content);

        return [$slots, $defaultSlot];
    }

    /**
     * Build PHP code for slots array.
     */
    protected function buildSlotsPhp(array $namedSlots, string $defaultSlot): string
    {
        $parts = [];

        if (! empty($defaultSlot)) {
            $escaped = $this->escapeSlotContent($defaultSlot);
            $parts[] = "'default' => <<<'LIVUE_SLOT'\n{$escaped}\nLIVUE_SLOT";
        }

        foreach ($namedSlots as $name => $content) {
            $escaped = $this->escapeSlotContent($content);
            $parts[] = "'{$name}' => <<<'LIVUE_SLOT'\n{$escaped}\nLIVUE_SLOT";
        }

        return '['.implode(', ', $parts).']';
    }

    /**
     * Escape slot content for use in HEREDOC.
     */
    protected function escapeSlotContent(string $content): string
    {
        // HEREDOC with LIVUE_SLOT delimiter - content is used as-is
        // Just make sure the delimiter doesn't appear in content
        return str_replace('LIVUE_SLOT', 'LIVUE__SLOT', $content);
    }

    /**
     * Compile self-closing <livue:name /> tags.
     */
    protected function compileSelfClosingTags(string $value): string
    {
        $pattern = '/
            <
            \s*
            livue:(?<name>[\w\-\.]+)    # Component name
            (?<attributes>
                (?:
                    \s+
                    (?:
                        :?[\w\-:.]+         # Attribute name (with optional : prefix)
                        (?:
                            =
                            (?:
                                \"[^\"]*\"  # Double-quoted value
                                |
                                \'[^\']*\'  # Single-quoted value
                            )
                        )?
                    )
                )*
            )
            \s*
            \/>                           # Self-closing tag only
        /x';

        return preg_replace_callback($pattern, function ($matches) {
            return $this->compileTag($matches['name'], $matches['attributes'] ?? '');
        }, $value);
    }

    /**
     * Compile a single self-closing tag into a renderComponent() call.
     */
    protected function compileTag(string $name, string $attributeString): string
    {
        [$props, $options] = $this->parseAttributes(trim($attributeString));

        $propsPhp = $this->arrayToPhp($props);
        $optionsPhp = $this->arrayToPhp($options);

        if (empty($props) && empty($options)) {
            return "<?php echo app(\\LiVue\\LiVueManager::class)->renderComponent('{$name}'); ?>";
        }

        if (empty($options)) {
            return "<?php echo app(\\LiVue\\LiVueManager::class)->renderComponent('{$name}', [{$propsPhp}]); ?>";
        }

        return "<?php echo app(\\LiVue\\LiVueManager::class)->renderComponent('{$name}', [{$propsPhp}], [{$optionsPhp}]); ?>";
    }

    /**
     * Parse attribute string into props and options arrays.
     *
     * @return array{0: array, 1: array} [props, options]
     */
    protected function parseAttributes(string $attributeString): array
    {
        $props = [];
        $options = [];

        if (empty($attributeString)) {
            return [$props, $options];
        }

        // Match attribute patterns: name="value", :name="value", or name (boolean)
        $pattern = '/
            (?<dynamic>:)?                      # Optional : prefix for dynamic binding
            (?<name>[\w\-:.]+)                  # Attribute name
            (?:
                =
                (?:
                    "(?<double>[^"]*)"          # Double-quoted value
                    |
                    \'(?<single>[^\']*)\'       # Single-quoted value
                )
            )?
        /x';

        preg_match_all($pattern, $attributeString, $matches, PREG_SET_ORDER);

        foreach ($matches as $match) {
            $name = $match['name'];
            $isDynamic = ! empty($match['dynamic']);
            $value = $match['double'] ?? $match['single'] ?? null;

            // Determine if this is an option or a prop
            $isOption = in_array($name, $this->optionAttributes);
            $targetArray = $isOption ? 'options' : 'props';

            if ($value === null) {
                // Boolean attribute: active => 'active' => true
                ${$targetArray}[$name] = 'true';
            } elseif ($isDynamic) {
                // Dynamic binding: :count="$val" => 'count' => $val
                ${$targetArray}[$name] = $value;
            } else {
                // Static string: count="5" => 'count' => '5'
                $escapedValue = addslashes($value);
                ${$targetArray}[$name] = "'{$escapedValue}'";
            }
        }

        return [$props, $options];
    }

    /**
     * Convert an associative array to PHP array syntax string (with quoted values).
     */
    protected function arrayToPhp(array $array): string
    {
        if (empty($array)) {
            return '';
        }

        $parts = [];

        foreach ($array as $key => $value) {
            $parts[] = "'{$key}' => {$value}";
        }

        return implode(', ', $parts);
    }

    /**
     * Convert an associative array to PHP array syntax string (raw values, no extra quoting).
     */
    protected function arrayToPhpRaw(array $array): string
    {
        if (empty($array)) {
            return '';
        }

        $parts = [];

        foreach ($array as $key => $value) {
            $parts[] = "'{$key}' => {$value}";
        }

        return implode(', ', $parts);
    }
}
