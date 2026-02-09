# LiVue

Server-driven reactivity for Laravel using Vue.js.

Write reactive components with PHP on the server and Vue.js on the client, combining the best of both worlds.

## Requirements

| Requirement | Version |
|---|---|
| PHP | 8.2+ |
| Laravel | 11.x / 12.x |
| Vue | 3.5+ |

## Installation

```bash
composer require livue/livue
```

## Quick Start

```php
// app/LiVue/Counter.php
namespace App\LiVue;

use LiVue\Component;

class Counter extends Component
{
    public int $count = 0;

    public function increment(): void
    {
        $this->count++;
    }

    public function render(): string
    {
        return 'livue.counter';
    }
}
```

```html
<!-- resources/views/livue/counter.blade.php -->
<div>
    <span>{{ $count }}</span>
    <button @click="increment">+</button>
</div>
```

```html
<!-- In any Blade view -->
<livue:counter />
```

## Documentation

For full documentation, visit [livue-laravel.com/docs](https://livue-laravel.com/docs).

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## Upgrading

See [UPGRADE.md](UPGRADE.md) for upgrade instructions.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security

If you discover a security vulnerability, please see [SECURITY](.github/SECURITY.md) for reporting instructions.

## Credits

LiVue is heavily inspired by [Livewire](https://livewire.laravel.com). A huge thank you to [Caleb Porzio](https://github.com/calebporzio) and the Livewire team for creating such an amazing tool that inspired this project.

## License

LiVue is open-sourced software licensed under the [MIT license](LICENSE).
