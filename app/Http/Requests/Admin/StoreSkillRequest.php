<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreSkillRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'category' => 'required|string|max:100',
            'percentage' => 'required|integer|min:0|max:100',
            'years_of_experience' => 'required|integer|min:0|max:50',
        ];
    }
}
