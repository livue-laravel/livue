<?php

use LiVue\Tests\Fixtures\EventComponent;
use LiVue\Tests\Fixtures\ContactForm;
use LiVue\Tests\Fixtures\TodoList;

describe('Events & Actions', function () {

    describe('Dispatching Events', function () {

        it('dispatches events from method calls', function () {
            livue(EventComponent::class)
                ->call('triggerEvent')
                ->assertDispatched('event-triggered');
        });

        it('dispatches multiple events', function () {
            livue(EventComponent::class)
                ->call('triggerMultipleEvents')
                ->assertDispatched('first-event')
                ->assertDispatched('second-event')
                ->assertDispatched('third-event');
        });

        it('asserts event not dispatched', function () {
            livue(EventComponent::class)
                ->assertNotDispatched('event-triggered');
        });

        it('dispatches form-submitted event on valid submit', function () {
            livue(ContactForm::class)
                ->set([
                    'name' => 'John Doe',
                    'email' => 'john@example.com',
                    'message' => 'This is a valid test message',
                ])
                ->call('submit')
                ->assertDispatched('form-submitted');
        });

        it('dispatches todo-added event', function () {
            livue(TodoList::class)
                ->set('newTodo', 'Test todo')
                ->call('addTodo')
                ->assertDispatched('todo-added');
        });

        it('dispatches todo-removed event', function () {
            $testable = livue(TodoList::class)
                ->set('newTodo', 'Test todo')
                ->call('addTodo');

            $todos = $testable->get('todos');
            $todoId = $todos[0]['id'];

            $testable
                ->call('removeTodo', $todoId)
                ->assertDispatched('todo-removed');
        });

    });

    describe('Listening to Events', function () {

        it('handles events via listeners array', function () {
            livue(EventComponent::class)
                ->dispatch('custom-event', ['message' => 'Hello World'])
                ->assertSet('message', 'Hello World')
                ->assertSet('eventCount', 1);
        });

        it('handles increment-count event', function () {
            livue(EventComponent::class)
                ->dispatch('increment-count')
                ->dispatch('increment-count')
                ->dispatch('increment-count')
                ->assertSet('eventCount', 3);
        });

    });

    describe('Method Calls', function () {

        it('calls methods without parameters', function () {
            livue(EventComponent::class)
                ->call('triggerEvent')
                ->assertDispatched('event-triggered');
        });

        it('calls methods with parameters', function () {
            livue(TodoList::class)
                ->set('newTodo', 'First')
                ->call('addTodo')
                ->set('newTodo', 'Second')
                ->call('addTodo')
                ->assertCount('todos', 2);

            // Get first todo id and toggle it
            $testable = livue(TodoList::class)
                ->set('newTodo', 'Test')
                ->call('addTodo');

            $todos = $testable->get('todos');
            $testable->call('toggleTodo', $todos[0]['id']);

            $updatedTodos = $testable->get('todos');
            expect($updatedTodos[0]['completed'])->toBeTrue();
        });

    });

    describe('Action Guards', function () {

        it('does not add empty todo', function () {
            livue(TodoList::class)
                ->set('newTodo', '')
                ->call('addTodo')
                ->assertCount('todos', 0)
                ->assertNotDispatched('todo-added');
        });

        it('does not add whitespace-only todo', function () {
            livue(TodoList::class)
                ->set('newTodo', '   ')
                ->call('addTodo')
                ->assertCount('todos', 0);
        });

    });

    describe('Chained Actions', function () {

        it('chains multiple method calls', function () {
            livue(TodoList::class)
                ->set('newTodo', 'First')
                ->call('addTodo')
                ->set('newTodo', 'Second')
                ->call('addTodo')
                ->set('newTodo', 'Third')
                ->call('addTodo')
                ->assertCount('todos', 3);
        });

        it('clears completed todos', function () {
            $testable = livue(TodoList::class)
                ->set('newTodo', 'Keep this')
                ->call('addTodo')
                ->set('newTodo', 'Complete this')
                ->call('addTodo');

            $todos = $testable->get('todos');
            $testable->call('toggleTodo', $todos[1]['id']);

            $testable
                ->call('clearCompleted')
                ->assertCount('todos', 1);

            $remainingTodos = $testable->get('todos');
            expect($remainingTodos[0]['text'])->toBe('Keep this');
        });

    });

});
