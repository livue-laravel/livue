<?php

use LiVue\Tests\Fixtures\Counter;
use LiVue\Tests\Fixtures\ContactForm;
use LiVue\Tests\Fixtures\TodoList;

describe('Component Lifecycle', function () {

    describe('Initial State', function () {

        it('initializes Counter with default value', function () {
            livue(Counter::class)
                ->assertSet('count', 0);
        });

        it('initializes ContactForm with empty fields', function () {
            livue(ContactForm::class)
                ->assertSet('name', '')
                ->assertSet('email', '')
                ->assertSet('message', '')
                ->assertSet('submitted', false);
        });

        it('initializes TodoList with empty array', function () {
            livue(TodoList::class)
                ->assertSet('todos', [])
                ->assertSet('newTodo', '');
        });

    });

    describe('State Updates', function () {

        it('updates Counter on increment', function () {
            livue(Counter::class)
                ->call('increment')
                ->assertSet('count', 1)
                ->call('increment')
                ->assertSet('count', 2);
        });

        it('updates Counter on decrement', function () {
            livue(Counter::class)
                ->set('count', 5)
                ->call('decrement')
                ->assertSet('count', 4);
        });

        it('updates Counter with incrementBy', function () {
            livue(Counter::class)
                ->call('incrementBy', 10)
                ->assertSet('count', 10);
        });

        it('updates fields via set', function () {
            livue(ContactForm::class)
                ->set('name', 'Test Name')
                ->assertSet('name', 'Test Name')
                ->set('email', 'test@example.com')
                ->assertSet('email', 'test@example.com');
        });

        it('updates multiple fields via batch set', function () {
            livue(ContactForm::class)
                ->set([
                    'name' => 'John',
                    'email' => 'john@example.com',
                ])
                ->assertSet('name', 'John')
                ->assertSet('email', 'john@example.com');
        });

    });

    describe('Reset Behavior', function () {

        it('resets ContactForm fields after submit', function () {
            livue(ContactForm::class)
                ->set([
                    'name' => 'John Doe',
                    'email' => 'john@example.com',
                    'message' => 'This is a test message for validation',
                ])
                ->call('submit')
                ->assertSet('name', '')
                ->assertSet('email', '')
                ->assertSet('message', '')
                ->assertSet('submitted', true);
        });

        it('resets submitted flag on resetForm', function () {
            livue(ContactForm::class)
                ->set('submitted', true)
                ->call('resetForm')
                ->assertSet('submitted', false);
        });

    });

    describe('Component Instance', function () {

        it('returns correct component instance', function () {
            $testable = livue(Counter::class);

            expect($testable->instance())->toBeInstanceOf(Counter::class);
        });

        it('allows direct property access via get', function () {
            $count = livue(Counter::class)
                ->call('increment')
                ->call('increment')
                ->get('count');

            expect($count)->toBe(2);
        });

        it('allows magic property access', function () {
            $testable = livue(Counter::class)
                ->call('increment');

            expect($testable->count)->toBe(1);
        });

    });

    describe('Rendering', function () {

        it('renders initial HTML', function () {
            livue(Counter::class)
                ->assertSee('Count: 0');
        });

        it('updates HTML after state change', function () {
            livue(Counter::class)
                ->call('increment')
                ->assertSee('Count: 1')
                ->assertDontSee('Count: 0');
        });

        it('returns HTML via html() method', function () {
            $html = livue(Counter::class)->html();

            expect($html)->toContain('Count:');
        });

    });

});
