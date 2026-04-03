<?php

use App\Http\Controllers\PedidoController;
use App\Http\Controllers\SalaController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;

/*
| Contrato com o frontend: ver docs/API_CONTRACT.md
*/

Route::post('/register', [UsuarioController::class, 'register']);
Route::post('/login', [UsuarioController::class, 'login']);

Route::get('/salas', [SalaController::class, 'index']);
Route::get('/salas/{id}', [SalaController::class, 'show']);
Route::get('/salas/{id}/calendario', [PedidoController::class, 'calendarioDisponibilidade']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [UsuarioController::class, 'logout']);

    Route::post('/pedido', [PedidoController::class, 'store']);
    Route::delete('/pedido/{id_pedido}', [PedidoController::class, 'destroy']);
    Route::get('/meus-agendamentos', [PedidoController::class, 'meusAgendamentos']);
});
