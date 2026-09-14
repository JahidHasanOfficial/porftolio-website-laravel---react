<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
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
        'role',
        'description',
        'overview',
        'problem',
        'objective',
        'solution',
        'architecture_flow',
        'features',
        'technology_stack',
        'live_demo',
        'github',
        'challenges',
        'solutions',
        'business_impact',
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

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeByCategory(Builder $query, ?string $category): Builder
    {
        return $category && $category !== 'all' ? $query->where('category', $category) : $query;
    }

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (!$search) {
            return $query;
        }

        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%")
              ->orWhere('category', 'like', "%{$search}%");
        });
    }
}
