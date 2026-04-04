<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pedido', function (Blueprint $table) {
            if (!Schema::hasColumn('pedido', 'data_entrada')) {
                $table->dateTime('data_entrada')->nullable()->after('id_cliente_fk');
            } else {
                $table->dateTime('data_entrada')->nullable()->change();
            }

            if (!Schema::hasColumn('pedido', 'data_saida')) {
                $table->dateTime('data_saida')->nullable()->after('data_entrada');
            } else {
                $table->dateTime('data_saida')->nullable()->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pedido', function (Blueprint $table) {
            $table->dropColumn(['data_entrada', 'data_saida']);
        });
    }
};
