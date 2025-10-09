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
        $products = $this->productService->listProducts();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $data = $request->json()->all(); // Decodifica o JSON para array

        $order = $this->productService->createProduct($data);

        return response()->json($order);
    }


}
