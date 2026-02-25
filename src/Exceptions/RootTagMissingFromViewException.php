<?php

namespace LiVue\Exceptions;

class RootTagMissingFromViewException extends \Exception
{
    public function __construct(string $componentName = '')
    {
        $message = 'LiVue component template must have a root HTML tag.';

        if ($componentName) {
            $message = "LiVue component [{$componentName}] template must have a root HTML tag. "
                . 'Ensure your Blade view starts with a single HTML element (e.g., <div>, <section>, <header>).';
        }

        parent::__construct($message);
    }
}
