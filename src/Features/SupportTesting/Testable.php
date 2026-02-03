<?php

namespace LiVue\Features\SupportTesting;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Auth;
use LiVue\Component;
use LiVue\Features\SupportHooks\HookRegistry;
use LiVue\Features\SupportRendering\ComponentRenderer;
use LiVue\LifecycleManager;
use LiVue\LiVueManager;
use LiVue\Security\StateChecksum;
use LiVue\Synthesizers\SynthesizerRegistry;

/**
 * Test harness for LiVue components.
 *
 * Wraps a component through the full server-side lifecycle (mount, hydrate,
 * method calls, dehydrate) and provides a fluent API for interactions and
 * assertions.
 *
 * Usage:
 *   LiVue::test(Counter::class)
 *       ->assertSee('0')
 *       ->call('increment')
 *       ->assertSet('count', 1)
 *       ->assertSee('1');
 */
class Testable
{
    use MakesAssertions;

    protected Component $component;
    protected string $lastRenderedHtml = '';
    protected array $lastSnapshot = [];
    protected array $lastResponse = [];
    protected LifecycleManager $lifecycle;
    protected LiVueManager $manager;
    protected SynthesizerRegistry $synthRegistry;
    protected HookRegistry $hookRegistry;

    /**
     * Query parameters to simulate for #[Url] properties.
     */
    protected array $queryParams = [];

    /**
     * Cookies to include in the simulated request.
     */
    protected array $cookies = [];

    /**
     * Headers to include in the simulated request.
     */
    protected array $headers = [];

    /**
     * Whether lazy loading is disabled for this test.
     */
    protected bool $lazyLoadingDisabled = false;

    /**
     * The last HTTP status code (for authorization assertions).
     */
    protected int $lastStatusCode = 200;

    /**
     * View data from the last render.
     */
    protected array $lastViewData = [];

    /**
     * Create a new Testable instance with setup options before mounting.
     * Use this static method for fluent setup before component instantiation.
     */
    public static function create(string $componentClass): static
    {
        // Create instance without mounting yet
        $instance = new static($componentClass, [], false);

        return $instance;
    }

    public function __construct(string $componentClass, array $params = [], bool $mountImmediately = true)
    {
        $this->manager = app(LiVueManager::class);
        $this->lifecycle = app(LifecycleManager::class);
        $this->synthRegistry = app(SynthesizerRegistry::class);
        $this->hookRegistry = app(HookRegistry::class);

        // Instantiate the component
        $this->component = new $componentClass();

        if ($mountImmediately) {
            $this->performMount($params);
        }
    }

    /**
     * Perform the mount and initial render.
     * Called automatically unless deferred via create().
     */
    protected function performMount(array $params = []): void
    {
        // Apply query params to request if set
        if (! empty($this->queryParams)) {
            request()->merge($this->queryParams);
        }

        $this->lifecycle->mount($this->component, $params);

        // Perform initial render and capture view data
        $renderer = new ComponentRenderer();
        $this->lastRenderedHtml = $renderer->renderInnerHtml($this->component);
        $this->lastViewData = $renderer->getLastViewData();

        // Build initial snapshot
        $this->buildSnapshot();
    }

    // -----------------------------------------------------------------
    //  Setup methods (call before mount via create())
    // -----------------------------------------------------------------

    /**
     * Set the authenticated user for the test.
     * Must be called before mount() when using create().
     */
    public function actingAs(Authenticatable $user, ?string $guard = null): static
    {
        Auth::guard($guard)->login($user);

        return $this;
    }

    /**
     * Set query parameters to simulate #[Url] property initialization.
     * Must be called before mount() when using create().
     */
    public function withQueryParams(array $params): static
    {
        $this->queryParams = array_merge($this->queryParams, $params);

        return $this;
    }

    /**
     * Set a cookie for the simulated request.
     */
    public function withCookie(string $name, string $value): static
    {
        $this->cookies[$name] = $value;
        request()->cookies->set($name, $value);

        return $this;
    }

