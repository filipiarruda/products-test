<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderStatusUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Propriedades públicas que serão transmitidas pelo WebSocket.
     */
    public $productId;
    public $newStatus;


    public function __construct(int $productId, string $newStatus)
    {
        $this->productId = $productId;
        $this->newStatus = $newStatus;
    }

    public function broadcastOn(): array
    {
        // Define o canal público para atualizações de produtos
        return [
            new Channel('order-updates'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'status.updated';
    }
}
