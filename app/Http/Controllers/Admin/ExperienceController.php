<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreExperienceRequest;
use App\Models\Experience;
use App\Services\ExperienceService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function __construct(protected ExperienceService $experienceService) {}

    public function index(): Response
    {
        $experiences = $this->experienceService->all();
        return Inertia::render('Admin/Experience/Index', [
            'experiences' => $experiences,
        ]);
    }

    public function store(StoreExperienceRequest $request): RedirectResponse
    {
        $this->experienceService->create($request->validated());
        return redirect()->back()->with('success', 'Experience created successfully.');
    }

    public function update(StoreExperienceRequest $request, Experience $experience): RedirectResponse
    {
        $this->experienceService->update($experience, $request->validated());
        return redirect()->back()->with('success', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $this->experienceService->delete($experience);
        return redirect()->back()->with('success', 'Experience deleted successfully.');
    }
}
