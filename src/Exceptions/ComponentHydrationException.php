<?php

namespace LiVue\Exceptions;

class ComponentHydrationException extends LiVueException
{
    public function __construct(string $componentName, \Throwable $previous)
    {
        $message = "LiVue component [{$componentName}] failed during hydration: {$previous->getMessage()}";

        parent::__construct($message, 0, $previous);
    }
}
