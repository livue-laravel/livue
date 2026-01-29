<?php

namespace LiVue\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
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

        // Pass route parameters to mount() via LifecycleManager
        $routeParams = $request->route()->parameters();
        unset($routeParams['_livue_component']);
        $lifecycle->mount($component, $routeParams);

        $renderer = new ComponentRenderer();
        $componentHtml = $renderer->render($component);

        $layout = $component->getLayout()
            ?? config('livue.layout', 'components.layouts.app');

        $title = $component->getTitle()
            ?? config('app.name', 'LiVue');

        return view($layout, [
            'slot' => $componentHtml,
            'title' => $title,
        ]);
    }
}
