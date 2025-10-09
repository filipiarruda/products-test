<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Products
Route::get('/products', [App\Http\Controllers\Api\ProductController::class, 'index']);
Route::post('/products', [App\Http\Controllers\Api\ProductController::class, 'store']);
Route::put('/products/{id}', [App\Http\Controllers\Api\ProductController::class, 'update']);
Route::delete('/products/{id}', [App\Http\Controllers\Api\ProductController::class, 'destroy']);


//Orders
Route::get('/orders', [App\Http\Controllers\Api\OrderController::class, 'index']);
Route::get('/orders/{id}', [App\Http\Controllers\Api\OrderController::class, 'show']);
Route::post('/orders', [App\Http\Controllers\Api\OrderController::class, 'store']);
Route::put('/orders/{id}', [App\Http\Controllers\Api\OrderController::class, 'update']);
Route::delete('/orders/{id}', [App\Http\Controllers\Api\OrderController::class, 'destroy']);


