import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Calendar, User, Globe, Info, Award, 
    ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Show({ project, relatedProjects }) {
    const { settings } = usePage().props;
    const [activeImage, setActiveImage] = useState(
        project.screenshots && project.screenshots.length > 0 
            ? project.screenshots[0].image_path 
            : project.thumbnail
    );

    return (
        <AppLayout>
            {/* Page Header */}
            <section className="bg-slate-100 dark:bg-slate-900/40 py-12 border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    <Link 
                        href={route('projects.index')}
                        className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-indigo-650 dark:hover:text-indigo-400 gap-1"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to projects
                    </Link>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                {project.category}
                            </span>
                            <h1 className="text-3xl font-extrabold tracking-tight mt-1">{project.name}</h1>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            project.status === 'Completed' 
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900'
                                : 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-450 border border-amber-100 dark:border-amber-900'
                        }`}>
                            {project.status}
                        </span>
                    </div>
                </div>
            </section>

            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* Interactive Gallery */}
                        {(project.screenshots?.length > 0 || project.thumbnail) && (
                            <div className="space-y-4">
                                <div className="aspect-video w-full rounded-2xl bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-850">
                                    <img 
                                        src={activeImage} 
                                        alt={project.name} 
                                        className="h-full w-full object-cover" 
                                    />
                                </div>
                                {project.screenshots && project.screenshots.length > 1 && (
                                    <div className="flex space-x-3 overflow-x-auto pb-2">
                                        {/* Include thumbnail too */}
                                        {project.thumbnail && (
                                            <button 
                                                onClick={() => setActiveImage(project.thumbnail)}
                                                className={`h-16 w-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                                                    activeImage === project.thumbnail ? 'border-indigo-600 scale-95' : 'border-transparent'
                                                }`}
                                            >
                                                <img src={project.thumbnail} className="h-full w-full object-cover" />
                                            </button>
                                        )}
                                        {project.screenshots.map((shot) => (
                                            <button
                                                key={shot.id}
                                                onClick={() => setActiveImage(shot.image_path)}
                                                className={`h-16 w-24 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                                                    activeImage === shot.image_path ? 'border-indigo-605 scale-95' : 'border-transparent'
                                                }`}
                                            >
                                                <img src={shot.image_path} className="h-full w-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Overview, Problem & Solution */}
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <h3 className="font-bold text-xl text-slate-850 dark:text-slate-100">Project Overview</h3>
                                <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed whitespace-pre-line">
                                    {project.overview || project.description}
                                </p>
                            </div>

                            {project.problem && (
                                <div className="space-y-3 p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/30">
                                    <h4 className="font-bold text-sm text-rose-800 dark:text-rose-400 flex items-center gap-1.5">
                                        <AlertTriangle className="h-4.5 w-4.5" /> The Problem
                                    </h4>
                                    <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed whitespace-pre-line">
                                        {project.problem}
                                    </p>
                                </div>
                            )}

                            {project.solution && (
                                <div className="space-y-3 p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30">
                                    <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                                        <CheckCircle2 className="h-4.5 w-4.5" /> The Solution
                                    </h4>
                                    <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed whitespace-pre-line">
                                        {project.solution}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Features List */}
                        {project.features && project.features.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="font-bold text-xl text-slate-850 dark:text-slate-100">Key Features</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {project.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-start space-x-2 text-sm text-slate-650 dark:text-slate-350">
                                            <CheckCircle2 className="h-4.5 w-4.5 text-indigo-650 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Challenges & Solutions */}
                        {(project.challenges || project.solutions) && (
                            <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                                <h3 className="font-bold text-xl text-slate-850 dark:text-slate-100">Challenges & Solutions</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {project.challenges && (
                                        <div className="space-y-2.5">
                                            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">The Challenges</h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-350 whitespace-pre-line leading-relaxed">
                                                {project.challenges}
                                            </p>
                                        </div>
                                    )}
                                    {project.solutions && (
                                        <div className="space-y-2.5">
                                            <h4 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                                                <Lightbulb className="h-4.5 w-4.5" /> How I Solved Them
                                            </h4>
                                            <p className="text-sm text-slate-600 dark:text-slate-350 whitespace-pre-line leading-relaxed">
                                                {project.solutions}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Spec Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-850 p-6 space-y-6 bg-white dark:bg-slate-900 shadow-sm">
                            <h3 className="font-bold text-lg text-slate-850 dark:text-slate-150">Project Specifications</h3>
                            
                            <ul className="space-y-4 text-sm text-slate-650 dark:text-slate-350">
                                <li className="flex justify-between pb-3 border-b border-slate-100 dark:border-slate-850">
                                    <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="h-4.5 w-4.5" /> Duration:</span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-250">{project.duration}</span>
                                </li>
                                <li className="flex justify-between pb-3 border-b border-slate-100 dark:border-slate-850">
                                    <span className="text-slate-400 flex items-center gap-1.5"><User className="h-4.5 w-4.5" /> Client:</span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-250">{project.client || 'N/A'}</span>
                                </li>
                                <li className="flex justify-between pb-3 border-b border-slate-100 dark:border-slate-850">
                                    <span className="text-slate-400 flex items-center gap-1.5"><Award className="h-4.5 w-4.5" /> Status:</span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-250">{project.status}</span>
                                </li>
                            </ul>

                            {/* Tech stack list */}
                            <div className="space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">Technologies Used</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.technology_stack?.map((tech, idx) => (
                                        <span key={idx} className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300 px-3 py-1 rounded-lg">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Live links */}
                            <div className="flex flex-col gap-2.5 pt-4">
                                {project.live_demo && (
                                    <a
                                        href={project.live_demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-indigo-650 hover:bg-indigo-700 rounded-xl shadow-md transition-colors gap-2"
                                    >
                                        <Globe className="h-4.5 w-4.5" /> Launch Live Application
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-850 border border-slate-250/20 rounded-xl transition-colors gap-2"
                                    >
                                        <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                            <path d="M9 18c-4.51 2-5-2-7-2" />
                                        </svg>
                                        Explore Codebase
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
