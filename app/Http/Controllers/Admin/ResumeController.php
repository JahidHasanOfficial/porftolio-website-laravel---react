<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreResumeRequest;
use App\Services\ResumeService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ResumeController extends Controller
{
    public function __construct(protected ResumeService $resumeService) {}

    public function index(): Response
    {
        $resume = $this->resumeService->getResume();
        return Inertia::render('Admin/Resume/Index', [
            'resume' => $resume,
        ]);
    }

    public function store(StoreResumeRequest $request): RedirectResponse
    {
        if ($request->hasFile('resume')) {
            $this->resumeService->uploadResume($request->file('resume'));
            return redirect()->back()->with('success', 'Resume uploaded successfully.');
        }
        return redirect()->back()->with('error', 'No file was provided.');
    }
}
