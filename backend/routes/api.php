<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/products', [App\Http\Controllers\Api\ProductController::class, 'index']);
Route::get('/orders', [App\Http\Controllers\Api\OrderController::class, 'index']);

