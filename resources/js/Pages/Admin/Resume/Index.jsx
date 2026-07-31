import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { FileDown, Upload, FileText, CheckCircle2 } from 'lucide-react';

export default function Index({ resume }) {
    const { data, setData, post, processing, errors, wasSuccessful } = useForm({
        resume: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.resume.store'), {
            onSuccess: () => {
                setData('resume', null);
            }
        });
    };

    return (
        <AdminLayout title="Manage Resume CV">
            <div className="space-y-8 max-w-2xl">
                {/* Metrics & Upload Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Downloads Stats */}
                    <div className="rounded-2xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex items-center justify-between shadow-xs">
                        <div className="space-y-1">
                            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Download Metrics</h4>
                            <p className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                                {resume ? resume.download_count : 0}
                            </p>
                            <p className="text-[10px] text-slate-450">Times recruiter requested file</p>
                        </div>
                        <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-650 flex items-center justify-center flex-shrink-0">
                            <FileDown className="h-6 w-6" />
                        </div>
                    </div>

                    {/* Active File */}
                    <div className="rounded-2xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex items-center justify-between shadow-xs">
                        <div className="space-y-1.5 truncate">
                            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Resume CV</h4>
                            {resume?.file_path ? (
                                <div className="space-y-1 truncate">
                                    <a 
                                        href={resume.file_path} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 truncate"
                                    >
                                        <FileText className="h-4 w-4 flex-shrink-0" /> jahid_hasan_resume.pdf
                                    </a>
                                    <p className="text-[10px] text-slate-400">Uploaded: {new Date(resume.updated_at).toLocaleDateString()}</p>
                                </div>
                            ) : (
                                <p className="text-xs text-slate-400 italic">No resume uploaded yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Upload Form */}
                <div className="rounded-2xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
                    <h3 className="font-bold text-base border-b border-slate-100 dark:border-slate-850 pb-3">Upload Updated Resume CV</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-550 block">Select PDF Document</label>
                            
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 dark:border-slate-800 border-dashed rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-950/20 hover:bg-slate-100/50 dark:hover:bg-slate-900/35 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-2 text-slate-400" />
                                        <p className="mb-1 text-xs text-slate-600 dark:text-slate-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-[10px] text-slate-400">PDF Document Only (Max 5MB)</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        accept="application/pdf"
                                        onChange={(e) => setData('resume', e.target.files[0])}
                                        className="hidden" 
                                        required
                                    />
                                </label>
                            </div>
                            {data.resume && (
                                <p className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Selected: {data.resume.name}
                                </p>
                            )}
                            {errors.resume && <p className="text-xs text-red-500">{errors.resume}</p>}
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={processing || !data.resume}
                                className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-indigo-650 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-40"
                            >
                                {processing ? 'Uploading...' : 'Upload Document'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
