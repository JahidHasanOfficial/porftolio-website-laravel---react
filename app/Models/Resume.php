<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    protected $fillable = ['file_path', 'download_count'];

    protected function casts(): array
    {
        return [
            'download_count' => 'integer',
        ];
    }
}
