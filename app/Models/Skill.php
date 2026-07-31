<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'icon',
        'category',
        'percentage',
        'years_of_experience',
    ];
}
