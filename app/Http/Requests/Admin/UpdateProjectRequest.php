<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'status' => 'required|string|max:100',
            'client' => 'nullable|string|max:255',
            'duration' => 'required|string|max:255',
            'description' => 'required|string',
            'overview' => 'nullable|string',
            'problem' => 'nullable|string',
            'solution' => 'nullable|string',
            'features' => 'nullable|array',
            'technology_stack' => 'required|array',
            'live_demo' => 'nullable|url|max:255',
            'github' => 'nullable|url|max:255',
            'challenges' => 'nullable|string',
            'solutions' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_featured' => 'nullable|boolean',
            'screenshots' => 'nullable|array',
            'screenshots.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
        ];
    }
}
