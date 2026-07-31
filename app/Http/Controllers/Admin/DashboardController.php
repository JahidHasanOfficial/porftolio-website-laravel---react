<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\Resume;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalProjects = Project::count();
        $featuredProjects = Project::where('is_featured', true)->count();
        $totalSkills = Skill::count();
        $totalBlogs = Blog::count();
        $totalMessages = ContactMessage::count();
        $unreadMessages = ContactMessage::where('is_read', false)->count();
        
        $resume = Resume::first();
        $resumeDownloads = $resume ? $resume->download_count : 0;
        
        $totalCertificates = \App\Models\Certificate::count();

        $recentMessages = ContactMessage::orderBy('created_at', 'desc')->take(5)->get();
        $recentProjects = Project::orderBy('created_at', 'desc')->take(4)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_projects' => $totalProjects,
                'featured_projects' => $featuredProjects,
                'total_skills' => $totalSkills,
                'total_blogs' => $totalBlogs,
                'total_messages' => $totalMessages,
                'unread_messages' => $unreadMessages,
                'resume_downloads' => $resumeDownloads,
                'visitors' => 15280, // Mock visitor metrics matching dashboard design
                'total_certificates' => $totalCertificates,
            ],
            'recentMessages' => $recentMessages,
            'recentProjects' => $recentProjects,
        ]);
    }
}
