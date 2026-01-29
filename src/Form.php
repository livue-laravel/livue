<?php

namespace LiVue;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;
use Illuminate\Validation\ValidationException;
use LiVue\Attributes\Validate;
use ReflectionClass;
use ReflectionProperty;

/**
 * Base class for LiVue Form Objects.
 *
 * Form Objects allow you to extract form logic (validation, data handling)
 * into dedicated classes, keeping your components clean.
 *
 * Example:
 * ```php
 * class PostForm extends Form
 * {
 *     #[Validate('required|min:5')]
 *     public string $title = '';
 *
 *     #[Validate('required')]
 *     public string $content = '';
 *
 *     public function store(): Post
 *     {
 *         $this->validate();
 *         return Post::create($this->only(['title', 'content']));
 *     }
 * }
 * ```
 *
 * In your component:
 * ```php
 * public PostForm $form;
 *
 * public function save(): void
 * {
 *     $this->form->store();
 *     $this->redirect('/posts');
 * }
 * ```
 *
 * In your template:
 * ```html
 * <input v-model="form.title">
 * ```
 */
abstract class Form
{
    /**
     * Reference to the parent component (set during hydration).
     */
    protected ?Component $component = null;

    /**
     * The validation error bag for this form.
     */
    protected MessageBag $errors;

    public function __construct()
    {
        $this->errors = new MessageBag();
    }

    // -----------------------------------------------------------------
    //  Data Methods
    // -----------------------------------------------------------------

    /**
     * Fill the form properties from an array or model.
     *
     * @param  array|object $data
     * @return static
     */
    public function fill(array|object $data): static
    {
        if (is_object($data) && method_exists($data, 'toArray')) {
            $data = $data->toArray();
        } elseif (is_object($data)) {
            $data = (array) $data;
        }

        $reflection = new ReflectionClass($this);

        foreach ($data as $key => $value) {
            if (! $reflection->hasProperty($key)) {
                continue;
            }

            $property = $reflection->getProperty($key);

            if (! $property->isPublic() || $property->isStatic()) {
                continue;
            }

            $this->{$key} = $value;
        }

        return $this;
    }

    /**
     * Get all public property values as an array.
     *
     * @return array
     */
    public function all(): array
    {
        return $this->getPublicProperties();
    }

    /**
     * Get only the specified properties.
     *
     * @param  array $keys
     * @return array
     */
    public function only(array $keys): array
    {
        $all = $this->all();

        return array_intersect_key($all, array_flip($keys));
    }

    /**
     * Get all properties except the specified ones.
     *
     * @param  array $keys
     * @return array
     */
    public function except(array $keys): array
    {
        $all = $this->all();

        return array_diff_key($all, array_flip($keys));
    }

    /**
     * Get and reset the form data (useful for create flows).
     *
     * @param  array|string|null $keys
     * @return array
     */
    public function pull(array|string|null $keys = null): array
    {
        if ($keys === null) {
            $data = $this->all();
            $this->reset();

            return $data;
        }

        $keys = is_array($keys) ? $keys : [$keys];
        $data = $this->only($keys);
        $this->reset($keys);

        return $data;
    }

    /**
     * Reset the form properties to their defaults.
     *
     * @param  array|string|null $keys  Specific properties to reset (null = all)
     * @return static
     */
    public function reset(array|string|null $keys = null): static
    {
        $reflection = new ReflectionClass($this);
        $defaults = $reflection->getDefaultProperties();

        if ($keys === null) {
            $keys = array_keys($this->getPublicProperties());
        } elseif (is_string($keys)) {
            $keys = [$keys];
        }

        foreach ($keys as $key) {
            if (! $reflection->hasProperty($key)) {
                continue;
            }

            $property = $reflection->getProperty($key);

            if (! $property->isPublic() || $property->isStatic()) {
                continue;
            }

            $this->{$key} = $defaults[$key] ?? null;
        }

        // Also reset validation errors for the reset keys
        foreach ($keys as $key) {
            $this->errors->forget($key);
        }

        return $this;
    }

    // -----------------------------------------------------------------
    //  Validation
    // -----------------------------------------------------------------

    /**
     * Validate the form properties.
     *
     * @param  array|null $rules      Override rules
     * @param  array      $messages   Custom messages
     * @param  array      $attributes Custom attribute names
     * @return array                  Validated data
     *
     * @throws ValidationException
     */
    public function validate(?array $rules = null, array $messages = [], array $attributes = []): array
    {
        if ($rules === null) {
            $rules = $this->resolveRules();
            $messages = array_merge($this->resolveMessages(), $messages);
            $attributes = array_merge($this->resolveAttributes(), $attributes);
        }

        $data = $this->getDataForValidation($rules);
        $validator = Validator::make($data, $rules, $messages, $attributes);

        try {
            $validated = $validator->validate();
        } catch (ValidationException $e) {
            $this->setErrors($e->validator->errors());

            // Propagate errors to parent component if available
            if ($this->component !== null) {
                $this->syncErrorsToComponent();
            }

            throw $e;
        }

        $this->resetErrors();

        return $validated;
    }

