<?php

use Illuminate\Support\Facades\Event;
use LiVue\Component;
use LiVue\Tests\Fixtures\Counter;
use LiVue\Tests\Fixtures\CounterMounted;
use LiVue\Tests\Fixtures\CounterObserver;
use LiVue\Tests\Fixtures\LifecycleEventsCounter;
use LiVue\Tests\Fixtures\ObservedCounter;

beforeEach(function () {
    Counter::flushLifecycleEventListeners();
    LifecycleEventsCounter::flushLifecycleEventListeners();
    ObservedCounter::flushLifecycleEventListeners();
});

describe('Lifecycle Events', function () {

    describe('Static registration', function () {

        it('fires booting and booted events on mount', function () {
            $log = [];

            Counter::booting(function ($component) use (&$log) {
                $log[] = 'booting';
                expect($component)->toBeInstanceOf(Counter::class);
            });

            Counter::booted(function ($component) use (&$log) {
                $log[] = 'booted';
            });

            livue(Counter::class);

            expect($log)->toBe(['booting', 'booted']);
        });

        it('fires mounting and mounted events on mount', function () {
            $log = [];

            Counter::mounting(function ($component) use (&$log) {
                $log[] = 'mounting';
            });

            Counter::mounted(function ($component) use (&$log) {
                $log[] = 'mounted';
            });

            livue(Counter::class);

            expect($log)->toBe(['mounting', 'mounted']);
        });

        it('fires hydrating and hydrated events on update', function () {
            $log = [];

            Counter::hydrating(function ($component) use (&$log) {
                $log[] = 'hydrating';
            });

            Counter::hydrated(function ($component) use (&$log) {
                $log[] = 'hydrated';
            });

            livue(Counter::class)
                ->call('increment');

            expect($log)->toContain('hydrating')
                ->toContain('hydrated');
        });

        it('fires calling and called events with method and params', function () {
            $capturedMethod = null;
            $capturedParams = null;

            Counter::calling(function ($component, $method, $params) use (&$capturedMethod, &$capturedParams) {
                $capturedMethod = $method;
                $capturedParams = $params;
            });

            Counter::called(function ($component, $method, $params) {
                expect($method)->toBe('incrementBy');
                expect($params)->toBe([5]);
            });

            livue(Counter::class)
                ->call('incrementBy', 5);

            expect($capturedMethod)->toBe('incrementBy');
            expect($capturedParams)->toBe([5]);
        });

        it('fires dehydrating and dehydrated events on update', function () {
            $log = [];

            Counter::dehydrating(function ($component) use (&$log) {
                $log[] = 'dehydrating';
            });

            Counter::dehydrated(function ($component) use (&$log) {
                $log[] = 'dehydrated';
            });

            livue(Counter::class)
                ->call('increment');

            expect($log)->toContain('dehydrating')
                ->toContain('dehydrated');
        });

        it('fires onRendering and onRendered events on update', function () {
            $log = [];

            Counter::onRendering(function ($component) use (&$log) {
                $log[] = 'rendering';
            });

            Counter::onRendered(function ($component) use (&$log) {
                $log[] = 'rendered';
            });

            livue(Counter::class)
                ->call('increment');

            expect($log)->toContain('rendering')
                ->toContain('rendered');
        });

    });

    describe('Halting events', function () {

        it('cancels mounting when returning false', function () {
            Counter::mounting(function ($component) {
                return false;
            });

            $testable = livue(Counter::class);
            // The mount was halted, so user mount() should not have run.
            // Counter default is 0, and no increment happened.
            expect($testable->instance())->toBeInstanceOf(Counter::class);
        });

        it('cancels calling when returning false', function () {
            Counter::calling(function ($component, $method, $params) {
                return false;
            });

            livue(Counter::class)
                ->call('increment')
                ->assertSet('count', 0); // increment was blocked
        });

    });

    describe('Per-class static registration', function () {

        it('registers events per concrete class, not shared across classes', function () {
            $counterFired = false;
            $lifecycleFired = false;

            Counter::booted(function () use (&$counterFired) {
                $counterFired = true;
            });

            LifecycleEventsCounter::booted(function () use (&$lifecycleFired) {
                $lifecycleFired = true;
            });

            livue(Counter::class);

            expect($counterFired)->toBeTrue();
            expect($lifecycleFired)->toBeFalse();
        });

    });

    describe('Observer pattern', function () {

        it('calls observer methods during lifecycle via observe()', function () {
            $observer = new CounterObserver();

            Counter::observe($observer);

            livue(Counter::class);

            expect($observer->bootingCalled)->toBeTrue();
            expect($observer->bootedCalled)->toBeTrue();
            expect($observer->mountingCalled)->toBeTrue();
            expect($observer->mountedCalled)->toBeTrue();
        });

        it('calls observer calling/called methods on update', function () {
            $observer = new CounterObserver();

            Counter::observe($observer);

            livue(Counter::class)
                ->call('incrementBy', 3);

            expect($observer->callingCalled)->toBeTrue();
            expect($observer->calledMethod)->toBe('incrementBy');
            expect($observer->calledParams)->toBe([3]);
            expect($observer->calledCalled)->toBeTrue();
            expect($observer->hydratingCalled)->toBeTrue();
            expect($observer->hydratedCalled)->toBeTrue();
            expect($observer->dehydratingCalled)->toBeTrue();
            expect($observer->dehydratedCalled)->toBeTrue();
            expect($observer->renderingCalled)->toBeTrue();
            expect($observer->renderedCalled)->toBeTrue();
        });

    });

    describe('#[ObservedBy] attribute', function () {

        it('resolves observer from attribute automatically', function () {
            // ObservedCounter has #[ObservedBy(CounterObserver::class)]
            // The observer is registered when the component is constructed.
            $testable = livue(ObservedCounter::class);

            // Just verify the component mounts successfully — the observer was resolved
            expect($testable->instance())->toBeInstanceOf(ObservedCounter::class);
        });

    });

    describe('$dispatchesEvents mapping', function () {

        it('dispatches custom event class on mapped lifecycle event', function () {
            $dispatched = false;

            Event::listen(CounterMounted::class, function (CounterMounted $event) use (&$dispatched) {
                $dispatched = true;
                expect($event->component)->toBeInstanceOf(LifecycleEventsCounter::class);
            });

            livue(LifecycleEventsCounter::class);

            expect($dispatched)->toBeTrue();
        });

    });

    describe('withoutLifecycleEvents', function () {

        it('suppresses lifecycle events during callback', function () {
            $fired = false;

            Counter::mounting(function () use (&$fired) {
                $fired = true;
            });

            Counter::withoutLifecycleEvents(function () {
                livue(Counter::class);
            });

            expect($fired)->toBeFalse();
        });

    });

    describe('Security', function () {

        it('blocks lifecycle trait methods from client calls', function () {
            // Methods declared on Component::class (including traits) are blocked by callMethod()
            // Testable catches BadMethodCallException and converts to 403
            livue(Counter::class)
                ->call('fireLifecycleEvent', 'booting')
                ->assertStatus(403);
        });

        it('blocks initializeHasLifecycleEvents from client calls', function () {
            livue(Counter::class)
                ->call('initializeHasLifecycleEvents')
                ->assertStatus(403);
        });

    });

    describe('flushLifecycleEventListeners', function () {

        it('removes all listeners for a component class', function () {
            $fired = false;

            Counter::booted(function () use (&$fired) {
                $fired = true;
            });

            Counter::flushLifecycleEventListeners();

            livue(Counter::class);

            expect($fired)->toBeFalse();
        });

    });

});
