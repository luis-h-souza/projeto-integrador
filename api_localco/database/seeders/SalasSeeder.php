<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Salas;

class SalasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $salas = [
            [
                'tipo_sala' => 'Sala de Reunião Pequena',
                'descricao_sala' => 'Ideal para reuniões de até 4 pessoas. Equipada com mesa, cadeiras e TV.',
                'capac_pessoas' => 4,
                'preco_base' => 50.00,
                'foto' => 'https://via.placeholder.com/400x300/007bff/ffffff?text=Sala+Reunião+Pequena'
            ],
            [
                'tipo_sala' => 'Sala de Reunião Grande',
                'descricao_sala' => 'Perfeita para apresentações e reuniões de equipe. Capacidade para até 12 pessoas.',
                'capac_pessoas' => 12,
                'preco_base' => 120.00,
                'foto' => 'https://via.placeholder.com/400x300/28a745/ffffff?text=Sala+Reunião+Grande'
            ],
            [
                'tipo_sala' => 'Sala de Eventos',
                'descricao_sala' => 'Espaço amplo para eventos corporativos, palestras e workshops.',
                'capac_pessoas' => 50,
                'preco_base' => 300.00,
                'foto' => 'https://via.placeholder.com/400x300/dc3545/ffffff?text=Sala+de+Eventos'
            ],
            [
                'tipo_sala' => 'Espaço Coworking',
                'descricao_sala' => 'Ambiente colaborativo com mesas compartilhadas e internet de alta velocidade.',
                'capac_pessoas' => 20,
                'preco_base' => 80.00,
                'foto' => 'https://via.placeholder.com/400x300/ffc107/000000?text=Coworking+Space'
            ]
        ];

        foreach ($salas as $sala) {
            Salas::create($sala);
        }
    }
}
