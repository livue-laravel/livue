<?php

use LiVue\Features\SupportHead\HeadRenderer;
use LiVue\Tests\Fixtures\HeadMethodComponent;
use LiVue\Tests\Fixtures\HeadPropertyComponent;

describe('SupportHead', function () {

    describe('HandlesHead trait', function () {

        it('returns head from property', function () {
            $component = new HeadPropertyComponent();

            $head = $component->getHead();

            expect($head)->toBe([
                'description' => 'A test page description',
                'og:title' => 'Test OG Title',
                'twitter:card' => 'summary',
            ]);
        });

        it('returns head from method with priority over property', function () {
            $component = new HeadMethodComponent();

            $head = $component->getHead();

            expect($head)->toHaveKey('description', 'Dynamic description for Dynamic Title');
            expect($head)->toHaveKey('og:title', 'Dynamic Title');
            expect($head)->toHaveKey('canonical', 'https://example.com/page');
            expect($head)->toHaveKey('json-ld');
        });

        it('returns empty array by default', function () {
            $component = new \LiVue\Tests\Fixtures\Counter();

            expect($component->getHead())->toBe([]);
        });
    });

    describe('HeadRenderer', function () {

        it('renders meta name tags', function () {
            $html = HeadRenderer::render([
                'description' => 'My description',
                'robots' => 'index, follow',
            ]);

            expect($html)->toContain('<meta name="description" content="My description" data-livue-head>');
            expect($html)->toContain('<meta name="robots" content="index, follow" data-livue-head>');
        });

        it('renders OpenGraph meta property tags', function () {
            $html = HeadRenderer::render([
                'og:title' => 'OG Title',
                'og:image' => 'https://example.com/image.jpg',
                'article:author' => 'John Doe',
            ]);

            expect($html)->toContain('<meta property="og:title" content="OG Title" data-livue-head>');
            expect($html)->toContain('<meta property="og:image" content="https://example.com/image.jpg" data-livue-head>');
            expect($html)->toContain('<meta property="article:author" content="John Doe" data-livue-head>');
        });

        it('renders twitter meta as name attribute', function () {
            $html = HeadRenderer::render([
                'twitter:card' => 'summary_large_image',
                'twitter:title' => 'Twitter Title',
            ]);

            expect($html)->toContain('<meta name="twitter:card" content="summary_large_image" data-livue-head>');
            expect($html)->toContain('<meta name="twitter:title" content="Twitter Title" data-livue-head>');
        });

        it('renders canonical link tag', function () {
            $html = HeadRenderer::render([
                'canonical' => 'https://example.com/page',
            ]);

            expect($html)->toContain('<link rel="canonical" href="https://example.com/page" data-livue-head>');
        });

        it('renders json-ld script tag', function () {
            $html = HeadRenderer::render([
                'json-ld' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'Article',
                    'name' => 'Test Article',
                ],
            ]);

            expect($html)->toContain('<script type="application/ld+json" data-livue-head>');
            expect($html)->toContain('"@context":"https://schema.org"');
            expect($html)->toContain('"@type":"Article"');
        });

        it('returns empty string for empty array', function () {
            expect(HeadRenderer::render([]))->toBe('');
        });

        it('skips null values', function () {
            $html = HeadRenderer::render([
                'description' => 'Visible',
                'og:image' => null,
            ]);

            expect($html)->toContain('description');
            expect($html)->not->toContain('og:image');
        });

        it('escapes HTML entities in values', function () {
            $html = HeadRenderer::render([
                'description' => 'A "quoted" <value>',
            ]);

            expect($html)->toContain('A &quot;quoted&quot; &lt;value&gt;');
        });

        it('all elements have data-livue-head attribute', function () {
            $html = HeadRenderer::render([
                'description' => 'Test',
                'og:title' => 'Test',
                'canonical' => 'https://example.com',
                'json-ld' => ['@type' => 'Thing'],
            ]);

            $lines = array_filter(explode("\n", trim($html)));

            foreach ($lines as $line) {
                expect($line)->toContain('data-livue-head');
            }
        });
    });
});
