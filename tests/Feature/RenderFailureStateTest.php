<?php

use LiVue\Exceptions\ComponentRenderException;
use LiVue\Tests\Fixtures\BrokenViewComponent;
use LiVue\Tests\Fixtures\Counter;

describe('Render Failure State', function () {

    it('resets blade factory state when a component render fails', function () {
        $factory = app('view');

        // Baseline: a healthy component renders.
        livue(Counter::class)->assertSet('count', 0);
        expect($factory->doneRendering())->toBeTrue();

        // The broken component fails through a NESTED Laravel View::render():
        // that render calls Factory::flushState() (renderCount back to 0)
        // before rethrowing. Without the fix, renderView()'s catch then
        // decremented the count to -1, so doneRendering() stayed false
        // forever and section/component stacks leaked into later renders
        // (fatal on long-lived Octane workers).
        try {
            livue(BrokenViewComponent::class);
            $this->fail('Expected the broken component render to throw');
        } catch (ComponentRenderException $e) {
            expect($e->getMessage())->toContain('kaboom')
                // The message must point at the file that actually threw
                // (the nested view), not just the component's root view.
                ->toContain('broken-inner.blade.php');
        }

        expect($factory->doneRendering())->toBeTrue()
            ->and($factory->hasRenderedOnce('anything'))->toBeFalse();

        // Healthy components keep rendering after the failure.
        livue(Counter::class)->assertSet('count', 0);
        expect($factory->doneRendering())->toBeTrue();
    });

});
