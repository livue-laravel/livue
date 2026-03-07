<?php

namespace LiVue\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\HtmlString;
use LiVue\LifecycleManager;
use LiVue\LiVueManager;
use LiVue\Features\SupportRendering\ComponentRenderer;

class LiVuePageController extends Controller
{
    public function __invoke(
        Request $request,
        LiVueManager $manager,
        LifecycleManager $lifecycle
    ) {
        $componentIdentifier = $request->route()->defaults['_livue_component'];

        // Support both class names and component names
        if (class_exists($componentIdentifier)) {
            $component = $manager->resolveByClass($componentIdentifier);
        } else {
            $component = $manager->resolve($componentIdentifier);
        }

        // Pass route parameters to mount() via LifecycleManager.
        // Filter out internal defaults (prefixed with _) — these are metadata
        // for the framework (e.g. _livue_component, _resource, _panel),
        // not parameters for the component's mount() method.
        $routeParams = array_filter(
            $request->route()->parameters(),
            fn ($key) => ! str_starts_with($key, '_'),
            ARRAY_FILTER_USE_KEY,
        );
        $lifecycle->mount($component, $routeParams);

        // If mount() triggered a redirect, issue an HTTP redirect
        // instead of rendering the page.
        $redirect = $component->getRedirect();
        if ($redirect !== null) {
            return redirect()->to($redirect['url']);
        }

        $renderer = new ComponentRenderer();
        try {
            $componentHtml = $renderer->render($component);
        } catch (\Throwable $e) {
            $componentName = $component->getName();
            \Illuminate\Support\Facades\Log::error('LiVue render exception', [
                'component' => $componentName,
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            $componentHtml = ComponentRenderer::renderErrorHtml($e, $componentName);
        }

        $layout = $component->getLayout()
            ?? config('livue.layout', 'components.layouts.app');

        $title = $component->getTitle()
            ?? config('app.name', 'LiVue');

        $head = $component->getHead();

        $layoutData = $component->getLayoutData();

        return view($layout, array_merge([
            'slot' => new HtmlString($componentHtml),
            'title' => $title,
            'head' => $head,
        ], $layoutData));
    }
}
