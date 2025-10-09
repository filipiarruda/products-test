<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/products', [App\Http\Controllers\Api\ProductController::class, 'index']);
Route::post('/products', [App\Http\Controllers\Api\ProductController::class, 'store']);
Route::put('/products/{id}', [App\Http\Controllers\Api\ProductController::class, 'update']);
Route::delete('/products/{id}', [App\Http\Controllers\Api\ProductController::class, 'destroy']);
//Route::get('/orders', [App\Http\Controllers\Api\OrderController::class, 'index']);

