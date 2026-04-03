<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação de Agendamento - LocalCo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(to right, #d94c30, #fc8971);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
            border-top: none;
        }
        .info-box {
            background: white;
            padding: 20px;
            margin: 15px 0;
            border-radius: 5px;
            border-left: 4px solid #fc6648;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
        }
        .info-row:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        .value {
            color: #333;
        }
        .total {
            background: #2ecc71;
            color: white;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
            margin-top: 20px;
            font-size: 24px;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #777;
            font-size: 12px;
            border-top: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>✅ Agendamento Confirmado!</h1>
        <p>LocalCo - Coworking</p>
    </div>

    <div class="content">
        <p>Olá,</p>
        <p>Seu agendamento foi confirmado com sucesso! Seguem os detalhes:</p>

        <div class="info-box">
            <h3 style="margin-top: 0; color: #fc6648;">Informações da Sala</h3>
            <div class="info-row">
                <span class="label">Tipo de Sala:</span>
                <span class="value">{{ $pedido->salas->tipo_sala ?? 'N/A' }}</span>
            </div>
            <div class="info-row">
                <span class="label">Descrição:</span>
                <span class="value">{{ $pedido->salas->descricao_sala ?? 'N/A' }}</span>
            </div>
            <div class="info-row">
                <span class="label">Capacidade:</span>
                <span class="value">{{ $pedido->salas->capac_pessoas ?? 'N/A' }} pessoas</span>
            </div>
        </div>

        <div class="info-box">
            <h3 style="margin-top: 0; color: #fc6648;">Período de Reserva</h3>
            <div class="info-row">
                <span class="label">Data de Entrada:</span>
                <span class="value">{{ \Carbon\Carbon::parse($pedido->data_entrada)->format('d/m/Y') }}</span>
            </div>
            <div class="info-row">
                <span class="label">Data de Saída:</span>
                <span class="value">{{ \Carbon\Carbon::parse($pedido->data_saida)->format('d/m/Y') }}</span>
            </div>
            <div class="info-row">
                <span class="label">Duração:</span>
                <span class="value">{{ $diasReservados }} {{ $diasReservados == 1 ? 'dia' : 'dias' }}</span>
            </div>
            <div class="info-row">
                <span class="label">Forma de Pagamento:</span>
                <span class="value">{{ $pedido->forma_pg }}</span>
            </div>
        </div>

        <div class="total">
            Total: R$ {{ number_format($precoTotal, 2, ',', '.') }}
        </div>

        <p style="margin-top: 30px;">
            <strong>Número do Agendamento:</strong> #{{ $pedido->id_pedido }}
        </p>

        <p>
            Caso precise cancelar ou modificar seu agendamento, entre em contato conosco ou acesse sua área de agendamentos.
        </p>

        <p>
            Obrigado por escolher a LocalCo!
        </p>
    </div>

    <div class="footer">
        <p>LocalCo - Coworking</p>
        <p>Este é um email automático, por favor não responda.</p>
    </div>
</body>
</html>

