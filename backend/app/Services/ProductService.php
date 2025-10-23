<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;


class ProductService
{
    public function createProduct(array $data): Product
    {

        DB::beginTransaction();
        $product = Product::create([
                'name' => $data['name'],
                'price'   => $data['price'],
                'category'  => $data['category'],
            ]);
        DB::commit();
        return $product;

    }

    public function listProducts(int $perPage = 10)
    {
        return Product::paginate($perPage);
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
