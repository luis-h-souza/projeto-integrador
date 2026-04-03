<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function index()
    {
        return Cliente::with("psfisica", "juridico", "usuario")->get();
    }

    public function show($id_cliente_pk)
    {
        $cliente = Cliente::with("psfisica", "juridico", "usuario")->find($id_cliente_pk);
        if (!$cliente) {
            return response()->json(["error" => "Cliente não encontrado"], 404);
        }
        return $cliente;
    }

    public function store(Request $request)
    {
        $data = $request->validate([

            "id_usuario_fk" => "required|integer",
            "telefone" => "nullable|max:20",
            "celular" => "nullable|max:20",
            "rua" => "nullable|max:250",
            "bairro" => "nullable|max:250",
            "numero" => "nullable|max:10",
            "complemento" => "nullable|max:50",
            "cidade" => "nullable|max:100",
            "estado" => "nullable|max:50",
            "pais" => "nullable|max:50",
            "id_fisico_fk" => "nullable|integer",
            "id_juridico_fk" => "nullable|integer",

        ]);

        $cliente = Cliente::create($data);
        return response()->json($cliente, 201);
    }

    public function update(Request $request, $id_cliente_pk)
    {
        $cliente = Cliente::find($id_cliente_pk);
        if (!$cliente) {
            return response()->json(["error" => "Cliente não encontrado"], 404);
        }

        $data = $request->validate([
            "id_usuario_fk" => "required|integer",
            "telefone" => "nullable|max:20",
            "celular" => "nullable|max:20",
            "rua" => "nullable|max:250",
            "bairro" => "nullable|max:250",
            "numero" => "nullable|max:10",
            "complemento" => "nullable|max:50",
            "cidade" => "nullable|max:100",
            "estado" => "nullable|max:50",
            "pais" => "nullable|max:50",
            "id_fisico_fk" => "nullable|integer",
            "id_juridico_fk" => "nullable|integer",

        ]);

        $cliente->update($data);
        return response()->json(null, 204);

    }

    public function destroy($id_cliente_pk)
    {
        $cliente = Cliente::find($id_cliente_pk);
        if (!$cliente) {
            return response()->json(["error" => "Cliente não encontrado"], 404);
        }

        $cliente->delete();
        return response()->json(["message" => "Cliente deletado com sucesso"], 200);
    }
}
