<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTestimonialRequest;
use App\Models\Testimonial;
use App\Services\TestimonialService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    public function __construct(protected TestimonialService $testimonialService) {}

    public function index(): Response
    {
        $testimonials = $this->testimonialService->all();
        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => $testimonials,
        ]);
    }

    public function store(StoreTestimonialRequest $request): RedirectResponse
    {
        $this->testimonialService->create($request->validated());
        return redirect()->back()->with('success', 'Testimonial created successfully.');
    }

    public function update(StoreTestimonialRequest $request, Testimonial $testimonial): RedirectResponse
    {
        $this->testimonialService->update($testimonial, $request->validated());
        return redirect()->back()->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $this->testimonialService->delete($testimonial);
        return redirect()->back()->with('success', 'Testimonial deleted successfully.');
    }
}