    /**
     * Set cookies for the simulated request.
     */
    public function withCookies(array $cookies): static
    {
        foreach ($cookies as $name => $value) {
            $this->withCookie($name, $value);
        }

        return $this;
    }

    /**
     * Set headers for the simulated request.
     */
    public function withHeaders(array $headers): static
    {
        $this->headers = array_merge($this->headers, $headers);

        foreach ($headers as $name => $value) {
            request()->headers->set($name, $value);
        }

        return $this;
    }

    /**
     * Disable lazy loading for this test.
     * Lazy components will render immediately.
     */
    public function withoutLazyLoading(): static
    {
        $this->lazyLoadingDisabled = true;
        config(['livue.lazy_loading' => false]);

        return $this;
    }

    /**
     * Mount the component after setup (when using create()).
     */
    public function mount(array $params = []): static
    {
        $this->performMount($params);

        return $this;
    }

    // -----------------------------------------------------------------
    //  Interaction methods
    // -----------------------------------------------------------------

    /**
     * Set one or more properties, simulating v-model / client diffs.
     *
     * @param  string|array  $key    Property name, or associative array of key => value
     * @param  mixed         $value  Value when $key is a string
     */
    public function set(string|array $key, mixed $value = null): static
    {
        $diffs = is_array($key) ? $key : [$key => $value];

        return $this->sendUpdate(diffs: $diffs);
    }

    /**
     * Call a method on the component.
     */
    public function call(string $method, mixed ...$params): static
    {
        return $this->sendUpdate(method: $method, params: $params);
    }

    /**
     * Toggle a boolean property.
     */
    public function toggle(string $property): static
    {
        return $this->set($property, ! $this->get($property));
    }

    /**
     * Refresh the component (re-render without method call or diffs).
     */
    public function refresh(): static
    {
        return $this->sendUpdate();
    }

    /**
     * Dispatch an event to the component.
     * Finds the listener method and calls it.
     */
    public function dispatch(string $event, mixed ...$data): static
    {
        $listeners = $this->component->getListeners();
        $method = $listeners[$event] ?? null;

        if ($method !== null) {
            return $this->call($method, ...$data);
        }

        return $this;
    }

    // -----------------------------------------------------------------
    //  Internal lifecycle driver
    // -----------------------------------------------------------------

    /**
     * Simulate a full AJAX update cycle through LifecycleManager::processUpdate().
     */
    protected function sendUpdate(array $diffs = [], ?string $method = null, array $params = []): static
    {
        $componentName = $this->component->getName();
        $state = $this->lastSnapshot['state'];
        $memo = $this->lastSnapshot['memo'];

        // Create a fresh component instance for the update (like a real request)
        $componentClass = get_class($this->component);
        $component = new $componentClass();
        $component->id = $this->component->id;

        // Reset status code to success before the update
        $this->lastStatusCode = 200;

        try {
            $result = $this->lifecycle->processUpdate(
                $component,
                $componentName,
                $state,
                $memo,
                $diffs,
                $method,
                $params
            );

            $this->component = $component;
            $this->lastResponse = $result;

            // Parse the new snapshot from the response
            if (isset($result['snapshot'])) {
                $this->lastSnapshot = json_decode($result['snapshot'], true);
            }

            // Update rendered HTML if present
            if (isset($result['html'])) {
                $this->lastRenderedHtml = $result['html'];

                // Update view data from a fresh render
                $renderer = new ComponentRenderer();
                $renderer->renderInnerHtml($this->component);
                $this->lastViewData = $renderer->getLastViewData();
            }
        } catch (\Illuminate\Auth\Access\AuthorizationException $e) {
            $this->lastStatusCode = 403;
            $this->lastResponse = ['exception' => $e];
        } catch (\Illuminate\Auth\AuthenticationException $e) {
            $this->lastStatusCode = 401;
            $this->lastResponse = ['exception' => $e];
        } catch (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e) {
            $this->lastStatusCode = 404;
            $this->lastResponse = ['exception' => $e];
        } catch (\Symfony\Component\HttpKernel\Exception\HttpException $e) {
            $this->lastStatusCode = $e->getStatusCode();
            $this->lastResponse = ['exception' => $e];
        } catch (\BadMethodCallException $e) {
            // Method protection errors result in 403
            $this->lastStatusCode = 403;
            $this->lastResponse = ['exception' => $e];
        }

        return $this;
    }

