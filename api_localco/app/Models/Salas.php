<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salas extends Model
{
    protected $table = 'salas';

    protected $primaryKey = 'id_sala_pk';

    protected $KeyType = 'int';

<<<<<<< HEAD
    public $incrementing = true;
=======
   public $incrementing = true;

   protected $fill = ['tipo_sala','descricao_sala','capac_pessoas','preco_base', 'foto'];

   public $timestamps = false;
>>>>>>> c2311048bd1afe62bc096281bdbdbe866139837f

    protected $fill = ['tipo_sala', 'descricao_sala', 'capac_pessoas', 'preco_base', 'foto'];

    public $timestamps = false;
}
