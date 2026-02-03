<?php

namespace LiVue\Features\SupportNavigation;

/**
 * Trait HandlesNavigation
 *
 * Provides redirect functionality for LiVue components.
 * Allows components to trigger client-side or server-side navigation
 * after an action completes.
 */
trait HandlesNavigation
{
    /**
     * Redirect intent set during the current request.
     * Stores ['url' => string, 'navigate' => bool] or null.
     */
    private ?array $redirectIntent = null;

    /**
     * Redirect the user to a URL after the current action completes.
     *
     * @param string $url       The target URL
     * @param bool   $navigate  If true, use SPA navigation (no full page reload)
     */
    public function redirect(string $url, bool $navigate = false): void
    {
        $this->redirectIntent = [
            'url' => $url,
            'navigate' => $navigate,
        ];
    }

    /**
     * Get and clear the redirect intent.
     *
     * @return array|null The redirect intent or null if none set
     */
    public function getRedirect(): ?array
    {
        $redirect = $this->redirectIntent;
        $this->redirectIntent = null;

        return $redirect;
    }
}
