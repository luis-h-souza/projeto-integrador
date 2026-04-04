<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Usuario;
use App\Models\Cliente;
use App\Models\Salas;
use App\Mail\AgendamentoConfirmado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class PedidoController extends Controller
{
    /**
     * Obtém o cliente a partir do token de autenticação
     */
    private function obterClienteDoToken(Request $request){
        $token = $request->bearerToken();
        if (!$token) {
            return null;
        }

        $usuario = Usuario::where('api_token', $token)->first();
        if (!$usuario) {
            return null;
        }

        $cliente = Cliente::where('id_usuario_fk', $usuario->id)->first();
        return $cliente;
    }

    /**
     * Calcula o preço total baseado no período e preço da sala
     */
    private function calcularPrecoTotal($idSala, $dataEntrada, $dataSaida){
        $sala = Salas::find($idSala);
        if (!$sala) {
            return 0;
        }

        $dataInicio = Carbon::parse($dataEntrada);
        $dataFim = Carbon::parse($dataSaida);

        // Calcula a diferença em dias
        $dias = $dataInicio->diffInDays($dataFim);

        // Se for o mesmo dia, considera 1 dia
        if ($dias == 0) {
            $dias = 1;
        }

        // Preço base por dia
        $precoBase = $sala->preco_base;

        // Calcula o preço total
        $precoTotal = $precoBase * $dias;

        return round($precoTotal, 2);
    }

    /**
     * Verifica se há conflito de agendamento para uma sala no período especificado
     */
    private function verificarConflitoAgendamento($idSala, $dataEntrada, $dataSaida, $idPedidoExcluir = null){
        $query = Pedido::where('id_sala_fk', $idSala)
            ->where(function($q) use ($dataEntrada, $dataSaida) {
                // Verifica se há sobreposição de datas
                $q->whereBetween('data_entrada', [$dataEntrada, $dataSaida])
                  ->orWhereBetween('data_saida', [$dataEntrada, $dataSaida])
                  ->orWhere(function($q2) use ($dataEntrada, $dataSaida) {
                      $q2->where('data_entrada', '<=', $dataEntrada)
                         ->where('data_saida', '>=', $dataSaida);
                  });
            });

        if ($idPedidoExcluir) {
            $query->where('id_pedido', '!=', $idPedidoExcluir);
        }

        return $query->exists();
    }

    public function store(Request $request){
        // Validação dos dados
        $data = $request->validate([
             "id_sala_fk" => "required|integer|exists:salas,id_sala_pk",
             "forma_pg" => "required|string|max:100",
             "data_entrada" => "required|date",
             "data_saida" => "required|date|after:data_entrada",
             "observacoes" => "nullable|string|max:500"
        ]);

        // Obtém o cliente a partir do token
        $cliente = $this->obterClienteDoToken($request);
        if (!$cliente) {
            return response()->json([
                "error" => "Cliente não encontrado. Faça login novamente."
            ], 401);
        }

        // Adiciona o ID do cliente aos dados
        $data['id_cliente_fk'] = $cliente->id_cliente_pk;

        // Validação de datas
        $dataEntrada = Carbon::parse($data['data_entrada']);
        $dataSaida = Carbon::parse($data['data_saida']);

        if ($dataEntrada->isPast() && !$dataEntrada->isToday()) {
            return response()->json([
                "error" => "A data de entrada não pode ser no passado."
            ], 422);
        }

        // Verifica conflitos de agendamento
        if ($this->verificarConflitoAgendamento($data['id_sala_fk'], $data['data_entrada'], $data['data_saida'])) {
            return response()->json([
                "error" => "A sala já está reservada para este período. Por favor, escolha outra data."
            ], 409);
        }

        // Calcula o preço total
        $precoTotal = $this->calcularPrecoTotal($data['id_sala_fk'], $data['data_entrada'], $data['data_saida']);

        $pedido = Pedido::create($data);

        // Retorna o pedido com informações adicionais
        $pedidoCompleto = $pedido->load("salas", "cliente");
        $diasReservados = Carbon::parse($data['data_entrada'])->diffInDays(Carbon::parse($data['data_saida'])) ?: 1;
        $pedidoCompleto->preco_total = $precoTotal;
        $pedidoCompleto->dias_reservados = $diasReservados;

        /* 
        // Envia email de confirmação
        try {
            $usuario = Usuario::find($cliente->id_usuario_fk);
            if ($usuario && $usuario->email) {
                Mail::to($usuario->email)->send(
                    new AgendamentoConfirmado($pedidoCompleto, $precoTotal, $diasReservados)
                );
            }
        } catch (\Throwable $e) {
            // Log do erro, mas não impede a criação do agendamento
            // Usamos \Throwable para capturar erros fatais de dependências como EmailValidator
            Log::error('Erro ao enviar email de confirmação: ' . $e->getMessage());
        }
        */

        return response()->json([
            "message" => "Agendamento realizado com sucesso!",
            "pedido" => $pedidoCompleto,
            "preco_total" => $precoTotal,
            "dias_reservados" => $diasReservados
        ], 201);
    }

    public function destroy(Request $request, $id_pedido){
        $pedido = Pedido::find($id_pedido);
        if(!$pedido){
            return response()->json(["error"=> "Pedido não encontrado"],404);
        }

        // Obtém o cliente a partir do token
        $cliente = $this->obterClienteDoToken($request);
        if (!$cliente) {
            return response()->json([
                "error" => "Cliente não encontrado. Faça login novamente."
            ], 401);
        }

        // Verifica se o pedido pertence ao cliente
        if ($pedido->id_cliente_fk != $cliente->id_cliente_pk) {
            return response()->json([
                "error" => "Você não tem permissão para cancelar este agendamento."
            ], 403);
        }

        $pedido->delete();
        return response()->json(["message" => "Agendamento cancelado com sucesso"], 200);
    }

    /**
     * Retorna os agendamentos do cliente logado
     */
    public function meusAgendamentos(Request $request){
        $cliente = $this->obterClienteDoToken($request);
        if (!$cliente) {
            return response()->json([
                "error" => "Cliente não encontrado. Faça login novamente."
            ], 401);
        }

        $agendamentos = Pedido::with("salas", "cliente")
            ->where('id_cliente_fk', $cliente->id_cliente_pk)
            ->orderBy('data_entrada', 'desc')
            ->get()
            ->map(function($pedido) use ($cliente) {
                $dataEntrada = Carbon::parse($pedido->data_entrada);
                $dataSaida = Carbon::parse($pedido->data_saida);
                $dias = $dataEntrada->diffInDays($dataSaida) ?: 1;

                // Calcula o preço total
                $sala = $pedido->salas;
                $precoBase = $sala ? $sala->preco_base : 0;
                $precoTotal = $precoBase * $dias;

                $pedido->preco_total = round($precoTotal, 2);
                $pedido->dias_reservados = $dias;
                $pedido->status = $dataSaida->isPast() ? 'Finalizado' : ($dataEntrada->isPast() ? 'Em andamento' : 'Agendado');

                return $pedido;
            });

        return response()->json([
            "agendamentos" => $agendamentos,
            "total" => $agendamentos->count()
        ], 200);
    }

    /**
     * Retorna o calendário de disponibilidade de uma sala
     */
    public function calendarioDisponibilidade($id_sala){
        $sala = Salas::find($id_sala);
        if (!$sala) {
            return response()->json([
                "error" => "Sala não encontrada."
            ], 404);
        }

        // Busca todos os agendamentos da sala
        $agendamentos = Pedido::where('id_sala_fk', $id_sala)
            ->where('data_saida', '>=', Carbon::now()->toDateString())
            ->orderBy('data_entrada', 'asc')
            ->get(['data_entrada', 'data_saida']);

        // Gera os próximos 60 dias
        $calendario = [];
        $dataAtual = Carbon::now();

        for ($i = 0; $i < 60; $i++) {
            $data = $dataAtual->copy()->addDays($i);
            $dataFormatada = $data->toDateString();

            $disponivel = true;
            foreach ($agendamentos as $agendamento) {
                $dataEntrada = Carbon::parse($agendamento->data_entrada);
                $dataSaida = Carbon::parse($agendamento->data_saida);

                if ($data->between($dataEntrada, $dataSaida)) {
                    $disponivel = false;
                    break;
                }
            }

            $calendario[] = [
                'data' => $dataFormatada,
                'disponivel' => $disponivel,
                'dia_semana' => $data->locale('pt_BR')->dayName
            ];
        }

        return response()->json([
            "sala" => [
                "id" => $sala->id_sala_pk,
                "tipo" => $sala->tipo_sala
            ],
            "calendario" => $calendario,
            "periodo" => [
                "inicio" => Carbon::now()->toDateString(),
                "fim" => Carbon::now()->addDays(59)->toDateString()
            ]
        ], 200);
    }
}
