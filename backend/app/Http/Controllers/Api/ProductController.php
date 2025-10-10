<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ProductService;

class ProductController extends Controller
{

    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $products = $this->productService->listProducts($perPage);
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $data = $request->json()->all();

        $order = $this->productService->createProduct($data);

        return response()->json($order);
    }

    public function update(Request $request, $id)
    {
        $data = $request->json()->all();
        $data['id'] = (int)$id;
        $order = $this->productService->updateProduct($data);

        return response()->json($order);
    }

    public function destroy($id)
    {
        $result = $this->productService->deleteProduct((int)$id);
        return response()->json(['success' => $result]);
    }




}
