<?php

namespace LiVue\Tests\Fixtures\Forms;

use LiVue\Attributes\Validate;
use LiVue\Form;

class CrossFieldForm extends Form
{
    #[Validate('required|confirmed')]
    public string $password = '';

    public string $password_confirmation = '';

    #[Validate('nullable|same:password')]
    public string $echoPassword = '';
}
