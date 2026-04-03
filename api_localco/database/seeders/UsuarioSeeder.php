<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    /**
     * Cria utilizadores de teste e respetivos registos em cliente (necessário para agendamentos).
     */
    public function run()
    {
        $usuarios = [
            [
                'nome' => 'João Silva',
                'email' => 'joao@teste.com',
                'senha' => Hash::make('123456'),
            ],
            [
                'nome' => 'Maria Santos',
                'email' => 'maria@teste.com',
                'senha' => Hash::make('123456'),
            ],
        ];

        foreach ($usuarios as $dados) {
            $usuario = Usuario::create($dados);

            Cliente::create([
                'id_usuario_fk' => $usuario->id,
                'email' => $usuario->email,
                'nome' => $usuario->nome,
                'telefone' => '',
                'celular' => '',
                'rua' => '',
                'bairro' => '',
                'numero' => '',
                'complemento' => '',
                'cidade' => '',
                'estado' => '',
                'pais' => 'Brasil',
                'id_fisico_fk' => null,
                'id_juridico_fk' => null,
            ]);
        }
    }
}
