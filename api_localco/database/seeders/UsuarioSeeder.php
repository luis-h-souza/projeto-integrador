<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Usuario::create([
            'nome' => 'João Silva',
            'email' => 'joao@teste.com',
            'senha' => Hash::make('123456')
        ]);

        Usuario::create([
            'nome' => 'Maria Santos',
            'email' => 'maria@teste.com',
            'senha' => Hash::make('123456')
        ]);
    }
}
