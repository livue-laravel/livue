<?php

namespace LiVue\Tests\Fixtures\Forms;

use LiVue\Attributes\Validate;
use LiVue\Form;

class PostForm extends Form
{
    #[Validate('required|min:5')]
    public string $title = '';

    #[Validate('required|min:20')]
    public string $content = '';

    #[Validate('nullable|array')]
    public array $tags = [];

    public bool $published = false;
}
