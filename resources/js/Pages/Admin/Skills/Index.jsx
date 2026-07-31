import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Percent, Briefcase } from 'lucide-react';

export default function Index({ skills }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        category: 'frontend',
        percentage: 80,
        years_of_experience: 1,
        icon: '',
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
        setData({
            name: item.name,
            category: item.category,
            percentage: item.percentage,
            years_of_experience: item.years_of_experience,
            icon: item.icon || '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editItem) {
            put(route('admin.skills.update', editItem.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        } else {
            post(route('admin.skills.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            destroy(route('admin.skills.destroy', id));
        }
    };

    const categories = {
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database',
        tools: 'Tools & DevOps',
        deployment: 'Deployment'
    };

    return (
        <AdminLayout title="Manage Skills">
            <div className="space-y-6">
                {/* Header Action */}
                <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500">Configure and list technical proficiencies.</p>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-650 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                        <Plus className="h-4.5 w-4.5" /> Add Skill
                    </button>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(categories).map(([key, label]) => {
                        const catSkills = skills.filter(s => s.category === key);
                        return (
                            <div key={key} className="rounded-2xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-xs">
                                <h3 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
                                    {label} ({catSkills.length})
                                </h3>

                                {catSkills.length > 0 ? (
                                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {catSkills.map((skill) => (
                                            <div key={skill.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">{skill.name}</p>
                                                    <p className="text-[10px] text-slate-400">{skill.years_of_experience} yrs experience &bull; {skill.percentage}%</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => openEditModal(skill)}
                                                        className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(skill.id)}
                                                        className="p-1.5 text-slate-400 hover:text-red-650 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-400 italic py-2">No skills in this category.</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal Dialog */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
                    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6 overflow-hidden">
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-250">
                                {editItem ? 'Edit Skill' : 'Create New Skill'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-100">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Skill Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                    placeholder="e.g. React, Laravel"
                                    required
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Category</label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:border-indigo-650 cursor-pointer"
                                >
                                    {Object.entries(categories).map(([val, lbl]) => (
                                        <option key={val} value={val}>{lbl}</option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                                        <Percent className="h-3.5 w-3.5" /> Proficiency (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={data.percentage}
                                        onChange={(e) => setData('percentage', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                        required
                                    />
                                    {errors.percentage && <p className="text-xs text-red-500">{errors.percentage}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                                        <Briefcase className="h-3.5 w-3.5" /> Experience (Yrs)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="50"
                                        value={data.years_of_experience}
                                        onChange={(e) => setData('years_of_experience', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                        required
                                    />
                                    {errors.years_of_experience && <p className="text-xs text-red-500">{errors.years_of_experience}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Icon Class (Lucide Icon Name)</label>
                                <input
                                    type="text"
                                    value={data.icon}
                                    onChange={(e) => setData('icon', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                    placeholder="e.g. Code2, Database, Award"
                                />
                                {errors.icon && <p className="text-xs text-red-500">{errors.icon}</p>}
                            </div>

                            <div className="flex justify-end pt-4 space-x-3">
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
                                    {processing ? 'Saving...' : 'Save Skill'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
