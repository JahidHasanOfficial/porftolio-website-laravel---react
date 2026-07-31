<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|required_if:is_current,false|date|after_or_equal:start_date',
            'is_current' => 'required|boolean',
            'responsibilities' => 'nullable|string',
            'technologies' => 'required|array',
            'achievements' => 'nullable|string',
        ];
    }
}
