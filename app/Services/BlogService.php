<?php

namespace App\Services;

use App\Models\Blog;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogService
{
    public function paginatedForPublic(?string $category = null, ?string $search = null, int $perPage = 6): LengthAwarePaginator
    {
        $query = Blog::where('status', 'published');

        if ($category) {
            $query->where('category', $category);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        return $query->orderBy('publish_date', 'desc')->paginate($perPage);
    }

    public function getLatestPublished(int $limit = 3)
    {
        return Blog::where('status', 'published')
            ->orderBy('publish_date', 'desc')
            ->take($limit)
            ->get();
    }

    public function getBySlug(string $slug): Blog
    {
        return Blog::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();
    }

    public function getRelatedBlogs(Blog $blog, int $limit = 3)
    {
        return Blog::where('category', $blog->category)
            ->where('id', '!=', $blog->id)
            ->where('status', 'published')
            ->take($limit)
            ->get();
    }

    public function allForAdmin(int $perPage = 10): LengthAwarePaginator
    {
        return Blog::orderBy('created_at', 'desc')->paginate($perPage);
    }

    public function create(array $data): Blog
    {
        $data['slug'] = Str::slug($data['title']);

        if (isset($data['thumbnail']) && request()->hasFile('thumbnail')) {
            $path = request()->file('thumbnail')->store('blogs', 'public');
            $data['thumbnail'] = '/storage/' . $path;
        }

        if ($data['status'] === 'published' && !isset($data['publish_date'])) {
            $data['publish_date'] = now();
        }

        return Blog::create($data);
    }

    public function update(Blog $blog, array $data): Blog
    {
        $data['slug'] = Str::slug($data['title']);

        if (isset($data['thumbnail']) && request()->hasFile('thumbnail')) {
            if ($blog->thumbnail && Storage::disk('public')->exists(str_replace('/storage/', '', $blog->thumbnail))) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $blog->thumbnail));
            }
            $path = request()->file('thumbnail')->store('blogs', 'public');
            $data['thumbnail'] = '/storage/' . $path;
        }

        if ($data['status'] === 'published' && !$blog->publish_date) {
            $data['publish_date'] = now();
        }

        $blog->update($data);
        return $blog;
    }

    public function delete(Blog $blog): void
    {
        if ($blog->thumbnail && Storage::disk('public')->exists(str_replace('/storage/', '', $blog->thumbnail))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $blog->thumbnail));
        }
        $blog->delete();
    }
}
