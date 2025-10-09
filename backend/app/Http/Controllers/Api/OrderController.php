<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\OrderService;

class OrderController extends Controller
{

    protected OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index()
    {
        $orders = $this->orderService->listOrders();
        return response()->json($orders);
    }

    public function show($id)
    {
        $order = $this->orderService->getOrder((int)$id);
        return response()->json($order);
    }

    public function store(Request $request)
    {
        $data = $request->json()->all();

        $order = $this->orderService->createOrder($data);

        return response()->json($order);
    }
}
