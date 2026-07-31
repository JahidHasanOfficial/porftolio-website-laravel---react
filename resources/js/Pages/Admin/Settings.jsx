import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, Upload } from 'lucide-react';

export default function Settings({ settings }) {
    // Safely parse typing titles
    let initialTypingTitles = '';
    if (settings?.typing_titles) {
        try {
            if (typeof settings.typing_titles === 'string') {
                initialTypingTitles = JSON.parse(settings.typing_titles).join(', ');
            } else if (Array.isArray(settings.typing_titles)) {
                initialTypingTitles = settings.typing_titles.join(', ');
            }
        } catch (e) {
            console.error(e);
        }
    }

    // Populate form with existing settings
    const { data, setData, post, processing, errors } = useForm({
        name: settings.name || '',
        designation: settings.designation || '',
        typing_titles: initialTypingTitles,
        short_intro: settings.short_intro || '',
        biography: settings.biography || '',
        professional_summary: settings.professional_summary || '',
        years_of_experience: settings.years_of_experience || '0',
        career_objective: settings.career_objective || '',
        phone: settings.phone || '',
        email: settings.email || '',
        address: settings.address || '',
        github_url: settings.github_url || '',
        linkedin_url: settings.linkedin_url || '',
        twitter_url: settings.twitter_url || '',
        facebook_url: settings.facebook_url || '',
        meta_title: settings.meta_title || '',
        meta_description: settings.meta_description || '',
        meta_keywords: settings.meta_keywords || '',
        logo: null,
        favicon: null,
        theme: settings.theme || 'dark',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Since we are uploading files, we use POST request
        post(route('admin.settings.update'));
    };

    return (
        <AdminLayout title="System Settings">
            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
                {/* 1. Profile Info Card */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 space-y-6">
                    <h3 className="font-bold text-lg border-b border-slate-100 dark:border-slate-800 pb-3">Personal & Professional Information</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                required
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Designation</label>
                            <input
                                type="text"
                                value={data.designation}
                                onChange={(e) => setData('designation', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                required
                            />
                            {errors.designation && <p className="text-xs text-red-500">{errors.designation}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Typing Titles (Comma Separated)</label>
                            <input
                                type="text"
                                value={data.typing_titles}
                                onChange={(e) => setData('typing_titles', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                placeholder="Laravel Expert, React Developer, DevOps"
                            />
                            {errors.typing_titles && <p className="text-xs text-red-500">{errors.typing_titles}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Years of Experience</label>
                            <input
                                type="number"
                                value={data.years_of_experience}
                                onChange={(e) => setData('years_of_experience', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                required
                            />
                            {errors.years_of_experience && <p className="text-xs text-red-500">{errors.years_of_experience}</p>}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">Short Intro (Hero text)</label>
                        <textarea
                            rows={3}
                            value={data.short_intro}
                            onChange={(e) => setData('short_intro', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            required
                        />
                        {errors.short_intro && <p className="text-xs text-red-500">{errors.short_intro}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">Full Biography</label>
                        <textarea
                            rows={5}
                            value={data.biography}
                            onChange={(e) => setData('biography', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            required
                        />
                        {errors.biography && <p className="text-xs text-red-500">{errors.biography}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">Professional Summary</label>
                        <textarea
                            rows={3}
                            value={data.professional_summary}
                            onChange={(e) => setData('professional_summary', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            required
                        />
                        {errors.professional_summary && <p className="text-xs text-red-500">{errors.professional_summary}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">Career Objective</label>
                        <textarea
                            rows={3}
                            value={data.career_objective}
                            onChange={(e) => setData('career_objective', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            required
                        />
                        {errors.career_objective && <p className="text-xs text-red-500">{errors.career_objective}</p>}
                    </div>
                </div>

                {/* 2. Contact & Socials Card */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 space-y-6">
                    <h3 className="font-bold text-lg border-b border-slate-100 dark:border-slate-800 pb-3">Contact Details & Social Network Links</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Phone</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            />
                            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Address</label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            />
                            {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">GitHub Profile URL</label>
                            <input
                                type="url"
                                value={data.github_url}
                                onChange={(e) => setData('github_url', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-55 dark:bg-slate-950 text-slate-850 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-655"
                            />
                            {errors.github_url && <p className="text-xs text-red-500">{errors.github_url}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">LinkedIn Profile URL</label>
                            <input
                                type="url"
                                value={data.linkedin_url}
                                onChange={(e) => setData('linkedin_url', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-55 dark:bg-slate-950 text-slate-850 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-655"
                            />
                            {errors.linkedin_url && <p className="text-xs text-red-500">{errors.linkedin_url}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Twitter Profile URL</label>
                            <input
                                type="url"
                                value={data.twitter_url}
                                onChange={(e) => setData('twitter_url', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-55 dark:bg-slate-950 text-slate-850 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-655"
                            />
                            {errors.twitter_url && <p className="text-xs text-red-500">{errors.twitter_url}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Facebook Profile URL</label>
                            <input
                                type="url"
                                value={data.facebook_url}
                                onChange={(e) => setData('facebook_url', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-55 dark:bg-slate-950 text-slate-850 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-655"
                            />
                            {errors.facebook_url && <p className="text-xs text-red-500">{errors.facebook_url}</p>}
                        </div>
                    </div>
                </div>

                {/* 3. SEO & Theme Card */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 space-y-6">
                    <h3 className="font-bold text-lg border-b border-slate-100 dark:border-slate-800 pb-3">Search Engine Optimization (SEO) & Theme Config</h3>
                    
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">Global Meta Title</label>
                        <input
                            type="text"
                            value={data.meta_title}
                            onChange={(e) => setData('meta_title', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            required
                        />
                        {errors.meta_title && <p className="text-xs text-red-500">{errors.meta_title}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">Global Meta Keywords (Comma Separated)</label>
                        <input
                            type="text"
                            value={data.meta_keywords}
                            onChange={(e) => setData('meta_keywords', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-850 bg-slate-55 dark:bg-slate-950 text-slate-850 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-655"
                        />
                        {errors.meta_keywords && <p className="text-xs text-red-500">{errors.meta_keywords}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">Global Meta Description</label>
                        <textarea
                            rows={3}
                            value={data.meta_description}
                            onChange={(e) => setData('meta_description', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                            required
                        />
                        {errors.meta_description && <p className="text-xs text-red-500">{errors.meta_description}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Default Site Theme</label>
                            <select
                                value={data.theme}
                                onChange={(e) => setData('theme', e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:border-indigo-650 cursor-pointer"
                            >
                                <option value="dark">Dark Theme</option>
                                <option value="light">Light Theme</option>
                            </select>
                            {errors.theme && <p className="text-xs text-red-500">{errors.theme}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">Upload Site Logo</label>
                            <input
                                type="file"
                                onChange={(e) => setData('logo', e.target.files[0])}
                                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-705 dark:file:bg-slate-800 dark:file:text-slate-300 hover:file:bg-slate-200 dark:hover:file:bg-slate-750 file:cursor-pointer"
                            />
                            {errors.logo && <p className="text-xs text-red-500">{errors.logo}</p>}
                            {settings.logo && (
                                <p className="text-[10px] text-slate-400 mt-1">Current: <a href={settings.logo} target="_blank" className="underline">{settings.logo}</a></p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">Upload Site Favicon</label>
                            <input
                                type="file"
                                onChange={(e) => setData('favicon', e.target.files[0])}
                                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-705 dark:file:bg-slate-800 dark:file:text-slate-300 hover:file:bg-slate-200 dark:hover:file:bg-slate-750 file:cursor-pointer"
                            />
                            {errors.favicon && <p className="text-xs text-red-500">{errors.favicon}</p>}
                            {settings.favicon && (
                                <p className="text-[10px] text-slate-400 mt-1">Current: <a href={settings.favicon} target="_blank" className="underline">{settings.favicon}</a></p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all gap-2 cursor-pointer disabled:opacity-50"
                    >
                        <Save className="h-4.5 w-4.5" />
                        {processing ? 'Saving...' : 'Save Configuration'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
