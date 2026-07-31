<?php

namespace App\Services;

use App\Models\Project;
use App\Models\ProjectScreenshot;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProjectService
{
    public function paginatedForPublic(?string $category = null, ?string $search = null, string $sort = 'newest', int $perPage = 6): LengthAwarePaginator
    {
        $query = Project::with('screenshots');

        if ($category) {
            $query->where('category', $category);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('technology_stack', 'like', "%{$search}%");
            });
        }

        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'featured':
                $query->orderBy('is_featured', 'desc')->orderBy('created_at', 'desc');
                break;
            case 'alphabetical':
                $query->orderBy('name', 'asc');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        return $query->paginate($perPage);
    }

    public function allForAdmin(int $perPage = 10): LengthAwarePaginator
    {
        return Project::orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function create(array $data): Project
    {
        $data['slug'] = Str::slug($data['name']);

        if (isset($data['thumbnail']) && request()->hasFile('thumbnail')) {
            $path = request()->file('thumbnail')->store('projects', 'public');
            $data['thumbnail'] = '/storage/' . $path;
        }

        $project = Project::create($data);

        // Handle Screenshots
        if (request()->hasFile('screenshots')) {
            foreach (request()->file('screenshots') as $file) {
                $path = $file->store('projects/screenshots', 'public');
                ProjectScreenshot::create([
                    'project_id' => $project->id,
                    'image_path' => '/storage/' . $path,
                ]);
            }
        }

        return $project;
    }

    public function update(Project $project, array $data): Project
    {
        $data['slug'] = Str::slug($data['name']);

        if (isset($data['thumbnail']) && request()->hasFile('thumbnail')) {
            if ($project->thumbnail && Storage::disk('public')->exists(str_replace('/storage/', '', $project->thumbnail))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $project->thumbnail));
            }
            $path = request()->file('thumbnail')->store('projects', 'public');
            $data['thumbnail'] = '/storage/' . $path;
        }

        $project->update($data);

        // Handle Screenshots
        if (request()->hasFile('screenshots')) {
            foreach (request()->file('screenshots') as $file) {
                $path = $file->store('projects/screenshots', 'public');
                ProjectScreenshot::create([
                    'project_id' => $project->id,
                    'image_path' => '/storage/' . $path,
                ]);
            }
        }

        return $project;
    }

    public function delete(Project $project): void
    {
        // Delete thumbnail
        if ($project->thumbnail && Storage::disk('public')->exists(str_replace('/storage/', '', $project->thumbnail))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $project->thumbnail));
        }

        // Delete screenshots
        foreach ($project->screenshots as $screenshot) {
            if (Storage::disk('public')->exists(str_replace('/storage/', '', $screenshot->image_path))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $screenshot->image_path));
            }
            $screenshot->delete();
        }

        $project->delete();
    }

    public function deleteScreenshot(ProjectScreenshot $screenshot): void
    {
        if (Storage::disk('public')->exists(str_replace('/storage/', '', $screenshot->image_path))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $screenshot->image_path));
        }
        $screenshot->delete();
    }
}
