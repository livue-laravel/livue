<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

/**
 * Component whose view triggers a nested Laravel View::render() that throws:
 * reproduces the dirty-Factory-state scenario (renderCount left negative)
 * fixed in HandlesRendering::renderView().
 */
class BrokenViewComponent extends Component
{
    public function render(): string
    {
        return 'fixtures.broken-view';
    }
}
