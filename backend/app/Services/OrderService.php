<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use App\Models\OrderItem;
use App\Jobs\UpdateOrderStatus;

class OrderService
{
    public function createOrder(array $data): array
    {

        DB::beginTransaction();
        $order = Order::create([
                'customer_name' => $data['customer_name'],
                'order_date'   => $data['order_date'],
                'status'  => "PENDING",
            ]);
        $orderProducts = [];
        foreach ($data['items'] as $item) {
            $orderProducts[] = [
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
            ];
        }
        foreach ($orderProducts as $orderProduct) {
            $orderProduct['order_id'] = $order->id;
            OrderItem::create($orderProduct);
        }
        DB::commit();
        $delayInSeconds = 20;
        UpdateOrderStatus::dispatch($order)->delay(now()->addSeconds($delayInSeconds));
        return $order->toArray();

    }

    public function listOrders(int $perPage = 10): array
    {
        return Order::paginate($perPage);
    }

    public function getOrder(int $id) : array
    {
        $order = Order::find($id);

        if (!$order) {
            return array('message'=> 'Order not found');
        }

        $orderItems = $order->items()->with('product')->get()->map(function ($item) {
            return [
                'product_name' => $item->product->name,
                'product_price' => $item->product->price,
                'quantity' => $item->quantity,
                'total' => $item->product->price * $item->quantity,
            ];
        });

        $totalOrder = $orderItems->map(function ($item) {
                return $item['total'];
            })->sum();

        return [
            'order_id' => $order->id,
            'customer_name' => $order->customer_name,
            'order_date' => $order->order_date,
            'status' => $order->status,
            'items' => $orderItems,
            'total' => $totalOrder
        ];
    }


}
