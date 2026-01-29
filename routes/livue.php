<?php

use Illuminate\Support\Facades\Route;
use LiVue\Http\Controllers\LiVueUpdateController;

Route::post('/update', LiVueUpdateController::class)->name('livue.update');
