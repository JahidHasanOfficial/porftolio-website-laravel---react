<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactMessageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
            'website_url' => 'nullable|string|max:0', // Honeypot spam protection field must be empty
        ];
    }

    public function messages(): array
    {
        return [
            'website_url.max' => 'Spam detected.',
        ];
    }
}
