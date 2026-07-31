<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreCertificateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isPost = $this->isMethod('post');
        return [
            'name' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'date' => 'required|date',
            'image' => ($isPost ? 'required' : 'nullable') . '|image|mimes:jpeg,png,jpg,webp|max:2048',
            'credential_url' => 'nullable|url|max:255',
        ];
    }
}
