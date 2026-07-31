<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSkillRequest;
use App\Models\Skill;
use App\Services\SkillService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function __construct(protected SkillService $skillService) {}

    public function index(): Response
    {
        $skills = $this->skillService->all();
        return Inertia::render('Admin/Skills/Index', [
            'skills' => $skills,
        ]);
    }

    public function store(StoreSkillRequest $request): RedirectResponse
    {
        $this->skillService->create($request->validated());
        return redirect()->back()->with('success', 'Skill created successfully.');
    }

    public function update(StoreSkillRequest $request, Skill $skill): RedirectResponse
    {
        $this->skillService->update($skill, $request->validated());
        return redirect()->back()->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill): RedirectResponse
    {
        $this->skillService->delete($skill);
        return redirect()->back()->with('success', 'Skill deleted successfully.');
    }
}
