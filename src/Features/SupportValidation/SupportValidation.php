<?php

namespace LiVue\Features\SupportValidation;

use LiVue\Features\SupportHooks\ComponentHook;
use LiVue\Features\SupportHooks\ComponentStore;

use Illuminate\Validation\ValidationException;
use LiVue\Component;

/**
 * Validation lifecycle integration.
 *
 * Handles restoring validation errors from the snapshot memo,
 * catching ValidationException during method calls, and
 * persisting errors back into the memo for the response.
 *
 * The public validation API (validate(), validateOnly(), addError(), etc.)
 * remains on the Component via the HandlesValidation trait.
 */
class SupportValidation extends ComponentHook
{
    /**
     * Restore validation errors from the incoming snapshot memo.
     */
    public function hydrateMemo(Component $component, ComponentStore $store, array $memo): void
    {
        if (! empty($memo['errors'])) {
            $component->setErrorBag($memo['errors']);
        }
    }

    /**
     * Catch ValidationException during method calls.
     * Sets the error bag on the component and returns a sentinel
     * value to signal the exception was handled.
     */
    public function exception(Component $component, ComponentStore $store, \Throwable $e): mixed
    {
        if ($e instanceof ValidationException) {
            $component->setErrorBag($e->validator->errors());

            return true;
        }

        return null;
    }

    /**
     * Persist validation errors into the snapshot memo.
     */
    public function dehydrateMemo(Component $component, ComponentStore $store): array
    {
        $errors = $component->getErrorBag()->toArray();

        if (! empty($errors)) {
            return ['errors' => $errors];
        }

        return [];
    }
}
