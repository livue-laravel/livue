<?php

use LiVue\Facades\LiVue;
use LiVue\Tests\Fixtures\NoInheritAttrsCounter;
use LiVue\Tests\Fixtures\PlainCounter;

describe('Fallthrough Attributes', function () {

    describe('inheritsAttrs = true (default)', function () {

        it('merges fallthrough class with template class on root', function () {
            $html = LiVue::renderComponent(PlainCounter::class, ['class' => 'bg-red']);

            expect($html)->toMatch('/<div\b[^>]*class="root-class bg-red"/');
        });

        it('merges fallthrough style with template style', function () {
            $html = LiVue::renderComponent(PlainCounter::class, ['style' => 'color: red']);

            expect($html)->toMatch('/<div\b[^>]*style="padding: 4px;color: red"/');
        });

        it('keeps existing root id when fallthrough id is provided (existing wins)', function () {
            $html = LiVue::renderComponent(PlainCounter::class, ['id' => 'fallthrough-id']);

            expect($html)
                ->toContain('id="template-id"')
                ->not->toContain('id="fallthrough-id"');
        });

        it('appends data-* attribute when not present on root', function () {
            $html = LiVue::renderComponent(PlainCounter::class, ['data-test' => 'hello']);

            expect($html)->toContain('data-test="hello"');
        });

        it('appends aria-* attribute when not present on root', function () {
            $html = LiVue::renderComponent(PlainCounter::class, ['aria-label' => 'counter']);

            expect($html)->toContain('aria-label="counter"');
        });

        it('emits boolean true attributes name-only', function () {
            $html = LiVue::renderComponent(PlainCounter::class, ['hidden' => true]);

            expect($html)->toMatch('/<div\b[^>]*\shidden(\s|>)/');
        });

        it('skips false / null fallthrough values', function () {
            $html = LiVue::renderComponent(PlainCounter::class, [
                'data-on' => false,
                'data-off' => null,
            ]);

            expect($html)
                ->not->toContain('data-on')
                ->not->toContain('data-off');
        });

        it('does NOT treat real props as fallthrough attributes', function () {
            $html = LiVue::renderComponent(PlainCounter::class, [
                'count' => 42,
                'class' => 'bg-blue',
            ]);

            expect($html)
                ->toMatch('/<div\b[^>]*class="root-class bg-blue"/')
                ->not->toMatch('/<div\b[^>]*\bcount=/')
                ->toContain('<span>42</span>');
        });

        it('escapes special characters in fallthrough attribute values', function () {
            $html = LiVue::renderComponent(PlainCounter::class, [
                'data-payload' => '<script>"x"</script>',
            ]);

            expect($html)
                ->toContain('data-payload="&lt;script&gt;&quot;x&quot;&lt;/script&gt;"')
                ->not->toContain('<script>"x"</script>');
        });

    });

    describe('inheritsAttrs = false (opt-out)', function () {

        it('does NOT merge fallthrough attributes onto the root tag', function () {
            $html = LiVue::renderComponent(NoInheritAttrsCounter::class, ['class' => 'bg-red']);

            // The root <div> in the template has no class attr — fallthrough should not add one to it.
            expect($html)->not->toMatch('/<div\b[^>]*\bclass="bg-red"/');
        });

        it('exposes $attributes bag inside the view for explicit placement', function () {
            $html = LiVue::renderComponent(NoInheritAttrsCounter::class, [
                'class' => 'bg-red',
                'data-test' => 'x',
            ]);

            // The <input> in the template renders {{ $attributes }} — bag must include both.
            expect($html)
                ->toMatch('/<input\b[^>]*class="bg-red"[^>]*\/>/')
                ->toMatch('/<input\b[^>]*data-test="x"[^>]*\/>/');
        });

    });

});
