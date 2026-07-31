<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreTestimonialRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $isPost = $this->isMethod('post');
        return [
            'client_name' => 'required|string|max:255',
            'company' => 'nullable|string|max:255',
            'rating' => 'required|integer|min:1|max:5',
            'feedback' => 'required|string|max:2000',
            'image' => ($isPost ? 'required' : 'nullable') . '|image|mimes:jpeg,png,jpg,webp|max:2048',
        ];
    }
}
