<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\OrderItem;

class Order extends Model
{
    protected $fillable = ['customer_name', 'order_date', 'status'];


    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
