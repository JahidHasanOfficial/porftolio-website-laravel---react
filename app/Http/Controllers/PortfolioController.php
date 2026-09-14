<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactMessageRequest;
use App\Services\BlogService;
use App\Services\CertificateService;
use App\Services\ContactMessageService;
use App\Services\EducationService;
use App\Services\ExperienceService;
use App\Services\ProjectService;
use App\Services\ResumeService;
use App\Services\ServiceService;
use App\Services\SettingService;
use App\Services\SkillService;
use App\Services\TestimonialService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PortfolioController extends Controller
{
    public function __construct(
        protected SettingService $settingService,
        protected SkillService $skillService,
        protected ExperienceService $experienceService,
        protected EducationService $educationService,
        protected ServiceService $serviceService,
        protected CertificateService $certificateService,
        protected ProjectService $projectService,
        protected TestimonialService $testimonialService,
        protected BlogService $blogService,
        protected ContactMessageService $contactMessageService,
        protected ResumeService $resumeService
    ) {}

    public function home(): Response
    {
        return Inertia::render('Home', [
            'settings' => $this->settingService->getAllSettings(),
            'skills' => $this->skillService->all(),
            'experiences' => $this->experienceService->all(),
            'services' => $this->serviceService->all(),
            'featuredProjects' => $this->projectService->getFeaturedProjects(6),
            'testimonials' => $this->testimonialService->all(),
            'latestBlogs' => $this->blogService->getLatestPublished(3),
            'resume' => $this->resumeService->getResume(),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('About', [
            'settings' => $this->settingService->getAllSettings(),
            'experiences' => $this->experienceService->all(),
            'educations' => $this->educationService->all(),
            'certificates' => $this->certificateService->all(),
            'skills' => $this->skillService->all(),
            'resume' => $this->resumeService->getResume(),
        ]);
    }

    public function projects(Request $request): Response
    {
        $category = $request->input('category');
        $search = $request->input('search');
        $sort = $request->input('sort', 'newest');

        return Inertia::render('Projects/Index', [
            'projects' => $this->projectService->paginatedForPublic($category, $search, $sort, 9),
            'filters' => [
                'category' => $category,
                'search' => $search,
                'sort' => $sort,
            ],
            'settings' => $this->settingService->getAllSettings(),
        ]);
    }

    public function projectDetails(string $slug): Response
    {
        $project = $this->projectService->getBySlug($slug);
        $relatedProjects = $this->projectService->getRelatedProjects($project, 3);

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'relatedProjects' => $relatedProjects,
            'settings' => $this->settingService->getAllSettings(),
        ]);
    }

    public function blogs(Request $request): Response
    {
        $category = $request->input('category');
        $search = $request->input('search');

        return Inertia::render('Blog/Index', [
            'blogs' => $this->blogService->paginatedForPublic($category, $search, 6),
            'filters' => [
                'category' => $category,
                'search' => $search,
            ],
            'settings' => $this->settingService->getAllSettings(),
        ]);
    }

    public function blogDetails(string $slug): Response
    {
        $blog = $this->blogService->getBySlug($slug);
        $relatedBlogs = $this->blogService->getRelatedBlogs($blog, 3);

        return Inertia::render('Blog/Show', [
            'blog' => $blog,
            'relatedBlogs' => $relatedBlogs,
            'settings' => $this->settingService->getAllSettings(),
        ]);
    }

    public function contact(StoreContactMessageRequest $request): RedirectResponse
    {
        $this->contactMessageService->create($request->validated());

        return redirect()->back()->with('success', 'Thank you! Your message has been sent successfully. I will get back to you shortly.');
    }

    public function downloadResume(): StreamedResponse|\Symfony\Component\HttpFoundation\BinaryFileResponse|RedirectResponse
    {
        $resume = $this->resumeService->incrementDownloadCount();
        
        // 1. Check if public/assets/resume.pdf exists directly
        if (file_exists(public_path('assets/resume.pdf'))) {
            return response()->download(public_path('assets/resume.pdf'), 'Jahid_Hasan_Software_Engineer_Resume.pdf');
        }

        // 2. Check storage disk
        if ($resume && $resume->file_path) {
            $cleanPath = str_replace('/storage/', '', $resume->file_path);
            if (Storage::disk('public')->exists($cleanPath)) {
                return Storage::disk('public')->download($cleanPath, 'Jahid_Hasan_Software_Engineer_Resume.pdf');
            }
            if (file_exists(public_path(ltrim($resume->file_path, '/')))) {
                return response()->download(public_path(ltrim($resume->file_path, '/')), 'Jahid_Hasan_Software_Engineer_Resume.pdf');
            }
        }

        return redirect()->back()->with('error', 'Resume file not found on server.');
    }
}
