<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class PsFisica extends Model
{
   protected $table = "pessoa_fisica";

   protected $primaryKey = "id_fisico_pk";

   protected $KeyType = 'int';

   public $incrementing = true;

   protected $fillabortable = ["cpf"];

   public $timestamps = false;
}
