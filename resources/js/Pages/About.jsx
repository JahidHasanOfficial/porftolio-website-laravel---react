import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    Briefcase, GraduationCap, Award, Download, Calendar, 
    MapPin, Globe, AwardIcon, FileText, ArrowLeft, CheckCircle2,
    Code2, Terminal, Database, Server, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function About({ experiences, educations, certificates, resume, skills }) {
    const { settings } = usePage().props;

    const developerName = settings?.name || 'Jahid Hasan';
    const developerDesignation = settings?.designation || 'Software Engineer';

    return (
        <AppLayout>
            {/* Header banner */}
            <section className="relative bg-slate-100 dark:bg-slate-950 pt-12 sm:pt-16 md:pt-20 pb-16 md:pb-20 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-mono font-medium uppercase tracking-wider">
                        PROFESSIONAL BACKGROUND
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                        About Jahid Hasan
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base leading-relaxed">
                        Software Engineer specializing in scalable web applications, business software architecture (ERP/CRM/HRM), and automated system pipelines.
                    </p>
                </div>
            </section>

            {/* Career details */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Bio and summary Column */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Professional Bio */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">01 //</span>
                                Engineering Profile & Philosophy
                            </h2>
                            <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                                {settings?.biography || 'I am a Software Engineer focused on building practical, scalable, and high-performance software solutions for businesses and organizations.'}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                I approach every project by first understanding the core business problem, designing normalized database schemas, and applying the Controller → Service → Model pattern to ensure zero technical debt.
                            </p>
                        </div>

                        {/* Experience Timeline */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">02 //</span>
                                Work History & Production Systems
                            </h2>
                            <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 space-y-10">
                                {experiences && experiences.map((exp) => (
                                    <div key={exp.id} className="relative">
                                        <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-4 border-slate-50 dark:border-slate-950 bg-cyan-500" />
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider">
                                                    {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date}
                                                </span>
                                                {exp.is_current && (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                                        Current Role
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.position}</h3>
                                            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">{exp.company} • {exp.location}</p>
                                            
                                            <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-1.5 pt-2">
                                                {typeof exp.responsibilities === 'string'
                                                    ? exp.responsibilities.split('\n').filter(Boolean).map((r, i) => (
                                                        <div key={i} className="flex items-start gap-2">
                                                            <span className="text-cyan-500 mt-1">▹</span>
                                                            <span>{r}</span>
                                                        </div>
                                                    ))
                                                    : null}
                                            </div>

                                            {exp.achievements && (
                                                <div className="mt-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
                                                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Key Achievement: </span>
                                                    {exp.achievements}
                                                </div>
                                            )}

                                            {Array.isArray(exp.technologies) && (
                                                <div className="flex flex-wrap gap-1.5 pt-2">
                                                    {exp.technologies.map((tech, idx) => (
                                                        <span key={idx} className="text-[11px] font-mono bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education Timeline */}
                        {educations && educations.length > 0 && (
                            <div className="space-y-6 pt-4">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="text-cyan-600 dark:text-cyan-400 font-mono text-sm">03 //</span>
                                    Academic Qualifications
                                </h2>
                                <div className="relative border-l border-slate-200 dark:border-slate-800 pl-6 space-y-8">
                                    {educations.map((edu) => (
                                        <div key={edu.id} className="relative">
                                            <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-4 border-slate-50 dark:border-slate-950 bg-indigo-500" />
                                            <div className="space-y-1">
                                                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                                                    {edu.session}
                                                </span>
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                                                <p className="text-xs text-slate-600 dark:text-slate-400">{edu.institute} {edu.department && `(${edu.department})`}</p>
                                                {edu.result && (
                                                    <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-1">Result: {edu.result}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Resume & Certifications Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Resume Card */}
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 bg-white dark:bg-slate-900/90 shadow-xl">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                <FileText className="h-5 w-5 text-cyan-500" /> Curriculum Vitae
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                Download my full professional resume containing detailed production project histories, database architectures, and technical references.
                            </p>
                            <div className="pt-2">
                                <a
                                    href={route('resume.download')}
                                    className="w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-xl shadow-lg shadow-cyan-500/20 transition-all gap-2"
                                >
                                    <Download className="h-4 w-4" /> Download Resume (PDF)
                                </a>
                            </div>
                        </div>

                        {/* Certificates */}
                        {certificates && certificates.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                                    <Award className="h-5 w-5 text-indigo-500" /> Certifications
                                </h3>
                                <div className="space-y-3">
                                    {certificates.map((cert) => (
                                        <div 
                                            key={cert.id}
                                            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-2"
                                        >
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                                {cert.name}
                                            </h4>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                                Issued by {cert.issuer} • {cert.date}
                                            </p>
                                            {cert.credential_url && (
                                                <a 
                                                    href={cert.credential_url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline pt-1"
                                                >
                                                    Verify Credential <ExternalLink className="h-3 w-3" />
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
