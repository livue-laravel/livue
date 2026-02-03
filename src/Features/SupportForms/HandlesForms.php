<?php

namespace LiVue\Features\SupportForms;

use LiVue\Form;
use ReflectionClass;
use ReflectionProperty;

/**
 * Trait HandlesForms
 *
 * Provides Form Object support for LiVue components.
 * Handles initialization and linking of Form instances to their parent component.
 */
trait HandlesForms
{
    /**
     * Initialize Form objects with component reference.
     * Called after hydration to link Form instances to their parent component.
     *
     * This allows Form objects to access their parent component for validation,
     * error handling, and other component-level operations.
     */
    public function initializeForms(): void
    {
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            $value = $property->getValue($this);

            if ($value instanceof Form) {
                $value->setComponent($this);
            }
        }
    }
}
