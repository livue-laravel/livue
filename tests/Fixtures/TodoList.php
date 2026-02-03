<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

class TodoList extends Component
{
    public array $todos = [];
    public string $newTodo = '';

    public function addTodo(): void
    {
        if (trim($this->newTodo) !== '') {
            $this->todos[] = [
                'id' => uniqid(),
                'text' => $this->newTodo,
                'completed' => false,
            ];
            $this->newTodo = '';
            $this->dispatch('todo-added');
        }
    }

    public function toggleTodo(string $id): void
    {
        foreach ($this->todos as &$todo) {
            if ($todo['id'] === $id) {
                $todo['completed'] = !$todo['completed'];
                break;
            }
        }
    }

    public function removeTodo(string $id): void
    {
        $this->todos = array_values(array_filter(
            $this->todos,
            fn($todo) => $todo['id'] !== $id
        ));
        $this->dispatch('todo-removed', ['id' => $id]);
    }

    public function clearCompleted(): void
    {
        $this->todos = array_values(array_filter(
            $this->todos,
            fn($todo) => !$todo['completed']
        ));
    }

    public function render(): string
    {
        return 'fixtures.todo-list';
    }
}
