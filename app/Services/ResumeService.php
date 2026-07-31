<?php

namespace App\Services;

use App\Models\Resume;
use Illuminate\Support\Facades\Storage;

class ResumeService
{
    public function getResume(): ?Resume
    {
        return Resume::first();
    }

    public function incrementDownloadCount(): ?Resume
    {
        $resume = Resume::first();
        if ($resume) {
            $resume->increment('download_count');
        }
        return $resume;
    }

    public function uploadResume($file): Resume
    {
        $resume = Resume::firstOrNew(['id' => 1]);

        if ($resume->file_path && Storage::disk('public')->exists(str_replace('/storage/', '', $resume->file_path))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $resume->file_path));
        }

        $path = $file->storeAs('resumes', 'jahid_hasan_resume.pdf', 'public');
        
        $resume->file_path = '/storage/' . $path;
        $resume->save();

        return $resume;
    }
}
