import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Award, ExternalLink, Calendar } from 'lucide-react';

export default function Index({ certificates }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const { data, setData, post, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        issuer: '',
        date: '',
        credential_url: '',
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
        const certDate = item.date ? new Date(item.date).toISOString().split('T')[0] : '';
        setData({
            name: item.name,
            issuer: item.issuer,
            date: certDate,
            credential_url: item.credential_url || '',
            image: null, // Files start null for edit unless changed
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editItem) {
            // Use router.post with _method=PUT to handle multipart files in update requests
            router.post(
                route('admin.certificates.update', editItem.id),
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
            post(route('admin.certificates.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Delete this certificate?')) {
            destroy(route('admin.certificates.destroy', id));
        }
    };

    return (
        <AdminLayout title="Manage Certificates">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500 font-medium">Configure credentials and awards.</p>
                    <button
                        onClick={openCreateModal}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-650 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                        <Plus className="h-4.5 w-4.5" /> Add Certificate
                    </button>
                </div>

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900 shadow-sm flex gap-4 hover:shadow-md transition-shadow">
                            <div className="h-16 w-20 bg-slate-100 dark:bg-slate-950 rounded-lg flex items-center justify-center flex-shrink-0 text-slate-400 overflow-hidden border border-slate-100 dark:border-slate-850">
                                {cert.image ? (
                                    <img src={cert.image} alt={cert.name} className="h-full w-full object-cover" />
                                ) : (
                                    <Award className="h-7 w-7 text-indigo-655" />
                                )}
                            </div>
                            <div className="flex-grow flex flex-col justify-between">
                                <div>
                                    <h4 className="font-bold text-sm text-slate-805 dark:text-slate-150 leading-snug">{cert.name}</h4>
                                    <p className="text-xs text-slate-450 dark:text-slate-400 mt-0.5">Issuer: {cert.issuer}</p>
                                </div>
                                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-50 dark:border-slate-850 mt-2">
                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(cert.date).toLocaleDateString()}</span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => openEditModal(cert)}
                                            className="text-indigo-600 hover:underline cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cert.id)}
                                            className="text-red-600 hover:underline cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
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
                                {editItem ? 'Edit Certificate' : 'Add New Certificate'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-100">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Certificate Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                    placeholder="e.g. Meta Front-End Certificate"
                                    required
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500">Issuer / Organization</label>
                                <input
                                    type="text"
                                    value={data.issuer}
                                    onChange={(e) => setData('issuer', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                    placeholder="e.g. Coursera / Meta"
                                    required
                                />
                                {errors.issuer && <p className="text-xs text-red-500">{errors.issuer}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500">Date Issued</label>
                                    <input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-700 dark:text-slate-350 text-sm focus:outline-none focus:border-indigo-650"
                                        required
                                    />
                                    {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500">Verification URL</label>
                                    <input
                                        type="url"
                                        value={data.credential_url}
                                        onChange={(e) => setData('credential_url', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-55 dark:bg-slate-950 text-slate-805 dark:text-slate-100 text-sm focus:outline-none focus:border-indigo-650"
                                        placeholder="https://..."
                                    />
                                    {errors.credential_url && <p className="text-xs text-red-500">{errors.credential_url}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 flex items-center gap-1">Upload image certificate</label>
                                <input
                                    type="file"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-705 dark:file:bg-slate-800 dark:file:text-slate-300 hover:file:bg-slate-200 dark:hover:file:bg-slate-750 file:cursor-pointer"
                                    required={!editItem}
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
                                    {processing ? 'Saving...' : 'Save Certificate'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
