<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'client_name',
        'company',
        'image',
        'rating',
        'feedback',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
        ];
    }
}
