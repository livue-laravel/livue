<?php

namespace LiVue\Features\SupportSingleFile;

use LiVue\Component;

/**
 * Base class for Single File Components.
 *
 * Compiled SFC classes extend this instead of Component directly.
 * This allows identification of SFC components and provides
 * access to the source file path for debugging and hot reload.
 */
abstract class SingleFileComponent extends Component
{
    /**
     * Path to the source .blade.php file.
     * Set by the compiler during class generation.
     */
    protected static string $sourcePath = '';

    /**
     * Original component name (e.g., "sfc-test").
     * Used for resolution and stored in the snapshot memo.
     */
    protected static string $componentName = '';

    /**
     * Get the source file path.
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
     * Check if this component was compiled from a Single File Component.
     */
    public function isSingleFileComponent(): bool
    {
        return true;
    }
}
