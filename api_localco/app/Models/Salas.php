<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salas extends Model
{
    protected $table = 'salas';

    protected $primaryKey = 'id_sala_pk';

    protected $KeyType = 'int';

    public $incrementing = true;

    protected $fillable = ['tipo_sala', 'descricao_sala', 'capac_pessoas', 'preco_base', 'foto'];

    public $timestamps = false;
}
