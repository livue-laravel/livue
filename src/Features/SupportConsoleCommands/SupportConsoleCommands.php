<?php

namespace LiVue\Features\SupportConsoleCommands;

use Illuminate\Console\Application as Artisan;
use LiVue\Console\MakeLiVueAttributeCommand;
use LiVue\Console\MakeLiVueCommand;
use LiVue\Console\MakeLiVueFormCommand;
use LiVue\Console\MakeLiVueLayoutCommand;
use LiVue\Console\MakeLiVueSynthCommand;
use LiVue\Features\SupportHooks\ComponentHook;

class SupportConsoleCommands extends ComponentHook
{
    public static function provide(): void
    {
        if (! app()->runningInConsole()) {
            return;
        }

        Artisan::starting(function (Artisan $artisan) {
            $artisan->resolveCommands([
                MakeLiVueCommand::class,
                MakeLiVueFormCommand::class,
                MakeLiVueLayoutCommand::class,
                MakeLiVueSynthCommand::class,
                MakeLiVueAttributeCommand::class,
            ]);
        });
    }
}
