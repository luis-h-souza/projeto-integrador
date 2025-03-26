<?php

use App\Http\Controllers\ClienteController;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\PsJuridicaController;
use App\Http\Controllers\PsFisicaController;
use App\http\Controllers\UsuarioController;
use App\http\Controllers\PedidoController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [UsuarioController::class,'register']);
Route::post('/login', [UsuarioController::class, 'login']);

Route::middleware('auth:api')->group(function (){
    Route::post('/logout', [UsuarioController::class, 'logout']);
    
    Route::apiResource('cliente', ClienteController::class);
    Route::apiResource('psfisica', PsFisicaController::class);
    Route::apiResource('juridico', PsJuridicaController::class);
    Route::apiResource( 'salas', SalaController::class);
    
    
    

    Route::apiResource('pedido', PedidoController::class);
});
    


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// http://localhost:8080/laravel/api/salas
