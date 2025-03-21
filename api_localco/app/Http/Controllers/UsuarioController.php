<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;


class UsuarioController extends Controller
{
    public function register(Request $request)
    {

        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:usuario,email',
            'senha' => 'required|string|min:6'
        ]);

        $usuario = Usuario::create([
            'nome' => $request->nome,
            'email' => $request->email,
            'senha' => Hash::make($request->senha)
        ]);
        return response()->json(['message' => 'Usuário registrado com sucesso!'], 201);
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

        return response()->json(['token' => $token]);
    }

    public function logout(Request $request)
    {
        $usuario = Auth::guard('api')->user();
        if ($usuario) {
            $usuario->token = null;
            $usuario->save();
        }

        return response()->json(['message' => 'Login realizado com sucesso']);
    }
}
