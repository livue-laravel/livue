<?php

namespace LiVue\Features\SupportMultiFile;

use LiVue\Component;

/**
 * Base class for Multi File Components.
 *
 * Compiled MFC classes extend this instead of Component directly.
 * This allows identification of MFC components and provides
 * access to the source directory and scoped CSS.
 */
abstract class MultiFileComponent extends Component
{
    /**
     * Path to the source directory.
     * Set by the compiler during class generation.
     */
    protected static string $sourcePath = '';

    /**
     * Compiled scoped CSS (null if no CSS file).
     * Set by the compiler during class generation.
     */
    protected static ?string $scopedCss = null;

    /**
     * The CSS scope identifier (kebab-case component name).
     * Used for the data-livue-scope-{name} attribute.
     */
    protected static string $scopeId = '';

    /**
     * Original component name (e.g., "mfc-test").
     * Used for resolution and stored in the snapshot memo.
     */
    protected static string $componentName = '';

    /**
     * Get the source directory path.
     */
    public function getSourcePath(): string
    {
        return static::$sourcePath;
    }

    /**
     * Get the component name (original, without hash suffix).
     */
    public function getName(): string
    {
        return static::$componentName;
    }

    /**
     * Get the scoped CSS if present.
     */
    public function getScopedCss(): ?string
    {
        return static::$scopedCss;
    }

    /**
     * Check if this component has scoped CSS.
     */
    public function hasScopedCss(): bool
    {
        return static::$scopedCss !== null;
    }

    /**
     * Get the CSS scope identifier for the data attribute.
     */
    public function getScopeId(): string
    {
        return static::$scopeId;
    }

    /**
     * Check if this component was compiled from a Multi File Component.
     */
    public function isMultiFileComponent(): bool
    {
        return true;
    }
}
