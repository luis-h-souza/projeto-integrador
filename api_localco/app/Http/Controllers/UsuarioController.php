<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use App\Models\Cliente;
use App\Models\PsFisica;
use App\Models\PsJuridica;
use Illuminate\Support\Facades\DB;


class UsuarioController extends Controller
{
    public function register(Request $request)
    {

        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:usuario,email',
            'senha' => 'required|string',
            'cpf' => 'nullable|string|max:14',
            'cnpj' => 'nullable|string|max:20',
            'telefone' => 'nullable|string|max:20',
            'celular' => 'nullable|string|max:20',
            'rua' => 'nullable|string|max:250',
            'bairro' => 'nullable|string|max:250',
            'numero' => 'nullable|string|max:10',
            'complemento' => 'nullable|string|max:50',
            'cidade' => 'nullable|string|max:100',
            'estado' => 'nullable|string|max:50',
            'pais' => 'nullable|string|max:50',
        ]);

        try {
            DB::beginTransaction();

            $usuario = Usuario::create([
                'nome' => $request->nome,
                'email' => $request->email,
                'senha' => Hash::make($request->senha)
            ]);

            $idFisico = null;
            if ($request->filled('cpf')) {
                $psFisica = PsFisica::create(['cpf' => $request->cpf]);
                $idFisico = $psFisica->id_fisico_pk;
            }

            $idJuridico = null;
            if ($request->filled('cnpj')) {
                $psJuridica = PsJuridica::create(['cnpj' => $request->cnpj]);
                $idJuridico = $psJuridica->id_juridico_pk;
            }

            // Garante que pelo menos um ID seja criado se nenhum for fornecido, para evitar erro se o DB não aceitar NULL (comentado pois vou tentar NULL primeiro)
            // Se o DB exigir FK, vai dar erro aqui se ambos forem null.

            $cliente = Cliente::create([
                'id_usuario_fk' => $usuario->id,
                'email' => $usuario->email,
                'nome' => $usuario->nome,
                'telefone' => $request->telefone ?? '',
                'celular' => $request->celular ?? '',
                'rua' => $request->rua ?? '',
                'bairro' => $request->bairro ?? '',
                'numero' => $request->numero ?? '',
                'complemento' => $request->complemento ?? '',
                'cidade' => $request->cidade ?? '',
                'estado' => $request->estado ?? '',
                'pais' => $request->pais ?? 'Brasil',
                'id_fisico_fk' => $idFisico,
                'id_juridico_fk' => $idJuridico
            ]);

            $token = bin2hex(random_bytes(40));
            $usuario->api_token = $token;
            $usuario->save();

            DB::commit();

            return response()->json([
                'message' => 'Usuário e cliente registrados com sucesso!',
                'token' => $token,
                'email' => $usuario->email,
                'nome' => $usuario->nome
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Erro ao registrar usuário',
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'senha' => 'required|string'
        ]);

        $usuario = Usuario::where('email', $request->email)->first();

        if (!$usuario || !Hash::check($request->senha, $usuario->senha)) {
            return response()->json(['message' => 'Usuario Inválido'], 401);
        }

        $token = bin2hex(random_bytes(40));
        $usuario->api_token = $token;
        $usuario->save();

        return response()->json(['token' => $token, 'email' => $usuario->email, 'nome' => $usuario->nome], 200);
    }

    public function logout(Request $request)
    {
        $token = $request->bearerToken();
        if ($token) {
            $usuario = Usuario::where('api_token', $token)->first();
            if ($usuario) {
                $usuario->api_token = null;
                $usuario->save();
            }
        }

        return response()->json(['message' => 'Logout realizado com sucesso']);
    }
}
