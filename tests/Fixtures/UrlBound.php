<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Attributes\Url;
use LiVue\Component;

class UrlBound extends Component
{
    #[Url]
    public string $q = '';

    /** Con un valore predefinito che non e' vuoto: e' il caso che si perde piu' facilmente. */
    #[Url]
    public string $kind = 'artist';

    #[Url]
    public ?string $optional = 'preset';

    #[Url]
    public int $page = 1;

    public function render(): string
    {
        return 'fixtures.url-bound';
    }
}
