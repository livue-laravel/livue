<?php

use LiVue\Exceptions\ComponentMountException;
use LiVue\Tests\Fixtures\AbortingMountComponent;
use LiVue\Tests\Fixtures\ThrowingMountComponent;
use Symfony\Component\HttpKernel\Exception\HttpException;

describe('Mount Exception Passthrough', function () {

    it('lets http exceptions from mount() bubble untouched', function () {
        // abort(403) in mount() deve restare un HttpException (→ risposta 403),
        // non diventare una ComponentMountException (→ 500).
        expect(fn () => livue(AbortingMountComponent::class))
            ->toThrow(HttpException::class);
    });

    it('still wraps generic mount failures in ComponentMountException', function () {
        expect(fn () => livue(ThrowingMountComponent::class))
            ->toThrow(ComponentMountException::class);
    });

});
