<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Http\Requests\Admin\UpdateProjectRequest;
use App\Models\Project;
use App\Models\ProjectScreenshot;
use App\Services\ProjectService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function __construct(protected ProjectService $projectService) {}

    public function index(): Response
    {
        $projects = $this->projectService->allForAdmin(10);
        return Inertia::render('Admin/Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Projects/Create');
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $this->projectService->create($request->validated());
        return redirect()->route('admin.projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        // Eager load screenshots
        $project->load('screenshots');
        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $this->projectService->update($project, $request->validated());
        return redirect()->route('admin.projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $this->projectService->delete($project);
        return redirect()->back()->with('success', 'Project deleted successfully.');
    }

    public function deleteScreenshot(ProjectScreenshot $screenshot): RedirectResponse
    {
        $this->projectService->deleteScreenshot($screenshot);
        return redirect()->back()->with('success', 'Screenshot removed successfully.');
    }
}
