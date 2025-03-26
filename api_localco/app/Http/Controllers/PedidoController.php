<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PedidoController extends Controller
{

    public function index(){
        return Pedido::with("salas", "cliente")->get();
    }

    public function show($id_pedido){
        $pedido = Pedido::with("salas", "cliente")->find($id_pedido);
        if(!$pedido){
            return response()->json(["error" => "Pedido não encontrado"], 404);
        }
        return $pedido;
    }

    public function store(Request $request){
        $data = $request->validate([
             "id_sala_fk" => "required|integer",
             "id_cliente_fk" => "required|integer",
             "forma_pg" => "required|max:100",
             "data_entrada" => "required|date",
             "data_saida" => "required|date"
        ]);

        $pedido = Pedido::create($data);
        return response()->json($pedido, 201);
    }

    public function update(Request $request, $id_pedido){
        $pedido = Pedido::find($id_pedido);
        if(!$pedido){
            return response()->json(["error"=> "Pedido não encontrado"],404);
        }
        $data = $request->validate([
          
             "id_sala_fk" => "required|integer",
             "id_cliente_fk" => "required|integer",
             "forma_pg" => "required|max:100",
             "data_entrada" => "required|date",
             "data_saida" => "required|date"
        ]);

        $pedido->update($data);
        return response()->json(null, 204);
    }

    public function destroy($id_pedido){
        $pedido = Pedido::find($id_pedido);
        if(!$pedido){
            return response()->json(["error"=> "Pedido não encontrado"],404);
        }

        $pedido->delete();
        return response()->json(["message" => "Pedido deletado com sucesso"], 200);
    }
}
