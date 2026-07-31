import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, GraduationCap } from 'lucide-react';

export default function Index({ educations }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        institute: '',
        degree: '',
        department: '',
        session: '',
        result: '',
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
            institute: item.institute,
            degree: item.degree,
            department: item.department || '',
            session: item.session,
            result: item.result || '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editItem) {
            put(route('admin.education.update', editItem.id), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        } else {
            post(route('admin.education.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this education record?')) {
            destroy(route('admin.education.destroy', id));
        }
    };

    return (
        <AdminLayout title="Manage Education">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500 font-medium">Record academic history and degrees.</p>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-650 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                        <Plus className="h-4.5 w-4.5" /> Add Education
                    </button>
                </div>

                {/* Educations List */}
                <div className="rounded-2xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
                    {educations.length > 0 ? (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {educations.map((edu) => (
                                <div key={edu.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                                    <div className="flex items-center space-x-3.5">
                                        <div className="h-10 w-10 rounded-xl bg-slate-105 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                                            <GraduationCap className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base text-slate-850 dark:text-slate-150 leading-tight">
                                                {edu.degree}
                                            </h4>
                                            <p className="text-xs text-slate-450 dark:text-slate-400 mt-1">
                                                {edu.institute} {edu.department && `(${edu.department})`} &bull; Session: {edu.session}
                                            </p>
                                            {edu.result && (
                                                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1">Result: {edu.result}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => openEditModal(edu)}
                                            className="p-2 border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-indigo-650 dark:border-slate-800 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                                            title="Edit"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(edu.id)}
                                            className="p-2 border border-slate-200 text-red-600 hover:bg-red-50 dark:border-slate-800 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-slate-405 dark:text-slate-500">
                            <p className="text-xs">No educational records found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Dialog */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
                    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6 overflow-hidden">
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="font-bold text-lg text-slate-850 dark:text-slate-250">
                                {editItem ? 'Edit Education Record' : 'Add Education Record'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-100">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Institute</label>
                                <input
                                    type="text"
                                    value={data.institute}
                                    onChange={(e) => setData('institute', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                    placeholder="e.g. Dhaka University"
                                    required
                                />
                                {errors.institute && <p className="text-xs text-red-500">{errors.institute}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Degree</label>
                                <input
                                    type="text"
                                    value={data.degree}
                                    onChange={(e) => setData('degree', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                    placeholder="e.g. B.Sc. in CSE"
                                    required
                                />
                                {errors.degree && <p className="text-xs text-red-500">{errors.degree}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Department / Major (Optional)</label>
                                <input
                                    type="text"
                                    value={data.department}
                                    onChange={(e) => setData('department', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                    placeholder="e.g. Computer Science & Engineering"
                                />
                                {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500">Session Year</label>
                                    <input
                                        type="text"
                                        value={data.session}
                                        onChange={(e) => setData('session', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-655"
                                        placeholder="e.g. 2017 - 2021"
                                        required
                                    />
                                    {errors.session && <p className="text-xs text-red-500">{errors.session}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500">Result (Optional)</label>
                                    <input
                                        type="text"
                                        value={data.result}
                                        onChange={(e) => setData('result', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-655"
                                        placeholder="e.g. CGPA 3.85"
                                    />
                                    {errors.result && <p className="text-xs text-red-500">{errors.result}</p>}
                                </div>
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
                                    {processing ? 'Saving...' : 'Save Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
