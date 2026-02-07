<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class HeadMethodComponent extends Component
{
    public string $pageTitle = 'Dynamic Title';

    protected array $head = [
        'description' => 'This should be overridden by head() method',
    ];

    protected function head(): array
    {
        return [
            'description' => 'Dynamic description for ' . $this->pageTitle,
            'og:title' => $this->pageTitle,
            'canonical' => 'https://example.com/page',
            'json-ld' => [
                '@context' => 'https://schema.org',
                '@type' => 'Article',
                'name' => $this->pageTitle,
            ],
        ];
    }

    public function render(): string
    {
        return 'fixtures.counter';
    }
}
