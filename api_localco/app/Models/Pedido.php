<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = "pedido";

    protected $primaryKey = "id_pedido";

    protected $KeyType = "int";

    public $incrementing = true;

    protected $fillable = ["id_sala_fk", "id_cliente_fk", "forma_pg", "data_entrada", "data_saida"];

    public $timestamps = false;

    public function salas(){
        return $this->belongsTo(Salas::class, "id_sala_fk", "id_sala_pk");
    }

    public function cliente(){
        return $this->belongsTo(Cliente::class, "id_cliente_fk", "id_cliente_pk");
    }

}