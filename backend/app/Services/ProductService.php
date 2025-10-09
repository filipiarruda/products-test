<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use App\Mail\OrderCreatedNotification;
use Exception;
use Illuminate\Support\Facades\Mail;

class ProductService
{
    public function createProduct(array $data): Product
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

    public function updateProduct(array $data) : Product
    {
        $product = Product::find($data['id']);
        if (!$product) {
            throw new Exception("Product not found");
        } else {
            $product->update([
                'name' => $data['name'],
                'price'   => $data['price'],
                'category'  => $data['category'],
            ]);
            return $product;
        }
    }

    public function deleteProduct(int $id) : bool
    {
        $product = Product::find($id);
        if (!$product) {
            throw new Exception("Product not found");
        } else {
            return $product->delete();
        }
    }


}
