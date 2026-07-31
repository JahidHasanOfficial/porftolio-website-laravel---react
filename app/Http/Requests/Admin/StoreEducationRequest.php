<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreEducationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'institute' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'session' => 'required|string|max:255',
            'result' => 'nullable|string|max:255',
        ];
    }
}
