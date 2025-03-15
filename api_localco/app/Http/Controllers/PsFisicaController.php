<?php

namespace App\Http\Controllers;

use App\Models\PsFisica;
use Illuminate\Http\Request;

class PsFisicaController extends Controller
{
    public function index(){
        return PsFisica::all();
    }

    public function store(Request $request){
        $data = $request->validate([
            "cpf" => 'required|max:20'
        ]);

        $fisica = PsFisica::create($data);
        return response()->json($fisica, 201);
    }

    public function show($id_fisico_pk){
        $fisico = PsFisica::find($id_fisico_pk);
        if (!$fisico){
            return response()->json(["error" => "Cpf não encontrado"], 404);
        }
        return $fisico;
    }

    public function update(Request $request, $id_fisico_pk){
        $fisico = PsFisica::find($id_fisico_pk);
        if (!$fisico){
            return response()->json(["error"=> "Cpf não encontrado"],404);
        }

        $data = $request->validate([
            'cpf' => 'required|max:20'
        ]);

        $fisico->update($data);
        return response()->json(null, 200);
    }

    public function destroy($id_fisico_pk){
        $fisico = PsFisica::find($id_fisico_pk);
        if (!$fisico){
            return response()->json(['error'=> 'Cpf não encontrado'],404);
        }
        $fisico->delete();
        return response()->json(["message" => "Excluido com sucesso"], 200);
    }
}