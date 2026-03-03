<?php

namespace LiVue\Exceptions;

class ComponentMountException extends LiVueException
{
    public function __construct(string $componentName, \Throwable $previous)
    {
        $message = "LiVue component [{$componentName}] failed during mount: {$previous->getMessage()}";

        parent::__construct($message, 0, $previous);
    }
}