    /**
     * Validate a single field.
     *
     * @param  string     $field
     * @param  array|null $rules
     * @return array
     *
     * @throws ValidationException
     */
    public function validateOnly(string $field, ?array $rules = null): array
    {
        if ($rules === null) {
            $allRules = $this->resolveRules();
            $rules = array_intersect_key($allRules, [$field => true]);
        }

        if (empty($rules)) {
            return [];
        }

        $data = $this->getDataForValidation($rules);
        $validator = Validator::make($data, $rules, $this->resolveMessages(), $this->resolveAttributes());

        try {
            $validated = $validator->validate();
        } catch (ValidationException $e) {
            $this->errors->forget($field);
            $this->errors->merge($e->validator->errors());

            if ($this->component !== null) {
                $this->syncErrorsToComponent();
            }

            throw $e;
        }

        $this->errors->forget($field);

        return $validated;
    }

    /**
     * Get the validation error bag.
     */
    public function getErrors(): MessageBag
    {
        return $this->errors;
    }

    /**
     * Set the error bag.
     */
    public function setErrors(array|MessageBag $errors): static
    {
        $this->errors = $errors instanceof MessageBag ? $errors : new MessageBag($errors);

        return $this;
    }

    /**
     * Reset validation errors.
     */
    public function resetErrors(): static
    {
        $this->errors = new MessageBag();

        if ($this->component !== null) {
            $this->syncErrorsToComponent();
        }

        return $this;
    }

    /**
     * Add a validation error manually.
     */
    public function addError(string $key, string $message): static
    {
        $this->errors->add($key, $message);

        if ($this->component !== null) {
            $this->syncErrorsToComponent();
        }

        return $this;
    }

    // -----------------------------------------------------------------
    //  Component Integration
    // -----------------------------------------------------------------

    /**
     * Set the parent component reference.
     * Called by the synthesizer during hydration.
     */
    public function setComponent(Component $component): static
    {
        $this->component = $component;

        return $this;
    }

    /**
     * Get the parent component.
     */
    public function getComponent(): ?Component
    {
        return $this->component;
    }

    /**
     * Sync form errors to the parent component's error bag.
     * Prefixes errors with the form property name (e.g., "form.title").
     */
    protected function syncErrorsToComponent(): void
    {
        if ($this->component === null) {
            return;
        }

        // Find the property name this form is bound to
        $formProperty = $this->findFormPropertyName();

        if ($formProperty === null) {
            return;
        }

        $componentErrors = $this->component->getErrorBag();

        // Clear previous form errors
        foreach ($componentErrors->keys() as $key) {
            if (str_starts_with($key, $formProperty . '.')) {
                $componentErrors->forget($key);
            }
        }

        // Add new form errors with prefix
        foreach ($this->errors->toArray() as $field => $messages) {
            foreach ($messages as $message) {
                $componentErrors->add($formProperty . '.' . $field, $message);
            }
        }
    }

    /**
     * Find the property name on the component that holds this form.
     */
    protected function findFormPropertyName(): ?string
    {
        if ($this->component === null) {
            return null;
        }

        $reflection = new ReflectionClass($this->component);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            $value = $property->getValue($this->component);

            if ($value === $this) {
                return $property->getName();
            }
        }

        return null;
    }

    // -----------------------------------------------------------------
    //  Rule Resolution
    // -----------------------------------------------------------------

    /**
     * Get validation rules.
     * Override this method to define custom rules.
     */
    protected function rules(): array
    {
        return [];
    }

    /**
     * Get custom validation messages.
     */
    protected function messages(): array
    {
        return [];
    }

    /**
     * Get custom attribute names.
     */
    protected function validationAttributes(): array
    {
        return [];
    }

    /**
     * Resolve all validation rules from #[Validate] attributes and rules() method.
     */
    protected function resolveRules(): array
    {
        $rules = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            if ($property->isStatic()) {
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

        // Merge with rules() method (method rules take precedence)
        return array_merge($rules, $this->rules());
    }

    /**
     * Resolve custom validation messages.
     */
    protected function resolveMessages(): array
    {
        $messages = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            if ($property->isStatic()) {
                continue;
            }

            $attrs = $property->getAttributes(Validate::class);

            foreach ($attrs as $attr) {
                $instance = $attr->newInstance();

                if ($instance->message === null) {
                    continue;
                }

                $rule = $instance->rule;
                $ruleNames = is_string($rule) ? explode('|', $rule) : $rule;

                foreach ($ruleNames as $r) {
                    $ruleName = is_string($r) ? explode(':', $r)[0] : null;

                    if ($ruleName !== null) {
                        $messages[$property->getName() . '.' . $ruleName] = $instance->message;
                    }
                }
            }
        }

        return array_merge($messages, $this->messages());
    }

    /**
     * Resolve custom attribute names.
     */
    protected function resolveAttributes(): array
    {
        $attributes = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            if ($property->isStatic()) {
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

        return array_merge($attributes, $this->validationAttributes());
    }

    /**
     * Get property values matching the given rule keys.
     */
    protected function getDataForValidation(array $rules): array
    {
        return array_intersect_key($this->all(), $rules);
    }

    // -----------------------------------------------------------------
    //  Helpers
    // -----------------------------------------------------------------

    /**
     * Get all public, non-static properties.
     */
    protected function getPublicProperties(): array
    {
        $properties = [];
        $reflection = new ReflectionClass($this);

        foreach ($reflection->getProperties(ReflectionProperty::IS_PUBLIC) as $property) {
            if ($property->isStatic()) {
                continue;
            }

            $properties[$property->getName()] = $property->getValue($this);
        }

        return $properties;
    }
}
