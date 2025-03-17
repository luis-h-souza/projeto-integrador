<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
   protected $table = "cliente";

    protected $primaryKey = "id_cliente_pk";

    protected $KeyType= "int";

    public $incrementing = true;

   protected $fillable = ["email","telefone","celular","nome","usuario","senha","rua","bairro","numero", "complemento", "cidade", "estado", "pais", "id_fisico_fk", "id_juridico_fk"];

   public $timestamps = false;

   public function psfisica(){
    return $this->belongsTo(PsFisica::class, "id_fisico_fk", "id_fisico_pk");
   }

   public function juridico(){
    return $this->belongsTo(PsJuridica::class, "id_juridico_fk","id_juridico_pk");
   }
}
