<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'thumbnail',
        'content',
        'category',
        'tags',
        'seo_title',
        'seo_description',
        'seo_keywords',
        'status',
        'publish_date',
    ];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'publish_date' => 'datetime',
        ];
    }
}
