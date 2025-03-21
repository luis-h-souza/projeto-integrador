<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use PHPUnit\Framework\MockObject\Stub\ReturnStub;

class ClienteController extends Controller
{
    public function index()
    {
        return Cliente::with("psfisica", "juridico")->get();
    }

    public function show($id_cliente_pk)
    {
        $cliente = Cliente::with("psfisica", "juridico")->find($id_cliente_pk);
        if (!$cliente) {
            return response()->json(["error" => "Cliente não encontrado"], 404);
        }
        return $cliente;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            "email" => "required|max:200",
            "telefone" => "required|max:20",
            "celular" => "required|max:20",
            "nome" => "required|max:100",
            "usuario" => "required|max:100",
            "senha" => "required|max:100",
            "rua" => "required|max:250",
            "bairro" => "required|max:250",
            "numero" => "required|max:10",
            "complemento" => "required|max:50",
            "cidade" => "required|max:100",
            "estado" => "required|max:50",
            "pais" => "required|max:50",
            "id_fisico_fk" => "required|integer",
            "id_juridico_fk" => "required|integer",

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
            "email" => "required|max:200",
            "telefone" => "required|max:20",
            "celular" => "required|max:20",
            "nome" => "required|max:100",
            "usuario" => "required|max:100",
            "senha" => "required|max:100",
            "rua" => "required|max:250",
            "bairro" => "required|max:250",
            "numero" => "required|max:10",
            "complemento" => "required|max:50",
            "cidade" => "required|max:100",
            "estado" => "required|max:50",
            "pais" => "required|max:50",
            "id_fisico_fk" => "required|integer",
            "id_juridico_fk" => "required|integer",

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
