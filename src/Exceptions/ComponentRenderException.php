<?php

namespace LiVue\Exceptions;

class ComponentRenderException extends LiVueException
{
    public function __construct(string $componentName, string $viewName, \Throwable $previous)
    {
        $message = "LiVue component [{$componentName}] failed to render view [{$viewName}]: {$previous->getMessage()}";

        parent::__construct($message, 0, $previous);
    }
}
