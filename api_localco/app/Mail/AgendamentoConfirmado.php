<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Pedido;

class AgendamentoConfirmado extends Mailable
{
    use Queueable, SerializesModels;

    public $pedido;
    public $precoTotal;
    public $diasReservados;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($pedido, $precoTotal, $diasReservados)
    {
        $this->pedido = $pedido;
        $this->precoTotal = $precoTotal;
        $this->diasReservados = $diasReservados;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Confirmação de Agendamento - LocalCo')
                    ->view('emails.agendamento-confirmado');
    }
}
