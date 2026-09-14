import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Calendar, User, Globe, Info, Award, 
    ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb,
    ExternalLink, Code2, Cpu, Database, Check, Layers, 
    ShieldCheck, Workflow, BarChart3, TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';

const GithubIcon = (props) => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

export default function Show({ project, relatedProjects }) {
    const { settings } = usePage().props;
    const [activeImage, setActiveImage] = useState(
        project.screenshots && project.screenshots.length > 0 
            ? project.screenshots[0].image_path 
            : project.thumbnail
    );

    return (
        <AppLayout>
            {/* Case Study Header & Breadcrumb */}
            <section className="bg-slate-100 dark:bg-slate-950/80 pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    <Link 
                        href={route('projects.index')}
                        className="inline-flex items-center text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 gap-1.5 transition-colors"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Back to all projects
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1">
                            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                                Case Study // {project.category}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                {project.name}
                            </h1>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                {project.status || 'Active Production'}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Study Content Grid */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Case Study Column */}
                    <div className="lg:col-span-8 space-y-10">
                        {/* 01. Visual Presentation / Screenshot Header */}
                        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                                <span>Architecture & System Blueprint</span>
                                <span className="text-cyan-400 font-semibold">{project.category} ENGINE</span>
                            </div>
                            <div className="aspect-video w-full rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center p-8 text-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                                <div className="z-10 space-y-3">
                                    <div className="h-16 w-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                                        <Code2 className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white font-mono">{project.name}</h3>
                                    <p className="text-xs text-slate-400 max-w-md font-sans">
                                        {project.role || 'Software Engineer — Architecture, database design, module implementation and system optimization.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 02. Project Overview */}
                        <div className="space-y-3">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="text-cyan-400 font-mono text-sm">01 //</span>
                                Project Overview
                            </h2>
                            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                                {project.overview || project.description}
                            </p>
                        </div>

                        {/* 03. The Challenge / Problem */}
                        {project.problem && (
                            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
                                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold uppercase tracking-wider">
                                    <AlertTriangle className="h-4 w-4" />
                                    <span>The Challenge & Problem Statement</span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {project.problem}
                                </p>
                            </div>
                        )}

                        {/* 04. The Objective */}
                        {project.objective && (
                            <div className="p-6 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 space-y-3">
                                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold uppercase tracking-wider">
                                    <Award className="h-4 w-4" />
                                    <span>Engineering Objective</span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {project.objective}
                                </p>
                            </div>
                        )}

                        {/* 05. The Solution */}
                        {project.solution && (
                            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
                                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
                                    <Lightbulb className="h-4 w-4" />
                                    <span>The Engineered Solution</span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {project.solution}
                                </p>
                            </div>
                        )}

                        {/* 06. Architecture Flow Blueprint */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="text-cyan-400 font-mono text-sm">02 //</span>
                                Architectural Blueprint
                            </h2>
                            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-xs">
                                <div className="text-cyan-400 font-semibold mb-2">Controller → Service → Model Layering:</div>
                                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 space-y-2 leading-relaxed">
                                    <p className="text-slate-500">// Structured Request Lifecycle</p>
                                    <p className="text-emerald-400">Frontend Request (React 19 / Inertia)</p>
                                    <p className="pl-4 text-cyan-400">↓ Form Request Validation (Strict rules, honeypot)</p>
                                    <p className="pl-8 text-amber-300">↓ Controller (Lightweight HTTP receiver)</p>
                                    <p className="pl-12 text-indigo-300">↓ Service Layer (Business rules, transactions, logging)</p>
                                    <p className="pl-16 text-rose-300">↓ Eloquent ORM Model (Scopes, Relationships, Eager Loading)</p>
                                    <p className="pl-20 text-emerald-400">↓ MySQL Engine (Normalized, Foreign Keys & Indexes)</p>
                                </div>

                                {project.architecture_flow && (
                                    <div className="pt-3 border-t border-slate-800">
                                        <p className="text-slate-400 font-sans text-xs">
                                            <span className="font-semibold text-white font-mono">Domain Dataflow: </span>
                                            {project.architecture_flow}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 07. Key Features */}
                        {Array.isArray(project.features) && project.features.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="text-cyan-400 font-mono text-sm">03 //</span>
                                    Core System Features
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {project.features.map((feat, i) => (
                                        <div key={i} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                                            <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                                            <span className="text-xs text-slate-300 leading-relaxed">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 08. Challenges & How They Were Overcome */}
                        {(project.challenges || project.solutions) && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="text-cyan-400 font-mono text-sm">04 //</span>
                                    Technical Challenges & Solutions
                                </h2>
                                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                                    {project.challenges && (
                                        <div className="space-y-1">
                                            <h4 className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider">
                                                The Bottleneck / Challenge:
                                            </h4>
                                            <p className="text-sm text-slate-300 leading-relaxed">
                                                {project.challenges}
                                            </p>
                                        </div>
                                    )}
                                    {project.solutions && (
                                        <div className="space-y-1 pt-3 border-t border-slate-800">
                                            <h4 className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                                                How It Was Overcome:
                                            </h4>
                                            <p className="text-sm text-slate-300 leading-relaxed">
                                                {project.solutions}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* 09. Business Results & Impact */}
                        {project.business_impact && (
                            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-cyan-950/30 border border-emerald-500/30 space-y-2">
                                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider">
                                    <TrendingUp className="h-4 w-4" />
                                    <span>Business Impact & Measurable Result</span>
                                </div>
                                <p className="text-sm text-emerald-200 font-medium leading-relaxed">
                                    {project.business_impact}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Metadata & Technology Specs */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Project Specs Card */}
                        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
                            <h3 className="text-sm font-mono font-semibold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
                                Project Metadata
                            </h3>

                            <div className="space-y-4 text-xs font-mono">
                                <div>
                                    <span className="text-slate-500 block">CLIENT / ORGANIZATION</span>
                                    <span className="text-slate-200 font-semibold">{project.client || 'Enterprise'}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 block">ENGINEERING ROLE</span>
                                    <span className="text-slate-200 font-sans text-xs">{project.role || 'Software Engineer'}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 block">DEVELOPMENT DURATION</span>
                                    <span className="text-slate-200 font-semibold">{project.duration}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 block">DEPLOYMENT STATUS</span>
                                    <span className="text-emerald-400 font-semibold">{project.status}</span>
                                </div>
                            </div>

                            {/* External Links */}
                            <div className="pt-3 border-t border-slate-800 space-y-2">
                                {project.live_demo && (
                                    <a
                                        href={project.live_demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/20"
                                    >
                                        Visit Live System
                                        <ExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
                                    >
                                        <GithubIcon className="h-4 w-4" />
                                        GitHub Repository
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Technology Stack Badges */}
                        {Array.isArray(project.technology_stack) && (
                            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                                <h3 className="text-sm font-mono font-semibold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technology_stack.map((tech, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Inquire CTA */}
                        <div className="p-6 rounded-2xl bg-gradient-to-b from-cyan-950/20 to-slate-900 border border-cyan-500/30 space-y-3 text-center">
                            <h4 className="text-sm font-bold text-white">Need a Similar System?</h4>
                            <p className="text-xs text-slate-400">
                                Let’s discuss your operational requirements and build a customized enterprise solution.
                            </p>
                            <Link
                                href={route('home') + '#contact'}
                                className="inline-block w-full py-2.5 rounded-xl text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
                            >
                                Let's Discuss
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
