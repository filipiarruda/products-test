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
        $products = Product::all()->toArray();

        if (!$products) {
            return array('message'=> 'No products found');
        } else {
            return $products;
        }
    }

    public function updateProduct(array $data) : array
    {
        $product = Product::find($data['id']);
        if (!$product) {
            return array('message'=> 'Product not found');
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
        return $product->delete();
    }


}