    /**
     * Build the snapshot from current component state.
     * Mirrors the logic in ComponentRenderer::render().
     */
    protected function buildSnapshot(): void
    {
        $componentName = $this->component->getName();
        $rawState = $this->component->getState();
        $dehydratedState = $this->synthRegistry->dehydrateState($rawState);

        $computed = $this->component->getComputedValues();

        if (! empty($computed)) {
            $dehydratedComputed = $this->synthRegistry->dehydrateState($computed);
            $dehydratedState = array_merge($dehydratedState, $dehydratedComputed);
        }

        $checksum = StateChecksum::generate($componentName, $dehydratedState);

        $memo = ['name' => $componentName, 'checksum' => $checksum];

        if (! empty($computed)) {
            $memo['computed'] = array_keys($computed);
        }

        $listeners = $this->component->getListeners();

        if (! empty($listeners)) {
            $memo['listeners'] = $listeners;
        }

        $errors = $this->component->getErrorBag()->toArray();

        if (! empty($errors)) {
            $memo['errors'] = $errors;
        }

        // Collect memo contributions from feature hooks
        $featureMemo = $this->hookRegistry->collectMemo($this->component);
        $memo = array_merge($memo, $featureMemo);

        $this->lastSnapshot = ['state' => $dehydratedState, 'memo' => $memo];

        // Initialize lastResponse for assertions that check response data
        $this->lastResponse = [
            'snapshot' => json_encode($this->lastSnapshot),
        ];
    }

    // -----------------------------------------------------------------
    //  Accessors
    // -----------------------------------------------------------------

    /**
     * Get a property value from the live component.
     */
    public function get(string $property): mixed
    {
        return data_get($this->component, $property);
    }

    /**
     * Get the underlying component instance.
     */
    public function instance(): Component
    {
        return $this->component;
    }

    /**
     * Get the last rendered HTML.
     */
    public function html(): string
    {
        return $this->lastRenderedHtml;
    }

    /**
     * Get the last snapshot.
     */
    public function snapshot(): array
    {
        return $this->lastSnapshot;
    }

    /**
     * Get the last response from processUpdate.
     */
    public function response(): array
    {
        return $this->lastResponse;
    }

    /**
     * Magic property access for component properties.
     */
    public function __get(string $name): mixed
    {
        return $this->get($name);
    }

    // -----------------------------------------------------------------
    //  Form Object helpers
    // -----------------------------------------------------------------

    /**
     * Set multiple properties on a Form Object.
     *
     * @param  string $formProperty  The component property holding the Form
     * @param  array  $data          Key-value pairs to set
     */
    public function setForm(string $formProperty, array $data): static
    {
        $diffs = [];

        foreach ($data as $key => $value) {
            $diffs[$formProperty . '.' . $key] = $value;
        }

        return $this->set($diffs);
    }

    /**
     * Validate a Form Object by calling its validate() method.
     *
     * @param  string $formProperty  The component property holding the Form
     */
    public function validateForm(string $formProperty): static
    {
        $form = $this->get($formProperty);

        if ($form === null) {
            throw new \InvalidArgumentException(
                "Form property [{$formProperty}] does not exist on the component."
            );
        }

        if (! $form instanceof \LiVue\Form) {
            throw new \InvalidArgumentException(
                "Property [{$formProperty}] is not a Form instance."
            );
        }

        try {
            $form->validate();
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Validation failed, errors are already set on the form
        }

        return $this;
    }
}
