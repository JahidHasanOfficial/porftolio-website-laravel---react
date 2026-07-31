import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, FolderCode, Star } from 'lucide-react';

export default function Index({ projects }) {
    const handleDelete = (id) => {
        if (confirm('Delete this project? This will remove all associated screenshots.')) {
            router.delete(route('admin.projects.destroy', id));
        }
    };

    return (
        <AdminLayout title="Manage Projects">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500">Add and manage showcase application items.</p>
                    <Link
                        href={route('admin.projects.create')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-650 hover:bg-indigo-700 rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                        <Plus className="h-4.5 w-4.5" /> Add Project
                    </Link>
                </div>

                {/* Table list */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                    {projects.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm border-collapse">
                                <thead>
                                    <tr className="bg-slate-55 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-805 text-slate-500 font-semibold">
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Category</th>
                                        <th className="p-4">Client</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Featured</th>
                                        <th className="p-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {projects.data.map((proj) => (
                                        <tr key={proj.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                                            <td className="p-4 font-bold text-slate-805 dark:text-slate-150">
                                                <div className="max-w-xs truncate">{proj.name}</div>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded font-medium text-slate-600 dark:text-slate-450">
                                                    {proj.category}
                                                </span>
                                            </td>
                                            <td className="p-4 text-xs text-slate-500">{proj.client || 'N/A'}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                                    proj.status === 'Completed' 
                                                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400' 
                                                        : 'bg-amber-50 text-amber-600 dark:bg-amber-955/20 dark:text-amber-400'
                                                }`}>
                                                    {proj.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {proj.is_featured ? (
                                                    <Star className="h-4.5 w-4.5 text-amber-500 fill-current" />
                                                ) : (
                                                    <span className="text-xs text-slate-400">No</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right space-x-2">
                                                <Link
                                                    href={route('admin.projects.edit', proj.id)}
                                                    className="inline-flex p-1.5 border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-indigo-650 dark:border-slate-800 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(proj.id)}
                                                    className="inline-flex p-1.5 border border-slate-200 text-red-650 hover:bg-red-50 dark:border-slate-800 dark:hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-16 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-2">
                            <FolderCode className="h-8 w-8 text-slate-300" />
                            <p className="text-xs">No projects found.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {projects.links.length > 3 && (
                    <div className="flex justify-center pt-4">
                        <nav className="flex space-x-1">
                            {projects.links.map((link, idx) => {
                                return (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                            link.active
                                                ? 'bg-indigo-600 text-white shadow-md'
                                                : link.url
                                                ? 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
                                                : 'text-slate-350 dark:text-slate-700 cursor-not-allowed border border-slate-100 dark:border-slate-900'
                                        }`}
                                    />
                                );
                            })}
                        </nav>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
