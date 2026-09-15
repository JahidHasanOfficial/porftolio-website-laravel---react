import React from 'react';
import { useForm, router, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        category: 'Laravel',
        tags_text: '',
        tags: [],
        status: 'draft',
        thumbnail: null,
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const tagArray = data.tags_text
            ? data.tags_text.split(',').map(t => t.trim()).filter(Boolean)
            : [];

        // Direct submission using router.post for multipart files + tags data
        router.post(route('admin.blogs.store'), {
            ...data,
            tags: tagArray
        });
    };

    const categories = ['Laravel', 'React', 'PHP', 'JavaScript', 'MySQL', 'Career', 'Deployment'];

    return (
        <AdminLayout title="Create Blog Post">
            <div className="space-y-6 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                        <Link 
                            href={route('admin.blogs.index')}
                            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-xs"
                            title="Back to list"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Create New Article</h1>
                            <p className="text-xs text-slate-500">Write educational software engineering articles</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Link
                            href={route('admin.blogs.index')}
                            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={processing}
                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all active:scale-95 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" /> Publish Blog
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    {/* Basic Blog Info */}
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
                        <h3 className="font-bold text-base border-b border-slate-100 dark:border-slate-850 pb-3">Article Content</h3>
                        
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Post Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                required
                            />
                            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Category</label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:border-indigo-650 cursor-pointer"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-705 dark:text-slate-300 text-sm focus:outline-none focus:border-indigo-650 cursor-pointer"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                                {errors.status && <p className="text-xs text-red-500">{errors.status}</p>}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Tags (Comma Separated)</label>
                            <input
                                type="text"
                                value={data.tags_text}
                                onChange={(e) => setData('tags_text', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                placeholder="Eloquent, DB, Security"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Blog Content</label>
                            <textarea
                                rows={8}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                required
                            />
                            {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Upload Thumbnail</label>
                            <input
                                type="file"
                                onChange={(e) => setData('thumbnail', e.target.files[0])}
                                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-705 dark:file:bg-slate-800 dark:file:text-slate-300 hover:file:bg-slate-200 dark:hover:file:bg-slate-750 file:cursor-pointer"
                                required
                            />
                            {errors.thumbnail && <p className="text-xs text-red-500">{errors.thumbnail}</p>}
                        </div>
                    </div>

                    {/* SEO Config Card */}
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
                        <h3 className="font-bold text-base border-b border-slate-100 dark:border-slate-850 pb-3">SEO Optimization</h3>
                        
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">SEO Meta Title</label>
                            <input
                                type="text"
                                value={data.seo_title}
                                onChange={(e) => setData('seo_title', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                placeholder="Leave empty to use main post title"
                            />
                            {errors.seo_title && <p className="text-xs text-red-500">{errors.seo_title}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">SEO Keywords</label>
                            <input
                                type="text"
                                value={data.seo_keywords}
                                onChange={(e) => setData('seo_keywords', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-655"
                                placeholder="laravel optimization, eager loading"
                            />
                            {errors.seo_keywords && <p className="text-xs text-red-500">{errors.seo_keywords}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">SEO Meta Description</label>
                            <textarea
                                rows={3}
                                value={data.seo_description}
                                onChange={(e) => setData('seo_description', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                placeholder="Enter a brief summary for Google search snippets"
                            />
                            {errors.seo_description && <p className="text-xs text-red-500">{errors.seo_description}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                        <Link
                            href={route('admin.blogs.index')}
                            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            Cancel & Return
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95"
                        >
                            <Save className="h-4.5 w-4.5" /> Publish Blog Post
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
