<?php

namespace LiVue\Features\SupportUrl;

use Attribute;
use LiVue\Attribute as LiVueAttribute;
use ReflectionClass;
use ReflectionNamedType;

/**
 * Bind a component property to the URL query string.
 *
 * Changes to the property update the URL, and the URL initializes the property on page load.
 *
 * Options:
 *   - as: Alias for the query parameter name (default: property name)
 *   - history: Use pushState instead of replaceState (adds browser history entries)
 *   - keep: Always show in URL, even when empty
 *   - except: Value to exclude from URL (when the property equals this value, remove the param)
 *
 * Example:
 *   #[Url]
 *   public string $search = '';
 *
 *   #[Url(as: 'q', history: true)]
 *   public string $query = '';
 *
 *   #[Url(except: 'all')]
 *   public string $filter = 'all';
 */
#[Attribute(Attribute::TARGET_PROPERTY)]
class BaseUrl extends LiVueAttribute
{
    public function __construct(
        public ?string $as = null,
        public bool $history = false,
        public bool $keep = false,
        public mixed $except = null,
    ) {}

    /**
     * On mount: initialize property from URL query parameter.
     */
    public function mount(array $params): void
    {
        $paramName = $this->as ?? $this->getName();
        $query = request()->query();

        if (! array_key_exists($paramName, $query)) {
            return;
        }

        $raw = $query[$paramName];

        // `?q=` arriva qui come **null**, non come stringa vuota: Laravel converte le
        // stringhe vuote della richiesta con `ConvertEmptyStringsToNull`. Assegnarlo a una
        // proprieta' tipizzata non nullable e' un `TypeError`, cioe' un 500 su un indirizzo
        // che chiunque puo' produrre premendo «cerca» con la casella vuota.
        //
        // Si tiene il valore dichiarato invece di inventarne uno: un parametro vuoto dice
        // «non ho scelto niente», e il valore predefinito e' esattamente cio' che vale
        // quando non si e' scelto — mentre forzare `''` cancellerebbe un default come
        // `public string $kind = 'artist'`.
        if ($raw === null && ! $this->propertyAllowsNull()) {
            return;
        }

        $this->setValue($this->castQueryValue($raw));
    }

    /**
     * Contribute URL parameter config to snapshot memo.
     */
    public function dehydrateMemo(): array
    {
        return ['urlParams' => [
            $this->getName() => [
                'as' => $this->as,
                'history' => $this->history,
                'keep' => $this->keep,
                'except' => $this->except,
            ],
        ]];
    }

    /**
     * Cast a query string value to the property's PHP type.
     */
    /** Se la proprieta' accetta `null`: senza, un parametro vuoto non le si puo' dare. */
    private function propertyAllowsNull(): bool
    {
        $reflection = new ReflectionClass($this->getComponent());
        $property = $this->getName();

        if (! $reflection->hasProperty($property)) {
            return true;
        }

        $type = $reflection->getProperty($property)->getType();

        // Senza tipo dichiarato tutto e' ammesso, `null` compreso.
        return $type === null || $type->allowsNull();
    }

    private function castQueryValue(mixed $value): mixed
    {
        $component = $this->getComponent();
        $property = $this->getName();
        $reflection = new ReflectionClass($component);

        if (! $reflection->hasProperty($property)) {
            return $value;
        }

        $type = $reflection->getProperty($property)->getType();

        if (! $type instanceof ReflectionNamedType) {
            return $value;
        }

        $typeName = $type->getName();

        return match ($typeName) {
            'int', 'integer' => (int) $value,
            'float', 'double' => (float) $value,
            'bool', 'boolean' => filter_var($value, FILTER_VALIDATE_BOOLEAN),
            'array' => is_array($value) ? $value : [$value],
            default => $value,
        };
    }
}
