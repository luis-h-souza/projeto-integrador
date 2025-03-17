<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

class Usuario extends Model implements AuthenticatableContract
{
   use Authenticatable;

   protected $table = 'usuario';
   protected $primaryKey= 'id';
   public $timestamps = false;

   protected $fillable = ['nome', 'email', 'senha'];

   protected $hidden = ['senha'];

   public function getAuthPassword(){
    return $this->senha;
   }
}
