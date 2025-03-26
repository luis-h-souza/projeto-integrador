<?php

namespace App\Http\Controllers;

use App\Models\Salas;
use Illuminate\Http\Request;

class SalaController extends Controller
{
    public function index() {
        return Salas::all();
    }

    public function store(Request $request)
{
    $data = $request->validate([
        'tipo_sala' => 'required|string|max:50',
        'descricao_sala' => 'required|string',
        'capac_pessoas' => 'required|integer',
        'preco_base' => 'required|numeric',
        'foto' => 'required'
    ]);

    $salas = Salas::create($data);
    return response()->json($salas, 201);
}

public function show($id_sala_pk){
    $salas = Salas::find($id_sala_pk);
    if (!$salas){
        return response()->json(["error" => "Sala não encontrada"], 404);
    }
    return $salas;
}

public function update(Request $request, $id_sala_pk){
    $salas = Salas::find($id_sala_pk);
    if(!$salas){
        return response()->json(["error"=> "Sala não encontrada"],404);
    }

    $data = $request->validate([
        'tipo_sala' => 'required|string|max:50',
        'descricao_sala' => 'required|string',
        'capac_pessoas' => 'required|integer',
        'preco_base' => 'required|numeric',
        'foto' => 'required'
    ]);

    $salas->update($data);
    return response()->json(null, 200);
}

public function destroy($id_sala_pk){
    $salas = Salas::find($id_sala_pk);
    if(!$salas){
        return response()->json(['error'=> 'Sala não encontrada'],404);
    }
    $salas->delete();
    return response()->json(["message" => "Sala deletada com sucesso"], 200);
}
}
