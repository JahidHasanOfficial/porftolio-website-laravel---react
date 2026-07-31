<?php

namespace App\Services;

use App\Models\Experience;
use Illuminate\Database\Eloquent\Collection;

class ExperienceService
{
    public function all(): Collection
    {
        return Experience::orderBy('start_date', 'desc')->get();
    }

    public function create(array $data): Experience
    {
        return Experience::create($data);
    }

    public function update(Experience $experience, array $data): Experience
    {
        $experience->update($data);
        return $experience;
    }

    public function delete(Experience $experience): void
    {
        $experience->delete();
    }
}
