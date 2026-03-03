<?php

namespace LiVue\Exceptions;

class ComponentNotFoundException extends LiVueException
{
    public function __construct(string $componentName)
    {
        $message = "LiVue component [{$componentName}] not found. "
            . "Ensure it is registered or follows the naming convention.";

        parent::__construct($message);
    }
}
