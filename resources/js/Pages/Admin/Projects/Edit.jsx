import React from 'react';
import { useForm, router, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, Trash2, X } from 'lucide-react';

export default function Edit({ project }) {
    const { data, setData, processing, errors } = useForm({
        name: project.name || '',
        category: project.category || 'ERP',
        status: project.status || 'Completed',
        client: project.client || '',
        duration: project.duration || '',
        description: project.description || '',
        overview: project.overview || '',
        problem: project.problem || '',
        solution: project.solution || '',
        features_text: project.features ? project.features.join(', ') : '',
        technology_stack_text: project.technology_stack ? project.technology_stack.join(', ') : '',
        live_demo: project.live_demo || '',
        github: project.github || '',
        challenges: project.challenges || '',
        solutions: project.solutions || '',
        thumbnail: null,
        is_featured: !!project.is_featured,
        screenshots: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const techArray = data.technology_stack_text
            ? data.technology_stack_text.split(',').map(t => t.trim()).filter(Boolean)
            : [];
            
        const featuresArray = data.features_text
            ? data.features_text.split(',').map(f => f.trim()).filter(Boolean)
            : [];

        // Direct submission using router.post with method PUT override
        router.post(route('admin.projects.update', project.id), {
            ...data,
            technology_stack: techArray,
            features: featuresArray,
            _method: 'PUT'
        });
    };

    const handleDeleteScreenshot = (screenshotId) => {
        if (confirm('Delete this screenshot permanently?')) {
            router.delete(route('admin.projects.screenshots.destroy', screenshotId), {
                preserveScroll: true
            });
        }
    };

    const categories = ['ERP', 'CRM', 'HRM', 'POS', 'Inventory', 'LMS', 'E-Commerce', 'API', 'Portfolio'];
    const statuses = ['Completed', 'In Progress', 'Maintenance'];

    return (
        <AdminLayout title="Edit Project">
            <div className="space-y-6 max-w-4xl">
                <Link 
                    href={route('admin.projects.index')}
                    className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-indigo-655 dark:hover:text-indigo-400 gap-1"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to projects list
                </Link>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
                        <h3 className="font-bold text-base border-b border-slate-100 dark:border-slate-850 pb-3">Project Overview</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Project Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                    required
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>

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
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Client</label>
                                <input
                                    type="text"
                                    value={data.client}
                                    onChange={(e) => setData('client', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Duration</label>
                                <input
                                    type="text"
                                    value={data.duration}
                                    onChange={(e) => setData('duration', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                    required
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Status</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:border-indigo-650 cursor-pointer"
                                >
                                    {statuses.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="is_featured"
                                checked={data.is_featured}
                                onChange={(e) => setData('is_featured', e.target.checked)}
                                className="rounded border-slate-350 text-indigo-650 focus:ring-indigo-500 h-4 w-4"
                            />
                            <label htmlFor="is_featured" className="text-xs font-semibold text-slate-550">Feature this project on public homepage</label>
                        </div>
                    </div>

                    {/* Detailed Content */}
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
                        <h3 className="font-bold text-base border-b border-slate-100 dark:border-slate-850 pb-3">Project Narrative</h3>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-505">Short Description</label>
                            <textarea
                                rows={2}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-505">Overview (Extended Details)</label>
                            <textarea
                                rows={4}
                                value={data.overview}
                                onChange={(e) => setData('overview', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-505">The Problem Context</label>
                            <textarea
                                rows={3}
                                value={data.problem}
                                onChange={(e) => setData('problem', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-505">The Solution Architecture</label>
                            <textarea
                                rows={3}
                                value={data.solution}
                                onChange={(e) => setData('solution', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-505">Key Features (Comma Separated)</label>
                            <textarea
                                rows={3}
                                value={data.features_text}
                                onChange={(e) => setData('features_text', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-505">Technology Stack (Comma Separated)</label>
                            <input
                                type="text"
                                value={data.technology_stack_text}
                                onChange={(e) => setData('technology_stack_text', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-655"
                                required
                            />
                        </div>
                    </div>

                    {/* Challenges & Solutions */}
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
                        <h3 className="font-bold text-base border-b border-slate-100 dark:border-slate-850 pb-3">Development Challenges</h3>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-505">Challenges Faced</label>
                            <textarea
                                rows={3}
                                value={data.challenges}
                                onChange={(e) => setData('challenges', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-505">How they were solved</label>
                            <textarea
                                rows={3}
                                value={data.solutions}
                                onChange={(e) => setData('solutions', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            />
                        </div>
                    </div>

                    {/* Links & Uploads */}
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-sm">
                        <h3 className="font-bold text-base border-b border-slate-100 dark:border-slate-850 pb-3">Links & Galleries</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-505">Live Demo URL</label>
                                <input
                                    type="url"
                                    value={data.live_demo}
                                    onChange={(e) => setData('live_demo', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-505">GitHub Repository URL</label>
                                <input
                                    type="url"
                                    value={data.github}
                                    onChange={(e) => setData('github', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-55 dark:bg-slate-955 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-505">Upload New Thumbnail (Optional)</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('thumbnail', e.target.files[0])}
                                    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-705 dark:file:bg-slate-800 dark:file:text-slate-300 hover:file:bg-slate-200 dark:hover:file:bg-slate-750 file:cursor-pointer"
                                />
                                {project.thumbnail && (
                                    <p className="text-[10px] text-slate-450 mt-1">Current: <a href={project.thumbnail} target="_blank" className="underline">{project.thumbnail}</a></p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-505">Add More screenshots</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => setData('screenshots', Array.from(e.target.files))}
                                    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-705 dark:file:bg-slate-800 dark:file:text-slate-300 hover:file:bg-slate-200 dark:hover:file:bg-slate-750 file:cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Existing Screenshots Gallery */}
                        {project.screenshots && project.screenshots.length > 0 && (
                            <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-850">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Active Screenshots</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {project.screenshots.map((shot) => (
                                        <div key={shot.id} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 group">
                                            <img src={shot.image_path} className="h-full w-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteScreenshot(shot.id)}
                                                className="absolute top-2 right-2 p-1.5 rounded-md bg-red-600 hover:bg-red-750 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Delete screenshot"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                            <Save className="h-4.5 w-4.5" /> Save Project Changes
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
