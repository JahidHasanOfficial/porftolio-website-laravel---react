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
            'phone' => 'nullable|string|max:30',
            'project_type' => 'nullable|string|max:100',
            'budget' => 'nullable|string|max:100',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|min:10|max:5000',
            'website_url' => 'nullable|string|max:0', // Honeypot spam protection
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Please provide your name.',
            'email.required' => 'A valid email address is required so I can reply back.',
            'email.email' => 'Please provide a valid email address.',
            'message.required' => 'Please include a message detailing your requirements or inquiry.',
            'message.min' => 'Your message should be at least 10 characters long.',
            'website_url.max' => 'Spam detected.',
        ];
    }
}
