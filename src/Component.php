<?php

namespace LiVue;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use LiVue\Features\SupportAttributes\HandlesAttributes;
use LiVue\Features\SupportCasting\HandlesCasting;
use LiVue\Features\SupportComposables\HandlesComposables;
use LiVue\Features\SupportComputed\HandlesComputed;
use LiVue\Features\SupportDownloads\HandlesDownloads;
use LiVue\Features\SupportEvents\HandlesEvents;
use LiVue\Features\SupportForms\HandlesForms;
use LiVue\Features\SupportGuarded\HandlesGuarded;
use LiVue\Features\SupportHead\HandlesHead;
use LiVue\Features\SupportIsland\HandlesIsland;
use LiVue\Features\SupportJavascript\HandlesJavascript;
use LiVue\Features\SupportNavigation\HandlesNavigation;
use LiVue\Features\SupportRendering\HandlesRendering;
use LiVue\Features\SupportState\HandlesState;
use LiVue\Features\SupportValidation\HandlesValidation;
use ReflectionClass;

abstract class Component
{
    use AuthorizesRequests;
    use HandlesAttributes;
    use HandlesCasting;
    use HandlesComposables;
    use HandlesComputed;
    use HandlesDownloads;
    use HandlesEvents;
    use HandlesForms;
    use HandlesGuarded;
    use HandlesHead;
    use HandlesIsland;
    use HandlesJavascript;
    use HandlesNavigation;
    use HandlesRendering;
    use HandlesState;
    use HandlesValidation;

    // ---------------------------------------------------------------
    //  Core properties
    // ---------------------------------------------------------------

    /**
     * Unique instance ID for this component.
     * Use getId() to access this value.
     */
    private string $__id;

    // ---------------------------------------------------------------
    //  Abstract methods
    // ---------------------------------------------------------------

    /**
     * Get the Blade view name for this component.
     */
    abstract protected function render(): string;

    // ---------------------------------------------------------------
    //  Constructor
    // ---------------------------------------------------------------

    public function __construct()
    {
        $this->__id = uniqid('livue-', true);
        $this->initializeHandlesValidation();
    }

    /**
     * Get the unique instance ID for this component.
     */
    public function getId(): string
    {
        return $this->__id;
    }

    /**
     * Set the component ID.
     * Used internally during hydration.
     */
    public function setId(string $id): void
    {
        $this->__id = $id;
    }

    // ---------------------------------------------------------------
    //  Component identity
    // ---------------------------------------------------------------

    /**
     * Get the component name.
     *
     * Returns the registered name (including hash-based names for components
     * resolved by class) if available, otherwise falls back to kebab-case
     * derived from the class short name.
     */
    public function getName(): string
    {
        // Check if this component class has a registered name
        $manager = app(LiVueManager::class);
        $registeredName = $manager->getNameForClass(static::class);

        if ($registeredName !== null) {
            return $registeredName;
        }

        // Fallback to kebab-case from class short name
        $class = (new ReflectionClass($this))->getShortName();

        return strtolower(preg_replace('/([a-z])([A-Z])/', '$1-$2', $class));
    }
}
