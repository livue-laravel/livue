<?php

namespace LiVue\Features\SupportIsland;

use LiVue\Attributes;

/**
 * Trait HandlesIsland
 *
 * Provides island and isolation functionality for LiVue components.
 * Islands are components that mount as separate Vue apps, isolated from parent.
 * Isolated components have their requests excluded from the request pool.
 */
trait HandlesIsland
{
    /**
     * Whether this component should mount as an isolated Vue app (island).
     * When false (default), nested components share the parent's Vue app.
     */
    protected bool $island = false;

    /**
     * Whether this component is an island (separate Vue app).
     * Checks for #[Island] attribute or $island property.
     *
     * @return bool True if the component is an island
     */
    public function isIsland(): bool
    {
        if ($this->resolveAttribute(Attributes\Island::class) !== null) {
            return true;
        }

        return $this->island;
    }

    /**
     * Whether this component's requests should be isolated from the pool.
     * Checks for #[Isolate] attribute on the component class.
     *
     * @return bool True if requests should be isolated
     */
    public function isIsolated(): bool
    {
        return $this->resolveAttribute(Attributes\Isolate::class) !== null;
    }
}
