<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'category',
        'status',
        'client',
        'duration',
        'description',
        'overview',
        'problem',
        'solution',
        'features',
        'technology_stack',
        'live_demo',
        'github',
        'challenges',
        'solutions',
        'thumbnail',
        'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'features' => 'array',
            'technology_stack' => 'array',
            'is_featured' => 'boolean',
        ];
    }

    public function screenshots(): HasMany
    {
        return $this->hasMany(ProjectScreenshot::class);
    }
}
