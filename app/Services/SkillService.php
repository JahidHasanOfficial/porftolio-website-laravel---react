<?php

namespace App\Services;

use App\Models\Skill;
use Illuminate\Database\Eloquent\Collection;

class SkillService
{
    public function all(): Collection
    {
        return Skill::orderBy('category')->orderBy('percentage', 'desc')->get();
    }

    public function create(array $data): Skill
    {
        return Skill::create($data);
    }

    public function update(Skill $skill, array $data): Skill
    {
        $skill->update($data);
        return $skill;
    }

    public function delete(Skill $skill): void
    {
        $skill->delete();
    }
}
