<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreEducationRequest;
use App\Models\Education;
use App\Services\EducationService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class EducationController extends Controller
{
    public function __construct(protected EducationService $educationService) {}

    public function index(): Response
    {
        $educations = $this->educationService->all();
        return Inertia::render('Admin/Education/Index', [
            'educations' => $educations,
        ]);
    }

    public function store(StoreEducationRequest $request): RedirectResponse
    {
        $this->educationService->create($request->validated());
        return redirect()->back()->with('success', 'Education record created successfully.');
    }

    public function update(StoreEducationRequest $request, Education $education): RedirectResponse
    {
        $this->educationService->update($education, $request->validated());
        return redirect()->back()->with('success', 'Education record updated successfully.');
    }

    public function destroy(Education $education): RedirectResponse
    {
        $this->educationService->delete($education);
        return redirect()->back()->with('success', 'Education record deleted successfully.');
    }
}
