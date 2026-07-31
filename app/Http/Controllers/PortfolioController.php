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
use App\Models\Project;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

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
        $settings = $this->settingService->getAllSettings();
        $skills = $this->skillService->all();
        $experiences = $this->experienceService->all()->take(3); // Eager loaded list
        $services = $this->serviceService->all();
        
        // Eager loading screenshots and paging/sorting featured projects
        $featuredProjects = Project::with('screenshots')
            ->where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        $testimonials = $this->testimonialService->all();
        $latestBlogs = Blog::where('status', 'published')
            ->orderBy('publish_date', 'desc')
            ->take(3)
            ->get();

        $resume = $this->resumeService->getResume();

        return Inertia::render('Home', [
            'settings' => $settings,
            'skills' => $skills,
            'experiences' => $experiences,
            'services' => $services,
            'featuredProjects' => $featuredProjects,
            'testimonials' => $testimonials,
            'latestBlogs' => $latestBlogs,
            'resume' => $resume,
        ]);
    }

    public function about(): Response
    {
        $settings = $this->settingService->getAllSettings();
        $experiences = $this->experienceService->all();
        $educations = $this->educationService->all();
        $certificates = $this->certificateService->all();
        $resume = $this->resumeService->getResume();

        return Inertia::render('About', [
            'settings' => $settings,
            'experiences' => $experiences,
            'educations' => $educations,
            'certificates' => $certificates,
            'resume' => $resume,
        ]);
    }

    public function projects(Request $request): Response
    {
        $category = $request->input('category');
        $search = $request->input('search');
        $sort = $request->input('sort', 'newest');

        $projects = $this->projectService->paginatedForPublic($category, $search, $sort, 9);
        $settings = $this->settingService->getAllSettings();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters' => [
                'category' => $category,
                'search' => $search,
                'sort' => $sort,
            ],
            'settings' => $settings,
        ]);
    }

    public function projectDetails(string $slug): Response
    {
        $project = Project::with('screenshots')->where('slug', $slug)->firstOrFail();
        $settings = $this->settingService->getAllSettings();

        // Load related projects in same category
        $relatedProjects = Project::where('category', $project->category)
            ->where('id', '!=', $project->id)
            ->take(3)
            ->get();

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'relatedProjects' => $relatedProjects,
            'settings' => $settings,
        ]);
    }

    public function blogs(Request $request): Response
    {
        $category = $request->input('category');
        $search = $request->input('search');

        $blogs = $this->blogService->paginatedForPublic($category, $search, 6);
        $settings = $this->settingService->getAllSettings();

        return Inertia::render('Blog/Index', [
            'blogs' => $blogs,
            'filters' => [
                'category' => $category,
                'search' => $search,
            ],
            'settings' => $settings,
        ]);
    }

    public function blogDetails(string $slug): Response
    {
        $blog = Blog::where('slug', $slug)->where('status', 'published')->firstOrFail();
        $settings = $this->settingService->getAllSettings();

        $relatedBlogs = Blog::where('category', $blog->category)
            ->where('id', '!=', $blog->id)
            ->where('status', 'published')
            ->take(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'blog' => $blog,
            'relatedBlogs' => $relatedBlogs,
            'settings' => $settings,
        ]);
    }

    public function contact(StoreContactMessageRequest $request)
    {
        // Save using service
        $this->contactMessageService->create($request->validated());

        return redirect()->back()->with('success', 'Message sent successfully!');
    }

    public function downloadResume()
    {
        $resume = $this->resumeService->incrementDownloadCount();
        if (!$resume || !$resume->file_path) {
            return redirect()->back()->with('error', 'Resume not available.');
        }

        $cleanPath = str_replace('/storage/', '', $resume->file_path);
        if (Storage::disk('public')->exists($cleanPath)) {
            return Storage::disk('public')->download($cleanPath, 'Jahid_Hasan_Resume.pdf');
        }

        return redirect()->back()->with('error', 'Resume file not found on server.');
    }
}
