<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PsJuridica extends Model
{
   protected $table = "pessoa_juridica";

   protected $primaryKey = 'id_juridico_pk';

   protected $KeyType = 'int';

   public $incrementing = true;

   protected $fillabortable = ['cnpj'];

   public $timestamps = false;

}
