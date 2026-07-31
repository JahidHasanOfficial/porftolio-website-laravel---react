<?php

namespace App\Services;

use App\Models\Education;
use Illuminate\Database\Eloquent\Collection;

class EducationService
{
    public function all(): Collection
    {
        return Education::orderBy('id', 'desc')->get();
    }

    public function create(array $data): Education
    {
        return Education::create($data);
    }

    public function update(Education $education, array $data): Education
    {
        $education->update($data);
        return $education;
    }

    public function delete(Education $education): void
    {
        $education->delete();
    }
}
