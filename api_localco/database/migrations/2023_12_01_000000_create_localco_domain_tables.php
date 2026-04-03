<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Esquema mínimo para aluguel de salas (LocalCo).
 * Autenticação: tabela usuario com api_token (ver config/auth.php).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pessoa_fisica', function (Blueprint $table) {
            $table->id('id_fisico_pk');
            $table->string('cpf', 20);
        });

        Schema::create('pessoa_juridica', function (Blueprint $table) {
            $table->id('id_juridico_pk');
            $table->string('cnpj', 20);
        });

        Schema::create('usuario', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 255);
            $table->string('email', 255)->unique();
            $table->string('senha', 255);
            $table->string('api_token', 80)->nullable()->unique();
        });

        Schema::create('salas', function (Blueprint $table) {
            $table->id('id_sala_pk');
            $table->string('tipo_sala', 50);
            $table->text('descricao_sala');
            $table->integer('capac_pessoas');
            $table->decimal('preco_base', 10, 2);
            $table->string('foto');
        });

        Schema::create('cliente', function (Blueprint $table) {
            $table->id('id_cliente_pk');
            $table->unsignedBigInteger('id_usuario_fk');
            $table->string('email', 255);
            $table->string('nome', 255);
            $table->string('telefone', 20)->nullable();
            $table->string('celular', 20)->nullable();
            $table->string('rua', 250)->nullable();
            $table->string('bairro', 250)->nullable();
            $table->string('numero', 10)->nullable();
            $table->string('complemento', 50)->nullable();
            $table->string('cidade', 100)->nullable();
            $table->string('estado', 50)->nullable();
            $table->string('pais', 50)->nullable();
            $table->unsignedBigInteger('id_fisico_fk')->nullable();
            $table->unsignedBigInteger('id_juridico_fk')->nullable();

            $table->foreign('id_usuario_fk')->references('id')->on('usuario')->cascadeOnDelete();
            $table->foreign('id_fisico_fk')->references('id_fisico_pk')->on('pessoa_fisica')->nullOnDelete();
            $table->foreign('id_juridico_fk')->references('id_juridico_pk')->on('pessoa_juridica')->nullOnDelete();
        });

        Schema::create('pedido', function (Blueprint $table) {
            $table->id('id_pedido');
            $table->unsignedBigInteger('id_sala_fk');
            $table->unsignedBigInteger('id_cliente_fk');
            $table->string('forma_pg', 100);
            $table->date('data_entrada');
            $table->date('data_saida');

            $table->foreign('id_sala_fk')->references('id_sala_pk')->on('salas')->restrictOnDelete();
            $table->foreign('id_cliente_fk')->references('id_cliente_pk')->on('cliente')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pedido');
        Schema::dropIfExists('cliente');
        Schema::dropIfExists('salas');
        Schema::dropIfExists('usuario');
        Schema::dropIfExists('pessoa_juridica');
        Schema::dropIfExists('pessoa_fisica');
    }
};
