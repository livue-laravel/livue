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

        $renderer = new ComponentRenderer();
        $componentHtml = $renderer->render($component);

        $layout = $component->getLayout()
            ?? config('livue.layout', 'components.layouts.app');

        $title = $component->getTitle()
            ?? config('app.name', 'LiVue');

        $head = $component->getHead();

        return view($layout, [
            'slot' => new HtmlString($componentHtml),
            'title' => $title,
            'head' => $head,
        ]);
    }
}
