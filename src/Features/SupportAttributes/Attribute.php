<?php

namespace LiVue\Features\SupportAttributes;

use LiVue\Component;

abstract class Attribute
{
    protected Component $component;
    protected AttributeLevel $level;
    protected string $levelName;

    /**
     * Internal initialization called by SupportAttributes.
     * Sets the context (component, level, target name) for this attribute instance.
     */
    public function __boot(Component $component, AttributeLevel $level, string $name): void
    {
        $this->component = $component;
        $this->level = $level;
        $this->levelName = $name;
    }

    public function getComponent(): Component
    {
        return $this->component;
    }

    public function getLevel(): AttributeLevel
    {
        return $this->level;
    }

    /**
     * Get the name of the target (property name, method name, or class name).
     */
    public function getName(): string
    {
        return $this->levelName;
    }

    /**
     * Get the current value of the property this attribute is attached to.
     *
     * @throws \RuntimeException If the attribute is not on a property.
     */
    public function getValue(): mixed
    {
        if ($this->level !== AttributeLevel::PROPERTY) {
            throw new \RuntimeException('Cannot get the value of a non-property attribute.');
        }

        return $this->component->{$this->levelName};
    }

    /**
     * Set the value of the property this attribute is attached to.
     *
     * @throws \RuntimeException If the attribute is not on a property.
     */
    public function setValue(mixed $value): void
    {
        if ($this->level !== AttributeLevel::PROPERTY) {
            throw new \RuntimeException('Cannot set the value of a non-property attribute.');
        }

        $this->component->{$this->levelName} = $value;
    }
}
