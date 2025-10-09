<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use App\Mail\OrderCreatedNotification;
use Illuminate\Support\Facades\Mail;

class ProductService
{
    public function createProduct(array $data): Order
    {

        DB::beginTransaction();
        $order = Product::create([
                'name' => $data['name'],
                'price'   => $data['price'],
                'category'  => $data['category'],
            ]);
        DB::commit();
        return $order;

    }

    public function listProducts(): array
    {
        return Product::all()->toArray();
    }


}
