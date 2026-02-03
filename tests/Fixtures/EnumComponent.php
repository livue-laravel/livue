<?php

namespace LiVue\Tests\Fixtures;

use LiVue\Component;

enum PostStatus: string
{
    case Draft = 'draft';
    case Published = 'published';
    case Archived = 'archived';
}

enum Priority: int
{
    case Low = 1;
    case Medium = 2;
    case High = 3;
}

class EnumComponent extends Component
{
    public PostStatus $status = PostStatus::Draft;

    public Priority $priority = Priority::Low;

    public function publish(): void
    {
        $this->status = PostStatus::Published;
    }

    public function archive(): void
    {
        $this->status = PostStatus::Archived;
    }

    public function setPriority(int $value): void
    {
        $this->priority = Priority::from($value);
    }

    public function render(): string
    {
        return 'fixtures.enum-component';
    }
}
