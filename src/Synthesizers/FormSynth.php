<?php

namespace LiVue\Synthesizers;

use LiVue\Form;

/**
 * Synthesizer for LiVue Form objects.
 *
 * Dehydrates Form instances to their public properties for JSON serialization.
 * Hydrates by recreating the Form instance and filling it with the data.
 *
 * Key: 'frm'
 */
class FormSynth extends PropertySynthesizer
{
    public function key(): string
    {
        return 'frm';
    }

    public function match(mixed $value): bool
    {
        return $value instanceof Form;
    }

    /**
     * Dehydrate: Form → [properties_array, {s, class}]
     */
    public function dehydrate(mixed $value, string $property): array
    {
        /** @var Form $value */
        $meta = [
            's' => 'frm',
            'class' => get_class($value),
        ];

        // Include validation errors in meta so they persist across requests
        $errors = $value->getErrors()->toArray();
        if (! empty($errors)) {
            $meta['errors'] = $errors;
        }

        return [$value->all(), $meta];
    }

    /**
     * Hydrate: recreate Form instance and fill with data.
     */
    public function hydrate(mixed $value, array $meta, string $property): mixed
    {
        $class = $meta['class'];

        if (! class_exists($class) || ! is_subclass_of($class, Form::class)) {
            throw new \InvalidArgumentException(
                "Invalid Form class [{$class}] for property [{$property}]."
            );
        }

        /** @var Form $form */
        $form = new $class();

        // Fill with the dehydrated data
        if (is_array($value)) {
            $form->fill($value);
        }

        // Restore validation errors if present
        if (isset($meta['errors']) && is_array($meta['errors'])) {
            $form->setErrors($meta['errors']);
        }

        return $form;
    }
}
