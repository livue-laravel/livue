<?php

describe('asset cache headers', function () {

    it('serves the bundle with revalidation instead of a long immutable cache', function () {
        $response = $this->get('/livue/livue.js');

        $response->assertOk();

        $cacheControl = $response->headers->get('Cache-Control');

        // The bundle lives at a fixed URL (no content hash), so it must be
        // revalidated on every load — otherwise a plugin update never reaches
        // clients. Guard against a regression to a long immutable max-age.
        expect($cacheControl)->toContain('no-cache')
            ->and($cacheControl)->not->toContain('max-age=31536000');

        expect($response->headers->get('ETag'))->not->toBeEmpty();
    });

    it('returns 304 when the client presents a matching ETag', function () {
        $etag = $this->get('/livue/livue.js')->headers->get('ETag');

        $this->get('/livue/livue.js', ['If-None-Match' => $etag])
            ->assertStatus(304);
    });
});
