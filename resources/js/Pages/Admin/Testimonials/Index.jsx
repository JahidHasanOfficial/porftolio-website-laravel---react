import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Star, MessageSquare } from 'lucide-react';

export default function Index({ testimonials }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        client_name: '',
        company: '',
        rating: 5,
        feedback: '',
        image: null,
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
            client_name: item.client_name,
            company: item.company || '',
            rating: item.rating,
            feedback: item.feedback,
            image: null,
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editItem) {
            router.post(
                route('admin.testimonials.update', editItem.id),
                {
                    ...data,
                    _method: 'PUT'
                },
                {
                    onSuccess: () => {
                        setIsModalOpen(false);
                        reset();
                    }
                }
            );
        } else {
            post(route('admin.testimonials.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this client testimonial?')) {
            destroy(route('admin.testimonials.destroy', id));
        }
    };

    return (
        <AdminLayout title="Manage Testimonials">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500 font-medium">Add and edit reviews from client contacts.</p>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-650 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                        <Plus className="h-4.5 w-4.5" /> Add Testimonial
                    </button>
                </div>

                {/* Testimonials list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((test) => (
                        <div key={test.id} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                                <div className="flex text-amber-500 space-x-0.5">
                                    {[...Array(test.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-current" />
                                    ))}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
                                    "{test.feedback}"
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center space-x-2">
                                    <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-xs overflow-hidden border border-slate-100 dark:border-slate-850">
                                        {test.image ? (
                                            <img src={test.image} alt={test.client_name} className="h-full w-full object-cover" />
                                        ) : (
                                            test.client_name[0]
                                        )}
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-xs text-slate-805 dark:text-slate-200">{test.client_name}</h5>
                                        <p className="text-[10px] text-slate-450">{test.company}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2 text-xs">
                                    <button
                                        onClick={() => openEditModal(test)}
                                        className="text-indigo-650 hover:underline cursor-pointer font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(test.id)}
                                        className="text-red-600 hover:underline cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Dialog */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
                    <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-6 overflow-hidden">
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                            <h3 className="font-bold text-lg text-slate-850 dark:text-slate-250">
                                {editItem ? 'Edit Testimonial' : 'Add Testimonial'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-100">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500">Client Name</label>
                                    <input
                                        type="text"
                                        value={data.client_name}
                                        onChange={(e) => setData('client_name', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                        placeholder="e.g. Sarah Connor"
                                        required
                                    />
                                    {errors.client_name && <p className="text-xs text-red-500">{errors.client_name}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500">Company / Role</label>
                                    <input
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData('company', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                        placeholder="e.g. Apex CEO"
                                    />
                                    {errors.company && <p className="text-xs text-red-500">{errors.company}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Rating Stars</label>
                                <select
                                    value={data.rating}
                                    onChange={(e) => setData('rating', parseInt(e.target.value))}
                                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-sm focus:outline-none focus:border-indigo-650 cursor-pointer"
                                >
                                    {[5, 4, 3, 2, 1].map((r) => (
                                        <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
                                    ))}
                                </select>
                                {errors.rating && <p className="text-xs text-red-500">{errors.rating}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Feedback Review</label>
                                <textarea
                                    rows={4}
                                    value={data.feedback}
                                    onChange={(e) => setData('feedback', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                    placeholder="Write client feedback details here..."
                                    required
                                />
                                {errors.feedback && <p className="text-xs text-red-500">{errors.feedback}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">Upload client avatar</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-705 dark:file:bg-slate-800 dark:file:text-slate-300 hover:file:bg-slate-200 dark:hover:file:bg-slate-750 file:cursor-pointer"
                                />
                                {errors.image && <p className="text-xs text-red-500">{errors.image}</p>}
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
                                    {processing ? 'Saving...' : 'Save Testimonial'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
