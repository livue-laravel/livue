<?php

namespace LiVue\Features\SupportHead;

/**
 * Renders head element arrays into HTML tags.
 *
 * All rendered elements include the data-livue-head attribute
 * so the SPA navigation system can identify and update them
 * during client-side transitions.
 */
class HeadRenderer
{
    /**
     * Open Graph property prefixes that use <meta property="..."> instead of <meta name="...">.
     */
    protected const OG_PREFIXES = [
        'og:',
        'article:',
        'music:',
        'video:',
        'book:',
        'profile:',
    ];

    /**
     * Render a head array into HTML tags.
     *
     * @param  array<string, mixed>  $head
     * @return string
     */
    public static function render(array $head): string
    {
        if (empty($head)) {
            return '';
        }

        $html = '';

        foreach ($head as $key => $value) {
            if ($value === null) {
                continue;
            }

            $html .= static::renderElement($key, $value);
        }

        return $html;
    }

    /**
     * Render a single head element by key.
     */
    protected static function renderElement(string $key, mixed $value): string
    {
        if ($key === 'canonical') {
            return '<link rel="canonical" href="' . e($value) . '" data-livue-head>' . "\n";
        }

        if ($key === 'json-ld') {
            $json = is_string($value) ? $value : json_encode($value, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

            return '<script type="application/ld+json" data-livue-head>' . $json . '</script>' . "\n";
        }

        if (static::isOpenGraphProperty($key)) {
            return '<meta property="' . e($key) . '" content="' . e($value) . '" data-livue-head>' . "\n";
        }

        return '<meta name="' . e($key) . '" content="' . e($value) . '" data-livue-head>' . "\n";
    }

    /**
     * Determine if a key represents an Open Graph property.
     */
    protected static function isOpenGraphProperty(string $key): bool
    {
        foreach (static::OG_PREFIXES as $prefix) {
            if (str_starts_with($key, $prefix)) {
                return true;
            }
        }

        return false;
    }
}
