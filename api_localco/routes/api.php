<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\PsJuridicaController;
use App\Http\Controllers\PsFisicaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource( 'salas', SalaController::class);

Route::apiResource('juridico', PsJuridicaController::class);

Route::apiResource('psfisica', PsFisicaController::class);

Route::apiResource('cliente', ClienteController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// http://localhost:8080/laravel/api/salas
