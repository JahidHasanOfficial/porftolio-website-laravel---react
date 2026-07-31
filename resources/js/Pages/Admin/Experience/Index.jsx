import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Briefcase, Calendar } from 'lucide-react';

export default function Index({ experiences }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        company: '',
        position: '',
        location: '',
        start_date: '',
        end_date: '',
        is_current: false,
        responsibilities: '',
        technologies_text: '', // Helper field for editing tags
        technologies: [],
        achievements: '',
    });

    const openCreateModal = () => {
        reset();
        clearErrors();
        setEditItem(null);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        clearErrors();
        setEditItem(item);
        // Format dates to YYYY-MM-DD for inputs
        const start = item.start_date ? new Date(item.start_date).toISOString().split('T')[0] : '';
        const end = item.end_date ? new Date(item.end_date).toISOString().split('T')[0] : '';

        setData({
            company: item.company,
            position: item.position,
            location: item.location || '',
            start_date: start,
            end_date: end,
            is_current: !!item.is_current,
            responsibilities: item.responsibilities || '',
            technologies_text: item.technologies ? item.technologies.join(', ') : '',
            technologies: item.technologies || [],
            achievements: item.achievements || '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convert comma-separated string to clean array
        const techArray = data.technologies_text
            ? data.technologies_text.split(',').map(t => t.trim()).filter(Boolean)
            : [];
        
        // Since useForm setData is async, we can pass it directly to the submit call or map it on the fly
        const finalData = {
            ...data,
            technologies: techArray,
        };

        if (editItem) {
            // For custom data mapping in useForm, we can set key values and call put
            setData(prev => ({ ...prev, technologies: techArray }));
            router.put(route('admin.experiences.update', editItem.id), finalData, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        } else {
            post(route('admin.experiences.store'), {
                // Submit hook can accept data override
                forceFormData: false,
                data: finalData,
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this experience entry?')) {
            destroy(route('admin.experiences.destroy', id));
        }
    };

    return (
        <AdminLayout title="Manage Professional History">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500 font-medium">Add, modify, and manage work positions.</p>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-650 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                        <Plus className="h-4.5 w-4.5" /> Add Experience
                    </button>
                </div>

                {/* Experiences List */}
                <div className="rounded-2xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                    {experiences.length > 0 ? (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {experiences.map((exp) => (
                                <div key={exp.id} className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                                    <div className="space-y-3 flex-grow max-w-4xl">
                                        <div className="flex items-center space-x-2.5">
                                            <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                                                <Briefcase className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-base text-slate-850 dark:text-slate-150 leading-tight">
                                                    {exp.position}
                                                </h4>
                                                <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
                                                    {exp.company} &bull; {exp.location || 'Remote'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>
                                                {new Date(exp.start_date).toLocaleDateString(undefined, {month: 'short', year: 'numeric'})} - {exp.is_current ? 'Present' : new Date(exp.end_date).toLocaleDateString(undefined, {month: 'short', year: 'numeric'})}
                                            </span>
                                        </div>

                                        <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-850">
                                            {exp.responsibilities}
                                        </p>

                                        {exp.achievements && (
                                            <div className="text-xs text-slate-550 dark:text-slate-400">
                                                <span className="font-bold text-indigo-600 dark:text-indigo-400">Achievements: </span>
                                                {exp.achievements}
                                            </div>
                                        )}

                                        <div className="flex flex-wrap gap-1.5">
                                            {exp.technologies?.map((tech, idx) => (
                                                <span key={idx} className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-2">
                                        <button
                                            onClick={() => openEditModal(exp)}
                                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-655 hover:bg-slate-100 hover:text-indigo-650 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                                        >
                                            <Edit2 className="h-3.5 w-3.5" /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(exp.id)}
                                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-red-600 hover:bg-red-50 dark:border-slate-800 dark:text-red-400 dark:hover:bg-red-950/20 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                            <p className="text-xs">No experience records found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Dialog */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
                    <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 my-8">
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="font-bold text-lg text-slate-850 dark:text-slate-250">
                                {editItem ? 'Edit Job Experience' : 'Add Job Experience'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-100">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500">Company Name</label>
                                    <input
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                        required
                                    />
                                    {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500">Position Role</label>
                                    <input
                                        type="text"
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                        required
                                    />
                                    {errors.position && <p className="text-xs text-red-500">{errors.position}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Location</label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                    placeholder="e.g. Dhaka, Bangladesh or Remote"
                                />
                                {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500">Start Date</label>
                                    <input
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-700 dark:text-slate-350 text-sm focus:outline-none focus:border-indigo-650"
                                        required
                                    />
                                    {errors.start_date && <p className="text-xs text-red-500">{errors.start_date}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500">End Date</label>
                                    <input
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        disabled={data.is_current}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-700 dark:text-slate-355 text-sm focus:outline-none focus:border-indigo-650 disabled:opacity-40"
                                        required={!data.is_current}
                                    />
                                    {errors.end_date && <p className="text-xs text-red-500">{errors.end_date}</p>}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="is_current"
                                    checked={data.is_current}
                                    onChange={(e) => {
                                        setData('is_current', e.target.checked);
                                        if (e.target.checked) setData('end_date', '');
                                    }}
                                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-550 h-4 w-4"
                                />
                                <label htmlFor="is_current" className="text-xs font-semibold text-slate-600">Currently working in this position</label>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Responsibilities</label>
                                <textarea
                                    rows={4}
                                    value={data.responsibilities}
                                    onChange={(e) => setData('responsibilities', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                    required
                                />
                                {errors.responsibilities && <p className="text-xs text-red-500">{errors.responsibilities}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Key Achievements (Optional)</label>
                                <textarea
                                    rows={2}
                                    value={data.achievements}
                                    onChange={(e) => setData('achievements', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                />
                                {errors.achievements && <p className="text-xs text-red-500">{errors.achievements}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Technologies (Comma Separated)</label>
                                <input
                                    type="text"
                                    value={data.technologies_text}
                                    onChange={(e) => setData('technologies_text', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-655"
                                    placeholder="e.g. PHP, Laravel, React, MySQL"
                                    required
                                />
                            </div>

                            <div className="flex justify-end pt-2 space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-semibold cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold cursor-pointer disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Job'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
