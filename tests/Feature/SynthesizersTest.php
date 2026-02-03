<?php

use Carbon\Carbon;
use Carbon\CarbonImmutable;
use LiVue\Tests\Fixtures\CarbonComponent;
use LiVue\Tests\Fixtures\CollectionComponent;
use LiVue\Tests\Fixtures\EnumComponent;
use LiVue\Tests\Fixtures\PostStatus;
use LiVue\Tests\Fixtures\Priority;

describe('Synthesizers', function () {

    describe('Enums', function () {

        it('initializes with default enum value', function () {
            $testable = livue(EnumComponent::class);

            expect($testable->instance()->status)->toBe(PostStatus::Draft);
            expect($testable->instance()->priority)->toBe(Priority::Low);
        });

        it('updates enum via method', function () {
            $testable = livue(EnumComponent::class)
                ->call('publish');

            expect($testable->instance()->status)->toBe(PostStatus::Published);
        });

        it('preserves enum across request cycles', function () {
            $testable = livue(EnumComponent::class)
                ->call('publish')
                ->call('archive');

            expect($testable->instance()->status)->toBe(PostStatus::Archived);
        });

        it('dehydrates enum to value in snapshot', function () {
            $testable = livue(EnumComponent::class)
                ->call('publish');

            $snapshot = $testable->snapshot();

            // Should be dehydrated to the enum value
            expect($snapshot['state']['status'][0])->toBe('published');
        });

        it('handles int-backed enum', function () {
            $testable = livue(EnumComponent::class)
                ->call('setPriority', 3);

            expect($testable->instance()->priority)->toBe(Priority::High);
        });

        it('renders enum value in view', function () {
            livue(EnumComponent::class)
                ->assertSee('draft')
                ->call('publish')
                ->assertSee('published');
        });

    });

    describe('Carbon', function () {

        it('initializes with null Carbon', function () {
            $testable = livue(CarbonComponent::class);

            expect($testable->instance()->publishedAt)->toBeNull();
            expect($testable->instance()->createdAt)->toBeNull();
        });

        it('sets Carbon from string', function () {
            $testable = livue(CarbonComponent::class)
                ->call('setPublishedAt', '2024-01-15 10:30:00');

            expect($testable->instance()->publishedAt)->toBeInstanceOf(Carbon::class);
            expect($testable->instance()->publishedAt->toDateString())->toBe('2024-01-15');
        });

        it('preserves Carbon across request cycles', function () {
            $testable = livue(CarbonComponent::class)
                ->call('setPublishedAt', '2024-01-15 10:30:00')
                ->call('modifyPublishedAt');

            expect($testable->instance()->publishedAt->toDateString())->toBe('2024-01-16');
        });

        it('handles CarbonImmutable', function () {
            $testable = livue(CarbonComponent::class)
                ->call('setCreatedAt', '2024-06-01 12:00:00');

            expect($testable->instance()->createdAt)->toBeInstanceOf(CarbonImmutable::class);
            expect($testable->instance()->createdAt->toDateString())->toBe('2024-06-01');
        });

        it('clears Carbon to null', function () {
            $testable = livue(CarbonComponent::class)
                ->call('setPublishedAt', '2024-01-15 10:30:00')
                ->call('clearPublishedAt');

            expect($testable->instance()->publishedAt)->toBeNull();
        });

        it('dehydrates Carbon to ISO string in snapshot', function () {
            $testable = livue(CarbonComponent::class)
                ->call('setPublishedAt', '2024-01-15 10:30:00');

            $snapshot = $testable->snapshot();

            // Should be a tuple with ISO string and synthesizer meta
            expect($snapshot['state']['publishedAt'][0])->toContain('2024-01-15');
            expect($snapshot['state']['publishedAt'][1]['s'])->toBe('crb');
        });

    });

    describe('Collections', function () {

        it('initializes with empty collection', function () {
            $testable = livue(CollectionComponent::class);

            expect($testable->instance()->items)->toBeInstanceOf(\Illuminate\Support\Collection::class);
            expect($testable->instance()->items->count())->toBe(0);
        });

        it('adds items to collection', function () {
            $testable = livue(CollectionComponent::class)
                ->call('addItem', 'First')
                ->call('addItem', 'Second');

            expect($testable->instance()->items->count())->toBe(2);
        });

        it('preserves collection across request cycles', function () {
            $testable = livue(CollectionComponent::class)
                ->call('addItem', 'First')
                ->call('addItem', 'Second')
                ->call('addItem', 'Third');

            expect($testable->instance()->items->count())->toBe(3);
        });

        it('modifies collection items', function () {
            $testable = livue(CollectionComponent::class)
                ->call('addItem', 'Task')
                ->call('markComplete', 0);

            $item = $testable->instance()->items->first();
            expect($item['completed'])->toBe(true);
        });

        it('clears collection', function () {
            $testable = livue(CollectionComponent::class)
                ->call('addItem', 'First')
                ->call('addItem', 'Second')
                ->call('clearItems');

            expect($testable->instance()->items->count())->toBe(0);
        });

        it('sets collection from array', function () {
            $testable = livue(CollectionComponent::class)
                ->call('setItems', [
                    ['name' => 'A', 'completed' => false],
                    ['name' => 'B', 'completed' => true],
                ]);

            expect($testable->instance()->items->count())->toBe(2);
        });

        it('dehydrates collection to array in snapshot', function () {
            $testable = livue(CollectionComponent::class)
                ->call('addItem', 'Test');

            $snapshot = $testable->snapshot();

            // Should be a tuple with array and synthesizer meta
            expect($snapshot['state']['items'][0])->toBeArray();
            expect($snapshot['state']['items'][1]['s'])->toBe('clc');
        });

        it('renders collection in view', function () {
            livue(CollectionComponent::class)
                ->call('addItem', 'Task One')
                ->call('addItem', 'Task Two')
                ->assertSee('2 items')
                ->assertSee('Task One')
                ->assertSee('Task Two');
        });

    });

});
