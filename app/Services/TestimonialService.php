<?php

namespace App\Services;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

class TestimonialService
{
    public function all(): Collection
    {
        return Testimonial::orderBy('id', 'desc')->get();
    }

    public function create(array $data): Testimonial
    {
        if (isset($data['image']) && request()->hasFile('image')) {
            $path = request()->file('image')->store('testimonials', 'public');
            $data['image'] = '/storage/' . $path;
        }

        return Testimonial::create($data);
    }

    public function update(Testimonial $testimonial, array $data): Testimonial
    {
        if (isset($data['image']) && request()->hasFile('image')) {
            if ($testimonial->image && Storage::disk('public')->exists(str_replace('/storage/', '', $testimonial->image))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $testimonial->image));
            }
            $path = request()->file('image')->store('testimonials', 'public');
            $data['image'] = '/storage/' . $path;
        }

        $testimonial->update($data);
        return $testimonial;
    }

    public function delete(Testimonial $testimonial): void
    {
        if ($testimonial->image && Storage::disk('public')->exists(str_replace('/storage/', '', $testimonial->image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $testimonial->image));
        }
        $testimonial->delete();
    }
}
