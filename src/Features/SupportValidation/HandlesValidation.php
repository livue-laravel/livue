<?php

namespace LiVue\Features\SupportValidation;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;
use Illuminate\Validation\ValidationException;
use LiVue\Attributes\Validate;
use ReflectionClass;
use ReflectionProperty;

trait HandlesValidation
{
    /**
     * The current validation error bag.
     */
    private MessageBag $errorBag;

    /**
     * Initialize the error bag.
     * Called from the Component constructor.
     */
    protected function initializeHandlesValidation(): void
    {
        $this->errorBag = new MessageBag();
    }

    // -----------------------------------------------------------------
    //  Public API
    // -----------------------------------------------------------------

    /**
     * Run validation on the component's public properties.
     *
     * When called without arguments, rules are collected from
     * #[Validate] attributes and the optional rules() method.
     *
     * @param  array|null $rules      Explicit rules (overrides attributes/method)
     * @param  array      $messages   Custom error messages
     * @param  array      $attributes Custom attribute names
     * @return array                  Validated data
     *
     * @throws ValidationException
     */
    public function validate(?array $rules = null, array $messages = [], array $attributes = []): array
    {
        $useGlobal = $rules === null;

        if ($useGlobal) {
            $rules = $this->resolveValidationRules();
            $messages = array_merge($this->resolveValidationMessages(), $messages);
            $attributes = array_merge($this->resolveValidationAttributes(), $attributes);
        }

        $data = $this->getDataForValidation($rules);

        $validator = Validator::make($data, $rules, $messages, $attributes);

        try {
            $validated = $validator->validate();
        } catch (ValidationException $e) {
            $this->setErrorBag($e->validator->errors());
            throw $e;
        }

        $this->resetValidation();

        return $validated;
    }

    /**
     * Validate a single field.
     *
     * @param  string     $field
     * @param  array|null $rules
     * @param  array      $messages
     * @param  array      $attributes
     * @return array
     *
     * @throws ValidationException
     */
    public function validateOnly(string $field, ?array $rules = null, array $messages = [], array $attributes = []): array
    {
        $useGlobal = $rules === null;

        if ($useGlobal) {
            $allRules = $this->resolveValidationRules();
            $rules = array_intersect_key($allRules, [$field => true]);
            $messages = $this->resolveValidationMessages();
            $attributes = $this->resolveValidationAttributes();
        }

        if (empty($rules)) {
            return [];
        }

        $data = $this->getDataForValidation($rules);

        $validator = Validator::make($data, $rules, $messages, $attributes);

        try {
            $validated = $validator->validate();
        } catch (ValidationException $e) {
            // Merge with existing errors: replace only this field's errors
            $bag = $this->getErrorBag();
            $bag->forget($field);
            $bag->merge($e->validator->errors());
            $this->setErrorBag($bag);
            throw $e;
        }

        // Validation passed: clear this field's errors
        $this->getErrorBag()->forget($field);

        return $validated;
    }

    /**
     * Manually add a validation error.
     */
    public function addError(string $key, string $message): void
    {
        $this->getErrorBag()->add($key, $message);
    }

    /**
     * Clear validation errors.
     * Pass a field name to clear only that field, or null to clear all.
     */
    public function resetValidation(?string $field = null): void
    {
        if ($field !== null) {
            $this->getErrorBag()->forget($field);
        } else {
            $this->errorBag = new MessageBag();
        }
    }

    /**
     * Alias for resetValidation().
     */
    public function resetErrorBag(?string $field = null): void
    {
        $this->resetValidation($field);
    }

    /**
     * Get the current error bag.
     */
    public function getErrorBag(): MessageBag
    {
        if (! isset($this->errorBag)) {
            $this->errorBag = new MessageBag();
        }

        return $this->errorBag;
    }

    /**
     * Set the error bag from an array or MessageBag.
     *
     * @param  array|MessageBag $errors
     */
    public function setErrorBag(array|MessageBag $errors): void
    {
        $this->errorBag = $errors instanceof MessageBag
            ? $errors
            : new MessageBag($errors);
    }

    // -----------------------------------------------------------------
    //  Rule resolution
    // -----------------------------------------------------------------

    /**
     * Collect all validation rules from #[Validate] attributes
     * and the optional rules() method.
     *
     * @return array<string, string|array>
     */
    protected function resolveValidationRules(): array
    {
        $rules = [];

        // 1. From #[Validate] attributes on public properties
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            if ($property->getDeclaringClass()->getName() === \LiVue\Component::class) {
                continue;
            }

            $attrs = $property->getAttributes(Validate::class);

            if (empty($attrs)) {
                continue;
            }

            $propertyRules = [];

            foreach ($attrs as $attr) {
                $instance = $attr->newInstance();
                $rule = $instance->rule;

                if (is_string($rule)) {
                    $propertyRules = array_merge($propertyRules, explode('|', $rule));
                } else {
                    $propertyRules = array_merge($propertyRules, $rule);
                }
            }

            $rules[$property->getName()] = $propertyRules;
        }

        // 2. Merge with rules() method if defined (method rules take precedence)
        if (method_exists($this, 'rules')) {
            $rules = array_merge($rules, $this->rules());
        }

        return $rules;
    }

    /**
     * Collect custom validation messages from #[Validate] attributes.
     *
     * @return array<string, string>
     */
    protected function resolveValidationMessages(): array
    {
        $messages = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            if ($property->getDeclaringClass()->getName() === \LiVue\Component::class) {
                continue;
            }

            $attrs = $property->getAttributes(Validate::class);

            foreach ($attrs as $attr) {
                $instance = $attr->newInstance();

                if ($instance->message === null) {
                    continue;
                }

                $rule = $instance->rule;

                // For string rules like 'required|min:3', attach message to each rule
                if (is_string($rule)) {
                    $ruleNames = explode('|', $rule);
                } else {
                    $ruleNames = $rule;
                }

                foreach ($ruleNames as $r) {
                    // Extract rule name (e.g., 'min:3' → 'min')
                    $ruleName = is_string($r) ? explode(':', $r)[0] : null;

                    if ($ruleName !== null) {
                        $messages[$property->getName() . '.' . $ruleName] = $instance->message;
                    }
                }
            }
        }

        // Merge with messages() method if defined
        if (method_exists($this, 'messages')) {
            $messages = array_merge($messages, $this->messages());
        }

        return $messages;
    }

    /**
     * Collect custom attribute names from #[Validate] attributes.
     *
     * @return array<string, string>
     */
    protected function resolveValidationAttributes(): array
    {
        $attributes = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            if ($property->getDeclaringClass()->getName() === \LiVue\Component::class) {
                continue;
            }

            $attrs = $property->getAttributes(Validate::class);

            foreach ($attrs as $attr) {
                $instance = $attr->newInstance();

                if ($instance->as !== null) {
                    $attributes[$property->getName()] = $instance->as;
                }
            }
        }

        // Merge with validationAttributes() method if defined
        if (method_exists($this, 'validationAttributes')) {
            $attributes = array_merge($attributes, $this->validationAttributes());
        }

        return $attributes;
    }

    /**
     * Extract public property values matching the given rule keys.
     * Supports dot notation for nested properties (e.g., 'data.name').
     *
     * @param  array $rules
     * @return array
     */
    protected function getDataForValidation(array $rules): array
    {
        $state = $this->getState();

        // Extract root keys from dot notation (e.g., 'data.name' -> 'data')
        $rootKeys = [];
        foreach (array_keys($rules) as $key) {
            $rootKeys[explode('.', $key)[0]] = true;
        }

        return array_intersect_key($state, $rootKeys);
    }
}
