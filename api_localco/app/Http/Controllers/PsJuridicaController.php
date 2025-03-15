<?php

namespace App\Http\Controllers;

use App\Models\PsJuridica;
use Illuminate\Http\Request;

class PsJuridicaController extends Controller
{
    public function index(){
        return PsJuridica::all();
    }

    public function store(Request $request){
        $data = $request->validate([
            'cnpj' => 'required|max:20',
        ]);

        $juridico = PsJuridica::create($data);
        return response()->json($juridico, 201);
    }

    public function show($id_juridico_pk){
        $juridico = PsJuridica::find($id_juridico_pk);
        if (! $juridico){
        return response()->json(["error" => "Pessoa juridica não encontrada"],404);
        }

        return $juridico;
    }

    public function update(Request $request, $id_juridico_pk){
        $juridico = PsJuridica::find($id_juridico_pk);
        if(!$juridico){
            return response()->json(["error"=> "Cnpj não encontrado"],404);
        }

        $data = $request->validate([
            'cnpj' => 'required|max:20',
        ]);

        $juridico->update($data);
        return response()->json(null, 200);
    }

    public function destroy($id_juridico_pk){
        $juridico = PsJuridica::find($id_juridico_pk);
        if(!$juridico){
            return response()->json(['error'=> 'Cnjp não encontrado'],200);
        }
    }

}
