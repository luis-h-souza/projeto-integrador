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
<<<<<<< HEAD
            'senha' => 'required|string|min:6'
=======
            'senha' => 'required|string'
>>>>>>> c2311048bd1afe62bc096281bdbdbe866139837f
        ]);

        $usuario = Usuario::create([
            'nome' => $request->nome,
            'email' => $request->email,
            'senha' => Hash::make($request->senha)
        ]);
        return response()->json(['message' => 'Usuário registrado com sucesso!'], 201);
    }

<<<<<<< HEAD
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
=======
    public function login(Request $request){
        $request->validate([
             'email' => 'required|string|email',
>>>>>>> c2311048bd1afe62bc096281bdbdbe866139837f
            'senha' => 'required|string'
        ]);

        $usuario = Usuario::where('email', $request->email)->first();

<<<<<<< HEAD
        if (!$usuario || !Hash::check($request->senha, $usuario->senha)) {
=======
        if(!$usuario || !Hash::check($request->senha,$usuario->senha)){
>>>>>>> c2311048bd1afe62bc096281bdbdbe866139837f
            return response()->json(['message' => 'Usuario Inválido'], 401);
        }

        $token = bin2hex(random_bytes(40));
        $usuario->api_token = $token;
        $usuario->save();

        return response()->json(['token' => $token]);
    }

<<<<<<< HEAD
    public function logout(Request $request)
    {
        $usuario = Auth::guard('api')->user();
        if ($usuario) {
=======
    public function logout(Request $request){
        $usuario = Auth::guard('api')->user();
        if ($usuario){
>>>>>>> c2311048bd1afe62bc096281bdbdbe866139837f
            $usuario->token = null;
            $usuario->save();
        }

        return response()->json(['message' => 'Login realizado com sucesso']);
    }
}
