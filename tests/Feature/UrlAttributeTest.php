<?php

use Illuminate\Http\Request;
use LiVue\Tests\Fixtures\UrlBound;

/**
 * Put a query string in front of the component.
 *
 * `null` and not `''` on purpose: that is what the component actually receives, because
 * Laravel's ConvertEmptyStringsToNull rewrites `?q=` before anyone looks at it.
 */
function withQuery(array $query): void
{
    app()->instance('request', Request::create('/probe', 'GET', $query));
}

describe('Url attribute', function () {

    /**
     * An empty query parameter arrives as null, not as an empty string.
     *
     * Laravel's ConvertEmptyStringsToNull rewrites `?q=` to null before the component sees
     * it. Assigning that to a typed non-nullable property is a TypeError — a 500 on a URL
     * anyone can produce by submitting a search form with the box empty.
     */
    it('does not blow up on an empty query parameter', function () {
        withQuery(['q' => null]);

        $component = livue(UrlBound::class)->instance();

        expect($component->q)->toBe('');
    });

    it('keeps the declared default instead of inventing a value', function () {
        withQuery(['kind' => null]);

        // Forcing '' would erase a default like `public string $kind = 'artist'`. An empty
        // parameter says "I chose nothing", and the default is exactly what holds then.
        expect(livue(UrlBound::class)->instance()->kind)->toBe('artist');
    });

    it('still assigns null where the property accepts it', function () {
        withQuery(['optional' => null]);

        // The guard is about types, not about null being unwelcome: a nullable property
        // asked for null gets null.
        expect(livue(UrlBound::class)->instance()->optional)->toBeNull();
    });

    it('still reads a value that is there', function () {
        withQuery(['q' => 'retro', 'page' => '3']);

        $component = livue(UrlBound::class)->instance();

        expect($component->q)->toBe('retro')
            ->and($component->page)->toBe(3);
    });
});
