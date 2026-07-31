<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\CertificateController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\ResumeController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ContactMessageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Public Visitor Routes
Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/about', [PortfolioController::class, 'about'])->name('about');
Route::get('/projects', [PortfolioController::class, 'projects'])->name('projects.index');
Route::get('/projects/{slug}', [PortfolioController::class, 'projectDetails'])->name('projects.show');
Route::get('/blogs', [PortfolioController::class, 'blogs'])->name('blogs.index');
Route::get('/blogs/{slug}', [PortfolioController::class, 'blogDetails'])->name('blogs.show');
Route::post('/contact', [PortfolioController::class, 'contact'])->name('contact.submit');
Route::get('/resume/download', [PortfolioController::class, 'downloadResume'])->name('resume.download');

// Admin Panel Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Breeze default redirects post-login to Route('dashboard')
    Route::get('/admin/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile Settings (Breeze default)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('admin')->name('admin.')->group(function () {
        // Global Site Settings
        Route::get('/settings', [SettingController::class, 'index'])->name('settings.index');
        Route::post('/settings', [SettingController::class, 'update'])->name('settings.update');

        // CRUDs
        Route::resource('skills', SkillController::class)->except(['create', 'show', 'edit']);
        Route::resource('experiences', ExperienceController::class)->except(['create', 'show', 'edit']);
        Route::resource('education', EducationController::class)->except(['create', 'show', 'edit']);
        Route::resource('services', ServiceController::class)->except(['create', 'show', 'edit']);
        Route::resource('certificates', CertificateController::class)->except(['create', 'show', 'edit']);
        Route::resource('testimonials', TestimonialController::class)->except(['create', 'show', 'edit']);
        
        Route::resource('blogs', BlogController::class);
        Route::resource('projects', ProjectController::class);
        Route::delete('projects/screenshots/{screenshot}', [ProjectController::class, 'deleteScreenshot'])->name('projects.screenshots.destroy');

        Route::get('/resume', [ResumeController::class, 'index'])->name('resume.index');
        Route::post('/resume', [ResumeController::class, 'store'])->name('resume.store');

        Route::get('/messages', [ContactMessageController::class, 'index'])->name('messages.index');
        Route::put('/messages/{message}', [ContactMessageController::class, 'update'])->name('messages.update');
        Route::delete('/messages/{message}', [ContactMessageController::class, 'destroy'])->name('messages.destroy');
    });
});

require __DIR__.'/auth.php';
